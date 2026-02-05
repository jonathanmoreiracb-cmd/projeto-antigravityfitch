import { ShieldCheck, Banknote, CreditCard, Truck } from 'lucide-react';

const benefits = [
    {
        icon: ShieldCheck,
        title: "Garantia de Originalidade",
        description: ""
    },
    {
        icon: Banknote,
        title: "Desconto no Pix/Dinheiro",
        description: ""
    },
    {
        icon: CreditCard,
        title: "Parcelamento em até 12x",
        description: ""
    },
    {
        icon: Truck,
        title: "Retirada na loja ou entrega combinada",
        description: ""
    }
];

export default function BenefitsRow() {
    return (
        <section className="py-12 bg-white border-b border-gray-100">
            <div className="container-fitch">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {benefits.map((item, idx) => (
                        <div key={idx} className="flex items-start gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors duration-300">
                            <div className="p-3 bg-blue-50 rounded-lg text-blue-600">
                                <item.icon className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="font-bold text-gray-900 text-sm md:text-base">{item.title}</h3>
                                {item.description && (
                                    <p className="text-gray-500 text-xs md:text-sm mt-1 leading-relaxed">
                                        {item.description}
                                    </p>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
