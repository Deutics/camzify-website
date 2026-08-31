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
  title: "AI Security for Waste Management | Video Surveillance",
  description: "Camzify provides AI-powered virtual patrolling and video analytics for waste management — automated patrols, real-time alerts, and compliance reports.",
  path: "/industries/waste-management",
};

export const metadata = generatePageMeta({ ...pageMeta });

const deploymentPhases = [
    { title: "Cover the weighbridge and tipping areas", body: "Gate, weighbridge, tipping floor and scrap storage are onboarded first — the points where unauthorised dumping and metal theft concentrate." },
    { title: "Patrol closed hours and the boundary", body: "Rounds check that the gate is secured, the yard is clear and the fence line is unbreached during the long stretches when the site is shut." },
    { title: "Record vehicle activity", body: "Vehicle and wrong-way rules on the approach and weighbridge lanes give a timestamped record of movements outside operating hours." },
];

const faqs = [
  { question: "Can Camzify detect illegal dumping?", answer: "Camzify detects vehicle and person presence in zones that should be empty. If someone enters the site after hours with a vehicle, the system alerts immediately — providing the evidence needed for enforcement." },
  { question: 'How long does setup take for a waste management or transfer station site?', answer: 'Existing cameras connect through the Camzify Connector or a direct RTSP feed, so no new camera hardware is required in most cases. Perimeter, gate, and yard zones are typically mapped and scheduled within a few days of connecting the feeds.' },
  { question: 'Will Camzify flag every truck that comes through during the day?', answer: 'No. Zones and schedules are configured around expected activity, so a gate or transfer area active during business hours can run different rules than the same zone overnight. Detections focus on activity outside those expected windows rather than routine daytime traffic.' },
  { question: 'Can the alerts and footage be used as evidence for enforcement action?', answer: 'Yes. Every confirmed detection is logged with a timestamped snapshot or clip and recorded in the patrol report, giving you a documented record of when and where an unauthorized vehicle or person was on site — useful for reporting illegal dumping or trespassing to the relevant authority.' },
  { question: 'How does Camzify handle sites with large, open yards and limited lighting?', answer: 'Camzify works with whatever camera feeds you already have covering the yard, gates, and perimeter. Detection zones and line rules are configured to the actual camera views, and patrol frequency can be increased for lower-visibility periods such as overnight or early-morning hours.' },
  { question: 'Is Camzify a realistic alternative to hiring a site guard for after-hours coverage?', answer: 'For most waste management and transfer sites, yes. A guard covers the property for one shift at a time. Camzify runs the same perimeter and zone checks continuously, across the entire site, at a lower ongoing cost — and many operators use it specifically to cover the overnight and weekend hours a guard schedule doesn\'t reach.' },
];

