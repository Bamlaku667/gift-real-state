import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { MapPin, Phone, Mail, MessageCircle, Send } from 'lucide-react';

export const metadata: Metadata = { title: 'Contact Us', description: 'Contact Gift Real Estate Ethiopia. Book a site visit or get property information.' };

export default function ContactPage() {
    return (
        <div className="min-h-screen">
            <section className="relative h-64 flex items-end pb-12 bg-brand-dark overflow-hidden">
                <Image src="/images/ofiice team.jpg" alt="Contact" fill className="object-cover opacity-50" />
                <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 pt-24">
                    <span className="text-primary text-sm font-semibold uppercase tracking-wider">Get In Touch</span>
                    <h1 className="text-4xl md:text-5xl font-bold text-white font-heading mt-2">Contact Us</h1>
                </div>
            </section>

            <section className="py-16 bg-background">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
                        {/* Contact Form */}
                        <div className="card-luxury p-8">
                            <h2 className="font-heading font-bold text-2xl mb-6">Send Us a Message</h2>
                            <form id="contact-form" className="space-y-4">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-2">Full Name *</label>
                                        <input name="name" type="text" required className="input-luxury" placeholder="Your name" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-2">Phone *</label>
                                        <input name="phone" type="tel" required className="input-luxury" placeholder="+251 ..." />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-2">Email</label>
                                    <input name="email" type="email" className="input-luxury" placeholder="your@email.com" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-2">Subject</label>
                                    <input name="subject" type="text" className="input-luxury" placeholder="e.g. Pricing for Bole Atlas" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-2">Message *</label>
                                    <textarea name="message" required rows={5} className="input-luxury resize-none" placeholder="Tell us about your requirements..." />
                                </div>
                                <button type="submit" className="btn-primary w-full py-4">
                                    SEND MESSAGE
                                </button>
                            </form>
                        </div>

                        {/* Info */}
                        <div className="space-y-6">
                            <div className="card-luxury p-8">
                                <h3 className="font-heading font-bold text-xl mb-6">Contact Information</h3>
                                <div className="space-y-5">
                                    {[
                                        { Icon: MapPin, label: 'Address', value: 'Addis Ababa, Ethiopia' },
                                        { Icon: Phone, label: 'Ethiopia', value: '+251 976 133 918', href: 'tel:+251976133918' },
                                        { Icon: Phone, label: 'US Line', value: '+1 200 200 3000', href: 'tel:+12002003000' },
                                        { Icon: Mail, label: 'Email', value: 'info@giftrealestate.et', href: 'mailto:info@giftrealestate.et' },
                                    ].map(({ Icon, label, value, href }) => (
                                        <div key={label} className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                                                <Icon className="w-5 h-5 text-primary" />
                                            </div>
                                            <div>
                                                <div className="text-xs text-muted-foreground">{label}</div>
                                                {href ? (
                                                    <a href={href} className="font-medium hover:text-primary transition-colors">{value}</a>
                                                ) : (
                                                    <div className="font-medium">{value}</div>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <a href="https://wa.me/251976133918" target="_blank" rel="noopener noreferrer"
                                    className="flex flex-col items-center gap-2 bg-[#25D366] text-white p-5 rounded-2xl hover:bg-[#1ea855] transition-colors text-center">
                                    <MessageCircle className="w-8 h-8" />
                                    <span className="font-bold text-sm">WhatsApp</span>
                                    <span className="text-xs text-white/80">+251 976 133 918</span>
                                </a>
                                <a href="https://t.me/GiftRealestateEt" target="_blank" rel="noopener noreferrer"
                                    className="flex flex-col items-center gap-2 bg-[#2481cc] text-white p-5 rounded-2xl hover:bg-[#1a6ea8] transition-colors text-center">
                                    <Send className="w-8 h-8" />
                                    <span className="font-bold text-sm">Telegram</span>
                                    <span className="text-xs text-white/80">@GiftRealestateEt</span>
                                </a>
                            </div>

                            <div className="card-luxury p-6">
                                <h3 className="font-semibold mb-3">Office Hours</h3>
                                <div className="space-y-2 text-sm">
                                    {[['Monday – Friday', '8:00 AM – 6:00 PM'], ['Saturday', '9:00 AM – 4:00 PM'], ['Sunday', 'By Appointment']].map(([day, hours]) => (
                                        <div key={day} className="flex justify-between">
                                            <span className="text-muted-foreground">{day}</span>
                                            <span className="font-medium">{hours}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
