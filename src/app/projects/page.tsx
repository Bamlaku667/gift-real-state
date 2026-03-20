import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Building2, Home, MapPin, Bed } from 'lucide-react';

export const metadata: Metadata = { title: 'All Projects', description: 'Explore all Gift Real Estate projects across Addis Ababa' };

const projects = [
    { name: 'Hayahulet Site', type: 'Gift Heights', location: 'Hayahulet, Addis Ababa', bedrooms: '1–3 BHK (71–163 sqm)', price: 'From $180,000', status: 'Available', img: '/images/22.jpg', href: '/gift-heights', features: ['High-rise tower', 'City views', 'Modern amenities', 'Gym & pool'] },
    { name: 'Teklehaymanot Site', type: 'Gift Heights', location: 'Teklehaymanot, Addis Ababa', bedrooms: '1–3 BHK (81–174 sqm)', price: 'From $190,000', status: 'Available', img: '/images/tk.jpg', href: '/gift-heights', features: ['Luxurious lobby', 'Rooftop garden', 'Security 24/7', 'Parking'] },
    { name: 'CMC Site', type: 'Gift Village', location: 'CMC, Addis Ababa', bedrooms: '1–3 BHK (81–200 sqm)', price: 'From $220,000', status: 'Available', img: '/images/cmc front.jpg', href: '/gift-village', features: ['Villa style', 'Private garden', 'Quiet neighborhood', 'Schools nearby'] },
    { name: 'Bole Atlas Site', type: 'Gift Heights', location: 'Bole Atlas, Addis Ababa', bedrooms: '2–3 BHK (134–216 sqm)', price: 'From $250,000', status: 'Available', img: '/images/atlas.jpg', href: '/gift-heights', features: ['Premium location', 'International schools', 'Shopping nearby', 'Airport access'] },
    { name: 'Ayat Site', type: 'Gift Heights', location: 'Ayat, Addis Ababa', bedrooms: '1–3 BHK (65–153 sqm)', price: 'From $160,000', status: 'Available', img: '/images/ayat 1.jpg', href: '/gift-heights', features: ['Growing area', 'Great value', 'Community living', 'Parks'] },
    { name: 'La Gare Site', type: 'Gift Village', location: 'La Gare, Addis Ababa', bedrooms: '1–3 BHK (65–163 sqm)', price: 'From $200,000', status: 'Investor Stage', img: '/images/lg.jpg', href: '/gift-village', features: ['Historic area', 'Future rail hub', 'Investment opportunity', 'Central location'] },
];

export default function ProjectsPage() {
    return (
        <div className="min-h-screen">
            {/* Header */}
            <section className="relative h-64 flex items-end pb-12 bg-brand-dark overflow-hidden">
                <Image src="/images/back.jpg" alt="Projects" fill className="object-cover opacity-40" />
                <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 pt-24">
                    <span className="text-primary text-sm font-semibold uppercase tracking-wider">Our Portfolio</span>
                    <h1 className="text-4xl md:text-5xl font-bold text-white font-heading mt-2">All Projects</h1>
                </div>
            </section>

            <section className="py-16 bg-background">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Filters */}
                    <div className="flex flex-wrap gap-3 mb-10">
                        {['All', 'Gift Village', 'Gift Heights', 'Available', 'Investor Stage'].map((f) => (
                            <button key={f} className={`px-5 py-2 rounded-full text-sm font-medium border transition-all duration-200 ${f === 'All' ? 'bg-primary text-brand-dark border-primary' : 'border-border hover:border-primary hover:text-primary'}`}>
                                {f}
                            </button>
                        ))}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                        {projects.map((p) => (
                            <div key={p.name} className="card-luxury overflow-hidden group">
                                <div className="relative h-56">
                                    <Image src={p.img} alt={p.name} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                                    <div className="absolute top-4 left-4">
                                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${p.status === 'Available' ? 'bg-green-500 text-white' : 'bg-yellow-500 text-brand-dark'}`}>
                                            {p.status}
                                        </span>
                                    </div>
                                    <div className="absolute top-4 right-4">
                                        <span className="px-3 py-1 rounded-full text-xs font-bold bg-primary/90 text-brand-dark">{p.type}</span>
                                    </div>
                                </div>
                                <div className="p-6">
                                    <div className="flex items-start justify-between mb-2">
                                        <h3 className="font-heading font-bold text-xl">{p.name}</h3>
                                    </div>
                                    <div className="flex items-center gap-2 text-muted-foreground text-sm mb-2">
                                        <MapPin className="w-3.5 h-3.5 text-primary" />
                                        {p.location}
                                    </div>
                                    <div className="flex items-center gap-2 text-muted-foreground text-sm mb-4">
                                        <Bed className="w-3.5 h-3.5 text-primary" />
                                        {p.bedrooms}
                                    </div>
                                    <div className="flex flex-wrap gap-2 mb-5">
                                        {p.features.map((f) => (
                                            <span key={f} className="text-xs px-2 py-1 rounded-full bg-accent text-muted-foreground">{f}</span>
                                        ))}
                                    </div>
                                    <div className="flex items-center justify-between pt-4 border-t border-border">
                                        <div>
                                            <div className="text-xs text-muted-foreground">Starting From</div>
                                            <div className="font-bold text-lg gradient-text font-heading">{p.price}</div>
                                        </div>
                                        <Link href={p.href} className="btn-primary text-sm flex items-center gap-2 px-4 py-2">
                                            Explore <ArrowRight className="w-3.5 h-3.5" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
