import { NextRequest, NextResponse } from 'next/server';
import { readData, writeData } from '@/lib/data';
import { verifySession } from '@/lib/auth';

export interface Testimonial {
    id: string;
    name: string;
    location: string;
    property: string;
    rating: number;
    quote: string;
    approved: boolean;
    createdAt: string;
}

const DEFAULTS: Testimonial[] = [
    { id: 't1', name: 'Abebe Girma', location: 'Washington DC, USA', property: 'Bole Atlas - 3BHK', rating: 5, quote: 'Gift Real Estate made my dream of owning a home in Ethiopia a reality. The diaspora support team was exceptional throughout the entire process.', approved: true, createdAt: new Date().toISOString() },
    { id: 't2', name: 'Tigist Haile', location: 'Dubai, UAE', property: 'La Gare - 2BHK', rating: 5, quote: 'The quality of construction and attention to detail is unmatched. I purchased remotely and the team guided me every step of the way.', approved: true, createdAt: new Date().toISOString() },
    { id: 't3', name: 'Solomon Bekele', location: 'Addis Ababa', property: 'Bole Atlas - 2BHK', rating: 5, quote: 'From the virtual tour to handover, the experience was seamless. My new home exceeds all expectations.', approved: true, createdAt: new Date().toISOString() },
];

export async function GET() {
    const items = readData<Testimonial[]>('testimonials.json', DEFAULTS);
    // Public API only returns approved testimonials
    return NextResponse.json(items.filter((t) => t.approved));
}

export async function POST(request: NextRequest) {
    const valid = await verifySession();
    if (!valid) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    const body = await request.json();
    const items = readData<Testimonial[]>('testimonials.json', DEFAULTS);
    const newItem: Testimonial = { id: `t-${Date.now()}`, ...body, createdAt: new Date().toISOString() };
    items.push(newItem);
    writeData('testimonials.json', items);
    return NextResponse.json(newItem, { status: 201 });
}

export async function PUT(request: NextRequest) {
    const valid = await verifySession();
    if (!valid) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    const body = await request.json();
    const items = readData<Testimonial[]>('testimonials.json', DEFAULTS);
    const idx = items.findIndex((i) => i.id === body.id);
    if (idx === -1) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    items[idx] = { ...items[idx], ...body };
    writeData('testimonials.json', items);
    return NextResponse.json(items[idx]);
}

export async function DELETE(request: NextRequest) {
    const valid = await verifySession();
    if (!valid) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    const { id } = await request.json();
    const items = readData<Testimonial[]>('testimonials.json', DEFAULTS);
    writeData('testimonials.json', items.filter((i) => i.id !== id));
    return NextResponse.json({ success: true });
}
