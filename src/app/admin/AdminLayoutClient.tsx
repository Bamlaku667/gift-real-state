'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
    LayoutDashboard, Building2, MessageSquare, Users, Construction,
    Star, Menu, X, LogOut, ExternalLink, Bell, Megaphone,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
    { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { label: 'Announcements', href: '/admin/announcements', icon: Megaphone },
    { label: 'Properties', href: '/admin/properties', icon: Building2 },
    { label: 'Construction', href: '/admin/construction', icon: Construction },
    { label: 'Testimonials', href: '/admin/testimonials', icon: Star },
    { label: 'Inquiries', href: '/admin/inquiries', icon: Users },
    { label: 'Chat Messages', href: '/admin/chatbot-messages', icon: MessageSquare },
];

export function AdminLayoutClient({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const router = useRouter();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const handleLogout = async () => {
        await fetch('/api/admin/auth', { method: 'DELETE' });
        router.push('/admin/login');
        router.refresh();
    };

    const Sidebar = () => (
        <div className="h-full flex flex-col bg-brand-dark border-r border-white/10">
            {/* Brand */}
            <div className="p-6 border-b border-white/10">
                <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center flex-shrink-0">
                        <Building2 className="w-5 h-5 text-brand-dark" />
                    </div>
                    <div>
                        <div className="font-heading font-bold text-sm gradient-text">Gift Real Estate</div>
                        <div className="text-white/40 text-xs">Admin Dashboard</div>
                    </div>
                </div>
            </div>

            {/* Nav */}
            <nav className="p-4 flex-1 space-y-1 overflow-y-auto">
                {navItems.map(({ label, href, icon: Icon }) => {
                    const active = href === '/admin' ? pathname === '/admin' : pathname.startsWith(href);
                    return (
                        <Link
                            key={href}
                            href={href}
                            onClick={() => setSidebarOpen(false)}
                            className={cn(
                                'admin-sidebar-link',
                                active && 'active'
                            )}
                        >
                            <Icon className="w-4 h-4 flex-shrink-0" />
                            {label}
                        </Link>
                    );
                })}
            </nav>

            {/* Bottom */}
            <div className="p-4 border-t border-white/10 space-y-2">
                <Link
                    href="/"
                    target="_blank"
                    className="admin-sidebar-link text-white/50"
                >
                    <ExternalLink className="w-4 h-4" />
                    View Website
                </Link>
                <button
                    onClick={handleLogout}
                    className="admin-sidebar-link w-full text-red-400 hover:text-red-300 hover:bg-red-500/10"
                >
                    <LogOut className="w-4 h-4" />
                    Sign Out
                </button>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-background flex">
            {/* Desktop Sidebar */}
            <aside className="hidden lg:flex flex-col w-60 flex-shrink-0 sticky top-0 h-screen">
                <Sidebar />
            </aside>

            {/* Mobile Sidebar Overlay */}
            {sidebarOpen && (
                <div className="lg:hidden fixed inset-0 z-50 flex">
                    <div className="fixed inset-0 bg-black/60" onClick={() => setSidebarOpen(false)} />
                    <aside className="relative w-64 flex flex-col">
                        <Sidebar />
                    </aside>
                </div>
            )}

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-w-0">
                {/* Top bar */}
                <header className="sticky top-0 z-40 bg-background border-b border-border flex items-center justify-between h-16 px-4 sm:px-6">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setSidebarOpen(true)}
                            className="lg:hidden p-2 rounded-lg hover:bg-accent transition-colors"
                        >
                            <Menu className="w-5 h-5" />
                        </button>
                        <h1 className="font-semibold text-base hidden sm:block">
                            {navItems.find((n) => n.href === '/admin' ? pathname === '/admin' : pathname.startsWith(n.href))?.label || 'Dashboard'}
                        </h1>
                    </div>
                    <div className="flex items-center gap-3">
                        <button className="p-2 rounded-lg hover:bg-accent transition-colors relative">
                            <Bell className="w-5 h-5" />
                            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary rounded-full" />
                        </button>
                        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                            <span className="text-brand-dark font-bold text-sm">A</span>
                        </div>
                    </div>
                </header>

                {/* Page */}
                <main className="flex-1 p-4 sm:p-6 overflow-auto">
                    {children}
                </main>
            </div>
        </div>
    );
}
