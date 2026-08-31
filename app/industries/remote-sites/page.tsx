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
  title: "AI Security for Remote Sites | Video Surveillance",
  description: "Camzify provides AI-powered virtual patrolling and video analytics for remote sites — automated patrols, real-time alerts, and compliance reports.",
  path: "/industries/remote-sites",
};

export const metadata = generatePageMeta({ ...pageMeta });

const deploymentPhases = [
    { title: "Connect the sites with no one on them", body: "Locations with no permanent staff are onboarded first. The Connector relays local cameras to the cloud without port forwarding, so no site visit is needed to open network access." },
    { title: "Set the round frequency by response time", body: "Where the nearest responder is an hour away, rounds run more often — the value is early detection, since travel time dominates the response." },
    { title: "Consolidate into one view", body: "Every remote site reports into a single dashboard with per-site health and compliance, replacing the periodic drive-by that previously served as the only check." },
];

const faqs = [
  { question: "What bandwidth does a remote site need?", answer: "Typically 2-4 Mbps per camera for standard resolution streaming. The Camzify Connector can be configured to optimize bandwidth usage for limited connectivity scenarios." },
  { question: "Does Camzify work with satellite internet connections?", answer: "Yes. The Camzify Connector adjusts patrol frequency and stream quality to match available bandwidth, which makes it workable over satellite links where connectivity is limited or intermittent." },
  { question: "What happens if a remote site loses connectivity entirely?", answer: "Patrol checks for that site pause until the connection is restored, and the outage itself is logged. Camera Tampering Detection flags a feed that goes dark so the gap shows up in the patrol report rather than going unnoticed." },
  { question: "Can one dispatcher monitor alerts from multiple remote sites?", answer: "Yes. Alerts from every configured site route into one notification queue, so a single dispatcher or field team can handle escalations across a distributed portfolio of unmanned locations." },
  { question: "How does virtual patrolling compare to a scheduled drive-by check?", answer: "A drive-by check covers one moment a day at best. Virtual patrolling runs scheduled checks continuously between visits, catching issues — a fence breach, a downed camera, an unauthorized vehicle — hours or days before the next physical visit would." },
  { question: "Can solar-powered cameras at off-grid sites work with Camzify?", answer: "Yes, as long as the camera outputs a standard IP stream. Camzify doesn't control the camera's power source, so solar-powered or battery-backed setups work the same way as any other IP camera feed." },
];

