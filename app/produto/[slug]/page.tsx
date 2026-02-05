import { supabase } from '@/lib/supabaseClient';
import { Product, getProductActivePrice } from '@/lib/types';
import { formatCurrency } from '@/lib/utils';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ShieldCheck, Truck, RefreshCcw } from 'lucide-react';
import AddToCartButton from '@/components/AddToCartButton';

export const revalidate = 0;

interface ProductPageProps {
    params: Promise<{ slug: string }>;
}

export default async function ProdutoPage({ params }: ProductPageProps) {
    const { slug } = await params;

    const { data: productData, error } = await supabase
        .from('products')
        .select(`
      *,
      prices!inner(*),
      product_images(*)
    `)
        .eq('slug', slug)
        .eq('ativo', true)
        .eq('prices.ativo', true)
        .single();

    if (error || !productData) {
        console.error('Error fetching product:', error);
        notFound();
    }

    const product = productData as unknown as Product;
    const price = getProductActivePrice(product);

    // Sort images
    const images = (product.product_images || []).sort((a, b) => a.ordem - b.ordem);

    return (
        <div className="bg-white min-h-screen pb-20">
            {/* Breadcrumbs */}
            <div className="bg-gray-50 border-b border-gray-100 py-4">
                <div className="container-fitch">
                    <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-gray-400">
                        <Link href="/" className="hover:text-black transition-colors">Início</Link>
                        <span>/</span>
                        <Link href="/catalogo" className="hover:text-black transition-colors">Catálogo</Link>
                        <span>/</span>
                        <span className="text-black truncate max-w-[200px]">{product.nome}</span>
                    </div>
                </div>
            </div>

            <div className="container-fitch py-12 lg:py-20">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
                    {/* Gallery */}
                    <div className="space-y-6">
                        <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden aspect-square flex items-center justify-center p-12 group transition-shadow hover:shadow-md">
                            {images.length > 0 ? (
                                <img
                                    src={images[0].url}
                                    alt={product.nome}
                                    className="object-contain w-full h-full mix-blend-multiply group-hover:scale-105 transition-transform duration-700"
                                />
                            ) : (
                                <div className="text-gray-300 font-bold uppercase tracking-widest text-xs">Sem imagem</div>
                            )}
                        </div>
                        {images.length > 1 && (
                            <div className="flex gap-4 overflow-x-auto pb-4 hide-scrollbar">
                                {images.map((img) => (
                                    <div key={img.id} className="min-w-[100px] bg-white rounded-2xl border border-gray-100 aspect-square p-3 flex items-center justify-center cursor-pointer hover:border-black transition-all shadow-sm hover:shadow-md h-24 w-24 flex-shrink-0">
                                        <img src={img.url} alt="" className="object-contain w-full h-full mix-blend-multiply" />
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Info */}
                    <div className="flex flex-col">
                        <div className="mb-10">
                            <div className="flex items-center gap-3 mb-4">
                                <span className="bg-black text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">
                                    {product.condicao}
                                </span>
                                <span className="text-gray-400 text-[10px] font-bold uppercase tracking-widest">
                                    {product.categoria}
                                </span>
                            </div>
                            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-6" style={{ fontFamily: 'var(--font-cinzel)' }}>
                                {product.nome}
                            </h1>
                            <div className="w-16 h-1 bg-black"></div>
                        </div>

                        <div className="bg-gray-50 p-8 rounded-[2.5rem] border border-gray-100 mb-10">
                            {price ? (
                                <div className="space-y-6">
                                    <div>
                                        <span className="text-gray-400 block text-[10px] font-bold uppercase tracking-widest mb-2">Preço à vista</span>
                                        <div className="flex items-baseline gap-2">
                                            <span className="text-5xl font-bold text-black">{formatCurrency(Number(price.avista))}</span>
                                            <span className="text-green-600 font-bold text-xs uppercase tracking-widest">Pix/Dinheiro</span>
                                        </div>
                                    </div>

                                    {price.doze_parcela && (
                                        <div className="pt-6 border-t border-gray-200">
                                            <span className="text-gray-400 block text-[10px] font-bold uppercase tracking-widest mb-2">Parcelado no Cartão</span>
                                            <p className="text-2xl text-gray-900 font-bold">
                                                12x de {formatCurrency(Number(price.doze_parcela))}
                                            </p>
                                            <p className="text-xs text-gray-400 font-medium mt-1">Total: {formatCurrency(Number(price.doze_total))}</p>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <p className="text-xl text-gray-400 font-bold uppercase tracking-widest">Preço sob consulta</p>
                            )}
                        </div>

                        <div className="space-y-6 mb-12">
                            <AddToCartButton product={product} />
                            {product.estoque <= 0 && (
                                <p className="text-center text-red-500 font-bold uppercase tracking-widest text-[10px]">Produto Indisponível no Momento</p>
                            )}
                        </div>

                        {/* Store Benefits */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-10 border-t border-gray-100">
                            <div className="flex flex-col items-center text-center gap-3">
                                <ShieldCheck className="w-6 h-6 text-gray-400" />
                                <span className="text-[10px] font-bold uppercase tracking-widest text-gray-900">Garantia Fitch</span>
                            </div>
                            <div className="flex flex-col items-center text-center gap-3">
                                <Truck className="w-6 h-6 text-gray-400" />
                                <span className="text-[10px] font-bold uppercase tracking-widest text-gray-900">Entrega Rápida</span>
                            </div>
                            <div className="flex flex-col items-center text-center gap-3">
                                <RefreshCcw className="w-6 h-6 text-gray-400" />
                                <span className="text-[10px] font-bold uppercase tracking-widest text-gray-900">Troca Facilitada</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Details Section */}
                <div className="mt-20 lg:mt-32 pt-20 border-t border-gray-100">
                    <div className="max-w-3xl">
                        <h2 className="text-3xl font-bold text-gray-900 mb-8 uppercase tracking-widest" style={{ fontFamily: 'var(--font-cinzel)' }}>Especificações</h2>
                        <div className="prose prose-lg text-gray-600 mb-12">
                            <p className="leading-relaxed">{product.descricao_curta || 'Sem descrição detalhada.'}</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 lg:gap-x-12">
                            {product.armazenamento && (
                                <div className="flex justify-between items-center py-4 border-b border-gray-50">
                                    <span className="text-gray-400 uppercase tracking-widest text-[10px] font-bold">Armazenamento</span>
                                    <span className="text-gray-900 font-bold">{product.armazenamento}</span>
                                </div>
                            )}
                            {product.cor && (
                                <div className="flex justify-between items-center py-4 border-b border-gray-50">
                                    <span className="text-gray-400 uppercase tracking-widest text-[10px] font-bold">Cor</span>
                                    <span className="text-gray-900 font-bold">{product.cor}</span>
                                </div>
                            )}
                            {product.bateria_percentual && (
                                <div className="flex justify-between items-center py-4 border-b border-gray-50">
                                    <span className="text-gray-400 uppercase tracking-widest text-[10px] font-bold">Saúde da Bateria</span>
                                    <span className="text-green-600 font-bold">{product.bateria_percentual}%</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

