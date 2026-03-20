'use client';
import { useState, useEffect } from 'react';
import { Trash2, Search, MessageSquare, Mail } from 'lucide-react';

interface ChatMessage { id: string; name: string; email: string; message: string; timestamp: string; read: boolean; }

export default function ChatbotMessagesPage() {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [selected, setSelected] = useState<ChatMessage | null>(null);

    const fetch_ = async () => {
        const res = await fetch('/api/admin/messages');
        setMessages(await res.json());
        setLoading(false);
    };
    useEffect(() => { fetch_(); }, []);

    const markRead = async (id: string) => {
        await fetch('/api/admin/messages', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id, read: true }) });
        fetch_();
    };

    const del = async (id: string) => {
        if (!confirm('Delete this message?')) return;
        await fetch('/api/admin/messages', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }) });
        setSelected(null);
        fetch_();
    };

    const open = (m: ChatMessage) => { setSelected(m); if (!m.read) markRead(m.id); };
    const filtered = messages.filter(m => m.name.toLowerCase().includes(search.toLowerCase()) || m.message.toLowerCase().includes(search.toLowerCase()));
    const unread = messages.filter(m => !m.read).length;

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-heading font-bold">Chatbot Messages</h1>
                <p className="text-muted-foreground text-sm">{unread} unread · {messages.length} total messages from website chatbot</p>
            </div>

            <div className="relative max-w-sm">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search messages..." className="input-luxury pl-10" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="card-luxury overflow-hidden">
                    <div className="p-4 border-b border-border font-semibold text-sm">All Chat Messages</div>
                    <div className="divide-y divide-border max-h-[600px] overflow-y-auto">
                        {loading ? <div className="p-8 text-center text-muted-foreground text-sm">Loading...</div>
                            : filtered.length === 0 ? (
                                <div className="p-8 text-center text-muted-foreground text-sm flex flex-col items-center gap-3">
                                    <MessageSquare className="w-10 h-10 opacity-20" />
                                    No chat messages yet. Messages from the chatbot will appear here.
                                </div>
                            ) : filtered.map(msg => (
                                <div key={msg.id} onClick={() => open(msg)} className={`p-4 cursor-pointer hover:bg-accent/50 transition-colors ${selected?.id === msg.id ? 'bg-accent' : ''}`}>
                                    <div className="flex items-start justify-between gap-2">
                                        <div className="flex items-center gap-2 min-w-0">
                                            {!msg.read && <span className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0 mt-1" />}
                                            <div className="min-w-0">
                                                <div className={`text-sm ${!msg.read ? 'font-semibold' : 'font-medium'}`}>{msg.name}</div>
                                                <div className="text-xs text-muted-foreground truncate max-w-[200px]">{msg.message}</div>
                                                <div className="text-xs text-muted-foreground/60">{msg.email || 'No email'}</div>
                                            </div>
                                        </div>
                                        <div className="text-xs text-muted-foreground/50 flex-shrink-0">{new Date(msg.timestamp).toLocaleDateString()}</div>
                                    </div>
                                </div>
                            ))}
                    </div>
                </div>

                <div className="card-luxury p-6">
                    {!selected ? (
                        <div className="h-full flex flex-col items-center justify-center text-muted-foreground py-16">
                            <MessageSquare className="w-12 h-12 mb-3 opacity-30" />
                            <p className="text-sm">Select a message to view details</p>
                        </div>
                    ) : (
                        <div className="space-y-5">
                            <div className="flex items-start justify-between">
                                <div>
                                    <h2 className="font-heading font-bold text-xl">{selected.name}</h2>
                                    <p className="text-muted-foreground text-sm">{new Date(selected.timestamp).toLocaleString()}</p>
                                </div>
                                <button onClick={() => del(selected.id)} className="p-2 rounded-lg hover:bg-red-500/10 text-red-500 transition-colors">
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>

                            <div className="bg-accent rounded-xl p-4">
                                <p className="text-sm leading-relaxed whitespace-pre-wrap">{selected.message}</p>
                            </div>

                            {selected.email && (
                                <a href={`mailto:${selected.email}`} className="flex items-center gap-3 p-3 rounded-xl border border-border hover:border-primary hover:bg-primary/5 transition-colors group">
                                    <Mail className="w-4 h-4 text-primary" />
                                    <div>
                                        <div className="text-xs text-muted-foreground">Reply by Email</div>
                                        <div className="text-sm font-medium group-hover:text-primary transition-colors">{selected.email}</div>
                                    </div>
                                </a>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
