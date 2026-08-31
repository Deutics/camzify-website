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
  title: "AI Security for Residential | Video Surveillance",
  description: "Camzify provides AI-powered virtual patrolling and video analytics for residential — automated patrols, real-time alerts, and compliance reports.",
  path: "/industries/residential",
};

export const metadata = generatePageMeta({ ...pageMeta });

const deploymentPhases = [
    { title: "Cover the entry points", body: "Gates, lobby doors, car park ramps and bin areas are onboarded first — the boundary between public and resident-only space." },
    { title: "Patrol the quiet hours", body: "Rounds run overnight when the estate is least observed, checking that gates are closed, communal doors are secured and car park levels are clear." },
    { title: "Route alerts to the duty contact", body: "Each camera is mapped to whoever is actually on call — concierge, estate manager or an external monitoring contact — so a failed check reaches a person rather than a screen." },
];

const faqs = [
  { question: "Is Camzify suitable for a small residential community?", answer: "Yes. Pricing is per camera, so small communities with 4-10 cameras pay only for what they use. The ROI is strongest when compared to the cost of a nightly guard." },
  { question: "Will residents know they're being monitored by AI instead of a guard?", answer: "That's up to the HOA or property manager to communicate, the same way any CCTV or guard patrol would typically be disclosed. Camzify doesn't change what's visible to residents, just how the existing cameras are checked." },
  { question: "Can Camzify tell the difference between a resident and a visitor?", answer: "Camzify doesn't identify individuals. It detects activity in a defined zone at a defined time — for example, anyone present at the pool after closing — regardless of who they are, which is what a guard's round would check for too." },
  { question: "How quickly does someone get notified if the gate is left open?", answer: "Alerts fire in near real time from the moment a confirmed event is detected and route to the assigned contact through the notification queue with a timestamped clip, typically within seconds." },
  { question: "Does this replace our community's guard service entirely?", answer: "For most communities, it reduces reliance on guards for routine overnight rounds rather than eliminating a guard presence outright. Many communities run virtual patrols alongside a smaller guard team to cover blind spots and off-hours checks a single guard can't reach every hour." },
  { question: "Can different areas of the community have different rules?", answer: "Yes. Zones, schedules, and detection rules are configured per camera, so an entry gate active around the clock and a pool area active only outside posted hours can run entirely different rules on the same account." },
];

