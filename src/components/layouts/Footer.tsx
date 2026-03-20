import Link from 'next/link';
import { MapPin, Phone, Mail, Facebook, Instagram, Linkedin, Youtube } from 'lucide-react';

export function Footer() {
    return (
        <footer className="bg-brand-dark text-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
                    {/* Branding */}
                    <div className="lg:col-span-1">
                        <Link href="/" className="flex items-center gap-3 mb-5">
                            <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                                <span className="text-brand-dark font-bold text-xl font-heading">G</span>
                            </div>
                            <div>
                                <div className="font-heading font-bold text-base gradient-text">GIFT REAL ESTATE</div>
                                <div className="text-xs text-white/50">ETHIOPIA</div>
                            </div>
                        </Link>
                        <p className="text-sm text-white/60 mb-6 leading-relaxed">
                            Luxury Homes Designed for Ethiopia &amp; The Diaspora. Building communities, transforming lifestyles.
                        </p>
                        <div className="flex gap-3">
                            {[
                                { Icon: Facebook, href: 'https://www.facebook.com/profile.php?id=61574530873667' },
                                { Icon: Instagram, href: '#' },
                                { Icon: Youtube, href: '#' },
                                { Icon: Linkedin, href: '#' },
                            ].map(({ Icon, href }, i) => (
                                <a
                                    key={i}
                                    href={href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary hover:text-brand-dark transition-all duration-200"
                                >
                                    <Icon className="w-4 h-4" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="font-semibold text-white mb-5 text-sm uppercase tracking-wider">Quick Links</h3>
                        <ul className="space-y-3">
                            {[
                                { name: 'The Gift Advantage', path: '/advantage' },
                                { name: 'Gift Village', path: '/gift-village' },
                                { name: 'Gift Heights', path: '/gift-heights' },
                                { name: 'Construction Progress', path: '/construction-progress' },
                                { name: "Founder's Message", path: '/founders-message' },
                            ].map((link) => (
                                <li key={link.path}>
                                    <Link
                                        href={link.path}
                                        className="text-sm text-white/60 hover:text-primary transition-colors duration-200 flex items-center gap-2 group"
                                    >
                                        <span className="w-1 h-1 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Services */}
                    <div>
                        <h3 className="font-semibold text-white mb-5 text-sm uppercase tracking-wider">Services</h3>
                        <ul className="space-y-3">
                            {[
                                { name: 'Diaspora Gateway', path: '/diaspora' },
                                { name: 'Floor Plans', path: '/floor-plans' },
                                { name: 'Payment Plans', path: '/payment-plans' },
                                { name: 'Virtual Tours', path: '/virtual-tour' },
                                { name: 'All Projects', path: '/projects' },
                            ].map((link) => (
                                <li key={link.path}>
                                    <Link
                                        href={link.path}
                                        className="text-sm text-white/60 hover:text-primary transition-colors duration-200 flex items-center gap-2 group"
                                    >
                                        <span className="w-1 h-1 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="font-semibold text-white mb-5 text-sm uppercase tracking-wider">Contact Us</h3>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3">
                                <MapPin className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                                <span className="text-sm text-white/60">Addis Ababa, Ethiopia</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <Phone className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                                <div className="space-y-1">
                                    <a href="tel:+251976133918" className="block text-sm text-white/60 hover:text-primary transition-colors">
                                        +251 976 133 918
                                    </a>
                                    {/* <a href="tel:+12002003000" className="block text-sm text-white/60 hover:text-primary transition-colors">
                                        +1 200 200 3000 (US)
                                    </a> */}
                                </div>
                            </li>
                            <li className="flex items-start gap-3">
                                <Mail className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                                <a href="mailto:info@giftrealestate.et" className="text-sm text-white/60 hover:text-primary transition-colors">
                                    info@giftrealestate.et
                                </a>
                            </li>
                        </ul>

                        {/* WhatsApp CTA */}
                        <a
                            href="https://wa.me/251976133918"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-6 flex items-center gap-2 bg-[#25D366] text-white px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-[#1ea855] transition-colors duration-200 w-fit"
                        >
                            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                                <path d="M20.52 3.48A11.93 11.93 0 0 0 12 0C5.37 0 0 5.37 0 12c0 2.11.55 4.18 1.6 6L0 24l6.22-1.63A11.94 11.94 0 0 0 12 24c6.63 0 12-5.37 12-12a11.93 11.93 0 0 0-3.48-8.52zM12 22c-1.85 0-3.66-.5-5.24-1.44l-.37-.22-3.86 1.01 1.03-3.74-.24-.38A9.96 9.96 0 0 1 2 12C2 6.49 6.49 2 12 2c2.67 0 5.18 1.04 7.07 2.93A9.94 9.94 0 0 1 22 12c0 5.51-4.49 10-10 10zm5.47-7.5c-.3-.15-1.77-.87-2.04-.97-.28-.1-.48-.15-.68.15s-.78.97-.96 1.17c-.18.2-.35.22-.65.07a8.1 8.1 0 0 1-2.39-1.47 9 9 0 0 1-1.65-2.05c-.17-.3-.02-.46.13-.6l.44-.52c.14-.18.18-.3.27-.5.09-.2.05-.37-.02-.52-.07-.15-.68-1.63-.93-2.24-.24-.58-.49-.5-.68-.51l-.58-.01a1.12 1.12 0 0 0-.81.38 3.4 3.4 0 0 0-1.06 2.53c0 1.49 1.08 2.93 1.23 3.13.15.2 2.1 3.2 5.07 4.49.71.3 1.26.48 1.69.62.71.23 1.36.2 1.87.12.57-.09 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.35z" />
                            </svg>
                            WhatsApp Us
                        </a>
                    </div>
                </div>

                <div className="border-t border-white/10 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-sm text-white/40">© 2026 Gift Real Estate Ethiopia. All rights reserved.</p>
                    <div className="flex gap-6">
                        <Link href="/advantage" className="text-xs text-white/40 hover:text-primary transition-colors">Privacy Policy</Link>
                        <Link href="/contact" className="text-xs text-white/40 hover:text-primary transition-colors">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
