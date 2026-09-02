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
  title: "AI Security for Manufacturing | Video Surveillance",
  description: "Camzify provides AI-powered virtual patrolling and video analytics for manufacturing — automated patrols, real-time alerts, and compliance reports.",
  path: "/industries/manufacturing",
};

export const metadata = generatePageMeta({ ...pageMeta });

const deploymentPhases = [
    { title: "Cover plant access and restricted lines", body: "Production entrances, chemical and machinery zones, and the yard perimeter come first. Camera positions on a plant floor rarely need to change — the feeds already exist for process monitoring." },
    { title: "Layer safety onto security", body: "PPE and zone rules run on the same feeds as the intrusion checks, so one round covers both a security question and a compliance question at each stop." },
    { title: "Use the report as the shift record", body: "Each completed round produces a timestamped compliance percentage per area, which becomes the auditable record that the shift check actually happened." },
];

const faqs = [
  { question: "Does Camzify work with thermal cameras?", answer: "Yes. Camzify processes video feeds from any IP camera, including thermal cameras used for perimeter monitoring in industrial environments." },
  { question: "Can I schedule patrols around shift changes?", answer: "Yes. Patrol schedules support configurable active hours and can be aligned with shift patterns." },
  { question: "How quickly can Camzify be deployed across a large factory floor?", answer: "Setup time depends on camera count and site layout, but zones and patrol routes for a single facility are typically configured within a few days once camera access is confirmed. Multi-building sites are usually rolled out one production area at a time." },
  { question: "How does Camzify handle false alerts from machinery movement, steam, or dust?", answer: "Zone boundaries and detection sensitivity are tuned per camera during setup, so areas with constant machinery motion, steam, or airborne particulate can be scoped or thresholded differently than a quiet perimeter fence line. This keeps alerts focused on genuine intrusions rather than routine plant activity." },
  { question: "Can Camzify integrate with our existing access control system?", answer: "Camzify works from your camera feeds independently of access control, so it can run as a standalone verification layer even where badge or keycard systems are already in place. Specific integration options depend on your setup — talk to the Camzify team about your access control platform." },
  { question: "How does virtual patrolling compare to a roaming guard on a large industrial site?", answer: "A guard walking a large plant can only cover a fraction of the site each hour and checks each zone briefly. Virtual patrolling checks every configured camera on a fixed schedule with a timestamped record of each round, and is typically run alongside a smaller guard presence to cover the perimeter and restricted zones a single roaming guard can't reach continuously." },
];

