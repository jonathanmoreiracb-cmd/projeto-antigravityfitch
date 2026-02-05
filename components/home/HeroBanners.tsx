'use client';

import { useState, useEffect } from 'react';
import { Banner } from '@/lib/types';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface HeroBannersProps {
    banners: Banner[];
}

export default function HeroBanners({ banners }: HeroBannersProps) {
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        if (banners.length <= 1) return;

        const interval = setInterval(() => {
            setCurrent((prev) => (prev + 1) % banners.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [banners.length]);

    const prevSlide = () => {
        setCurrent((prev) => (prev - 1 + banners.length) % banners.length);
    };

    const nextSlide = () => {
        setCurrent((prev) => (prev + 1) % banners.length);
    };

    if (banners.length === 0) return null;

    return (
        <div className="relative w-full h-[300px] md:h-[450px] lg:h-[550px] overflow-hidden bg-gray-100 group">
            {banners.map((banner, index) => (
                <div
                    key={banner.id}
                    className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === current ? 'opacity-100 z-10' : 'opacity-0 z-0'
                        }`}
                >
                    <Link href={banner.link || '#'} className="block w-full h-full relative">
                        <picture>
                            <source media="(min-width: 768px)" srcSet={banner.imagem_desktop_url} />
                            <img
                                src={banner.imagem_mobile_url}
                                alt={banner.titulo}
                                className="w-full h-full object-cover object-center"
                                loading={index === 0 ? "eager" : "lazy"}
                            />
                        </picture>
                        {/* Gradient Overlay for better text readability if needed, but banners usually have text embedded 
                            If not, we can add title here. Assuming banners have text embedded.
                        */}
                    </Link>
                </div>
            ))}

            {/* Navigation Arrows */}
            {banners.length > 1 && (
                <>
                    <button
                        onClick={(e) => { e.preventDefault(); prevSlide(); }}
                        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/30 hover:bg-white/70 text-gray-800 p-2 rounded-full backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100 border border-white/20"
                        aria-label="Anterior"
                    >
                        <ChevronLeft className="w-6 h-6" />
                    </button>
                    <button
                        onClick={(e) => { e.preventDefault(); nextSlide(); }}
                        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/30 hover:bg-white/70 text-gray-800 p-2 rounded-full backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100 border border-white/20"
                        aria-label="Próximo"
                    >
                        <ChevronRight className="w-6 h-6" />
                    </button>

                    {/* Dots */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex space-x-2">
                        {banners.map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => setCurrent(idx)}
                                className={`w-3 h-3 rounded-full transition-all duration-300 ${idx === current ? 'bg-white scale-110 shadow-md' : 'bg-white/50 hover:bg-white/80'
                                    }`}
                                aria-label={`Slide ${idx + 1}`}
                            />
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}
