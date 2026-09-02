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
  title: "AI Vehicle Monitoring | Vehicle Detection Surveillance",
  description: "Monitor vehicle activity with AI video analytics. Detect unauthorized vehicles, track movement, and verify fleet areas. Book a demo.",
  path: "/use-cases/vehicle-monitoring",
};

export const metadata = generatePageMeta({ ...pageMeta });

const faqs = [
  { question: "Does Camzify read license plates?", answer: "No. Camzify tracks vehicles as objects using multi-object tracking. It does not perform optical character recognition on license plates. Vehicle detection is based on object classification in the video frame." },
  { question: "Can I set different vehicle monitoring rules for day and night?", answer: "Yes. Zone and line detection rules support schedule-based activation, so you can apply different rules for business hours, after-hours, and weekends." },
];

export default function VehicleMonitoringPage() {
  return (
    <PageShell {...pageMeta} schema={[serviceSchema({ name: "AI Vehicle Monitoring", description: "Monitor vehicle activity with AI video analytics. Detect unauthorized vehicles, track movement, and verify fleet areas. Book a demo.", path: "/use-cases/vehicle-monitoring" })]} faqs={faqs} breadcrumbs={[
      { label: 'Use Cases', href: '/use-cases' },
      { label: 'Vehicle Monitoring' },
    ]}>
      <section className="pb-16">
        <div className="mx-auto max-w-site px-6">
          <h1 className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl">Vehicle Monitoring</h1>
          <p className="mt-6 max-w-2xl text-body text-muted-foreground">
            Vehicle monitoring through video analytics means detecting, tracking, and alerting on vehicle presence and movement in defined areas — entry gates, loading bays, parking zones, and restricted perimeters. It is distinct from license plate recognition; Camzify tracks vehicles as objects in the frame.
          </p>

          <div className="mt-12 grid items-center gap-12 lg:grid-cols-2">
            <ScrollReveal>
              <div>
                <h2 className="font-display text-2xl font-bold">Why conventional CCTV fails</h2>
                <p className="mt-4 max-w-prose text-muted-foreground">Vehicle-related incidents — unauthorized fleet access, after-hours loading dock activity, overnight parking violations — are difficult to catch with human monitoring alone. The volume of vehicle movement during business hours makes it impractical to flag every event manually.</p>
              </div>
            </ScrollReveal>
            <SiteImage
              src="/vehicle-monitoring.jpg" alt="Aerial AI view of a logistics yard tracking trucks, vans, and cars across zoned areas with color-coded bounding boxes" className="w-full rounded-xl"
              width={1229}
              height={692}
              priority
              sizes="(max-width: 1024px) 100vw, 60vw"
            />
          </div>

          <div className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">How Camzify handles it</h2>
              <div className="mt-4 max-w-prose text-muted-foreground" dangerouslySetInnerHTML={{ __html: `Camzify uses <a href="/ai-features/multi-object-tracking" class="text-primary hover:underline">multi-object tracking</a> to maintain persistent identity for vehicles in the camera frame, combined with <a href="/ai-features/zone-intrusion-detection" class="text-primary hover:underline">zone intrusion detection</a> and <a href="/ai-features/line-intrusion-detection" class="text-primary hover:underline">line intrusion detection</a> for time-based rules. <a href="/virtual-patrolling" class="text-primary hover:underline">Virtual patrol</a> rounds verify fleet areas and restricted vehicle zones.` }} />
            </ScrollReveal>
          </div>

          <div className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">What a patrol round looks like</h2>
              <p className="mt-4 max-w-prose text-muted-foreground">A vehicle monitoring patrol checks: fleet yard perimeter secure, no unauthorized vehicles in loading area, gate entries clear after hours, restricted vehicle zones empty.</p>
            </ScrollReveal>
          </div>

          <div className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">Detections that power this</h2>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <Link href="/ai-features/multi-object-tracking" className="rounded-lg bg-card p-4 shadow transition-shadow hover:shadow-md">
                  <span className="font-mono text-xs uppercase tracking-wider text-primary">Live</span>
                  <p className="mt-1 font-display font-bold">Multi-Object Tracking</p>
                </Link>
                <Link href="/ai-features/zone-intrusion-detection" className="rounded-lg bg-card p-4 shadow transition-shadow hover:shadow-md">
                  <span className="font-mono text-xs uppercase tracking-wider text-primary">Live</span>
                  <p className="mt-1 font-display font-bold">Zone Intrusion Detection</p>
                </Link>
                <Link href="/ai-features/line-intrusion-detection" className="rounded-lg bg-card p-4 shadow transition-shadow hover:shadow-md">
                  <span className="font-mono text-xs uppercase tracking-wider text-primary">Live</span>
                  <p className="mt-1 font-display font-bold">Line Intrusion Detection</p>
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
                <Link href="/industries/automotive" className="rounded-full bg-card px-4 py-2 text-sm font-medium shadow transition-shadow hover:shadow-md">Automotive</Link>
                <Link href="/industries/warehouses" className="rounded-full bg-card px-4 py-2 text-sm font-medium shadow transition-shadow hover:shadow-md">Warehouses</Link>
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