export default function ResidentialPage() {
  return (
    <PageShell {...pageMeta} schema={[serviceSchema({ name: "AI Security for Residential", description: "Camzify provides AI-powered virtual patrolling and video analytics for residential — automated patrols, real-time alerts, and compliance reports.", path: "/industries/residential", audience: "Residential" })]} faqs={faqs} breadcrumbs={[
      { label: 'Industries', href: '/industries' },
      { label: 'Residential' },
    ]}>
      <section className="pb-16">
        <div className="mx-auto max-w-site px-6">
          <h1 className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl">AI Security for Residential</h1>
          <p className="mt-6 max-w-2xl text-body text-muted-foreground">
            Residential communities face security challenges that cameras alone cannot solve and manned guards cannot cover consistently. Camzify's <a href="/virtual-patrolling" className="text-primary hover:underline">virtual patrolling</a> system runs automated AI patrol rounds on your existing cameras — checking every point, flagging failures, and notifying the right person.
          </p>

          <div className="mt-12 grid items-center gap-12 lg:grid-cols-2">
            <ScrollReveal>
              <div>
                <h2 className="font-display text-2xl font-bold">Common residential security gaps Camzify closes:</h2>
                <ul className="mt-4 space-y-3 text-muted-foreground">
                  <li className="flex gap-2">• Gated entry points left unwatched between staffed shifts</li>
                  <li className="flex gap-2">• Pool and amenity areas used after posted closing hours</li>
                  <li className="flex gap-2">• Visitor and delivery vehicles left unverified against resident lists</li>
                  <li className="flex gap-2">• A single nightly guard pass covering a large community footprint</li>
                  <li className="flex gap-2">• Camera outages going unnoticed until a resident reports a problem</li>
                  <li className="flex gap-2">• No record proving common areas were actually checked overnight</li>
                </ul>
              </div>
            </ScrollReveal>
            <PlaceholderVisual type="industry" caption="RESIDENTIAL" alt="Security monitoring in a residential environment" />
          </div>

          <div className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">Why residential communities need continuous AI monitoring</h2>
              <div className="mt-4 space-y-4 max-w-prose text-muted-foreground">
                <p>Residential communities and gated developments cover a lot of ground — entry gates, perimeter walls, parking areas, pools, and clubhouses — and most rely on a single guard or a nightly patrol to check all of it. One person walking a large property can realistically reach each point once or twice a shift, leaving long stretches where nothing is actually being watched.</p>
                <p>Standard CCTV records the footage but doesn't act on it — if something happens at the back gate at 3am, nobody knows until a resident notices or a review happens after the fact. For a community, that gap shows up directly in resident complaints and trust in the property's security.</p>
                <p>Continuous AI monitoring closes that gap by running the same checks a guard would make — gate status, pool area clear, parking lot activity — on a fixed schedule around the clock, so every point gets checked far more often than a single patrol could manage, with a timestamped record of every round.</p>
              </div>
            </ScrollReveal>
          </div>

          <div className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">Three questions residential security teams ask</h2>
              <div className="mt-8 grid gap-6 md:grid-cols-3">
                <div className="rounded-xl bg-card p-6 shadow">
                  <p className="font-display text-lg font-bold italic">"Is anyone at the gate who doesn't live here?"</p>
                  <p className="mt-3 text-sm text-muted-foreground">Camzify answers this with <Link href="/ai-features/zone-intrusion-detection" className="text-primary hover:underline">Zone Intrusion Detection</Link> and automated patrol verification.</p>
                </div>
                <div className="rounded-xl bg-card p-6 shadow">
                  <p className="font-display text-lg font-bold italic">"Were all community entry points checked tonight?"</p>
                  <p className="mt-3 text-sm text-muted-foreground">Camzify answers this with <Link href="/ai-features/line-intrusion-detection" className="text-primary hover:underline">Line Intrusion Detection</Link> and automated patrol verification.</p>
                </div>
                <div className="rounded-xl bg-card p-6 shadow">
                  <p className="font-display text-lg font-bold italic">"Is the pool area clear after closing time?"</p>
                  <p className="mt-3 text-sm text-muted-foreground">Camzify answers this with <Link href="/ai-features/motion-detection" className="text-primary hover:underline">Motion Detection</Link> and automated patrol verification.</p>
                </div>
              </div>
            </ScrollReveal>
          </div>

          <div className="mt-16 grid items-center gap-12 lg:grid-cols-2">
            <PlaceholderVisual type="diagram" caption="RESIDENTIAL PATROL SEQUENCE" alt="Diagram of a residential community patrol route stepping through entry gates, perimeter walls, and amenity areas" />
            <ScrollReveal>
              <div>
                <h2 className="font-display text-2xl font-bold">How Camzify works for residential</h2>

                <h3 className="mt-6 font-display text-lg font-bold">Building the patrol route</h3>
                <p className="mt-2 text-muted-foreground">
                  A patrol sequence is set up once for the community, ordering every camera stop — entry gates, perimeter walls, pool area, parking, common spaces — into a route that runs on a schedule matched to community quiet hours.
                </p>

                <h3 className="mt-6 font-display text-lg font-bold">Checking each stop</h3>
                <p className="mt-2 text-muted-foreground">
                  At each stop, the AI checks the defined conditions using <Link href="/ai-features/zone-intrusion-detection" className="text-primary hover:underline">zone intrusion</Link> and <Link href="/ai-features/motion-detection" className="text-primary hover:underline">motion detection</Link> — is the gate area clear, is the pool empty after closing, is anyone present where they shouldn't be.
                </p>

                <h3 className="mt-6 font-display text-lg font-bold">Routing the alert</h3>
                <p className="mt-2 text-muted-foreground">
                  A failed check creates an actionable alert with a snapshot and timestamp, routed to the community's assigned contact — property manager, HOA board, or on-call guard — and logged in that round's patrol report.
                </p>
              </div>
            </ScrollReveal>
          </div>

          <div className="mt-16 grid items-center gap-12 lg:grid-cols-2">
            <ScrollReveal>
              <div>
                <h2 className="font-display text-2xl font-bold">What to configure for a residential site</h2>
                <p className="mt-4 text-muted-foreground">Most residential deployments start with:</p>
                <ul className="mt-4 space-y-3 text-muted-foreground">
                  <li className="flex gap-2">• Entry gate and perimeter wall zones with continuous overnight coverage</li>
                  <li className="flex gap-2">• Pool and amenity area zones tied to posted closing hours</li>
                  <li className="flex gap-2">• Parking area rules for identifying vehicles present outside normal hours</li>
                  <li className="flex gap-2">• Patrol frequency aligned to community quiet hours, typically every 30-60 minutes overnight</li>
                  <li className="flex gap-2">• Escalation routing to the property manager, HOA board, or on-call guard</li>
                </ul>
              </div>
            </ScrollReveal>
            <PlaceholderVisual type="config-ui" caption="RESIDENTIAL ZONE SETUP" alt="Configuration panel showing entry gate and amenity zones mapped across a residential community camera layout" />
          </div>

          <div className="mt-16 grid items-center gap-12 lg:grid-cols-2">
            <PlaceholderVisual type="camera-feed" caption="RESIDENTIAL PATROL IN PROGRESS" alt="Camera feed showing an active patrol check at a residential community entry gate" />
            <ScrollReveal>
              <div>
                <h2 className="font-display text-2xl font-bold">Common scenarios</h2>
                <ul className="mt-4 space-y-3 text-muted-foreground">
                  <li className="flex gap-2">• A visitor or delivery vehicle lingering at the gate outside normal hours</li>
                  <li className="flex gap-2">• The pool or clubhouse occupied after posted closing time</li>
                  <li className="flex gap-2">• A perimeter wall or fence crossing overnight</li>
                  <li className="flex gap-2">• A parking area vehicle present well past a normal visit window</li>
                  <li className="flex gap-2">• A camera at a side entrance losing focus or going offline</li>
                </ul>
              </div>
            </ScrollReveal>
          </div>

          <div className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">Deployment notes</h2>
              <p className="mt-4 max-w-prose text-muted-foreground">Residential communities and gated developments typically have perimeter cameras and common-area cameras. Camzify connects to existing infrastructure and runs automated patrols aligned to community quiet hours.</p>
            </ScrollReveal>
          </div>

          <DeploymentPlan phases={deploymentPhases} />

          <div className="mt-12">
            <ScrollReveal>
              <p className="text-muted-foreground">
                See how the numbers work for your residential facility with the <Link href="/roi-calculator" className="text-primary hover:underline">ROI calculator</Link>, or review <Link href="/pricing" className="text-primary hover:underline">pricing</Link> to understand the per-camera licensing model.
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
                  <Link href="/ai-features/motion-detection" className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm hover:border-primary/30 hover:text-primary">Motion Detection</Link>
                  <Link href="/ai-features/camera-tampering-detection" className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm hover:border-primary/30 hover:text-primary">Camera Tampering</Link>
                </div>
              </div>
              <div className="rounded-xl border border-border bg-card p-6 text-center">
                <h3 className="font-display text-lg font-bold">Related use cases</h3>
                <div className="mt-4 flex flex-wrap justify-center gap-2">
                  <Link href="/use-cases/perimeter-security" className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm hover:border-primary/30 hover:text-primary">Perimeter Security</Link>
                  <Link href="/use-cases/trespassing-detection" className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm hover:border-primary/30 hover:text-primary">Trespassing Detection</Link>
                  <Link href="/use-cases/night-security" className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm hover:border-primary/30 hover:text-primary">Night Security</Link>
                </div>
              </div>
              <div className="rounded-xl border border-border bg-card p-6 text-center">
                <h3 className="font-display text-lg font-bold">Related industries</h3>
                <div className="mt-4 flex flex-wrap justify-center gap-2">
                  <Link href="/industries/property-management" className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm hover:border-primary/30 hover:text-primary">Property Management</Link>
                  <Link href="/industries/self-storage" className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm hover:border-primary/30 hover:text-primary">Self-Storage</Link>
                  <Link href="/industries/education-facilities" className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm hover:border-primary/30 hover:text-primary">Education Facilities</Link>
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
