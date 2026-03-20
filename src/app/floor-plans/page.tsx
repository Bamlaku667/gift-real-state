import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = { title: 'Floor Plans', description: 'Interactive floor plan viewer for all Gift Real Estate apartment configurations.' };

const floorPlans = [
    { type: '1BHK Studio', size: '65–81 sqm', bedrooms: 1, baths: 1, img: '/images/ayat ren.jpg', sites: ['Hayahulet', 'CMC', 'Ayat', 'La Gare'] },
    { type: '2BHK Standard', size: '95–134 sqm', bedrooms: 2, baths: 2, img: '/images/atlas side.jpg', sites: ['All 6 Sites'] },
    { type: '2BHK Premium', size: '141–155 sqm', bedrooms: 2, baths: 2, img: '/images/b1 render.jpg', sites: ['Bole Atlas', 'La Gare', 'CMC'] },
    { type: '3BHK Standard', size: '128–154 sqm', bedrooms: 3, baths: 2, img: '/images/atlas 2.jpg', sites: ['All 6 Sites'] },
    { type: '3BHK Grand', size: '154–200 sqm', bedrooms: 3, baths: 3, img: '/images/VILLA.jpg', sites: ['CMC', 'Bole Atlas', 'Hayahulet'] },
    { type: '3BHK Penthouse', size: '200–216 sqm', bedrooms: 3, baths: 3, img: '/images/lg 2phase.jpg', sites: ['Bole Atlas', 'La Gare'] },
];

export default function FloorPlansPage() {
    return (
        <div className="min-h-screen">
            <section className="relative h-64 flex items-end pb-12 bg-brand-dark overflow-hidden">
                <Image src="/images/b1.jpg" alt="Floor Plans" fill className="object-cover opacity-50" />
                <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 pt-24">
                    <span className="text-primary text-sm font-semibold uppercase tracking-wider">Unit Configurations</span>
                    <h1 className="text-4xl md:text-5xl font-bold text-white font-heading mt-2">Floor Plan Viewer</h1>
                </div>
            </section>
            <section className="py-16 bg-background">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="section-heading mb-4">Choose Your Perfect Layout</h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto">Explore all unit configurations with detailed layouts. Request customizations through our sales team.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto mb-10">
                        {floorPlans.map((plan) => (
                            <div key={plan.type} className="card-luxury overflow-hidden group">
                                <div className="relative h-48">
                                    <Image src={plan.img} alt={plan.type} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                                </div>
                                <div className="p-6">
                                    <h3 className="font-heading font-bold text-lg mb-2">{plan.type}</h3>
                                    <div className="grid grid-cols-3 gap-3 mb-4 text-center">
                                        <div className="bg-accent rounded-lg p-2">
                                            <div className="font-bold text-primary">{plan.bedrooms}</div>
                                            <div className="text-xs text-muted-foreground">Beds</div>
                                        </div>
                                        <div className="bg-accent rounded-lg p-2">
                                            <div className="font-bold text-primary">{plan.baths}</div>
                                            <div className="text-xs text-muted-foreground">Baths</div>
                                        </div>
                                        <div className="bg-accent rounded-lg p-2">
                                            <div className="font-bold text-primary text-xs">{plan.size}</div>
                                            <div className="text-xs text-muted-foreground">sqm</div>
                                        </div>
                                    </div>
                                    <div className="text-xs text-muted-foreground mb-4">Available at: {plan.sites.join(', ')}</div>
                                    <Link href="/contact" className="btn-primary text-sm w-full text-center block py-2">REQUEST THIS LAYOUT</Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
