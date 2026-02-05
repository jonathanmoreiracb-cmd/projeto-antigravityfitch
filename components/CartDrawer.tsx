"use client";

import { X, Minus, Plus, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { useCartStore } from '@/lib/cartStore';
import { formatCurrency } from '@/lib/utils';
import { getProductActivePrice, getProductMainImage } from '@/lib/types';
import Link from 'next/link';

interface CartDrawerProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
    const { items, removeItem, updateQuantity, getTotalPrice, getTotalInstallmentPrice, getTotalItems } = useCartStore();

    const handleWhatsAppCheckout = () => {
        const phone = "5524992669940";
        const totalAvista = formatCurrency(getTotalPrice());
        const totalParcelado = formatCurrency(getTotalInstallmentPrice());

        let message = `Olá, Fitch Tecnologia! Gostaria de fazer um pedido:\n\n`;

        items.forEach((item) => {
            const price = getProductActivePrice(item.product);
            const priceFormatted = price ? formatCurrency(price.avista) : 'Consulte';
            message += `• ${item.product.nome}\n  Qtd: ${item.quantity}x - ${priceFormatted}`;

            if (price?.doze_parcela) {
                message += ` (ou 12x de ${formatCurrency(price.doze_parcela)})`;
            }

            message += `\n\n`;
        });

        message += `Total à Vista: ${totalAvista}\n`;
        if (getTotalInstallmentPrice() > getTotalPrice()) {
            message += `Total Parcelado (12x): ${totalParcelado}\n`;
        }
        message += `\nComo posso proceder com o pagamento?`;

        const encodedMessage = encodeURIComponent(message);
        window.open(`https://wa.me/${phone}?text=${encodedMessage}`, '_blank');
        onClose();
    };

    if (!isOpen) return null;

    return (
        <>
            {/* Backdrop */}
            <div
                className="fixed inset-0 z-[200] bg-black/40 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            />

            {/* Drawer */}
            <div className="fixed inset-y-0 right-0 z-[201] w-full max-w-md bg-white shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-6 border-b border-gray-100">
                    <div className="flex items-center gap-2">
                        <h2 className="text-lg font-bold uppercase tracking-[0.2em]" style={{ fontFamily: 'var(--font-cinzel)' }}>
                            Sua Sacola
                        </h2>
                        <span className="bg-black text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                            {getTotalItems()}
                        </span>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 text-gray-400 hover:text-black border border-gray-100 rounded-full transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Items List */}
                <div className="flex-1 overflow-y-auto px-6 py-6">
                    {items.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center text-center">
                            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6">
                                <ShoppingBag className="w-10 h-10 text-gray-300" />
                            </div>
                            <h3 className="text-xl font-bold mb-2">Sua sacola está vazia</h3>
                            <p className="text-gray-500 mb-8 max-w-[240px]">
                                Parece que você ainda não adicionou nenhum produto premium.
                            </p>
                            <button
                                onClick={onClose}
                                className="inline-flex items-center gap-2 px-8 py-4 bg-black text-white text-xs font-bold uppercase tracking-widest rounded-full hover:bg-gray-900 transition-colors"
                            >
                                Começar a Comprar
                                <ArrowRight className="w-4 h-4" />
                            </button>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {items.map((item) => {
                                const image = getProductMainImage(item.product);
                                const priceObj = getProductActivePrice(item.product);
                                const price = priceObj ? formatCurrency(priceObj.avista) : 'Consulte';

                                return (
                                    <div key={item.id} className="flex gap-4 group">
                                        <div className="relative w-24 h-24 bg-gray-50 rounded-2xl overflow-hidden flex-shrink-0 border border-gray-100">
                                            <img
                                                src={image}
                                                alt={item.product.nome}
                                                className="w-full h-full object-contain p-2"
                                            />
                                        </div>

                                        <div className="flex-1 flex flex-col justify-between py-1">
                                            <div>
                                                <div className="flex justify-between items-start gap-2 mb-1">
                                                    <h4 className="font-bold text-gray-900 leading-tight text-sm line-clamp-2">
                                                        {item.product.nome}
                                                    </h4>
                                                    <button
                                                        onClick={() => removeItem(item.id)}
                                                        className="text-gray-300 hover:text-red-500 transition-colors"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                                <p className="text-xs text-gray-400 uppercase tracking-widest font-medium">
                                                    {item.product.categoria}
                                                </p>
                                            </div>

                                            <div className="flex items-center justify-between mt-2">
                                                <div className="flex items-center border border-gray-100 rounded-full h-8 px-1">
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                        className="p-1 hover:text-black text-gray-400"
                                                    >
                                                        <Minus className="w-3 h-3" />
                                                    </button>
                                                    <span className="w-8 text-center text-xs font-bold">{item.quantity}</span>
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                        className="p-1 hover:text-black text-gray-400"
                                                    >
                                                        <Plus className="w-3 h-3" />
                                                    </button>
                                                </div>
                                                <span className="font-bold text-black text-sm">
                                                    {price}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>

                {/* Footer */}
                {items.length > 0 && (
                    <div className="p-6 border-t border-gray-100 bg-gray-50/50">
                        <div className="space-y-4 mb-6">
                            <div className="flex justify-between items-center">
                                <span className="text-gray-400 uppercase tracking-widest text-[10px] font-bold">Total à Vista</span>
                                <span className="text-xl font-bold text-black px-4 py-1 rounded-lg border border-gray-200">
                                    {formatCurrency(getTotalPrice())}
                                </span>
                            </div>
                            {getTotalInstallmentPrice() > getTotalPrice() && (
                                <div className="flex justify-between items-center pt-2 border-t border-gray-100/50">
                                    <span className="text-gray-400 uppercase tracking-widest text-[10px] font-bold">Total Parcelado (12x)</span>
                                    <span className="text-sm font-bold bg-black text-white px-4 py-1 rounded-lg">
                                        {formatCurrency(getTotalInstallmentPrice())}
                                    </span>
                                </div>
                            )}
                        </div>

                        <button
                            onClick={handleWhatsAppCheckout}
                            className="flex items-center justify-center w-full py-5 bg-black text-white text-xs font-bold uppercase tracking-[0.2em] rounded-full hover:bg-gray-900 transition-all shadow-lg active:scale-[0.98]"
                            style={{ fontFamily: 'var(--font-cinzel)' }}
                        >
                            Finalizar no WhatsApp
                        </button>
                        <p className="text-[10px] text-gray-400 text-center mt-4 uppercase tracking-[0.1em] font-medium">
                            Finalize seu pedido para receber os dados de pagamento.
                        </p>
                    </div>
                )}
            </div>
        </>
    );
}
