import type { Metadata } from 'next';
import './globals.css';
import { Header } from '@/components/layouts/Header';
import { Footer } from '@/components/layouts/Footer';
import { FloatingChatbot } from '@/components/chatbot/FloatingChatbot';
import { AnnouncementBanner } from '@/components/AnnouncementBanner';
import { Toaster } from 'sonner';

export const metadata: Metadata = {
    title: {
        default: 'Gift Real Estate Ethiopia | Luxury Homes for Ethiopia & The Diaspora',
        template: '%s | Gift Real Estate Ethiopia',
    },
    description:
        'Gift Real Estate Ethiopia builds luxury residential communities in Addis Ababa. Premium villas and high-rise apartments designed for Ethiopians and the Diaspora.',
    keywords: ['Gift Real Estate', 'Ethiopia real estate', 'Addis Ababa homes', 'luxury apartments', 'diaspora housing'],
    openGraph: {
        type: 'website',
        locale: 'en_US',
        url: 'https://giftrealestate.et',
        siteName: 'Gift Real Estate Ethiopia',
        title: 'Gift Real Estate Ethiopia | Luxury Homes',
        description: 'Premium residential developments in Addis Ababa for Ethiopians and the Diaspora.',
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" suppressHydrationWarning>
            <head>
                <link rel="icon" href="/favicon.ico" />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link
                    href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&display=swap"
                    rel="stylesheet"
                />
            </head>
            <body className="min-h-screen bg-background font-sans">
                <Header />
                <main>{children}</main>
                <Footer />
                <FloatingChatbot />
                <Toaster position="top-right" richColors />
            </body>
        </html>
    );
}
