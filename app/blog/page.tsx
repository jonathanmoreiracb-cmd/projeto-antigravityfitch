import Link from 'next/link';
import Image from 'next/image';
import { Calendar, ChevronRight } from 'lucide-react';

const blogPosts = [
    {
        slug: 'iphone-16-pro-o-que-esperar',
        title: 'iPhone 16 Pro: Tudo o que você precisa saber sobre o novo lançamento',
        excerpt: 'Descubra as principais novidades em design, câmera e desempenho do novo iPhone 16 Pro, o mais potente da Apple até hoje.',
        date: '2024-03-20',
        category: 'Lançamentos',
        image: '/blog/iphone-16.jpg', // Placeholders for now
    },
    {
        slug: 'dicas-bateria-iphone',
        title: '10 dicas essenciais para aumentar a vida útil da sua bateria',
        excerpt: 'Sua bateria não dura o dia todo? Confira nossas dicas práticas para otimizar o consumo de energia no seu dispositivo iOS.',
        date: '2024-03-15',
        category: 'Dicas',
        image: '/blog/battery.jpg',
    },
    {
        slug: 'apple-watch-funcionalidades',
        title: 'Explore as melhores funcionalidades do seu novo Apple Watch',
        excerpt: 'Desde saúde até produtividade, veja como aproveitar ao máximo os recursos do relógio mais inteligente do mundo.',
        date: '2024-03-10',
        category: 'Novidades',
        image: '/blog/apple-watch.jpg',
    },
    {
        slug: 'macbook-m3-vale-a-pena',
        title: 'MacBook com chip M3: Vale a pena o investimento?',
        excerpt: 'Analisamos o desempenho real do novo chip M3 e para quais profissionais ele é realmente indicado em 2024.',
        date: '2024-03-05',
        category: 'Review',
        image: '/blog/macbook-m3.jpg',
    }
];

export default function BlogPage() {
    return (
        <div className="min-h-screen bg-white">
            {/* Blog Hero Section */}
            <section className="py-20 bg-gray-50">
                <div className="container-fitch max-w-4xl text-center">
                    <p className="text-gray-400 uppercase tracking-[0.3em] text-xs mb-3 font-light">BLOG & NOVIDADES</p>
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6" style={{ fontFamily: 'var(--font-cinzel)' }}>
                        Fitch Tecnologia: O seu portal de notícias Apple
                    </h1>
                    <div className="w-16 h-1 bg-black mx-auto mb-8"></div>
                    <p className="text-gray-600 text-lg">
                        Fique por dentro dos últimos lançamentos, dicas exclusivas e tudo o que acontece no mundo da tecnologia premium.
                    </p>
                </div>
            </section>

            {/* Blog Posts Grid */}
            <section className="py-20">
                <div className="container-fitch">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
                        {blogPosts.map((post) => (
                            <div key={post.slug} className="group cursor-pointer">
                                <Link href={`/blog/${post.slug}`} className="block">
                                    <div className="relative h-64 md:h-80 w-full overflow-hidden rounded-2xl mb-6 shadow-sm group-hover:shadow-md transition-shadow">
                                        {/* Background color placeholder until real images are added */}
                                        <div className="absolute inset-0 bg-gray-200 flex items-center justify-center text-gray-400 text-sm font-medium">
                                            IMAGEM DO POST
                                        </div>
                                        {/* In a real scenario, use Image component with real sources */}
                                        {/* <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    /> */}
                                        <div className="absolute top-4 left-4 bg-white px-3 py-1 rounded-full shadow-sm text-[10px] font-bold uppercase tracking-wider text-black">
                                            {post.category}
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2 text-gray-400 text-xs mb-3 font-medium uppercase tracking-widest">
                                        <Calendar className="w-3.5 h-3.5" />
                                        <span>{new Date(post.date).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })}</span>
                                    </div>

                                    <h2 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-gray-700 transition-colors leading-tight">
                                        {post.title}
                                    </h2>

                                    <p className="text-gray-600 mb-6 line-clamp-2 leading-relaxed">
                                        {post.excerpt}
                                    </p>

                                    <div className="flex items-center gap-2 text-black font-bold text-sm uppercase tracking-widest group-hover:translate-x-1 transition-transform">
                                        <span>Leia o post</span>
                                        <ChevronRight className="w-4 h-4" />
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>

                    {/* Newsletter Section */}
                    <div className="mt-24 p-12 bg-black rounded-[2.5rem] text-white text-center">
                        <h2 className="text-3xl font-bold mb-4" style={{ fontFamily: 'var(--font-cinzel)' }}>
                            Newsletter Fitch
                        </h2>
                        <p className="text-gray-400 mb-8 max-w-xl mx-auto">
                            Receba as novidades mais exclusivas e promoções especiais diretamente no seu e-mail.
                        </p>
                        <form className="flex flex-col md:flex-row gap-4 max-w-lg mx-auto">
                            <input
                                type="email"
                                placeholder="Seu melhor e-mail"
                                className="flex-1 bg-gray-900 border border-gray-800 rounded-full px-6 py-4 text-white focus:outline-none focus:ring-2 focus:ring-gray-700"
                            />
                            <button className="bg-white text-black font-bold uppercase tracking-widest text-xs px-8 py-4 rounded-full hover:bg-gray-100 transition-colors">
                                Inscrever
                            </button>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    );
}
