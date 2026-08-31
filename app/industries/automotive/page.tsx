import { generatePageMeta } from '@/lib/page-utils';
import { PageShell } from '@/components/layout/page-shell';
import { serviceSchema } from '@/lib/seo';
import { ScrollReveal } from '@/components/motion/scroll-reveal';
import { DeploymentPlan } from '@/components/content/deployment-plan';
import { PlaceholderVisual } from '@/components/content/placeholder-visual';
import { FAQAccordion } from '@/components/content/faq-accordion';
import Link from 'next/link';

/**
 * Page identity. Declared once and consumed twice: by `generatePageMeta` for the
 * <head> tags, and by `PageShell` for the on-page structured data. Keeping it in one
 * const is what stops the meta description and the schema drifting apart.
 */
const pageMeta = {
  title: "AI Security for Automotive | Video Surveillance",
  description: "Camzify provides AI-powered virtual patrolling and video analytics for automotive — automated patrols, real-time alerts, and compliance reports.",
  path: "/industries/automotive",
};

export const metadata = generatePageMeta({ ...pageMeta });

const deploymentPhases = [
    { title: "Cover the lot before the showroom", body: "Forecourt, compound and overflow storage cameras are onboarded first — open stock is the exposure, and the vehicles sit outside long after the site closes." },
    { title: "Patrol the perimeter overnight", body: "Rounds check the lot boundary, gates and vehicle rows on the hours the site is unstaffed, with directional rules so passing street traffic does not trigger alerts." },
    { title: "Add condition and movement records", body: "Vehicle damage and movement detections give a dated visual record of stock condition, which is the evidence usually missing when a dispute surfaces days later." },
];

const faqs = [
  { question: "Can Camzify track vehicle movement in a storage yard?", answer: "Yes. Multi-object tracking identifies vehicles in the camera frame. Zone detection can alert on vehicle presence in restricted areas or during unauthorized hours." },
  { question: "How does Camzify handle glare and reflections off vehicle bodywork?", answer: "The detection models are trained to separate genuine motion and object presence from glare, headlight flare, and reflective surfaces, which is a common false-positive source on lots full of glass and painted metal. Camera placement and angle still matter, and Camzify's setup process flags stops where glare is likely to interfere so they can be adjusted before go-live." },
  { question: "Can Camzify integrate with our existing dealership camera system?", answer: "In most cases, yes. Camzify connects to any camera streaming RTSP or HLS, and the Camzify Connector can bridge older NVR-based systems that do not expose a stream directly. There is no need to replace existing lot, showroom, or service bay cameras to get started." },
  { question: "Does Camzify replace our overnight lot attendant?", answer: "For most dealerships and service centers, it reduces the need to add or scale overnight attendance rather than removing an existing team overnight. Virtual patrolling covers the full yard on a fixed schedule, which complements a smaller on-site presence and covers hours or areas a single attendant cannot watch continuously." },
  { question: "Is customer and employee footage handled in compliance with privacy regulations?", answer: "Camzify processes the video feeds you already operate under your own camera policy and does not introduce new recording where none previously existed. Access to footage and alerts is controlled through role-based permissions, and retention follows your configured settings." },
  { question: "How does the system avoid false alerts from passing traffic near the lot?", answer: "Zone and line rules are drawn to the actual boundaries of your property, so activity on an adjacent road or sidewalk outside the defined area does not trigger a check failure. Detection sensitivity and zone shape are adjustable per camera during setup to match the specific layout of the lot." },
];

