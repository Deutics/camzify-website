import { generatePageMeta } from '@/lib/page-utils';
import { PageShell } from '@/components/layout/page-shell';
import { serviceSchema } from '@/lib/seo';
import { ScrollReveal } from '@/components/motion/scroll-reveal';
import { DeploymentPlan } from '@/components/content/deployment-plan';
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
  title: "AI Security for Property Management | Video Surveillance",
  description: "Camzify provides AI-powered virtual patrolling and video analytics for property management — automated patrols, real-time alerts, and compliance reports.",
  path: "/industries/property-management",
};

export const metadata = generatePageMeta({ ...pageMeta });

const deploymentPhases = [
    { title: "Start with the shared spaces", body: "Lobbies, car parks, bin stores, plant rooms and service entrances are onboarded first — the common areas residents and tenants complain about and no one physically patrols." },
    { title: "Prove the round happened", body: "Where a manned patrol was previously logged on paper, the scheduled sequence produces a timestamped per-point record that can be shown directly to a landlord or residents committee." },
    { title: "Scale across the portfolio", body: "Additional buildings are added under one account with per-site permissions, so a managing agent sees the whole portfolio while each site contact sees only their own building." },
];

const faqs = [
  { question: "Can I manage multiple properties from one account?", answer: "Yes. Multi-site management is a core platform feature, allowing centralised patrol scheduling, alert routing, and reporting across all managed properties." },
  { question: "How does Camzify handle different camera systems across different buildings in my portfolio?", answer: "Camzify connects to standard IP camera feeds and RTSP streams regardless of the underlying NVR or DVR brand, so each managed building can run on its own existing hardware while reporting into one centralised dashboard." },
  { question: "Will residents or tenants be notified that AI monitoring is in place?", answer: "That's a policy decision for the property owner or manager, not something Camzify sets for you. Many managers post standard signage the same way they would for any CCTV system, in line with local requirements." },
  { question: "How does Camzify avoid flagging residents going about normal activity?", answer: "Detection rules are scoped to specific zones and schedules, so a resident walking through a lobby during the day doesn't trigger the same rule as someone in a parking garage at 3am. Rules are tuned per property during setup." },
  { question: "Can patrol schedules differ between buildings in the same portfolio?", answer: "Yes. Each managed property runs its own patrol sequence, schedule, and escalation contact, so a downtown high-rise and a suburban garden-style complex can have completely different rules on the same account." },
  { question: "How does this compare to hiring an additional overnight guard for each building?", answer: "A guard covers one building at a time and only while on shift. Virtual patrolling runs the same scheduled checks across every managed property simultaneously, at a fraction of the cost of staffing each site separately." },
];

