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
  title: "AI Vandalism Prevention | Property Damage Detection",
  description: "Prevent vandalism with AI-powered surveillance. Camzify detects suspicious activity and alerts guards before damage occurs. Book a demo.",
  path: "/use-cases/vandalism-prevention",
};

export const metadata = generatePageMeta({ ...pageMeta });

const faqs = [
  { question: "Can Camzify prevent vandalism or only detect it?", answer: "Camzify detects the conditions that precede vandalism — unauthorized presence, unusual activity — and alerts security in real time. Prevention depends on the speed of the response, but early detection gives the security team a window to intervene before damage occurs." },
  { question: "What about spray paint or graffiti detection?", answer: "Camzify detects persons in restricted areas, not the act of applying paint. However, detecting someone near a wall during off-hours in a restricted zone is the actionable precursor." },
];

export default function VandalismPreventionPage() {
  return (
    <PageShell {...pageMeta} schema={[serviceSchema({ name: "AI Vandalism Prevention", description: "Prevent vandalism with AI-powered surveillance. Camzify detects suspicious activity and alerts guards before damage occurs. Book a demo.", path: "/use-cases/vandalism-prevention" })]} faqs={faqs} breadcrumbs={[
      { label: 'Use Cases', href: '/use-cases' },
      { label: 'Vandalism Prevention' },
    ]}>
      <section className="pb-16">
        <div className="mx-auto max-w-site px-6">
          <h1 className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl">Vandalism Prevention</h1>
          <p className="mt-6 max-w-2xl text-body text-muted-foreground">
            Vandalism prevention in a surveillance context means detecting the presence of unauthorized persons near vulnerable assets — walls, vehicles, equipment, storefronts — and alerting security before damage occurs. The goal is intervention, not just recording.
          </p>

          <div className="mt-12 grid items-center gap-12 lg:grid-cols-2">
            <ScrollReveal>
              <div>
                <h2 className="font-display text-2xl font-bold">Why conventional CCTV fails</h2>
                <p className="mt-4 max-w-prose text-muted-foreground">Vandalism is typically discovered after the fact. Cameras record it, but passive recording does nothing to prevent it. By the time footage is reviewed, the damage is done and the perpetrator is gone.</p>
              </div>
            </ScrollReveal>
            <SiteImage
              src="/vandalism-prevention.jpg" alt="AI camera detecting a person spray-painting a wall at night in an alley, flagged with an alert on the live detection feed" className="w-full rounded-xl"
              width={1229}
              height={692}
              priority
              sizes="(max-width: 1024px) 100vw, 60vw"
            />
          </div>

          <div className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">How Camzify handles it</h2>
              <div className="mt-4 max-w-prose text-muted-foreground" dangerouslySetInnerHTML={{ __html: `Camzify detects the precursors to vandalism — a person in a restricted area, unusual presence near vulnerable assets, or activity during hours when the area should be empty. <a href="/ai-features/zone-intrusion-detection" class="text-primary hover:underline">Zone intrusion detection</a> and <a href="/ai-features/motion-detection" class="text-primary hover:underline">smart motion detection</a> trigger immediate alerts, giving security the window to intervene. <a href="/virtual-patrolling" class="text-primary hover:underline">Virtual patrol</a> rounds provide systematic checks of vulnerable areas.` }} />
            </ScrollReveal>
          </div>

          <div className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">What a patrol round looks like</h2>
              <p className="mt-4 max-w-prose text-muted-foreground">A vandalism-prevention patrol might focus on exterior walls, parking areas, ground-floor windows, and equipment yards — checking each camera for human presence during off-hours and verifying that no new damage is visible.</p>
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
                <Link href="/ai-features/motion-detection" className="rounded-lg bg-card p-4 shadow transition-shadow hover:shadow-md">
                  <span className="font-mono text-xs uppercase tracking-wider text-primary">Live</span>
                  <p className="mt-1 font-display font-bold">Motion Detection</p>
                </Link>
                <Link href="/ai-features/camera-tampering-detection" className="rounded-lg bg-card p-4 shadow transition-shadow hover:shadow-md">
                  <span className="font-mono text-xs uppercase tracking-wider text-primary">Live</span>
                  <p className="mt-1 font-display font-bold">Camera Tampering Detection</p>
                </Link>
                <Link href="/ai-features/multi-object-tracking" className="rounded-lg bg-card p-4 shadow transition-shadow hover:shadow-md">
                  <span className="font-mono text-xs uppercase tracking-wider text-primary">Live</span>
                  <p className="mt-1 font-display font-bold">Multi-Object Tracking</p>
                </Link>
              </div>
            </ScrollReveal>
          </div>

          <div className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">Industries where this applies</h2>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link href="/industries/retail" className="rounded-full bg-card px-4 py-2 text-sm font-medium shadow transition-shadow hover:shadow-md">Retail</Link>
                <Link href="/industries/education-facilities" className="rounded-full bg-card px-4 py-2 text-sm font-medium shadow transition-shadow hover:shadow-md">Education Facilities</Link>
                <Link href="/industries/property-management" className="rounded-full bg-card px-4 py-2 text-sm font-medium shadow transition-shadow hover:shadow-md">Property Management</Link>
                <Link href="/industries/residential" className="rounded-full bg-card px-4 py-2 text-sm font-medium shadow transition-shadow hover:shadow-md">Residential</Link>
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
