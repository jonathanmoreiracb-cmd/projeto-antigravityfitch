import Link from 'next/link';
import Image from 'next/image';
import { Calendar, ArrowLeft, Share2, MessageCircle } from 'lucide-react';
import { notFound } from 'next/navigation';

// Mock data shared with the list page (ideally would be in a shared lib)
const blogPosts = [
    {
        slug: 'iphone-16-pro-o-que-esperar',
        title: 'iPhone 16 Pro: Tudo o que você precisa saber sobre o novo lançamento',
        content: `
      <p>O iPhone 16 Pro está chegando para redefinir o que esperamos de um smartphone premium. Com o novo chip A18 Pro, a Apple promete um salto de desempenho sem precedentes, focado especialmente em inteligência artificial e processamento de imagem.</p>
      
      <h2>Design e Tela</h2>
      <p>Espera-se que o iPhone 16 Pro apresente telas ligeiramente maiores, graças a bordas ainda mais finas. O titânio continua sendo o material de escolha, garantindo leveza e resistência extrema.</p>
      
      <h2>Câmeras Revolucionárias</h2>
      <p>A grande novidade na câmera deve ser o sensor ultra-wide de 48MP, permitindo fotos Macro com detalhes absurdos e vídeos em resolução profissional. Além disso, o zoom óptico de 5x deve chegar também ao modelo Pro menor.</p>
      
      <h2>Inteligência Apple</h2>
      <p>Com o iOS 18, o iPhone 16 Pro será o centro da "Apple Intelligence", trazendo recursos de resumo de texto, geração de imagens e uma Siri muito mais inteligente e integrada ao contexto do usuário.</p>
    `,
        date: '2024-03-20',
        category: 'Lançamentos',
        image: '/blog/iphone-16.jpg',
    },
    {
        slug: 'dicas-bateria-iphone',
        title: '10 dicas essenciais para aumentar a vida útil da sua bateria',
        content: `
      <p>A saúde da bateria é uma das maiores preocupações de quem possui um iPhone. Aqui estão 10 dicas valiosas para garantir que sua bateria dure mais por carga e tenha uma vida útil longa.</p>
      
      <h2>1. Evite temperaturas extremas</h2>
      <p>O calor é o maior inimigo das baterias de íon de lítio. Nunca deixe seu iPhone no painel do carro ou exposto diretamente ao sol por longos períodos.</p>
      
      <h2>2. Use o Carregamento Otimizado</h2>
      <p>Ative o recurso no menu de Saúde da Bateria. Isso reduz o desgaste da bateria ao aprender sua rotina diária de carregamento até que você precise usá-lo.</p>
      
      <h2>3. Atualize seu Software</h2>
      <p>A Apple sempre inclui melhorias de eficiência energética nas atualizações do iOS. Mantenha seu sistema sempre na versão mais recente.</p>
    `,
        date: '2024-03-15',
        category: 'Dicas',
        image: '/blog/battery.jpg',
    },
];

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const post = blogPosts.find(p => p.slug === slug);

    if (!post) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-white pb-20">
            {/* Post Header */}
            <section className="pt-12 pb-16 bg-gray-50 border-b border-gray-100">
                <div className="container-fitch max-w-3xl">
                    <Link
                        href="/blog"
                        className="inline-flex items-center gap-2 text-gray-500 hover:text-black transition-colors mb-12 uppercase tracking-widest text-[10px] font-bold"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Voltar ao Blog
                    </Link>

                    <div className="bg-white px-3 py-1 rounded-full shadow-sm text-[10px] font-bold uppercase tracking-wider text-black inline-block mb-6">
                        {post.category}
                    </div>

                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8 leading-tight">
                        {post.title}
                    </h1>

                    <div className="flex items-center gap-6 text-gray-400 text-sm">
                        <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            <span>{new Date(post.date).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })}</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Post Content */}
            <article className="py-16">
                <div className="container-fitch max-w-3xl">
                    {/* Featured Image Placeholder */}
                    <div className="relative h-[400px] w-full bg-gray-200 rounded-3xl mb-12 flex items-center justify-center text-gray-400 text-sm">
                        FOTO DE CAPA DO ARTIGO
                    </div>

                    <div
                        className="prose prose-lg prose-black max-w-none text-gray-800 leading-relaxed space-y-6"
                        dangerouslySetInnerHTML={{ __html: post.content }}
                    />

                    {/* Share Section */}
                    <div className="mt-20 pt-12 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between gap-8">
                        <div className="flex items-center gap-4 text-gray-400 text-sm font-medium">
                            <span className="uppercase tracking-widest">Compartilhar:</span>
                            <button className="p-3 border border-gray-100 rounded-full hover:bg-gray-50 transition-colors">
                                <Share2 className="w-4 h-4" />
                            </button>
                        </div>

                        <Link
                            href="https://wa.me/5524999743888"
                            target="_blank"
                            className="flex items-center gap-2 px-8 py-4 bg-green-500 text-white font-bold rounded-full hover:bg-green-600 transition-colors uppercase tracking-widest text-xs"
                        >
                            <MessageCircle className="w-4 h-4" />
                            Tire suas dúvidas no Whats
                        </Link>
                    </div>
                </div>
            </article>

            {/* Bottom CTA */}
            <section className="py-20 bg-black text-white text-center">
                <div className="container-fitch max-w-xl">
                    <h2 className="text-3xl font-bold mb-6" style={{ fontFamily: 'var(--font-cinzel)' }}>
                        Gostou das novidades?
                    </h2>
                    <p className="text-gray-400 mb-10">
                        Acompanhe a Fitch Tecnologia também no Instagram para ver todos esses produtos ao vivo e em detalhes.
                    </p>
                    <Link
                        href="https://instagram.com/fitch.tecnologia"
                        target="_blank"
                        className="inline-block px-10 py-5 bg-white text-black font-bold rounded-full hover:bg-gray-100 transition-colors uppercase tracking-widest text-xs"
                    >
                        Seguir no Instagram
                    </Link>
                </div>
            </section>
        </div>
    );
}
