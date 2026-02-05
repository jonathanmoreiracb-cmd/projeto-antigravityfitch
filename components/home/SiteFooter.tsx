import Link from 'next/link';
import { Instagram, Facebook, MessageCircle, MapPin, Clock, Lock, CreditCard } from 'lucide-react';

export default function SiteFooter() {
    return (
        <footer className="bg-black text-gray-400 pt-16 pb-8 border-t border-gray-900 font-sans text-sm">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">

                    {/* Column 1: Brand & Intro */}
                    <div>
                        <h3 className="text-white font-bold text-xl mb-4" style={{ fontFamily: 'var(--font-cinzel)' }}>
                            Fitch Tecnologia
                        </h3>
                        <p className="text-gray-500 text-xs uppercase tracking-widest mb-4">
                            Tecnologia premium em Angra dos Reis
                        </p>
                        <p className="mb-6 leading-relaxed">
                            Sua referência em Apple e tecnologia premium na Costa Verde.
                        </p>

                        <div className="flex gap-4 mb-6">
                            <a href="https://instagram.com/fitch.tecnologia" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-gray-800 flex items-center justify-center hover:bg-white hover:text-black transition-all">
                                <Instagram className="w-5 h-5" />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full border border-gray-800 flex items-center justify-center hover:bg-white hover:text-black transition-all">
                                <Facebook className="w-5 h-5" />
                            </a>
                        </div>
                        <a href="https://instagram.com/fitch.tecnologia" className="inline-block text-white border-b border-white pb-0.5 hover:text-gray-300 transition-colors uppercase text-xs font-bold tracking-wider">
                            Acesse nosso Instagram
                        </a>
                    </div>

                    {/* Column 2: Institucional */}
                    <div>
                        <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-6">Institucional</h4>
                        <ul className="space-y-3">
                            <li><Link href="/" className="hover:text-white transition-colors">Início</Link></li>
                            <li><Link href="/catalogo" className="hover:text-white transition-colors">Produtos</Link></li>
                            <li><Link href="/catalogo?categoria=iPhone" className="hover:text-white transition-colors">iPhones</Link></li>
                            <li><Link href="/catalogo?categoria=Apple Watch" className="hover:text-white transition-colors">Apple Watch</Link></li>
                            <li><Link href="/catalogo?categoria=Android" className="hover:text-white transition-colors">Android</Link></li>
                            <li><Link href="/quem-somos" className="hover:text-white transition-colors">Quem somos</Link></li>
                            <li><Link href="/blog" className="hover:text-white transition-colors">Blog / Novidades</Link></li>
                        </ul>
                    </div>

                    {/* Column 3: Ajuda e Suporte */}
                    <div>
                        <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-6">Ajuda e Suporte</h4>
                        <ul className="space-y-3 mb-6">
                            <li><Link href="/politica-trocas" className="hover:text-white transition-colors">Trocas e devoluções</Link></li>
                            <li><Link href="/privacidade" className="hover:text-white transition-colors">Política de privacidade</Link></li>
                            <li><Link href="/termos" className="hover:text-white transition-colors">Termos de uso</Link></li>
                            <li><Link href="/#faq" className="hover:text-white transition-colors">Dúvidas frequentes</Link></li>
                        </ul>

                        <a
                            href="https://wa.me/5524992669940"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-full font-bold hover:bg-green-500 transition-colors uppercase text-xs tracking-wider mb-4"
                        >
                            <MessageCircle className="w-4 h-4" />
                            Chamar no WhatsApp
                        </a>
                        <div className="text-xs space-y-1">
                            <p>WhatsApp: (24) 99266-9940</p>
                            <p>Instagram: @fitch.tecnologia</p>
                        </div>
                    </div>

                    {/* Column 4: Nossas Lojas */}
                    <div>
                        <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-6">Nossas Lojas</h4>

                        <div className="mb-6">
                            <h5 className="text-white font-bold mb-2 flex items-center gap-2">
                                <MapPin className="w-4 h-4" /> Loja Centro
                            </h5>
                            <p className="text-xs leading-relaxed mb-2">
                                Tv. Eloy Fonseca, 25 - Centro,<br />Angra dos Reis - RJ, 23900-282
                            </p>
                            <div className="flex items-start gap-2 text-xs text-gray-500">
                                <Clock className="w-3 h-3 mt-0.5" />
                                <div>
                                    <p>Segunda a sexta: 09:00 às 18:30</p>
                                    <p>Sábado: 09:00 às 14:00</p>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h5 className="text-white font-bold mb-2 flex items-center gap-2">
                                <MapPin className="w-4 h-4" /> Loja Shopping Piratas
                            </h5>
                            <p className="text-xs leading-relaxed mb-2">
                                Estr. das Marinas, 91 - Praia do Jardim,<br />Angra dos Reis - RJ, 23907-900
                            </p>
                            <div className="flex items-start gap-2 text-xs text-gray-500">
                                <Clock className="w-3 h-3 mt-0.5" />
                                <div>
                                    <p>Segunda a sábado: 10:00 às 22:00</p>
                                    <p>Domingo: 15:00 às 21:00</p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                {/* Bottom Bar: Payments & Legal */}
                <div className="border-t border-gray-900 pt-8 mt-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                        <div>
                            <p className="text-xs uppercase tracking-widest mb-4">Formas de pagamento</p>
                            <div className="flex flex-wrap gap-2 text-white">
                                <div className="border border-gray-800 px-3 py-1 rounded text-xs">Pix</div>
                                <div className="border border-gray-800 px-3 py-1 rounded text-xs">Visa</div>
                                <div className="border border-gray-800 px-3 py-1 rounded text-xs">Master</div>
                                <div className="border border-gray-800 px-3 py-1 rounded text-xs">Elo</div>
                                <div className="border border-gray-800 px-3 py-1 rounded text-xs">Apple Pay</div>
                            </div>
                        </div>
                        <div className="flex flex-col md:items-end gap-4">
                            <div className="flex items-center gap-2 text-green-500 border border-green-900/30 bg-green-900/10 px-4 py-2 rounded-full">
                                <Lock className="w-3 h-3" />
                                <span className="text-xs font-bold uppercase tracking-wider">Site seguro SSL</span>
                            </div>
                        </div>
                    </div>

                    <div className="mt-12 text-center md:text-left text-[10px] text-gray-600 uppercase tracking-widest border-t border-gray-900 pt-8 flex flex-col md:flex-row justify-between">
                        <p>Fitch Tecnologia - Angra dos Reis</p>
                        <p>CNPJ: 52.311.538/0001-10 - Fitch Tecnologia Ltda.</p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