export default function WasteManagementPage() {
  return (
    <PageShell {...pageMeta} schema={[serviceSchema({ name: "AI Security for Waste Management", description: "Camzify provides AI-powered virtual patrolling and video analytics for waste management — automated patrols, real-time alerts, and compliance reports.", path: "/industries/waste-management", audience: "Waste Management" })]} faqs={faqs} breadcrumbs={[
      { label: 'Industries', href: '/industries' },
      { label: 'Waste Management' },
    ]}>
      <section className="pb-16">
        <div className="mx-auto max-w-site px-6">
          <h1 className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl">AI Security for Waste Management</h1>
          <p className="mt-6 max-w-2xl text-body text-muted-foreground">
            Waste management sites face security challenges that cameras alone cannot solve and manned guards cannot cover consistently. Camzify's <a href="/virtual-patrolling" className="text-primary hover:underline">virtual patrolling</a> system runs automated AI patrol rounds on your existing cameras — checking every point, flagging failures, and notifying the right person.
          </p>

          <div className="mt-12 grid items-center gap-12 lg:grid-cols-2">
            <ScrollReveal>
              <div>
                <h2 className="font-display text-2xl font-bold">Common waste management security gaps Camzify closes:</h2>
                <ul className="mt-4 space-y-3 text-muted-foreground">
                  <li className="flex gap-2">• Illegal dumping after hours going undetected until the next business day</li>
                  <li className="flex gap-2">• Perimeter fence lines with no continuous coverage across large, open sites</li>
                  <li className="flex gap-2">• Unauthorized vehicles entering through unmanned or unstaffed gates</li>
                  <li className="flex gap-2">• Scrap and recyclable material theft from unattended stockpiles</li>
                  <li className="flex gap-2">• Camera outages in exposed, remote yard locations going unnoticed</li>
                  <li className="flex gap-2">• No audit trail proving perimeter checks actually happened</li>
                </ul>
              </div>
            </ScrollReveal>
            <PlaceholderVisual type="industry" caption="WASTE MANAGEMENT" alt="Security monitoring in a waste management environment" />
          </div>

          <div className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">Why waste management needs continuous AI monitoring</h2>
              <div className="mt-4 space-y-4 max-w-prose text-muted-foreground">
                <p>Transfer stations, landfills, and recycling yards tend to sit on large open sites with long fence lines, multiple gates, and material that has real resale value sitting in the open. Most of these sites run staffed operations for a defined shift and then sit largely unattended overnight and on weekends.</p>
                <p>A fence and a locked gate slow down illegal dumping and trespassing, but they don't stop it, and they don't tell anyone when it happens. Plain CCTV covering the yard records the event, but by the time someone reviews the footage, the dumped material is already there and the vehicle is long gone.</p>
                <p>Virtual patrolling closes that window by running scheduled AI checks across the perimeter, gates, and yard continuously, flagging unauthorized vehicles or people the moment they appear and producing a timestamped record that supports enforcement action.</p>
              </div>
            </ScrollReveal>
          </div>

          <div className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">Three questions waste management security teams ask</h2>
              <div className="mt-8 grid gap-6 md:grid-cols-3">
                <div className="rounded-xl bg-card p-6 shadow">
                  <p className="font-display text-lg font-bold italic">"Has anyone dumped illegally at the site overnight?"</p>
                  <p className="mt-3 text-sm text-muted-foreground">Camzify answers this with <Link href="/ai-features/zone-intrusion-detection" className="text-primary hover:underline">Zone Intrusion Detection</Link> and automated patrol verification.</p>
                </div>
                <div className="rounded-xl bg-card p-6 shadow">
                  <p className="font-display text-lg font-bold italic">"Is the facility perimeter secure?"</p>
                  <p className="mt-3 text-sm text-muted-foreground">Camzify answers this with <Link href="/ai-features/line-intrusion-detection" className="text-primary hover:underline">Line Intrusion Detection</Link> and automated patrol verification.</p>
                </div>
                <div className="rounded-xl bg-card p-6 shadow">
                  <p className="font-display text-lg font-bold italic">"Were all camera views verified after the last truck left?"</p>
                  <p className="mt-3 text-sm text-muted-foreground">Camzify answers this with <Link href="/ai-features/motion-detection" className="text-primary hover:underline">Motion Detection</Link> and automated patrol verification.</p>
                </div>
              </div>
            </ScrollReveal>
          </div>

          <div className="mt-16 grid items-center gap-12 lg:grid-cols-2">
            <PlaceholderVisual type="diagram" caption="WASTE MANAGEMENT PATROL SEQUENCE" alt="Diagram of a waste management patrol route stepping through the perimeter, gates, and yard" />
            <ScrollReveal>
              <div>
                <h2 className="font-display text-2xl font-bold">How Camzify works for waste management</h2>

                <h3 className="mt-6 font-display text-lg font-bold">Building the patrol route</h3>
                <p className="mt-2 text-muted-foreground">
                  A patrol sequence is set up once, ordering every camera stop — perimeter fence line, vehicle gates, transfer area, material stockpiles — into a single route that runs on a configurable schedule.
                </p>

                <h3 className="mt-6 font-display text-lg font-bold">Checking each stop</h3>
                <p className="mt-2 text-muted-foreground">
                  At each stop, the AI checks the defined conditions for that camera using <Link href="/ai-features/line-intrusion-detection" className="text-primary hover:underline">line</Link> and <Link href="/ai-features/zone-intrusion-detection" className="text-primary hover:underline">zone intrusion detection</Link> together with <Link href="/ai-features/multi-object-tracking" className="text-primary hover:underline">multi-object tracking</Link> — is the fence line intact, is the yard clear, is an unregistered vehicle on site.
                </p>

                <h3 className="mt-6 font-display text-lg font-bold">Routing the alert</h3>
                <p className="mt-2 text-muted-foreground">
                  A failed check creates an actionable alert with a snapshot and timestamp, routed to the assigned site or enforcement contact, and logged alongside every other result in that round's patrol report.
                </p>
              </div>
            </ScrollReveal>
          </div>

          <div className="mt-16 grid items-center gap-12 lg:grid-cols-2">
            <ScrollReveal>
              <div>
                <h2 className="font-display text-2xl font-bold">What to configure for a waste management site</h2>
                <p className="mt-4 text-muted-foreground">Most waste management deployments start with:</p>
                <ul className="mt-4 space-y-3 text-muted-foreground">
                  <li className="flex gap-2">• Perimeter line rules covering fence lines and vehicle gates</li>
                  <li className="flex gap-2">• Gate zones distinguishing authorized vehicles from unregistered entry</li>
                  <li className="flex gap-2">• Restricted zones over transfer areas and material stockpiles</li>
                  <li className="flex gap-2">• After-hours patrol frequency, typically every 30-60 minutes overnight</li>
                  <li className="flex gap-2">• Escalation routing to the on-call site or enforcement contact for critical alerts</li>
                </ul>
              </div>
            </ScrollReveal>
            <PlaceholderVisual type="config-ui" caption="WASTE MANAGEMENT ZONE SETUP" alt="Configuration panel showing perimeter and gate zones mapped across a waste management site camera layout" />
          </div>

          <div className="mt-16 grid items-center gap-12 lg:grid-cols-2">
            <PlaceholderVisual type="camera-feed" caption="WASTE MANAGEMENT PATROL IN PROGRESS" alt="Camera feed showing an active patrol check at a waste management site gate" />
            <ScrollReveal>
              <div>
                <h2 className="font-display text-2xl font-bold">Common scenarios</h2>
                <ul className="mt-4 space-y-3 text-muted-foreground">
                  <li className="flex gap-2">• A vehicle dumping material at the site outside operating hours</li>
                  <li className="flex gap-2">• A person entering through a gap in the perimeter fence</li>
                  <li className="flex gap-2">• An unregistered vehicle idling near the gate overnight</li>
                  <li className="flex gap-2">• A camera losing focus from dust or debris buildup</li>
                  <li className="flex gap-2">• An unattended vehicle in a restricted transfer or stockpile area</li>
                </ul>
              </div>
            </ScrollReveal>
          </div>

          <div className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">Deployment notes</h2>
              <p className="mt-4 max-w-prose text-muted-foreground">Waste management facilities face illegal dumping, trespassing, and after-hours intrusions. Camzify monitors perimeters and access points with automated patrols, providing evidence for enforcement action.</p>
            </ScrollReveal>
          </div>

          <DeploymentPlan phases={deploymentPhases} />

          <div className="mt-12">
            <ScrollReveal>
              <p className="text-muted-foreground">
                See how the numbers work for your waste management facility with the <Link href="/roi-calculator" className="text-primary hover:underline">ROI calculator</Link>, or review <Link href="/pricing" className="text-primary hover:underline">pricing</Link> to understand the per-camera licensing model.
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
                  <Link href="/ai-features/multi-object-tracking" className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm hover:border-primary/30 hover:text-primary">Multi-Object Tracking</Link>
                </div>
              </div>
              <div className="rounded-xl border border-border bg-card p-6 text-center">
                <h3 className="font-display text-lg font-bold">Related use cases</h3>
                <div className="mt-4 flex flex-wrap justify-center gap-2">
                  <Link href="/use-cases/remote-site-monitoring" className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm hover:border-primary/30 hover:text-primary">Remote Site Monitoring</Link>
                  <Link href="/use-cases/trespassing-detection" className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm hover:border-primary/30 hover:text-primary">Trespassing Detection</Link>
                  <Link href="/use-cases/vehicle-monitoring" className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm hover:border-primary/30 hover:text-primary">Vehicle Monitoring</Link>
                </div>
              </div>
              <div className="rounded-xl border border-border bg-card p-6 text-center">
                <h3 className="font-display text-lg font-bold">Related industries</h3>
                <div className="mt-4 flex flex-wrap justify-center gap-2">
                  <Link href="/industries/property-management" className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm hover:border-primary/30 hover:text-primary">Property Management</Link>
                  <Link href="/industries/warehouses" className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm hover:border-primary/30 hover:text-primary">Warehouses</Link>
                  <Link href="/industries/remote-sites" className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm hover:border-primary/30 hover:text-primary">Remote Sites</Link>
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
