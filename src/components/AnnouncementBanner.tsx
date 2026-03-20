'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { X, Megaphone } from 'lucide-react';

interface Announcement { id: string; title: string; body: string; type: string; pinned: boolean; cta?: { label: string; href: string }; createdAt: string; }

const TYPE_COLORS: Record<string, string> = {
    news: 'bg-blue-500/10 border-blue-500/20 text-blue-700 dark:text-blue-300',
    offer: 'bg-green-500/10 border-green-500/20 text-green-700 dark:text-green-300',
    launch: 'bg-purple-500/10 border-purple-500/20 text-purple-700 dark:text-purple-300',
    update: 'bg-amber-500/10 border-amber-500/20 text-amber-700 dark:text-amber-300',
};
const TYPE_ICONS: Record<string, string> = { news: '📰', offer: '🏷️', launch: '🚀', update: '🔔' };

export function AnnouncementBanner() {
    const [announcements, setAnnouncements] = useState<Announcement[]>([]);
    const [dismissed, setDismissed] = useState<Set<string>>(new Set());

    useEffect(() => {
        fetch('/api/announcements').then(r => r.json()).then(data => { if (Array.isArray(data)) setAnnouncements(data.slice(0, 3)); }).catch(() => { });
    }, []);

    const visible = announcements.filter(a => !dismissed.has(a.id));
    if (visible.length === 0) return null;

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-4 space-y-2 max-w-6xl">
            {visible.map((a) => (
                <div key={a.id} className={`flex items-start gap-3 p-4 rounded-xl border ${TYPE_COLORS[a.type] || 'bg-accent border-border'} relative`}>
                    <span className="text-lg flex-shrink-0">{TYPE_ICONS[a.type] || '📢'}</span>
                    <div className="flex-1 min-w-0">
                        <div className="font-semibold text-sm">{a.title}</div>
                        <p className="text-sm opacity-80 mt-0.5 line-clamp-2">{a.body}</p>
                        {a.cta && (
                            <Link href={a.cta.href} className="inline-flex items-center gap-1 text-xs font-bold mt-2 underline underline-offset-2 hover:no-underline">
                                {a.cta.label} →
                            </Link>
                        )}
                    </div>
                    <button onClick={() => setDismissed(prev => new Set([...prev, a.id]))} className="p-1 rounded-lg hover:bg-black/10 transition-colors flex-shrink-0">
                        <X className="w-3.5 h-3.5" />
                    </button>
                </div>
            ))}
        </div>
    );
}
