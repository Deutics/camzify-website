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
  title: "AI Security for Warehouses | Video Surveillance",
  description: "Camzify provides AI-powered virtual patrolling and video analytics for warehouses — automated patrols, real-time alerts, and compliance reports.",
  path: "/industries/warehouses",
};

export const metadata = generatePageMeta({ ...pageMeta });

const deploymentPhases = [
    { title: "Map the dock line and perimeter", body: "Cameras already covering dock doors, the fence line, and main aisle intersections are added first. Most warehouses start with 8–30 feeds; nothing new needs mounting to run the first round." },
    { title: "Build the overnight sequence", body: "A route is ordered dock-by-dock, then perimeter, then high-value cages. Each stop gets its own checklist — door closed, bay clear, fence unbreached — and runs on the hours the building is empty." },
    { title: "Read the first week of reports", body: "The PDF for every round shows which stops passed, which failed, and who was notified. The first week usually surfaces the same two or three recurring gaps, which is where the schedule gets tightened." },
];

const faqs = [
  { question: 'How many cameras does a typical warehouse need?', answer: 'It depends on the facility layout. Most warehouses use 8-30 cameras covering dock doors, perimeter, high-value areas, and main aisles. Camzify licenses per camera, so you only pay for what you monitor.' },
  { question: 'Can Camzify monitor cold storage areas?', answer: 'Yes. Camzify works with any IP camera feed. If the camera operates in cold storage conditions, the AI processes the feed as normal.' },
  { question: 'Does virtual patrolling replace our overnight security guard?', answer: 'For most warehouses, it replaces the need to add or scale overnight guarding rather than removing an existing team overnight. Many sites run virtual patrols alongside a smaller guard presence, using AI to cover blind spots and off-hours rounds a single guard can\'t physically reach every hour.' },
  { question: 'How fast does a dock-door breach or after-hours entry get flagged?', answer: 'Alerts fire in near real time from the moment a confirmed event is detected — typically within seconds — and route to the assigned contact through the notification queue with a timestamped clip.' },
  { question: 'Can different zones of the warehouse have different patrol schedules?', answer: 'Yes. Patrol sequences, checklists, and detection schedules are configured per camera or zone, so a loading dock active during business hours and a fenced yard active only overnight can run entirely different rules on the same account.' },
  { question: 'What happens if a camera goes offline or is tampered with mid-shift?', answer: 'Camera Tampering Detection flags defocus, physical coverage, scene changes, and frozen feeds as they happen, and the affected camera is marked non-compliant in the patrol report until the feed is restored.' },
];

