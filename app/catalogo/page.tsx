import { supabase } from '@/lib/supabaseClient';
import { Product, getProductMainImage, getProductActivePrice } from '@/lib/types';
import CatalogFilters from '@/components/CatalogFilters';
import { formatCurrency } from '@/lib/utils';
import Link from 'next/link';
import AddToCartButton from '@/components/AddToCartButton';

export const revalidate = 0; // Dynamic data

interface SearchParamsProps {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function CatalogoPage({ searchParams }: SearchParamsProps) {
    const params = await searchParams;
    const q = typeof params.q === 'string' ? params.q : '';
    const categoria = typeof params.categoria === 'string' ? params.categoria : '';

    // Base query
    let query = supabase
        .from('products')
        .select(`
      *,
      prices!inner(*),
      product_images(*)
    `)
        .eq('ativo', true)
        .eq('prices.ativo', true);

    // Filters
    if (q) {
        query = query.ilike('nome', `%${q}%`);
    }

    if (categoria) {
        query = query.eq('categoria', categoria);
    }

    // Ordering: Destaque DESC, Nome ASC
    query = query.order('destaque', { ascending: false }).order('nome', { ascending: true });

    const { data: productsData, error } = await query;

    if (error) {
        console.error('Error fetching products:', error);
        return <div className="text-red-500">Erro ao carregar produtos. Tente novamente mais tarde.</div>;
    }

    const products = (productsData as unknown as Product[]) || [];

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center flex-wrap gap-4">
                <h1 className="text-4xl font-bold text-gray-900" style={{ fontFamily: 'var(--font-cinzel)' }}>Catálogo</h1>
                <p className="text-gray-400 font-bold uppercase tracking-widest text-[10px]">{products.length} produto(s) encontrado(s)</p>
            </div>

            <CatalogFilters />

            {products.length === 0 ? (
                <div className="text-center py-20 text-gray-400 font-bold uppercase tracking-widest text-xs">
                    Nenhum produto encontrado com os filtros selecionados.
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {products.map((product) => {
                        const price = getProductActivePrice(product);
                        const mainImage = getProductMainImage(product);
                        const isOutOfStock = product.estoque <= 0;

                        return (
                            <div key={product.id} className={`bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col group ${isOutOfStock ? 'opacity-75 grayscale' : ''}`}>
                                <Link href={isOutOfStock ? '#' : `/produto/${product.slug}`} className="block relative aspect-[4/5] bg-white overflow-hidden h-64 border-b border-gray-100">
                                    <img
                                        src={mainImage}
                                        alt={product.nome}
                                        className={`w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-500 mix-blend-multiply ${isOutOfStock ? 'grayscale' : ''}`}
                                    />
                                    {isOutOfStock && (
                                        <div className="absolute inset-0 flex items-center justify-center bg-black/5 z-10 transition-opacity">
                                            <span className="bg-red-600 text-white px-3 py-1 text-[10px] font-bold rounded-full uppercase tracking-widest shadow-lg">ESGOTADO</span>
                                        </div>
                                    )}
                                    {product.destaque && !isOutOfStock && (
                                        <div className="absolute top-3 left-3 bg-amber-400 text-white text-[10px] uppercase font-bold px-2 py-1 rounded shadow-sm">
                                            Destaque
                                        </div>
                                    )}
                                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur text-gray-700 text-[10px] font-bold px-2 py-1 rounded shadow-sm border border-gray-100">
                                        {product.condicao}
                                    </div>
                                </Link>

                                <div className="p-6 flex flex-col flex-grow">
                                    <div className="mb-1 text-[10px] text-gray-400 font-bold uppercase tracking-widest">{product.categoria}</div>
                                    <Link href={isOutOfStock ? '#' : `/produto/${product.slug}`} className="block mb-4">
                                        <h2 className="font-bold text-gray-900 line-clamp-2 min-h-[3rem] text-lg leading-tight group-hover:text-black transition-colors">
                                            {product.nome}
                                        </h2>
                                    </Link>

                                    <ul className="text-[10px] text-gray-400 space-y-1 mb-6 font-bold uppercase tracking-widest">
                                        {product.armazenamento && <li className="flex items-center gap-2"><div className="w-1 h-1 bg-gray-300 rounded-full"></div> {product.armazenamento}</li>}
                                        {product.cor && <li className="flex items-center gap-2"><div className="w-1 h-1 bg-gray-300 rounded-full"></div> {product.cor}</li>}
                                    </ul>

                                    <div className="mt-auto space-y-4">
                                        <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
                                            {price ? (
                                                <>
                                                    <div className="flex items-baseline gap-1">
                                                        <span className="text-2xl font-bold text-gray-900">{formatCurrency(Number(price.avista))}</span>
                                                        <span className="text-[10px] text-green-600 font-bold uppercase tracking-widest">à vista</span>
                                                    </div>
                                                    {price.doze_parcela && (
                                                        <div className="text-[10px] text-gray-400 mt-1 font-bold uppercase tracking-widest">
                                                            ou 12x de {formatCurrency(Number(price.doze_parcela))}
                                                        </div>
                                                    )}
                                                </>
                                            ) : (
                                                <div className="text-gray-400 font-bold text-[10px] uppercase tracking-widest">Preço sob consulta</div>
                                            )}
                                        </div>

                                        {!isOutOfStock && <AddToCartButton product={product} className="py-3.5 text-[10px]" />}

                                        <Link
                                            href={isOutOfStock ? '#' : `/produto/${product.slug}`}
                                            className={`block w-full text-center py-2 rounded-xl font-bold transition-all text-[10px] uppercase tracking-[0.2em]
                                                ${isOutOfStock
                                                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                                    : 'text-gray-400 hover:text-black'
                                                }`}
                                        >
                                            {isOutOfStock ? 'Esgotado' : 'VER MAIS DETALHES'}
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
