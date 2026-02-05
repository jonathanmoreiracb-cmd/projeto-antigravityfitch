import { MapPin, Clock } from 'lucide-react';

export default function StoreSection() {
    return (
        <section className="py-20 bg-white">
            <div className="container-fitch">
                <div className="flex flex-col lg:flex-row gap-12 items-center">
                    <div className="lg:w-1/3 text-center lg:text-left">
                        <h2 className="text-3xl font-bold text-gray-900 mb-6 font-serif" style={{ fontFamily: 'var(--font-cinzel)' }}>Nossas Lojas</h2>
                        <p className="text-gray-500 mb-8 text-lg leading-relaxed">
                            Venha conhecer nossas lojas físicas em Angra dos Reis.<br />
                            Oferecemos um ambiente moderno, confortável e pensado para você ter a melhor experiência na hora de escolher seu novo smartphone.
                        </p>
                        <div className="space-y-4">
                            {/* Shared Hours or General Info could go here, but since hours differ, maybe just generic invite */}
                            <div className="flex items-center gap-3 text-gray-700 justify-center lg:justify-start">
                                <div className="bg-black p-2 rounded-full text-white">
                                    <Clock className="w-5 h-5" />
                                </div>
                                <span className="font-medium">Atendimento presencial e personalizado</span>
                            </div>
                        </div>
                    </div>

                    <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                        {/* Loja 1 - Centro */}
                        <div className="bg-gray-50 rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300 group">
                            <div className="h-64 bg-gray-200 overflow-hidden relative">
                                <img
                                    src="/store-1.jpg"
                                    alt="Fitch Tecnologia - Loja Centro"
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-6">
                                    <h3 className="text-white font-bold text-2xl" style={{ fontFamily: 'var(--font-cinzel)' }}>Loja Centro</h3>
                                </div>
                            </div>
                            <div className="p-6">
                                <div className="mb-4">
                                    <div className="flex items-start gap-3 text-gray-600 mb-3">
                                        <MapPin className="w-5 h-5 text-black flex-shrink-0 mt-1" />
                                        <p className="text-sm leading-relaxed">
                                            Tv. Eloy Fonseca, 25 - Centro,<br />Angra dos Reis - RJ, 23900-282
                                        </p>
                                    </div>
                                    <div className="flex items-start gap-3 text-gray-500 text-xs">
                                        <Clock className="w-4 h-4 flex-shrink-0 mt-0.5" />
                                        <div>
                                            <p>Segunda a sexta: 09:00 as 18:30</p>
                                            <p>Sabado: 09:00 as 14:00</p>
                                        </div>
                                    </div>
                                </div>
                                <a
                                    href="https://maps.google.com/?q=Tv.+Eloy+Fonseca,+25+-+Centro,+Angra+dos+Reis+-+RJ,+23900-282"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block w-full py-3 text-center bg-black text-white rounded-lg hover:bg-gray-800 transition-colors font-bold text-sm uppercase tracking-wider"
                                >
                                    Ver no Mapa
                                </a>
                            </div>
                        </div>

                        {/* Loja 2 - Shopping Piratas */}
                        <div className="bg-gray-50 rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300 group">
                            <div className="h-64 bg-gray-200 overflow-hidden relative">
                                <img
                                    src="/store-2.jpg"
                                    alt="Fitch Tecnologia - Shopping Piratas"
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-6">
                                    <h3 className="text-white font-bold text-2xl" style={{ fontFamily: 'var(--font-cinzel)' }}>Loja Shopping Piratas</h3>
                                </div>
                            </div>
                            <div className="p-6">
                                <div className="mb-4">
                                    <div className="flex items-start gap-3 text-gray-600 mb-3">
                                        <MapPin className="w-5 h-5 text-black flex-shrink-0 mt-1" />
                                        <p className="text-sm leading-relaxed">
                                            Estr. das Marinas, 91 - Praia do Jardim,<br />Angra dos Reis - RJ, 23907-900
                                        </p>
                                    </div>
                                    <div className="flex items-start gap-3 text-gray-500 text-xs">
                                        <Clock className="w-4 h-4 flex-shrink-0 mt-0.5" />
                                        <div>
                                            <p>Segunda a sabado: 10:00 as 22:00</p>
                                            <p>Domingo: 15:00 as 21:00</p>
                                        </div>
                                    </div>
                                </div>
                                <a
                                    href="https://maps.google.com/?q=Estr.+das+Marinas,+91+-+Praia+do+Jardim,+Angra+dos+Reis+-+RJ,+23907-900"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block w-full py-3 text-center bg-black text-white rounded-lg hover:bg-gray-800 transition-colors font-bold text-sm uppercase tracking-wider"
                                >
                                    Ver no Mapa
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
