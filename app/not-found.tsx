import Link from 'next/link';
import { Search } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-6 text-center">
      <Search className="h-16 w-16 text-muted-foreground/40" />
      <h1 className="mt-6 font-display text-5xl font-extrabold">404</h1>
      <p className="mt-4 text-lg text-muted-foreground">Page not found. The URL may have changed or the page may have been removed.</p>
      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <Link href="/" className="rounded-lg bg-primary px-6 py-3 font-semibold text-white shadow transition-colors hover:bg-primary/90">Go home</Link>
        <Link href="/virtual-patrolling" className="rounded-lg border border-border px-6 py-3 font-semibold transition-colors hover:bg-muted">Virtual patrolling</Link>
        <Link href="/contact" className="rounded-lg border border-border px-6 py-3 font-semibold transition-colors hover:bg-muted">Contact us</Link>
        <Link href="/sitemap-page" className="rounded-lg border border-border px-6 py-3 font-semibold transition-colors hover:bg-muted">Sitemap</Link>
      </div>
    </div>
  );
}
