import { NextResponse } from 'next/server';
import { readData } from '@/lib/data';
import { verifySession } from '@/lib/auth';
import type { Announcement } from '@/app/api/announcements/route';

// Admin-only: returns all announcements including inactive
export async function GET() {
    const valid = await verifySession();
    if (!valid) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    const items = readData<Announcement[]>('announcements.json', []);
    return NextResponse.json(items.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
}