export default function WarehousesPage() {
  return (
    <PageShell {...pageMeta} schema={[serviceSchema({ name: "AI Security for Warehouses", description: "Camzify provides AI-powered virtual patrolling and video analytics for warehouses — automated patrols, real-time alerts, and compliance reports.", path: "/industries/warehouses", audience: "Warehouses" })]} faqs={faqs} breadcrumbs={[
      { label: 'Industries', href: '/industries' },
      { label: 'Warehouses' },
    ]}>
      <section className="pb-16">
        <div className="mx-auto max-w-site px-6">
          <h1 className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl">AI Security for Warehouses</h1>
          <p className="mt-6 max-w-2xl text-body text-muted-foreground">
            Warehouses face security challenges that cameras alone cannot solve and manned guards cannot cover consistently. Camzify's <a href="/virtual-patrolling" className="text-primary hover:underline">virtual patrolling</a> system runs automated AI patrol rounds on your existing cameras — checking every point, flagging failures, and notifying the right person.
          </p>

          <div className="mt-12 grid items-center gap-12 lg:grid-cols-2">
            <ScrollReveal>
              <div>
                <h2 className="font-display text-2xl font-bold">Common warehouse security gaps Camzify closes:</h2>
                <ul className="mt-4 space-y-3 text-muted-foreground">
                  <li className="flex gap-2">• Dock doors left unmonitored between scheduled deliveries</li>
                  <li className="flex gap-2">• Perimeter fence lines with no continuous overnight coverage</li>
                  <li className="flex gap-2">• High-value storage areas relying on a single nightly guard pass</li>
                  <li className="flex gap-2">• Camera outages or tampering going unnoticed for hours</li>
                  <li className="flex gap-2">• No audit trail proving a patrol actually happened</li>
                </ul>
              </div>
            </ScrollReveal>
            <SiteImage
              src="/ai-security-for-warehouses.jpg" alt="AI-monitored warehouse showing bounding boxes around a forklift, worker, and pallets, with aerial and interior storage rack views" className="w-full rounded-xl"
              width={1600}
              height={900}
              priority
              sizes="(max-width: 1024px) 100vw, 60vw"
            />
          </div>

          <div className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">Why warehouses need continuous AI monitoring</h2>
              <div className="mt-4 space-y-4 max-w-prose text-muted-foreground">
                <p>A typical warehouse runs far longer than its staffed hours — trucks arrive before dawn, shifts end well after dark, and the building itself sits empty or lightly staffed for large stretches of every 24-hour cycle. A single guard walking a round covers the whole site for a few minutes an hour at best; the rest of the time, dock doors, fence lines, and storage areas are effectively unwatched.</p>
                <p>Traditional CCTV records everything and reviews nothing until an incident is already reported. By the time someone pulls the footage after a theft or a damaged shipment, the window to actually respond has closed.</p>
                <p>Virtual patrolling replaces that gap with scheduled AI rounds that check every camera stop on a defined route, log the result, and notify the right person the moment something fails — producing the same audit trail a physical guard tour would, without needing a guard walking it.</p>
              </div>
            </ScrollReveal>
          </div>

          <div className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">Three questions warehouse security teams ask</h2>
              <div className="mt-8 grid gap-6 md:grid-cols-3">
                <div className="rounded-xl bg-card p-6 shadow">
                  <p className="font-display text-lg font-bold italic">"Was the gate actually closed at 2am?"</p>
                  <p className="mt-3 text-sm text-muted-foreground">Camzify answers this with <Link href="/ai-features/line-intrusion-detection" className="text-primary hover:underline">Line Intrusion Detection</Link> and automated patrol verification.</p>
                </div>
                <div className="rounded-xl bg-card p-6 shadow">
                  <p className="font-display text-lg font-bold italic">"Did anyone cross the dock line after shift?"</p>
                  <p className="mt-3 text-sm text-muted-foreground">Camzify answers this with <Link href="/ai-features/zone-intrusion-detection" className="text-primary hover:underline">Zone Intrusion Detection</Link> and automated patrol verification.</p>
                </div>
                <div className="rounded-xl bg-card p-6 shadow">
                  <p className="font-display text-lg font-bold italic">"Who checked the perimeter last night, and can you prove it?"</p>
                  <p className="mt-3 text-sm text-muted-foreground">Camzify answers this with <Link href="/ai-features/camera-tampering-detection" className="text-primary hover:underline">Camera Tampering Detection</Link> and automated patrol verification.</p>
                </div>
              </div>
            </ScrollReveal>
          </div>

          <div className="mt-16 grid items-center gap-12 lg:grid-cols-2">
            <PlaceholderVisual type="diagram" caption="WAREHOUSE PATROL SEQUENCE" alt="Diagram of a warehouse patrol route stepping through dock doors, perimeter, and storage zones" />
            <ScrollReveal>
              <div>
                <h2 className="font-display text-2xl font-bold">How Camzify works for warehouses</h2>

                <h3 className="mt-6 font-display text-lg font-bold">Building the patrol route</h3>
                <p className="mt-2 text-muted-foreground">
                  A patrol sequence is set up once, ordering every camera stop — dock doors, perimeter fence lines, high-value storage, main aisles — into a single route that runs on a configurable schedule.
                </p>

                <h3 className="mt-6 font-display text-lg font-bold">Checking each stop</h3>
                <p className="mt-2 text-muted-foreground">
                  At each stop, the AI checks the defined conditions for that camera using <Link href="/ai-features/line-intrusion-detection" className="text-primary hover:underline">line</Link> and <Link href="/ai-features/zone-intrusion-detection" className="text-primary hover:underline">zone intrusion detection</Link> — is the area clear, is the boundary intact, is the camera unobstructed.
                </p>

                <h3 className="mt-6 font-display text-lg font-bold">Routing the alert</h3>
                <p className="mt-2 text-muted-foreground">
                  A failed check creates an actionable alert with a snapshot and timestamp, routed to the assigned security contact, and logged alongside every other result in that round's patrol report.
                </p>
              </div>
            </ScrollReveal>
          </div>

          <div className="mt-16 grid items-center gap-12 lg:grid-cols-2">
            <ScrollReveal>
              <div>
                <h2 className="font-display text-2xl font-bold">What to configure for a warehouse site</h2>
                <p className="mt-4 text-muted-foreground">Most warehouse deployments start with:</p>
                <ul className="mt-4 space-y-3 text-muted-foreground">
                  <li className="flex gap-2">• Dock-door zones with schedule-based activation for delivery windows</li>
                  <li className="flex gap-2">• Perimeter line rules covering fence lines and vehicle gates</li>
                  <li className="flex gap-2">• Restricted zones over high-value storage and hazardous material areas</li>
                  <li className="flex gap-2">• After-hours patrol frequency, typically every 30-60 minutes overnight</li>
                  <li className="flex gap-2">• Escalation routing to the on-call security contact for critical alerts</li>
                </ul>
              </div>
            </ScrollReveal>
            <PlaceholderVisual type="config-ui" caption="WAREHOUSE ZONE SETUP" alt="Configuration panel showing dock-door and perimeter zones mapped across a warehouse camera layout" />
          </div>

          <div className="mt-16 grid items-center gap-12 lg:grid-cols-2">
            <PlaceholderVisual type="camera-feed" caption="WAREHOUSE PATROL IN PROGRESS" alt="Camera feed showing an active patrol check at a warehouse loading dock" />
            <ScrollReveal>
              <div>
                <h2 className="font-display text-2xl font-bold">Common scenarios</h2>
                <ul className="mt-4 space-y-3 text-muted-foreground">
                  <li className="flex gap-2">• A dock door left open outside a scheduled delivery window</li>
                  <li className="flex gap-2">• A forklift or vehicle entering a pedestrian-only aisle</li>
                  <li className="flex gap-2">• Perimeter fence crossings during overnight hours</li>
                  <li className="flex gap-2">• A camera going dark or losing focus mid-shift</li>
                  <li className="flex gap-2">• Unauthorized presence in a high-value storage cage after closing</li>
                </ul>
              </div>
            </ScrollReveal>
          </div>

          <div className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">Deployment notes</h2>
              <p className="mt-4 max-w-prose text-muted-foreground">Warehouse environments present wide open spaces, high ceilings, and variable lighting. Cameras are typically mounted at dock doors, perimeter fence lines, and aisle intersections. RTSP connectivity via the Camzify Connector is the most common setup.</p>
            </ScrollReveal>
          </div>

          <DeploymentPlan phases={deploymentPhases} />

          <div className="mt-12">
            <ScrollReveal>
              <p className="text-muted-foreground">
                See how the numbers work for your warehouse facility with the <Link href="/roi-calculator" className="text-primary hover:underline">ROI calculator</Link>, or review <Link href="/pricing" className="text-primary hover:underline">pricing</Link> to understand the per-camera licensing model.
              </p>
            </ScrollReveal>
          </div>

          <div className="mt-16">
            <div className="grid gap-6 sm:grid-cols-3">
              <div className="rounded-xl border border-border bg-card p-6 text-center">
                <h3 className="font-display text-lg font-bold">AI Features used here</h3>
                <div className="mt-4 flex flex-wrap justify-center gap-2">
                  <Link href="/ai-features/line-intrusion-detection" className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm hover:border-primary/30 hover:text-primary">Line Intrusion</Link>
                  <Link href="/ai-features/zone-intrusion-detection" className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm hover:border-primary/30 hover:text-primary">Zone Intrusion</Link>
                  <Link href="/ai-features/camera-tampering-detection" className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm hover:border-primary/30 hover:text-primary">Camera Tampering</Link>
                  <Link href="/ai-features/multi-object-tracking" className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm hover:border-primary/30 hover:text-primary">Multi-Object Tracking</Link>
                </div>
              </div>
              <div className="rounded-xl border border-border bg-card p-6 text-center">
                <h3 className="font-display text-lg font-bold">Related use cases</h3>
                <div className="mt-4 flex flex-wrap justify-center gap-2">
                  <Link href="/use-cases/loading-dock-monitoring" className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm hover:border-primary/30 hover:text-primary">Loading Dock Monitoring</Link>
                  <Link href="/use-cases/after-hours-monitoring" className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm hover:border-primary/30 hover:text-primary">After-Hours Monitoring</Link>
                  <Link href="/use-cases/theft-prevention" className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm hover:border-primary/30 hover:text-primary">Theft Prevention</Link>
                </div>
              </div>
              <div className="rounded-xl border border-border bg-card p-6 text-center">
                <h3 className="font-display text-lg font-bold">Related industries</h3>
                <div className="mt-4 flex flex-wrap justify-center gap-2">
                  <Link href="/industries/manufacturing" className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm hover:border-primary/30 hover:text-primary">Manufacturing</Link>
                  <Link href="/industries/construction-sites" className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm hover:border-primary/30 hover:text-primary">Construction Sites</Link>
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