export default function ManufacturingPage() {
  return (
    <PageShell {...pageMeta} schema={[serviceSchema({ name: "AI Security for Manufacturing", description: "Camzify provides AI-powered virtual patrolling and video analytics for manufacturing — automated patrols, real-time alerts, and compliance reports.", path: "/industries/manufacturing", audience: "Manufacturing" })]} faqs={faqs} breadcrumbs={[
      { label: 'Industries', href: '/industries' },
      { label: 'Manufacturing' },
    ]}>
      <section className="pb-16">
        <div className="mx-auto max-w-site px-6">
          <h1 className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl">AI Security for Manufacturing</h1>
          <p className="mt-6 max-w-2xl text-body text-muted-foreground">
            Manufacturing facilities face security challenges that cameras alone cannot solve and manned guards cannot cover consistently. Camzify's <a href="/virtual-patrolling" className="text-primary hover:underline">virtual patrolling</a> system runs automated AI patrol rounds on your existing cameras — checking every point, flagging failures, and notifying the right person.
          </p>

          <div className="mt-12 grid items-center gap-12 lg:grid-cols-2">
            <ScrollReveal>
              <div>
                <h2 className="font-display text-2xl font-bold">Common manufacturing security gaps Camzify closes:</h2>
                <ul className="mt-4 space-y-3 text-muted-foreground">
                  <li className="flex gap-2">• Restricted machinery zones accessed after shift with no one watching</li>
                  <li className="flex gap-2">• Perimeter fence lines and outdoor yards without continuous overnight coverage</li>
                  <li className="flex gap-2">• Raw materials and finished goods storage relying on a single nightly pass</li>
                  <li className="flex gap-2">• Loading and shipping areas unmonitored between scheduled runs</li>
                  <li className="flex gap-2">• Camera tampering or outages on critical zones going unnoticed for hours</li>
                  <li className="flex gap-2">• No audit trail proving perimeter and zone checks actually happened</li>
                </ul>
              </div>
            </ScrollReveal>
            <SiteImage
              src="/ai-security-for-manufacturing.jpg" alt="AI-monitored manufacturing floor showing a bounding box around a package on a conveyor line, with workers, machinery, and a production worker in PPE" className="w-full rounded-xl"
              width={1600}
              height={900}
              priority
              sizes="(max-width: 1024px) 100vw, 60vw"
            />
          </div>

          <div className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">Why manufacturing needs continuous AI monitoring</h2>
              <div className="mt-4 space-y-4 max-w-prose text-muted-foreground">
                <p>Manufacturing sites combine large indoor floor areas with outdoor yards, loading docks, and perimeter fencing, often spread across multiple buildings and shifts. Restricted machinery zones, raw materials, and finished goods storage all carry real risk, but coverage tends to be thinnest exactly when the plant is least staffed — between shifts and overnight.</p>
                <p>A guard patrol across a large industrial footprint covers only a fraction of the site in any given pass, and static CCTV records the yard and loading areas without anyone reviewing the footage until something is already missing or damaged.</p>
                <p>Continuous AI monitoring runs a fixed patrol route across every camera on the site — indoor and outdoor — on a defined schedule, flagging a fence line breach, an unauthorized zone entry, or a camera going dark the moment it happens rather than at the next scheduled walk-through.</p>
              </div>
            </ScrollReveal>
          </div>

          <div className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">Three questions manufacturing security teams ask</h2>
              <div className="mt-8 grid gap-6 md:grid-cols-3">
                <div className="rounded-xl bg-card p-6 shadow">
                  <p className="font-display text-lg font-bold italic">"Is anyone in the restricted machinery zone after shift?"</p>
                  <p className="mt-3 text-sm text-muted-foreground">Camzify answers this with <Link href="/ai-features/zone-intrusion-detection" className="text-primary hover:underline">Zone Intrusion Detection</Link> and automated patrol verification.</p>
                </div>
                <div className="rounded-xl bg-card p-6 shadow">
                  <p className="font-display text-lg font-bold italic">"Were all perimeter checks completed overnight?"</p>
                  <p className="mt-3 text-sm text-muted-foreground">Camzify answers this with <Link href="/ai-features/line-intrusion-detection" className="text-primary hover:underline">Line Intrusion Detection</Link> and automated patrol verification.</p>
                </div>
                <div className="rounded-xl bg-card p-6 shadow">
                  <p className="font-display text-lg font-bold italic">"Has anyone tampered with the camera covering the raw materials store?"</p>
                  <p className="mt-3 text-sm text-muted-foreground">Camzify answers this with <Link href="/ai-features/camera-tampering-detection" className="text-primary hover:underline">Camera Tampering Detection</Link> and automated patrol verification.</p>
                </div>
              </div>
            </ScrollReveal>
          </div>

          <div className="mt-16 grid items-center gap-12 lg:grid-cols-2">
            <PlaceholderVisual type="diagram" caption="MANUFACTURING PATROL SEQUENCE" alt="Diagram of a manufacturing patrol route stepping through machinery zones, perimeter fencing, and materials storage" />
            <ScrollReveal>
              <div>
                <h2 className="font-display text-2xl font-bold">How Camzify works for manufacturing</h2>

                <h3 className="mt-6 font-display text-lg font-bold">Building the patrol route</h3>
                <p className="mt-2 text-muted-foreground">
                  A patrol sequence is set up once, ordering every camera stop — restricted machinery zones, perimeter fence lines, raw materials storage, loading areas — into a single route that runs on a configurable schedule.
                </p>

                <h3 className="mt-6 font-display text-lg font-bold">Checking each stop</h3>
                <p className="mt-2 text-muted-foreground">
                  At each stop, the AI checks the defined conditions for that camera using <Link href="/ai-features/zone-intrusion-detection" className="text-primary hover:underline">Zone Intrusion Detection</Link> and <Link href="/ai-features/line-intrusion-detection" className="text-primary hover:underline">Line Intrusion Detection</Link> — is the machinery zone clear, is the fence line intact, is the camera unobstructed.
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
                <h2 className="font-display text-2xl font-bold">What to configure for a manufacturing site</h2>
                <p className="mt-4 text-muted-foreground">Most manufacturing deployments start with:</p>
                <ul className="mt-4 space-y-3 text-muted-foreground">
                  <li className="flex gap-2">• Restricted zones over machinery areas, hazardous material storage, and raw materials</li>
                  <li className="flex gap-2">• Perimeter line rules covering fence lines and vehicle gates</li>
                  <li className="flex gap-2">• Loading dock and shipping-area schedules aligned to operating hours</li>
                  <li className="flex gap-2">• After-hours patrol frequency, typically every 30-60 minutes overnight</li>
                  <li className="flex gap-2">• Escalation routing to the on-call security or facilities contact</li>
                </ul>
              </div>
            </ScrollReveal>
            <PlaceholderVisual type="config-ui" caption="MANUFACTURING ZONE SETUP" alt="Configuration panel showing machinery and perimeter zones mapped across a manufacturing camera layout" />
          </div>

          <div className="mt-16 grid items-center gap-12 lg:grid-cols-2">
            <PlaceholderVisual type="camera-feed" caption="MANUFACTURING PATROL IN PROGRESS" alt="Camera feed showing an active patrol check at a manufacturing plant perimeter" />
            <ScrollReveal>
              <div>
                <h2 className="font-display text-2xl font-bold">Common scenarios</h2>
                <ul className="mt-4 space-y-3 text-muted-foreground">
                  <li className="flex gap-2">• A worker or vehicle entering a restricted machinery zone after shift end</li>
                  <li className="flex gap-2">• A perimeter fence crossing during overnight or weekend hours</li>
                  <li className="flex gap-2">• A loading dock accessed outside a scheduled shipping window</li>
                  <li className="flex gap-2">• A camera covering the raw materials store going dark mid-shift</li>
                  <li className="flex gap-2">• Unauthorized presence near hazardous material storage after closing</li>
                </ul>
              </div>
            </ScrollReveal>
          </div>

          <div className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">Deployment notes</h2>
              <p className="mt-4 max-w-prose text-muted-foreground">Manufacturing environments include wide floor areas, outdoor yards, and loading facilities. Existing IP cameras on the factory network can connect directly via RTSP. The Camzify Connector handles sites with NAT or firewall restrictions.</p>
            </ScrollReveal>
          </div>

          <DeploymentPlan phases={deploymentPhases} />

          <div className="mt-12">
            <ScrollReveal>
              <p className="text-muted-foreground">
                See how the numbers work for your manufacturing facility with the <Link href="/roi-calculator" className="text-primary hover:underline">ROI calculator</Link>, or review <Link href="/pricing" className="text-primary hover:underline">pricing</Link> to understand the per-camera licensing model.
              </p>
            </ScrollReveal>
          </div>

          <div className="mt-16">
            <div className="grid gap-6 sm:grid-cols-3">
              <div className="rounded-xl border border-border bg-card p-6 text-center">
                <h3 className="font-display text-lg font-bold">AI Features used here</h3>
                <div className="mt-4 flex flex-wrap justify-center gap-2">
                  <Link href="/ai-features/zone-intrusion-detection" className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm hover:border-primary/30 hover:text-primary">Zone Intrusion</Link>
                  <Link href="/ai-features/line-intrusion-detection" className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm hover:border-primary/30 hover:text-primary">Line Intrusion</Link>
                  <Link href="/ai-features/camera-tampering-detection" className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm hover:border-primary/30 hover:text-primary">Camera Tampering</Link>
                  <Link href="/ai-features/multi-object-tracking" className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm hover:border-primary/30 hover:text-primary">Multi-Object Tracking</Link>
                </div>
              </div>
              <div className="rounded-xl border border-border bg-card p-6 text-center">
                <h3 className="font-display text-lg font-bold">Related use cases</h3>
                <div className="mt-4 flex flex-wrap justify-center gap-2">
                  <Link href="/use-cases/perimeter-security" className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm hover:border-primary/30 hover:text-primary">Perimeter Security</Link>
                  <Link href="/use-cases/unauthorized-access-detection" className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm hover:border-primary/30 hover:text-primary">Unauthorized Access Detection</Link>
                  <Link href="/use-cases/night-security" className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm hover:border-primary/30 hover:text-primary">Night Security</Link>
                </div>
              </div>
              <div className="rounded-xl border border-border bg-card p-6 text-center">
                <h3 className="font-display text-lg font-bold">Related industries</h3>
                <div className="mt-4 flex flex-wrap justify-center gap-2">
                  <Link href="/industries/warehouses" className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm hover:border-primary/30 hover:text-primary">Warehouses</Link>
                  <Link href="/industries/construction-sites" className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm hover:border-primary/30 hover:text-primary">Construction Sites</Link>
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
