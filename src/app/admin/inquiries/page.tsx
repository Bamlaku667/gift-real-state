'use client';
import { useState, useEffect } from 'react';
import { Trash2, Eye, EyeOff, Phone, Mail, MessageSquare, Search } from 'lucide-react';

interface Inquiry { id: string; name: string; phone: string; email?: string; subject: string; message: string; timestamp: string; read: boolean; }

export default function InquiriesPage() {
    const [inquiries, setInquiries] = useState<Inquiry[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [selected, setSelected] = useState<Inquiry | null>(null);

    const fetch_ = async () => {
        const res = await fetch('/api/admin/inquiries');
        setInquiries(await res.json());
        setLoading(false);
    };
    useEffect(() => { fetch_(); }, []);

    const markRead = async (id: string, read: boolean) => {
        await fetch('/api/admin/inquiries', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id, read }) });
        fetch_();
    };

    const del = async (id: string) => {
        if (!confirm('Delete this inquiry?')) return;
        await fetch('/api/admin/inquiries', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }) });
        setSelected(null);
        fetch_();
    };

    const open = (inq: Inquiry) => { setSelected(inq); if (!inq.read) markRead(inq.id, true); };
    const filtered = inquiries.filter(i => i.name.toLowerCase().includes(search.toLowerCase()) || i.message.toLowerCase().includes(search.toLowerCase()));
    const unread = inquiries.filter(i => !i.read).length;

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-heading font-bold">Inquiries & Leads</h1>
                <p className="text-muted-foreground text-sm">{unread} unread · {inquiries.length} total</p>
            </div>

            <div className="relative max-w-sm">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search inquiries..." className="input-luxury pl-10" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* List */}
                <div className="card-luxury overflow-hidden">
                    <div className="p-4 border-b border-border font-semibold text-sm">All Inquiries</div>
                    <div className="divide-y divide-border max-h-[600px] overflow-y-auto">
                        {loading ? <div className="p-8 text-center text-muted-foreground text-sm">Loading...</div>
                            : filtered.length === 0 ? <div className="p-8 text-center text-muted-foreground text-sm">No inquiries yet. Contact form submissions will appear here.</div>
                                : filtered.map(inq => (
                                    <div key={inq.id} onClick={() => open(inq)} className={`p-4 cursor-pointer hover:bg-accent/50 transition-colors ${selected?.id === inq.id ? 'bg-accent' : ''}`}>
                                        <div className="flex items-start justify-between gap-2">
                                            <div className="flex items-center gap-2 min-w-0">
                                                {!inq.read && <span className="w-2 h-2 bg-primary rounded-full flex-shrink-0 mt-1" />}
                                                <div>
                                                    <div className={`text-sm ${!inq.read ? 'font-semibold' : 'font-medium'}`}>{inq.name}</div>
                                                    <div className="text-xs text-muted-foreground truncate max-w-[200px]">{inq.subject || inq.message}</div>
                                                    <div className="text-xs text-muted-foreground/60">{inq.phone}</div>
                                                </div>
                                            </div>
                                            <div className="text-xs text-muted-foreground/50 flex-shrink-0">{new Date(inq.timestamp).toLocaleDateString()}</div>
                                        </div>
                                    </div>
                                ))}
                    </div>
                </div>

                {/* Detail */}
                <div className="card-luxury p-6">
                    {!selected ? (
                        <div className="h-full flex flex-col items-center justify-center text-muted-foreground py-16">
                            <MessageSquare className="w-12 h-12 mb-3 opacity-30" />
                            <p className="text-sm">Select an inquiry to view details</p>
                        </div>
                    ) : (
                        <div className="space-y-5">
                            <div className="flex items-start justify-between">
                                <div>
                                    <h2 className="font-heading font-bold text-xl">{selected.name}</h2>
                                    <p className="text-muted-foreground text-sm">{new Date(selected.timestamp).toLocaleString()}</p>
                                </div>
                                <div className="flex gap-2">
                                    <button onClick={() => markRead(selected.id, !selected.read)} className="p-2 rounded-lg hover:bg-accent transition-colors" title={selected.read ? 'Mark unread' : 'Mark read'}>
                                        {selected.read ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                    </button>
                                    <button onClick={() => del(selected.id)} className="p-2 rounded-lg hover:bg-red-500/10 text-red-500 transition-colors">
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>

                            {selected.subject && (
                                <div className="bg-primary/10 rounded-xl p-3 text-sm font-medium text-primary">{selected.subject}</div>
                            )}

                            <div className="bg-accent rounded-xl p-4">
                                <p className="text-sm leading-relaxed whitespace-pre-wrap">{selected.message}</p>
                            </div>

                            <div className="space-y-3 pt-2">
                                <a href={`tel:${selected.phone}`} className="flex items-center gap-3 p-3 rounded-xl border border-border hover:border-primary hover:bg-primary/5 transition-colors group">
                                    <Phone className="w-4 h-4 text-primary" />
                                    <div>
                                        <div className="text-xs text-muted-foreground">Phone</div>
                                        <div className="text-sm font-medium group-hover:text-primary transition-colors">{selected.phone}</div>
                                    </div>
                                </a>
                                {selected.email && (
                                    <a href={`mailto:${selected.email}`} className="flex items-center gap-3 p-3 rounded-xl border border-border hover:border-primary hover:bg-primary/5 transition-colors group">
                                        <Mail className="w-4 h-4 text-primary" />
                                        <div>
                                            <div className="text-xs text-muted-foreground">Email</div>
                                            <div className="text-sm font-medium group-hover:text-primary transition-colors">{selected.email}</div>
                                        </div>
                                    </a>
                                )}
                                <a href={`https://wa.me/${selected.phone.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer"
                                    className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#25D366] text-white text-sm font-medium hover:bg-[#1ea855] transition-colors">
                                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M20.52 3.48A11.93 11.93 0 0 0 12 0C5.37 0 0 5.37 0 12c0 2.11.55 4.18 1.6 6L0 24l6.22-1.63A11.94 11.94 0 0 0 12 24c6.63 0 12-5.37 12-12a11.93 11.93 0 0 0-3.48-8.52z" /></svg>
                                    Reply on WhatsApp
                                </a>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
