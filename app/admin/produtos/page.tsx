'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabaseClient';
import { Product, Price, ProductImage, Category, Condition } from '@/lib/types';
import { Edit, Plus, Search } from 'lucide-react';

export default function ProductsPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [categoryFilter, setCategoryFilter] = useState<Category | 'All'>('All');

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        const { data, error } = await supabase
            .from('products')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Error fetching products:', error);
        } else {
            setProducts((data as Product[]) || []);
        }
        setLoading(false);
    };

    const filteredProducts = products.filter(product => {
        const matchesSearch = product.nome.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = categoryFilter === 'All' || product.categoria === categoryFilter;
        return matchesSearch && matchesCategory;
    });

    const categories: Category[] = [
        'iPhone Lacrado',
        'iPhone Seminovos',
        'Produtos Apple',
        'Android',
        'Eletrônicos',
        'Acessórios'
    ];

    if (loading) return <div className="text-center py-10">Carregando...</div>;

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <h1 className="text-2xl font-bold text-gray-900">Produtos</h1>
                <Link
                    href="/admin/produtos/novo"
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition"
                >
                    <Plus size={20} />
                    Novo Produto
                </Link>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-sm flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input
                        type="text"
                        placeholder="Buscar produto..."
                        className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <select
                    className="border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value as Category | 'All')}
                >
                    <option value="All">Todas Categorias</option>
                    {categories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                    ))}
                </select>
            </div>

            <div className="bg-white rounded-lg shadow overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 border-b">
                        <tr>
                            <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">Nome</th>
                            <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">Categoria</th>
                            <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">Condição</th>
                            <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">Estoque</th>
                            <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">Status</th>
                            <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">Ações</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {filteredProducts.map((product) => (
                            <tr key={product.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 font-medium text-gray-900">{product.nome}</td>
                                <td className="px-6 py-4 text-gray-600">{product.categoria}</td>
                                <td className="px-6 py-4">
                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${product.condicao === 'Lacrado' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                                        }`}>
                                        {product.condicao}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-gray-600">{product.estoque}</td>
                                <td className="px-6 py-4">
                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${product.ativo ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                                        }`}>
                                        {product.ativo ? 'Ativo' : 'Inativo'}
                                    </span>
                                    {product.destaque && (
                                        <span className="ml-2 px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-700">
                                            Destaque
                                        </span>
                                    )}
                                </td>
                                <td className="px-6 py-4">
                                    <Link
                                        href={`/admin/produtos/${product.id}`}
                                        className="text-blue-600 hover:text-blue-800 p-2 rounded-full hover:bg-blue-50 inline-block"
                                    >
                                        <Edit size={18} />
                                    </Link>
                                </td>
                            </tr>
                        ))}
                        {filteredProducts.length === 0 && (
                            <tr>
                                <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                                    Nenhum produto encontrado.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
