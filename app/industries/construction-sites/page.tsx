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
  title: "AI Security for Construction Sites | Video Surveillance",
  description: "Camzify provides AI-powered virtual patrolling and video analytics for construction sites — automated patrols, real-time alerts, and compliance reports.",
  path: "/industries/construction-sites",
};

export const metadata = generatePageMeta({ ...pageMeta });

const deploymentPhases = [
    { title: "Fence the site virtually before week one", body: "Temporary and trailer-mounted cameras covering the hoarding line, gate and materials compound are onboarded first. Sites with no fixed network run through the Connector over a cellular link." },
    { title: "Patrol the hours the site is empty", body: "Rounds are scheduled overnight, on weekends and across shutdown periods — the windows when plant theft and metal theft actually happen — rather than during working hours." },
    { title: "Move the coverage as the build moves", body: "Sequences are re-ordered as the site progresses and compounds relocate. Cameras are added and retired per phase, and licensing follows the camera count rather than a fixed contract." },
];

const faqs = [
  { question: "Can Camzify work with temporary cameras on 4G?", answer: "Yes. If the camera supports RTSP or HLS streaming over its cellular connection, Camzify can connect to it. The Camzify Connector can also relay feeds from LAN-only cameras through limited bandwidth connections." },
  { question: "How quickly can Camzify be deployed on a new site?", answer: "Once cameras are streaming, adding a site to Camzify takes minutes. Build the patrol sequence, assign cameras, configure checklists, and patrols can run the same day." },
  { question: "How does Camzify handle cameras that move locations as the site progresses?", answer: "Zones and patrol stops are tied to the camera, not a fixed physical address, so when a camera is repositioned as the build progresses, its zone can be redrawn against the new view in a few minutes without rebuilding the whole patrol sequence." },
  { question: "Will Camzify generate false alerts from wind-blown debris or tarps on site?", answer: "Detection is tuned around object type and zone rules rather than raw motion, which cuts down on false triggers from blowing tarps, dust, or shifting shadows. Sensitivity and zone shape can be adjusted per camera during setup for particularly exposed or windy areas." },
  { question: "Is footage from a construction site retained differently than a fixed facility?", answer: "Retention settings are configurable per account, not tied to site type, so a temporary construction site can run the same retention and access controls as a permanent facility for as long as the project requires." },
  { question: "Does virtual patrolling replace our night watchman on site?", answer: "For most sites, it reduces the need to add or scale a dedicated overnight watchman rather than removing site security altogether. Many contractors run virtual patrols alongside a smaller on-call presence, using AI to cover the full perimeter and yard between physical checks." },
];

