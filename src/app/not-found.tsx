import Link from 'next/link';

export default function NotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-background">
            <div className="text-center px-4">
                <div className="text-8xl font-heading font-bold gradient-text mb-4">404</div>
                <h1 className="text-2xl font-heading font-bold mb-3">Page Not Found</h1>
                <p className="text-muted-foreground mb-8 max-w-md mx-auto">The page you are looking for doesn&apos;t exist or has been moved.</p>
                <Link href="/" className="btn-primary inline-flex items-center gap-2">Return Home</Link>
            </div>
        </div>
    );
}
