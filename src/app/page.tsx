import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Search, MapPin, ArrowRight, Home, Building2, Check, Globe, Phone, Mail, MessageCircle, Send } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Gift Real Estate Ethiopia | Luxury Homes for Ethiopia & The Diaspora',
    description: 'Discover premium villas and high-rise apartments in prime Addis Ababa locations. Gift Real Estate — building communities for Ethiopia and the Diaspora.',
};

const features = [
    { icon: Check, title: 'PROVEN TRACK RECORD', desc: 'Over 20 years delivering quality homes across Addis Ababa' },
    { icon: MapPin, title: 'PRIME LOCATIONS', desc: '6 strategic sites: CMC, Bole Atlas, Hayahulet, La Gare, Ayat, Teklehaymanot' },
    { icon: Globe, title: 'DIASPORA READY', desc: 'Foreign currency payments, legal support, dedicated international team' },
];

const sites = [
    { name: 'Hayahulet Site', desc: 'Luxury high-rise apartments with panoramic city views', img: '/images/22.jpg', href: '/gift-heights' },
    { name: 'Teklehaymanot Site', desc: 'Premium apartments in vibrant Teklehaymanot district', img: '/images/tk.jpg', href: '/gift-heights' },
    { name: 'CMC Site', desc: 'Premium residential villas in serene CMC area', img: '/images/cmc front.jpg', href: '/gift-village' },
    { name: 'Bole Atlas Site', desc: 'Modern apartments in prestigious Bole district', img: '/images/atlas.jpg', href: '/gift-heights' },
    { name: 'Ayat Site', desc: 'Contemporary living spaces in growing Ayat community', img: '/images/ayat 1.jpg', href: '/gift-heights' },
    { name: 'La Gare Site', desc: 'Luxury residences near the iconic La Gare station', img: '/images/lg.jpg', href: '/gift-heights' },
];

const stats = [
    { value: '20+', label: 'Years Experience' },
    { value: '6', label: 'Prime Sites' },
    { value: '2,000+', label: 'Happy Families' },
    { value: '100%', label: 'Quality Assured' },
];

const testimonials = [
    { name: 'Abebe Girma', location: 'Washington DC, USA', quote: 'Gift Real Estate made my dream of owning a home in Ethiopia a reality. The diaspora support team was exceptional throughout the entire process.' },
    { name: 'Tigist Haile', location: 'Dubai, UAE', quote: 'The quality of construction and attention to detail is unmatched. I purchased remotely and the team guided me every step of the way.' },
    { name: 'Solomon Bekele', location: 'Addis Ababa', quote: 'From the virtual tour to handover, the experience was seamless. My new home at Bole Atlas exceeds all expectations.' },
];

