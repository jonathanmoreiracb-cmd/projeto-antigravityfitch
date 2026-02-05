'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { Product, Price, CATEGORIES } from '@/lib/types';
import { formatCurrency } from '@/lib/utils';

// Extended type for editing
interface EditableProduct extends Product {
    priceId?: string;
    priceAvista: number;
    priceDozeParcela: number;
    priceDozeTotal: number;
    isModified: boolean;
}

export default function AdminPrecosPage() {
    const [products, setProducts] = useState<EditableProduct[]>([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [msg, setMsg] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    // Filters
    const [filterCategory, setFilterCategory] = useState('');
    const [filterName, setFilterName] = useState('');
    const [filterInStock, setFilterInStock] = useState(false);

    const fetchData = async () => {
        setLoading(true);
        setMsg(null);
        try {
            const { data, error } = await supabase
                .from('products')
                .select(`
          *,
          prices(*),
          product_images(url, ordem)
        `)
                .order('nome');

            if (error) throw error;

            // Transform structure for easier editing
            const transformed: EditableProduct[] = (data || []).map((p: any) => {
                // Find active price or first price
                const activePrice = p.prices?.find((px: any) => px.ativo) || p.prices?.[0];

                return {
                    ...p,
                    priceId: activePrice?.id,
                    priceAvista: activePrice?.avista || 0,
                    priceDozeParcela: activePrice?.doze_parcela || 0,
                    priceDozeTotal: activePrice?.doze_total || 0,
                    isModified: false
                };
            });

            setProducts(transformed);
        } catch (err) {
            console.error(err);
            setMsg({ type: 'error', text: 'Erro ao carregar dados.' });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    // Update Local State on Edit
    const handleEdit = (id: string, field: keyof EditableProduct, value: any) => {
        setProducts(prev => prev.map(p => {
            if (p.id === id) {
                return { ...p, [field]: value, isModified: true };
            }
            return p;
        }));
    };

    const handleBatchCopy12x = () => {
        // Copies Avista -> 12x Total for visible rows
        const idsToUpdate = filteredProducts.map(p => p.id);
        setProducts(prev => prev.map(p => {
            if (idsToUpdate.includes(p.id)) {
                return {
                    ...p,
                    priceDozeTotal: p.priceAvista, // Copy value
                    priceDozeParcela: p.priceAvista > 0 ? parseFloat((p.priceAvista / 12).toFixed(2)) : 0, // Auto calc installment approx
                    isModified: true
                };
            }
            return p;
        }));
    };

    const handleSave = async () => {
        setSaving(true);
        setMsg(null);

        const modified = products.filter(p => p.isModified);
        if (modified.length === 0) {
            setSaving(false);
            return;
        }

        try {
            let errors = 0;

            // Process updates (could be optimized with upsert batching but logic differs per table)
            for (const p of modified) {
                // Validation
                if (p.ativo && p.priceAvista <= 0) {
                    console.warn(`Produto ${p.nome} está ativo mas sem preço.`);
                    // Optional: force active=false? keep going?
                }

                // 1. Update Product info
                const { error: prodError } = await supabase
                    .from('products')
                    .update({
                        estoque: p.estoque,
                        destaque: p.destaque,
                        ativo: p.ativo,
                        categoria: p.categoria
                    })
                    .eq('id', p.id);

                if (prodError) errors++;

                // 2. Update/Insert Price
                if (p.priceId) {
                    // Update existing
                    const { error: priceError } = await supabase
                        .from('prices')
                        .update({
                            avista: p.priceAvista,
                            doze_parcela: p.priceDozeParcela || null,
                            doze_total: p.priceDozeTotal || null,
                            ativo: true // Ensure it stays active
                        })
                        .eq('id', p.priceId);

                    if (priceError) errors++;

                } else {
                    // Create new active price
                    const { error: priceError } = await supabase
                        .from('prices')
                        .insert({
                            product_id: p.id,
                            avista: p.priceAvista,
                            doze_parcela: p.priceDozeParcela || null,
                            doze_total: p.priceDozeTotal || null,
                            ativo: true
                        });

                    if (priceError) errors++;
                }
            }

            if (errors > 0) {
                setMsg({ type: 'error', text: `${errors} erros ocorreram ao salvar. Consulte o console.` });
            } else {
                setMsg({ type: 'success', text: 'Alterações salvas com sucesso!' });
                await fetchData(); // Reload to get fresh IDs etc
            }

        } catch (err) {
            console.error(err);
            setMsg({ type: 'error', text: 'Erro crítico ao salvar.' });
        } finally {
            setSaving(false);
        }
    };

    // Filter Logic
    const filteredProducts = products.filter(p => {
        const matchCat = filterCategory ? p.categoria === filterCategory : true;
        const matchName = filterName ? p.nome.toLowerCase().includes(filterName.toLowerCase()) : true;
        const matchStock = filterInStock ? p.estoque > 0 : true;
        return matchCat && matchName && matchStock;
    });

    return (
        <div className="space-y-6">
            {/* Header / Actions */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-4 rounded-lg shadow-sm">
                <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                    <input
                        type="text"
                        placeholder="Buscar nome..."
                        value={filterName}
                        onChange={e => setFilterName(e.target.value)}
                        className="border p-2 rounded text-sm w-full sm:w-48"
                    />
                    <select
                        value={filterCategory}
                        onChange={e => setFilterCategory(e.target.value)}
                        className="border p-2 rounded text-sm w-full sm:w-48"
                    >
                        <option value="">Todas as Categorias</option>
                        {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                    <label className="flex items-center space-x-2 text-sm text-gray-700 cursor-pointer select-none">
                        <input
                            type="checkbox"
                            checked={filterInStock}
                            onChange={e => setFilterInStock(e.target.checked)}
                            className="rounded text-blue-600 focus:ring-blue-500"
                        />
                        <span>Com Estoque</span>
                    </label>
                </div>

                <div className="flex space-x-2 w-full md:w-auto">
                    <button
                        onClick={fetchData}
                        className="px-4 py-2 text-gray-600 bg-gray-100 hover:bg-gray-200 rounded text-sm font-medium transition"
                    >
                        Recarregar
                    </button>
                    <button
                        onClick={handleSave}
                        disabled={saving}
                        className="flex-grow md:flex-grow-0 px-6 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded text-sm font-medium transition shadow-sm disabled:opacity-50"
                    >
                        {saving ? 'Salvando...' : 'Salvar Alterações'}
                    </button>
                </div>
            </div>

            {/* Messages */}
            {msg && (
                <div className={`p-4 rounded-lg text-sm font-medium ${msg.type === 'success' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
                    {msg.text}
                </div>
            )}

            {/* Advanced Tools */}
            <div className="flex justify-end">
                <button
                    onClick={handleBatchCopy12x}
                    className="text-xs text-blue-600 hover:text-blue-800 underline disabled:opacity-50"
                >
                    Copiar valor à vista para 12x Total (nos itens visíveis)
                </button>
            </div>

            {/* Table */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-500 min-w-[1000px]">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b">
                        <tr>
                            <th className="px-4 py-3 w-12 text-center">Img</th>
                            <th className="px-4 py-3 min-w-[200px]">Produto</th>
                            <th className="px-4 py-3 w-32">Categoria</th>
                            <th className="px-4 py-3 w-24">Estoque</th>
                            <th className="px-4 py-3 w-32">Preço À Vista</th>
                            <th className="px-4 py-3 w-32">12x Parcela</th>
                            <th className="px-4 py-3 w-32">12x Total</th>
                            <th className="px-4 py-3 w-20 text-center">Destaque</th>
                            <th className="px-4 py-3 w-20 text-center">Ativo</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {loading ? (
                            <tr><td colSpan={9} className="p-8 text-center bg-gray-50">Carregando dados...</td></tr>
                        ) : filteredProducts.length === 0 ? (
                            <tr><td colSpan={9} className="p-8 text-center text-gray-400">Nenhum produto encontrado.</td></tr>
                        ) : (
                            filteredProducts.map(product => {
                                const mainImg = product.product_images?.[0]?.url || '/placeholder.png';
                                return (
                                    <tr key={product.id} className={`hover:bg-gray-50 transition ${product.isModified ? 'bg-blue-50/30' : ''}`}>
                                        <td className="px-4 py-3">
                                            <img src={mainImg} alt="" className="w-8 h-8 rounded object-contain bg-gray-100 border" />
                                        </td>
                                        <td className="px-4 py-3 font-medium text-gray-900">
                                            <div className="truncate max-w-[200px]" title={product.nome}>{product.nome}</div>
                                            <div className="text-xs text-gray-400">{product.condicao}</div>
                                        </td>
                                        <td className="px-4 py-3">
                                            <select
                                                value={product.categoria}
                                                onChange={e => handleEdit(product.id, 'categoria', e.target.value)}
                                                className="border-transparent bg-transparent hover:border-gray-300 focus:border-blue-500 border rounded cursor-pointer w-full text-xs py-1"
                                            >
                                                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                                            </select>
                                        </td>
                                        <td className="px-4 py-3">
                                            <input
                                                type="number"
                                                min="0"
                                                value={product.estoque}
                                                onChange={e => handleEdit(product.id, 'estoque', parseInt(e.target.value) || 0)}
                                                className={`w-20 p-1 border rounded text-right ${product.estoque === 0 ? 'text-red-600 font-bold bg-red-50' : 'text-gray-900'}`}
                                            />
                                        </td>
                                        <td className="px-4 py-3">
                                            <div className="relative">
                                                <span className="absolute left-2 top-1.5 text-gray-400">R$</span>
                                                <input
                                                    type="number"
                                                    step="0.01"
                                                    value={product.priceAvista}
                                                    onChange={e => handleEdit(product.id, 'priceAvista', parseFloat(e.target.value) || 0)}
                                                    className="w-full pl-7 pr-2 py-1 border rounded text-right font-medium text-gray-900 focus:ring-1 focus:ring-blue-500"
                                                />
                                            </div>
                                        </td>
                                        <td className="px-4 py-3">
                                            <input
                                                type="number"
                                                step="0.01"
                                                placeholder="0.00"
                                                value={product.priceDozeParcela}
                                                onChange={e => handleEdit(product.id, 'priceDozeParcela', parseFloat(e.target.value) || 0)}
                                                className="w-full p-1 border rounded text-right text-gray-600 focus:ring-1 focus:ring-blue-500"
                                            />
                                        </td>
                                        <td className="px-4 py-3">
                                            <input
                                                type="number"
                                                step="0.01"
                                                placeholder="0.00"
                                                value={product.priceDozeTotal}
                                                onChange={e => handleEdit(product.id, 'priceDozeTotal', parseFloat(e.target.value) || 0)}
                                                className="w-full p-1 border rounded text-right text-gray-600 focus:ring-1 focus:ring-blue-500"
                                            />
                                        </td>
                                        <td className="px-4 py-3 text-center">
                                            <input
                                                type="checkbox"
                                                checked={product.destaque}
                                                onChange={e => handleEdit(product.id, 'destaque', e.target.checked)}
                                                className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500 cursor-pointer"
                                            />
                                        </td>
                                        <td className="px-4 py-3 text-center">
                                            <button
                                                onClick={() => handleEdit(product.id, 'ativo', !product.ativo)}
                                                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${product.ativo ? 'bg-green-500' : 'bg-gray-200'}`}
                                            >
                                                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${product.ativo ? 'translate-x-6' : 'translate-x-1'}`} />
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })
                        )}
                    </tbody>
                </table>
            </div>

            <p className="text-xs text-gray-400 text-right">
                * Alterações são salvas apenas ao clicar em "Salvar Alterações".
            </p>
        </div>
    );
}
