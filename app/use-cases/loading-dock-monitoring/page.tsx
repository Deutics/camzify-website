import { generatePageMeta } from '@/lib/page-utils';
import { PageShell } from '@/components/layout/page-shell';
import { serviceSchema } from '@/lib/seo';
import { ScrollReveal } from '@/components/motion/scroll-reveal';
import { PlaceholderVisual } from '@/components/content/placeholder-visual';
import { FAQAccordion } from '@/components/content/faq-accordion';
import Link from 'next/link';
import { SiteImage } from '@/components/content/site-image';

/**
 * Page identity. Declared once and consumed twice: by `generatePageMeta` for the
 * <head> tags, and by `PageShell` for the on-page structured data. Keeping it in one
 * const is what stops the meta description and the schema drifting apart.
 */
const pageMeta = {
  title: "Loading Dock Security | Dock Door Monitoring",
  description: "Monitor loading docks 24/7 with AI detection. Camzify verifies dock door status, detects unauthorized access, and alerts security. Book a demo.",
  path: "/use-cases/loading-dock-monitoring",
};

export const metadata = generatePageMeta({ ...pageMeta });

const faqs = [
  { question: "Can Camzify verify if a dock door is open or closed?", answer: "Camzify uses zone intrusion detection and visual checks during patrol rounds to verify dock door status. If a door should be closed and the AI detects it is open (or detects movement through the opening), it flags the condition." },
  { question: "Can I schedule dock monitoring for after-hours only?", answer: "Yes. Detection rules and patrol schedules support time-based activation. You can configure aggressive monitoring after business hours and lighter checks during scheduled delivery windows." },
];

export default function LoadingDockMonitoringPage() {
  return (
    <PageShell {...pageMeta} schema={[serviceSchema({ name: "Loading Dock Security", description: "Monitor loading docks 24/7 with AI detection. Camzify verifies dock door status, detects unauthorized access, and alerts security. Book a demo.", path: "/use-cases/loading-dock-monitoring" })]} faqs={faqs} breadcrumbs={[
      { label: 'Use Cases', href: '/use-cases' },
      { label: 'Loading Dock Security' },
    ]}>
      <section className="pb-16">
        <div className="mx-auto max-w-site px-6">
          <h1 className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl">Loading Dock Security</h1>
          <p className="mt-6 max-w-2xl text-body text-muted-foreground">
            Loading dock monitoring is the continuous surveillance of dock doors, staging areas, and vehicle bays to verify that doors are closed when not in use, unauthorized vehicles are not present, and dock activity occurs only during scheduled windows.
          </p>

          <div className="mt-12 grid items-center gap-12 lg:grid-cols-2">
            <ScrollReveal>
              <div>
                <h2 className="font-display text-2xl font-bold">Why conventional CCTV fails</h2>
                <p className="mt-4 max-w-prose text-muted-foreground">Loading docks are high-risk areas — they combine valuable inventory, vehicle access, and frequent door openings. A dock door left open overnight or an unauthorized vehicle at the bay is a direct theft vector, but guards checking multiple docks on foot miss these conditions regularly.</p>
              </div>
            </ScrollReveal>
            <SiteImage
              src="/loading-dock-security.jpg" alt="AI-monitored loading dock with cameras tracking trucks, a forklift, and dock doors, flagging cleared and restricted bays" className="w-full rounded-xl"
              width={1229}
              height={692}
              priority
              sizes="(max-width: 1024px) 100vw, 60vw"
            />
          </div>

          <div className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">How Camzify handles it</h2>
              <div className="mt-4 max-w-prose text-muted-foreground" dangerouslySetInnerHTML={{ __html: `Camzify uses <a href="/ai-features/zone-intrusion-detection" class="text-primary hover:underline">zone intrusion detection</a> to monitor dock bays and staging areas, and <a href="/ai-features/line-intrusion-detection" class="text-primary hover:underline">line intrusion detection</a> at dock door thresholds. <a href="/virtual-patrolling" class="text-primary hover:underline">Virtual patrol</a> rounds verify dock door status on a configurable schedule — checking that doors are closed, bays are clear, and no unauthorized activity is occurring.` }} />
            </ScrollReveal>
          </div>

          <div className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">What a patrol round looks like</h2>
              <p className="mt-4 max-w-prose text-muted-foreground">A loading dock patrol sequence checks each dock bay camera in order: dock door closed or open (expected vs actual), staging area clear, no vehicles present outside scheduled delivery windows, perimeter cameras showing no unauthorized approach.</p>
            </ScrollReveal>
          </div>

          <div className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">Detections that power this</h2>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <Link href="/ai-features/zone-intrusion-detection" className="rounded-lg bg-card p-4 shadow transition-shadow hover:shadow-md">
                  <span className="font-mono text-xs uppercase tracking-wider text-primary">Live</span>
                  <p className="mt-1 font-display font-bold">Zone Intrusion Detection</p>
                </Link>
                <Link href="/ai-features/line-intrusion-detection" className="rounded-lg bg-card p-4 shadow transition-shadow hover:shadow-md">
                  <span className="font-mono text-xs uppercase tracking-wider text-primary">Live</span>
                  <p className="mt-1 font-display font-bold">Line Intrusion Detection</p>
                </Link>
                <Link href="/ai-features/multi-object-tracking" className="rounded-lg bg-card p-4 shadow transition-shadow hover:shadow-md">
                  <span className="font-mono text-xs uppercase tracking-wider text-primary">Live</span>
                  <p className="mt-1 font-display font-bold">Multi-Object Tracking</p>
                </Link>
                <Link href="/ai-features/motion-detection" className="rounded-lg bg-card p-4 shadow transition-shadow hover:shadow-md">
                  <span className="font-mono text-xs uppercase tracking-wider text-primary">Live</span>
                  <p className="mt-1 font-display font-bold">Motion Detection</p>
                </Link>
              </div>
            </ScrollReveal>
          </div>

          <div className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">Industries where this applies</h2>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link href="/industries/warehouses" className="rounded-full bg-card px-4 py-2 text-sm font-medium shadow transition-shadow hover:shadow-md">Warehouses</Link>
                <Link href="/industries/manufacturing" className="rounded-full bg-card px-4 py-2 text-sm font-medium shadow transition-shadow hover:shadow-md">Manufacturing</Link>
                <Link href="/industries/retail" className="rounded-full bg-card px-4 py-2 text-sm font-medium shadow transition-shadow hover:shadow-md">Retail</Link>
                <Link href="/industries/automotive" className="rounded-full bg-card px-4 py-2 text-sm font-medium shadow transition-shadow hover:shadow-md">Automotive</Link>
              </div>
            </ScrollReveal>
          </div>

          <div className="mt-20">
            <FAQAccordion items={faqs} />
          </div>
        </div>
      </section>
    </PageShell>
  );
}
