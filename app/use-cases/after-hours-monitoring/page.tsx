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
  title: "After-Hours Security Monitoring | Night Time Surveillance",
  description: "Camzify monitors your premises after hours with automated AI patrol rounds — detecting movement, verifying locks, and alerting guards. No additional staff needed.",
  path: "/use-cases/after-hours-monitoring",
};

export const metadata = generatePageMeta({ ...pageMeta });

const faqs = [
  { question: "Can I set different patrol schedules for weeknights vs weekends?", answer: "Yes. Patrol sequences support configurable active hours and active days. You can run patrols every 15 minutes on weeknights and every 30 minutes on weekends, or any combination that fits your risk profile." },
  { question: "What happens when the system detects something after hours?", answer: "The assigned guard receives an immediate notification with the camera snapshot, detection type, timestamp, and location. They can review the live feed, acknowledge the alert, or escalate — all from the mobile app." },
  { question: "Does this replace a night security guard?", answer: "It depends on the facility. For many sites, automated patrols provide more consistent coverage than a single guard. For high-risk sites, Camzify augments the guard by directing their attention to verified threats rather than having them patrol on foot." },
];

export default function AfterHoursMonitoringPage() {
  return (
    <PageShell {...pageMeta} schema={[serviceSchema({ name: "After-Hours Security Monitoring", description: "Camzify monitors your premises after hours with automated AI patrol rounds — detecting movement, verifying locks, and alerting guards. No additional staff needed.", path: "/use-cases/after-hours-monitoring" })]} faqs={faqs} breadcrumbs={[
      { label: 'Use Cases', href: '/use-cases' },
      { label: 'After-Hours Security Monitoring' },
    ]}>
      <section className="pb-16">
        <div className="mx-auto max-w-site px-6">
          <h1 className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl">After-Hours Security Monitoring</h1>
          <p className="mt-6 max-w-2xl text-body text-muted-foreground">
            After-hours monitoring is the surveillance and security verification of a facility outside normal business hours — nights, weekends, and holidays. It is the period when most security incidents occur and when staffing is thinnest.
          </p>

          <div className="mt-12 grid items-center gap-12 lg:grid-cols-2">
            <ScrollReveal>
              <div>
                <h2 className="font-display text-2xl font-bold">Why conventional CCTV fails</h2>
                <p className="mt-4 max-w-prose text-muted-foreground">Most businesses cannot justify 24/7 guard coverage. Cameras record overnight footage that no one reviews until something goes wrong. By then, the damage is done and the footage is only useful for post-incident investigation, not prevention.</p>
              </div>
            </ScrollReveal>
            <Image
              src="/after-hours-security-monitoring.jpg" alt="A security operations desk with curved monitors showing multiple AI-flagged night camera feeds across a facility" className="w-full rounded-xl"
              width={1229}
              height={692}
              priority
              sizes="(max-width: 1024px) 100vw, 60vw"
            />
          </div>

          <div className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">How Camzify handles it</h2>
              <div className="mt-4 max-w-prose text-muted-foreground" dangerouslySetInnerHTML={{ __html: `Camzify runs <a href="/virtual-patrolling" class="text-primary hover:underline">automated virtual patrols</a> on a configurable schedule — every 15, 30, or 60 minutes — checking each camera against a defined checklist. If the AI detects <a href="/ai-features/motion-detection" class="text-primary hover:underline">unexpected motion</a>, a door left open, or a <a href="/ai-features/camera-tampering-detection" class="text-primary hover:underline">tampered camera</a>, it alerts the on-call guard immediately.` }} />
            </ScrollReveal>
          </div>

          <div className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">What a patrol round looks like</h2>
              <p className="mt-4 max-w-prose text-muted-foreground">An after-hours patrol sequence might include: main entrance locked and clear, parking lot empty, loading dock doors closed, server room door closed, perimeter fence unbreached. Each point is checked in sequence, and any failure creates an actionable alert with a snapshot and timestamp.</p>
            </ScrollReveal>
          </div>

          <div className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">Detections that power this</h2>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <Link href="/ai-features/motion-detection" className="rounded-lg bg-card p-4 shadow transition-shadow hover:shadow-md">
                  <span className="font-mono text-xs uppercase tracking-wider text-primary">Live</span>
                  <p className="mt-1 font-display font-bold">Motion Detection</p>
                </Link>
                <Link href="/ai-features/zone-intrusion-detection" className="rounded-lg bg-card p-4 shadow transition-shadow hover:shadow-md">
                  <span className="font-mono text-xs uppercase tracking-wider text-primary">Live</span>
                  <p className="mt-1 font-display font-bold">Zone Intrusion Detection</p>
                </Link>
                <Link href="/ai-features/line-intrusion-detection" className="rounded-lg bg-card p-4 shadow transition-shadow hover:shadow-md">
                  <span className="font-mono text-xs uppercase tracking-wider text-primary">Live</span>
                  <p className="mt-1 font-display font-bold">Line Intrusion Detection</p>
                </Link>
                <Link href="/ai-features/camera-tampering-detection" className="rounded-lg bg-card p-4 shadow transition-shadow hover:shadow-md">
                  <span className="font-mono text-xs uppercase tracking-wider text-primary">Live</span>
                  <p className="mt-1 font-display font-bold">Camera Tampering Detection</p>
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
                <Link href="/industries/financial-services" className="rounded-full bg-card px-4 py-2 text-sm font-medium shadow transition-shadow hover:shadow-md">Financial Services</Link>
                <Link href="/industries/education-facilities" className="rounded-full bg-card px-4 py-2 text-sm font-medium shadow transition-shadow hover:shadow-md">Education Facilities</Link>
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
