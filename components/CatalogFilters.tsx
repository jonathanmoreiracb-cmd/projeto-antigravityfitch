'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { CATEGORIES } from '@/lib/types';
import { ChangeEvent, useState, useEffect } from 'react';

export default function CatalogFilters() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [search, setSearch] = useState(searchParams.get('q') || '');
    const [category, setCategory] = useState(searchParams.get('categoria') || '');

    // Debounce search update
    useEffect(() => {
        const timer = setTimeout(() => {
            updateParams(search, category);
        }, 500);

        return () => clearTimeout(timer);
    }, [search]); // Lint: logic implies dependencies

    const updateParams = (q: string, cat: string) => {
        const params = new URLSearchParams();
        if (q) params.set('q', q);
        if (cat) params.set('categoria', cat);

        router.push(`/catalogo?${params.toString()}`);
    };

    const handleCategoryChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const newCat = e.target.value;
        setCategory(newCat);
        updateParams(search, newCat);
    };

    const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
        // Debounce handles the push
    };

    return (
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 mb-8 flex flex-col md:flex-row gap-4 items-center">
            <div className="w-full md:w-1/3">
                <label htmlFor="search" className="sr-only">Buscar</label>
                <input
                    type="text"
                    id="search"
                    placeholder="Buscar produto..."
                    value={search}
                    onChange={handleSearchChange}
                    className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <div className="w-full md:w-1/3">
                <label htmlFor="category" className="sr-only">Categoria</label>
                <select
                    id="category"
                    value={category}
                    onChange={handleCategoryChange}
                    className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="">Todas as Categorias</option>
                    {CATEGORIES.map((cat) => (
                        <option key={cat} value={cat}>{cat}</option>
                    ))}
                </select>
            </div>
        </div>
    );
}
