import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = { title: 'Advantage', description: 'The Gift Real Estate advantage — why choose us for your Ethiopian property investment.' };

const advantages = [
    { icon: '🏆', title: 'Proven Track Record', desc: 'Over 20 years of delivering quality residential developments in Addis Ababa. 2,000+ happy families trust the Gift name.' },
    { icon: '📍', title: 'Prime Locations', desc: 'Six prime sites in Addis Ababa\'s most sought-after neighborhoods — strategically situated for connectivity and lifestyle.' },
    { icon: '💳', title: 'Flexible Financing', desc: 'Multiple payment plans in ETB, USD, AED, and other currencies. Bank loan partnerships with major Ethiopian banks.' },
    { icon: '🏗️', title: 'Quality Construction', desc: 'German and Chinese engineering standards. Premium materials. 10-year structural warranty on all units.' },
    { icon: '🌍', title: 'Diaspora Support', desc: 'Dedicated international team. Remote purchase capability. Foreign currency options. Legal representation.' },
    { icon: '🤝', title: 'After-Sales Service', desc: '10+ years post-handover maintenance support. Property management services. Community management.' },
];

export default function AdvantagePage() {
    return (
        <div className="min-h-screen">
            <section className="relative h-64 flex items-end pb-12 bg-brand-dark overflow-hidden">
                <Image src="/images/ofiice team.jpg" alt="Advantage" fill className="object-cover opacity-40" />
                <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 pt-24">
                    <span className="text-primary text-sm font-semibold uppercase tracking-wider">Why Gift?</span>
                    <h1 className="text-4xl md:text-5xl font-bold text-white font-heading mt-2">The Gift Advantage</h1>
                </div>
            </section>
            <section className="py-16 bg-background">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto mb-12">
                        {advantages.map((adv) => (
                            <div key={adv.title} className="card-luxury p-8 text-center group hover:-translate-y-2 transition-transform duration-300">
                                <div className="text-5xl mb-5">{adv.icon}</div>
                                <h3 className="font-heading font-bold text-lg mb-3">{adv.title}</h3>
                                <p className="text-muted-foreground text-sm leading-relaxed">{adv.desc}</p>
                            </div>
                        ))}
                    </div>
                    <div className="text-center">
                        <Link href="/contact" className="btn-primary inline-flex items-center gap-2 text-base px-8 py-4">GET STARTED TODAY</Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
