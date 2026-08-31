import { generatePageMeta } from '@/lib/page-utils';
import { PageShell } from '@/components/layout/page-shell';
import { serviceSchema } from '@/lib/seo';
import { ScrollReveal } from '@/components/motion/scroll-reveal';
import { PlaceholderVisual } from '@/components/content/placeholder-visual';
import { FAQAccordion } from '@/components/content/faq-accordion';
import Link from 'next/link';
import Image from 'next/image';

/**
 * Page identity. Declared once and consumed twice: by `generatePageMeta` for the
 * <head> tags, and by `PageShell` for the on-page structured data. Keeping it in one
 * const is what stops the meta description and the schema drifting apart.
 */
const pageMeta = {
  title: "AI Theft Detection | Shrinkage Prevention",
  description: "Reduce theft and shrinkage with AI video analytics. Camzify detects unauthorized activity in real time and alerts your security team. Book a demo.",
  path: "/use-cases/theft-prevention",
};

export const metadata = generatePageMeta({ ...pageMeta });

const faqs = [
  { question: "Can Camzify detect shoplifting in real time?", answer: "Camzify detects unauthorized zone entry and unusual presence patterns. It does not identify the act of concealing merchandise. However, zone-based detection in high-shrinkage areas combined with real-time alerts gives loss prevention teams immediate awareness of suspicious activity." },
  { question: "How does this help with employee theft?", answer: "Schedule-based zone detection can flag entry to stockrooms, cash offices, or restricted areas outside of authorized hours. Patrol rounds verify that controlled areas remain clear according to the defined schedule." },
];

export default function TheftPreventionPage() {
  return (
    <PageShell {...pageMeta} schema={[serviceSchema({ name: "AI Theft Detection", description: "Reduce theft and shrinkage with AI video analytics. Camzify detects unauthorized activity in real time and alerts your security team. Book a demo.", path: "/use-cases/theft-prevention" })]} faqs={faqs} breadcrumbs={[
      { label: 'Use Cases', href: '/use-cases' },
      { label: 'AI Theft Detection' },
    ]}>
      <section className="pb-16">
        <div className="mx-auto max-w-site px-6">
          <h1 className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl">AI Theft Detection</h1>
          <p className="mt-6 max-w-2xl text-body text-muted-foreground">
            Theft prevention through video analytics means using AI to detect unauthorized access, unusual activity in high-value areas, and violations of defined security zones — alerting the security team in real time rather than reviewing footage after the loss is discovered.
          </p>

          <div className="mt-12 grid items-center gap-12 lg:grid-cols-2">
            <ScrollReveal>
              <div>
                <h2 className="font-display text-2xl font-bold">Why conventional CCTV fails</h2>
                <p className="mt-4 max-w-prose text-muted-foreground">Shrinkage costs businesses billions annually. Traditional CCTV records the event but does not flag it. Loss prevention teams review hours of footage after the fact, identifying patterns too late to prevent the next incident.</p>
              </div>
            </ScrollReveal>
            <Image
              src="/ai-theft-detection.jpg" alt="A warehouse operator reviewing an AI theft alert on a tablet, with a ceiling camera tracking a suspicious figure near a caged storage area" className="w-full rounded-xl"
              width={1229}
              height={692}
              priority
              sizes="(max-width: 1024px) 100vw, 60vw"
            />
          </div>

          <div className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">How Camzify handles it</h2>
              <div className="mt-4 max-w-prose text-muted-foreground" dangerouslySetInnerHTML={{ __html: `Camzify places <a href="/ai-features/zone-intrusion-detection" class="text-primary hover:underline">zone intrusion detection</a> around high-value areas — stockrooms, loading docks, cash handling zones — and uses <a href="/ai-features/multi-object-tracking" class="text-primary hover:underline">multi-object tracking</a> to maintain identity for every person in the frame. Combined with <a href="/virtual-patrolling" class="text-primary hover:underline">virtual patrol</a> rounds that verify zone integrity every 15 minutes, it creates a continuous deterrent.` }} />
            </ScrollReveal>
          </div>

          <div className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">What a patrol round looks like</h2>
              <p className="mt-4 max-w-prose text-muted-foreground">A theft-prevention patrol checks stockroom entries, loading dock activity, high-value display areas, and cash handling zones at regular intervals. Each camera stop verifies: no unauthorized persons in zone, no unusual object movement detected, camera view unobstructed.</p>
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
                <Link href="/ai-features/multi-object-tracking" className="rounded-lg bg-card p-4 shadow transition-shadow hover:shadow-md">
                  <span className="font-mono text-xs uppercase tracking-wider text-primary">Live</span>
                  <p className="mt-1 font-display font-bold">Multi-Object Tracking</p>
                </Link>
                <Link href="/ai-features/ai-attribute-extraction" className="rounded-lg bg-card p-4 shadow transition-shadow hover:shadow-md">
                  <span className="font-mono text-xs uppercase tracking-wider text-primary">Live</span>
                  <p className="mt-1 font-display font-bold">AI Attribute Extraction</p>
                </Link>
                <Link href="/ai-features/line-intrusion-detection" className="rounded-lg bg-card p-4 shadow transition-shadow hover:shadow-md">
                  <span className="font-mono text-xs uppercase tracking-wider text-primary">Live</span>
                  <p className="mt-1 font-display font-bold">Line Intrusion Detection</p>
                </Link>
              </div>
            </ScrollReveal>
          </div>

          <div className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">Industries where this applies</h2>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link href="/industries/retail" className="rounded-full bg-card px-4 py-2 text-sm font-medium shadow transition-shadow hover:shadow-md">Retail</Link>
                <Link href="/industries/warehouses" className="rounded-full bg-card px-4 py-2 text-sm font-medium shadow transition-shadow hover:shadow-md">Warehouses</Link>
                <Link href="/industries/self-storage" className="rounded-full bg-card px-4 py-2 text-sm font-medium shadow transition-shadow hover:shadow-md">Self-Storage</Link>
                <Link href="/industries/manufacturing" className="rounded-full bg-card px-4 py-2 text-sm font-medium shadow transition-shadow hover:shadow-md">Manufacturing</Link>
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
