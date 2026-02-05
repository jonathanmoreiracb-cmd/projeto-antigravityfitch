'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import { Product, Price, ProductImage, Category, Condition } from '@/lib/types';
import { generateSlug } from '@/lib/utils';
import { Loader2, Plus, Trash2, Upload, GripVertical, Star } from 'lucide-react';

interface ProductFormProps {
    productId?: string; // If present, edit mode
}

export default function ProductForm({ productId }: ProductFormProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [initialLoading, setInitialLoading] = useState(!!productId);

    // Product State
    const [formData, setFormData] = useState<Partial<Product>>({
        nome: '',
        slug: '',
        categoria: 'iPhone Lacrado',
        condicao: 'Lacrado',
        armazenamento: '',
        cor: '',
        bateria_percentual: undefined,
        estoque: 1,
        destaque: false,
        ativo: true,
        descricao_curta: '',
    });

    // Price State
    const [priceData, setPriceData] = useState<Partial<Price>>({
        avista: 0,
        doze_parcela: 0,
        doze_total: 0,
    });

    // Images State
    const [images, setImages] = useState<ProductImage[]>([]);
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        if (productId) {
            fetchProductData(productId);
        }
    }, [productId]);

    const fetchProductData = async (id: string) => {
        try {
            // Fetch Product
            const { data: product, error: prodError } = await supabase
                .from('products')
                .select('*')
                .eq('id', id)
                .single();

            if (prodError) throw prodError;
            setFormData(product);

            // Fetch Active Price
            const { data: price, error: priceError } = await supabase
                .from('prices')
                .select('*')
                .eq('product_id', id)
                .eq('ativo', true)
                .single();

            if (!priceError && price) {
                setPriceData(price);
            }

            // Fetch Images
            fetchImages(id);

        } catch (error) {
            console.error('Error fetching product:', error);
            alert('Erro ao carregar produto.');
        } finally {
            setInitialLoading(false);
        }
    };

    const fetchImages = async (id: string) => {
        const { data: imgData } = await supabase
            .from('product_images')
            .select('*')
            .eq('product_id', id)
            .order('ordem', { ascending: true });

        if (imgData) setImages(imgData);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;

        if (type === 'checkbox') {
            const checked = (e.target as HTMLInputElement).checked;
            setFormData(prev => ({ ...prev, [name]: checked }));
        } else if (name === 'estoque' || name === 'bateria_percentual') {
            setFormData(prev => ({ ...prev, [name]: value ? parseInt(value) : null }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
            if (name === 'nome' && !productId) {
                setFormData(prev => ({ ...prev, slug: generateSlug(value) }));
            }
        }
    };

    const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setPriceData(prev => ({ ...prev, [name]: parseFloat(value) || 0 }));
    };

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || e.target.files.length === 0 || !formData.slug) {
            if (!formData.slug) alert('Preencha o nome do produto primeiro (para gerar o slug).');
            return;
        }

        setUploading(true);
        const file = e.target.files[0];
        const fileExt = file.name.split('.').pop();
        const fileName = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9]/g, '')}.${fileExt}`; // sanitize filename
        const filePath = `products/${formData.slug}/${fileName}`;

        try {
            // 1. Upload to Storage
            const { error: uploadError } = await supabase.storage
                .from('site-assets')
                .upload(filePath, file);

            if (uploadError) throw uploadError;

            // 2. Get Public URL
            const { data: { publicUrl } } = supabase.storage
                .from('site-assets')
                .getPublicUrl(filePath);

            // 3. Save to DB (if we have a product ID, save immediately. If not, we block upload until save?)
            // UX Decision: Allow upload only after product exists? Or save temporarily?
            // Let's enforce: User must save basic product info first to act as "draft" if they want to upload images immediately?
            // OR: Just upload currently, and save to DB only when "Save Product" is clicked? 
            // Better: If creating new product, we can't insert into product_images without product_id.
            // So, let's auto-save the product if it doesn't exist yet, OR disable upload until save.

            if (!productId) {
                alert('Salve o produto antes de fazer upload de imagens.');
                setUploading(false);
                return; // Early exit
            }

            // Get max order
            const nextOrder = images.length > 0 ? Math.max(...images.map(i => i.ordem)) + 1 : 0;

            const { error: dbError } = await supabase
                .from('product_images')
                .insert({
                    product_id: productId,
                    url: publicUrl,
                    ordem: nextOrder
                });

            if (dbError) throw dbError;

            fetchImages(productId); // Refresh list

        } catch (error) {
            console.error('Upload error:', error);
            alert('Erro no upload.');
        } finally {
            setUploading(false);
            e.target.value = ''; // Reset input
        }
    };

    const handleSetMainImage = async (img: ProductImage) => {
        // Set this image to 0, shift others
        // Simple strategy: Update all images locally, then batch update?
        // Or just update this one to -1, sort, then re-normalize 0..N

        // Optimistic UI
        const newImages = images.map(i => ({
            ...i,
            ordem: i.id === img.id ? -1 : i.ordem + 1 // shift all down, put selected at top (temp -1)
        })).sort((a, b) => a.ordem - b.ordem)
            .map((i, idx) => ({ ...i, ordem: idx })); // normalize 0, 1, 2...

        setImages(newImages);

        // Update DB
        for (const img of newImages) {
            await supabase.from('product_images').update({ ordem: img.ordem }).eq('id', img.id);
        }
    };

    const handleDeleteImage = async (img: ProductImage) => {
        if (!confirm('Deseja excluir esta imagem?')) return;

        try {
            // Remove from DB
            await supabase.from('product_images').delete().eq('id', img.id);

            // Remove from Storage (Optional but good practice)
            // Extract path from URL
            const urlObj = new URL(img.url);
            const path = urlObj.pathname.split('site-assets/')[1]; // Adjust based on your URL structure
            if (path) {
                await supabase.storage.from('site-assets').remove([decodeURIComponent(path)]);
            }

            setImages(prev => prev.filter(i => i.id !== img.id));
        } catch (error) {
            console.error('Delete error', error);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            let id = productId;
            const slug = formData.slug || generateSlug(formData.nome || '');

            const productPayload = {
                ...formData,
                slug,
            };

            // 1. Upsert Product
            if (id) {
                const { error } = await supabase.from('products').update(productPayload).eq('id', id);
                if (error) throw error;
            } else {
                // Check slug uniqueness
                const { data: existing } = await supabase.from('products').select('id').eq('slug', slug).single();
                if (existing) {
                    productPayload.slug = `${slug}-${Date.now().toString().slice(-4)}`;
                }

                const { data: newProd, error } = await supabase.from('products').insert(productPayload).select().single();
                if (error) throw error;
                id = newProd.id;
            }

            // 2. Upsert Price
            // Always insert a new active price if values changed, or update existing?
            // "1 ativo por produto" rule.
            // Let's just create a new price entry if it's new product, or update existing active price for simplicity
            // But to keep history, we should disable old and create new.
            // For this scope: "Se existir price ativo, fazer update"

            // Check if price exists
            const { data: currentPrice } = await supabase
                .from('prices')
                .select('id')
                .eq('product_id', id)
                .eq('ativo', true)
                .single();

            const pricePayload = {
                product_id: id,
                avista: priceData.avista,
                doze_parcela: priceData.doze_parcela,
                doze_total: priceData.doze_total,
                ativo: true
            };

            if (currentPrice) {
                await supabase.from('prices').update(pricePayload).eq('id', currentPrice.id);
            } else {
                await supabase.from('prices').insert(pricePayload);
            }

            if (!productId) {
                router.push(`/admin/produtos/${id}`); // Go to edit mode to allow image upload
            } else {
                alert('Produto salvo com sucesso!');
                router.refresh();
            }

        } catch (error) {
            console.error('Save error:', error);
            alert('Erro ao salvar produto.');
        } finally {
            setLoading(false);
        }
    };

    if (initialLoading) return <div className="p-8 text-center text-gray-500">Carregando dados...</div>;

    return (
        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto pb-20">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">{productId ? 'Editar Produto' : 'Novo Produto'}</h1>
                <div className="space-x-4">
                    <button type="button" onClick={() => router.back()} className="text-gray-600 hover:text-gray-800">Cancelar</button>
                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center gap-2"
                    >
                        {loading && <Loader2 className="animate-spin" size={18} />}
                        Salvar
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Left Column: Basic Info */}
                <div className="md:col-span-2 space-y-6">
                    <section className="bg-white p-6 rounded-lg shadow-sm border space-y-4">
                        <h2 className="text-lg font-semibold text-gray-700 border-b pb-2">Informações Gerais</h2>

                        <div className="grid grid-cols-1 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Nome do Produto *</label>
                                <input
                                    required
                                    name="nome"
                                    value={formData.nome}
                                    onChange={handleChange}
                                    className="w-full border rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Ex: iPhone 13 128GB"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Categoria *</label>
                                    <select
                                        name="categoria"
                                        value={formData.categoria}
                                        onChange={handleChange}
                                        className="w-full border rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option value="iPhone Lacrado">iPhone Lacrado</option>
                                        <option value="iPhone Seminovos">iPhone Seminovos</option>
                                        <option value="Produtos Apple">Produtos Apple</option>
                                        <option value="Android">Android</option>
                                        <option value="Eletrônicos">Eletrônicos</option>
                                        <option value="Acessórios">Acessórios</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Condição *</label>
                                    <select
                                        name="condicao"
                                        value={formData.condicao}
                                        onChange={handleChange}
                                        className="w-full border rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option value="Lacrado">Lacrado</option>
                                        <option value="Seminovo">Seminovo</option>
                                    </select>
                                </div>
                            </div>

                            <div className="grid grid-cols-3 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Armazenamento</label>
                                    <input
                                        name="armazenamento"
                                        value={formData.armazenamento || ''}
                                        onChange={handleChange}
                                        className="w-full border rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Ex: 128GB"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Cor</label>
                                    <input
                                        name="cor"
                                        value={formData.cor || ''}
                                        onChange={handleChange}
                                        className="w-full border rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Ex: Azul"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Bateria (%)</label>
                                    <input
                                        type="number"
                                        name="bateria_percentual"
                                        value={formData.bateria_percentual || ''}
                                        onChange={handleChange}
                                        className="w-full border rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Ex: 100"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Descrição Curta</label>
                                <textarea
                                    name="descricao_curta"
                                    rows={3}
                                    value={formData.descricao_curta || ''}
                                    onChange={handleChange}
                                    className="w-full border rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                        </div>
                    </section>

                    {/* Images Section - Only in Edit Mode */}
                    {productId && (
                        <section className="bg-white p-6 rounded-lg shadow-sm border space-y-4">
                            <div className="flex justify-between items-center border-b pb-2">
                                <h2 className="text-lg font-semibold text-gray-700">Fotos do Produto</h2>
                                <label className={`cursor-pointer bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1.5 rounded-md text-sm flex items-center gap-2 transition ${uploading ? 'opacity-50 pointer-events-none' : ''}`}>
                                    <Upload size={16} />
                                    {uploading ? 'Enviando...' : 'Adicionar Foto'}
                                    <input type="file" className="hidden" accept="image/*" onChange={handleUpload} disabled={uploading} />
                                </label>
                            </div>

                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                                {images.map((img, index) => (
                                    <div key={img.id} className="group relative border rounded-lg overflow-hidden aspect-square bg-gray-50">
                                        <img src={img.url} alt="Produto" className="w-full h-full object-cover" />
                                        {/* Overlay Actions */}
                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex flex-col items-center justify-center gap-2">
                                            {index === 0 ? (
                                                <span className="text-xs bg-green-500 text-white px-2 py-1 rounded-full flex items-center gap-1">
                                                    <Star size={10} fill="currentColor" /> Principal
                                                </span>
                                            ) : (
                                                <button type="button" onClick={() => handleSetMainImage(img)} className="bg-white/90 p-1.5 rounded-full hover:bg-white text-gray-800 text-xs">
                                                    Definir Principal
                                                </button>
                                            )}
                                            <button type="button" onClick={() => handleDeleteImage(img)} className="bg-red-500/90 p-1.5 rounded-full hover:bg-red-600 text-white">
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                        <div className="absolute top-1 left-1 bg-black/50 text-white text-xs px-1.5 py-0.5 rounded">
                                            #{index + 1}
                                        </div>
                                    </div>
                                ))}
                                {images.length === 0 && (
                                    <div className="col-span-full py-8 text-center text-gray-400 border-2 border-dashed rounded-lg">
                                        Nenhuma foto adicionada.
                                    </div>
                                )}
                            </div>
                        </section>
                    )}
                </div>

                {/* Right Column: Status & Price */}
                <div className="space-y-6">
                    <section className="bg-white p-6 rounded-lg shadow-sm border space-y-4">
                        <h2 className="text-lg font-semibold text-gray-700 border-b pb-2">Publicação</h2>

                        <div className="space-y-4">
                            <label className="flex items-center gap-3 cursor-pointer">
                                <div className={`w-12 h-6 rounded-full p-1 transition-colors ${formData.ativo ? 'bg-green-500' : 'bg-gray-300'}`}>
                                    <div className={`w-4 h-4 rounded-full bg-white transition-transform ${formData.ativo ? 'translate-x-6' : ''}`} />
                                </div>
                                <input
                                    type="checkbox"
                                    name="ativo"
                                    checked={formData.ativo}
                                    onChange={(e) => setFormData(p => ({ ...p, ativo: e.target.checked }))}
                                    className="hidden"
                                />
                                <span className="text-gray-700 font-medium">Produto Ativo</span>
                            </label>

                            <label className="flex items-center gap-2 text-sm text-gray-600">
                                <input
                                    type="checkbox"
                                    name="destaque"
                                    checked={formData.destaque}
                                    onChange={(e) => setFormData(p => ({ ...p, destaque: e.target.checked }))}
                                    className="rounded text-blue-600 focus:ring-blue-500"
                                />
                                Destaque na Home
                            </label>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Slug URL</label>
                                <input
                                    name="slug"
                                    value={formData.slug}
                                    onChange={handleChange}
                                    className="w-full text-sm border rounded-md px-3 py-2 bg-gray-50 text-gray-500"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Estoque</label>
                                <input
                                    type="number"
                                    name="estoque"
                                    value={formData.estoque}
                                    onChange={handleChange}
                                    className="w-full border rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                        </div>
                    </section>

                    <section className="bg-white p-6 rounded-lg shadow-sm border space-y-4">
                        <h2 className="text-lg font-semibold text-gray-700 border-b pb-2">Preços</h2>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Preço À Vista (R$) *</label>
                            <input
                                type="number"
                                step="0.01"
                                name="avista"
                                value={priceData.avista}
                                onChange={handlePriceChange}
                                className="w-full border rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500 font-mono"
                                required={formData.ativo}
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-xs font-medium text-gray-500 mb-1">12x Parcela (R$)</label>
                                <input
                                    type="number"
                                    step="0.01"
                                    name="doze_parcela"
                                    value={priceData.doze_parcela || ''}
                                    onChange={handlePriceChange}
                                    className="w-full border rounded-md px-2 py-1.5 outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-gray-500 mb-1">12x Total (R$)</label>
                                <input
                                    type="number"
                                    step="0.01"
                                    name="doze_total"
                                    value={priceData.doze_total || ''}
                                    onChange={handlePriceChange}
                                    className="w-full border rounded-md px-2 py-1.5 outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                                />
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </form>
    );
}
