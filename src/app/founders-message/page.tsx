import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = { title: "Founder's Message", description: "A message from Mr. Gebreyesus Igata, Founder & CEO of Gift Real Estate Ethiopia." };

export default function FoundersMessagePage() {
    return (
        <div className="min-h-screen">
            <section className="relative h-64 flex items-end pb-12 bg-brand-dark overflow-hidden">
                <Image src="/images/ato gebreyes.jpg" alt="Founder" fill className="object-cover object-top opacity-60" />
                <div className="absolute inset-0 hero-overlay" />
                <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 pt-24">
                    <span className="text-primary text-sm font-semibold uppercase tracking-wider">From Our Founder</span>
                    <h1 className="text-4xl md:text-5xl font-bold text-white font-heading mt-2">Founder&apos;s Message</h1>
                </div>
            </section>
            <section className="py-16 bg-background">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start max-w-6xl mx-auto">
                        <div className="relative">
                            <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-luxury">
                                <Image src="/images/ato gebreyes.jpg" alt="Mr. Gebreyesus Igata - CEO" fill className="object-cover object-top" />
                            </div>
                            <div className="absolute -bottom-4 -right-4 bg-primary rounded-2xl p-5 shadow-glow">
                                <div className="font-heading font-bold text-brand-dark text-sm">Mr. Gebreyesus Igata</div>
                                <div className="text-brand-dark/70 text-xs">Founder &amp; CEO</div>
                            </div>
                        </div>
                        <div className="pt-4">
                            <blockquote className="text-2xl font-heading font-medium text-foreground mb-8 leading-relaxed italic border-l-4 border-primary pl-6">
                                &ldquo;Our commitment is your future in Ethiopia.&rdquo;
                            </blockquote>
                            <div className="space-y-5 text-muted-foreground leading-relaxed">
                                <p>
                                    GRE&apos;s mission is to provide cutting-edge residential and commercial properties that are designed and built
                                    specifically to meet the needs of customers, transforming their lifestyle to a higher standard 21st-century lifestyle.
                                </p>
                                <p>
                                    For over two decades, Gift Real Estate has been at the forefront of Ethiopia&apos;s real estate transformation.
                                    We have witnessed firsthand the aspirations of millions of Ethiopians — both at home and in the diaspora —
                                    who dream of owning a beautiful, modern home in their homeland.
                                </p>
                                <p>
                                    At Gift Real Estate, we believe that a home is more than four walls — it is the foundation of a family,
                                    a community, and a legacy. Every unit we build carries with it our promise of quality, integrity, and enduring value.
                                </p>
                                <p>
                                    To our diaspora community: we hear you, we see you, and we have built Gift Real Estate with you in mind.
                                    From flexible foreign currency payments to virtual purchasing options, we have eliminated every barrier
                                    between you and your dream Ethiopian home.
                                </p>
                                <p>
                                    I personally invite each and every one of you to be part of the Gift family. Together, we build not just homes —
                                    we build the future of Ethiopia.
                                </p>
                            </div>
                            <div className="mt-8 pt-8 border-t border-border">
                                <div className="font-heading font-bold text-lg">Mr. Gebreyesus Igata</div>
                                <div className="text-muted-foreground text-sm">Founder &amp; CEO, Gift Real Estate Ethiopia</div>
                            </div>
                            <div className="flex flex-wrap gap-4 mt-8">
                                <Link href="/contact" className="btn-primary">BOOK A SITE VISIT</Link>
                                <Link href="/projects" className="px-6 py-3 rounded-lg border border-border hover:border-primary hover:text-primary transition-colors">VIEW PROJECTS</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
