"use client";

import Link from 'next/link';
import { Product, getProductActivePrice, getProductMainImage } from '@/lib/types';
import { formatCurrency } from '@/lib/utils';
import { ShoppingBag, Check } from 'lucide-react';
import { useCartStore } from '@/lib/cartStore';
import { useState } from 'react';

interface BestSellersGridProps {
    products: Product[];
}

export default function BestSellersGrid({ products }: BestSellersGridProps) {
    const addItem = useCartStore((state) => state.addItem);
    const [addedId, setAddedId] = useState<string | null>(null);

    const handleAddToCart = (product: Product) => {
        addItem(product);
        setAddedId(product.id);
        setTimeout(() => setAddedId(null), 2000);
    };

    return (
        <section className="py-16 bg-gray-50">
            <div className="container-fitch">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'var(--font-cinzel)' }}>Produtos Mais Vendidos</h2>
                    <p className="text-gray-500 max-w-2xl mx-auto">
                        Confira nossa seleção especial de produtos top de linha com as melhores condições do mercado.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {products.map((product) => {
                        const price = getProductActivePrice(product);
                        const mainImage = getProductMainImage(product);
                        const priceAvista = price ? formatCurrency(price.avista) : 'Consulte';
                        const isAdded = addedId === product.id;

                        return (
                            <div key={product.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col group">
                                <Link href={`/produto/${product.slug}`} className="block relative aspect-[4/5] bg-white overflow-hidden">
                                    <img
                                        src={mainImage}
                                        alt={product.nome}
                                        className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-500 mix-blend-multiply"
                                    />
                                    {product.destaque && (
                                        <div className="absolute top-3 left-3 bg-amber-400 text-white text-[10px] uppercase font-bold px-2 py-1 rounded shadow-sm">
                                            Destaque
                                        </div>
                                    )}
                                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur text-gray-700 text-[10px] font-bold px-2 py-1 rounded shadow-sm border border-gray-100">
                                        {product.condicao}
                                    </div>
                                </Link>

                                <div className="p-5 flex flex-col flex-grow">
                                    <div className="mb-1 text-xs text-gray-500 font-medium uppercase tracking-wider">{product.categoria}</div>
                                    <Link href={`/produto/${product.slug}`} className="block mb-3">
                                        <h3 className="font-bold text-gray-900 line-clamp-2 min-h-[3rem] text-lg leading-tight group-hover:text-black transition-colors">
                                            {product.nome}
                                        </h3>
                                    </Link>

                                    <div className="mt-auto space-y-4">
                                        <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                                            {price ? (
                                                <>
                                                    <div className="flex items-baseline gap-1">
                                                        <span className="text-2xl font-bold text-gray-900">{priceAvista}</span>
                                                        <span className="text-xs text-green-600 font-semibold">à vista</span>
                                                    </div>
                                                    {price.doze_parcela && (
                                                        <div className="text-xs text-gray-500 mt-1">
                                                            ou 12x de {formatCurrency(price.doze_parcela)}
                                                        </div>
                                                    )}
                                                </>
                                            ) : (
                                                <div className="text-gray-400 font-medium">Preço sob consulta</div>
                                            )}
                                        </div>

                                        <button
                                            onClick={() => handleAddToCart(product)}
                                            className={`flex items-center justify-center gap-2 w-full font-bold py-3.5 px-4 rounded-xl transition-all shadow-sm active:scale-[0.98] uppercase tracking-widest text-[10px]
                                                ${isAdded
                                                    ? 'bg-green-500 text-white'
                                                    : 'bg-black text-white hover:bg-gray-900'}`}
                                        >
                                            {isAdded ? (
                                                <>
                                                    <Check className="w-4 h-4" />
                                                    Adicionado!
                                                </>
                                            ) : (
                                                <>
                                                    <ShoppingBag className="w-4 h-4" />
                                                    Adicionar à Sacola
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div className="text-center mt-16">
                    <Link
                        href="/catalogo"
                        className="inline-flex items-center justify-center px-12 py-5 bg-black text-white text-xs font-bold uppercase tracking-[0.3em] rounded-full hover:bg-gray-900 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 active:scale-95"
                        style={{ fontFamily: 'var(--font-cinzel)' }}
                    >
                        Ver Todo o Catálogo
                    </Link>
                </div>
            </div>
        </section>
    );
}