export default function ConstructionSitesPage() {
  return (
    <PageShell {...pageMeta} schema={[serviceSchema({ name: "AI Security for Construction Sites", description: "Camzify provides AI-powered virtual patrolling and video analytics for construction sites — automated patrols, real-time alerts, and compliance reports.", path: "/industries/construction-sites", audience: "Construction Sites" })]} faqs={faqs} breadcrumbs={[
      { label: 'Industries', href: '/industries' },
      { label: 'Construction Sites' },
    ]}>
      <section className="pb-16">
        <div className="mx-auto max-w-site px-6">
          <h1 className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl">AI Security for Construction Sites</h1>
          <p className="mt-6 max-w-2xl text-body text-muted-foreground">
            Construction sites face security challenges that cameras alone cannot solve and manned guards cannot cover consistently. Camzify's <a href="/virtual-patrolling" className="text-primary hover:underline">virtual patrolling</a> system runs automated AI patrol rounds on your existing cameras — checking every point, flagging failures, and notifying the right person.
          </p>

          <div className="mt-12 grid items-center gap-12 lg:grid-cols-2">
            <ScrollReveal>
              <div>
                <h2 className="font-display text-2xl font-bold">Common construction site security gaps Camzify closes:</h2>
                <ul className="mt-4 space-y-3 text-muted-foreground">
                  <li className="flex gap-2">• Open perimeters where temporary fencing panels can be moved or breached</li>
                  <li className="flex gap-2">• Equipment and material storage areas relying on a single closing check</li>
                  <li className="flex gap-2">• Site trailers and tool cribs left unmonitored overnight</li>
                  <li className="flex gap-2">• Camera positions changing week to week as the build progresses</li>
                  <li className="flex gap-2">• No audit trail proving a night patrol actually happened</li>
                  <li className="flex gap-2">• Scrap metal and copper wiring theft going undetected until morning</li>
                </ul>
              </div>
            </ScrollReveal>
            <Image
              src="/ai-security-for-construction-sites.jpg" alt="AI-monitored construction site showing bounding boxes around workers, equipment, and material storage, with drone views of the site" className="w-full rounded-xl"
              width={1600}
              height={900}
              priority
              sizes="(max-width: 1024px) 100vw, 60vw"
            />
          </div>

          <div className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">Why construction sites need continuous AI monitoring</h2>
              <div className="mt-4 space-y-4 max-w-prose text-muted-foreground">
                <p>A construction site sits unoccupied for far more hours than it is worked — evenings, weekends, and the gaps between shifts — while holding materials, machinery, and copper wiring that are attractive and easy to move for anyone who gets past the fence line. A site is rarely staffed overnight at all, and where it is, one person cannot watch a laydown yard, a trailer row, and a full perimeter at the same time.</p>
                <p>The layout itself keeps changing too. Fencing, storage areas, and camera positions shift week to week as the build progresses, which makes a fixed guard route or a "review the footage later" approach to CCTV fall behind the site almost as soon as it is set.</p>
                <p>Continuous AI monitoring adapts with the site — zones and patrol stops are redrawn as cameras move — and checks the full perimeter and yard on a repeating schedule, flagging a breach or a moved fence panel the moment it happens instead of the next time someone reviews the recording.</p>
              </div>
            </ScrollReveal>
          </div>

          <div className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">Three questions construction sites security teams ask</h2>
              <div className="mt-8 grid gap-6 md:grid-cols-3">
                <div className="rounded-xl bg-card p-6 shadow">
                  <p className="font-display text-lg font-bold italic">"Did anyone enter the site after the last worker left?"</p>
                  <p className="mt-3 text-sm text-muted-foreground">Camzify answers this with <Link href="/ai-features/line-intrusion-detection" className="text-primary hover:underline">Line Intrusion Detection</Link> and automated patrol verification.</p>
                </div>
                <div className="rounded-xl bg-card p-6 shadow">
                  <p className="font-display text-lg font-bold italic">"Is the temporary fencing still intact?"</p>
                  <p className="mt-3 text-sm text-muted-foreground">Camzify answers this with <Link href="/ai-features/zone-intrusion-detection" className="text-primary hover:underline">Zone Intrusion Detection</Link> and automated patrol verification.</p>
                </div>
                <div className="rounded-xl bg-card p-6 shadow">
                  <p className="font-display text-lg font-bold italic">"Were the equipment storage areas checked overnight?"</p>
                  <p className="mt-3 text-sm text-muted-foreground">Camzify answers this with <Link href="/ai-features/motion-detection" className="text-primary hover:underline">Motion Detection</Link> and automated patrol verification.</p>
                </div>
              </div>
            </ScrollReveal>
          </div>

          <div className="mt-16 grid items-center gap-12 lg:grid-cols-2">
            <PlaceholderVisual type="diagram" caption="CONSTRUCTION SITE PATROL SEQUENCE" alt="Diagram of a construction site patrol route stepping through the perimeter fence line, equipment yard, and site trailers" />
            <ScrollReveal>
              <div>
                <h2 className="font-display text-2xl font-bold">How Camzify works for construction sites</h2>

                <h3 className="mt-6 font-display text-lg font-bold">Building the patrol route</h3>
                <p className="mt-2 text-muted-foreground">
                  A patrol sequence is set up once, ordering every camera stop — perimeter fence lines, the equipment yard, material laydown areas, site trailers — into a single route that runs on a configurable schedule and can be re-ordered as the site layout changes.
                </p>

                <h3 className="mt-6 font-display text-lg font-bold">Checking each stop</h3>
                <p className="mt-2 text-muted-foreground">
                  At each stop, the AI checks the defined conditions for that camera using <Link href="/ai-features/line-intrusion-detection" className="text-primary hover:underline">line intrusion</Link>, <Link href="/ai-features/zone-intrusion-detection" className="text-primary hover:underline">zone intrusion</Link>, and <Link href="/ai-features/motion-detection" className="text-primary hover:underline">motion detection</Link> — is the fence line intact, is the yard clear, is there movement where there should not be.
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
                <h2 className="font-display text-2xl font-bold">What to configure for a construction site</h2>
                <p className="mt-4 text-muted-foreground">Most construction site deployments start with:</p>
                <ul className="mt-4 space-y-3 text-muted-foreground">
                  <li className="flex gap-2">• Perimeter line rules along temporary fencing panels</li>
                  <li className="flex gap-2">• Zones over the equipment yard and material laydown areas</li>
                  <li className="flex gap-2">• Motion detection scoped to trailers and tool storage after hours</li>
                  <li className="flex gap-2">• Patrol frequency scaled up during high-theft-risk phases, such as copper or wiring installation</li>
                  <li className="flex gap-2">• Quick zone re-mapping workflow for when camera positions shift with site progress</li>
                </ul>
              </div>
            </ScrollReveal>
            <PlaceholderVisual type="config-ui" caption="CONSTRUCTION SITE ZONE SETUP" alt="Configuration panel showing perimeter and equipment yard zones mapped across a construction site camera layout" />
          </div>

          <div className="mt-16 grid items-center gap-12 lg:grid-cols-2">
            <PlaceholderVisual type="camera-feed" caption="CONSTRUCTION SITE PATROL IN PROGRESS" alt="Camera feed showing an active patrol check along a construction site perimeter fence" />
            <ScrollReveal>
              <div>
                <h2 className="font-display text-2xl font-bold">Common scenarios</h2>
                <ul className="mt-4 space-y-3 text-muted-foreground">
                  <li className="flex gap-2">• A section of temporary fencing found down or moved overnight</li>
                  <li className="flex gap-2">• Movement detected near the material laydown area after the crew departs</li>
                  <li className="flex gap-2">• A site trailer door left open following the last shift</li>
                  <li className="flex gap-2">• An unfamiliar vehicle parked inside the site perimeter after hours</li>
                  <li className="flex gap-2">• A camera knocked out of alignment by wind or nearby equipment</li>
                </ul>
              </div>
            </ScrollReveal>
          </div>

          <div className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">Deployment notes</h2>
              <p className="mt-4 max-w-prose text-muted-foreground">Construction sites require temporary camera deployments — often solar-powered units with 4G/5G connectivity. Camzify connects via RTSP or HLS to these temporary cameras and can be reconfigured as the site evolves.</p>
            </ScrollReveal>
          </div>

          <DeploymentPlan phases={deploymentPhases} />

          <div className="mt-12">
            <ScrollReveal>
              <p className="text-muted-foreground">
                See how the numbers work for your construction sites facility with the <Link href="/roi-calculator" className="text-primary hover:underline">ROI calculator</Link>, or review <Link href="/pricing" className="text-primary hover:underline">pricing</Link> to understand the per-camera licensing model.
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
                  <Link href="/ai-features/motion-detection" className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm hover:border-primary/30 hover:text-primary">Motion Detection</Link>
                  <Link href="/ai-features/camera-tampering-detection" className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm hover:border-primary/30 hover:text-primary">Camera Tampering Detection</Link>
                </div>
              </div>
              <div className="rounded-xl border border-border bg-card p-6 text-center">
                <h3 className="font-display text-lg font-bold">Related use cases</h3>
                <div className="mt-4 flex flex-wrap justify-center gap-2">
                  <Link href="/use-cases/trespassing-detection" className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm hover:border-primary/30 hover:text-primary">Trespassing Detection</Link>
                  <Link href="/use-cases/perimeter-security" className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm hover:border-primary/30 hover:text-primary">Perimeter Security</Link>
                  <Link href="/use-cases/remote-site-monitoring" className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm hover:border-primary/30 hover:text-primary">Remote Site Monitoring</Link>
                </div>
              </div>
              <div className="rounded-xl border border-border bg-card p-6 text-center">
                <h3 className="font-display text-lg font-bold">Related industries</h3>
                <div className="mt-4 flex flex-wrap justify-center gap-2">
                  <Link href="/industries/warehouses" className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm hover:border-primary/30 hover:text-primary">Warehouses</Link>
                  <Link href="/industries/manufacturing" className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm hover:border-primary/30 hover:text-primary">Manufacturing</Link>
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
