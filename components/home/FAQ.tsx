'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

const faqs = [
    {
        question: "Os produtos são originais?",
        answer: "Sim! Todos os nossos produtos Apple são 100% originais, com garantia e procedência verificada. Trabalhamos apenas com produtos autênticos, seja lacrados de fábrica ou seminovos cuidadosamente selecionados. Total transparência é nossa prioridade."
    },
    {
        question: "Como funciona a garantia?",
        answer: "Produtos Apple lacrados têm 1 ano de garantia mundial com a Apple. Produtos seminovos, acessórios e eletrônicos têm 3 meses de garantia contra defeitos de fabricação. Para mais detalhes, consulte nossa Política de Trocas e Garantia."
    },
    {
        question: "Quais as formas de pagamento?",
        answer: "Aceitamos todos os cartões de crédito com parcelamento em até 12x (sujeito a aprovação). Para pagamentos à vista via Pix ou Dinheiro, oferecemos descontos exclusivos. Consulte nossa equipe para conhecer as melhores condições!"
    },
    {
        question: "Vocês aceitam meu iPhone usado como parte do pagamento?",
        answer: "Sim! Aceitamos iPhones a partir do iPhone 11 como parte do pagamento na compra de um produto novo. Traga seu aparelho em uma de nossas lojas físicas para uma avaliação gratuita e na hora. O valor da avaliação pode ser usado como entrada ou desconto."
    },
    {
        question: "Onde ficam as lojas físicas?",
        answer: "Temos duas unidades em Angra dos Reis-RJ: Loja Centro (Tv. Eloy Fonseca, 25 - Centro, horário: Seg-Sex 09h-18h30, Sáb 09h-14h) e Loja Shopping Piratas (Estr. das Marinas, 91 - Praia do Jardim, horário: Seg-Sáb 10h-22h, Dom 15h-21h)."
    },
    {
        question: "Enviam para todo o Brasil?",
        answer: "Sim! Realizamos entregas em Angra dos Reis e região com nossa própria frota. Para outras localidades, enviamos via Correios ou Transportadora com seguro total para todo o território nacional. Entre em contato para consultar prazos e valores."
    }
];

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <section id="faq" className="py-20 bg-white scroll-mt-20">
            <div className="container-fitch max-w-4xl">
                <div className="text-center mb-12">
                    <div className="w-12 h-12 bg-amber-100 text-amber-500 rounded-full flex items-center justify-center mx-auto mb-4">
                        <HelpCircle className="w-6 h-6" />
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Perguntas Frequentes</h2>
                    <p className="text-gray-500">Tire suas dúvidas sobre nossos produtos e serviços.</p>
                </div>

                <div className="space-y-4">
                    {faqs.map((faq, idx) => (
                        <div key={idx} className="border border-gray-100 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                            <button
                                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                                className="w-full flex items-center justify-between p-6 bg-white text-left focus:outline-none"
                            >
                                <span className="font-bold text-gray-800 text-lg">{faq.question}</span>
                                {openIndex === idx ? (
                                    <ChevronUp className="w-5 h-5 text-blue-600" />
                                ) : (
                                    <ChevronDown className="w-5 h-5 text-gray-400" />
                                )}
                            </button>
                            <div
                                className={`duration-300 ease-in-out transition-all overflow-hidden bg-gray-50 ${openIndex === idx ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                                    }`}
                            >
                                <div className="p-6 pt-2 text-gray-600 leading-relaxed border-t border-gray-100">
                                    {faq.answer}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
