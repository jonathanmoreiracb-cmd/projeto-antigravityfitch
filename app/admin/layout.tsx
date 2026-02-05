'use client';

import AdminGuard from '@/components/AdminGuard';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const router = useRouter();
    const isLoginPage = pathname === '/admin/login';

    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.push('/admin/login');
    };

    return (
        <AdminGuard>
            <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
                {!isLoginPage && (
                    <header className="bg-white shadow-sm z-10 sticky top-0">
                        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                            <div className="flex items-center space-x-8">
                                <Link href="/admin/precos" className="text-xl font-bold text-gray-900">
                                    Fitch Admin
                                </Link>
                                <nav className="hidden md:flex space-x-4">
                                    <Link
                                        href="/admin/produtos"
                                        className={`px-3 py-2 rounded-md text-sm font-medium transition ${pathname.startsWith('/admin/produtos')
                                            ? 'bg-blue-50 text-blue-700'
                                            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                                            }`}
                                    >
                                        Produtos
                                    </Link>
                                    <Link
                                        href="/admin/banners"
                                        className={`px-3 py-2 rounded-md text-sm font-medium transition ${pathname.startsWith('/admin/banners')
                                            ? 'bg-blue-50 text-blue-700'
                                            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                                            }`}
                                    >
                                        Banners
                                    </Link>
                                    <Link
                                        href="/admin/novidades"
                                        className={`px-3 py-2 rounded-md text-sm font-medium transition ${pathname.startsWith('/admin/novidades')
                                            ? 'bg-blue-50 text-blue-700'
                                            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                                            }`}
                                    >
                                        Novidades
                                    </Link>
                                </nav>
                            </div>

                            <div className="flex items-center space-x-4">
                                <Link
                                    href="/"
                                    target="_blank"
                                    className="text-sm text-gray-500 hover:text-blue-600 flex items-center"
                                >
                                    Ver Site
                                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="bg-red-50 text-red-600 hover:bg-red-100 px-4 py-2 rounded-md text-sm font-medium transition"
                                >
                                    Sair
                                </button>
                            </div>
                        </div>
                    </header>
                )}

                <main className="flex-1 container mx-auto px-4 py-8">
                    {children}
                </main>
            </div>
        </AdminGuard>
    );
}
