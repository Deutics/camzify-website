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
  title: "AI Parking Lot Surveillance | Vehicle Monitoring",
  description: "Monitor parking lots with AI video analytics. Camzify detects unauthorized vehicles, loitering, and after-hours activity. Book a demo.",
  path: "/use-cases/parking-lot-surveillance",
};

export const metadata = generatePageMeta({ ...pageMeta });

const faqs = [
  { question: "Can Camzify detect vehicles in a parking lot?", answer: "Yes. Multi-object tracking identifies and tracks vehicles in the camera frame. Zone intrusion detection can flag vehicles in restricted areas or present during unauthorized hours." },
  { question: "Does it work in poor lighting conditions?", answer: "Camzify works with any camera feed. If your parking lot cameras include infrared or low-light capability, the AI will process the feed accordingly." },
];

export default function ParkingLotSurveillancePage() {
  return (
    <PageShell {...pageMeta} schema={[serviceSchema({ name: "AI Parking Lot Surveillance", description: "Monitor parking lots with AI video analytics. Camzify detects unauthorized vehicles, loitering, and after-hours activity. Book a demo.", path: "/use-cases/parking-lot-surveillance" })]} faqs={faqs} breadcrumbs={[
      { label: 'Use Cases', href: '/use-cases' },
      { label: 'Parking Lot Surveillance' },
    ]}>
      <section className="pb-16">
        <div className="mx-auto max-w-site px-6">
          <h1 className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl">Parking Lot Surveillance</h1>
          <p className="mt-6 max-w-2xl text-body text-muted-foreground">
            Parking lot surveillance is the AI-powered monitoring of outdoor vehicle areas to detect unauthorized access, after-hours presence, suspicious activity, and zone violations. It addresses one of the most common blind spots in commercial security programs.
          </p>

          <div className="mt-12 grid items-center gap-12 lg:grid-cols-2">
            <ScrollReveal>
              <div>
                <h2 className="font-display text-2xl font-bold">Why conventional CCTV fails</h2>
                <p className="mt-4 max-w-prose text-muted-foreground">Parking lots are large, often poorly lit, and difficult to monitor with foot patrols. Cameras cover the area but generate so much footage that manual review is impractical. Incidents — break-ins, vandalism, unauthorized overnight parking — are discovered the next morning.</p>
              </div>
            </ScrollReveal>
            <SiteImage
              src="/parking-lot-surveillance.jpg" alt="AI-monitored night parking lot with bounding boxes tracking parked vehicles, a moving car, and a pedestrian" className="w-full rounded-xl"
              width={1229}
              height={692}
              priority
              sizes="(max-width: 1024px) 100vw, 60vw"
            />
          </div>

          <div className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">How Camzify handles it</h2>
              <div className="mt-4 max-w-prose text-muted-foreground" dangerouslySetInnerHTML={{ __html: `Camzify applies <a href="/ai-features/zone-intrusion-detection" class="text-primary hover:underline">zone intrusion detection</a> and <a href="/ai-features/motion-detection" class="text-primary hover:underline">motion detection</a> across parking areas with time-based rules. After business hours, any human or vehicle presence triggers an alert. During business hours, restricted zones — reserved spaces, fire lanes, loading areas — remain monitored. <a href="/virtual-patrolling" class="text-primary hover:underline">Virtual patrol</a> rounds sweep the lot systematically.` }} />
            </ScrollReveal>
          </div>

          <div className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">What a patrol round looks like</h2>
              <p className="mt-4 max-w-prose text-muted-foreground">A parking lot patrol cycles through all lot cameras, checking: no persons present after hours, fire lanes clear, restricted zones empty, perimeter gates secured. Each check is logged with a timestamp and compliance status.</p>
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
                <Link href="/ai-features/multi-object-tracking" className="rounded-lg bg-card p-4 shadow transition-shadow hover:shadow-md">
                  <span className="font-mono text-xs uppercase tracking-wider text-primary">Live</span>
                  <p className="mt-1 font-display font-bold">Multi-Object Tracking</p>
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
                <Link href="/industries/healthcare" className="rounded-full bg-card px-4 py-2 text-sm font-medium shadow transition-shadow hover:shadow-md">Healthcare</Link>
                <Link href="/industries/education-facilities" className="rounded-full bg-card px-4 py-2 text-sm font-medium shadow transition-shadow hover:shadow-md">Education Facilities</Link>
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
