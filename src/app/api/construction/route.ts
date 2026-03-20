import { NextRequest, NextResponse } from 'next/server';
import { readData, writeData } from '@/lib/data';
import { verifySession } from '@/lib/auth';

export interface ConstructionUpdate {
    id: string;
    site: string;
    phase: string;
    progress: number;
    update: string;
    image: string;
    date: string;
}

const DEFAULTS: ConstructionUpdate[] = [
    { id: 'c1', site: 'Bole Atlas', phase: 'Foundation & Structure', progress: 65, update: 'Floors 1–12 completed. Structural works ongoing on upper floors.', image: '/images/atlas progress.jpg', date: '2026-03-17' },
    { id: 'c2', site: 'Ayat Site', phase: 'Foundation Work', progress: 45, update: 'Foundation work 90% complete. Column work currently in progress.', image: '/images/AYAT PROGRESS.jpg', date: '2026-03-17' },
    { id: 'c3', site: 'La Gare Site', phase: 'Phase 2 Construction', progress: 30, update: 'Phase 2 construction commenced. Site preparation and excavation active.', image: '/images/lg 2phase.jpg', date: '2026-03-17' },
    { id: 'c4', site: 'CMC Site', phase: 'Interior & Finishing', progress: 80, update: 'Interior finishing works and MEP systems installation underway.', image: '/images/cmc front.jpg', date: '2026-03-17' },
];

export async function GET() {
    const items = readData<ConstructionUpdate[]>('construction.json', DEFAULTS);
    return NextResponse.json(items);
}

export async function POST(request: NextRequest) {
    const valid = await verifySession();
    if (!valid) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    const body = await request.json();
    const items = readData<ConstructionUpdate[]>('construction.json', DEFAULTS);
    const newItem: ConstructionUpdate = { id: `con-${Date.now()}`, ...body };
    items.push(newItem);
    writeData('construction.json', items);
    return NextResponse.json(newItem, { status: 201 });
}

export async function PUT(request: NextRequest) {
    const valid = await verifySession();
    if (!valid) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    const body = await request.json();
    const items = readData<ConstructionUpdate[]>('construction.json', DEFAULTS);
    const idx = items.findIndex((i) => i.id === body.id);
    if (idx === -1) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    items[idx] = { ...items[idx], ...body };
    writeData('construction.json', items);
    return NextResponse.json(items[idx]);
}

export async function DELETE(request: NextRequest) {
    const valid = await verifySession();
    if (!valid) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    const { id } = await request.json();
    const items = readData<ConstructionUpdate[]>('construction.json', DEFAULTS);
    writeData('construction.json', items.filter((i) => i.id !== id));
    return NextResponse.json({ success: true });
}
