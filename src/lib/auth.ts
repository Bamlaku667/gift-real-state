import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';

const SECRET = new TextEncoder().encode(
    process.env.NEXTAUTH_SECRET || 'gift-real-estate-super-secret-2026'
);

const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'giftrealestate2026';

export async function validateCredentials(username: string, password: string): Promise<boolean> {
    return username === ADMIN_USERNAME && password === ADMIN_PASSWORD;
}

export async function createSession(): Promise<string> {
    const token = await new SignJWT({ role: 'admin' })
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('24h')
        .sign(SECRET);
    return token;
}

export async function verifySession(): Promise<boolean> {
    try {
        const cookieStore = cookies();
        const token = cookieStore.get('admin-token')?.value;
        if (!token) return false;
        await jwtVerify(token, SECRET);
        return true;
    } catch {
        return false;
    }
}
