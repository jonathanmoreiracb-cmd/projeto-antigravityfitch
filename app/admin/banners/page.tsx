'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { Banner } from '@/lib/types';
import { Loader2, Plus, Trash2, Upload, GripVertical, Save, Edit, X } from 'lucide-react';

export default function BannersPage() {
    const [banners, setBanners] = useState<Banner[]>([]);
    const [loading, setLoading] = useState(true);
    const [editingBanner, setEditingBanner] = useState<Partial<Banner> | null>(null);
    const [saving, setSaving] = useState(false);
    const [uploading, setUploading] = useState<'desktop' | 'mobile' | null>(null);

    useEffect(() => {
        fetchBanners();
    }, []);

    const fetchBanners = async () => {
        const { data } = await supabase
            .from('banners')
            .select('*')
            .order('ordem', { ascending: true });

        if (data) setBanners(data);
        setLoading(false);
    };

    const handleCreateNew = () => {
        setEditingBanner({
            titulo: '',
            link: '',
            ordem: banners.length,
            ativo: true,
            imagem_desktop_url: '',
            imagem_mobile_url: '',
        });
    };

    const handleEdit = (banner: Banner) => {
        setEditingBanner({ ...banner });
    };

    const handleCancel = () => {
        setEditingBanner(null);
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Tem certeza que deseja excluir este banner?')) return;

        await supabase.from('banners').delete().eq('id', id);
        fetchBanners();
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setEditingBanner(prev => {
            if (!prev) return null;
            return {
                ...prev,
                [name]: type === 'checkbox' ? checked : value
            };
        });
    };

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>, type: 'desktop' | 'mobile') => {
        if (!e.target.files || e.target.files.length === 0) return;

        setUploading(type);
        const file = e.target.files[0];
        const fileExt = file.name.split('.').pop();
        const fileName = `${Date.now()}-${type}.${fileExt}`;
        const filePath = `banners/${fileName}`;

        try {
            const { error: uploadError } = await supabase.storage
                .from('site-assets')
                .upload(filePath, file);

            if (uploadError) throw uploadError;

            const { data: { publicUrl } } = supabase.storage
                .from('site-assets')
                .getPublicUrl(filePath);

            setEditingBanner(prev => {
                if (!prev) return null;
                return {
                    ...prev,
                    [type === 'desktop' ? 'imagem_desktop_url' : 'imagem_mobile_url']: publicUrl
                };
            });

        } catch (error) {
            console.error('Upload error', error);
            alert('Erro no upload.');
        } finally {
            setUploading(null);
            e.target.value = '';
        }
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!editingBanner) return;

        if (!editingBanner.imagem_desktop_url || !editingBanner.imagem_mobile_url) {
            alert('É necessário fazer upload das imagens (Desktop e Mobile).');
            return;
        }

        setSaving(true);
        try {
            if (editingBanner.id) {
                await supabase.from('banners').update(editingBanner).eq('id', editingBanner.id);
            } else {
                await supabase.from('banners').insert(editingBanner);
            }
            setEditingBanner(null);
            fetchBanners();
        } catch (error) {
            console.error('Save error', error);
            alert('Erro ao salvar banner.');
        } finally {
            setSaving(false);
        }
    };

    const moveBanner = async (index: number, direction: 'up' | 'down') => {
        if (direction === 'up' && index === 0) return;
        if (direction === 'down' && index === banners.length - 1) return;

        const newBanners = [...banners];
        const swapIndex = direction === 'up' ? index - 1 : index + 1;

        // Swap locally
        const temp = newBanners[index];
        newBanners[index] = newBanners[swapIndex];
        newBanners[swapIndex] = temp;

        // Update orders
        newBanners.forEach((b, idx) => b.ordem = idx);
        setBanners(newBanners);

        // Update DB
        for (const b of newBanners) {
            await supabase.from('banners').update({ ordem: b.ordem }).eq('id', b.id);
        }
    };

    if (loading) return <div className="p-8 text-center text-gray-500">Carregando banners...</div>;

    return (
        <div className="space-y-6 pb-20">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-900">Gerenciar Banners</h1>
                {!editingBanner && (
                    <button onClick={handleCreateNew} className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition">
                        <Plus size={20} /> Novo Banner
                    </button>
                )}
            </div>

            {/* List View */}
            {!editingBanner && (
                <div className="grid grid-cols-1 gap-4">
                    {banners.map((banner, index) => (
                        <div key={banner.id} className="bg-white p-4 rounded-lg shadow-sm border flex flex-col md:flex-row gap-4 items-center">
                            <div className="flex-1 space-y-2 w-full">
                                <div className="flex items-center gap-3">
                                    <span className="font-bold text-gray-700">#{index + 1}</span>
                                    <h3 className="font-medium text-lg">{banner.titulo}</h3>
                                    <span className={`px-2 py-0.5 text-xs rounded-full ${banner.ativo ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                                        {banner.ativo ? 'Ativo' : 'Inativo'}
                                    </span>
                                </div>
                                <div className="flex gap-4 text-sm text-gray-500">
                                    <div className="flex items-center gap-1">
                                        <div className="w-16 h-8 bg-gray-100 rounded overflow-hidden border">
                                            <img src={banner.imagem_desktop_url} className="w-full h-full object-cover" />
                                        </div>
                                        <span>Desktop</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <div className="w-8 h-8 bg-gray-100 rounded overflow-hidden border">
                                            <img src={banner.imagem_mobile_url} className="w-full h-full object-cover" />
                                        </div>
                                        <span>Mobile</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-2">
                                <button onClick={() => moveBanner(index, 'up')} disabled={index === 0} className="p-2 text-gray-500 hover:bg-gray-100 rounded disabled:opacity-30">
                                    ▲
                                </button>
                                <button onClick={() => moveBanner(index, 'down')} disabled={index === banners.length - 1} className="p-2 text-gray-500 hover:bg-gray-100 rounded disabled:opacity-30">
                                    ▼
                                </button>
                                <div className="w-px h-6 bg-gray-200 mx-2" />
                                <button onClick={() => handleEdit(banner)} className="p-2 text-blue-600 hover:bg-blue-50 rounded">
                                    <Edit size={18} />
                                </button>
                                <button onClick={() => handleDelete(banner.id)} className="p-2 text-red-600 hover:bg-red-50 rounded">
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        </div>
                    ))}
                    {banners.length === 0 && (
                        <div className="text-center py-12 text-gray-500 border-2 border-dashed rounded-lg">
                            Nenhum banner cadastrado.
                        </div>
                    )}
                </div>
            )}

            {/* Edit/Create Form */}
            {editingBanner && (
                <div className="bg-white p-6 rounded-lg shadow-lg border max-w-2xl mx-auto">
                    <h2 className="text-xl font-bold mb-6 pb-2 border-b">{editingBanner.id ? 'Editar Banner' : 'Novo Banner'}</h2>

                    <form onSubmit={handleSave} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Título (Interno)</label>
                            <input
                                required
                                name="titulo"
                                value={editingBanner.titulo}
                                onChange={handleChange}
                                className="w-full border rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Ex: Promoção de Natal"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Link de Destino (Opcional)</label>
                            <input
                                name="link"
                                value={editingBanner.link || ''}
                                onChange={handleChange}
                                className="w-full border rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Ex: /produtos/iphone-15"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Imagem Desktop</label>
                                <div className="border-2 border-dashed rounded-lg p-4 text-center hover:bg-gray-50 transition relative">
                                    {editingBanner.imagem_desktop_url ? (
                                        <div className="relative">
                                            <img src={editingBanner.imagem_desktop_url} className="w-full h-auto rounded shadow-sm max-h-32 object-contain mx-auto" />
                                            <div className="text-xs text-green-600 mt-2 font-medium">Imagem Carregada</div>
                                        </div>
                                    ) : (
                                        <div className="text-gray-400 text-sm py-4">Clique para upload<br />(1920x600 px)</div>
                                    )}
                                    <input
                                        type="file"
                                        accept="image/*"
                                        className="absolute inset-0 opacity-0 cursor-pointer"
                                        onChange={(e) => handleUpload(e, 'desktop')}
                                        disabled={uploading === 'desktop'}
                                    />
                                    {uploading === 'desktop' && <div className="absolute inset-0 bg-white/80 flex items-center justify-center"><Loader2 className="animate-spin" /></div>}
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Imagem Mobile</label>
                                <div className="border-2 border-dashed rounded-lg p-4 text-center hover:bg-gray-50 transition relative">
                                    {editingBanner.imagem_mobile_url ? (
                                        <div className="relative">
                                            <img src={editingBanner.imagem_mobile_url} className="w-full h-auto rounded shadow-sm max-h-32 object-contain mx-auto" />
                                            <div className="text-xs text-green-600 mt-2 font-medium">Imagem Carregada</div>
                                        </div>
                                    ) : (
                                        <div className="text-gray-400 text-sm py-4">Clique para upload<br />(800x1200 px)</div>
                                    )}
                                    <input
                                        type="file"
                                        accept="image/*"
                                        className="absolute inset-0 opacity-0 cursor-pointer"
                                        onChange={(e) => handleUpload(e, 'mobile')}
                                        disabled={uploading === 'mobile'}
                                    />
                                    {uploading === 'mobile' && <div className="absolute inset-0 bg-white/80 flex items-center justify-center"><Loader2 className="animate-spin" /></div>}
                                </div>
                            </div>
                        </div>

                        <label className="flex items-center gap-3 cursor-pointer py-2">
                            <div className={`w-12 h-6 rounded-full p-1 transition-colors ${editingBanner.ativo ? 'bg-green-500' : 'bg-gray-300'}`}>
                                <div className={`w-4 h-4 rounded-full bg-white transition-transform ${editingBanner.ativo ? 'translate-x-6' : ''}`} />
                            </div>
                            <input
                                type="checkbox"
                                name="ativo"
                                checked={editingBanner.ativo}
                                onChange={handleChange}
                                className="hidden"
                            />
                            <span className="text-gray-700 font-medium">Banner Ativo</span>
                        </label>

                        <div className="flex justify-end gap-3 pt-4 border-t">
                            <button
                                type="button"
                                onClick={handleCancel}
                                className="text-gray-600 hover:text-gray-800 px-4 py-2"
                            >
                                Cancelar
                            </button>
                            <button
                                type="submit"
                                disabled={saving}
                                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center gap-2"
                            >
                                {saving && <Loader2 className="animate-spin" size={18} />}
                                Salvar Banner
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
}
