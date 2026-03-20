import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, CheckCircle } from 'lucide-react';

export const metadata: Metadata = { title: 'Gift Heights | High-Rise Luxury Apartments', description: 'Luxury high-rise apartments at Hayahulet, Teklehaymanot, Bole Atlas, Ayat and La Gare sites.' };

const sites = [
    { name: 'Hayahulet', units: [{ type: '1BHK', size: '71 sqm' }, { type: '2BHK', size: '98, 121, 129 sqm' }, { type: '3BHK', size: '130, 136, 154, 163 sqm' }] },
    { name: 'La Gare', units: [{ type: '1BHK', size: '65 sqm' }, { type: '2BHK', size: '108, 141 sqm' }, { type: '3BHK', size: '163 sqm' }] },
    { name: 'Bole Atlas', units: [{ type: '2BHK', size: '134, 151 sqm' }, { type: '3BHK', size: '206, 216 sqm' }] },
    { name: 'CMC', units: [{ type: '1BHK', size: '81 sqm' }, { type: '2BHK', size: '125, 144, 154 sqm' }, { type: '3BHK', size: '154, 182, 200 sqm' }] },
    { name: 'Ayat', units: [{ type: '1BHK', size: '65 sqm' }, { type: '2BHK', size: '104 sqm' }, { type: '3BHK', size: '128, 153 sqm' }] },
    { name: 'Teklehaymanot', units: [{ type: '1BHK', size: '81 sqm' }, { type: '2BHK', size: '85, 95, 108, 135 sqm' }, { type: '3BHK', size: '136, 152, 174 sqm' }] },
];

const amenities = ['24/7 Security & CCTV', 'Underground Parking', 'Rooftop Garden', 'High-Speed Elevators', 'Gym & Fitness Center', 'Children Playground', 'Power Backup Generator', '10-Year Maintenance'];

export default function GiftHeightsPage() {
    return (
        <div className="min-h-screen">
            <section className="relative h-72 flex items-end pb-12 overflow-hidden">
                <Image src="/images/b1 render.jpg" alt="Gift Heights" fill className="object-cover" />
                <div className="absolute inset-0 hero-overlay" />
                <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 pt-24">
                    <span className="text-primary text-sm font-semibold uppercase tracking-wider">High-Rise Collection</span>
                    <h1 className="text-4xl md:text-5xl font-bold text-white font-heading mt-2">GIFT HEIGHTS</h1>
                    <p className="text-white/70 mt-2">Premium apartments across 6 prime Addis Ababa locations</p>
                </div>
            </section>

            {/* Overview */}
            <section className="py-16 bg-background">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
                        <div>
                            <h2 className="section-heading mb-4">Luxury Living, Prime Locations</h2>
                            <p className="text-muted-foreground mb-6 leading-relaxed">
                                Gift Heights represents our flagship high-rise apartment collection, with developments across 6 prime locations in Addis Ababa. Each unit is crafted with premium materials and designed for modern living.
                            </p>
                            <div className="bg-primary/10 border border-primary/20 rounded-xl p-4 mb-6">
                                <p className="font-semibold text-primary text-sm">🏗️ INVESTOR STAGE — Pre-launch pricing available now</p>
                            </div>
                            <div className="flex flex-wrap gap-4">
                                <Link href="/floor-plans" className="btn-primary inline-flex items-center gap-2">FLOOR PLANS</Link>
                                <Link href="/payment-plans" className="px-6 py-3 rounded-lg border border-border hover:border-primary hover:text-primary transition-colors">CHECK AVAILABILITY</Link>
                            </div>
                        </div>
                        <div className="relative h-80 rounded-2xl overflow-hidden shadow-luxury">
                            <Image src="/images/b1.jpg" alt="Gift Heights Interior" fill className="object-cover" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Unit Sizes by Site */}
            <section className="py-16 bg-accent">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="section-heading text-center mb-4">Available Sites &amp; Unit Sizes</h2>
                    <p className="text-muted-foreground text-center mb-10">Select a site to view available configurations</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                        {sites.map((site) => (
                            <div key={site.name} className="card-luxury p-6">
                                <h3 className="font-heading font-bold text-lg mb-4 flex items-center gap-2">
                                    <span className="w-2 h-2 bg-primary rounded-full" />{site.name}
                                </h3>
                                <ul className="space-y-2">
                                    {site.units.map((u) => (
                                        <li key={u.type} className="flex justify-between text-sm border-b border-border pb-2">
                                            <span className="font-medium text-primary">{u.type}</span>
                                            <span className="text-muted-foreground">{u.size}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Amenities */}
            <section className="py-16 bg-background">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
                    <h2 className="section-heading text-center mb-10">World-Class Amenities</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {amenities.map((a) => (
                            <div key={a} className="flex items-center gap-3 p-4 rounded-xl border border-border hover:border-primary hover:bg-primary/5 transition-all duration-200">
                                <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                                <span className="text-sm font-medium">{a}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-12 bg-brand-dark text-center">
                <h2 className="text-2xl font-heading font-bold text-white mb-4">Ready to own your Gift Heights unit?</h2>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link href="/contact" className="btn-primary inline-flex items-center gap-2">BOOK A VISIT</Link>
                    <Link href="/virtual-tour" className="px-6 py-3 rounded-lg border border-white/30 text-white hover:bg-white/10 transition-colors">VIRTUAL TOUR</Link>
                </div>
            </section>
        </div>
    );
}