export default function HomePage() {
    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0">
                    <Image
                        src="/images/logo for cover.jpg"
                        alt="Gift Real Estate - Luxury Homes Ethiopia"
                        fill
                        priority
                        className="object-cover"
                    />
                    <div className="absolute inset-0 hero-overlay" />
                </div>

                <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 pt-20">
                    <div className="max-w-4xl">
                        <div className="inline-flex items-center gap-2 bg-primary/20 backdrop-blur-sm border border-primary/30 rounded-full px-4 py-2 mb-6">
                            <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                            <span className="text-primary text-sm font-medium">Ethiopia&apos;s Premier Real Estate Developer</span>
                        </div>

                        <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6">
                            Gift Real Estate
                            <span className="block gradient-text">We Build Community</span>
                        </h1>

                        <p className="text-lg md:text-xl text-white/80 mb-10 max-w-2xl leading-relaxed">
                            Luxury Homes Designed for Ethiopia &amp; The Diaspora. Six prime locations in Addis Ababa,
                            premium construction, flexible payment plans.
                        </p>

                        {/* Stats */}
                        <div className="flex flex-wrap gap-8 mb-10">
                            {stats.map((stat) => (
                                <div key={stat.value} className="text-center">
                                    <div className="text-3xl font-bold gradient-text font-heading">{stat.value}</div>
                                    <div className="text-white/60 text-sm">{stat.label}</div>
                                </div>
                            ))}
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link href="/projects" className="btn-primary flex items-center justify-center gap-2 text-base px-8 py-4">
                                VIEW ALL PROJECTS
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                            <Link
                                href="/contact"
                                className="flex items-center justify-center gap-2 text-base px-8 py-4 rounded-lg border border-white/30 text-white hover:bg-white/10 backdrop-blur-sm transition-all duration-300"
                            >
                                BOOK A SITE VISIT
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Scroll indicator */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
                    <div className="w-px h-10 bg-gradient-to-b from-white/60 to-transparent animate-pulse" />
                    <span className="text-white/40 text-xs uppercase tracking-widest">Scroll</span>
                </div>
            </section>

            {/* Property Search Bar */}
            <section className="py-8 bg-background border-b border-border">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-luxury border border-border p-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            <select className="input-luxury text-sm">
                                <option value="">Property Type</option>
                                <option value="villa">Villa</option>
                                <option value="apartment">Apartment</option>
                            </select>
                            <select className="input-luxury text-sm">
                                <option value="">Location</option>
                                <option value="cmc">CMC Site</option>
                                <option value="bole-atlas">Bole Atlas</option>
                                <option value="ayat">Ayat Site</option>
                                <option value="la-gare">La Gare</option>
                                <option value="hayahulet">Hayahulet</option>
                                <option value="teklehaymanot">Teklehaymanot</option>
                            </select>
                            <select className="input-luxury text-sm">
                                <option value="">Bedrooms</option>
                                <option value="1bhk">1 BHK</option>
                                <option value="2bhk">2 BHK</option>
                                <option value="3bhk">3 BHK</option>
                            </select>
                            <Link
                                href="/projects"
                                className="btn-primary flex items-center justify-center gap-2 text-sm font-semibold"
                            >
                                <Search className="w-4 h-4" />
                                SEARCH PROPERTIES
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured Projects */}
            <section className="py-20 bg-background">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-14">
                        <span className="text-primary text-sm font-semibold uppercase tracking-wider">Our Developments</span>
                        <h2 className="section-heading mt-2 mb-4">Featured Projects</h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            Discover premium villa and high-rise developments in prime Addis Ababa locations
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
                        {sites.map((site) => (
                            <Link key={site.name} href={site.href} className="group relative overflow-hidden rounded-2xl shadow-lg cursor-pointer block">
                                <div className="relative h-72">
                                    <Image
                                        src={site.img}
                                        alt={site.name}
                                        fill
                                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 hero-overlay opacity-80 group-hover:opacity-90 transition-opacity duration-300" />
                                </div>
                                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                                    <h3 className="text-xl font-bold font-heading mb-1">{site.name}</h3>
                                    <p className="text-sm text-white/70 mb-4">{site.desc}</p>
                                    <div className="flex items-center gap-2 text-primary text-sm font-medium opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                                        EXPLORE PROJECT <ArrowRight className="w-4 h-4" />
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>

                    <div className="text-center mt-10">
                        <Link href="/projects" className="btn-primary inline-flex items-center gap-2">
                            VIEW ALL PROJECTS <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* The Gift Advantage */}
            <section className="py-20 bg-brand-dark">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-14">
                        <span className="text-primary text-sm font-semibold uppercase tracking-wider">Why Choose Us</span>
                        <h2 className="section-heading mt-2 mb-4 text-white">The &ldquo;Gift&rdquo; Advantage</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
                        {features.map(({ icon: Icon, title, desc }) => (
                            <div
                                key={title}
                                className="bg-white/5 border border-white/10 rounded-2xl p-8 text-center hover:bg-white/10 hover:-translate-y-2 transition-all duration-300 group"
                            >
                                <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center mx-auto mb-5 group-hover:bg-primary/30 transition-colors">
                                    <Icon className="w-8 h-8 text-primary" />
                                </div>
                                <h3 className="text-lg font-bold text-white mb-3 font-heading">{title}</h3>
                                <p className="text-white/60 text-sm leading-relaxed">{desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Construction Progress Preview */}
            <section className="py-20 bg-background">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-14">
                        <span className="text-primary text-sm font-semibold uppercase tracking-wider">Live Updates</span>
                        <h2 className="section-heading mt-2 mb-4">Construction Progress Hub</h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto">Real-time updates from our active construction sites across Addis Ababa</p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto mb-8">
                        {[
                            { img: '/images/atlas progress.jpg', label: 'Bole Atlas' },
                            { img: '/images/AYAT PROGRESS.jpg', label: 'Ayat Site' },
                            { img: '/images/photo_2026-03-17_17-18-09.jpg', label: 'CMC Site' },
                            { img: '/images/photo_2026-03-17_17-18-14.jpg', label: 'La Gare' },
                        ].map(({ img, label }) => (
                            <div key={label} className="group relative rounded-xl overflow-hidden h-44 cursor-pointer">
                                <Image src={img} alt={label} fill className="object-cover transition-transform duration-500 group-hover:scale-110" />
                                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors duration-300" />
                                <div className="absolute bottom-3 left-3 text-white text-sm font-medium">{label}</div>
                            </div>
                        ))}
                    </div>

                    <div className="text-center flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/construction-progress" className="btn-primary inline-flex items-center gap-2">
                            LIVE PROJECT FEEDS
                        </Link>
                        <Link href="/construction-progress" className="px-6 py-3 rounded-lg border border-border text-foreground hover:border-primary hover:text-primary transition-colors duration-200 flex items-center gap-2">
                            VIEW ALL REPORTS
                        </Link>
                    </div>
                </div>
            </section>

            {/* Founder CTA */}
            <section className="py-20 bg-accent">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
                        <div className="relative">
                            <div className="relative h-[700px] rounded-2xl overflow-hidden shadow-luxury">
                                <Image src="/images/ato gebreyes.jpg" alt="CEO Gebreyesus Igata" fill className="object-cover" />
                            </div>
                            <div className="absolute -bottom-4 -right-4 w-24 h-24 rounded-2xl bg-primary flex items-center justify-center shadow-glow">
                                <span className="text-brand-dark font-heading font-bold text-3xl">G</span>
                            </div>
                        </div>
                        <div>
                            <span className="text-primary text-sm font-semibold uppercase tracking-wider">From Our Founder</span>
                            <h2 className="section-heading mt-2 mb-4">Our commitment is your future in Ethiopia.</h2>
                            <p className="text-muted-foreground mb-6 leading-relaxed">
                                GRE&apos;s mission is to provide cutting-edge residential and commercial properties designed
                                and built specifically to meet the needs of customers, transforming their lifestyle to a
                                higher standard 21st-century lifestyle.
                            </p>
                            <p className="text-sm text-muted-foreground mb-8 font-medium">
                                — Mr. Gebreyesus Igata, Founder &amp; CEO, Gift Real Estate Ethiopia
                            </p>
                            <div className="flex flex-wrap gap-4">
                                <Link href="/contact" className="btn-primary flex items-center gap-2">
                                    BOOK YOUR SITE VISIT
                                </Link>
                                <Link href="/virtual-tour" className="px-6 py-3 rounded-lg border border-border hover:border-primary hover:text-primary transition-colors duration-200">
                                    VIRTUAL TOUR
                                </Link>
                                <Link href="/founders-message" className="px-6 py-3 rounded-lg border border-border hover:border-primary hover:text-primary transition-colors duration-200">
                                    READ FULL MESSAGE
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Diaspora Gateway */}
            <section className="py-20 bg-background">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-14">
                        <span className="text-primary text-sm font-semibold uppercase tracking-wider">International Clients</span>
                        <h2 className="section-heading mt-2 mb-4">DIASPORA GATEWAY</h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            A dedicated service tailored for international clients — invest in Ethiopia from anywhere in the world
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto mb-10">
                        {[
                            { flag: '🇺🇸', country: 'United States', phone: '+1 200 200 3000' },
                            { flag: '🇦🇪', country: 'UAE', phone: '+971 200 3000' },
                            { flag: '🇬🇧', country: 'United Kingdom', phone: '+44 200 3000' },
                            { flag: '🇨🇦', country: 'Canada', phone: '+1 800 3000' },
                        ].map(({ flag, country, phone }) => (
                            <div key={country} className="card-luxury p-6 text-center group">
                                <div className="text-4xl mb-3">{flag}</div>
                                <h3 className="font-bold text-lg font-heading mb-1">{country}</h3>
                                <p className="text-sm text-muted-foreground">{phone}</p>
                            </div>
                        ))}
                    </div>

                    <div className="max-w-3xl mx-auto text-center">
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                            {['Foreign Currency Options', 'Legal Documentation', 'Virtual Signing'].map((item) => (
                                <div key={item} className="flex items-center justify-center gap-2 text-sm font-medium text-foreground">
                                    <Check className="w-4 h-4 text-primary flex-shrink-0" />
                                    {item}
                                </div>
                            ))}
                        </div>
                        <Link href="/diaspora" className="btn-primary inline-flex items-center gap-2">
                            SCHEDULE A CONSULTATION <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="py-20 bg-brand-dark">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-14">
                        <span className="text-primary text-sm font-semibold uppercase tracking-wider">Happy Clients</span>
                        <h2 className="section-heading mt-2 mb-4 text-white">Client Testimonials</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto mb-10">
                        {testimonials.map((t) => (
                            <div key={t.name} className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-colors duration-300">
                                <div className="flex gap-1 mb-4">
                                    {Array.from({ length: 5 }).map((_, i) => (
                                        <span key={i} className="text-primary text-lg">★</span>
                                    ))}
                                </div>
                                <p className="text-white/80 text-sm leading-relaxed mb-6 italic">&ldquo;{t.quote}&rdquo;</p>
                                <div>
                                    <div className="font-semibold text-white">{t.name}</div>
                                    <div className="text-white/40 text-xs">{t.location}</div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-10">
                        {['/images/village comunity.jpg', '/images/ofiice team.jpg', '/images/b1 render.jpg', '/images/VILLA.jpg'].map((img, i) => (
                            <div key={i} className="relative h-36 rounded-xl overflow-hidden">
                                <Image src={img} alt="Community" fill className="object-cover" />
                            </div>
                        ))}
                    </div>

                    <div className="text-center">
                        <Link href="/testimonials" className="btn-primary inline-flex items-center gap-2">
                            JOIN OUR COMMUNITY <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section className="py-20 bg-background">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-14">
                        <span className="text-primary text-sm font-semibold uppercase tracking-wider">Get In Touch</span>
                        <h2 className="section-heading mt-2 mb-4">Contact Us &amp; Book a Site Visit</h2>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
                        <ContactForm />

                        <div className="space-y-6">
                            <div className="card-luxury p-6 space-y-4">
                                <h3 className="font-heading font-bold text-xl mb-4">Reach Us Directly</h3>
                                {[
                                    { Icon: Phone, text: '+251 976 133 918', href: 'tel:+251976133918', label: 'Call Us' },
                                    { Icon: Mail, text: 'info@giftrealestate.et', href: 'mailto:amanuelchuffa@gmail.com', label: 'Email Us' },
                                    { Icon: MapPin, text: 'Addis Ababa, Ethiopia', href: '#', label: 'Our Location' },
                                ].map(({ Icon, text, href, label }) => (
                                    <a key={label} href={href} className="flex items-center gap-4 group">
                                        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                                            <Icon className="w-5 h-5 text-primary" />
                                        </div>
                                        <div>
                                            <div className="text-xs text-muted-foreground">{label}</div>
                                            <div className="text-sm font-medium group-hover:text-primary transition-colors">{text}</div>
                                        </div>
                                    </a>
                                ))}
                            </div>

                            <div className="flex gap-4">
                                <a
                                    href="https://wa.me/251976133918"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex-1 flex items-center justify-center gap-2 bg-[#25D366] text-white py-3 px-4 rounded-xl font-medium hover:bg-[#1ea855] transition-colors duration-200 text-sm"
                                >
                                    <MessageCircle className="w-5 h-5" />
                                    WHATSAPP
                                </a>
                                <a
                                    href="https://t.me/giftrealestate"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex-1 flex items-center justify-center gap-2 bg-[#2481cc] text-white py-3 px-4 rounded-xl font-medium hover:bg-[#1a6ea8] transition-colors duration-200 text-sm"
                                >
                                    <Send className="w-5 h-5" />
                                    TELEGRAM
                                </a>
                            </div>

                            {/* Map placeholder */}
                            <div className="card-luxury overflow-hidden h-48 flex items-center justify-center bg-accent rounded-2xl">
                                <div className="text-center text-muted-foreground">
                                    <MapPin className="w-8 h-8 mx-auto mb-2 text-primary" />
                                    <p className="text-sm">All Gift Real Estate office locations</p>
                                    <p className="text-xs">Addis Ababa, Ethiopia</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

function ContactForm() {
    return (
        <div className="card-luxury p-8">
            <h3 className="font-heading font-bold text-xl mb-6">Send Us a Message</h3>
            <form
                action="mailto:amanuelchuffa@gmail.com"
                method="POST"
                encType="text/plain"
                className="space-y-4"
            >
                <input name="name" type="text" placeholder="Your Full Name *" required className="input-luxury" />
                <input name="phone" type="tel" placeholder="Phone Number *" required className="input-luxury" />
                <input name="email" type="email" placeholder="Email Address" className="input-luxury" />
                <input name="subject" type="text" placeholder="Subject" className="input-luxury" />
                <textarea name="message" placeholder="Your Message *" rows={4} required className="input-luxury resize-none" />
                <button type="submit" className="btn-primary w-full text-center">
                    SUBMIT INQUIRY
                </button>
            </form>
        </div>
    );
}
