import { redirect } from 'next/navigation';
import { verifySession } from '@/lib/auth';
import { AdminLayoutClient } from './AdminLayoutClient';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
    const isValid = await verifySession();
    if (!isValid) redirect('/admin/login');
    return <AdminLayoutClient>{children}</AdminLayoutClient>;
}
