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
  title: "AI Security for Restaurants | Video Surveillance",
  description: "Camzify provides AI-powered virtual patrolling and video analytics for restaurants — automated patrols, real-time alerts, and compliance reports.",
  path: "/industries/restaurants",
};

export const metadata = generatePageMeta({ ...pageMeta });

const deploymentPhases = [
    { title: "Begin at the back door and the till line", body: "Delivery entrances, stockrooms, walk-ins and the cash area are onboarded first. These are the points open at odd hours and least visible from the floor." },
    { title: "Verify open and close", body: "Two short sequences check that the site was secured at close and intact at open — doors locked, storage closed, no presence after hours — with a report for each." },
    { title: "Repeat the template per location", body: "Multi-site operators apply one sequence across every restaurant, so the same checks run at every location without rebuilding the configuration each time." },
];

const faqs = [
  { question: "Can Camzify verify that closing procedures were followed?", answer: "Yes. A patrol sequence can check: back door locked, dining area clear, kitchen clean-up area verified, walk-in doors closed. Any failed check alerts the manager on duty." },
  { question: "Can Camzify check our full closing procedure automatically?", answer: "Yes. A patrol sequence can be built around your specific closing checklist — back door locked, dining area clear, walk-in doors closed, storage secured — and it runs the same way every night regardless of who closed." },
  { question: "Will this flag staff doing normal prep work after hours?", answer: "Detection rules are scoped to specific zones and schedules, so a kitchen zone active only after the posted closing time won't trigger during a late prep shift that's outside those hours. Schedules are set during setup to match your actual hours." },
  { question: "How fast does a manager get notified if the back door was left unlocked?", answer: "Alerts fire in near real time from the moment a confirmed event is detected and route to the assigned manager through the notification queue with a timestamped clip, typically within seconds." },
  { question: "Does Camzify work with the cameras we already have in the kitchen and dining area?", answer: "In most cases, yes. Camzify works with any IP camera feed, so existing kitchen and dining area cameras can usually be connected without new hardware, provided they support standard IP or RTSP streaming." },
  { question: "How does this compare to relying on staff to self-report a missed closing step?", answer: "Self-reporting depends on someone remembering and admitting a step was missed. Automated patrol checks verify the same points independently every night and create a record either way, which removes the guesswork from closing compliance." },
];

