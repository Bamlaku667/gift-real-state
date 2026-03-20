import { NextRequest, NextResponse } from 'next/server';
import { readData } from '@/lib/data';
import { verifySession } from '@/lib/auth';
import type { Testimonial } from '@/app/api/testimonials/route';

const DEFAULTS: Testimonial[] = [
    { id: 't1', name: 'Abebe Girma', location: 'Washington DC, USA', property: 'Bole Atlas - 3BHK', rating: 5, quote: 'Gift Real Estate made my dream of owning a home in Ethiopia a reality.', approved: true, createdAt: new Date().toISOString() },
    { id: 't2', name: 'Tigist Haile', location: 'Dubai, UAE', property: 'La Gare - 2BHK', rating: 5, quote: 'The quality of construction and attention to detail is unmatched.', approved: true, createdAt: new Date().toISOString() },
    { id: 't3', name: 'Solomon Bekele', location: 'Addis Ababa', property: 'Bole Atlas - 2BHK', rating: 5, quote: 'From the virtual tour to handover, the experience was seamless.', approved: true, createdAt: new Date().toISOString() },
];

// Admin-only route that returns ALL testimonials including unapproved
export async function GET() {
    const valid = await verifySession();
    if (!valid) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    const items = readData<Testimonial[]>('testimonials.json', DEFAULTS);
    return NextResponse.json(items);
}
