import { MousePointerClick, MessageCircle, CreditCard, Gift } from 'lucide-react';

const steps = [
    {
        number: '01',
        title: '',
        description: 'Explore nosso catálogo e selecione o produto desejado.',
        icon: MousePointerClick
    },
    {
        number: '02',
        title: '',
        description: 'Inicie um atendimento personalizado via WhatsApp.',
        icon: MessageCircle
    },
    {
        number: '03',
        title: '',
        description: 'Confirmamos disponibilidade, cor e detalhes de pagamento.',
        icon: CreditCard
    },
    {
        number: '04',
        title: '',
        description: 'Receba via entrega expressa ou retire em nossas lojas.',
        icon: Gift
    }
];

export default function HowToBuy() {
    return (
        <section className="py-20 bg-white border-t border-gray-200">
            <div className="container-fitch">
                <div className="text-center mb-16">
                    <p className="text-gray-400 uppercase tracking-[0.3em] text-xs mb-3 font-light">ATENDIMENTO PREMIUM</p>
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Como comprar na Fitch Tecnologia?</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {steps.map((step, idx) => (
                        <div key={idx} className="relative group">
                            <div className="bg-gray-50 p-8 rounded-2xl text-center hover:shadow-md transition-all duration-300 h-full flex flex-col items-center">
                                {/* Icon */}
                                <div className="w-12 h-12 flex items-center justify-center mx-auto mb-6 text-gray-700">
                                    <step.icon className="w-8 h-8" />
                                </div>

                                {/* Number */}
                                <div className="text-4xl font-bold text-gray-900 mb-4">{step.number}</div>

                                {/* Description */}
                                <p className="text-gray-600 text-sm leading-relaxed">
                                    {step.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
