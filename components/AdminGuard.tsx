'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';

export default function AdminGuard({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const pathname = usePathname();
    const [authorized, setAuthorized] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            const { data: { session } } = await supabase.auth.getSession();

            if (!session) {
                if (pathname !== '/admin/login') {
                    router.replace('/admin/login');
                } else {
                    // Allow render of login page
                    setAuthorized(true);
                }
            } else {
                if (pathname === '/admin/login') {
                    // Already logged in, go to dashboard
                    router.replace('/admin/precos');
                } else {
                    setAuthorized(true);
                }
            }
            setLoading(false);
        };

        checkAuth();

        // Subscribe to auth changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
            if (event === 'SIGNED_OUT') {
                setAuthorized(false);
                router.replace('/admin/login');
            } else if (event === 'SIGNED_IN' && pathname === '/admin/login') {
                router.replace('/admin/precos');
            }
        });

        return () => {
            subscription.unsubscribe();
        };
    }, [pathname, router]);

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center text-gray-500">Verificando acesso...</div>;
    }

    // Only render children if authorized (or if it's the login page being allowed)
    // Logic tweak: If on login page and not logged in, authorized=true (allow render).
    // If logged in and on protected page, authorized=true.
    return authorized ? <>{children}</> : null;
}
