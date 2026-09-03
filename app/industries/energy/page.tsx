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
  title: "AI Security for Energy | Video Surveillance",
  description: "Camzify provides AI-powered virtual patrolling and video analytics for energy — automated patrols, real-time alerts, and compliance reports.",
  path: "/industries/energy",
};

export const metadata = generatePageMeta({ ...pageMeta });

const deploymentPhases = [
    { title: "Onboard the unmanned assets first", body: "Substations, compounds, pump stations and remote installations are prioritized — the sites with no permanent staff and the longest response distance." },
    { title: "Run frequent rounds over thin bandwidth", body: "Sequences are tuned for constrained links, and the Connector relays feeds without exposing equipment to the internet or requiring port forwarding at each site." },
    { title: "Escalate by site, not by queue", body: "Each remote asset is mapped to the responder who covers it, so a perimeter breach at one compound reaches the person who can actually attend it." },
];

const faqs = [
  { question: "Does Camzify work in extreme weather conditions?", answer: "Camzify processes the camera feed — so performance depends on camera hardware resilience. If the camera maintains a stable video feed, the AI analysis continues regardless of environmental conditions." },
  { question: "How does Camzify connect to cameras at remote or unmanned sites?", answer: "Camzify connects to any camera streaming RTSP or HLS, including feeds delivered over VPN or 4G/5G cellular links, which covers most substation, solar, and wind farm installations. The Camzify Connector can also relay feeds from LAN-only cameras that do not expose a stream directly." },
  { question: "Will wildlife or vegetation movement trigger false alerts at rural sites?", answer: "Detection is scoped to defined zones and object types rather than raw motion, which reduces false triggers from wildlife, blowing vegetation, or shifting shadows common at rural and open-terrain sites. Zone shape and sensitivity are adjustable per camera during setup." },
  { question: "Does Camzify support the audit trails required for critical infrastructure sites?", answer: "Every patrol round logs a timestamped result for each camera stop, including failed checks and the alert raised, producing a consistent record that can be pulled for internal review or compliance reporting on unmanned or lightly staffed sites." },
  { question: "Does this replace scheduled maintenance visits to remote sites?", answer: "No — Camzify does not replace physical maintenance or inspection visits, but it closes the security gap between them. A site that is only visited every few days or weeks still gets continuous automated checks in between, with an alert raised the moment something changes rather than waiting for the next scheduled trip." },
  { question: "What happens if a remote site loses internet connectivity?", answer: "If a camera feed drops, Camzify flags that camera as unreachable rather than silently skipping its patrol check, so the gap in coverage is visible in the patrol report instead of going unnoticed until the connection is restored." },
];

