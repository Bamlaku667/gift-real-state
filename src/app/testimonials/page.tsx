import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import type { Testimonial } from '@/app/api/testimonials/route';

export const metadata: Metadata = { title: 'Client Testimonials', description: 'Real stories from satisfied Gift Real Estate homeowners.' };
export const dynamic = 'force-dynamic';
export const revalidate = 0;

async function getTestimonials(): Promise<Testimonial[]> {
    try {
        const base = process.env.NEXTAUTH_URL || 'http://localhost:3000';
        const res = await fetch(`${base}/api/testimonials`, { cache: 'no-store' });
        if (!res.ok) return [];
        return res.json();
    } catch { return []; }
}

function Stars({ count }: { count: number }) {
    return (
        <div className="flex gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
                <svg key={i} className={`w-4 h-4 ${i < count ? 'text-primary fill-primary' : 'text-muted-foreground/30 fill-muted-foreground/30'}`} viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
            ))}
        </div>
    );
}

export default async function TestimonialsPage() {
    const testimonials = await getTestimonials();

    return (
        <div className="min-h-screen">
            <section className="relative h-64 flex items-end pb-12 bg-brand-dark overflow-hidden">
                <Image src="/images/ofiice team.jpg" alt="Testimonials" fill className="object-cover opacity-40" />
                <div className="absolute inset-0 hero-overlay" />
                <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 pt-24">
                    <span className="text-primary text-sm font-semibold uppercase tracking-wider">Real Stories</span>
                    <h1 className="text-4xl md:text-5xl font-bold text-white font-heading mt-2">Client Testimonials</h1>
                </div>
            </section>

            <section className="py-16 bg-background">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="section-heading mb-4">What Our Clients Say</h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto">Thousands of happy homeowners trust Gift Real Estate with their most important investment.</p>
                    </div>

                    {testimonials.length === 0 ? (
                        <div className="text-center py-16 text-muted-foreground">Testimonials coming soon.</div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto mb-12">
                            {testimonials.map((t) => (
                                <div key={t.id} className="card-luxury p-7 flex flex-col">
                                    <Stars count={t.rating} />
                                    <blockquote className="text-muted-foreground text-sm leading-relaxed italic my-5 flex-1">
                                        &ldquo;{t.quote}&rdquo;
                                    </blockquote>
                                    <div className="flex items-center gap-3 pt-4 border-t border-border">
                                        <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                                            <span className="text-brand-dark font-bold text-lg">{t.name[0]}</span>
                                        </div>
                                        <div>
                                            <div className="font-semibold text-sm">{t.name}</div>
                                            <div className="text-xs text-muted-foreground">{t.location}</div>
                                            <div className="text-xs text-primary mt-0.5">{t.property}</div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    <div className="text-center mt-4">
                        <Link href="/contact" className="btn-primary inline-flex items-center gap-2">BECOME A HOMEOWNER</Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
