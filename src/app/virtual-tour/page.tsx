import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = { title: 'Virtual Tour', description: 'Take an immersive 360° virtual tour of Gift Real Estate properties.' };

const tours = [
    { name: 'Bole Atlas - 3BHK Show Unit', img: '/images/atlas side.jpg', type: '360° Tour', href: '#' },
    { name: 'La Gare - Lobby & Amenities', img: '/images/lg.jpg', type: '360° Tour', href: '#' },
    { name: 'CMC Village - Villa Tour', img: '/images/VILLA.jpg', type: 'Video Tour', href: '#' },
    { name: 'Ayat Site - 2BHK Model', img: '/images/ayat ren.jpg', type: '360° Tour', href: '#' },
];

export default function VirtualTourPage() {
    return (
        <div className="min-h-screen">
            <section className="relative h-64 flex items-end pb-12 bg-brand-dark overflow-hidden">
                <Image src="/images/b1 render.jpg" alt="Virtual Tour" fill className="object-cover opacity-50" />
                <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 pt-24">
                    <span className="text-primary text-sm font-semibold uppercase tracking-wider">Explore Virtually</span>
                    <h1 className="text-4xl md:text-5xl font-bold text-white font-heading mt-2">Virtual Tour Portal</h1>
                </div>
            </section>
            <section className="py-16 bg-background">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="section-heading mb-4">Immersive 360° Tours</h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto">Explore our properties from wherever you are in the world. High-quality virtual tours with 160+ viewpoints.</p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-5xl mx-auto mb-12">
                        {tours.map((tour) => (
                            <div key={tour.name} className="card-luxury overflow-hidden group cursor-pointer">
                                <div className="relative h-52">
                                    <Image src={tour.img} alt={tour.name} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center">
                                            <span className="text-2xl">▶</span>
                                        </div>
                                    </div>
                                    <div className="absolute top-4 right-4 bg-primary text-brand-dark text-xs font-bold px-3 py-1 rounded-full">{tour.type}</div>
                                </div>
                                <div className="p-4">
                                    <h3 className="font-semibold">{tour.name}</h3>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="text-center">
                        <p className="text-muted-foreground mb-4">Can&apos;t find what you&apos;re looking for? Book a live video call with our agent.</p>
                        <Link href="/contact" className="btn-primary inline-flex items-center gap-2">BOOK LIVE VIDEO TOUR</Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