export default function EnergyPage() {
  return (
    <PageShell {...pageMeta} schema={[serviceSchema({ name: "AI Security for Energy", description: "Camzify provides AI-powered virtual patrolling and video analytics for energy — automated patrols, real-time alerts, and compliance reports.", path: "/industries/energy", audience: "Energy" })]} faqs={faqs} breadcrumbs={[
      { label: 'Industries', href: '/industries' },
      { label: 'Energy' },
    ]}>
      <section className="pb-16">
        <div className="mx-auto max-w-site px-6">
          <h1 className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl">AI Security for Energy</h1>
          <p className="mt-6 max-w-2xl text-body text-muted-foreground">
            Energy facilities face security challenges that cameras alone cannot solve and manned guards cannot cover consistently. Camzify's <a href="/virtual-patrolling" className="text-primary hover:underline">virtual patrolling</a> system runs automated AI patrol rounds on your existing cameras — checking every point, flagging failures, and notifying the right person.
          </p>

          <div className="mt-12 grid items-center gap-12 lg:grid-cols-2">
            <ScrollReveal>
              <div>
                <h2 className="font-display text-2xl font-bold">Common energy security gaps Camzify closes:</h2>
                <ul className="mt-4 space-y-3 text-muted-foreground">
                  <li className="flex gap-2">• Unmanned substations sitting without any on-site presence for days</li>
                  <li className="flex gap-2">• Solar and wind farm perimeters spanning acres with no continuous coverage</li>
                  <li className="flex gap-2">• Remote sites relying on infrequent, scheduled maintenance visits as the only check</li>
                  <li className="flex gap-2">• Copper and equipment theft going undetected at unstaffed installations</li>
                  <li className="flex gap-2">• Camera outages at remote sites not noticed until the next scheduled visit</li>
                  <li className="flex gap-2">• No audit trail proving a remote site was checked between visits</li>
                </ul>
              </div>
            </ScrollReveal>
            <PlaceholderVisual type="industry" caption="ENERGY" alt="Security monitoring in a energy environment" />
          </div>

          <div className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">Why energy sites need continuous AI monitoring</h2>
              <div className="mt-4 space-y-4 max-w-prose text-muted-foreground">
                <p>Substations, solar farms, wind farms, and oil and gas installations are frequently unmanned by design, sitting hours from the nearest staffed office and visited only on a maintenance schedule that might run days or weeks apart. There is no guard walking a round at these sites — the fence line and equipment compounds go effectively unwatched between visits.</p>
                <p>That distance is exactly what makes these sites attractive targets for copper theft, equipment tampering, and trespass, and by the time a scheduled visit uncovers a breach, whatever happened is long over and any evidence has degraded.</p>
                <p>Continuous AI monitoring closes the gap between physical visits by checking the perimeter, equipment yards, and camera health on a repeating schedule regardless of how remote the site is, and raising an alert the moment a fence line is crossed or a camera stops reporting — turning an infrequent visit-based model into a monitored one.</p>
              </div>
            </ScrollReveal>
          </div>

          <div className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">Three questions energy security teams ask</h2>
              <div className="mt-8 grid gap-6 md:grid-cols-3">
                <div className="rounded-xl bg-card p-6 shadow">
                  <p className="font-display text-lg font-bold italic">"Has anyone accessed the substation since the maintenance crew left?"</p>
                  <p className="mt-3 text-sm text-muted-foreground">Camzify answers this with <Link href="/ai-features/line-intrusion-detection" className="text-primary hover:underline">Line Intrusion Detection</Link> and automated patrol verification.</p>
                </div>
                <div className="rounded-xl bg-card p-6 shadow">
                  <p className="font-display text-lg font-bold italic">"Is the perimeter of the solar farm secure?"</p>
                  <p className="mt-3 text-sm text-muted-foreground">Camzify answers this with <Link href="/ai-features/zone-intrusion-detection" className="text-primary hover:underline">Zone Intrusion Detection</Link> and automated patrol verification.</p>
                </div>
                <div className="rounded-xl bg-card p-6 shadow">
                  <p className="font-display text-lg font-bold italic">"Were all remote site cameras checked in the last hour?"</p>
                  <p className="mt-3 text-sm text-muted-foreground">Camzify answers this with <Link href="/ai-features/camera-tampering-detection" className="text-primary hover:underline">Camera Tampering Detection</Link> and automated patrol verification.</p>
                </div>
              </div>
            </ScrollReveal>
          </div>

          <div className="mt-16 grid items-center gap-12 lg:grid-cols-2">
            <PlaceholderVisual type="diagram" caption="ENERGY SITE PATROL SEQUENCE" alt="Diagram of an energy site patrol route stepping through substation fencing, transformer yards, and remote perimeter cameras" />
            <ScrollReveal>
              <div>
                <h2 className="font-display text-2xl font-bold">How Camzify works for energy</h2>

                <h3 className="mt-6 font-display text-lg font-bold">Building the patrol route</h3>
                <p className="mt-2 text-muted-foreground">
                  A patrol sequence is set up once, ordering every camera stop — substation fencing, transformer yards, solar or wind farm perimeters, access gates — into a single route that runs on a configurable schedule regardless of how remote the site is.
                </p>

                <h3 className="mt-6 font-display text-lg font-bold">Checking each stop</h3>
                <p className="mt-2 text-muted-foreground">
                  At each stop, the AI checks the defined conditions for that camera using <Link href="/ai-features/line-intrusion-detection" className="text-primary hover:underline">line intrusion</Link> and <Link href="/ai-features/zone-intrusion-detection" className="text-primary hover:underline">zone intrusion detection</Link> — is the fence line intact, is the compound clear, is access restricted where it should be.
                </p>

                <h3 className="mt-6 font-display text-lg font-bold">Routing the alert</h3>
                <p className="mt-2 text-muted-foreground">
                  A failed check — including a camera flagged by <Link href="/ai-features/camera-tampering-detection" className="text-primary hover:underline">camera tampering detection</Link> — creates an actionable alert with a snapshot and timestamp, routed to the assigned operations contact and logged in that round's patrol report.
                </p>
              </div>
            </ScrollReveal>
          </div>

          <div className="mt-16 grid items-center gap-12 lg:grid-cols-2">
            <ScrollReveal>
              <div>
                <h2 className="font-display text-2xl font-bold">What to configure for an energy site</h2>
                <p className="mt-4 text-muted-foreground">Most energy site deployments start with:</p>
                <ul className="mt-4 space-y-3 text-muted-foreground">
                  <li className="flex gap-2">• Perimeter line rules around substation fencing and solar or wind farm boundaries</li>
                  <li className="flex gap-2">• Zones over transformer yards and equipment compounds</li>
                  <li className="flex gap-2">• Tampering checks tuned for remote cameras that see less frequent physical inspection</li>
                  <li className="flex gap-2">• Patrol frequency adjusted for site criticality and distance from response teams</li>
                  <li className="flex gap-2">• Escalation routing to regional or on-call operations staff</li>
                </ul>
              </div>
            </ScrollReveal>
            <PlaceholderVisual type="config-ui" caption="ENERGY SITE ZONE SETUP" alt="Configuration panel showing substation perimeter and compound zones mapped across an energy site camera layout" />
          </div>

          <div className="mt-16 grid items-center gap-12 lg:grid-cols-2">
            <PlaceholderVisual type="camera-feed" caption="ENERGY SITE PATROL IN PROGRESS" alt="Camera feed showing an active patrol check at a remote energy substation perimeter" />
            <ScrollReveal>
              <div>
                <h2 className="font-display text-2xl font-bold">Common scenarios</h2>
                <ul className="mt-4 space-y-3 text-muted-foreground">
                  <li className="flex gap-2">• A vehicle parked near a substation fence outside a scheduled maintenance window</li>
                  <li className="flex gap-2">• A gap or breach found in a solar farm perimeter fence</li>
                  <li className="flex gap-2">• A camera at a remote site going dark or losing signal</li>
                  <li className="flex gap-2">• Unauthorized presence detected inside a transformer yard overnight</li>
                  <li className="flex gap-2">• Equipment or cabling found disturbed between scheduled site visits</li>
                </ul>
              </div>
            </ScrollReveal>
          </div>

          <div className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">Deployment notes</h2>
              <p className="mt-4 max-w-prose text-muted-foreground">Energy facilities include substations, solar farms, wind farms, and oil and gas installations — often unmanned and in remote locations. Camzify connects via RTSP over VPN or 4G-connected cameras.</p>
            </ScrollReveal>
          </div>

          <DeploymentPlan phases={deploymentPhases} />

          <div className="mt-12">
            <ScrollReveal>
              <p className="text-muted-foreground">
                See how the numbers work for your energy facility with the <Link href="/roi-calculator" className="text-primary hover:underline">ROI calculator</Link>, or review <Link href="/pricing" className="text-primary hover:underline">pricing</Link> to understand the per-camera licensing model.
              </p>
            </ScrollReveal>
          </div>

          <div className="mt-16">
            <div className="grid gap-6 sm:grid-cols-3">
              <div className="rounded-xl border border-border bg-card p-6 text-center">
                <h3 className="font-display text-lg font-bold">AI Features used here</h3>
                <div className="mt-4 flex flex-wrap justify-center gap-2">
                  <Link href="/ai-features/line-intrusion-detection" className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm hover:border-primary/30 hover:text-primary">Line Intrusion Detection</Link>
                  <Link href="/ai-features/zone-intrusion-detection" className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm hover:border-primary/30 hover:text-primary">Zone Intrusion Detection</Link>
                  <Link href="/ai-features/camera-tampering-detection" className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm hover:border-primary/30 hover:text-primary">Camera Tampering Detection</Link>
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
                  <Link href="/industries/warehouses" className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm hover:border-primary/30 hover:text-primary">Warehouses</Link>
                  <Link href="/industries/manufacturing" className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm hover:border-primary/30 hover:text-primary">Manufacturing</Link>
                  <Link href="/industries/construction-sites" className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm hover:border-primary/30 hover:text-primary">Construction Sites</Link>
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
