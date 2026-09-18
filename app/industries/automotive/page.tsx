import { generatePageMeta } from '@/lib/page-utils';
import { PageShell } from '@/components/layout/page-shell';
import { FeatureHero } from '@/components/content/feature-hero';
import { FaqSection } from '@/components/content/faq-section';
import { PhotoFigure } from '@/components/content/photo-figure';
import { serviceSchema } from '@/lib/seo';
import { ScrollReveal } from '@/components/motion/scroll-reveal';
import { DeploymentPlan } from '@/components/content/deployment-plan';
import Link from 'next/link';
import { PointList } from '@/components/content/point-list';

/**
 * Page identity. Declared once and consumed twice: by `generatePageMeta` for the
 * <head> tags, and by `PageShell` for the on-page structured data. Keeping it in one
 * const is what stops the meta description and the schema drifting apart.
 *
 * Rewritten 2026-09-17 to cover the three automotive settings the business sells to,
 * in the order the leads arrive: repair shops and service centers, dealership lots and
 * showrooms, and multi-location groups running every branch on one console. The
 * earlier version spoke only to dealerships.
 */
const pageMeta = {
  title: "Auto Repair Shop & Dealership Security Cameras",
  description: "AI patrol rounds on the cameras a repair shop or dealership already owns: bays, yards and lots checked after hours, one report per branch.",
  path: "/industries/automotive",
};

export const metadata = generatePageMeta({ ...pageMeta });

const deploymentPhases = [
    { title: "Start with the bays and the yard", body: "Service bay and yard cameras go on first: customer vehicles sit in both long after the last technician leaves, and the roller shutters and yard gate are the checks that matter at close." },
    { title: "Patrol every branch overnight", body: "A round per site checks bays, yard rows, the parts store and the gate on the hours the branch is unstaffed, with zones drawn to the property line so passing traffic does not raise an alert." },
    { title: "Add condition and movement records", body: "Vehicle damage report and vehicle tracking give a dated visual record of the cars on site, which is the evidence usually missing when a customer disputes a scratch or a car is found moved." },
];

const faqs = [
  { question: "Does this work for an auto repair shop, or only for dealerships?", answer: "Both, on the same account. A repair shop or service center puts its bays, yard, parts store and gate on a closing checklist and an overnight round; a dealership adds the lot rows and the showroom. A group with both runs one round per branch and reads one report per branch." },
  { question: "We have several locations. Do we need an account per branch?", answer: "No. Every branch is a site on one account, with its own cameras, its own round on its own schedule and its own report. A branch manager sees only their site through permission groups, and the owner sees all of them on one login." },
  { question: "Can Camzify record the condition of a customer's car on the way in?", answer: "Vehicle damage report logs visible dents and scratches on a vehicle entering or leaving the site, with a timestamp, so there is a dated frame to put beside a customer's claim. It records what the camera can see; it is not an inspection." },
  { question: "Can Camzify integrate with the cameras we already have?", answer: "In most cases, yes. Camzify connects to any camera that streams RTSP, RTMP or HTTPS, and the Camzify Connector relays cameras on a local network without opening ports. There is no need to replace bay, yard or lot cameras to get started." },
  { question: "Does it replace the overnight attendant or the alarm?", answer: "It replaces the routine walk, not the response. A round checks every bay door, yard row and gate on a schedule and messages the person on call when a check fails; the alarm and whoever attends stay in place. For most shops it means covering hours nobody was watching, not removing someone who was." },
  { question: "How does it avoid alerts from cars passing on the road?", answer: "Zone and line rules are drawn to the actual boundary of the property, so a vehicle on the adjacent road or a pedestrian on the sidewalk is outside the rule. Every detection fires on a confirmed object track rather than on pixel change, so headlight flare and reflections off bodywork are not what triggers it, and zone shape and sensitivity are adjustable per camera." },
];

