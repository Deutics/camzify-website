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
  title: "Unauthorized Access Detection | Restricted Area Monitoring",
  description: "Detect unauthorized access to restricted areas with AI zone monitoring. Camzify alerts guards the moment someone enters a defined zone. Book a demo.",
  path: "/use-cases/unauthorized-access-detection",
};

export const metadata = generatePageMeta({ ...pageMeta });

const faqs = [
  { question: "Can I schedule zone detection to activate only after business hours?", answer: "Yes. Zone intrusion detection supports schedule-based activation. You can define different zones and rules for business hours, after-hours, weekends, and holidays." },
  { question: "How does this differ from access control?", answer: "Access control systems manage door locks and badge readers. Camzify adds a visual verification layer — confirming that only authorized activity occurs inside the controlled area, catching tailgating and other bypass methods that badge systems miss." },
  { question: "Can it distinguish between employees and unauthorized persons?", answer: "When AI attribute extraction is enabled, the system can describe attributes of detected persons — clothing color, carrying objects, behavior patterns. Full identity recognition is not a current capability." },
];

export default function UnauthorizedAccessDetectionPage() {
  return (
    <PageShell {...pageMeta} schema={[serviceSchema({ name: "Unauthorized Access Detection", description: "Detect unauthorized access to restricted areas with AI zone monitoring. Camzify alerts guards the moment someone enters a defined zone. Book a demo.", path: "/use-cases/unauthorized-access-detection" })]} faqs={faqs} breadcrumbs={[
      { label: 'Use Cases', href: '/use-cases' },
      { label: 'Unauthorized Access Detection' },
    ]}>
      <section className="pb-16">
        <div className="mx-auto max-w-site px-6">
          <h1 className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl">Unauthorized Access Detection</h1>
          <p className="mt-6 max-w-2xl text-body text-muted-foreground">
            Unauthorized access detection is the ability to identify and alert when a person or vehicle enters a restricted, controlled, or off-limits area. It is distinct from general motion detection because it operates on defined zones with specific rules about who or what should be present and when.
          </p>

          <div className="mt-12 grid items-center gap-12 lg:grid-cols-2">
            <ScrollReveal>
              <div>
                <h2 className="font-display text-2xl font-bold">Why conventional CCTV fails</h2>
                <p className="mt-4 max-w-prose text-muted-foreground">Access control systems track badge swipes but cannot verify what happens after the door opens. Tailgating, propped doors, and badge-sharing create gaps that conventional CCTV records but does not flag. The footage exists, but no one watches it in real time.</p>
              </div>
            </ScrollReveal>
            <SiteImage
              src="/unauthorized-access-detection.jpg" alt="AI cameras at a facility gate detecting a person and vehicle attempting unauthorized entry at night, flagged with an alert" className="w-full rounded-xl"
              width={1229}
              height={692}
              priority
              sizes="(max-width: 1024px) 100vw, 60vw"
            />
          </div>

          <div className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">How Camzify handles it</h2>
              <div className="mt-4 max-w-prose text-muted-foreground" dangerouslySetInnerHTML={{ __html: `Camzify uses <a href="/ai-features/zone-intrusion-detection" class="text-primary hover:underline">zone intrusion detection</a> to define restricted areas directly on the camera view. When the AI detects a person inside the zone, it fires an alert to the assigned guard through the <a href="/platform/notifications-and-alerts" class="text-primary hover:underline">notification system</a>. Combined with <a href="/virtual-patrolling" class="text-primary hover:underline">virtual patrolling</a>, it provides continuous verification that restricted areas remain clear.` }} />
            </ScrollReveal>
          </div>

          <div className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">What a patrol round looks like</h2>
              <p className="mt-4 max-w-prose text-muted-foreground">A patrol round for unauthorized access might check: server room entrance clear, rooftop access door closed, hazardous materials zone empty, executive floor corridor clear after 8pm. Each check produces a compliance entry in the patrol log.</p>
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
                <Link href="/industries/healthcare" className="rounded-full bg-card px-4 py-2 text-sm font-medium shadow transition-shadow hover:shadow-md">Healthcare</Link>
                <Link href="/industries/financial-services" className="rounded-full bg-card px-4 py-2 text-sm font-medium shadow transition-shadow hover:shadow-md">Financial Services</Link>
                <Link href="/industries/manufacturing" className="rounded-full bg-card px-4 py-2 text-sm font-medium shadow transition-shadow hover:shadow-md">Manufacturing</Link>
                <Link href="/industries/energy" className="rounded-full bg-card px-4 py-2 text-sm font-medium shadow transition-shadow hover:shadow-md">Energy</Link>
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
