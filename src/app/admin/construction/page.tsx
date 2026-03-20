'use client';
import { useState, useEffect } from 'react';
import { Plus, Trash2, Edit, X, Check } from 'lucide-react';

interface ConstructionUpdate { id: string; site: string; phase: string; progress: number; update: string; image: string; date: string; }
const SITES = ['Bole Atlas', 'Ayat Site', 'La Gare Site', 'CMC Site', 'Hayahulet Site', 'Teklehaymanot Site'];

export default function ConstructionAdminPage() {
    const [items, setItems] = useState<ConstructionUpdate[]>([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editing, setEditing] = useState<ConstructionUpdate | null>(null);
    const [success, setSuccess] = useState('');
    const [form, setForm] = useState({ site: SITES[0], phase: '', progress: 50, update: '', image: '', date: new Date().toISOString().split('T')[0] });

    const load = async () => {
        setLoading(true);
        const res = await fetch('/api/construction');
        setItems(await res.json());
        setLoading(false);
    };
    useEffect(() => { load(); }, []);

    const openAdd = () => { setEditing(null); setForm({ site: SITES[0], phase: '', progress: 50, update: '', image: '', date: new Date().toISOString().split('T')[0] }); setShowModal(true); };
    const openEdit = (item: ConstructionUpdate) => { setEditing(item); setForm({ site: item.site, phase: item.phase, progress: item.progress, update: item.update, image: item.image, date: item.date }); setShowModal(true); };

    const submit = async () => {
        if (editing) {
            await fetch('/api/construction', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...form, id: editing.id }) });
        } else {
            await fetch('/api/construction', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
        }
        await load();
        setShowModal(false);
        setSuccess(editing ? 'Update saved! Changes are live on the website.' : 'Update added! Now visible on the website.');
        setTimeout(() => setSuccess(''), 4000);
    };

    const del = async (id: string) => {
        if (!confirm('Delete this update?')) return;
        await fetch('/api/construction', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }) });
        load();
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                    <h1 className="text-2xl font-heading font-bold">Construction Progress</h1>
                    <p className="text-muted-foreground text-sm">Updates here appear live on the website&apos;s Construction Progress page</p>
                </div>
                <button onClick={openAdd} className="btn-primary flex items-center gap-2 text-sm"><Plus className="w-4 h-4" /> Add Update</button>
            </div>

            {success && <div className="flex items-center gap-2 bg-green-500/10 border border-green-500/20 text-green-600 rounded-xl p-3 text-sm"><Check className="w-4 h-4" /> {success}</div>}

            {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[1, 2, 3, 4].map(i => <div key={i} className="card-luxury p-6 h-40 animate-pulse bg-accent" />)}
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {items.length === 0 ? (
                        <div className="col-span-2 card-luxury p-12 text-center text-muted-foreground">
                            No construction updates yet. Click &ldquo;Add Update&rdquo; to post the first one.
                        </div>
                    ) : items.map(item => (
                        <div key={item.id} className="card-luxury p-5">
                            <div className="flex items-start justify-between mb-3">
                                <div>
                                    <h3 className="font-heading font-bold text-lg">{item.site}</h3>
                                    <p className="text-xs text-muted-foreground">{item.phase} · {item.date}</p>
                                </div>
                                <div className="flex gap-2">
                                    <button onClick={() => openEdit(item)} className="p-1.5 rounded-lg hover:bg-accent"><Edit className="w-3.5 h-3.5" /></button>
                                    <button onClick={() => del(item.id)} className="p-1.5 rounded-lg hover:bg-red-500/10 text-red-500"><Trash2 className="w-3.5 h-3.5" /></button>
                                </div>
                            </div>
                            <div className="flex items-center justify-between mb-1.5">
                                <span className="text-xs text-muted-foreground">Progress</span>
                                <span className="text-xs font-bold text-primary">{item.progress}%</span>
                            </div>
                            <div className="w-full bg-accent rounded-full h-2.5 mb-3">
                                <div className="bg-primary h-2.5 rounded-full transition-all duration-1000" style={{ width: `${item.progress}%` }} />
                            </div>
                            <p className="text-sm text-muted-foreground">{item.update}</p>
                        </div>
                    ))}
                </div>
            )}

            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
                    <div className="absolute inset-0 bg-black/60" onClick={() => setShowModal(false)} />
                    <div className="relative bg-white dark:bg-brand-charcoal rounded-2xl shadow-luxury w-full max-w-md max-h-[90vh] overflow-y-auto">
                        <div className="sticky top-0 bg-white dark:bg-brand-charcoal border-b border-border flex items-center justify-between p-5">
                            <h2 className="font-heading font-bold">{editing ? 'Edit Update' : 'Post New Update'}</h2>
                            <button onClick={() => setShowModal(false)}><X className="w-5 h-5" /></button>
                        </div>
                        <div className="p-5 space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-1.5">Site *</label>
                                <select value={form.site} onChange={e => setForm({ ...form, site: e.target.value })} className="input-luxury">
                                    {SITES.map(s => <option key={s} value={s}>{s}</option>)}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1.5">Current Phase *</label>
                                <input value={form.phase} onChange={e => setForm({ ...form, phase: e.target.value })} placeholder="e.g. Foundation & Structure" className="input-luxury" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1.5">Progress: <strong className="text-primary">{form.progress}%</strong></label>
                                <input type="range" min={0} max={100} step={5} value={form.progress} onChange={e => setForm({ ...form, progress: Number(e.target.value) })} className="w-full accent-primary cursor-pointer h-2" />
                                <div className="flex justify-between text-xs text-muted-foreground mt-1"><span>0%</span><span>50%</span><span>100%</span></div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1.5">Update Note *</label>
                                <textarea value={form.update} onChange={e => setForm({ ...form, update: e.target.value })} rows={4} className="input-luxury resize-none" placeholder="Describe the current progress and activities on site..." />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1.5">Photo (image path)</label>
                                <input value={form.image} onChange={e => setForm({ ...form, image: e.target.value })} placeholder="/images/atlas progress.jpg" className="input-luxury" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1.5">Date</label>
                                <input type="date" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} className="input-luxury" />
                            </div>
                            <div className="bg-primary/10 border border-primary/20 rounded-xl p-3 text-xs text-primary">
                                ✅ This update will immediately appear on the public Construction Progress page
                            </div>
                            <div className="flex gap-3 pt-2">
                                <button onClick={() => setShowModal(false)} className="flex-1 py-3 rounded-xl border border-border text-sm font-medium">Cancel</button>
                                <button onClick={submit} className="flex-1 btn-primary py-3 text-sm">{editing ? 'Save Changes' : 'Publish Update'}</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