export default function AutomotivePage() {
  return (
    <PageShell {...pageMeta} schema={[serviceSchema({ name: "AI Security for Automotive", description: "Camzify provides AI-powered virtual patrolling and video analytics for automotive — automated patrols, real-time alerts, and compliance reports.", path: "/industries/automotive", audience: "Automotive" })]} faqs={faqs} breadcrumbs={[
      { label: 'Industries', href: '/industries' },
      { label: 'Automotive' },
    ]}>
      <section className="pb-16">
        <div className="mx-auto max-w-site px-6">
          <h1 className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl">AI Security for Automotive</h1>
          <p className="mt-6 max-w-2xl text-body text-muted-foreground">
            Automotive facilities face security challenges that cameras alone cannot solve and manned guards cannot cover consistently. Camzify's <a href="/virtual-patrolling" className="text-primary hover:underline">virtual patrolling</a> system runs automated AI patrol rounds on your existing cameras — checking every point, flagging failures, and notifying the right person.
          </p>

          <div className="mt-12 grid items-center gap-12 lg:grid-cols-2">
            <ScrollReveal>
              <div>
                <h2 className="font-display text-2xl font-bold">Common automotive security gaps Camzify closes:</h2>
                <ul className="mt-4 space-y-3 text-muted-foreground">
                  <li className="flex gap-2">• Vehicle storage yards with high-value inventory sitting unmonitored overnight</li>
                  <li className="flex gap-2">• Showroom entrances left unchecked after closing</li>
                  <li className="flex gap-2">• Service bay doors and roller shutters not confirmed closed at shift end</li>
                  <li className="flex gap-2">• Perimeter fencing around outdoor vehicle lots with no continuous coverage</li>
                  <li className="flex gap-2">• Parts and tool storage areas relying on a single closing walkthrough</li>
                  <li className="flex gap-2">• Camera outages on yard-facing cameras going unnoticed for hours</li>
                </ul>
              </div>
            </ScrollReveal>
            <PlaceholderVisual type="industry" caption="AUTOMOTIVE" alt="Security monitoring in a automotive environment" />
          </div>

          <div className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">Why automotive needs continuous AI monitoring</h2>
              <div className="mt-4 space-y-4 max-w-prose text-muted-foreground">
                <p>Dealership lots and service centers hold some of the highest-value mobile assets on any commercial property, spread across large outdoor yards that are difficult for a single attendant to watch in full. A vehicle can be moved, damaged, or driven off a lot in the time it takes a guard to walk the opposite end of the site.</p>
                <p>Plain CCTV records the yard around the clock but only gets reviewed after something has already gone missing — by then the vehicle, and any chance of recovery, is long gone. A guard walking a fixed route covers the property for a few minutes each hour at best, leaving showroom entrances, service bays, and back rows of inventory unwatched the rest of the time.</p>
                <p>Continuous AI monitoring closes that gap by checking every yard row, entrance, and bay door on a repeating schedule, day and night, and raising an alert the moment something falls outside the expected pattern — without needing a person physically present at every stop.</p>
              </div>
            </ScrollReveal>
          </div>

          <div className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">Three questions automotive security teams ask</h2>
              <div className="mt-8 grid gap-6 md:grid-cols-3">
                <div className="rounded-xl bg-card p-6 shadow">
                  <p className="font-display text-lg font-bold italic">"Is anyone in the vehicle storage yard after hours?"</p>
                  <p className="mt-3 text-sm text-muted-foreground">Camzify answers this with <Link href="/ai-features/zone-intrusion-detection" className="text-primary hover:underline">Zone Intrusion Detection</Link> and automated patrol verification.</p>
                </div>
                <div className="rounded-xl bg-card p-6 shadow">
                  <p className="font-display text-lg font-bold italic">"Has the showroom been checked since closing?"</p>
                  <p className="mt-3 text-sm text-muted-foreground">Camzify answers this with <Link href="/ai-features/multi-object-tracking" className="text-primary hover:underline">Multi-Object Tracking</Link> and automated patrol verification.</p>
                </div>
                <div className="rounded-xl bg-card p-6 shadow">
                  <p className="font-display text-lg font-bold italic">"Are all service bay doors closed overnight?"</p>
                  <p className="mt-3 text-sm text-muted-foreground">Camzify answers this with <Link href="/ai-features/line-intrusion-detection" className="text-primary hover:underline">Line Intrusion Detection</Link> and automated patrol verification.</p>
                </div>
              </div>
            </ScrollReveal>
          </div>

          <div className="mt-16 grid items-center gap-12 lg:grid-cols-2">
            <PlaceholderVisual type="diagram" caption="AUTOMOTIVE PATROL SEQUENCE" alt="Diagram of an automotive patrol route stepping through the vehicle yard, showroom, and service bays" />
            <ScrollReveal>
              <div>
                <h2 className="font-display text-2xl font-bold">How Camzify works for automotive</h2>

                <h3 className="mt-6 font-display text-lg font-bold">Building the patrol route</h3>
                <p className="mt-2 text-muted-foreground">
                  A patrol sequence is set up once, ordering every camera stop — vehicle storage rows, showroom entrances, service bay doors, perimeter fencing — into a single route that runs on a configurable schedule.
                </p>

                <h3 className="mt-6 font-display text-lg font-bold">Checking each stop</h3>
                <p className="mt-2 text-muted-foreground">
                  At each stop, the AI checks the defined conditions for that camera using <Link href="/ai-features/zone-intrusion-detection" className="text-primary hover:underline">zone intrusion detection</Link> and <Link href="/ai-features/multi-object-tracking" className="text-primary hover:underline">multi-object tracking</Link> — is the yard clear, is a vehicle out of place, is the showroom entrance secure.
                </p>

                <h3 className="mt-6 font-display text-lg font-bold">Routing the alert</h3>
                <p className="mt-2 text-muted-foreground">
                  A failed check — such as a <Link href="/ai-features/line-intrusion-detection" className="text-primary hover:underline">line intrusion</Link> at a service bay door — creates an actionable alert with a snapshot and timestamp, routed to the assigned security contact and logged in that round's patrol report.
                </p>
              </div>
            </ScrollReveal>
          </div>

          <div className="mt-16 grid items-center gap-12 lg:grid-cols-2">
            <ScrollReveal>
              <div>
                <h2 className="font-display text-2xl font-bold">What to configure for an automotive site</h2>
                <p className="mt-4 text-muted-foreground">Most automotive deployments start with:</p>
                <ul className="mt-4 space-y-3 text-muted-foreground">
                  <li className="flex gap-2">• Yard zones covering vehicle storage rows with after-hours activation</li>
                  <li className="flex gap-2">• Perimeter line rules along fencing and vehicle entry and exit gates</li>
                  <li className="flex gap-2">• Restricted zones over parts storage and service bay interiors</li>
                  <li className="flex gap-2">• A closing-time checklist confirming showroom doors and roller shutters</li>
                  <li className="flex gap-2">• Escalation routing to the on-call manager for yard breaches</li>
                </ul>
              </div>
            </ScrollReveal>
            <PlaceholderVisual type="config-ui" caption="AUTOMOTIVE ZONE SETUP" alt="Configuration panel showing vehicle yard and service bay zones mapped across an automotive camera layout" />
          </div>

          <div className="mt-16 grid items-center gap-12 lg:grid-cols-2">
            <PlaceholderVisual type="camera-feed" caption="AUTOMOTIVE PATROL IN PROGRESS" alt="Camera feed showing an active patrol check at an automotive dealership vehicle yard" />
            <ScrollReveal>
              <div>
                <h2 className="font-display text-2xl font-bold">Common scenarios</h2>
                <ul className="mt-4 space-y-3 text-muted-foreground">
                  <li className="flex gap-2">• A vehicle moved within the storage yard outside business hours</li>
                  <li className="flex gap-2">• A service bay door left open after the last technician clocks out</li>
                  <li className="flex gap-2">• Someone lingering near the showroom entrance after closing</li>
                  <li className="flex gap-2">• A perimeter gate left unlatched following a delivery</li>
                  <li className="flex gap-2">• A camera covering the yard losing focus or being repositioned</li>
                </ul>
              </div>
            </ScrollReveal>
          </div>

          <div className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">Deployment notes</h2>
              <p className="mt-4 max-w-prose text-muted-foreground">Automotive dealerships and service centres have large outdoor areas with high-value inventory. Perimeter cameras, yard cameras, and showroom cameras can all be connected to Camzify for automated overnight patrols.</p>
            </ScrollReveal>
          </div>

          <DeploymentPlan phases={deploymentPhases} />

          <div className="mt-12">
            <ScrollReveal>
              <p className="text-muted-foreground">
                See how the numbers work for your automotive facility with the <Link href="/roi-calculator" className="text-primary hover:underline">ROI calculator</Link>, or review <Link href="/pricing" className="text-primary hover:underline">pricing</Link> to understand the per-camera licensing model.
              </p>
            </ScrollReveal>
          </div>

          <div className="mt-16">
            <div className="grid gap-6 sm:grid-cols-3">
              <div className="rounded-xl border border-border bg-card p-6 text-center">
                <h3 className="font-display text-lg font-bold">AI Features used here</h3>
                <div className="mt-4 flex flex-wrap justify-center gap-2">
                  <Link href="/ai-features/zone-intrusion-detection" className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm hover:border-primary/30 hover:text-primary">Zone Intrusion Detection</Link>
                  <Link href="/ai-features/multi-object-tracking" className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm hover:border-primary/30 hover:text-primary">Multi-Object Tracking</Link>
                  <Link href="/ai-features/line-intrusion-detection" className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm hover:border-primary/30 hover:text-primary">Line Intrusion Detection</Link>
                  <Link href="/ai-features/camera-tampering-detection" className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm hover:border-primary/30 hover:text-primary">Camera Tampering Detection</Link>
                </div>
              </div>
              <div className="rounded-xl border border-border bg-card p-6 text-center">
                <h3 className="font-display text-lg font-bold">Related use cases</h3>
                <div className="mt-4 flex flex-wrap justify-center gap-2">
                  <Link href="/use-cases/vehicle-monitoring" className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm hover:border-primary/30 hover:text-primary">Vehicle Monitoring</Link>
                  <Link href="/use-cases/theft-prevention" className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm hover:border-primary/30 hover:text-primary">Theft Prevention</Link>
                  <Link href="/use-cases/perimeter-security" className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm hover:border-primary/30 hover:text-primary">Perimeter Security</Link>
                </div>
              </div>
              <div className="rounded-xl border border-border bg-card p-6 text-center">
                <h3 className="font-display text-lg font-bold">Related industries</h3>
                <div className="mt-4 flex flex-wrap justify-center gap-2">
                  <Link href="/industries/manufacturing" className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm hover:border-primary/30 hover:text-primary">Manufacturing</Link>
                  <Link href="/industries/warehouses" className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm hover:border-primary/30 hover:text-primary">Warehouses</Link>
                  <Link href="/industries/energy" className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm hover:border-primary/30 hover:text-primary">Energy</Link>
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
