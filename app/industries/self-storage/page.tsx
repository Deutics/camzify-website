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
  title: "AI Security for Self-Storage | Video Surveillance",
  description: "Camzify provides AI-powered virtual patrolling and video analytics for self-storage — automated patrols, real-time alerts, and compliance reports.",
  path: "/industries/self-storage",
};

export const metadata = generatePageMeta({ ...pageMeta });

const deploymentPhases = [
    { title: "Cover the corridors and gate", body: "Access gate, corridors, lift lobbies and external unit rows are onboarded first — largely unstaffed spaces where cameras already exist but nothing watches them live." },
    { title: "Patrol continuously, not just overnight", body: "Because these sites are lightly staffed all day, rounds run on a frequent schedule around the clock rather than only after hours." },
    { title: "Log every access anomaly", body: "Tailgating at the gate, presence in a corridor outside access hours and tampered cameras are recorded against the round, giving a dated record for any customer dispute." },
];

const faqs = [
  { question: "Does Camzify replace the need for an on-site guard?", answer: "For many self-storage facilities, yes. Automated patrols provide more consistent coverage than a single guard. The cost comparison is significant — see the ROI calculator." },
  { question: 'How does Camzify handle a site spread across multiple buildings and drive-up aisles?', answer: 'Every connected camera, regardless of building or aisle, is added to a single patrol route with its own zone and schedule rules. A facility with a front office, several storage buildings, and an open drive-up area runs as one coordinated round instead of separate, disconnected feeds.' },
  { question: 'Will Camzify alert on every tenant driving through the gate?', answer: 'No. Gate and perimeter rules are scoped to specific conditions — such as entry outside the facility\'s posted access hours, or a vehicle without a matching access event — rather than flagging routine tenant traffic during normal hours.' },
  { question: 'Does Camzify keep a record we can hand to law enforcement after a break-in?', answer: 'Yes. Every alert is logged with a timestamped snapshot or clip, and the patrol report shows exactly which zones were checked and when. That record can be pulled and shared as evidence to support a police report or insurance claim.' },
  { question: 'How quickly is a gate breach or unit tampering flagged overnight?', answer: 'Alerts fire in near real time from the moment a confirmed event is detected — typically within seconds — and route to the on-call contact with a timestamped clip, rather than waiting for someone to review footage the next morning.' },
  { question: 'Is Camzify cheaper than staffing overnight security at a self-storage facility?', answer: 'For most sites, yes. A single overnight guard covers one facility for one shift. Camzify runs continuous automated checks across every camera on the property at a fraction of the cost, and scales across multiple facilities without adding headcount for each one.' },
];

