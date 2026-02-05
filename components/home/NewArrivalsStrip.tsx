"use client";

import Link from 'next/link';
import { ArrowRight, Star, ShoppingBag, Check } from 'lucide-react';
import { supabase } from '@/lib/supabaseClient';
import { HomeHighlight, getProductMainImage, getProductActivePrice, Product } from '@/lib/types';
import { formatCurrency } from '@/lib/utils';
import { useEffect, useState } from 'react';
import { useCartStore } from '@/lib/cartStore';

export default function NewArrivalsStrip() {
    const [highlights, setHighlights] = useState<HomeHighlight[]>([]);
    const addItem = useCartStore((state) => state.addItem);
    const [addedId, setAddedId] = useState<string | null>(null);

    useEffect(() => {
        async function fetchHighlights() {
            const { data } = await supabase
                .from('home_highlights')
                .select(`
                    *,
                    product:products(*, prices(*), product_images(*))
                `)
                .eq('ativo', true)
                .order('ordem', { ascending: true });

            setHighlights((data as unknown as HomeHighlight[]) || []);
        }
        fetchHighlights();
    }, []);

    const handleAddToCart = (e: React.MouseEvent, product: Product) => {
        e.preventDefault();
        e.stopPropagation();
        addItem(product);
        setAddedId(product.id);
        setTimeout(() => setAddedId(null), 2000);
    };

    if (highlights.length === 0) return null;

    return (
        <section className="bg-white py-12 border-b border-gray-100">
            <div className="container-fitch">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-900 tracking-tight flex items-center gap-2" style={{ fontFamily: 'var(--font-cinzel)' }}>
                        <Star className="w-6 h-6 text-yellow-500 fill-yellow-500" />
                        Novidades
                    </h2>
                    <Link href="/catalogo" className="text-gray-900 font-bold hover:text-gray-600 flex items-center gap-2 text-xs uppercase tracking-widest group transition-colors">
                        Ver Catálogo
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>

                <div className="flex gap-4 overflow-x-auto pb-4 hide-scrollbar snap-x">
                    {highlights.map((item) => {
                        const product = item.product;
                        if (!product) return null;

                        const image = getProductMainImage(product);
                        const priceObj = getProductActivePrice(product);
                        const price = priceObj ? formatCurrency(priceObj.avista) : 'Consulte';
                        const title = item.titulo_override || product.nome;
                        const isAdded = addedId === product.id;

                        return (
                            <div key={item.id} className="min-w-[200px] md:min-w-[240px] flex-shrink-0 snap-start group relative cursor-pointer">
                                <Link href={`/produto/${product.slug}`} className="block">
                                    <div className="relative h-[220px] md:h-[260px] rounded-2xl overflow-hidden bg-white mb-3 border border-gray-100 shadow-sm group-hover:shadow-md transition-shadow">
                                        <img
                                            src={image || "/placeholder.png"}
                                            alt={title}
                                            className="w-full h-full object-contain p-4 mix-blend-multiply group-hover:scale-105 transition-transform duration-500"
                                        />
                                        <span className={`absolute top-3 left-3 text-white text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-widest
                                            ${item.estilo === 'blue' ? 'bg-blue-600' :
                                                item.estilo === 'light' ? 'bg-gray-200 text-gray-800' :
                                                    'bg-black'}`}>
                                            Novidade
                                        </span>

                                        {/* Quick Add Button */}
                                        <button
                                            onClick={(e) => handleAddToCart(e, product)}
                                            className={`absolute bottom-3 right-3 w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-all scale-90 opacity-0 group-hover:scale-100 group-hover:opacity-100
                                                ${isAdded ? 'bg-green-500 text-white' : 'bg-black text-white hover:bg-gray-900'}`}
                                        >
                                            {isAdded ? (
                                                <Check className="w-5 h-5" />
                                            ) : (
                                                <ShoppingBag className="w-5 h-5" />
                                            )}
                                        </button>
                                    </div>
                                    <h3 className="font-bold text-gray-900 truncate pr-2 group-hover:text-black transition-colors text-sm">
                                        {title}
                                    </h3>
                                    <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">
                                        {item.subtitulo_override || price}
                                    </p>
                                </Link>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

