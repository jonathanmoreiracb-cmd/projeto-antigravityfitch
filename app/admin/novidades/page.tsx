'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { HomeHighlight, Product, HighlightStyle } from '@/lib/types';
import { Trash2, ArrowUp, ArrowDown, Plus, Save, Loader2 } from 'lucide-react';

export default function AdminHighlightsPage() {
    const [highlights, setHighlights] = useState<HomeHighlight[]>([]);
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [isAdding, setIsAdding] = useState(false);

    // New Highlight Form State
    const [selectedProduct, setSelectedProduct] = useState<string>('');
    const [newStyle, setNewStyle] = useState<HighlightStyle>('dark');
    const [newTitle, setNewTitle] = useState('');
    const [newSubtitle, setNewSubtitle] = useState('');

    useEffect(() => {
        fetchHighlights();
        fetchProducts();
    }, []);

    const fetchHighlights = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('home_highlights')
            .select(`
                *,
                product:products(id, nome, slug, product_images(url))
            `)
            .order('ordem', { ascending: true });

        if (error) {
            console.error('Error fetching highlights:', error);
            alert('Erro ao carregar novidades');
        } else {
            setHighlights((data as unknown as HomeHighlight[]) || []);
        }
        setLoading(false);
    };

    const fetchProducts = async () => {
        const { data } = await supabase
            .from('products')
            .select('id, nome, slug')
            .eq('ativo', true)
            .order('nome');

        if (data) setProducts(data as Product[]);
    };

    const handleAdd = async () => {
        if (!selectedProduct) return alert('Selecione um produto');

        const newOrder = highlights.length > 0 ? Math.max(...highlights.map(h => h.ordem)) + 1 : 1;

        const { error } = await supabase.from('home_highlights').insert({
            product_id: selectedProduct,
            titulo_override: newTitle || null,
            subtitulo_override: newSubtitle || null,
            estilo: newStyle,
            ordem: newOrder,
            ativo: true
        });

        if (error) {
            console.error(error);
            alert('Erro ao adicionar');
        } else {
            setIsAdding(false);
            resetForm();
            fetchHighlights();
        }
    };

    const resetForm = () => {
        setSelectedProduct('');
        setNewTitle('');
        setNewSubtitle('');
        setNewStyle('dark');
        setSearchTerm('');
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Tem certeza?')) return;
        const { error } = await supabase.from('home_highlights').delete().eq('id', id);
        if (!error) fetchHighlights();
    };

    const handleToggleActive = async (id: string, current: boolean) => {
        await supabase.from('home_highlights').update({ ativo: !current }).eq('id', id);
        fetchHighlights();
    };

    const handleMove = async (index: number, direction: 'up' | 'down') => {
        if (direction === 'up' && index === 0) return;
        if (direction === 'down' && index === highlights.length - 1) return;

        const newHighlights = [...highlights];
        const targetIndex = direction === 'up' ? index - 1 : index + 1;

        // Swap
        [newHighlights[index], newHighlights[targetIndex]] = [newHighlights[targetIndex], newHighlights[index]];

        // Update local state immediately for UX
        setHighlights(newHighlights);

        // Update IDs and Orders in DB
        // Simple strategy: update all orders based on new index + 1
        const updates = newHighlights.map((h, i) => ({
            id: h.id,
            ordem: i + 1
        }));

        for (const update of updates) {
            await supabase.from('home_highlights').update({ ordem: update.ordem }).eq('id', update.id);
        }
    };

    const filteredProducts = products.filter(p => p.nome.toLowerCase().includes(searchTerm.toLowerCase()));

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-800">Gerenciar Novidades (Home)</h1>
                <button
                    onClick={() => setIsAdding(!isAdding)}
                    className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                >
                    <Plus className="w-4 h-4" />
                    Adicionar Destaque
                </button>
            </div>

            {isAdding && (
                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm animate-in fade-in slide-in-from-top-4">
                    <h3 className="font-bold text-lg mb-4">Novo Destaque</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Buscar Produto</label>
                            <input
                                type="text"
                                placeholder="Digite para buscar..."
                                className="w-full p-2 border border-gray-300 rounded mb-2"
                                value={searchTerm}
                                onChange={e => setSearchTerm(e.target.value)}
                            />
                            <select
                                className="w-full p-2 border border-gray-300 rounded"
                                value={selectedProduct}
                                onChange={e => setSelectedProduct(e.target.value)}
                            >
                                <option value="">Selecione...</option>
                                {filteredProducts.map(p => (
                                    <option key={p.id} value={p.id}>{p.nome}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Estilo</label>
                            <select
                                className="w-full p-2 border border-gray-300 rounded"
                                value={newStyle}
                                onChange={e => setNewStyle(e.target.value as HighlightStyle)}
                            >
                                <option value="dark">Dark (Escuro)</option>
                                <option value="light">Light (Claro)</option>
                                <option value="blue">Blue (Azul)</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Título (Opcional)</label>
                            <input
                                type="text"
                                className="w-full p-2 border border-gray-300 rounded"
                                value={newTitle}
                                onChange={e => setNewTitle(e.target.value)}
                                placeholder="Sobrescrever nome do produto"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Subtítulo (Opcional)</label>
                            <input
                                type="text"
                                className="w-full p-2 border border-gray-300 rounded"
                                value={newSubtitle}
                                onChange={e => setNewSubtitle(e.target.value)}
                                placeholder="Ex: A partir de R$..."
                            />
                        </div>
                    </div>
                    <div className="flex justify-end gap-2">
                        <button
                            onClick={() => setIsAdding(false)}
                            className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
                        >
                            Cancelar
                        </button>
                        <button
                            onClick={handleAdd}
                            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 flex items-center gap-2"
                        >
                            <Save className="w-4 h-4" />
                            Salvar
                        </button>
                    </div>
                </div>
            )}

            {loading ? (
                <div className="flex justify-center p-12">
                    <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
                </div>
            ) : highlights.length === 0 ? (
                <div className="text-center py-12 text-gray-500 bg-white rounded-xl border border-gray-200">
                    Nenhuma novidade cadastrada.
                </div>
            ) : (
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th className="text-left p-4 text-xs font-semibold text-gray-500 uppercase">Ordem</th>
                                <th className="text-left p-4 text-xs font-semibold text-gray-500 uppercase">Produto</th>
                                <th className="text-left p-4 text-xs font-semibold text-gray-500 uppercase">Estilo</th>
                                <th className="text-center p-4 text-xs font-semibold text-gray-500 uppercase">Ativo</th>
                                <th className="text-right p-4 text-xs font-semibold text-gray-500 uppercase">Ações</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {highlights.map((item, index) => (
                                <tr key={item.id} className="hover:bg-gray-50">
                                    <td className="p-4 w-24">
                                        <div className="flex items-center gap-1">
                                            <span className="font-mono text-gray-500 w-6">{index + 1}</span>
                                            <div className="flex flex-col">
                                                <button
                                                    onClick={() => handleMove(index, 'up')}
                                                    disabled={index === 0}
                                                    className="p-1 hover:bg-gray-200 rounded disabled:opacity-30"
                                                >
                                                    <ArrowUp className="w-3 h-3" />
                                                </button>
                                                <button
                                                    onClick={() => handleMove(index, 'down')}
                                                    disabled={index === highlights.length - 1}
                                                    className="p-1 hover:bg-gray-200 rounded disabled:opacity-30"
                                                >
                                                    <ArrowDown className="w-3 h-3" />
                                                </button>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <div className="font-medium text-gray-900">
                                            {item.titulo_override || item.product?.nome || 'Produto Removido'}
                                        </div>
                                        {item.subtitulo_override && (
                                            <div className="text-xs text-gray-500">{item.subtitulo_override}</div>
                                        )}
                                    </td>
                                    <td className="p-4">
                                        <span className={`px-2 py-1 rounded text-xs font-bold uppercase
                                            ${item.estilo === 'dark' ? 'bg-gray-800 text-white' :
                                                item.estilo === 'blue' ? 'bg-blue-100 text-blue-800' :
                                                    'bg-yellow-100 text-yellow-800'}`}>
                                            {item.estilo}
                                        </span>
                                    </td>
                                    <td className="p-4 text-center">
                                        <button
                                            onClick={() => handleToggleActive(item.id, item.ativo)}
                                            className={`inline-block w-3 h-3 rounded-full ${item.ativo ? 'bg-green-500' : 'bg-gray-300'}`}
                                            title={item.ativo ? 'Ativo' : 'Inativo'}
                                        />
                                    </td>
                                    <td className="p-4 text-right">
                                        <button
                                            onClick={() => handleDelete(item.id)}
                                            className="text-red-500 hover:text-red-700 p-2 hover:bg-red-50 rounded transition"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
