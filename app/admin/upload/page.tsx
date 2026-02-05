'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { uploadImage } from '@/lib/storage';
import { Product } from '@/lib/types';
import { useRouter } from 'next/navigation';

export default function AdminUpload() {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);

    // Data
    const [products, setProducts] = useState<Product[]>([]);

    // Form State
    const [uploadType, setUploadType] = useState<'product' | 'banner'>('product');
    const [selectedProductId, setSelectedProductId] = useState('');
    const [file, setFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);

    // Banner specific
    const [bannerTitle, setBannerTitle] = useState('');
    const [bannerMobileFile, setBannerMobileFile] = useState<File | null>(null);
    const [previewMobile, setPreviewMobile] = useState<string | null>(null);

    // Authenticate & Fetch
    useEffect(() => {
        const checkUser = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) {
                router.push('/admin/login');
                return;
            }

            // Load products
            const { data } = await supabase
                .from('products')
                .select('*')
                .eq('ativo', true)
                .order('nome');

            if (data) setProducts(data as unknown as Product[]);
            setLoading(false);
        };

        checkUser();
    }, [router]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, isMobile = false) => {
        if (e.target.files && e.target.files[0]) {
            const f = e.target.files[0];
            const url = URL.createObjectURL(f);

            if (isMobile) {
                setBannerMobileFile(f);
                setPreviewMobile(url);
            } else {
                setFile(f);
                setPreview(url);
            }
        }
    };

    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.push('/admin/login');
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setUploading(true);

        try {
            if (uploadType === 'product') {
                if (!file || !selectedProductId) throw new Error('Selecione um produto e uma imagem.');

                const publicUrl = await uploadImage(file, 'products');
                if (!publicUrl) throw new Error('Falha no upload da imagem.');

                const { error } = await supabase.from('product_images').insert({
                    product_id: selectedProductId,
                    url: publicUrl,
                    ordem: 0 // Default to 0, user can reorder in DB if needed later or we add field
                });

                if (error) throw error;
                alert('Imagem de produto enviada com sucesso!');

            } else {
                // Banner
                if (!file || !bannerMobileFile || !bannerTitle) throw new Error('Preencha título e selecione as duas imagens.');

                const desktopUrl = await uploadImage(file, 'banners');
                const mobileUrl = await uploadImage(bannerMobileFile, 'banners');

                if (!desktopUrl || !mobileUrl) throw new Error('Falha no upload das imagens.');

                const { error } = await supabase.from('banners').insert({
                    titulo: bannerTitle,
                    imagem_desktop_url: desktopUrl,
                    imagem_mobile_url: mobileUrl,
                    ordem: 0,
                    ativo: true
                });

                if (error) throw error;
                alert('Banner criado com sucesso!');
            }

            // Reset form partially
            setFile(null);
            setPreview(null);
            setBannerMobileFile(null);
            setPreviewMobile(null);
            setBannerTitle('');

        } catch (err: unknown) {
            if (err instanceof Error) {
                alert(err.message);
            } else {
                alert('Ocorreu um erro desconhecido.');
            }
        } finally {
            setUploading(false);
        }
    };

    if (loading) return <div className="p-8 text-center">Carregando admin...</div>;

    return (
        <div className="min-h-screen bg-gray-50">
            <nav className="bg-white shadow px-4 py-4 flex justify-between items-center">
                <h1 className="font-bold text-gray-900">Fitch Admin - Upload</h1>
                <button onClick={handleLogout} className="text-sm text-red-600 hover:text-red-800">Sair</button>
            </nav>

            <main className="max-w-2xl mx-auto py-8 px-4">
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                    <div className="mb-6 flex space-x-4 border-b">
                        <button
                            className={`pb-2 px-4 ${uploadType === 'product' ? 'border-b-2 border-blue-600 font-semibold text-blue-600' : 'text-gray-500'}`}
                            onClick={() => setUploadType('product')}
                        >
                            Produto
                        </button>
                        <button
                            className={`pb-2 px-4 ${uploadType === 'banner' ? 'border-b-2 border-blue-600 font-semibold text-blue-600' : 'text-gray-500'}`}
                            onClick={() => setUploadType('banner')}
                        >
                            Banner Home
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">

                        {uploadType === 'product' && (
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Selecione o Produto</label>
                                <select
                                    value={selectedProductId}
                                    onChange={(e) => setSelectedProductId(e.target.value)}
                                    className="w-full border border-gray-300 rounded px-3 py-2"
                                    required
                                >
                                    <option value="">-- Escolha um produto --</option>
                                    {products.map((p) => (
                                        <option key={p.id} value={p.id}>{p.nome} ({p.condicao})</option>
                                    ))}
                                </select>
                            </div>
                        )}

                        {uploadType === 'banner' && (
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Título do Banner</label>
                                <input
                                    type="text"
                                    value={bannerTitle}
                                    onChange={(e) => setBannerTitle(e.target.value)}
                                    className="w-full border border-gray-300 rounded px-3 py-2"
                                    placeholder="Ex: Promoção de Natal"
                                    required
                                />
                            </div>
                        )}

                        <div className="border-t pt-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                {uploadType === 'product' ? 'Imagem do Produto' : 'Imagem Desktop (Widescreen)'}
                            </label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => handleFileChange(e, false)}
                                className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                                required
                            />
                            {preview && (
                                <div className="mt-4 w-full h-48 bg-gray-100 rounded flex items-center justify-center overflow-hidden border">
                                    <img src={preview} alt="Preview" className="max-h-full max-w-full object-contain" />
                                </div>
                            )}
                        </div>

                        {uploadType === 'banner' && (
                            <div className="border-t pt-4">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Imagem Mobile (Vertical/Quadrada)
                                </label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => handleFileChange(e, true)}
                                    className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                                    required
                                />
                                {previewMobile && (
                                    <div className="mt-4 w-full h-48 bg-gray-100 rounded flex items-center justify-center overflow-hidden border">
                                        <img src={previewMobile} alt="Preview Mobile" className="max-h-full max-w-full object-contain" />
                                    </div>
                                )}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={uploading}
                            className="w-full bg-green-600 text-white py-3 rounded-lg font-bold hover:bg-green-700 transition disabled:opacity-50"
                        >
                            {uploading ? 'Enviando...' : 'Salvar no Banco'}
                        </button>
                    </form>
                </div>
            </main>
        </div>
    );
}