export default function RemoteSitesPage() {
  return (
    <PageShell {...pageMeta} schema={[serviceSchema({ name: "AI Security for Remote Sites", description: "Camzify provides AI-powered virtual patrolling and video analytics for remote sites — automated patrols, real-time alerts, and compliance reports.", path: "/industries/remote-sites", audience: "Remote Sites" })]} faqs={faqs} breadcrumbs={[
      { label: 'Industries', href: '/industries' },
      { label: 'Remote Sites' },
    ]}>
      <section className="pb-16">
        <div className="mx-auto max-w-site px-6">
          <h1 className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl">AI Security for Remote Sites</h1>
          <p className="mt-6 max-w-2xl text-body text-muted-foreground">
            Remote sites face security challenges that cameras alone cannot solve and manned guards cannot cover consistently. Camzify's <a href="/virtual-patrolling" className="text-primary hover:underline">virtual patrolling</a> system runs automated AI patrol rounds on your existing cameras — checking every point, flagging failures, and notifying the right person.
          </p>

          <div className="mt-12 grid items-center gap-12 lg:grid-cols-2">
            <ScrollReveal>
              <div>
                <h2 className="font-display text-2xl font-bold">Common remote site security gaps Camzify closes:</h2>
                <ul className="mt-4 space-y-3 text-muted-foreground">
                  <li className="flex gap-2">• Unmanned substations, pump stations, or towers sitting unchecked between maintenance visits</li>
                  <li className="flex gap-2">• Perimeter fence lines with no continuous coverage far from any staffed location</li>
                  <li className="flex gap-2">• Equipment and material theft going undetected until the next scheduled visit</li>
                  <li className="flex gap-2">• Limited or unreliable connectivity making constant live monitoring impractical</li>
                  <li className="flex gap-2">• Camera outages at isolated sites going unnoticed for days</li>
                  <li className="flex gap-2">• No audit trail proving a site was actually checked between visits</li>
                </ul>
              </div>
            </ScrollReveal>
            <PlaceholderVisual type="industry" caption="REMOTE SITES" alt="Security monitoring in a remote sites environment" />
          </div>

          <div className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">Why remote sites need continuous AI monitoring</h2>
              <div className="mt-4 space-y-4 max-w-prose text-muted-foreground">
                <p>Remote sites — substations, cell towers, pipeline stations, construction laydown yards, solar and wind installations — are, by definition, far from anywhere a guard can be stationed cost-effectively. A maintenance crew or roaming patrol might visit once a day, once a week, or less; everything that happens between visits goes unwitnessed.</p>
                <p>Manned guarding doesn't scale to this kind of geography — driving a guard to a remote substation for a nightly check costs far more than the asset being protected is worth in most cases, and even then, one drive-by a night still leaves the rest of the day uncovered.</p>
                <p>Virtual patrolling replaces the physical drive with scheduled AI rounds that run on whatever connectivity the site has — cellular, satellite, or a site-to-site link — checking the fence line, the equipment yard, and the access gate on a fixed schedule and flagging anything that doesn't match, without anyone needing to be there.</p>
              </div>
            </ScrollReveal>
          </div>

          <div className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">Three questions remote sites security teams ask</h2>
              <div className="mt-8 grid gap-6 md:grid-cols-3">
                <div className="rounded-xl bg-card p-6 shadow">
                  <p className="font-display text-lg font-bold italic">"Is anyone at the unmanned substation?"</p>
                  <p className="mt-3 text-sm text-muted-foreground">Camzify answers this with <Link href="/ai-features/zone-intrusion-detection" className="text-primary hover:underline">Zone Intrusion Detection</Link> and automated patrol verification.</p>
                </div>
                <div className="rounded-xl bg-card p-6 shadow">
                  <p className="font-display text-lg font-bold italic">"Has the perimeter been breached since the last maintenance visit?"</p>
                  <p className="mt-3 text-sm text-muted-foreground">Camzify answers this with <Link href="/ai-features/camera-tampering-detection" className="text-primary hover:underline">Camera Tampering Detection</Link> and automated patrol verification.</p>
                </div>
                <div className="rounded-xl bg-card p-6 shadow">
                  <p className="font-display text-lg font-bold italic">"Are all cameras online and unobstructed?"</p>
                  <p className="mt-3 text-sm text-muted-foreground">Camzify answers this with <Link href="/ai-features/line-intrusion-detection" className="text-primary hover:underline">Line Intrusion Detection</Link> and automated patrol verification.</p>
                </div>
              </div>
            </ScrollReveal>
          </div>

          <div className="mt-16 grid items-center gap-12 lg:grid-cols-2">
            <PlaceholderVisual type="diagram" caption="REMOTE SITE PATROL SEQUENCE" alt="Diagram of a remote site patrol route stepping through perimeter fence lines, equipment yards, and access gates" />
            <ScrollReveal>
              <div>
                <h2 className="font-display text-2xl font-bold">How Camzify works for remote sites</h2>

                <h3 className="mt-6 font-display text-lg font-bold">Building the patrol route</h3>
                <p className="mt-2 text-muted-foreground">
                  A patrol sequence is set up once per site, ordering every camera stop — perimeter fence, equipment yard, access gate — into a route that runs on a schedule suited to the site's connectivity and risk profile.
                </p>

                <h3 className="mt-6 font-display text-lg font-bold">Checking each stop</h3>
                <p className="mt-2 text-muted-foreground">
                  At each stop, the AI checks the defined conditions using <Link href="/ai-features/zone-intrusion-detection" className="text-primary hover:underline">zone intrusion</Link> and <Link href="/ai-features/line-intrusion-detection" className="text-primary hover:underline">line intrusion detection</Link> — is the fence line intact, has anyone crossed the boundary, is the camera still online and unobstructed.
                </p>

                <h3 className="mt-6 font-display text-lg font-bold">Routing the alert</h3>
                <p className="mt-2 text-muted-foreground">
                  A failed check creates an actionable alert with a snapshot and timestamp, routed to the assigned field team or dispatcher, and logged in that site's patrol report even if no one visits in person for days.
                </p>
              </div>
            </ScrollReveal>
          </div>

          <div className="mt-16 grid items-center gap-12 lg:grid-cols-2">
            <ScrollReveal>
              <div>
                <h2 className="font-display text-2xl font-bold">What to configure for a remote site</h2>
                <p className="mt-4 text-muted-foreground">Most remote site deployments start with:</p>
                <ul className="mt-4 space-y-3 text-muted-foreground">
                  <li className="flex gap-2">• Perimeter line rules covering fence lines and vehicle gates</li>
                  <li className="flex gap-2">• Bandwidth-aware patrol schedules tuned to available cellular or satellite connectivity</li>
                  <li className="flex gap-2">• Restricted zones over equipment yards and high-value material storage</li>
                  <li className="flex gap-2">• Extended patrol intervals between site visits, from hourly to once per shift</li>
                  <li className="flex gap-2">• Escalation routing to the on-call field team or regional dispatcher</li>
                </ul>
              </div>
            </ScrollReveal>
            <PlaceholderVisual type="config-ui" caption="REMOTE SITE ZONE SETUP" alt="Configuration panel showing perimeter and equipment yard zones mapped across a remote site camera layout" />
          </div>

          <div className="mt-16 grid items-center gap-12 lg:grid-cols-2">
            <PlaceholderVisual type="camera-feed" caption="REMOTE SITE PATROL IN PROGRESS" alt="Camera feed showing an active patrol check at a remote site perimeter gate" />
            <ScrollReveal>
              <div>
                <h2 className="font-display text-2xl font-bold">Common scenarios</h2>
                <ul className="mt-4 space-y-3 text-muted-foreground">
                  <li className="flex gap-2">• A vehicle parked at an unmanned substation outside a scheduled maintenance window</li>
                  <li className="flex gap-2">• Perimeter fence crossings at a site with no on-site staff to respond</li>
                  <li className="flex gap-2">• Equipment or cabling going missing between infrequent site visits</li>
                  <li className="flex gap-2">• A camera losing connectivity or being knocked out of position by weather</li>
                  <li className="flex gap-2">• Unauthorized presence at a remote access gate overnight</li>
                </ul>
              </div>
            </ScrollReveal>
          </div>

          <div className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">Deployment notes</h2>
              <p className="mt-4 max-w-prose text-muted-foreground">Remote sites require cameras with cellular connectivity or satellite backhaul. Camzify connects via RTSP over VPN or the Camzify Connector, providing centralised monitoring for sites that would otherwise be unmonitored between visits.</p>
            </ScrollReveal>
          </div>

          <DeploymentPlan phases={deploymentPhases} />

          <div className="mt-12">
            <ScrollReveal>
              <p className="text-muted-foreground">
                See how the numbers work for your remote sites facility with the <Link href="/roi-calculator" className="text-primary hover:underline">ROI calculator</Link>, or review <Link href="/pricing" className="text-primary hover:underline">pricing</Link> to understand the per-camera licensing model.
              </p>
            </ScrollReveal>
          </div>

          <div className="mt-16">
            <div className="grid gap-6 sm:grid-cols-3">
              <div className="rounded-xl border border-border bg-card p-6 text-center">
                <h3 className="font-display text-lg font-bold">AI Features used here</h3>
                <div className="mt-4 flex flex-wrap justify-center gap-2">
                  <Link href="/ai-features/zone-intrusion-detection" className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm hover:border-primary/30 hover:text-primary">Zone Intrusion</Link>
                  <Link href="/ai-features/camera-tampering-detection" className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm hover:border-primary/30 hover:text-primary">Camera Tampering</Link>
                  <Link href="/ai-features/line-intrusion-detection" className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm hover:border-primary/30 hover:text-primary">Line Intrusion</Link>
                  <Link href="/ai-features/motion-detection" className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm hover:border-primary/30 hover:text-primary">Motion Detection</Link>
                </div>
              </div>
              <div className="rounded-xl border border-border bg-card p-6 text-center">
                <h3 className="font-display text-lg font-bold">Related use cases</h3>
                <div className="mt-4 flex flex-wrap justify-center gap-2">
                  <Link href="/use-cases/remote-site-monitoring" className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm hover:border-primary/30 hover:text-primary">Remote Site Monitoring</Link>
                  <Link href="/use-cases/perimeter-security" className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm hover:border-primary/30 hover:text-primary">Perimeter Security</Link>
                  <Link href="/use-cases/trespassing-detection" className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm hover:border-primary/30 hover:text-primary">Trespassing Detection</Link>
                </div>
              </div>
              <div className="rounded-xl border border-border bg-card p-6 text-center">
                <h3 className="font-display text-lg font-bold">Related industries</h3>
                <div className="mt-4 flex flex-wrap justify-center gap-2">
                  <Link href="/industries/multiple-sites" className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm hover:border-primary/30 hover:text-primary">Multiple Sites</Link>
                  <Link href="/industries/energy" className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm hover:border-primary/30 hover:text-primary">Energy</Link>
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
