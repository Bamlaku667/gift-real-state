import { NextRequest, NextResponse } from 'next/server';
import { readData, writeData } from '@/lib/data';
import { verifySession } from '@/lib/auth';

export interface Announcement {
    id: string;
    title: string;
    body: string;
    type: 'news' | 'offer' | 'launch' | 'update';
    pinned: boolean;
    active: boolean;
    image?: string;
    cta?: { label: string; href: string };
    createdAt: string;
}

export async function GET() {
    const items = readData<Announcement[]>('announcements.json', []);
    return NextResponse.json(items.filter((a) => a.active).sort((a, b) => (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0)));
}

export async function POST(request: NextRequest) {
    const valid = await verifySession();
    if (!valid) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    const body = await request.json();
    const items = readData<Announcement[]>('announcements.json', []);
    const newItem: Announcement = { id: `ann-${Date.now()}`, active: true, createdAt: new Date().toISOString(), ...body };
    items.unshift(newItem);
    writeData('announcements.json', items);
    return NextResponse.json(newItem, { status: 201 });
}

export async function PUT(request: NextRequest) {
    const valid = await verifySession();
    if (!valid) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    const body = await request.json();
    const items = readData<Announcement[]>('announcements.json', []);
    const idx = items.findIndex((i) => i.id === body.id);
    if (idx === -1) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    items[idx] = { ...items[idx], ...body };
    writeData('announcements.json', items);
    return NextResponse.json(items[idx]);
}

export async function DELETE(request: NextRequest) {
    const valid = await verifySession();
    if (!valid) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    const { id } = await request.json();
    const items = readData<Announcement[]>('announcements.json', []);
    writeData('announcements.json', items.filter((i) => i.id !== id));
    return NextResponse.json({ success: true });
}