export default function SelfStoragePage() {
  return (
    <PageShell {...pageMeta} schema={[serviceSchema({ name: "AI Security for Self-Storage", description: "Camzify provides AI-powered virtual patrolling and video analytics for self-storage — automated patrols, real-time alerts, and compliance reports.", path: "/industries/self-storage", audience: "Self Storage" })]} faqs={faqs} breadcrumbs={[
      { label: 'Industries', href: '/industries' },
      { label: 'Self-Storage' },
    ]}>
      <section className="pb-16">
        <div className="mx-auto max-w-site px-6">
          <h1 className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl">AI Security for Self-Storage</h1>
          <p className="mt-6 max-w-2xl text-body text-muted-foreground">
            Self-storage facilities face security challenges that cameras alone cannot solve and manned guards cannot cover consistently. Camzify's <a href="/virtual-patrolling" className="text-primary hover:underline">virtual patrolling</a> system runs automated AI patrol rounds on your existing cameras — checking every point, flagging failures, and notifying the right person.
          </p>

          <div className="mt-12 grid items-center gap-12 lg:grid-cols-2">
            <ScrollReveal>
              <div>
                <h2 className="font-display text-2xl font-bold">Common self-storage security gaps Camzify closes:</h2>
                <ul className="mt-4 space-y-3 text-muted-foreground">
                  <li className="flex gap-2">• Unmanned office hours leaving hallways and gate access unwatched most of the day</li>
                  <li className="flex gap-2">• Gate codes shared or tailgated by vehicles that never checked in</li>
                  <li className="flex gap-2">• Unit break-ins that go unnoticed until the tenant's next visit</li>
                  <li className="flex gap-2">• Perimeter fencing with no continuous overnight coverage</li>
                  <li className="flex gap-2">• Camera outages in remote drive-up aisles going unnoticed for days</li>
                  <li className="flex gap-2">• No audit trail proving a patrol actually happened</li>
                </ul>
              </div>
            </ScrollReveal>
            <PlaceholderVisual type="industry" caption="SELF-STORAGE" alt="Security monitoring in a self-storage environment" />
          </div>

          <div className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">Why self-storage needs continuous AI monitoring</h2>
              <div className="mt-4 space-y-4 max-w-prose text-muted-foreground">
                <p>Most self-storage facilities are unmanned outside a short window of office hours, yet tenants can access units around the clock. That leaves gates, drive-up aisles, and hallways running unsupervised for the majority of every day, on a site that's often spread across several acres and multiple buildings.</p>
                <p>A gate code or keycard controls entry, but it doesn't stop tailgating, and it doesn't tell anyone if a unit door has been forced open in an aisle no one walks past until the next scheduled visit. Plain CCTV records the aisle either way — it just doesn't tell anyone in time to matter.</p>
                <p>Virtual patrolling covers the gap by running scheduled AI checks across every gate, aisle, and perimeter camera on the property, flagging tailgating, forced entry, and camera tampering as they happen instead of during the next manual walkthrough.</p>
              </div>
            </ScrollReveal>
          </div>

          <div className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">Three questions self-storage security teams ask</h2>
              <div className="mt-8 grid gap-6 md:grid-cols-3">
                <div className="rounded-xl bg-card p-6 shadow">
                  <p className="font-display text-lg font-bold italic">"Is someone at the facility who shouldn't be there?"</p>
                  <p className="mt-3 text-sm text-muted-foreground">Camzify answers this with <Link href="/ai-features/zone-intrusion-detection" className="text-primary hover:underline">Zone Intrusion Detection</Link> and automated patrol verification.</p>
                </div>
                <div className="rounded-xl bg-card p-6 shadow">
                  <p className="font-display text-lg font-bold italic">"Has the gate been breached overnight?"</p>
                  <p className="mt-3 text-sm text-muted-foreground">Camzify answers this with <Link href="/ai-features/line-intrusion-detection" className="text-primary hover:underline">Line Intrusion Detection</Link> and automated patrol verification.</p>
                </div>
                <div className="rounded-xl bg-card p-6 shadow">
                  <p className="font-display text-lg font-bold italic">"Were all hallway cameras checked in the last patrol?"</p>
                  <p className="mt-3 text-sm text-muted-foreground">Camzify answers this with <Link href="/ai-features/motion-detection" className="text-primary hover:underline">Motion Detection</Link> and automated patrol verification.</p>
                </div>
              </div>
            </ScrollReveal>
          </div>

          <div className="mt-16 grid items-center gap-12 lg:grid-cols-2">
            <PlaceholderVisual type="diagram" caption="SELF-STORAGE PATROL SEQUENCE" alt="Diagram of a self-storage patrol route stepping through the gate, drive-up aisles, and hallways" />
            <ScrollReveal>
              <div>
                <h2 className="font-display text-2xl font-bold">How Camzify works for self-storage</h2>

                <h3 className="mt-6 font-display text-lg font-bold">Building the patrol route</h3>
                <p className="mt-2 text-muted-foreground">
                  A patrol sequence is set up once, ordering every camera stop — entry gate, drive-up aisles, interior hallways, perimeter fence line — into a single route that runs on a configurable schedule.
                </p>

                <h3 className="mt-6 font-display text-lg font-bold">Checking each stop</h3>
                <p className="mt-2 text-muted-foreground">
                  At each stop, the AI checks the defined conditions for that camera using <Link href="/ai-features/zone-intrusion-detection" className="text-primary hover:underline">zone</Link> and <Link href="/ai-features/line-intrusion-detection" className="text-primary hover:underline">line intrusion detection</Link> alongside <Link href="/ai-features/motion-detection" className="text-primary hover:underline">motion detection</Link> — is the gate secure, is the aisle clear, is anyone present who shouldn't be.
                </p>

                <h3 className="mt-6 font-display text-lg font-bold">Routing the alert</h3>
                <p className="mt-2 text-muted-foreground">
                  A failed check creates an actionable alert with a snapshot and timestamp, routed to the on-call facility contact, and logged alongside every other result in that round's patrol report.
                </p>
              </div>
            </ScrollReveal>
          </div>

          <div className="mt-16 grid items-center gap-12 lg:grid-cols-2">
            <ScrollReveal>
              <div>
                <h2 className="font-display text-2xl font-bold">What to configure for a self-storage site</h2>
                <p className="mt-4 text-muted-foreground">Most self-storage deployments start with:</p>
                <ul className="mt-4 space-y-3 text-muted-foreground">
                  <li className="flex gap-2">• Gate and entry zones with schedule rules tied to posted access hours</li>
                  <li className="flex gap-2">• Line rules across drive-up aisles and vehicle gates</li>
                  <li className="flex gap-2">• Hallway motion schedules covering interior corridors between buildings</li>
                  <li className="flex gap-2">• After-hours patrol frequency, typically every 30-60 minutes overnight</li>
                  <li className="flex gap-2">• Escalation routing to the on-call facility manager for critical alerts</li>
                </ul>
              </div>
            </ScrollReveal>
            <PlaceholderVisual type="config-ui" caption="SELF-STORAGE ZONE SETUP" alt="Configuration panel showing gate and aisle zones mapped across a self-storage facility camera layout" />
          </div>

          <div className="mt-16 grid items-center gap-12 lg:grid-cols-2">
            <PlaceholderVisual type="camera-feed" caption="SELF-STORAGE PATROL IN PROGRESS" alt="Camera feed showing an active patrol check at a self-storage facility gate" />
            <ScrollReveal>
              <div>
                <h2 className="font-display text-2xl font-bold">Common scenarios</h2>
                <ul className="mt-4 space-y-3 text-muted-foreground">
                  <li className="flex gap-2">• A vehicle tailgating through the gate behind a tenant with valid access</li>
                  <li className="flex gap-2">• A unit door found open outside a tenant's scheduled visit</li>
                  <li className="flex gap-2">• A vehicle idling near the office after posted access hours</li>
                  <li className="flex gap-2">• A camera in a remote drive-up aisle going dark or losing focus</li>
                  <li className="flex gap-2">• Perimeter fence crossings during overnight hours</li>
                </ul>
              </div>
            </ScrollReveal>
          </div>

          <div className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">Deployment notes</h2>
              <p className="mt-4 max-w-prose text-muted-foreground">Self-storage facilities are typically unmanned outside office hours. Cameras cover perimeter gates, hallways, and loading areas. Camzify provides the overnight monitoring that would otherwise require an on-site guard.</p>
            </ScrollReveal>
          </div>

          <DeploymentPlan phases={deploymentPhases} />

          <div className="mt-12">
            <ScrollReveal>
              <p className="text-muted-foreground">
                See how the numbers work for your self-storage facility with the <Link href="/roi-calculator" className="text-primary hover:underline">ROI calculator</Link>, or review <Link href="/pricing" className="text-primary hover:underline">pricing</Link> to understand the per-camera licensing model.
              </p>
            </ScrollReveal>
          </div>

          <div className="mt-16">
            <div className="grid gap-6 sm:grid-cols-3">
              <div className="rounded-xl border border-border bg-card p-6 text-center">
                <h3 className="font-display text-lg font-bold">AI Features used here</h3>
                <div className="mt-4 flex flex-wrap justify-center gap-2">
                  <Link href="/ai-features/zone-intrusion-detection" className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm hover:border-primary/30 hover:text-primary">Zone Intrusion Detection</Link>
                  <Link href="/ai-features/line-intrusion-detection" className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm hover:border-primary/30 hover:text-primary">Line Intrusion Detection</Link>
                  <Link href="/ai-features/motion-detection" className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm hover:border-primary/30 hover:text-primary">Motion Detection</Link>
                  <Link href="/ai-features/camera-tampering-detection" className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm hover:border-primary/30 hover:text-primary">Camera Tampering Detection</Link>
                </div>
              </div>
              <div className="rounded-xl border border-border bg-card p-6 text-center">
                <h3 className="font-display text-lg font-bold">Related use cases</h3>
                <div className="mt-4 flex flex-wrap justify-center gap-2">
                  <Link href="/use-cases/after-hours-monitoring" className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm hover:border-primary/30 hover:text-primary">After-Hours Monitoring</Link>
                  <Link href="/use-cases/trespassing-detection" className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm hover:border-primary/30 hover:text-primary">Trespassing Detection</Link>
                  <Link href="/use-cases/perimeter-security" className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm hover:border-primary/30 hover:text-primary">Perimeter Security</Link>
                </div>
              </div>
              <div className="rounded-xl border border-border bg-card p-6 text-center">
                <h3 className="font-display text-lg font-bold">Related industries</h3>
                <div className="mt-4 flex flex-wrap justify-center gap-2">
                  <Link href="/industries/property-management" className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm hover:border-primary/30 hover:text-primary">Property Management</Link>
                  <Link href="/industries/residential" className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm hover:border-primary/30 hover:text-primary">Residential</Link>
                  <Link href="/industries/waste-management" className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm hover:border-primary/30 hover:text-primary">Waste Management</Link>
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
