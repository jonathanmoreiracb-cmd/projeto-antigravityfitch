import Image from 'next/image';
import Link from 'next/link';
import { MapPin, Clock, Award, Users, Heart } from 'lucide-react';

export default function QuemSomosPage() {
    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
                <div className="container-fitch max-w-4xl">
                    <div className="text-center mb-12">
                        <p className="text-gray-400 uppercase tracking-[0.3em] text-xs mb-3 font-light">QUEM SOMOS</p>
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6" style={{ fontFamily: 'var(--font-cinzel)' }}>
                            Fitch Tecnologia: A Maior Estrutura Premium de Angra
                        </h1>
                        <div className="w-16 h-1 bg-black mx-auto mb-8"></div>
                    </div>

                    <div className="prose prose-lg max-w-none text-gray-600 leading-relaxed space-y-6">
                        <p>
                            A Fitch Tecnologia nasceu do seu propósito claro: oferecer a melhor experiência em tecnologia premium para Angra dos Reis e região. Somos especializados em produtos Apple e smartphones de alta qualidade, com atendimento diferenciado e consultoria personalizada.
                        </p>
                        <p>
                            Com duas unidades estrategicamente localizadas no coração de Angra dos Reis, oferecemos um ambiente moderno e acolhedor onde você pode conhecer, testar e adquirir os melhores produtos do mercado. Nossa equipe é treinada para oferecer suporte completo, desde a escolha do produto ideal até o pós-venda.
                        </p>
                        <p>
                            Nosso compromisso vai além da venda. Trabalhamos com produtos 100% originais, garantia estendida e as melhores condições de pagamento do mercado. Seja para uso pessoal ou profissional, a Fitch Tecnologia é sua parceira de confiança em tecnologia premium.
                        </p>
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="py-16 bg-gray-50">
                <div className="container-fitch">
                    <div className="text-center mb-12">
                        <p className="text-gray-400 uppercase tracking-[0.3em] text-xs mb-3 font-light">NOSSOS VALORES</p>
                        <h2 className="text-3xl font-bold text-gray-900">O que nos diferencia</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                        <div className="text-center p-8 bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                            <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-6">
                                <Award className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Excelência</h3>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                Produtos 100% originais com garantia e procedência verificada.
                            </p>
                        </div>

                        <div className="text-center p-8 bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                            <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-6">
                                <Users className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Atendimento</h3>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                Consultoria personalizada com especialistas em tecnologia premium.
                            </p>
                        </div>

                        <div className="text-center p-8 bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                            <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-6">
                                <Heart className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Compromisso</h3>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                Suporte completo antes, durante e após a sua compra.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Store Locations Section */}
            <section className="py-20 bg-white">
                <div className="container-fitch">
                    <div className="text-center mb-12">
                        <p className="text-gray-400 uppercase tracking-[0.3em] text-xs mb-3 font-light">PRESENÇA ESTRATÉGICA</p>
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Atendimento premium em Angra dos Reis</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            Nossas lojas foram projetadas para oferecer a melhor experiência em tecnologia premium.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                        {/* Store 1 - Centro */}
                        <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                            <div className="relative h-64">
                                <Image
                                    src="/store-1.jpg"
                                    alt="Fitch Tecnologia - Loja Centro"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div className="p-8">
                                <h3 className="text-2xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'var(--font-cinzel)' }}>
                                    Unidade Centro
                                </h3>
                                <div className="space-y-3 mb-6">
                                    <div className="flex items-start gap-3 text-gray-600">
                                        <MapPin className="w-5 h-5 text-black flex-shrink-0 mt-1" />
                                        <p className="text-sm">
                                            Tv. Eloy Fonseca, 25 - Centro<br />
                                            Angra dos Reis - RJ, 23900-282
                                        </p>
                                    </div>
                                    <div className="flex items-start gap-3 text-gray-600">
                                        <Clock className="w-5 h-5 text-black flex-shrink-0 mt-1" />
                                        <div className="text-sm">
                                            <p>Segunda a sexta: 09:00 às 18:30</p>
                                            <p>Sábado: 09:00 às 14:00</p>
                                        </div>
                                    </div>
                                </div>
                                <Link
                                    href="https://maps.google.com/?q=Tv.+Eloy+Fonseca,+25+-+Centro,+Angra+dos+Reis+-+RJ,+23900-282"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block w-full py-3 text-center bg-black text-white rounded-lg hover:bg-gray-800 transition-colors font-bold text-sm uppercase tracking-wider"
                                >
                                    Como Chegar
                                </Link>
                            </div>
                        </div>

                        {/* Store 2 - Shopping Piratas */}
                        <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                            <div className="relative h-64">
                                <Image
                                    src="/store-2.jpg"
                                    alt="Fitch Tecnologia - Shopping Piratas"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div className="p-8">
                                <h3 className="text-2xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'var(--font-cinzel)' }}>
                                    Unidade Shopping Piratas
                                </h3>
                                <div className="space-y-3 mb-6">
                                    <div className="flex items-start gap-3 text-gray-600">
                                        <MapPin className="w-5 h-5 text-black flex-shrink-0 mt-1" />
                                        <p className="text-sm">
                                            Estr. das Marinas, 91 - Praia do Jardim<br />
                                            Angra dos Reis - RJ, 23907-900
                                        </p>
                                    </div>
                                    <div className="flex items-start gap-3 text-gray-600">
                                        <Clock className="w-5 h-5 text-black flex-shrink-0 mt-1" />
                                        <div className="text-sm">
                                            <p>Segunda a sábado: 10:00 às 22:00</p>
                                            <p>Domingo: 15:00 às 21:00</p>
                                        </div>
                                    </div>
                                </div>
                                <Link
                                    href="https://maps.google.com/?q=Estr.+das+Marinas,+91+-+Praia+do+Jardim,+Angra+dos+Reis+-+RJ,+23907-900"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block w-full py-3 text-center bg-black text-white rounded-lg hover:bg-gray-800 transition-colors font-bold text-sm uppercase tracking-wider"
                                >
                                    Como Chegar
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 bg-black text-white">
                <div className="container-fitch text-center">
                    <h2 className="text-3xl font-bold mb-4" style={{ fontFamily: 'var(--font-cinzel)' }}>
                        Visite uma de nossas lojas
                    </h2>
                    <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
                        Venha conhecer nosso ambiente premium e receba atendimento personalizado de nossos especialistas.
                    </p>
                    <Link
                        href="/catalogo"
                        className="inline-block px-8 py-4 bg-white text-black font-bold rounded-lg hover:bg-gray-100 transition-colors uppercase tracking-wider"
                    >
                        Ver Produtos
                    </Link>
                </div>
            </section>
        </div>
    );
}
