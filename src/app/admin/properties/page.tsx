'use client';

import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Search, X, Check, Building2 } from 'lucide-react';

interface Property {
    id: string;
    name: string;
    location: string;
    type: string;
    bedrooms: string;
    size: string;
    price: string;
    status: 'Available' | 'Sold' | 'Reserved';
    image: string;
    description: string;
    createdAt: string;
}

interface FormState { name: string; location: string; type: string; bedrooms: string; size: string; price: string; status: 'Available' | 'Sold' | 'Reserved'; image: string; description: string; }

const emptyForm: FormState = { name: '', location: '', type: 'Apartment', bedrooms: '', size: '', price: '', status: 'Available', image: '', description: '' };

export default function PropertiesPage() {
    const [properties, setProperties] = useState<Property[]>([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editProp, setEditProp] = useState<Property | null>(null);
    const [form, setForm] = useState<FormState>(emptyForm);
    const [search, setSearch] = useState('');
    const [saving, setSaving] = useState(false);
    const [success, setSuccess] = useState('');

    const fetchProperties = async () => {
        const res = await fetch('/api/admin/properties');
        const data = await res.json();
        setProperties(data);
        setLoading(false);
    };

    useEffect(() => { fetchProperties(); }, []);

    const openAdd = () => { setEditProp(null); setForm(emptyForm); setShowModal(true); };
    const openEdit = (p: Property) => { setEditProp(p); setForm({ name: p.name, location: p.location, type: p.type, bedrooms: p.bedrooms, size: p.size, price: p.price, status: p.status, image: p.image, description: p.description }); setShowModal(true); };

    const save = async () => {
        setSaving(true);
        if (editProp) {
            await fetch('/api/admin/properties', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...form, id: editProp.id }) });
        } else {
            await fetch('/api/admin/properties', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
        }
        await fetchProperties();
        setSaving(false);
        setShowModal(false);
        setSuccess(editProp ? 'Property updated!' : 'Property added!');
        setTimeout(() => setSuccess(''), 3000);
    };

    const deleteProp = async (id: string) => {
        if (!confirm('Delete this property?')) return;
        await fetch('/api/admin/properties', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }) });
        fetchProperties();
    };

    const filtered = properties.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()) || p.location.toLowerCase().includes(search.toLowerCase()));

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                    <h1 className="text-2xl font-heading font-bold">Properties</h1>
                    <p className="text-muted-foreground text-sm">{properties.length} properties listed</p>
                </div>
                <button onClick={openAdd} className="btn-primary flex items-center gap-2 text-sm">
                    <Plus className="w-4 h-4" /> Add Property
                </button>
            </div>

            {success && (
                <div className="flex items-center gap-2 bg-green-500/10 border border-green-500/20 text-green-600 rounded-xl p-3 text-sm">
                    <Check className="w-4 h-4" /> {success}
                </div>
            )}

            {/* Search */}
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search properties..." className="input-luxury pl-10 max-w-sm" />
            </div>

            {/* Table */}
            <div className="card-luxury overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-border bg-accent/50">
                                <th className="text-left p-4 font-semibold text-muted-foreground">Property</th>
                                <th className="text-left p-4 font-semibold text-muted-foreground hidden md:table-cell">Location</th>
                                <th className="text-left p-4 font-semibold text-muted-foreground hidden lg:table-cell">Type</th>
                                <th className="text-left p-4 font-semibold text-muted-foreground">Price</th>
                                <th className="text-left p-4 font-semibold text-muted-foreground">Status</th>
                                <th className="text-right p-4 font-semibold text-muted-foreground">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                            {loading ? (
                                <tr><td colSpan={6} className="p-8 text-center text-muted-foreground">Loading...</td></tr>
                            ) : filtered.length === 0 ? (
                                <tr><td colSpan={6} className="p-8 text-center text-muted-foreground">No properties found</td></tr>
                            ) : filtered.map((p) => (
                                <tr key={p.id} className="hover:bg-accent/30 transition-colors">
                                    <td className="p-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                                                <Building2 className="w-4 h-4 text-primary" />
                                            </div>
                                            <div>
                                                <div className="font-medium">{p.name}</div>
                                                <div className="text-xs text-muted-foreground">{p.bedrooms} · {p.size}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-4 text-muted-foreground hidden md:table-cell">{p.location}</td>
                                    <td className="p-4 text-muted-foreground hidden lg:table-cell">{p.type}</td>
                                    <td className="p-4 font-medium text-primary">{p.price}</td>
                                    <td className="p-4">
                                        <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${p.status === 'Available' ? 'bg-green-500/10 text-green-600' : p.status === 'Sold' ? 'bg-red-500/10 text-red-600' : 'bg-amber-500/10 text-amber-600'}`}>
                                            {p.status}
                                        </span>
                                    </td>
                                    <td className="p-4">
                                        <div className="flex items-center gap-2 justify-end">
                                            <button onClick={() => openEdit(p)} className="p-2 rounded-lg hover:bg-accent text-muted-foreground hover:text-primary transition-colors">
                                                <Edit className="w-4 h-4" />
                                            </button>
                                            <button onClick={() => deleteProp(p.id)} className="p-2 rounded-lg hover:bg-red-500/10 text-muted-foreground hover:text-red-500 transition-colors">
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
                    <div className="absolute inset-0 bg-black/60" onClick={() => setShowModal(false)} />
                    <div className="relative bg-white dark:bg-brand-charcoal rounded-2xl shadow-luxury w-full max-w-lg max-h-[90vh] overflow-y-auto">
                        <div className="sticky top-0 bg-white dark:bg-brand-charcoal border-b border-border flex items-center justify-between p-5 z-10">
                            <h2 className="font-heading font-bold text-lg">{editProp ? 'Edit Property' : 'Add Property'}</h2>
                            <button onClick={() => setShowModal(false)} className="p-2 rounded-lg hover:bg-accent transition-colors">
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <div className="p-5 space-y-4">
                            {[
                                { label: 'Property Name *', key: 'name', placeholder: 'e.g. Bole Atlas - Tower A' },
                                { label: 'Location *', key: 'location', placeholder: 'e.g. Bole Atlas, Addis Ababa' },
                                { label: 'Unit Sizes (Bedrooms)', key: 'bedrooms', placeholder: 'e.g. 1-3 BHK' },
                                { label: 'Size Range', key: 'size', placeholder: 'e.g. 98–163 sqm' },
                                { label: 'Starting Price *', key: 'price', placeholder: 'e.g. From $200,000' },
                                { label: 'Image Path', key: 'image', placeholder: '/images/atlas.jpg' },
                            ].map(({ label, key, placeholder }) => (
                                <div key={key}>
                                    <label className="block text-sm font-medium mb-1.5">{label}</label>
                                    <input value={(form as any)[key]} onChange={(e) => setForm({ ...form, [key]: e.target.value })} placeholder={placeholder} className="input-luxury" />
                                </div>
                            ))}
                            <div>
                                <label className="block text-sm font-medium mb-1.5">Type</label>
                                <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })} className="input-luxury">
                                    {['Apartment', 'Villa', 'Penthouse'].map((t) => <option key={t} value={t}>{t}</option>)}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1.5">Status</label>
                                <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value as any })} className="input-luxury">
                                    {['Available', 'Sold', 'Reserved'].map((s) => <option key={s} value={s}>{s}</option>)}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1.5">Description</label>
                                <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3} className="input-luxury resize-none" placeholder="Short description..." />
                            </div>
                            <div className="flex gap-3 pt-2">
                                <button onClick={() => setShowModal(false)} className="flex-1 py-3 rounded-xl border border-border hover:bg-accent transition-colors text-sm font-medium">Cancel</button>
                                <button onClick={save} disabled={saving} className="flex-1 btn-primary py-3 text-sm">
                                    {saving ? 'Saving...' : editProp ? 'Save Changes' : 'Add Property'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
