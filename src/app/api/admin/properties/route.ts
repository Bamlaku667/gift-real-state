import { NextRequest, NextResponse } from 'next/server';
import { readData, writeData } from '@/lib/data';
import { verifySession } from '@/lib/auth';

export interface Property {
    id: string;
    name: string;
    location: string;
    type: 'Villa' | 'Apartment' | 'Penthouse';
    bedrooms: string;
    size: string;
    price: string;
    status: 'Available' | 'Sold' | 'Reserved';
    image: string;
    description: string;
    createdAt: string;
}

const DEFAULT_PROPERTIES: Property[] = [
    { id: 'p1', name: 'Hayahulet Heights', location: 'Hayahulet', type: 'Apartment', bedrooms: '1-3 BHK', size: '71–163 sqm', price: '$180,000 – $380,000', status: 'Available', image: '/images/22.jpg', description: 'Luxury high-rise apartments with panoramic city views.', createdAt: new Date().toISOString() },
    { id: 'p2', name: 'La Gare Residences', location: 'La Gare', type: 'Apartment', bedrooms: '1-3 BHK', size: '65–163 sqm', price: '$200,000 – $420,000', status: 'Available', image: '/images/lg.jpg', description: 'Modern apartments near La Gare in the heart of Addis.', createdAt: new Date().toISOString() },
    { id: 'p3', name: 'Bole Atlas Towers', location: 'Bole Atlas', type: 'Apartment', bedrooms: '2-3 BHK', size: '134–216 sqm', price: '$250,000 – $550,000', status: 'Available', image: '/images/atlas.jpg', description: 'Premium apartments in the prestigious Bole Atlas area.', createdAt: new Date().toISOString() },
    { id: 'p4', name: 'CMC Village', location: 'CMC', type: 'Villa', bedrooms: '1-3 BHK', size: '81–200 sqm', price: '$220,000 – $480,000', status: 'Available', image: '/images/cmc front.jpg', description: 'Spacious villas in the serene CMC community.', createdAt: new Date().toISOString() },
    { id: 'p5', name: 'Ayat Community', location: 'Ayat', type: 'Apartment', bedrooms: '1-3 BHK', size: '65–153 sqm', price: '$160,000 – $340,000', status: 'Available', image: '/images/ayat 1.jpg', description: 'Contemporary living in Ayat, Addis Ababa.', createdAt: new Date().toISOString() },
    { id: 'p6', name: 'Teklehaymanot Plaza', location: 'Teklehaymanot', type: 'Apartment', bedrooms: '1-3 BHK', size: '81–174 sqm', price: '$190,000 – $400,000', status: 'Available', image: '/images/tk.jpg', description: 'High-rise luxury in historic Teklehaymanot area.', createdAt: new Date().toISOString() },
];

export async function GET() {
    const properties = readData<Property[]>('properties.json', DEFAULT_PROPERTIES);
    return NextResponse.json(properties);
}

export async function POST(request: NextRequest) {
    const valid = await verifySession();
    if (!valid) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const body = await request.json();
    const properties = readData<Property[]>('properties.json', DEFAULT_PROPERTIES);
    const newProp: Property = { ...body, id: `p-${Date.now()}`, createdAt: new Date().toISOString() };
    properties.push(newProp);
    writeData('properties.json', properties);
    return NextResponse.json(newProp, { status: 201 });
}

export async function PUT(request: NextRequest) {
    const valid = await verifySession();
    if (!valid) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const body = await request.json();
    const properties = readData<Property[]>('properties.json', DEFAULT_PROPERTIES);
    const idx = properties.findIndex((p) => p.id === body.id);
    if (idx === -1) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    properties[idx] = { ...properties[idx], ...body };
    writeData('properties.json', properties);
    return NextResponse.json(properties[idx]);
}

export async function DELETE(request: NextRequest) {
    const valid = await verifySession();
    if (!valid) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { id } = await request.json();
    const properties = readData<Property[]>('properties.json', DEFAULT_PROPERTIES);
    const filtered = properties.filter((p) => p.id !== id);
    writeData('properties.json', filtered);
    return NextResponse.json({ success: true });
}
