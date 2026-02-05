'use client';

import { useState, useEffect } from 'react';
import { Banner } from '@/lib/types';
import Link from 'next/link';

interface HeroCarouselProps {
    banners: Banner[];
}

export default function HeroCarousel({ banners }: HeroCarouselProps) {
    const [current, setCurrent] = useState(0);

    // Auto-advance
    useEffect(() => {
        if (banners.length <= 1) return;

        const timer = setInterval(() => {
            setCurrent((prev) => (prev === banners.length - 1 ? 0 : prev + 1));
        }, 5000);

        return () => clearInterval(timer);
    }, [banners.length]);

    const nextSlide = () => {
        setCurrent(current === banners.length - 1 ? 0 : current + 1);
    };

    const prevSlide = () => {
        setCurrent(current === 0 ? banners.length - 1 : current - 1);
    };

    if (banners.length === 0) {
        // Fallback simple Hero handled by parent or here? 
        // The requirement says "Se não houver banners, mostrar um hero simples". 
        // It's cleaner to handle empty state here or in parent. 
        // Let's render nothing here and let parent handle, OR render the default hero here.
        // Parent asked to "Show simple Hero" if no banners. 
        // I'll return null here and handle the fallback in the page component for clearer logic separation.
        return null;
    }

    return (
        <div className="relative w-full h-[300px] md:h-[500px] bg-gray-900 overflow-hidden group">
            {/* Slides */}
            {banners.map((banner, index) => (
                <div
                    key={banner.id}
                    className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${index === current ? 'opacity-100 z-10' : 'opacity-0 z-0'
                        }`}
                >
                    {/* Link wrapper if exists */}
                    {banner.link ? (
                        <Link href={banner.link} className="block w-full h-full relative">
                            {renderImages(banner)}
                        </Link>
                    ) : (
                        <div className="w-full h-full relative">
                            {renderImages(banner)}
                        </div>
                    )}
                </div>
            ))}

            {/* Navigation Arrows */}
            {banners.length > 1 && (
                <>
                    <button
                        onClick={prevSlide}
                        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full backdrop-blur-sm transition opacity-0 group-hover:opacity-100"
                        aria-label="Anterior"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
                    </button>
                    <button
                        onClick={nextSlide}
                        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full backdrop-blur-sm transition opacity-0 group-hover:opacity-100"
                        aria-label="Próximo"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
                    </button>
                </>
            )}

            {/* Dots */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex space-x-2">
                {banners.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrent(index)}
                        className={`w-2.5 h-2.5 rounded-full transition-all ${index === current ? 'bg-white w-8' : 'bg-white/50 hover:bg-white/80'
                            }`}
                        aria-label={`Ir para slide ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
}

function renderImages(banner: Banner) {
    return (
        <>
            {/* Mobile Image */}
            <img
                src={banner.imagem_mobile_url}
                alt={banner.titulo}
                className="block md:hidden w-full h-full object-cover"
            />
            {/* Desktop Image */}
            <img
                src={banner.imagem_desktop_url}
                alt={banner.titulo}
                className="hidden md:block w-full h-full object-cover"
            />

            {/* Optional Gradient Overlay for text readability if needed, but banners usually have text burned in or designed well */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/0 to-transparent pointer-events-none" />
        </>
    );
}
