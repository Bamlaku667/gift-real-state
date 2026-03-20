'use client';
import { useState, useEffect } from 'react';
import { Plus, Trash2, Edit, X, Check, Star, Eye, EyeOff } from 'lucide-react';

interface Testimonial { id: string; name: string; location: string; property: string; rating: number; quote: string; approved: boolean; createdAt: string; }

export default function TestimonialsAdminPage() {
    const [items, setItems] = useState<Testimonial[]>([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editing, setEditing] = useState<Testimonial | null>(null);
    const [success, setSuccess] = useState('');
    const [form, setForm] = useState({ name: '', location: '', property: '', rating: 5, quote: '', approved: true });

    const load = async () => {
        setLoading(true);
        // Admin fetches ALL testimonials including unapproved
        const res = await fetch('/api/testimonials/all');
        const data = await res.json();
        setItems(Array.isArray(data) ? data : []);
        setLoading(false);
    };
    useEffect(() => { load(); }, []);

    const openAdd = () => { setEditing(null); setForm({ name: '', location: '', property: '', rating: 5, quote: '', approved: true }); setShowModal(true); };
    const openEdit = (t: Testimonial) => { setEditing(t); setForm({ name: t.name, location: t.location, property: t.property, rating: t.rating, quote: t.quote, approved: t.approved }); setShowModal(true); };

    const submit = async () => {
        if (editing) {
            await fetch('/api/testimonials', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...form, id: editing.id }) });
        } else {
            await fetch('/api/testimonials', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
        }
        await load();
        setShowModal(false);
        setSuccess(form.approved ? 'Testimonial published live on website!' : 'Testimonial saved (hidden from public).');
        setTimeout(() => setSuccess(''), 4000);
    };

    const toggleApprove = async (t: Testimonial) => {
        await fetch('/api/testimonials', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: t.id, approved: !t.approved }) });
        load();
    };

    const del = async (id: string) => {
        if (!confirm('Delete this testimonial?')) return;
        await fetch('/api/testimonials', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }) });
        load();
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                    <h1 className="text-2xl font-heading font-bold">Testimonials</h1>
                    <p className="text-muted-foreground text-sm">Approved testimonials appear live on the website</p>
                </div>
                <button onClick={openAdd} className="btn-primary flex items-center gap-2 text-sm"><Plus className="w-4 h-4" /> Add Testimonial</button>
            </div>

            {success && <div className="flex items-center gap-2 bg-green-500/10 border border-green-500/20 text-green-600 rounded-xl p-3 text-sm"><Check className="w-4 h-4" /> {success}</div>}

            {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                    {[1, 2, 3].map(i => <div key={i} className="card-luxury p-6 h-48 animate-pulse bg-accent" />)}
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                    {items.length === 0 ? (
                        <div className="col-span-3 card-luxury p-12 text-center text-muted-foreground">No testimonials yet.</div>
                    ) : items.map(t => (
                        <div key={t.id} className={`card-luxury p-6 ${!t.approved ? 'opacity-60 border-dashed' : ''}`}>
                            <div className="flex items-start justify-between mb-3">
                                <div className="flex gap-0.5">{Array.from({ length: t.rating }).map((_, i) => <Star key={i} className="w-4 h-4 text-primary fill-primary" />)}</div>
                                <div className="flex gap-1.5">
                                    <button onClick={() => toggleApprove(t)} title={t.approved ? 'Hide from website' : 'Show on website'} className={`p-1.5 rounded-lg transition-colors ${t.approved ? 'text-green-600 hover:bg-green-500/10' : 'text-muted-foreground hover:bg-accent'}`}>
                                        {t.approved ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                                    </button>
                                    <button onClick={() => openEdit(t)} className="p-1.5 rounded-lg hover:bg-accent"><Edit className="w-3.5 h-3.5" /></button>
                                    <button onClick={() => del(t.id)} className="p-1.5 rounded-lg hover:bg-red-500/10 text-red-500"><Trash2 className="w-3.5 h-3.5" /></button>
                                </div>
                            </div>
                            <p className="text-sm text-muted-foreground italic mb-4 line-clamp-3">&ldquo;{t.quote}&rdquo;</p>
                            <div className="flex items-center justify-between">
                                <div>
                                    <div className="font-semibold text-sm">{t.name}</div>
                                    <div className="text-xs text-muted-foreground">{t.location}</div>
                                    <div className="text-xs text-primary mt-0.5">{t.property}</div>
                                </div>
                                <span className={`text-xs px-2 py-1 rounded-full font-medium ${t.approved ? 'bg-green-500/10 text-green-600' : 'bg-accent text-muted-foreground'}`}>
                                    {t.approved ? '● Live' : '○ Hidden'}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
                    <div className="absolute inset-0 bg-black/60" onClick={() => setShowModal(false)} />
                    <div className="relative bg-white dark:bg-brand-charcoal rounded-2xl shadow-luxury w-full max-w-md max-h-[90vh] overflow-y-auto">
                        <div className="sticky top-0 bg-white dark:bg-brand-charcoal border-b border-border flex items-center justify-between p-5">
                            <h2 className="font-heading font-bold">{editing ? 'Edit Testimonial' : 'Add Testimonial'}</h2>
                            <button onClick={() => setShowModal(false)}><X className="w-5 h-5" /></button>
                        </div>
                        <div className="p-5 space-y-4">
                            <div><label className="block text-sm font-medium mb-1.5">Client Name *</label><input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="e.g. Abebe Girma" className="input-luxury" /></div>
                            <div><label className="block text-sm font-medium mb-1.5">Location</label><input value={form.location} onChange={e => setForm({ ...form, location: e.target.value })} placeholder="e.g. Washington DC, USA" className="input-luxury" /></div>
                            <div><label className="block text-sm font-medium mb-1.5">Property Purchased</label><input value={form.property} onChange={e => setForm({ ...form, property: e.target.value })} placeholder="e.g. Bole Atlas - 3BHK" className="input-luxury" /></div>
                            <div>
                                <label className="block text-sm font-medium mb-1.5">Rating: <strong>{form.rating}/5 ⭐</strong></label>
                                <input type="range" min={1} max={5} value={form.rating} onChange={e => setForm({ ...form, rating: Number(e.target.value) })} className="w-full accent-primary cursor-pointer" />
                            </div>
                            <div><label className="block text-sm font-medium mb-1.5">Quote *</label><textarea value={form.quote} onChange={e => setForm({ ...form, quote: e.target.value })} rows={4} className="input-luxury resize-none" placeholder="Client's testimonial..." /></div>
                            <label className="flex items-center gap-3 cursor-pointer">
                                <div onClick={() => setForm({ ...form, approved: !form.approved })} className={`w-11 h-6 rounded-full transition-colors ${form.approved ? 'bg-primary' : 'bg-muted'} relative`}>
                                    <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${form.approved ? 'translate-x-6' : 'translate-x-1'}`} />
                                </div>
                                <span className="text-sm font-medium">{form.approved ? 'Publish live on website' : 'Save as hidden'}</span>
                            </label>
                            <div className="flex gap-3 pt-2">
                                <button onClick={() => setShowModal(false)} className="flex-1 py-3 rounded-xl border border-border text-sm font-medium">Cancel</button>
                                <button onClick={submit} className="flex-1 btn-primary py-3 text-sm">{editing ? 'Save Changes' : 'Add Testimonial'}</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
