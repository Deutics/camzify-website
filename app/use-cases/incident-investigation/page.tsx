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
  title: "AI Incident Investigation | Security Footage Review",
  description: "Speed up incident investigation with timestamped AI detections, patrol logs, and structured alert data. Camzify provides the evidence chain. Book a demo.",
  path: "/use-cases/incident-investigation",
};

export const metadata = generatePageMeta({ ...pageMeta });

const faqs = [
  { question: "Can Camzify search footage for a specific person?", answer: "Forensic video search is on the product roadmap and not yet available. Currently, investigators use timestamped detection logs and AI attribute descriptions to narrow the search window significantly." },
  { question: "How far back can I review detection data?", answer: "Detection logs and patrol records are retained according to your configured retention policy. Video retention depends on your storage tier and can be configured in the platform's video backup and retention settings." },
];

export default function IncidentInvestigationPage() {
  return (
    <PageShell {...pageMeta} schema={[serviceSchema({ name: "AI Incident Investigation", description: "Speed up incident investigation with timestamped AI detections, patrol logs, and structured alert data. Camzify provides the evidence chain. Book a demo.", path: "/use-cases/incident-investigation" })]} faqs={faqs} breadcrumbs={[
      { label: 'Use Cases', href: '/use-cases' },
      { label: 'Incident Investigation' },
    ]}>
      <section className="pb-16">
        <div className="mx-auto max-w-site px-6">
          <h1 className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl">Incident Investigation</h1>
          <p className="mt-6 max-w-2xl text-body text-muted-foreground">
            Incident investigation in a video surveillance context is the process of using recorded footage, detection logs, and patrol records to reconstruct what happened during a security event — establishing timeline, identifying subjects, and documenting evidence.
          </p>

          <div className="mt-12 grid items-center gap-12 lg:grid-cols-2">
            <ScrollReveal>
              <div>
                <h2 className="font-display text-2xl font-bold">Why conventional CCTV fails</h2>
                <p className="mt-4 max-w-prose text-muted-foreground">Reviewing hours of footage from multiple cameras is the most time-consuming part of any incident investigation. Without timestamps and detection markers, investigators scrub through continuous recordings looking for the moment something happened.</p>
              </div>
            </ScrollReveal>
            <Image
              src="/incident-investigation.jpg" alt="Two security analysts reviewing multi-camera footage and a thermal-camera feed while investigating an incident" className="w-full rounded-xl"
              width={1229}
              height={692}
              priority
              sizes="(max-width: 1024px) 100vw, 60vw"
            />
          </div>

          <div className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">How Camzify handles it</h2>
              <div className="mt-4 max-w-prose text-muted-foreground" dangerouslySetInnerHTML={{ __html: `Every detection in Camzify is timestamped, tagged with the camera ID, detection type, and confidence score. <a href="/virtual-patrolling" class="text-primary hover:underline">Virtual patrol</a> logs create a structured timeline of what was verified and when. <a href="/ai-features/multi-object-tracking" class="text-primary hover:underline">Multi-object tracking</a> maintains identity across frames, and <a href="/ai-features/ai-attribute-extraction" class="text-primary hover:underline">AI attribute extraction</a> adds structured descriptions — clothing colour, object type, behaviour — to every detection event.` }} />
            </ScrollReveal>
          </div>

          <div className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">What a patrol round looks like</h2>
              <p className="mt-4 max-w-prose text-muted-foreground">After an incident, the investigator pulls the patrol logs for the relevant time window, reviews detection events with snapshots and timestamps, and uses attribute data to trace subject movement across cameras. The structured data significantly reduces the time from incident to report.</p>
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
                <Link href="/ai-features/ai-attribute-extraction" className="rounded-lg bg-card p-4 shadow transition-shadow hover:shadow-md">
                  <span className="font-mono text-xs uppercase tracking-wider text-primary">Live</span>
                  <p className="mt-1 font-display font-bold">AI Attribute Extraction</p>
                </Link>
                <Link href="/ai-features/zone-intrusion-detection" className="rounded-lg bg-card p-4 shadow transition-shadow hover:shadow-md">
                  <span className="font-mono text-xs uppercase tracking-wider text-primary">Live</span>
                  <p className="mt-1 font-display font-bold">Zone Intrusion Detection</p>
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
                <Link href="/industries/healthcare" className="rounded-full bg-card px-4 py-2 text-sm font-medium shadow transition-shadow hover:shadow-md">Healthcare</Link>
                <Link href="/industries/financial-services" className="rounded-full bg-card px-4 py-2 text-sm font-medium shadow transition-shadow hover:shadow-md">Financial Services</Link>
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
