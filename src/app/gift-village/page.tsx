import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = { title: 'Gift Village | Villas & Community Living', description: 'Gift Village offers lush villa communities in Addis Ababa.' };

export default function GiftVillagePage() {
    return (
        <div className="min-h-screen">
            <section className="relative h-72 flex items-end pb-12 overflow-hidden">
                <Image src="/images/lg my village.jpg" alt="Gift Village" fill className="object-cover" />
                <div className="absolute inset-0 hero-overlay" />
                <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 pt-24">
                    <span className="text-primary text-sm font-semibold uppercase tracking-wider">Villa Collection</span>
                    <h1 className="text-4xl md:text-5xl font-bold text-white font-heading mt-2">GIFT VILLAGE</h1>
                    <p className="text-white/70 mt-2">Luxury villas — community living in Addis Ababa</p>
                </div>
            </section>

            <section className="py-16 bg-background">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
                        <div>
                            <h2 className="section-heading mb-4">LA GARE PROJECT</h2>
                            <p className="text-muted-foreground mb-6 leading-relaxed">
                                Gift Village offers luxurious villa-style living in a secure, gated community.
                                Experience the perfect blend of modern architecture and natural surroundings,
                                designed for Ethiopian families and the global diaspora.
                            </p>
                            <div className="grid grid-cols-3 gap-4 mb-8">
                                {[['🏠', 'Private Villas', 'Fully detached'], ['🌳', 'Landscaped', 'Community gardens'], ['🔒', 'Gated Security', '24/7 guarded']].map(([emoji, label, sub]) => (
                                    <div key={label} className="text-center p-4 bg-accent rounded-xl">
                                        <div className="text-2xl mb-2">{emoji}</div>
                                        <div className="font-semibold text-sm">{label}</div>
                                        <div className="text-xs text-muted-foreground">{sub}</div>
                                    </div>
                                ))}
                            </div>
                            <div className="flex flex-wrap gap-4">
                                <Link href="/virtual-tour" className="btn-primary">VIRTUAL 360 TOUR</Link>
                                <Link href="/floor-plans" className="px-6 py-3 rounded-lg border border-border hover:border-primary hover:text-primary transition-colors">FLOOR PLANS</Link>
                                <Link href="/contact" className="px-6 py-3 rounded-lg border border-border hover:border-primary hover:text-primary transition-colors">BOOK A VISIT</Link>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="relative h-56 rounded-2xl overflow-hidden shadow-luxury"><Image src="/images/lg 2phase.jpg" alt="La Gare" fill className="object-cover" /></div>
                            <div className="relative h-56 rounded-2xl overflow-hidden shadow-luxury"><Image src="/images/VILLA.jpg" alt="Villa" fill className="object-cover" /></div>
                            <div className="relative h-56 rounded-2xl overflow-hidden shadow-luxury col-span-2"><Image src="/images/village comunity.jpg" alt="Community" fill className="object-cover" /></div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
