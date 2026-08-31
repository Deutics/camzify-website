import { generatePageMeta } from '@/lib/page-utils';
import { PageShell } from '@/components/layout/page-shell';
import { ScrollReveal } from '@/components/motion/scroll-reveal';
import { PlaceholderVisual } from '@/components/content/placeholder-visual';
import Link from 'next/link';
import { RoadmapBadge } from '@/components/content/roadmap-badge';

/**
 * Page identity. Declared once and consumed twice: by `generatePageMeta` for the
 * <head> tags, and by `PageShell` for the on-page structured data. Keeping it in one
 * const is what stops the meta description and the schema drifting apart.
 */
const pageMeta = {
  title: "Behavioral Analytics | AI Behavioral Analytics Software",
  description: "Behavioral analytics is on the Camzify roadmap. Planned models cover running, abandonment, crowd formation, and counter-flow movement.",
  path: "/ai-features/behavioral-analytics",
};

export const metadata = generatePageMeta({ ...pageMeta });

export default function Page() {
  return (
    <PageShell {...pageMeta} breadcrumbs={[
      { label: 'AI Features', href: '/ai-features' },
      { label: 'Behavioral Analytics' },
    ]}>
      <section className="pb-16">
        <div className="mx-auto max-w-site px-6">
          <RoadmapBadge className="mb-4" />
          <h1 className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl">Behavioral Analytics</h1>
          <p className="mt-6 max-w-2xl text-body text-muted-foreground">Behavioral analytics is a planned detection category covering running, object abandonment, crowd formation, and counter-flow movement. These models will identify anomalous behaviour patterns that individual detection features cannot capture on their own. This feature is on the roadmap and not yet available.</p>
          
          <div className="mt-6 rounded-xl border border-warn/30 bg-warn/5 p-6">
            <p className="text-sm text-warn">
              This feature is on the roadmap and not yet available in production. For current detection capabilities, see our <Link href="/ai-features" className="text-warn underline">live detection features</Link>.
            </p>
          </div>

          <div className="mt-12 grid items-center gap-12 lg:grid-cols-2">
            <ScrollReveal>
              <PlaceholderVisual type="camera-feed" caption="BEHAVIORAL ANALYTICS" alt="Behavioral Analytics visualization on camera feed" />
            </ScrollReveal>
            <ScrollReveal delay={0.06}>
              <div>
                <h2 className="font-display text-2xl font-bold">In a patrol round</h2>
                <p className="mt-4 text-muted-foreground">
                  During a <Link href="/virtual-patrolling" className="text-primary hover:underline">virtual patrol</Link> round,
                  alerts from this detection model contribute to the compliance assessment at each camera stop
                  and are logged in the patrol report.
                </p>
              </div>
            </ScrollReveal>
          </div>

          <div className="mt-16">
            <h2 className="font-display text-2xl font-bold">Related</h2>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link href="/ai-features" className="rounded-lg border border-border bg-card px-4 py-2 text-sm hover:border-primary/30 hover:text-primary">All AI Features</Link>
              <Link href="/virtual-patrolling" className="rounded-lg border border-border bg-card px-4 py-2 text-sm hover:border-primary/30 hover:text-primary">Virtual Patrolling</Link>
              <Link href="/industries/warehouses" className="rounded-lg border border-border bg-card px-4 py-2 text-sm hover:border-primary/30 hover:text-primary">Warehouses</Link>
              <Link href="/industries/retail" className="rounded-lg border border-border bg-card px-4 py-2 text-sm hover:border-primary/30 hover:text-primary">Retail</Link>
              <Link href="/use-cases/perimeter-security" className="rounded-lg border border-border bg-card px-4 py-2 text-sm hover:border-primary/30 hover:text-primary">Perimeter Security</Link>
              <Link href="/pricing" className="rounded-lg border border-border bg-card px-4 py-2 text-sm hover:border-primary/30 hover:text-primary">Pricing</Link>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
