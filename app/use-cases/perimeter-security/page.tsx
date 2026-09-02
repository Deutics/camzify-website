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
  title: "AI Perimeter Security | Perimeter Intrusion Detection",
  description: "Camzify turns your existing cameras into an AI perimeter security system — detecting intrusions at fence lines, gates, and boundaries 24/7. Book a demo.",
  path: "/use-cases/perimeter-security",
};

export const metadata = generatePageMeta({ ...pageMeta });

const faqs = [
  { question: "Can Camzify detect perimeter intrusions at night?", answer: "Yes. Camzify works with any IP camera, including those with infrared or thermal imaging. The AI models operate on the video feed regardless of lighting conditions, so perimeter detections function 24/7." },
  { question: "How quickly does the system alert after a perimeter breach?", answer: "Alerts fire within seconds of a confirmed crossing. The notification reaches the assigned guard via push notification, email, or SMS depending on platform configuration." },
  { question: "Does it work with existing fence-line cameras?", answer: "Yes. Camzify connects to any ONVIF or RTSP-compatible camera. There is no need to replace hardware — the AI runs on the video stream from cameras you already own." },
];

export default function PerimeterSecurityPage() {
  return (
    <PageShell {...pageMeta} schema={[serviceSchema({ name: "AI Perimeter Security", description: "Camzify turns your existing cameras into an AI perimeter security system — detecting intrusions at fence lines, gates, and boundaries 24/7. Book a demo.", path: "/use-cases/perimeter-security" })]} faqs={faqs} breadcrumbs={[
      { label: 'Use Cases', href: '/use-cases' },
      { label: 'AI Perimeter Security' },
    ]}>
      <section className="pb-16">
        <div className="mx-auto max-w-site px-6">
          <h1 className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl">AI Perimeter Security</h1>
          <p className="mt-6 max-w-2xl text-body text-muted-foreground">
            Perimeter security is the practice of detecting and responding to intrusions at the outer boundary of a facility — fence lines, gates, loading areas, and open ground. It is the first layer of any physical security program and the most common failure point when relying solely on manned patrols.
          </p>

          <div className="mt-12 grid items-center gap-12 lg:grid-cols-2">
            <ScrollReveal>
              <div>
                <h2 className="font-display text-2xl font-bold">Why conventional CCTV fails</h2>
                <p className="mt-4 max-w-prose text-muted-foreground">Conventional CCTV records perimeter footage but cannot distinguish a genuine intrusion from a shadow, animal, or tree branch. Guards monitoring multiple screens miss events during shift changes, fatigue periods, and breaks. The result: breaches detected hours after the fact, if at all.</p>
              </div>
            </ScrollReveal>
            <SiteImage
              src="/ai-perimeter-security.jpg" alt="AI-monitored facility perimeter at dusk with networked cameras and a drone tracking activity along the fence line" className="w-full rounded-xl"
              width={1229}
              height={692}
              priority
              sizes="(max-width: 1024px) 100vw, 60vw"
            />
          </div>

          <div className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">How Camzify handles it</h2>
              <div className="mt-4 max-w-prose text-muted-foreground" dangerouslySetInnerHTML={{ __html: `Camzify uses <a href="/ai-features/line-intrusion-detection" class="text-primary hover:underline">line intrusion detection</a> and <a href="/ai-features/zone-intrusion-detection" class="text-primary hover:underline">zone intrusion detection</a> to monitor every meter of your perimeter continuously. When a confirmed human or vehicle crosses a defined boundary, the system alerts the assigned guard within seconds through the <a href="/platform/notifications-and-alerts" class="text-primary hover:underline">notification system</a>.` }} />
            </ScrollReveal>
          </div>

          <div className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">What a patrol round looks like</h2>
              <p className="mt-4 max-w-prose text-muted-foreground">A typical perimeter patrol sequence in Camzify cycles through every fence-facing camera at 15-minute intervals. At each stop, the AI checks: Is the fence line clear? Has any object crossed the tripwire since the last round? Is the camera view unobstructed? Failed checks generate a timestamped entry in the patrol report and push a notification to the on-duty guard.</p>
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
                <Link href="/ai-features/motion-detection" className="rounded-lg bg-card p-4 shadow transition-shadow hover:shadow-md">
                  <span className="font-mono text-xs uppercase tracking-wider text-primary">Live</span>
                  <p className="mt-1 font-display font-bold">Motion Detection</p>
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
                <Link href="/industries/warehouses" className="rounded-full bg-card px-4 py-2 text-sm font-medium shadow transition-shadow hover:shadow-md">Warehouses</Link>
                <Link href="/industries/construction-sites" className="rounded-full bg-card px-4 py-2 text-sm font-medium shadow transition-shadow hover:shadow-md">Construction Sites</Link>
                <Link href="/industries/energy" className="rounded-full bg-card px-4 py-2 text-sm font-medium shadow transition-shadow hover:shadow-md">Energy</Link>
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
