import { generatePageMeta } from '@/lib/page-utils';
import { PageShell } from '@/components/layout/page-shell';
import { serviceSchema } from '@/lib/seo';
import { ScrollReveal } from '@/components/motion/scroll-reveal';
import { DeploymentPlan } from '@/components/content/deployment-plan';
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
  title: "AI Security for Retail | Video Surveillance",
  description: "Camzify provides AI-powered virtual patrolling and video analytics for retail — automated patrols, real-time alerts, and compliance reports.",
  path: "/industries/retail",
};

export const metadata = generatePageMeta({ ...pageMeta });

const deploymentPhases = [
    { title: "Start with the back-of-house doors", body: "Stockroom entrances, delivery bays and the safe area are added before the sales floor. These are the points where shrinkage originates and where existing cameras are already pointed." },
    { title: "Split trading and closed-hours rules", body: "One patrol sequence runs after close — everything locked, floor clear, no presence in the stockroom. A separate daytime schedule watches only the restricted zones, so trading-hours footfall never generates alerts." },
    { title: "Roll the same template across stores", body: "Once one location is tuned, the sequence and checklist are copied to the rest of the estate through multi-site management, so every branch is checked to an identical standard." },
];

const faqs = [
  { question: "Does Camzify detect shoplifting?", answer: "Camzify detects zone violations and unusual presence in restricted areas. It does not identify the specific act of concealing merchandise, but zone-based detection in high-shrinkage areas provides early warning." },
  { question: "Can I monitor multiple stores from one dashboard?", answer: "Yes. Camzify's multi-site management allows centralized monitoring and patrol scheduling across all locations." },
  { question: 'How long does it take to get a retail store live on Camzify?', answer: 'Most stores connect their existing cameras through the Camzify Connector or a direct RTSP feed, so there\'s no new hardware to install. Once the feeds are connected, zones and patrol schedules for the stockroom, back door, and sales floor are typically configured within a few days.' },
  { question: 'Will Camzify flag every customer walking past a stockroom camera?', answer: 'No. Detections are scoped to defined zones and time windows rather than the whole camera view, so a stockroom zone only triggers when someone enters it, and it can be scheduled to stay quiet during hours when staff are expected to be there. This keeps alert volume focused on genuine deviations instead of routine foot traffic.' },
  { question: 'Does Camzify store or identify customers in a way that raises privacy concerns?', answer: 'Camzify processes video from cameras you already operate and does not perform facial recognition or build customer identity profiles. Footage and alert clips are retained and access-controlled according to your account settings, and detections are based on presence, zones, and movement rather than personal identity.' },
  { question: 'How does Camzify compare to adding more loss prevention staff?', answer: 'A loss prevention hire covers one location during scheduled hours. Camzify runs the same zone checks continuously, across every connected store, without shift gaps or vacation coverage — and it\'s typically far cheaper per location than adding headcount. Many retailers use it to extend a smaller loss prevention team\'s reach rather than replace it outright.' },
];

