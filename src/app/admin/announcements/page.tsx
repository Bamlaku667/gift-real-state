'use client';
import { useState, useEffect } from 'react';
import { Plus, Trash2, Edit, X, Check, Pin, Eye, EyeOff, Megaphone } from 'lucide-react';

type AnnouncementType = 'news' | 'offer' | 'launch' | 'update';
interface Announcement { id: string; title: string; body: string; type: AnnouncementType; pinned: boolean; active: boolean; image?: string; cta?: { label: string; href: string }; createdAt: string; }
interface FormState { title: string; body: string; type: AnnouncementType; pinned: boolean; active: boolean; image: string; ctaLabel: string; ctaHref: string; }


const TYPE_OPTIONS = [
    { value: 'news', label: '📰 News', color: 'bg-blue-500/10 text-blue-600' },
    { value: 'offer', label: '🏷️ Special Offer', color: 'bg-green-500/10 text-green-600' },
    { value: 'launch', label: '🚀 New Launch', color: 'bg-purple-500/10 text-purple-600' },
    { value: 'update', label: '🔔 Update', color: 'bg-amber-500/10 text-amber-600' },
];

export default function AnnouncementsAdminPage() {
    const [items, setItems] = useState<Announcement[]>([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editing, setEditing] = useState<Announcement | null>(null);
    const [success, setSuccess] = useState('');
    const [form, setForm] = useState<FormState>({ title: '', body: '', type: 'news', pinned: false, active: true, image: '', ctaLabel: '', ctaHref: '' });

    const load = async () => {
        setLoading(true);
        // Fetch all including inactive
        const res = await fetch('/api/announcements/all');
        const data = await res.json();
        setItems(Array.isArray(data) ? data : []);
        setLoading(false);
    };
    useEffect(() => { load(); }, []);

    const openAdd = () => { setEditing(null); setForm({ title: '', body: '', type: 'news', pinned: false, active: true, image: '', ctaLabel: '', ctaHref: '' }); setShowModal(true); };
    const openEdit = (a: Announcement) => { setEditing(a); setForm({ title: a.title, body: a.body, type: a.type, pinned: a.pinned, active: a.active, image: a.image || '', ctaLabel: a.cta?.label || '', ctaHref: a.cta?.href || '' }); setShowModal(true); };

    const submit = async () => {
        const payload = { ...form, cta: form.ctaLabel ? { label: form.ctaLabel, href: form.ctaHref } : undefined };
        if (editing) {
            await fetch('/api/announcements', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...payload, id: editing.id }) });
        } else {
            await fetch('/api/announcements', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
        }
        await load();
        setShowModal(false);
        setSuccess(form.active ? '✅ Announcement is live on the website!' : '📋 Saved as draft (hidden from public).');
        setTimeout(() => setSuccess(''), 5000);
    };

    const toggleActive = async (a: Announcement) => {
        await fetch('/api/announcements', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: a.id, active: !a.active }) });
        load();
    };
    const togglePin = async (a: Announcement) => {
        await fetch('/api/announcements', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: a.id, pinned: !a.pinned }) });
        load();
    };
    const del = async (id: string) => { if (!confirm('Delete this announcement?')) return; await fetch('/api/announcements', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }) }); load(); };

    const getTypeStyle = (type: string) => TYPE_OPTIONS.find(t => t.value === type)?.color || 'bg-accent text-muted-foreground';
    const getTypeLabel = (type: string) => TYPE_OPTIONS.find(t => t.value === type)?.label || type;

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                    <h1 className="text-2xl font-heading font-bold">Announcements & Posts</h1>
                    <p className="text-muted-foreground text-sm">Active announcements appear on the website homepage and projects page</p>
                </div>
                <button onClick={openAdd} className="btn-primary flex items-center gap-2 text-sm"><Plus className="w-4 h-4" /> New Announcement</button>
            </div>

            {success && <div className="flex items-center gap-2 bg-green-500/10 border border-green-500/20 text-green-600 rounded-xl p-3 text-sm"><Check className="w-4 h-4" /> {success}</div>}

            {/* Info banner */}
            <div className="bg-primary/10 border border-primary/20 rounded-xl p-4 flex items-start gap-3">
                <Megaphone className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div className="text-sm text-foreground">
                    <strong>How it works:</strong> Post announcements here and they appear as a banner/card on the public website. Use <em>Pinned</em> to keep important posts at the top. Toggle <em>Active</em> to show/hide without deleting.
                </div>
            </div>

            {loading ? (
                <div className="space-y-3">{[1, 2, 3].map(i => <div key={i} className="card-luxury p-6 h-28 animate-pulse bg-accent" />)}</div>
            ) : items.length === 0 ? (
                <div className="card-luxury p-12 text-center text-muted-foreground">
                    <Megaphone className="w-12 h-12 mx-auto mb-3 opacity-20" />
                    No announcements yet. Click &ldquo;New Announcement&rdquo; to post something on the website.
                </div>
            ) : (
                <div className="space-y-3">
                    {items.map(a => (
                        <div key={a.id} className={`card-luxury p-5 flex items-start gap-4 ${!a.active ? 'opacity-60' : ''}`}>
                            <div className="flex-1 min-w-0">
                                <div className="flex flex-wrap items-center gap-2 mb-2">
                                    {a.pinned && <span className="text-xs bg-primary/20 text-primary px-2 py-0.5 rounded-full font-medium flex items-center gap-1"><Pin className="w-3 h-3" /> Pinned</span>}
                                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${getTypeStyle(a.type)}`}>{getTypeLabel(a.type)}</span>
                                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ml-auto ${a.active ? 'bg-green-500/10 text-green-600' : 'bg-accent text-muted-foreground'}`}>
                                        {a.active ? '● Live' : '○ Draft'}
                                    </span>
                                </div>
                                <h3 className="font-semibold text-base mb-1">{a.title}</h3>
                                <p className="text-sm text-muted-foreground line-clamp-2">{a.body}</p>
                                {a.cta && <div className="text-xs text-primary mt-1.5">CTA: {a.cta.label} → {a.cta.href}</div>}
                                <div className="text-xs text-muted-foreground/50 mt-1">{new Date(a.createdAt).toLocaleDateString()}</div>
                            </div>
                            <div className="flex flex-col gap-1.5 flex-shrink-0">
                                <button onClick={() => toggleActive(a)} title={a.active ? 'Hide' : 'Publish'} className="p-2 rounded-lg hover:bg-accent transition-colors text-muted-foreground">
                                    {a.active ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                                <button onClick={() => togglePin(a)} title={a.pinned ? 'Unpin' : 'Pin to top'} className={`p-2 rounded-lg hover:bg-accent transition-colors ${a.pinned ? 'text-primary' : 'text-muted-foreground'}`}>
                                    <Pin className="w-4 h-4" />
                                </button>
                                <button onClick={() => openEdit(a)} className="p-2 rounded-lg hover:bg-accent text-muted-foreground"><Edit className="w-4 h-4" /></button>
                                <button onClick={() => del(a.id)} className="p-2 rounded-lg hover:bg-red-500/10 text-red-500"><Trash2 className="w-4 h-4" /></button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
                    <div className="absolute inset-0 bg-black/60" onClick={() => setShowModal(false)} />
                    <div className="relative bg-white dark:bg-brand-charcoal rounded-2xl shadow-luxury w-full max-w-lg max-h-[90vh] overflow-y-auto">
                        <div className="sticky top-0 bg-white dark:bg-brand-charcoal border-b border-border flex items-center justify-between p-5">
                            <h2 className="font-heading font-bold">{editing ? 'Edit Announcement' : 'New Announcement'}</h2>
                            <button onClick={() => setShowModal(false)}><X className="w-5 h-5" /></button>
                        </div>
                        <div className="p-5 space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-1.5">Type</label>
                                <div className="grid grid-cols-2 gap-2">
                                    {TYPE_OPTIONS.map(opt => (
                                        <button key={opt.value} onClick={() => setForm({ ...form, type: opt.value as any })}
                                            className={`p-2.5 rounded-xl border text-sm font-medium transition-all ${form.type === opt.value ? 'border-primary bg-primary/10 text-primary' : 'border-border hover:border-primary/50'}`}>
                                            {opt.label}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div><label className="block text-sm font-medium mb-1.5">Title *</label><input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} placeholder="e.g. Grand Opening — Bole Atlas Tower A" className="input-luxury" /></div>
                            <div><label className="block text-sm font-medium mb-1.5">Message *</label><textarea value={form.body} onChange={e => setForm({ ...form, body: e.target.value })} rows={4} className="input-luxury resize-none" placeholder="Full announcement text..." /></div>
                            <div><label className="block text-sm font-medium mb-1.5">Image (optional)</label><input value={form.image} onChange={e => setForm({ ...form, image: e.target.value })} placeholder="/images/atlas.jpg" className="input-luxury" /></div>
                            <div className="grid grid-cols-2 gap-3">
                                <div><label className="block text-sm font-medium mb-1.5">CTA Button Label</label><input value={form.ctaLabel} onChange={e => setForm({ ...form, ctaLabel: e.target.value })} placeholder="e.g. View Prices" className="input-luxury" /></div>
                                <div><label className="block text-sm font-medium mb-1.5">CTA Link</label><input value={form.ctaHref} onChange={e => setForm({ ...form, ctaHref: e.target.value })} placeholder="/projects" className="input-luxury" /></div>
                            </div>
                            <div className="flex gap-6">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <div onClick={() => setForm({ ...form, pinned: !form.pinned })} className={`w-10 h-5 rounded-full transition-colors relative ${form.pinned ? 'bg-primary' : 'bg-muted'}`}>
                                        <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${form.pinned ? 'translate-x-5' : 'translate-x-0.5'}`} />
                                    </div>
                                    <span className="text-sm">Pin to top</span>
                                </label>
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <div onClick={() => setForm({ ...form, active: !form.active })} className={`w-10 h-5 rounded-full transition-colors relative ${form.active ? 'bg-green-500' : 'bg-muted'}`}>
                                        <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${form.active ? 'translate-x-5' : 'translate-x-0.5'}`} />
                                    </div>
                                    <span className="text-sm">{form.active ? 'Publish live' : 'Save as draft'}</span>
                                </label>
                            </div>
                            <div className="flex gap-3 pt-2">
                                <button onClick={() => setShowModal(false)} className="flex-1 py-3 rounded-xl border border-border text-sm font-medium">Cancel</button>
                                <button onClick={submit} className="flex-1 btn-primary py-3 text-sm">{editing ? 'Save Changes' : 'Publish'}</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
