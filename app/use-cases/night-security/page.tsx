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
  title: "Night Security Monitoring | Overnight Surveillance",
  description: "Automated night security with AI patrol rounds running every 15 minutes. Camzify verifies your premises overnight without additional guard shifts. Book a demo.",
  path: "/use-cases/night-security",
};

export const metadata = generatePageMeta({ ...pageMeta });

const faqs = [
  { question: "How many patrol rounds can run per night?", answer: "There is no hard limit. You configure the frequency — every 15 minutes means 32 rounds in an 8-hour overnight window. Each round covers every camera in the patrol sequence." },
  { question: "What if the internet connection drops overnight?", answer: "If connectivity is lost, the patrol round cannot complete and the system logs the failure. When connectivity restores, the next scheduled round proceeds. Camera-side recording continues regardless of connectivity." },
];

export default function NightSecurityPage() {
  return (
    <PageShell {...pageMeta} schema={[serviceSchema({ name: "Night Security Monitoring", description: "Automated night security with AI patrol rounds running every 15 minutes. Camzify verifies your premises overnight without additional guard shifts. Book a demo.", path: "/use-cases/night-security" })]} faqs={faqs} breadcrumbs={[
      { label: 'Use Cases', href: '/use-cases' },
      { label: 'Night Security' },
    ]}>
      <section className="pb-16">
        <div className="mx-auto max-w-site px-6">
          <h1 className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl">Night Security</h1>
          <p className="mt-6 max-w-2xl text-body text-muted-foreground">
            Night security is the protection of a facility during overnight hours when staffing is minimal or absent. It is the highest-risk period for intrusion, theft, and property damage, and the time when traditional security programs are weakest.
          </p>

          <div className="mt-12 grid items-center gap-12 lg:grid-cols-2">
            <ScrollReveal>
              <div>
                <h2 className="font-display text-2xl font-bold">Why conventional CCTV fails</h2>
                <p className="mt-4 max-w-prose text-muted-foreground">Overnight guard shifts are expensive, fatiguing, and difficult to verify. A single guard cannot cover a large facility effectively, and shift changes create coverage gaps. Most overnight incidents happen during the hours when the guard is least alert.</p>
              </div>
            </ScrollReveal>
            <SiteImage
              src="/night-security.jpg" alt="AI-monitored facility perimeter at night showing networked security cameras and drone coverage around the building" className="w-full rounded-xl"
              width={1229}
              height={692}
              priority
              sizes="(max-width: 1024px) 100vw, 60vw"
            />
          </div>

          <div className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">How Camzify handles it</h2>
              <div className="mt-4 max-w-prose text-muted-foreground" dangerouslySetInnerHTML={{ __html: `Camzify runs continuous <a href="/virtual-patrolling" class="text-primary hover:underline">virtual patrol</a> rounds throughout the night — every 15, 30, or 60 minutes — checking every camera against a defined checklist. <a href="/ai-features/motion-detection" class="text-primary hover:underline">Motion detection</a>, <a href="/ai-features/zone-intrusion-detection" class="text-primary hover:underline">zone intrusion detection</a>, and <a href="/ai-features/camera-tampering-detection" class="text-primary hover:underline">camera tampering detection</a> remain active between patrol rounds, providing real-time alerts for immediate threats.` }} />
            </ScrollReveal>
          </div>

          <div className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">What a patrol round looks like</h2>
              <p className="mt-4 max-w-prose text-muted-foreground">A typical night security patrol: entrance doors locked and clear, hallways empty, perimeter fence line unbreached, parking lot clear, loading dock doors closed, camera views unobstructed. The entire round completes in minutes, repeated throughout the night.</p>
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
                <Link href="/ai-features/camera-tampering-detection" className="rounded-lg bg-card p-4 shadow transition-shadow hover:shadow-md">
                  <span className="font-mono text-xs uppercase tracking-wider text-primary">Live</span>
                  <p className="mt-1 font-display font-bold">Camera Tampering Detection</p>
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
                <Link href="/industries/warehouses" className="rounded-full bg-card px-4 py-2 text-sm font-medium shadow transition-shadow hover:shadow-md">Warehouses</Link>
                <Link href="/industries/retail" className="rounded-full bg-card px-4 py-2 text-sm font-medium shadow transition-shadow hover:shadow-md">Retail</Link>
                <Link href="/industries/self-storage" className="rounded-full bg-card px-4 py-2 text-sm font-medium shadow transition-shadow hover:shadow-md">Self-Storage</Link>
                <Link href="/industries/property-management" className="rounded-full bg-card px-4 py-2 text-sm font-medium shadow transition-shadow hover:shadow-md">Property Management</Link>
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
