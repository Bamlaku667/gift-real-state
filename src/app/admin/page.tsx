import { readData } from '@/lib/data';
import type { Inquiry } from '@/app/api/contact/route';
import type { ChatMessage } from '@/app/api/chat/route';
import type { Property } from '@/app/api/admin/properties/route';
import Link from 'next/link';
import { Building2, Users, MessageSquare, TrendingUp, ArrowRight, Eye } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function AdminDashboardPage() {
    const properties = readData<Property[]>('properties.json', []);
    const inquiries = readData<Inquiry[]>('inquiries.json', []);
    const messages = readData<ChatMessage[]>('messages.json', []);

    const unreadInquiries = inquiries.filter((i) => !i.read).length;
    const unreadMessages = messages.filter((m) => !m.read).length;
    const availableProps = properties.filter((p) => p.status === 'Available').length;

    const stats = [
        { label: 'Total Properties', value: properties.length || 6, icon: Building2, color: 'text-blue-500', bg: 'bg-blue-500/10', href: '/admin/properties' },
        { label: 'New Inquiries', value: unreadInquiries, icon: Users, color: 'text-amber-500', bg: 'bg-amber-500/10', href: '/admin/inquiries' },
        { label: 'Chat Messages', value: unreadMessages, icon: MessageSquare, color: 'text-green-500', bg: 'bg-green-500/10', href: '/admin/chatbot-messages' },
        { label: 'Available Units', value: availableProps || 6, icon: TrendingUp, color: 'text-primary', bg: 'bg-primary/10', href: '/admin/properties' },
    ];

    const recentInquiries = inquiries.slice(-5).reverse();
    const recentMessages = messages.slice(-5).reverse();

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-heading font-bold mb-1">Dashboard Overview</h1>
                <p className="text-muted-foreground text-sm">Welcome back, Sales Agent. Here&apos;s what&apos;s happening today.</p>
            </div>

            {/* Stat Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map(({ label, value, icon: Icon, color, bg, href }) => (
                    <Link key={label} href={href} className="card-luxury p-5 hover:border-primary/30 transition-colors">
                        <div className="flex items-start justify-between mb-4">
                            <div className={cn('w-10 h-10 rounded-xl flex items-center justify-center', bg)}>
                                <Icon className={cn('w-5 h-5', color)} />
                            </div>
                            <ArrowRight className="w-4 h-4 text-muted-foreground" />
                        </div>
                        <div className="text-3xl font-bold font-heading mb-1">{value}</div>
                        <div className="text-sm text-muted-foreground">{label}</div>
                    </Link>
                ))}
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Inquiries */}
                <div className="card-luxury p-6">
                    <div className="flex items-center justify-between mb-5">
                        <h2 className="font-heading font-bold text-lg">Recent Inquiries</h2>
                        <Link href="/admin/inquiries" className="text-sm text-primary hover:underline flex items-center gap-1">
                            View all <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                    </div>
                    {recentInquiries.length === 0 ? (
                        <div className="text-center py-8 text-muted-foreground text-sm">No inquiries yet</div>
                    ) : (
                        <div className="space-y-3">
                            {recentInquiries.map((inq) => (
                                <div key={inq.id} className="flex items-start gap-3 p-3 rounded-xl bg-accent hover:bg-accent/70 transition-colors">
                                    <div className="w-8 h-8 rounded-full bg-amber-500/10 flex items-center justify-center flex-shrink-0">
                                        <Users className="w-4 h-4 text-amber-500" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center justify-between gap-2">
                                            <span className="font-medium text-sm truncate">{inq.name}</span>
                                            {!inq.read && <span className="w-2 h-2 bg-amber-500 rounded-full flex-shrink-0" />}
                                        </div>
                                        <p className="text-xs text-muted-foreground truncate">{inq.subject || inq.message}</p>
                                        <p className="text-xs text-muted-foreground/60 mt-0.5">{inq.phone}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Recent Chat Messages */}
                <div className="card-luxury p-6">
                    <div className="flex items-center justify-between mb-5">
                        <h2 className="font-heading font-bold text-lg">Recent Chat Messages</h2>
                        <Link href="/admin/chatbot-messages" className="text-sm text-primary hover:underline flex items-center gap-1">
                            View all <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                    </div>
                    {recentMessages.length === 0 ? (
                        <div className="text-center py-8 text-muted-foreground text-sm">No messages yet</div>
                    ) : (
                        <div className="space-y-3">
                            {recentMessages.map((msg) => (
                                <div key={msg.id} className="flex items-start gap-3 p-3 rounded-xl bg-accent hover:bg-accent/70 transition-colors">
                                    <div className="w-8 h-8 rounded-full bg-green-500/10 flex items-center justify-center flex-shrink-0">
                                        <MessageSquare className="w-4 h-4 text-green-500" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center justify-between gap-2">
                                            <span className="font-medium text-sm truncate">{msg.name}</span>
                                            {!msg.read && <span className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0" />}
                                        </div>
                                        <p className="text-xs text-muted-foreground truncate">{msg.message}</p>
                                        <p className="text-xs text-muted-foreground/60 mt-0.5">{msg.email || 'No email'}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Quick Actions */}
            <div className="card-luxury p-6">
                <h2 className="font-heading font-bold text-lg mb-4">Quick Actions</h2>
                <div className="flex flex-wrap gap-3">
                    {[
                        { label: '+ Add Property', href: '/admin/properties' },
                        { label: '📩 View Inquiries', href: '/admin/inquiries' },
                        { label: '💬 Chat Messages', href: '/admin/chatbot-messages' },
                        { label: '🏗️ Update Construction', href: '/admin/construction' },
                        { label: '⭐ Add Testimonial', href: '/admin/testimonials' },
                        { label: '🌐 View Website', href: '/' },
                    ].map(({ label, href }) => (
                        <Link
                            key={label}
                            href={href}
                            className="px-4 py-2 rounded-xl border border-border hover:border-primary hover:bg-primary/5 hover:text-primary text-sm font-medium transition-all duration-200"
                        >
                            {label}
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}

function cn(...classes: (string | boolean | undefined)[]): string {
    return classes.filter(Boolean).join(' ');
}
