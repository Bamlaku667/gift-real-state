import { NextRequest, NextResponse } from 'next/server';
import { readData, writeData } from '@/lib/data';
import { verifySession } from '@/lib/auth';
import type { ChatMessage } from '@/app/api/chat/route';

export async function GET() {
    const valid = await verifySession();
    if (!valid) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    const messages = readData<ChatMessage[]>('messages.json', []);
    return NextResponse.json(messages);
}

export async function PUT(request: NextRequest) {
    const valid = await verifySession();
    if (!valid) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    const { id, read } = await request.json();
    const messages = readData<ChatMessage[]>('messages.json', []);
    const idx = messages.findIndex(m => m.id === id);
    if (idx !== -1) { messages[idx].read = read; writeData('messages.json', messages); }
    return NextResponse.json({ success: true });
}

export async function DELETE(request: NextRequest) {
    const valid = await verifySession();
    if (!valid) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    const { id } = await request.json();
    const messages = readData<ChatMessage[]>('messages.json', []);
    writeData('messages.json', messages.filter(m => m.id !== id));
    return NextResponse.json({ success: true });
}
