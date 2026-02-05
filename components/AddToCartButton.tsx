"use client";

import { useCartStore } from '@/lib/cartStore';
import { Product } from '@/lib/types';
import { ShoppingBag, Check } from 'lucide-react';
import { useState } from 'react';

interface AddToCartButtonProps {
    product: Product;
    className?: string;
}

export default function AddToCartButton({ product, className = "" }: AddToCartButtonProps) {
    const addItem = useCartStore((state) => state.addItem);
    const [isAdded, setIsAdded] = useState(false);

    const handleAdd = () => {
        addItem(product);
        setIsAdded(true);
        setTimeout(() => setIsAdded(false), 2000);
    };

    return (
        <button
            onClick={handleAdd}
            className={`flex items-center justify-center gap-2 w-full font-bold py-4 rounded-xl transition-all shadow-sm active:scale-[0.98] uppercase tracking-[0.2em] text-sm
                ${isAdded
                    ? 'bg-green-500 text-white'
                    : 'bg-black text-white hover:bg-gray-900'} ${className}`}
            style={{ fontFamily: 'var(--font-cinzel)' }}
        >
            {isAdded ? (
                <>
                    <Check className="w-5 h-5" />
                    Adicionado!
                </>
            ) : (
                <>
                    <ShoppingBag className="w-5 h-5" />
                    Adicionar à Sacola
                </>
            )}
        </button>
    );
}
