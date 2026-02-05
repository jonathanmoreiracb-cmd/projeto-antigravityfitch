import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import Link from 'next/link';

export default function ContatoPage() {
    return (
        <div className="min-h-screen bg-white">
            <section className="py-20 bg-gray-50 border-b border-gray-100">
                <div className="container-fitch max-w-4xl text-center">
                    <p className="text-gray-400 uppercase tracking-[0.3em] text-xs mb-3 font-light">ATENDIMENTO PREMIUM</p>
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6" style={{ fontFamily: 'var(--font-cinzel)' }}>
                        Fale Conosco
                    </h1>
                    <div className="w-16 h-1 bg-black mx-auto"></div>
                </div>
            </section>

            <section className="py-20 lg:py-32">
                <div className="container-fitch max-w-6xl">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {/* WhatsApp */}
                        <div className="bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-md transition-shadow flex flex-col items-center text-center">
                            <div className="w-16 h-16 bg-green-50 text-green-600 rounded-full flex items-center justify-center mb-8">
                                <Phone className="w-8 h-8" />
                            </div>
                            <h3 className="font-bold text-xl mb-4 uppercase tracking-widest text-gray-900">WhatsApp</h3>
                            <p className="text-gray-500 mb-8 leading-relaxed">
                                Atendimento rápido e personalizado para orçamentos e dúvidas sobre estoque.
                            </p>
                            <Link
                                href="https://wa.me/5524999743888"
                                target="_blank"
                                className="text-black font-bold border-b-2 border-black pb-1 hover:text-gray-600 transition-colors"
                            >
                                (24) 99974-3888
                            </Link>
                        </div>

                        {/* Email */}
                        <div className="bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-md transition-shadow flex flex-col items-center text-center">
                            <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-8">
                                <Mail className="w-8 h-8" />
                            </div>
                            <h3 className="font-bold text-xl mb-4 uppercase tracking-widest text-gray-900">Email</h3>
                            <p className="text-gray-500 mb-8 leading-relaxed">
                                Para propostas comerciais, parcerias ou suporte administrativo.
                            </p>
                            <Link
                                href="mailto:contato@fitchtecnologia.com.br"
                                className="text-black font-bold border-b-2 border-black pb-1 hover:text-gray-600 transition-colors"
                            >
                                contato@fitchtecnologia.com.br
                            </Link>
                        </div>

                        {/* Social Media */}
                        <div className="bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-md transition-shadow flex flex-col items-center text-center md:col-span-2 lg:col-span-1">
                            <div className="w-16 h-16 bg-purple-50 text-purple-600 rounded-full flex items-center justify-center mb-8">
                                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"></path></svg>
                            </div>
                            <h3 className="font-bold text-xl mb-4 uppercase tracking-widest text-gray-900">Redes Sociais</h3>
                            <p className="text-gray-500 mb-8 leading-relaxed">
                                Acompanhe os unboxings e lançamentos diários em nosso Instagram.
                            </p>
                            <Link
                                href="https://instagram.com/fitch.tecnologia"
                                target="_blank"
                                className="text-black font-bold border-b-2 border-black pb-1 hover:text-gray-600 transition-colors"
                            >
                                @fitch.tecnologia
                            </Link>
                        </div>
                    </div>

                    {/* Stores Information */}
                    <div className="mt-20 lg:mt-32">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'var(--font-cinzel)' }}>Nossas Lojas</h2>
                            <p className="text-gray-500">Visite-nos pessoalmente para uma experiência completa.</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                            {/* Store 1 */}
                            <div className="bg-white border border-gray-100 rounded-[2.5rem] p-10 shadow-sm overflow-hidden flex flex-col h-full">
                                <div className="flex items-center gap-4 mb-8">
                                    <div className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center flex-shrink-0">
                                        <MapPin className="w-6 h-6" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-900" style={{ fontFamily: 'var(--font-cinzel)' }}>Unidade Centro</h3>
                                </div>
                                <div className="space-y-6 flex-1">
                                    <div>
                                        <p className="text-gray-400 uppercase tracking-widest text-[10px] font-bold mb-2">Endereço</p>
                                        <p className="text-gray-700 leading-relaxed font-medium">Tv. Eloy Fonseca, 25 - Centro, Angra dos Reis - RJ, 23900-282</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-400 uppercase tracking-widest text-[10px] font-bold mb-2">Horário de Atendimento</p>
                                        <div className="flex items-start gap-3 text-gray-700">
                                            <Clock className="w-5 h-5 text-gray-400 mt-0.5" />
                                            <div>
                                                <p className="font-medium">Segunda a Sexta: 09:00 às 18:30</p>
                                                <p className="font-medium">Sábado: 09:00 às 14:00</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-10">
                                    <Link
                                        href="https://maps.app.goo.gl/..."
                                        target="_blank"
                                        className="inline-flex items-center justify-center w-full py-4 bg-gray-50 text-black text-sm font-bold uppercase tracking-widest rounded-full hover:bg-gray-100 transition-colors"
                                    >
                                        Como Chegar (Maps)
                                    </Link>
                                </div>
                            </div>

                            {/* Store 2 */}
                            <div className="bg-white border border-gray-100 rounded-[2.5rem] p-10 shadow-sm overflow-hidden flex flex-col h-full">
                                <div className="flex items-center gap-4 mb-8">
                                    <div className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center flex-shrink-0">
                                        <MapPin className="w-6 h-6" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-900" style={{ fontFamily: 'var(--font-cinzel)' }}>Unidade Shopping Piratas</h3>
                                </div>
                                <div className="space-y-6 flex-1">
                                    <div>
                                        <p className="text-gray-400 uppercase tracking-widest text-[10px] font-bold mb-2">Endereço</p>
                                        <p className="text-gray-700 leading-relaxed font-medium">Estr. das Marinas, 91 - Praia do Jardim, Angra dos Reis - RJ, 23907-900</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-400 uppercase tracking-widest text-[10px] font-bold mb-2">Horário de Atendimento</p>
                                        <div className="flex items-start gap-3 text-gray-700">
                                            <Clock className="w-5 h-5 text-gray-400 mt-0.5" />
                                            <div>
                                                <p className="font-medium">Segunda a Sábado: 10:00 às 22:00</p>
                                                <p className="font-medium">Domingo: 15:00 às 21:00</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-10">
                                    <Link
                                        href="https://maps.app.goo.gl/..."
                                        target="_blank"
                                        className="inline-flex items-center justify-center w-full py-4 bg-gray-50 text-black text-sm font-bold uppercase tracking-widest rounded-full hover:bg-gray-100 transition-colors"
                                    >
                                        Como Chegar (Maps)
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

