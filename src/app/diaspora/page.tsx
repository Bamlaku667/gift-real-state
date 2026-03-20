import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = { title: 'Diaspora Gateway', description: 'Gift Real Estate Ethiopia — services for international and diaspora clients.' };

export default function DiasporaPage() {
    return (
        <div className="min-h-screen">
            <section className="relative h-64 flex items-end pb-12 bg-brand-dark overflow-hidden">
                <Image src="/images/back.jpg" alt="Diaspora" fill className="object-cover opacity-40" />
                <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 pt-24">
                    <span className="text-primary text-sm font-semibold uppercase tracking-wider">International Clients</span>
                    <h1 className="text-4xl md:text-5xl font-bold text-white font-heading mt-2">DIASPORA GATEWAY</h1>
                </div>
            </section>
            <section className="py-16 bg-background">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="section-heading mb-4">Invest in Ethiopia from Anywhere in the World</h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto">We&apos;ve made it easy for Ethiopians across the globe to own property in their home country.</p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                        {[
                            { flag: '🇺🇸', country: 'United States', phone: '+1 200 200 3000' },
                            { flag: '🇦🇪', country: 'UAE', phone: '+971 200 3000' },
                            { flag: '🇬🇧', country: 'United Kingdom', phone: '+44 200 3000' },
                            { flag: '🇨🇦', country: 'Canada', phone: '+1 800 3000' },
                        ].map(({ flag, country, phone }) => (
                            <div key={country} className="card-luxury p-6 text-center hover:-translate-y-2 transition-transform duration-300">
                                <div className="text-4xl mb-3">{flag}</div>
                                <h3 className="font-bold font-heading mb-1">{country}</h3>
                                <p className="text-sm text-muted-foreground">{phone}</p>
                            </div>
                        ))}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                        {[
                            { icon: '💱', title: 'Foreign Currency Options', desc: 'Pay in USD, AED, GBP, CAD or ETB. We handle the conversion and compliance.' },
                            { icon: '⚖️', title: 'Legal Documentation', desc: 'Our legal team handles all property registration and title deed processes.' },
                            { icon: '🖥️', title: 'Virtual Property Viewing', desc: 'High-quality 360° virtual tours and live video walkthroughs with our agents.' },
                        ].map(({ icon, title, desc }) => (
                            <div key={title} className="card-luxury p-6 text-center">
                                <div className="text-4xl mb-4">{icon}</div>
                                <h3 className="font-heading font-bold text-lg mb-3">{title}</h3>
                                <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
                            </div>
                        ))}
                    </div>
                    <div className="text-center">
                        <Link href="/contact" className="btn-primary text-base px-8 py-4 inline-flex items-center gap-2">SCHEDULE A CONSULTATION</Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