export default function AutomotivePage() {
  return (
    <PageShell {...pageMeta} schema={[serviceSchema({ name: "AI Security for Auto Repair Shops and Dealerships", description: pageMeta.description, path: "/industries/automotive", audience: "Automotive" })]} faqs={faqs} breadcrumbs={[
      { label: 'Industries', href: '/industries' },
      { label: 'Automotive' },
    ]}>
      <FeatureHero
        eyebrow="Industry · automotive"
        title="Security cameras for auto repair shops and dealerships, patrolled by AI"
        lede={<><strong className="font-semibold text-foreground">Repair shops, service centers and dealerships hold other people&apos;s cars overnight, in bays and yards that nobody watches after the last technician leaves.</strong> Camzify&apos;s <Link href="/virtual-patrolling" className="text-primary hover:underline">virtual patrolling</Link> runs a scheduled round on the security cameras already on site, checks every bay door, yard row and gate, messages the person on call when a check fails, and files a report per branch.</>}
        facts={['Bays, yards and lots checked on a schedule after close', 'One console and one report per branch', 'Runs on the cameras already installed']}
        primary={{ href: '/book-a-demo', label: 'Book a demo' }}
        secondary={{ href: '/virtual-patrolling/how-it-works', label: 'How a round works' }}
        visual={<PhotoFigure src="/ai-security-for-automotive.webp" alt="A vehicle yard and service building under AI camera monitoring" priority />}
      />

      <section className="pb-16">
        <div className="mx-auto max-w-site px-6">
          <div>
            <h2 className="font-display text-2xl font-bold">The gaps Camzify closes at a repair shop or dealership:</h2>
            <ul className="mt-4 grid gap-3 text-muted-foreground sm:grid-cols-2">
                  <li className="flex gap-2">• Customer vehicles left in open bays and the yard overnight with nobody watching</li>
                  <li className="flex gap-2">• Roller shutters and bay doors not confirmed closed at the end of the shift</li>
                  <li className="flex gap-2">• Parts and tool storage relying on a single closing walkthrough</li>
                  <li className="flex gap-2">• A dispute over a scratch with no dated frame of the car on arrival</li>
                  <li className="flex gap-2">• Dealership lot rows and showroom entrances unchecked after closing</li>
                  <li className="flex gap-2">• A group of branches with a recorder and a login at each one, and no single view</li>
                </ul>
          </div>

          <div className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">Why an auto business needs continuous monitoring</h2>
              <div className="mt-4 space-y-4 max-w-prose text-muted-foreground">
                <p>A repair shop is liable for every car on the premises from the moment the keys are handed over. Those cars sit in bays with the doors down, in a yard behind a gate, and on the road outside when the yard is full, for hours in which the shop is closed. A dealership adds rows of stock in the open and a showroom full of glass.</p>
                <p>Plain CCTV records all of it and is looked at after a car has gone or a customer has complained. A closing walkthrough covers the site for a few minutes. Neither answers, the next morning, whether every bay door stayed down and whether anyone was in the yard at three in the morning.</p>
                <p>A scheduled round answers it.</p>
                <PointList items={[
                  'It checks every bay door, yard row, parts store and gate on a repeating schedule through the night.',
                  'It raises an alert the moment a check fails or a detection fires between rounds.',
                  'It leaves a report per site, with a frame per check, that a manager reads with the first coffee.',
                ]} />
              </div>
            </ScrollReveal>
          </div>

          <div className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">Three questions an owner asks</h2>
              <div className="mt-8 grid gap-6 md:grid-cols-3">
                <div className="rounded-xl bg-card p-6 shadow">
                  <p className="font-display text-lg font-bold italic">"Is anyone in the yard or the bays after hours?"</p>
                  <p className="mt-3 text-sm text-muted-foreground">Answered with <Link href="/ai-features/zone-intrusion-detection" className="text-primary hover:underline">zone intrusion detection</Link> on the yard and bays, and a round that confirms them clear at each stop.</p>
                </div>
                <div className="rounded-xl bg-card p-6 shadow">
                  <p className="font-display text-lg font-bold italic">"Did every shutter come down at close, at every branch?"</p>
                  <p className="mt-3 text-sm text-muted-foreground">Answered with a <Link href="/virtual-patrolling/patrol-checklists" className="text-primary hover:underline">closing checklist</Link> per site and a <Link href="/virtual-patrolling/patrol-reports" className="text-primary hover:underline">report</Link> per branch, with the frame for each door.</p>
                </div>
                <div className="rounded-xl bg-card p-6 shadow">
                  <p className="font-display text-lg font-bold italic">"Was that scratch there when the car came in?"</p>
                  <p className="mt-3 text-sm text-muted-foreground">Answered with <Link href="/ai-features/vehicle-damage-report" className="text-primary hover:underline">vehicle damage report</Link>, a dated frame of visible damage on a vehicle entering or leaving the site.</p>
                </div>
              </div>
            </ScrollReveal>
          </div>

          <div className="mt-16 grid items-center gap-12 lg:grid-cols-2">
            <PhotoFigure src="/industry-automotive-2.webp" alt="The console configuring a detection on an automotive camera, the zone drawn over the live frame" caption="Configuring a detection in the console" />
            <ScrollReveal>
              <div>
                <h2 className="font-display text-2xl font-bold">How Camzify works for a repair shop or dealership</h2>

                <h3 className="mt-6 font-display text-lg font-bold">Building the round</h3>
                <p className="mt-2 text-muted-foreground">
                  A patrol sequence is set up once per site, ordering every camera stop, the bays, the yard rows, the parts store, the gate, and at a dealership the lot and the showroom, into a route that runs on the hours the branch is closed.
                </p>

                <h3 className="mt-6 font-display text-lg font-bold">Checking each stop</h3>
                <p className="mt-2 text-muted-foreground">
                  At each stop the AI checks the conditions set for that camera, using <Link href="/ai-features/zone-intrusion-detection" className="text-primary hover:underline">zone intrusion detection</Link> and <Link href="/ai-features/multi-object-tracking" className="text-primary hover:underline">multi-object tracking</Link>.
                </p>
                <PointList items={[
                  'It checks that the bay doors and shutters are down.',
                  'It checks that the yard and bays are clear of people.',
                  'It checks that no vehicle has moved from where it was parked.',
                ]} />

                <h3 className="mt-6 font-display text-lg font-bold">Routing the alert</h3>
                <p className="mt-2 text-muted-foreground">
                  A failed check, such as a <Link href="/ai-features/line-intrusion-detection" className="text-primary hover:underline">line intrusion</Link> at the yard gate, raises an alert with a snapshot and a timestamp, messages the person on call for that branch, and is logged in that round&apos;s report.
                </p>
              </div>
            </ScrollReveal>
          </div>

          <div className="mt-16 grid items-center gap-12 lg:grid-cols-2">
            <ScrollReveal>
              <div>
                <h2 className="font-display text-2xl font-bold">What to configure</h2>
                <p className="mt-4 text-muted-foreground">Most repair shops and dealerships start with:</p>
                <ul className="mt-4 space-y-3 text-muted-foreground">
                  <li className="flex gap-2">• Zones over the bays and the yard, notified in the hours the branch is closed</li>
                  <li className="flex gap-2">• A line rule on the yard gate and, at a dealership, along the lot boundary</li>
                  <li className="flex gap-2">• A restricted zone over the parts store and the key safe area</li>
                  <li className="flex gap-2">• A closing checklist confirming every shutter, bay door and gate</li>
                  <li className="flex gap-2">• Vehicle damage report on the entry and exit cameras for a dated condition record</li>
                  <li className="flex gap-2">• PPE detection in the bays where gloves and hi-vis are policy</li>
                  <li className="flex gap-2">• Escalation to the on-call manager for that branch</li>
                </ul>
              </div>
            </ScrollReveal>
            <PhotoFigure src="/industry-automotive-3.webp" alt="Live streaming from an automotive camera with people and vehicles outlined as they are tracked" caption="Live view with tracking" />
          </div>

          <div className="mt-16 grid items-center gap-12 lg:grid-cols-2">
            <PhotoFigure src="/industry-automotive-4.jpg" alt="Frames from a round across the automotive site, each with its alert raised" caption="Round frames with alerts" />
            <ScrollReveal>
              <div>
                <h2 className="font-display text-2xl font-bold">Common scenarios</h2>
                <ul className="mt-4 space-y-3 text-muted-foreground">
                  <li className="flex gap-2">• A bay door left open after the last technician clocks out</li>
                  <li className="flex gap-2">• Someone in the yard between customer vehicles at night</li>
                  <li className="flex gap-2">• A car moved within the yard or the lot outside business hours</li>
                  <li className="flex gap-2">• A customer disputing damage, settled by the frame from the day the car arrived</li>
                  <li className="flex gap-2">• Someone lingering at the showroom entrance after closing</li>
                  <li className="flex gap-2">• A yard camera losing focus or being repositioned, raised as tampering</li>
                </ul>
              </div>
            </ScrollReveal>
          </div>

          <div className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">For groups with several branches</h2>
              <div className="mt-4 max-w-prose space-y-4 text-muted-foreground">
                <p>A repair chain or dealer group usually has a recorder and a login at every branch, and an owner who cannot look at all of them. On Camzify every branch is a site on one account: its own cameras, its own round on its own schedule, its own report each morning, and a branch manager who sees only their site through <Link href="/platform/permission-groups" className="text-primary hover:underline">permission groups</Link>.</p>
                <p>The owner sees every branch on one <Link href="/platform/live-streaming" className="text-primary hover:underline">live wall</Link> grouped by site, and the same closing checklist applied to every location, so a shutter left up in one branch reads exactly like a shutter left up in another. The <Link href="/guides/cloud-vms-for-multiple-sites" className="text-primary hover:underline">multi-site guide</Link> covers the rollout branch by branch, and the <Link href="/industries/multiple-sites" className="text-primary hover:underline">multiple sites</Link> page covers the operating model.</p>
              </div>
            </ScrollReveal>
          </div>

          <DeploymentPlan phases={deploymentPhases} />

          <div className="mt-12">
            <ScrollReveal>
              <p className="text-muted-foreground">
                See how the numbers work for your automotive facility with the <Link href="/roi-calculator" className="text-primary hover:underline">ROI calculator</Link>, or review <Link href="/pricing" className="text-primary hover:underline">pricing</Link> to understand the per-instance licensing model. Recording and retention for the same cameras are covered on <Link href="/cloud-video-surveillance" className="text-primary hover:underline">cloud video surveillance</Link>.
              </p>
            </ScrollReveal>
          </div>

          <div className="mt-16">
            <div className="grid gap-6 sm:grid-cols-3">
              <div className="rounded-xl border border-border bg-card p-6 text-center">
                <h3 className="font-display text-lg font-bold">AI Features used here</h3>
                <div className="mt-4 flex flex-wrap justify-center gap-2">
                  <Link href="/ai-features/zone-intrusion-detection" className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm hover:border-primary/30 hover:text-primary">Zone Intrusion Detection</Link>
                  <Link href="/ai-features/vehicle-damage-report" className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm hover:border-primary/30 hover:text-primary">Vehicle Damage Report</Link>
                  <Link href="/ai-features/line-intrusion-detection" className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm hover:border-primary/30 hover:text-primary">Line Intrusion Detection</Link>
                  <Link href="/ai-features/ppe-violation-detection" className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm hover:border-primary/30 hover:text-primary">PPE Violation Detection</Link>
                  <Link href="/ai-features/camera-tampering-detection" className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm hover:border-primary/30 hover:text-primary">Camera Tampering Detection</Link>
                </div>
              </div>
              <div className="rounded-xl border border-border bg-card p-6 text-center">
                <h3 className="font-display text-lg font-bold">Related use cases</h3>
                <div className="mt-4 flex flex-wrap justify-center gap-2">
                  <Link href="/use-cases/lock-up-and-closing-checks" className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm hover:border-primary/30 hover:text-primary">Lock-Up and Closing Checks</Link>
                  <Link href="/use-cases/vehicle-monitoring" className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm hover:border-primary/30 hover:text-primary">Vehicle Monitoring</Link>
                  <Link href="/use-cases/theft-prevention" className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm hover:border-primary/30 hover:text-primary">Theft Prevention</Link>
                  <Link href="/use-cases/car-theft-and-vandalism-in-parking-facilities" className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm hover:border-primary/30 hover:text-primary">Car theft and vandalism in parking facilities</Link>
                  <Link href="/use-cases/one-live-wall-for-every-brand-and-location" className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm hover:border-primary/30 hover:text-primary">One live wall for every branch</Link>
                </div>
              </div>
              <div className="rounded-xl border border-border bg-card p-6 text-center">
                <h3 className="font-display text-lg font-bold">Related industries</h3>
                <div className="mt-4 flex flex-wrap justify-center gap-2">
                  <Link href="/industries/multiple-sites" className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm hover:border-primary/30 hover:text-primary">Multiple Sites</Link>
                  <Link href="/industries/manufacturing" className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm hover:border-primary/30 hover:text-primary">Manufacturing</Link>
                  <Link href="/industries/warehouses" className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm hover:border-primary/30 hover:text-primary">Warehouses</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <FaqSection items={faqs} />
    </PageShell>
  );
}
