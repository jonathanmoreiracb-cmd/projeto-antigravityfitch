import Link from 'next/link';
import { Smartphone, Tablet, Watch, Headphones, Laptop, Package } from 'lucide-react';
import { CATEGORIES } from '@/lib/types';

// Map categories to icons
const getCategoryIcon = (category: string) => {
    if (category.includes('iPhone')) return Smartphone;
    if (category.includes('Produtos Apple')) return Package;
    if (category.includes('Android')) return Smartphone;
    if (category.includes('Eletrônicos')) return Laptop;
    if (category.includes('Acessórios')) return Headphones;
    return Package;
};

export default function CategoryStrip() {
    return (
        <section className="py-8 bg-white border-b border-gray-100">
            <div className="container-fitch">
                <div className="flex justify-center items-center gap-4 md:gap-6 overflow-x-auto pb-2">
                    {CATEGORIES.map((category, idx) => {
                        const Icon = getCategoryIcon(category);
                        return (
                            <Link
                                key={idx}
                                href={`/catalogo?categoria=${encodeURIComponent(category)}`}
                                className="flex flex-col items-center gap-2 min-w-[90px] group"
                            >
                                <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-gray-200 transition-colors duration-300 group-hover:scale-110 transform">
                                    <Icon className="w-8 h-8 md:w-10 md:h-10 text-gray-700" />
                                </div>
                                <span className="text-xs md:text-sm font-medium text-gray-700 text-center group-hover:text-black transition-colors leading-tight">
                                    {category}
                                </span>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
