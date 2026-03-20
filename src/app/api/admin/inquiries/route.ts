import { NextRequest, NextResponse } from 'next/server';
import { readData, writeData } from '@/lib/data';
import { verifySession } from '@/lib/auth';
import type { Inquiry } from '@/app/api/contact/route';

export async function GET() {
    const valid = await verifySession();
    if (!valid) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const inquiries = readData<Inquiry[]>('inquiries.json', []);
    return NextResponse.json(inquiries);
}

export async function PUT(request: NextRequest) {
    const valid = await verifySession();
    if (!valid) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { id, read } = await request.json();
    const inquiries = readData<Inquiry[]>('inquiries.json', []);
    const idx = inquiries.findIndex(i => i.id === id);
    if (idx !== -1) {
        inquiries[idx].read = read;
        writeData('inquiries.json', inquiries);
    }
    return NextResponse.json({ success: true });
}

export async function DELETE(request: NextRequest) {
    const valid = await verifySession();
    if (!valid) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { id } = await request.json();
    const inquiries = readData<Inquiry[]>('inquiries.json', []);
    const filtered = inquiries.filter(i => i.id !== id);
    writeData('inquiries.json', filtered);
    return NextResponse.json({ success: true });
}
