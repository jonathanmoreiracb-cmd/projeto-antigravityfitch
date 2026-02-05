import { ShieldCheck, RefreshCw, AlertCircle, FileText } from 'lucide-react';
import Link from 'next/link';

export default function PoliticaTrocasPage() {
    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
                <div className="container-fitch max-w-4xl">
                    <div className="text-center mb-12">
                        <p className="text-gray-400 uppercase tracking-[0.3em] text-xs mb-3 font-light">TRANSPARÊNCIA E SEGURANÇA</p>
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6" style={{ fontFamily: 'var(--font-cinzel)' }}>
                            Política de Trocas e Garantia
                        </h1>
                        <div className="w-16 h-1 bg-black mx-auto mb-8"></div>
                        <p className="text-gray-600 text-lg">
                            Na Fitch Tecnologia trabalhamos com transparência total sobre a garantia de seus produtos.
                        </p>
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <section className="py-16 bg-white">
                <div className="container-fitch max-w-4xl">
                    <div className="space-y-12">
                        {/* Direito de Arrependimento */}
                        <div className="bg-gray-50 rounded-2xl p-8 md:p-10">
                            <div className="flex items-start gap-4 mb-6">
                                <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center flex-shrink-0">
                                    <RefreshCw className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Direito de Arrependimento</h2>
                                    <p className="text-gray-600">Para compras online, você tem até 7 dias corridos após o recebimento para solicitar a devolução.</p>
                                </div>
                            </div>
                            <div className="ml-16 space-y-3 text-gray-700">
                                <p>Desde que o produto esteja com embalagem original e sem marcas de uso.</p>
                                <p className="text-sm text-gray-500 italic">
                                    Conforme estabelecido pelo Código de Defesa do Consumidor (CDC), Art. 49.
                                </p>
                            </div>
                        </div>

                        {/* Garantia de Fábrica */}
                        <div className="bg-gray-50 rounded-2xl p-8 md:p-10">
                            <div className="flex items-start gap-4 mb-6">
                                <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center flex-shrink-0">
                                    <ShieldCheck className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Garantia de Fábrica</h2>
                                    <p className="text-gray-600">Produtos lacrados/novos possuem garantia de fábrica de 1 ano.</p>
                                </div>
                            </div>
                            <div className="ml-16 space-y-3 text-gray-700">
                                <p>Para produtos Apple (iPhone, iPad, MacBook, AirPods, Apple Watch), a garantia é de <strong>1 ano</strong> diretamente com a Apple (garantia mundial).</p>
                                <p>Produtos de outras marcas seguem a garantia do fabricante, geralmente de 1 ano.</p>
                            </div>
                        </div>

                        {/* Garantia Legal */}
                        <div className="bg-gray-50 rounded-2xl p-8 md:p-10">
                            <div className="flex items-start gap-4 mb-6">
                                <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center flex-shrink-0">
                                    <FileText className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Garantia Legal</h2>
                                    <p className="text-gray-600">Produtos Seminovos, Acessórios e Eletrônicos possuem garantia de 3 meses (90 dias) contra defeitos de fabricação.</p>
                                </div>
                            </div>
                            <div className="ml-16 space-y-3 text-gray-700">
                                <p>Toda a linha de <strong>Seminovos</strong>, <strong>Acessórios</strong> e demais <strong>Eletrônicos</strong> possuem garantia de <strong>3 meses (90 dias)</strong> contra defeitos de fabricação.</p>
                            </div>
                        </div>

                        {/* Condições */}
                        <div className="bg-amber-50 border-l-4 border-amber-500 rounded-r-2xl p-8 md:p-10">
                            <div className="flex items-start gap-4 mb-6">
                                <div className="w-12 h-12 bg-amber-500 rounded-full flex items-center justify-center flex-shrink-0">
                                    <AlertCircle className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Condições</h2>
                                </div>
                            </div>
                            <div className="ml-16 space-y-4 text-gray-700">
                                <p>A garantia <strong>não cobre danos por mau uso</strong>, quedas ou contato com líquidos.</p>
                                <p>O produto deve estar com os <strong>selos de garantia</strong> (se houver) preservados.</p>
                                <p>Para acionar a garantia, é necessário apresentar a <strong>nota fiscal</strong> de compra.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Manifesto de Marca */}
            <section className="py-16 bg-gray-50">
                <div className="container-fitch max-w-4xl">
                    <div className="text-center">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: 'var(--font-cinzel)' }}>
                            Manifesto de Marca
                        </h2>
                        <div className="prose prose-lg max-w-none text-gray-600 leading-relaxed">
                            <p>
                                Na Fitch, você não é apenas um número. Somos uma loja que valoriza cada cliente, oferecendo produtos de qualidade com atendimento humanizado e transparente. Nossa missão é garantir que sua experiência seja excepcional, do primeiro contato ao pós-venda.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 bg-black text-white">
                <div className="container-fitch text-center">
                    <h2 className="text-3xl font-bold mb-4" style={{ fontFamily: 'var(--font-cinzel)' }}>
                        Dúvidas sobre garantia?
                    </h2>
                    <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
                        Nossa equipe está pronta para esclarecer todas as suas dúvidas sobre trocas e garantia.
                    </p>
                    <Link
                        href="/contato"
                        className="inline-block px-8 py-4 bg-white text-black font-bold rounded-lg hover:bg-gray-100 transition-colors uppercase tracking-wider"
                    >
                        Entre em Contato
                    </Link>
                </div>
            </section>
        </div>
    );
}
