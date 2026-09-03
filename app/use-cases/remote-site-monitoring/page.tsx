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
  title: "Remote Site Monitoring | Unmanned Site Security",
  description: "Monitor remote and unmanned sites with automated AI patrols. Camzify provides 24/7 coverage without on-site guards. Book a demo.",
  path: "/use-cases/remote-site-monitoring",
};

export const metadata = generatePageMeta({ ...pageMeta });

const faqs = [
  { question: "What internet connectivity does a remote site need?", answer: "Camzify connects to cameras via RTSP or the Camzify Connector. The site needs sufficient bandwidth to stream camera feeds — typically 2-4 Mbps per camera for standard resolution. The Camzify Connector can be configured for lower-bandwidth scenarios." },
  { question: "Can one monitoring team oversee multiple remote sites?", answer: "Yes. Camzify's multi-site management feature allows one team to monitor all remote sites from a single dashboard, with site-specific patrol schedules and alert routing." },
];

export default function RemoteSiteMonitoringPage() {
  return (
    <PageShell {...pageMeta} schema={[serviceSchema({ name: "Remote Site Monitoring", description: "Monitor remote and unmanned sites with automated AI patrols. Camzify provides 24/7 coverage without on-site guards. Book a demo.", path: "/use-cases/remote-site-monitoring" })]} faqs={faqs} breadcrumbs={[
      { label: 'Use Cases', href: '/use-cases' },
      { label: 'Remote Site Monitoring' },
    ]}>
      <section className="pb-16">
        <div className="mx-auto max-w-site px-6">
          <h1 className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl">Remote Site Monitoring</h1>
          <p className="mt-6 max-w-2xl text-body text-muted-foreground">
            Remote site monitoring is the surveillance of facilities that have no permanent on-site security staff — unmanned substations, tower sites, rural facilities, and distributed infrastructure. It requires automated systems that can detect, alert, and verify without human presence.
          </p>

          <div className="mt-12 grid items-center gap-12 lg:grid-cols-2">
            <ScrollReveal>
              <div>
                <h2 className="font-display text-2xl font-bold">Why conventional CCTV fails</h2>
                <p className="mt-4 max-w-prose text-muted-foreground">Remote sites are expensive to staff and difficult to patrol. A guard visiting once per day cannot provide continuous coverage. Incidents at unmanned sites often go undetected for hours or days, compounding the damage.</p>
              </div>
            </ScrollReveal>
            <SiteImage
              src="/remote-site-monitoring.jpg" alt="AI-monitored remote substation with a drone and networked cameras tracking a vehicle, deer, and perimeter fence line" className="w-full rounded-xl"
              width={1229}
              height={692}
              priority
              sizes="(max-width: 1024px) 100vw, 60vw"
            />
          </div>

          <div className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">How Camzify handles it</h2>
              <div className="mt-4 max-w-prose text-muted-foreground" dangerouslySetInnerHTML={{ __html: `Camzify provides 24/7 automated monitoring for remote sites through <a href="/virtual-patrolling" class="text-primary hover:underline">virtual patrol</a> rounds that run on a configurable schedule without any on-site presence. <a href="/ai-features/zone-intrusion-detection" class="text-primary hover:underline">Zone intrusion detection</a> and <a href="/ai-features/camera-tampering-detection" class="text-primary hover:underline">camera tampering detection</a> provide real-time alerts to a centralized monitoring team.` }} />
            </ScrollReveal>
          </div>

          <div className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">What a patrol round looks like</h2>
              <p className="mt-4 max-w-prose text-muted-foreground">A remote site patrol runs every 30 minutes: perimeter cameras checked for human or vehicle presence, equipment area verified clear, access gates confirmed closed, camera health verified (no tampering or obstruction). All results feed into a centralized dashboard for the operations team.</p>
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
                <Link href="/ai-features/camera-tampering-detection" className="rounded-lg bg-card p-4 shadow transition-shadow hover:shadow-md">
                  <span className="font-mono text-xs uppercase tracking-wider text-primary">Live</span>
                  <p className="mt-1 font-display font-bold">Camera Tampering Detection</p>
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
                <Link href="/industries/energy" className="rounded-full bg-card px-4 py-2 text-sm font-medium shadow transition-shadow hover:shadow-md">Energy</Link>
                <Link href="/industries/remote-sites" className="rounded-full bg-card px-4 py-2 text-sm font-medium shadow transition-shadow hover:shadow-md">Remote Sites</Link>
                <Link href="/industries/construction-sites" className="rounded-full bg-card px-4 py-2 text-sm font-medium shadow transition-shadow hover:shadow-md">Construction Sites</Link>
                <Link href="/industries/waste-management" className="rounded-full bg-card px-4 py-2 text-sm font-medium shadow transition-shadow hover:shadow-md">Waste Management</Link>
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
