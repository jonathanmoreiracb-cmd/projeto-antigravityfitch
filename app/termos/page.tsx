import { Tag, CreditCard, ShieldCheck, Truck, AlertCircle, FileText } from 'lucide-react';
import Link from 'next/link';

export default function TermosPage() {
    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
                <div className="container-fitch max-w-4xl">
                    <div className="text-center mb-12">
                        <p className="text-gray-400 uppercase tracking-[0.3em] text-xs mb-3 font-light">TRANSPARÊNCIA E CLAREZA</p>
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6" style={{ fontFamily: 'var(--font-cinzel)' }}>
                            Termos e Condições de Compra
                        </h1>
                        <div className="w-16 h-1 bg-black mx-auto mb-8"></div>
                        <p className="text-gray-600 text-lg">
                            Leia atentamente nossos termos e condições antes de realizar sua compra.
                        </p>
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <section className="py-16 bg-white">
                <div className="container-fitch max-w-4xl">
                    <div className="space-y-12">
                        {/* Preços e Estoque */}
                        <div className="bg-gray-50 rounded-2xl p-8 md:p-10">
                            <div className="flex items-start gap-4 mb-6">
                                <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center flex-shrink-0">
                                    <Tag className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Preços e Estoque</h2>
                                    <p className="text-gray-600">Valores e disponibilidade podem mudar sem aviso prévio.</p>
                                </div>
                            </div>
                            <div className="ml-16 space-y-3 text-gray-700">
                                <p>Os preços dos produtos estão sujeitos a alterações sem aviso prévio. Recomendamos confirmar o valor antes de finalizar sua compra.</p>
                                <p>A disponibilidade dos produtos é atualizada em tempo real, mas em casos excepcionais, um item pode estar esgotado. Nesse caso, entraremos em contato para oferecer alternativas ou reembolso.</p>
                            </div>
                        </div>

                        {/* Pagamentos */}
                        <div className="bg-gray-50 rounded-2xl p-8 md:p-10">
                            <div className="flex items-start gap-4 mb-6">
                                <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center flex-shrink-0">
                                    <CreditCard className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Pagamentos</h2>
                                    <p className="text-gray-600">Parcelamento em até 12x sujeito a aprovação e taxas. Descontos à vista para Pix ou Dinheiro.</p>
                                </div>
                            </div>
                            <div className="ml-16 space-y-3 text-gray-700">
                                <p><strong>Cartão de Crédito:</strong> Aceitamos todos os cartões de crédito com parcelamento em até 12x (sujeito a aprovação e taxas da operadora).</p>
                                <p><strong>Pix ou Dinheiro:</strong> Oferecemos descontos exclusivos para pagamentos à vista via Pix ou Dinheiro. Consulte nossa equipe para conhecer as condições.</p>
                                <p className="text-sm text-gray-500 italic">
                                    Os valores parcelados podem incluir juros conforme a política da administradora do cartão.
                                </p>
                            </div>
                        </div>

                        {/* Prazos de Garantia */}
                        <div className="bg-gray-50 rounded-2xl p-8 md:p-10">
                            <div className="flex items-start gap-4 mb-6">
                                <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center flex-shrink-0">
                                    <ShieldCheck className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Prazos de Garantia</h2>
                                    <p className="text-gray-600">O cliente declara estar ciente de que o prazo de garantia é de 1 ano apenas para Apple Lacrado e de 3 meses para os demais produtos do catálogo.</p>
                                </div>
                            </div>
                            <div className="ml-16 space-y-3 text-gray-700">
                                <p><strong>Produtos Apple Lacrados (iPhone, iPad, MacBook, Apple Watch, AirPods):</strong> Garantia de <strong>1 ano</strong> diretamente com a Apple (garantia mundial).</p>
                                <p><strong>Produtos Seminovos, Acessórios e Eletrônicos:</strong> Garantia de <strong>3 meses (90 dias)</strong> contra defeitos de fabricação.</p>
                                <p className="text-sm text-gray-500">
                                    Para mais detalhes sobre garantia, consulte nossa <Link href="/politica-trocas" className="text-blue-600 hover:underline">Política de Trocas e Garantia</Link>.
                                </p>
                            </div>
                        </div>

                        {/* Entrega */}
                        <div className="bg-gray-50 rounded-2xl p-8 md:p-10">
                            <div className="flex items-start gap-4 mb-6">
                                <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center flex-shrink-0">
                                    <Truck className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Entrega</h2>
                                    <p className="text-gray-600">Entregas em Angra dos Reis e Região são realizadas em nossos veículos. Centro ou Shopping Piratas podem ser combinadas via WhatsApp.</p>
                                </div>
                            </div>
                            <div className="ml-16 space-y-3 text-gray-700">
                                <p><strong>Angra dos Reis e Região:</strong> Realizamos entregas com nossa própria frota. Entre em contato para verificar disponibilidade e prazos.</p>
                                <p><strong>Retirada em Loja:</strong> Você pode retirar seu pedido em nossas unidades (Centro ou Shopping Piratas). Combine o melhor horário via WhatsApp.</p>
                                <p className="text-sm text-gray-500">
                                    Os prazos de entrega podem variar conforme a localidade e disponibilidade. Nossa equipe informará o prazo estimado no momento da compra.
                                </p>
                            </div>
                        </div>

                        {/* Aceitação dos Termos */}
                        <div className="bg-blue-50 border-l-4 border-blue-500 rounded-r-2xl p-8 md:p-10">
                            <div className="flex items-start gap-4 mb-6">
                                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                                    <FileText className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Aceitação dos Termos</h2>
                                </div>
                            </div>
                            <div className="ml-16 space-y-4 text-gray-700">
                                <p>Ao realizar uma compra na Fitch Tecnologia, você declara ter lido e concordado com todos os termos e condições aqui descritos.</p>
                                <p>Caso tenha dúvidas sobre qualquer item, nossa equipe está à disposição para esclarecimentos antes da finalização da compra.</p>
                            </div>
                        </div>

                        {/* Informações Adicionais */}
                        <div className="bg-amber-50 border-l-4 border-amber-500 rounded-r-2xl p-8 md:p-10">
                            <div className="flex items-start gap-4 mb-6">
                                <div className="w-12 h-12 bg-amber-500 rounded-full flex items-center justify-center flex-shrink-0">
                                    <AlertCircle className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Informações Importantes</h2>
                                </div>
                            </div>
                            <div className="ml-16 space-y-4 text-gray-700">
                                <p>A Fitch Tecnologia reserva-se o direito de alterar estes termos e condições a qualquer momento, sem aviso prévio.</p>
                                <p>Recomendamos a leitura periódica desta página para se manter atualizado sobre nossas políticas.</p>
                                <p>Em caso de conflito entre os termos aqui descritos e informações fornecidas por nossos atendentes, prevalecem os termos publicados nesta página.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 bg-black text-white">
                <div className="container-fitch text-center">
                    <h2 className="text-3xl font-bold mb-4" style={{ fontFamily: 'var(--font-cinzel)' }}>
                        Ainda tem dúvidas?
                    </h2>
                    <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
                        Nossa equipe está pronta para esclarecer qualquer questão sobre nossos termos e condições.
                    </p>
                    <Link
                        href="https://wa.me/5524999743888"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block px-8 py-4 bg-white text-black font-bold rounded-lg hover:bg-gray-100 transition-colors uppercase tracking-wider"
                    >
                        Fale Conosco
                    </Link>
                </div>
            </section>
        </div>
    );
}