export default function RetailPage() {
  return (
    <PageShell {...pageMeta} schema={[serviceSchema({ name: "AI Security for Retail", description: "Camzify provides AI-powered virtual patrolling and video analytics for retail — automated patrols, real-time alerts, and compliance reports.", path: "/industries/retail", audience: "Retail" })]} faqs={faqs} breadcrumbs={[
      { label: 'Industries', href: '/industries' },
      { label: 'Retail' },
    ]}>
      <section className="pb-16">
        <div className="mx-auto max-w-site px-6">
          <h1 className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl">AI Security for Retail</h1>
          <p className="mt-6 max-w-2xl text-body text-muted-foreground">
            Retail environments face security challenges that cameras alone cannot solve and manned guards cannot cover consistently. Camzify's <a href="/virtual-patrolling" className="text-primary hover:underline">virtual patrolling</a> system runs automated AI patrol rounds on your existing cameras — checking every point, flagging failures, and notifying the right person.
          </p>

          <div className="mt-12 grid items-center gap-12 lg:grid-cols-2">
            <ScrollReveal>
              <div>
                <h2 className="font-display text-2xl font-bold">Common retail security gaps Camzify closes:</h2>
                <ul className="mt-4 space-y-3 text-muted-foreground">
                  <li className="flex gap-2">• Stockrooms and back-of-house areas left unchecked during busy floor hours</li>
                  <li className="flex gap-2">• Back doors propped open for deliveries and never re-secured</li>
                  <li className="flex gap-2">• Fitting rooms and blind aisles with inconsistent camera coverage</li>
                  <li className="flex gap-2">• After-hours entry with no one on site to verify who's inside</li>
                  <li className="flex gap-2">• Multi-location chains with no centralized view of every store's status</li>
                  <li className="flex gap-2">• Loss prevention relying on manual video review after the fact</li>
                </ul>
              </div>
            </ScrollReveal>
            <SiteImage
              src="/ai-security-for-retail.jpg" alt="AI-monitored retail store showing bounding boxes tracking shoppers and bags on the sales floor, with mall and checkout scenes" className="w-full rounded-xl"
              width={1600}
              height={900}
              priority
              sizes="(max-width: 1024px) 100vw, 60vw"
            />
          </div>

          <div className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">Why retail needs continuous AI monitoring</h2>
              <div className="mt-4 space-y-4 max-w-prose text-muted-foreground">
                <p>A store's exposure isn't limited to trading hours. Deliveries arrive before opening, staff cycle in and out of the stockroom all day, and the building sits empty overnight with a back door, fire exit, and loading area that no one is watching. A manager doing a closing walkthrough checks the sales floor, not every blind corner.</p>
                <p>Standard CCTV records all of it, but nobody is reviewing hours of footage in real time — the recording only becomes useful after a loss has already happened, when it's too late to intervene. And a single loss prevention staffer, even a good one, can't be in the stockroom, at the back door, and on the sales floor at the same moment.</p>
                <p>Virtual patrolling closes that gap by running scheduled AI checks across every camera zone continuously — sales floor, stockroom, back door, and loading area — flagging deviations the instant they happen and logging every check, so gaps in coverage stop being invisible.</p>
              </div>
            </ScrollReveal>
          </div>

          <div className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">Three questions retail security teams ask</h2>
              <div className="mt-8 grid gap-6 md:grid-cols-3">
                <div className="rounded-xl bg-card p-6 shadow">
                  <p className="font-display text-lg font-bold italic">"Is someone in the stockroom who shouldn't be?"</p>
                  <p className="mt-3 text-sm text-muted-foreground">Camzify answers this with <Link href="/ai-features/zone-intrusion-detection" className="text-primary hover:underline">Zone Intrusion Detection</Link> and automated patrol verification.</p>
                </div>
                <div className="rounded-xl bg-card p-6 shadow">
                  <p className="font-display text-lg font-bold italic">"Is the back door propped open again?"</p>
                  <p className="mt-3 text-sm text-muted-foreground">Camzify answers this with <Link href="/ai-features/motion-detection" className="text-primary hover:underline">Motion Detection</Link> and automated patrol verification.</p>
                </div>
                <div className="rounded-xl bg-card p-6 shadow">
                  <p className="font-display text-lg font-bold italic">"Who was in the store after closing?"</p>
                  <p className="mt-3 text-sm text-muted-foreground">Camzify answers this with <Link href="/ai-features/multi-object-tracking" className="text-primary hover:underline">Multi-Object Tracking</Link> and automated patrol verification.</p>
                </div>
              </div>
            </ScrollReveal>
          </div>

          <div className="mt-16 grid items-center gap-12 lg:grid-cols-2">
            <PlaceholderVisual type="diagram" caption="RETAIL PATROL SEQUENCE" alt="Diagram of a retail patrol route stepping through the stockroom, back door, and sales floor" />
            <ScrollReveal>
              <div>
                <h2 className="font-display text-2xl font-bold">How Camzify works for retail</h2>

                <h3 className="mt-6 font-display text-lg font-bold">Building the patrol route</h3>
                <p className="mt-2 text-muted-foreground">
                  A patrol sequence is set up once, ordering every camera stop — stockroom, back door, fitting room corridor, sales floor — into a single route that runs on a configurable schedule.
                </p>

                <h3 className="mt-6 font-display text-lg font-bold">Checking each stop</h3>
                <p className="mt-2 text-muted-foreground">
                  At each stop, the AI checks the defined conditions for that camera using <Link href="/ai-features/zone-intrusion-detection" className="text-primary hover:underline">zone intrusion detection</Link>, <Link href="/ai-features/motion-detection" className="text-primary hover:underline">motion detection</Link>, and <Link href="/ai-features/multi-object-tracking" className="text-primary hover:underline">multi-object tracking</Link> — is the stockroom clear, is the back door secure, is anyone present after closing.
                </p>

                <h3 className="mt-6 font-display text-lg font-bold">Routing the alert</h3>
                <p className="mt-2 text-muted-foreground">
                  A failed check creates an actionable alert with a snapshot and timestamp, routed to the assigned store or regional contact, and logged alongside every other result in that round's patrol report.
                </p>
              </div>
            </ScrollReveal>
          </div>

          <div className="mt-16 grid items-center gap-12 lg:grid-cols-2">
            <ScrollReveal>
              <div>
                <h2 className="font-display text-2xl font-bold">What to configure for a retail site</h2>
                <p className="mt-4 text-muted-foreground">Most retail deployments start with:</p>
                <ul className="mt-4 space-y-3 text-muted-foreground">
                  <li className="flex gap-2">• Restricted zones over the stockroom, back office, and cash handling areas</li>
                  <li className="flex gap-2">• Back-door and loading-area rules tied to scheduled delivery windows</li>
                  <li className="flex gap-2">• After-hours presence detection across the full sales floor</li>
                  <li className="flex gap-2">• Multi-site rollout with shared zone templates across store formats</li>
                  <li className="flex gap-2">• Escalation routing to store management or a regional loss prevention contact</li>
                </ul>
              </div>
            </ScrollReveal>
            <PlaceholderVisual type="config-ui" caption="RETAIL ZONE SETUP" alt="Configuration panel showing stockroom and back-door zones mapped across a retail store camera layout" />
          </div>

          <div className="mt-16 grid items-center gap-12 lg:grid-cols-2">
            <PlaceholderVisual type="camera-feed" caption="RETAIL PATROL IN PROGRESS" alt="Camera feed showing an active patrol check at a retail store back door" />
            <ScrollReveal>
              <div>
                <h2 className="font-display text-2xl font-bold">Common scenarios</h2>
                <ul className="mt-4 space-y-3 text-muted-foreground">
                  <li className="flex gap-2">• A back door left propped open outside a scheduled delivery window</li>
                  <li className="flex gap-2">• Someone entering the stockroom during a period when staff aren't scheduled</li>
                  <li className="flex gap-2">• A person remaining on the sales floor after closing</li>
                  <li className="flex gap-2">• A fitting room corridor camera losing focus or coverage mid-shift</li>
                  <li className="flex gap-2">• Repeated presence near the cash office outside normal handling hours</li>
                </ul>
              </div>
            </ScrollReveal>
          </div>

          <div className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">Deployment notes</h2>
              <p className="mt-4 max-w-prose text-muted-foreground">Retail locations typically have existing camera infrastructure. Camzify connects to these cameras via RTSP or the Camzify Connector without additional hardware. Multi-site retail chains benefit from centralized management.</p>
            </ScrollReveal>
          </div>

          <DeploymentPlan phases={deploymentPhases} />

          <div className="mt-12">
            <ScrollReveal>
              <p className="text-muted-foreground">
                See how the numbers work for your retail facility with the <Link href="/roi-calculator" className="text-primary hover:underline">ROI calculator</Link>, or review <Link href="/pricing" className="text-primary hover:underline">pricing</Link> to understand the per-camera licensing model.
              </p>
            </ScrollReveal>
          </div>

          <div className="mt-16">
            <div className="grid gap-6 sm:grid-cols-3">
              <div className="rounded-xl border border-border bg-card p-6 text-center">
                <h3 className="font-display text-lg font-bold">AI Features used here</h3>
                <div className="mt-4 flex flex-wrap justify-center gap-2">
                  <Link href="/ai-features/zone-intrusion-detection" className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm hover:border-primary/30 hover:text-primary">Zone Intrusion Detection</Link>
                  <Link href="/ai-features/motion-detection" className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm hover:border-primary/30 hover:text-primary">Motion Detection</Link>
                  <Link href="/ai-features/multi-object-tracking" className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm hover:border-primary/30 hover:text-primary">Multi-Object Tracking</Link>
                  <Link href="/ai-features/ai-attribute-extraction" className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm hover:border-primary/30 hover:text-primary">AI Attribute Extraction</Link>
                </div>
              </div>
              <div className="rounded-xl border border-border bg-card p-6 text-center">
                <h3 className="font-display text-lg font-bold">Related use cases</h3>
                <div className="mt-4 flex flex-wrap justify-center gap-2">
                  <Link href="/use-cases/theft-prevention" className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm hover:border-primary/30 hover:text-primary">Theft Prevention</Link>
                  <Link href="/use-cases/after-hours-monitoring" className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm hover:border-primary/30 hover:text-primary">After-Hours Monitoring</Link>
                  <Link href="/use-cases/vandalism-prevention" className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm hover:border-primary/30 hover:text-primary">Vandalism Prevention</Link>
                </div>
              </div>
              <div className="rounded-xl border border-border bg-card p-6 text-center">
                <h3 className="font-display text-lg font-bold">Related industries</h3>
                <div className="mt-4 flex flex-wrap justify-center gap-2">
                  <Link href="/industries/restaurants" className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm hover:border-primary/30 hover:text-primary">Restaurants</Link>
                  <Link href="/industries/financial-services" className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm hover:border-primary/30 hover:text-primary">Financial Services</Link>
                  <Link href="/industries/property-management" className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm hover:border-primary/30 hover:text-primary">Property Management</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-muted/30 py-16 sm:py-20">
        <div className="mx-auto max-w-site px-6 text-center">
          <h2 className="font-display text-2xl font-bold sm:text-3xl">Frequently asked questions</h2>
          <div className="mx-auto mt-8 max-w-3xl text-left">
            <FAQAccordion items={faqs} />
          </div>
        </div>
      </section>
    </PageShell>
  );
}
