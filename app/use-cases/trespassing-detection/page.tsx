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
  title: "Trespassing Detection | AI Trespass Alerts",
  description: "Detect trespassers on your property with AI-powered zone and line detection. Camzify alerts guards within seconds of unauthorized entry. Book a demo.",
  path: "/use-cases/trespassing-detection",
};

export const metadata = generatePageMeta({ ...pageMeta });

const faqs = [
  { question: "Can Camzify detect trespassers at night?", answer: "Yes. The AI processes video from any camera type, including infrared and thermal cameras commonly used for perimeter coverage at night." },
  { question: "How fast does the alert reach the guard?", answer: "Alerts fire within seconds of detection. The guard receives a push notification with the snapshot, camera location, and detection details." },
  { question: "Does weather affect detection accuracy?", answer: "Heavy rain, fog, and snow can reduce detection range, as they reduce camera visibility. Camzify works with what the camera sees — if the camera image is clear enough to identify a person, the AI will detect them." },
];

export default function TrespassingDetectionPage() {
  return (
    <PageShell {...pageMeta} schema={[serviceSchema({ name: "Trespassing Detection", description: "Detect trespassers on your property with AI-powered zone and line detection. Camzify alerts guards within seconds of unauthorized entry. Book a demo.", path: "/use-cases/trespassing-detection" })]} faqs={faqs} breadcrumbs={[
      { label: 'Use Cases', href: '/use-cases' },
      { label: 'Trespassing Detection' },
    ]}>
      <section className="pb-16">
        <div className="mx-auto max-w-site px-6">
          <h1 className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl">Trespassing Detection</h1>
          <p className="mt-6 max-w-2xl text-body text-muted-foreground">
            Trespassing detection is the automated identification of unauthorized persons entering private or restricted property. It applies to exterior perimeters, open grounds, rooftops, and any area where human presence outside defined hours constitutes a security event.
          </p>

          <div className="mt-12 grid items-center gap-12 lg:grid-cols-2">
            <ScrollReveal>
              <div>
                <h2 className="font-display text-2xl font-bold">Why conventional CCTV fails</h2>
                <p className="mt-4 max-w-prose text-muted-foreground">Trespassers rarely enter through controlled access points. They climb fences, cut through gaps, or enter via unmonitored areas. Static cameras record the footage, but without AI analysis, no one knows until the next morning — or until damage is discovered.</p>
              </div>
            </ScrollReveal>
            <Image
              src="/trespassing-detection.jpg" alt="AI-monitored perimeter fence at night with a person climbing over, flagged in a thermal-camera detection overlay" className="w-full rounded-xl"
              width={1229}
              height={692}
              priority
              sizes="(max-width: 1024px) 100vw, 60vw"
            />
          </div>

          <div className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">How Camzify handles it</h2>
              <div className="mt-4 max-w-prose text-muted-foreground" dangerouslySetInnerHTML={{ __html: `Camzify combines <a href="/ai-features/line-intrusion-detection" class="text-primary hover:underline">line intrusion detection</a> at perimeter boundaries with <a href="/ai-features/zone-intrusion-detection" class="text-primary hover:underline">zone intrusion detection</a> inside the property. When a person crosses a boundary line or appears in a restricted zone, the system alerts the assigned guard immediately. During <a href="/virtual-patrolling" class="text-primary hover:underline">virtual patrol</a> rounds, every perimeter camera is checked systematically.` }} />
            </ScrollReveal>
          </div>

          <div className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">What a patrol round looks like</h2>
              <p className="mt-4 max-w-prose text-muted-foreground">A trespassing-focused patrol sequence cycles through all perimeter and ground-level cameras, checking for human presence in areas that should be empty. Each camera stop verifies: no persons detected in zone, fence line not breached, camera view unobstructed.</p>
            </ScrollReveal>
          </div>

          <div className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">Detections that power this</h2>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <Link href="/ai-features/line-intrusion-detection" className="rounded-lg bg-card p-4 shadow transition-shadow hover:shadow-md">
                  <span className="font-mono text-xs uppercase tracking-wider text-primary">Live</span>
                  <p className="mt-1 font-display font-bold">Line Intrusion Detection</p>
                </Link>
                <Link href="/ai-features/zone-intrusion-detection" className="rounded-lg bg-card p-4 shadow transition-shadow hover:shadow-md">
                  <span className="font-mono text-xs uppercase tracking-wider text-primary">Live</span>
                  <p className="mt-1 font-display font-bold">Zone Intrusion Detection</p>
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
                <Link href="/industries/construction-sites" className="rounded-full bg-card px-4 py-2 text-sm font-medium shadow transition-shadow hover:shadow-md">Construction Sites</Link>
                <Link href="/industries/residential" className="rounded-full bg-card px-4 py-2 text-sm font-medium shadow transition-shadow hover:shadow-md">Residential</Link>
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
