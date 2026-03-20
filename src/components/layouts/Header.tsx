'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X, Phone, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

const navLinks = [
    { name: 'Home', path: '/' },
    {
        name: 'Projects',
        path: '/projects',
        children: [
            { name: 'All Projects', path: '/projects' },
            { name: 'Gift Village', path: '/gift-village' },
            { name: 'Gift Heights', path: '/gift-heights' },
        ],
    },
    { name: 'Construction', path: '/construction-progress' },
    {
        name: 'Services',
        path: '#',
        children: [
            { name: 'Diaspora Gateway', path: '/diaspora' },
            { name: 'Floor Plans', path: '/floor-plans' },
            { name: 'Payment Plans', path: '/payment-plans' },
            { name: 'Virtual Tours', path: '/virtual-tour' },
        ],
    },
    { name: 'Testimonials', path: '/testimonials' },
    { name: 'Contact', path: '/contact' },
];

export function Header() {
    const pathname = usePathname();
    const [mobileOpen, setMobileOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        setMobileOpen(false);
        setOpenDropdown(null);
    }, [pathname]);

    return (
        <header
            className={cn(
                'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
                scrolled
                    ? 'bg-white/95 dark:bg-brand-dark/95 backdrop-blur-md shadow-lg border-b border-border'
                    : 'bg-transparent'
            )}
        >
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 lg:h-20 items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-3 group flex-shrink-0">
                        <div className="relative h-10 w-10 rounded-full overflow-hidden bg-primary flex items-center justify-center shadow-md group-hover:shadow-glow transition-shadow duration-300">
                            <span className="text-brand-dark font-bold text-xl font-heading">G</span>
                        </div>
                        <div>
                            <div
                                className={cn(
                                    'font-heading font-bold text-base leading-tight transition-colors duration-300',
                                    scrolled ? 'gradient-text' : 'text-white drop-shadow-lg'
                                )}
                            >
                                GIFT REAL ESTATE
                            </div>
                            <div
                                className={cn(
                                    'text-xs transition-colors duration-300',
                                    scrolled ? 'text-muted-foreground' : 'text-white/70'
                                )}
                            >
                                ETHIOPIA
                            </div>
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden lg:flex items-center gap-1">
                        {navLinks.map((link) => (
                            <div key={link.path} className="relative group">
                                {link.children ? (
                                    <>
                                        <button
                                            className={cn(
                                                'flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200',
                                                scrolled
                                                    ? 'text-foreground hover:text-primary hover:bg-primary/5'
                                                    : 'text-white/90 hover:text-white hover:bg-white/10'
                                            )}
                                        >
                                            {link.name}
                                            <ChevronDown className="w-3 h-3 transition-transform group-hover:rotate-180" />
                                        </button>
                                        <div className="absolute top-full left-0 mt-1 w-48 bg-white dark:bg-brand-charcoal rounded-xl shadow-luxury border border-border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 translate-y-2 group-hover:translate-y-0">
                                            {link.children.map((child) => (
                                                <Link
                                                    key={child.path}
                                                    href={child.path}
                                                    className="block px-4 py-3 text-sm text-foreground hover:text-primary hover:bg-primary/5 first:rounded-t-xl last:rounded-b-xl transition-colors duration-200"
                                                >
                                                    {child.name}
                                                </Link>
                                            ))}
                                        </div>
                                    </>
                                ) : (
                                    <Link
                                        href={link.path}
                                        className={cn(
                                            'px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200',
                                            pathname === link.path
                                                ? 'text-primary bg-primary/10'
                                                : scrolled
                                                    ? 'text-foreground hover:text-primary hover:bg-primary/5'
                                                    : 'text-white/90 hover:text-white hover:bg-white/10'
                                        )}
                                    >
                                        {link.name}
                                    </Link>
                                )}
                            </div>
                        ))}
                    </nav>

                    {/* Desktop CTA */}
                    <div className="hidden lg:flex items-center gap-3">
                        <a
                            href="tel:+251976133918"
                            className={cn(
                                'flex items-center gap-2 text-sm font-medium transition-colors duration-200',
                                scrolled ? 'text-muted-foreground hover:text-primary' : 'text-white/80 hover:text-white'
                            )}
                        >
                            <Phone className="w-4 h-4" />
                            <span>+251 976 133 918</span>
                        </a>
                        <Link
                            href="/contact"
                            className="btn-primary text-sm hidden xl:flex"
                        >
                            Book a Visit
                        </Link>
                    </div>

                    {/* Mobile Hamburger */}
                    <button
                        onClick={() => setMobileOpen(!mobileOpen)}
                        className={cn(
                            'lg:hidden p-2 rounded-lg transition-colors duration-200',
                            scrolled ? 'text-foreground hover:bg-accent' : 'text-white hover:bg-white/10'
                        )}
                        aria-label="Toggle menu"
                    >
                        {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <div
                className={cn(
                    'lg:hidden bg-white dark:bg-brand-dark border-t border-border transition-all duration-300 overflow-hidden',
                    mobileOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
                )}
            >
                <div className="container mx-auto px-4 py-4 space-y-1">
                    {navLinks.map((link) => (
                        <div key={link.path}>
                            {link.children ? (
                                <>
                                    <button
                                        onClick={() => setOpenDropdown(openDropdown === link.name ? null : link.name)}
                                        className="flex items-center justify-between w-full px-4 py-3 text-sm font-medium text-foreground hover:text-primary hover:bg-primary/5 rounded-lg transition-colors duration-200"
                                    >
                                        {link.name}
                                        <ChevronDown
                                            className={cn('w-4 h-4 transition-transform', openDropdown === link.name && 'rotate-180')}
                                        />
                                    </button>
                                    {openDropdown === link.name && (
                                        <div className="pl-4 space-y-1 mt-1">
                                            {link.children.map((child) => (
                                                <Link
                                                    key={child.path}
                                                    href={child.path}
                                                    className="block px-4 py-2 text-sm text-muted-foreground hover:text-primary hover:bg-primary/5 rounded-lg transition-colors duration-200"
                                                >
                                                    {child.name}
                                                </Link>
                                            ))}
                                        </div>
                                    )}
                                </>
                            ) : (
                                <Link
                                    href={link.path}
                                    className={cn(
                                        'block px-4 py-3 text-sm font-medium rounded-lg transition-colors duration-200',
                                        pathname === link.path
                                            ? 'text-primary bg-primary/10'
                                            : 'text-foreground hover:text-primary hover:bg-primary/5'
                                    )}
                                >
                                    {link.name}
                                </Link>
                            )}
                        </div>
                    ))}
                    <div className="pt-4 border-t border-border space-y-3">
                        <a
                            href="tel:+251976133918"
                            className="flex items-center gap-2 px-4 py-3 text-sm font-medium text-foreground hover:text-primary"
                        >
                            <Phone className="w-4 h-4" />
                            +251 976 133 918
                        </a>
                        <Link href="/contact" className="btn-primary w-full text-center block text-sm">
                            Book a Site Visit
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    );
}