export default function PropertyManagementPage() {
  return (
    <PageShell {...pageMeta} schema={[serviceSchema({ name: "AI Security for Property Management", description: "Camzify provides AI-powered virtual patrolling and video analytics for property management — automated patrols, real-time alerts, and compliance reports.", path: "/industries/property-management", audience: "Property Management" })]} faqs={faqs} breadcrumbs={[
      { label: 'Industries', href: '/industries' },
      { label: 'Property Management' },
    ]}>
      <section className="pb-16">
        <div className="mx-auto max-w-site px-6">
          <h1 className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl">AI Security for Property Management</h1>
          <p className="mt-6 max-w-2xl text-body text-muted-foreground">
            Property management companies face security challenges that cameras alone cannot solve and manned guards cannot cover consistently. Camzify's <a href="/virtual-patrolling" className="text-primary hover:underline">virtual patrolling</a> system runs automated AI patrol rounds on your existing cameras — checking every point, flagging failures, and notifying the right person.
          </p>

          <div className="mt-12 grid items-center gap-12 lg:grid-cols-2">
            <ScrollReveal>
              <div>
                <h2 className="font-display text-2xl font-bold">Common property management security gaps Camzify closes:</h2>
                <ul className="mt-4 space-y-3 text-muted-foreground">
                  <li className="flex gap-2">• Common areas and hallways monitored only during staffed business hours</li>
                  <li className="flex gap-2">• Parking garages and structures with no continuous overnight coverage</li>
                  <li className="flex gap-2">• Rooftop and mechanical access points left unverified between site visits</li>
                  <li className="flex gap-2">• A single roaming property manager covering security across multiple buildings</li>
                  <li className="flex gap-2">• Camera outages across a multi-property portfolio going unnoticed for days</li>
                  <li className="flex gap-2">• No consolidated audit trail showing which buildings were actually checked</li>
                </ul>
              </div>
            </ScrollReveal>
            <Image
              src="/ai-security-for-property-management.jpg" alt="AI-monitored residential property showing bounding boxes around a security guard, visitors, and a delivery vehicle, with aerial views of the grounds" className="w-full rounded-xl"
              width={1600}
              height={900}
              priority
              sizes="(max-width: 1024px) 100vw, 60vw"
            />
          </div>

          <div className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">Why property management needs continuous AI monitoring</h2>
              <div className="mt-4 space-y-4 max-w-prose text-muted-foreground">
                <p>Property managers are typically responsible for a portfolio of buildings, not just one — a mix of residential, mixed-use, or commercial addresses spread across a city, each with its own common areas, parking structures, and access points. A single property manager or on-site super can walk one building's halls a few times a shift; the rest of the portfolio sits unchecked for hours or days between visits.</p>
                <p>Plain CCTV compounds the problem: footage from a dozen buildings sits on a dozen separate systems, reviewed only after a resident complaint or an incident report already lands on the manager's desk. By then, whatever happened in the stairwell, garage, or amenity space is long over.</p>
                <p>Virtual patrolling gives every managed property the same scheduled AI rounds a large staffed team would run, without needing a person physically present at each site. Every building gets checked on its own schedule, every result is logged, and alerts route to whoever's actually on call for that property — no portfolio-wide blind spots.</p>
              </div>
            </ScrollReveal>
          </div>

          <div className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">Three questions property management security teams ask</h2>
              <div className="mt-8 grid gap-6 md:grid-cols-3">
                <div className="rounded-xl bg-card p-6 shadow">
                  <p className="font-display text-lg font-bold italic">"Were all common areas checked overnight?"</p>
                  <p className="mt-3 text-sm text-muted-foreground">Camzify answers this with <Link href="/ai-features/zone-intrusion-detection" className="text-primary hover:underline">Zone Intrusion Detection</Link> and automated patrol verification.</p>
                </div>
                <div className="rounded-xl bg-card p-6 shadow">
                  <p className="font-display text-lg font-bold italic">"Is anyone in the parking garage after midnight?"</p>
                  <p className="mt-3 text-sm text-muted-foreground">Camzify answers this with <Link href="/ai-features/motion-detection" className="text-primary hover:underline">Motion Detection</Link> and automated patrol verification.</p>
                </div>
                <div className="rounded-xl bg-card p-6 shadow">
                  <p className="font-display text-lg font-bold italic">"Has the rooftop access been verified as secure?"</p>
                  <p className="mt-3 text-sm text-muted-foreground">Camzify answers this with <Link href="/ai-features/camera-tampering-detection" className="text-primary hover:underline">Camera Tampering Detection</Link> and automated patrol verification.</p>
                </div>
              </div>
            </ScrollReveal>
          </div>

          <div className="mt-16 grid items-center gap-12 lg:grid-cols-2">
            <PlaceholderVisual type="diagram" caption="PROPERTY MANAGEMENT PATROL SEQUENCE" alt="Diagram of a property management patrol route stepping through common areas, parking structures, and rooftop access points across a managed portfolio" />
            <ScrollReveal>
              <div>
                <h2 className="font-display text-2xl font-bold">How Camzify works for property management</h2>

                <h3 className="mt-6 font-display text-lg font-bold">Building the patrol route</h3>
                <p className="mt-2 text-muted-foreground">
                  A patrol sequence is set up once per property, ordering every camera stop — lobby, hallways, parking structure, rooftop access, amenity spaces — into a route that runs on a configurable schedule, with each managed building running its own independent route.
                </p>

                <h3 className="mt-6 font-display text-lg font-bold">Checking each stop</h3>
                <p className="mt-2 text-muted-foreground">
                  At each stop, the AI checks the defined conditions for that camera using <Link href="/ai-features/zone-intrusion-detection" className="text-primary hover:underline">zone intrusion</Link> and <Link href="/ai-features/motion-detection" className="text-primary hover:underline">motion detection</Link> — is the common area clear, is anyone in the garage after hours, is the camera unobstructed.
                </p>

                <h3 className="mt-6 font-display text-lg font-bold">Routing the alert</h3>
                <p className="mt-2 text-muted-foreground">
                  A failed check creates an actionable alert with a snapshot and timestamp, routed to the property manager or on-call staff member assigned to that building, and logged in that property's patrol report alongside every other result.
                </p>
              </div>
            </ScrollReveal>
          </div>

          <div className="mt-16 grid items-center gap-12 lg:grid-cols-2">
            <ScrollReveal>
              <div>
                <h2 className="font-display text-2xl font-bold">What to configure for a property management site</h2>
                <p className="mt-4 text-muted-foreground">Most property management deployments start with:</p>
                <ul className="mt-4 space-y-3 text-muted-foreground">
                  <li className="flex gap-2">• Common-area zones (lobbies, hallways, amenity spaces) with time-based activation</li>
                  <li className="flex gap-2">• Parking garage and structure zones active during overnight hours</li>
                  <li className="flex gap-2">• Restricted zones over rooftop and mechanical access points</li>
                  <li className="flex gap-2">• Per-property patrol schedules configured independently across the portfolio</li>
                  <li className="flex gap-2">• Escalation routing to the assigned property manager or building engineer</li>
                </ul>
              </div>
            </ScrollReveal>
            <PlaceholderVisual type="config-ui" caption="PROPERTY MANAGEMENT ZONE SETUP" alt="Configuration panel showing common-area and parking zones mapped across a managed property portfolio" />
          </div>

          <div className="mt-16 grid items-center gap-12 lg:grid-cols-2">
            <PlaceholderVisual type="camera-feed" caption="PROPERTY MANAGEMENT PATROL IN PROGRESS" alt="Camera feed showing an active patrol check at a property management common area" />
            <ScrollReveal>
              <div>
                <h2 className="font-display text-2xl font-bold">Common scenarios</h2>
                <ul className="mt-4 space-y-3 text-muted-foreground">
                  <li className="flex gap-2">• A pool, gym, or clubhouse occupied after posted closing hours</li>
                  <li className="flex gap-2">• An unauthorized vehicle parked in a resident-only garage overnight</li>
                  <li className="flex gap-2">• A side or service entrance propped open outside scheduled deliveries</li>
                  <li className="flex gap-2">• A rooftop access door left unsecured after a maintenance visit</li>
                  <li className="flex gap-2">• A stairwell camera going offline mid-shift across a managed building</li>
                </ul>
              </div>
            </ScrollReveal>
          </div>

          <div className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">Deployment notes</h2>
              <p className="mt-4 max-w-prose text-muted-foreground">Property management companies oversee multiple buildings with varying camera setups. Camzify's multi-site management allows centralised monitoring of all properties from one dashboard.</p>
            </ScrollReveal>
          </div>

          <DeploymentPlan phases={deploymentPhases} />

          <div className="mt-12">
            <ScrollReveal>
              <p className="text-muted-foreground">
                See how the numbers work for your property management facility with the <Link href="/roi-calculator" className="text-primary hover:underline">ROI calculator</Link>, or review <Link href="/pricing" className="text-primary hover:underline">pricing</Link> to understand the per-camera licensing model.
              </p>
            </ScrollReveal>
          </div>

          <div className="mt-16">
            <div className="grid gap-6 sm:grid-cols-3">
              <div className="rounded-xl border border-border bg-card p-6 text-center">
                <h3 className="font-display text-lg font-bold">AI Features used here</h3>
                <div className="mt-4 flex flex-wrap justify-center gap-2">
                  <Link href="/ai-features/zone-intrusion-detection" className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm hover:border-primary/30 hover:text-primary">Zone Intrusion</Link>
                  <Link href="/ai-features/motion-detection" className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm hover:border-primary/30 hover:text-primary">Motion Detection</Link>
                  <Link href="/ai-features/camera-tampering-detection" className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm hover:border-primary/30 hover:text-primary">Camera Tampering</Link>
                  <Link href="/ai-features/multi-object-tracking" className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm hover:border-primary/30 hover:text-primary">Multi-Object Tracking</Link>
                </div>
              </div>
              <div className="rounded-xl border border-border bg-card p-6 text-center">
                <h3 className="font-display text-lg font-bold">Related use cases</h3>
                <div className="mt-4 flex flex-wrap justify-center gap-2">
                  <Link href="/use-cases/after-hours-monitoring" className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm hover:border-primary/30 hover:text-primary">After-Hours Monitoring</Link>
                  <Link href="/use-cases/guard-tour-verification" className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm hover:border-primary/30 hover:text-primary">Guard Tour Verification</Link>
                  <Link href="/use-cases/parking-lot-surveillance" className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm hover:border-primary/30 hover:text-primary">Parking Lot Surveillance</Link>
                </div>
              </div>
              <div className="rounded-xl border border-border bg-card p-6 text-center">
                <h3 className="font-display text-lg font-bold">Related industries</h3>
                <div className="mt-4 flex flex-wrap justify-center gap-2">
                  <Link href="/industries/residential" className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm hover:border-primary/30 hover:text-primary">Residential</Link>
                  <Link href="/industries/self-storage" className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm hover:border-primary/30 hover:text-primary">Self-Storage</Link>
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
