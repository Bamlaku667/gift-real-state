import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import type { ConstructionUpdate } from '@/app/api/construction/route';

export const metadata: Metadata = { title: 'Construction Progress', description: 'Live construction progress updates across all Gift Real Estate sites.' };
export const dynamic = 'force-dynamic';
export const revalidate = 0;

async function getUpdates(): Promise<ConstructionUpdate[]> {
    try {
        const base = process.env.NEXTAUTH_URL || 'http://localhost:3000';
        const res = await fetch(`${base}/api/construction`, { cache: 'no-store' });
        if (!res.ok) return [];
        return res.json();
    } catch { return []; }
}

export default async function ConstructionProgressPage() {
    const sites = await getUpdates();

    return (
        <div className="min-h-screen">
            <section className="relative h-64 flex items-end pb-12 bg-brand-dark overflow-hidden">
                <Image src="/images/atlas progress.jpg" alt="Construction" fill className="object-cover opacity-50" />
                <div className="absolute inset-0 hero-overlay" />
                <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 pt-24">
                    <span className="text-primary text-sm font-semibold uppercase tracking-wider">Transparency & Trust</span>
                    <h1 className="text-4xl md:text-5xl font-bold text-white font-heading mt-2">Construction Progress</h1>
                </div>
            </section>

            <section className="py-16 bg-background">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="section-heading mb-4">Live Site Updates</h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto">Real-time progress across all our active construction sites — updated regularly by our project managers.</p>
                    </div>

                    {sites.length === 0 ? (
                        <div className="text-center py-16 text-muted-foreground">No updates available yet. Check back soon.</div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto mb-12">
                            {sites.map((site) => (
                                <div key={site.id} className="card-luxury overflow-hidden">
                                    {site.image && (
                                        <div className="relative h-48 w-full">
                                            <Image src={site.image} alt={site.site} fill className="object-cover" />
                                            <div className="absolute inset-0 bg-black/20" />
                                            <div className="absolute bottom-3 left-4">
                                                <span className="bg-primary text-brand-dark text-xs font-bold px-3 py-1 rounded-full">{site.progress}% Complete</span>
                                            </div>
                                        </div>
                                    )}
                                    <div className="p-6">
                                        <div className="flex items-start justify-between mb-3">
                                            <div>
                                                <h3 className="font-heading font-bold text-xl">{site.site}</h3>
                                                <p className="text-muted-foreground text-sm">{site.phase}</p>
                                            </div>
                                            <span className="text-xs text-muted-foreground">{new Date(site.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                                        </div>
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-xs text-muted-foreground">Overall Progress</span>
                                            <span className="text-sm font-bold text-primary">{site.progress}%</span>
                                        </div>
                                        <div className="w-full bg-accent rounded-full h-3 mb-4">
                                            <div className="bg-primary h-3 rounded-full transition-all duration-1000" style={{ width: `${site.progress}%` }} />
                                        </div>
                                        <p className="text-sm text-muted-foreground leading-relaxed">{site.update}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    <div className="text-center mt-8">
                        <p className="text-muted-foreground mb-4">Want a personal site visit?</p>
                        <Link href="/contact" className="btn-primary inline-flex items-center gap-2">BOOK A SITE VISIT</Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