export default function RestaurantsPage() {
  return (
    <PageShell {...pageMeta} schema={[serviceSchema({ name: "AI Security for Restaurants", description: "Camzify provides AI-powered virtual patrolling and video analytics for restaurants — automated patrols, real-time alerts, and compliance reports.", path: "/industries/restaurants", audience: "Restaurants" })]} faqs={faqs} breadcrumbs={[
      { label: 'Industries', href: '/industries' },
      { label: 'Restaurants' },
    ]}>
      <section className="pb-16">
        <div className="mx-auto max-w-site px-6">
          <h1 className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl">AI Security for Restaurants</h1>
          <p className="mt-6 max-w-2xl text-body text-muted-foreground">
            Restaurants face security challenges that cameras alone cannot solve and manned guards cannot cover consistently. Camzify's <a href="/virtual-patrolling" className="text-primary hover:underline">virtual patrolling</a> system runs automated AI patrol rounds on your existing cameras — checking every point, flagging failures, and notifying the right person.
          </p>

          <div className="mt-12 grid items-center gap-12 lg:grid-cols-2">
            <ScrollReveal>
              <div>
                <h2 className="font-display text-2xl font-bold">Common restaurant security gaps Camzify closes:</h2>
                <ul className="mt-4 space-y-3 text-muted-foreground">
                  <li className="flex gap-2">• Back doors and delivery entrances left unmonitored between deliveries</li>
                  <li className="flex gap-2">• Closing procedures relying on whoever locks up that night to remember every step</li>
                  <li className="flex gap-2">• Walk-in cooler and freezer doors left ajar overnight</li>
                  <li className="flex gap-2">• Kitchen and storage areas with no coverage after staff leave</li>
                  <li className="flex gap-2">• Camera outages going unnoticed until the next shift</li>
                  <li className="flex gap-2">• No record proving closing checks were actually completed</li>
                </ul>
              </div>
            </ScrollReveal>
            <PlaceholderVisual type="industry" caption="RESTAURANTS" alt="Security monitoring in a restaurants environment" />
          </div>

          <div className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">Why restaurants need continuous AI monitoring</h2>
              <div className="mt-4 space-y-4 max-w-prose text-muted-foreground">
                <p>Restaurants run on a tight closing routine — locking the back door, clearing the dining room, verifying the walk-in coolers, securing storage — and that routine is only as reliable as whoever is doing it on a given night. A rushed close after a long shift means steps get skipped, and nobody finds out until there's a problem the next morning.</p>
                <p>Standard CCTV records the close happening but doesn't verify anything — footage only gets reviewed after spoiled inventory, a break-in, or a loss is already discovered. By then, the walk-in door had been open all night, or the back entrance was unlocked for hours.</p>
                <p>Continuous AI monitoring turns the closing routine into an automated checklist: the same points get checked on the same schedule every night regardless of who closed, with a logged result and an immediate alert to the manager on duty if something was missed.</p>
              </div>
            </ScrollReveal>
          </div>

          <div className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">Three questions restaurants security teams ask</h2>
              <div className="mt-8 grid gap-6 md:grid-cols-3">
                <div className="rounded-xl bg-card p-6 shadow">
                  <p className="font-display text-lg font-bold italic">"Was the back door locked when the last person left?"</p>
                  <p className="mt-3 text-sm text-muted-foreground">Camzify answers this with <Link href="/ai-features/zone-intrusion-detection" className="text-primary hover:underline">Zone Intrusion Detection</Link> and automated patrol verification.</p>
                </div>
                <div className="rounded-xl bg-card p-6 shadow">
                  <p className="font-display text-lg font-bold italic">"Is anyone inside after closing time?"</p>
                  <p className="mt-3 text-sm text-muted-foreground">Camzify answers this with <Link href="/ai-features/motion-detection" className="text-primary hover:underline">Motion Detection</Link> and automated patrol verification.</p>
                </div>
                <div className="rounded-xl bg-card p-6 shadow">
                  <p className="font-display text-lg font-bold italic">"Were the walk-in cooler doors closed overnight?"</p>
                  <p className="mt-3 text-sm text-muted-foreground">Camzify answers this with <Link href="/ai-features/camera-tampering-detection" className="text-primary hover:underline">Camera Tampering Detection</Link> and automated patrol verification.</p>
                </div>
              </div>
            </ScrollReveal>
          </div>

          <div className="mt-16 grid items-center gap-12 lg:grid-cols-2">
            <PlaceholderVisual type="diagram" caption="RESTAURANT PATROL SEQUENCE" alt="Diagram of a restaurant closing patrol route stepping through the back door, dining area, kitchen, and walk-in coolers" />
            <ScrollReveal>
              <div>
                <h2 className="font-display text-2xl font-bold">How Camzify works for restaurants</h2>

                <h3 className="mt-6 font-display text-lg font-bold">Building the patrol route</h3>
                <p className="mt-2 text-muted-foreground">
                  A patrol sequence is set up once, ordering every camera stop — back door, dining area, kitchen, walk-in coolers, storage — into a closing-time route that runs automatically after hours.
                </p>

                <h3 className="mt-6 font-display text-lg font-bold">Checking each stop</h3>
                <p className="mt-2 text-muted-foreground">
                  At each stop, the AI checks the defined conditions using <Link href="/ai-features/zone-intrusion-detection" className="text-primary hover:underline">zone intrusion</Link> and <Link href="/ai-features/motion-detection" className="text-primary hover:underline">motion detection</Link> — is the back door secured, is the dining area clear, is anyone still in the building after closing.
                </p>

                <h3 className="mt-6 font-display text-lg font-bold">Routing the alert</h3>
                <p className="mt-2 text-muted-foreground">
                  A failed check creates an actionable alert with a snapshot and timestamp, routed to the manager on duty, and logged in that night's patrol report as part of the closing record.
                </p>
              </div>
            </ScrollReveal>
          </div>

          <div className="mt-16 grid items-center gap-12 lg:grid-cols-2">
            <ScrollReveal>
              <div>
                <h2 className="font-display text-2xl font-bold">What to configure for a restaurant site</h2>
                <p className="mt-4 text-muted-foreground">Most restaurant deployments start with:</p>
                <ul className="mt-4 space-y-3 text-muted-foreground">
                  <li className="flex gap-2">• Back-door and delivery entrance zones with schedule-based activation</li>
                  <li className="flex gap-2">• Walk-in cooler and freezer door checks as part of the closing sequence</li>
                  <li className="flex gap-2">• Dining area and kitchen zones active only after closing time</li>
                  <li className="flex gap-2">• Closing-time patrol sequence triggered on a fixed nightly schedule</li>
                  <li className="flex gap-2">• Escalation routing to the manager on duty for failed closing checks</li>
                </ul>
              </div>
            </ScrollReveal>
            <PlaceholderVisual type="config-ui" caption="RESTAURANT ZONE SETUP" alt="Configuration panel showing back-door and walk-in cooler zones mapped across a restaurant camera layout" />
          </div>

          <div className="mt-16 grid items-center gap-12 lg:grid-cols-2">
            <PlaceholderVisual type="camera-feed" caption="RESTAURANT PATROL IN PROGRESS" alt="Camera feed showing an active patrol check at a restaurant back entrance" />
            <ScrollReveal>
              <div>
                <h2 className="font-display text-2xl font-bold">Common scenarios</h2>
                <ul className="mt-4 space-y-3 text-muted-foreground">
                  <li className="flex gap-2">• The back door left unlocked after the last delivery of the night</li>
                  <li className="flex gap-2">• A walk-in cooler or freezer door left ajar at close</li>
                  <li className="flex gap-2">• Someone still in the dining area or kitchen after closing time</li>
                  <li className="flex gap-2">• A storage area accessed outside normal business hours</li>
                  <li className="flex gap-2">• A camera near the loading area losing focus or going offline</li>
                </ul>
              </div>
            </ScrollReveal>
          </div>

          <div className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">Deployment notes</h2>
              <p className="mt-4 max-w-prose text-muted-foreground">Restaurants typically have 4-8 cameras covering the kitchen, dining area, back entrance, and storage areas. Camzify connects via RTSP or the Camzify Connector and runs after-hours patrols to verify closing procedures.</p>
            </ScrollReveal>
          </div>

          <DeploymentPlan phases={deploymentPhases} />

          <div className="mt-12">
            <ScrollReveal>
              <p className="text-muted-foreground">
                See how the numbers work for your restaurants facility with the <Link href="/roi-calculator" className="text-primary hover:underline">ROI calculator</Link>, or review <Link href="/pricing" className="text-primary hover:underline">pricing</Link> to understand the per-camera licensing model.
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
                  <Link href="/ai-features/line-intrusion-detection" className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm hover:border-primary/30 hover:text-primary">Line Intrusion</Link>
                </div>
              </div>
              <div className="rounded-xl border border-border bg-card p-6 text-center">
                <h3 className="font-display text-lg font-bold">Related use cases</h3>
                <div className="mt-4 flex flex-wrap justify-center gap-2">
                  <Link href="/use-cases/after-hours-monitoring" className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm hover:border-primary/30 hover:text-primary">After-Hours Monitoring</Link>
                  <Link href="/use-cases/theft-prevention" className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm hover:border-primary/30 hover:text-primary">Theft Prevention</Link>
                  <Link href="/use-cases/night-security" className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm hover:border-primary/30 hover:text-primary">Night Security</Link>
                </div>
              </div>
              <div className="rounded-xl border border-border bg-card p-6 text-center">
                <h3 className="font-display text-lg font-bold">Related industries</h3>
                <div className="mt-4 flex flex-wrap justify-center gap-2">
                  <Link href="/industries/retail" className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm hover:border-primary/30 hover:text-primary">Retail</Link>
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
