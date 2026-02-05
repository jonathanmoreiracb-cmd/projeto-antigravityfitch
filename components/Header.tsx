"use client";

import Link from 'next/link';
import Image from 'next/image';
import { Menu, Search, X, Users, Search as SearchIcon, MessageCircle, Instagram, Music, ShoppingBag } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useCartStore } from '@/lib/cartStore';
import CartDrawer from './CartDrawer';

export default function Header() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const cartItemsCount = useCartStore((state) => state.getTotalItems());

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      router.push(`/catalogo?q=${encodeURIComponent(searchTerm.trim())}`);
      setIsMenuOpen(false);
    }
  };

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      {/* Top Black Strip */}
      <div className="bg-black text-white px-4 py-2">
        <div className="container mx-auto flex justify-between items-center relative">
          {/* Mobile Menu Icon */}
          <button
            className="p-1 hover:text-gray-300"
            onClick={() => setIsMenuOpen(true)}
          >
            <div className="flex items-center gap-1.5 overflow-hidden">
              <Menu className="w-5 h-5" />
              <span className="text-[10px] font-bold tracking-widest hidden md:inline">MENU</span>
            </div>
          </button>

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 text-base md:text-lg font-bold tracking-[0.2em] text-center" style={{ fontFamily: 'var(--font-cinzel)' }}>
            <span>FITCH TECNOLOGIA</span>
            <div className="relative w-6 h-6">
              <Image
                src="/logo-white.png"
                alt="Fitch Logo"
                fill
                className="object-contain"
              />
            </div>
          </Link>

          {/* Right side icons */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-1 hover:text-gray-300 transition-colors"
            >
              <ShoppingBag className="w-5 h-5" />
              {mounted && cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-white text-black text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center border border-black animate-in zoom-in">
                  {cartItemsCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Cart Drawer */}
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

      {/* Search Bar Strip - Main Search */}
      <div className="border-b border-gray-100 bg-white py-3 px-4">
        <div className="container mx-auto max-w-3xl">
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              placeholder="Buscar produtos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-gray-100 text-gray-900 rounded-full py-3 px-6 pl-6 pr-12 focus:outline-none focus:ring-2 focus:ring-gray-200"
            />
            <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-gray-400 hover:text-gray-600">
              <Search className="w-5 h-5" />
            </button>
          </form>
        </div>
      </div>

      {/* Mobile Menu Drawer Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-[100] bg-white flex flex-col animate-in slide-in-from-left duration-300">
          {/* Menu Header */}
          <div className="flex justify-between items-center px-6 py-6 border-b border-gray-100">
            <span className="text-gray-400 uppercase tracking-[0.3em] text-xs font-light">MENU</span>
            <button onClick={closeMenu} className="p-2 text-gray-400 hover:text-gray-600 border border-gray-100 rounded-full">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Menu Items */}
          <div className="flex-1 overflow-y-auto px-6 py-8 flex flex-col gap-4">
            <Link
              href="/quem-somos"
              onClick={closeMenu}
              className="flex items-center justify-center gap-3 py-4 px-6 border border-gray-100 rounded-full text-gray-800 font-bold tracking-widest text-sm uppercase hover:bg-gray-50 transition-colors"
            >
              QUEM SOMOS
            </Link>
            <Link
              href="/catalogo"
              onClick={closeMenu}
              className="flex items-center justify-center gap-3 py-4 px-6 border border-gray-100 rounded-full text-gray-800 font-bold tracking-widest text-sm uppercase hover:bg-gray-50 transition-colors"
            >
              <SearchIcon className="w-5 h-5 text-gray-400" />
              CATALOGO
            </Link>
            <Link
              href="/contato"
              onClick={closeMenu}
              className="flex items-center justify-center gap-3 py-4 px-6 border border-gray-100 rounded-full text-gray-800 font-bold tracking-widest text-sm uppercase hover:bg-gray-50 transition-colors"
            >
              <MessageCircle className="w-5 h-5 text-gray-400" />
              CONTATOS
            </Link>

            {/* Secondary Links */}
            <div className="mt-8 flex flex-col gap-4">
              <Link
                href="/blog"
                onClick={closeMenu}
                className="text-gray-400 uppercase tracking-widest text-xs font-medium hover:text-gray-600 transition-colors"
              >
                BLOG / NOVIDADES
              </Link>
              <Link
                href="/politica-trocas"
                onClick={closeMenu}
                className="text-gray-400 uppercase tracking-widest text-xs font-medium hover:text-gray-600 transition-colors"
              >
                TROCAS E DEVOLUCOES
              </Link>
              <Link
                href="/#faq"
                onClick={closeMenu}
                className="text-gray-400 uppercase tracking-widest text-xs font-medium hover:text-gray-600 transition-colors"
              >
                DUVIDAS FREQUENTES
              </Link>
            </div>

            {/* Socials */}
            <div className="mt-12 flex gap-4">
              <Link href="https://instagram.com/fitch.tecnologia" target="_blank" className="p-3 border border-gray-100 rounded-full text-gray-600 hover:bg-gray-50">
                <Instagram className="w-5 h-5" />
              </Link>
              <Link href="#" className="p-3 border border-gray-100 rounded-full text-gray-600 hover:bg-gray-50">
                <Music className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* CTA Button Footer */}
          <div className="p-6 border-t border-gray-100">
            <Link
              href="https://wa.me/5524999743888"
              target="_blank"
              onClick={closeMenu}
              className="flex items-center justify-center w-full py-4 bg-black text-white text-sm font-bold uppercase tracking-widest rounded-full hover:bg-gray-900 transition-colors"
            >
              FALAR COM ESPECIALISTA
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

