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
  title: "AI Security for Education Facilities | Video Surveillance",
  description: "Camzify provides AI-powered virtual patrolling and video analytics for education facilities — automated patrols, real-time alerts, and compliance reports.",
  path: "/industries/education-facilities",
};

export const metadata = generatePageMeta({ ...pageMeta });

const deploymentPhases = [
    { title: "Cover the boundary and the entrances", body: "Perimeter fence lines, gates, car parks and main building entrances are onboarded first — the points that matter most outside teaching hours." },
    { title: "Schedule around the timetable", body: "Patrols run overnight, at weekends and through holiday closures. Term-time daytime hours are left unpatrolled so normal campus movement never generates alerts." },
    { title: "Extend to outbuildings and sports areas", body: "Sports halls, storage sheds and remote blocks are added in a second phase, typically the areas furthest from any staffed reception and least likely to get a physical check." },
];

const faqs = [
  { question: "Can Camzify be configured for term time vs holidays?", answer: "Yes. Patrol schedules support configurable active days and can be adjusted for school terms, holidays, and exam periods with different patrol frequencies." },
  { question: "Does it work across multiple campus buildings?", answer: "Yes. Multi-site management allows one security team to monitor all buildings from a single dashboard with building-specific patrol sequences." },
  { question: "Can Camzify tie into our existing campus camera network?", answer: "In most cases, yes. Camzify connects to any camera streaming RTSP or HLS, and the Camzify Connector can bridge older building-management or NVR-based systems that do not expose a stream directly, so existing campus infrastructure does not need to be replaced." },
  { question: "Will Camzify flag normal after-hours activity like cleaning staff or evening classes?", answer: "Schedules and zone rules are configured around your actual campus calendar, so recurring activity like cleaning crews or evening classes can be scoped out of a check by time window or excluded zone, rather than treated as an anomaly." },
  { question: "How does Camzify handle privacy around students on camera?", answer: "Camzify processes the video feeds you already operate under your institution's own camera and data protection policy, and does not introduce new recording where none previously existed. Access to footage and alerts is controlled through role-based permissions, and retention follows your configured settings." },
  { question: "Does this replace our campus security officers?", answer: "For most campuses, it reduces the need to add or scale overnight and holiday-period coverage rather than removing an existing security team. Virtual patrolling checks every building on a fixed schedule, which complements a smaller on-site presence and covers hours or buildings a single officer cannot reach every round." },
];

export default function EducationFacilitiesPage() {
  return (
    <PageShell {...pageMeta} schema={[serviceSchema({ name: "AI Security for Education Facilities", description: "Camzify provides AI-powered virtual patrolling and video analytics for education facilities — automated patrols, real-time alerts, and compliance reports.", path: "/industries/education-facilities", audience: "Education Facilities" })]} faqs={faqs} breadcrumbs={[
      { label: 'Industries', href: '/industries' },
      { label: 'Education Facilities' },
    ]}>
      <section className="pb-16">
        <div className="mx-auto max-w-site px-6">
          <h1 className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl">AI Security for Education Facilities</h1>
          <p className="mt-6 max-w-2xl text-body text-muted-foreground">
            Education facilities face security challenges that cameras alone cannot solve and manned guards cannot cover consistently. Camzify's <a href="/virtual-patrolling" className="text-primary hover:underline">virtual patrolling</a> system runs automated AI patrol rounds on your existing cameras — checking every point, flagging failures, and notifying the right person.
          </p>

          <div className="mt-12 grid items-center gap-12 lg:grid-cols-2">
            <ScrollReveal>
              <div>
                <h2 className="font-display text-2xl font-bold">Common education facility security gaps Camzify closes:</h2>
                <ul className="mt-4 space-y-3 text-muted-foreground">
                  <li className="flex gap-2">• Multiple entrances across a campus with no single point of control</li>
                  <li className="flex gap-2">• After-hours access to labs, gyms, and equipment rooms going unchecked</li>
                  <li className="flex gap-2">• Campus grounds and parking areas relying on a single evening walkthrough</li>
                  <li className="flex gap-2">• Vandalism and loitering around unoccupied buildings during breaks</li>
                  <li className="flex gap-2">• No consistent record proving each building was checked every night</li>
                  <li className="flex gap-2">• Cameras across multiple buildings not centrally monitored in real time</li>
                </ul>
              </div>
            </ScrollReveal>
            <Image
              src="/ai-security-for-education-facilities.jpg" alt="AI-monitored school campus showing bounding boxes tracking people, backpacks, and a bicycle on a walkway, with classroom, campus, and computer lab scenes" className="w-full rounded-xl"
              width={1600}
              height={900}
              priority
              sizes="(max-width: 1024px) 100vw, 60vw"
            />
          </div>

          <div className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">Why education facilities need continuous AI monitoring</h2>
              <div className="mt-4 space-y-4 max-w-prose text-muted-foreground">
                <p>A campus is only lightly occupied for a fraction of the calendar year — evenings, weekends, and long holiday breaks leave labs, gyms, and equipment rooms across several buildings sitting empty at once. A single security officer walking a round can reach one building at a time; the rest of the campus goes unchecked until the next pass.</p>
                <p>Plain CCTV records every building continuously but only gets reviewed after a break-in or an act of vandalism is already reported, and academic calendars add another layer of complexity: the same building can need a completely different patrol pattern during exam period versus a summer holiday.</p>
                <p>Continuous AI monitoring runs a scheduled check across every building on the same campus, adjusts automatically to term-time and holiday schedules, and flags a propped door or an out-of-hours presence the moment it happens — giving one security team real coverage of a multi-building site without needing to physically walk it.</p>
              </div>
            </ScrollReveal>
          </div>

          <div className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">Three questions education facilities security teams ask</h2>
              <div className="mt-8 grid gap-6 md:grid-cols-3">
                <div className="rounded-xl bg-card p-6 shadow">
                  <p className="font-display text-lg font-bold italic">"Was the campus perimeter checked after the last class?"</p>
                  <p className="mt-3 text-sm text-muted-foreground">Camzify answers this with <Link href="/ai-features/zone-intrusion-detection" className="text-primary hover:underline">Zone Intrusion Detection</Link> and automated patrol verification.</p>
                </div>
                <div className="rounded-xl bg-card p-6 shadow">
                  <p className="font-display text-lg font-bold italic">"Is anyone in the laboratory building at midnight?"</p>
                  <p className="mt-3 text-sm text-muted-foreground">Camzify answers this with <Link href="/ai-features/line-intrusion-detection" className="text-primary hover:underline">Line Intrusion Detection</Link> and automated patrol verification.</p>
                </div>
                <div className="rounded-xl bg-card p-6 shadow">
                  <p className="font-display text-lg font-bold italic">"Are all main entrances secure right now?"</p>
                  <p className="mt-3 text-sm text-muted-foreground">Camzify answers this with <Link href="/ai-features/motion-detection" className="text-primary hover:underline">Motion Detection</Link> and automated patrol verification.</p>
                </div>
              </div>
            </ScrollReveal>
          </div>

          <div className="mt-16 grid items-center gap-12 lg:grid-cols-2">
            <PlaceholderVisual type="diagram" caption="EDUCATION FACILITIES PATROL SEQUENCE" alt="Diagram of an education facilities patrol route stepping through campus entrances, laboratory buildings, and grounds" />
            <ScrollReveal>
              <div>
                <h2 className="font-display text-2xl font-bold">How Camzify works for education facilities</h2>

                <h3 className="mt-6 font-display text-lg font-bold">Building the patrol route</h3>
                <p className="mt-2 text-muted-foreground">
                  A patrol sequence is set up once per building, ordering every camera stop — main entrances, laboratory and equipment rooms, grounds and parking areas — into a route that runs on a schedule aligned to the academic calendar.
                </p>

                <h3 className="mt-6 font-display text-lg font-bold">Checking each stop</h3>
                <p className="mt-2 text-muted-foreground">
                  At each stop, the AI checks the defined conditions for that camera using <Link href="/ai-features/zone-intrusion-detection" className="text-primary hover:underline">zone intrusion</Link>, <Link href="/ai-features/line-intrusion-detection" className="text-primary hover:underline">line intrusion</Link>, and <Link href="/ai-features/motion-detection" className="text-primary hover:underline">motion detection</Link> — is the building secure, is the perimeter intact, is there presence where there should not be.
                </p>

                <h3 className="mt-6 font-display text-lg font-bold">Routing the alert</h3>
                <p className="mt-2 text-muted-foreground">
                  A failed check creates an actionable alert with a snapshot and timestamp, routed to the assigned security contact for that building, and logged alongside every other result in that round's patrol report.
                </p>
              </div>
            </ScrollReveal>
          </div>

          <div className="mt-16 grid items-center gap-12 lg:grid-cols-2">
            <ScrollReveal>
              <div>
                <h2 className="font-display text-2xl font-bold">What to configure for an education facility</h2>
                <p className="mt-4 text-muted-foreground">Most education facility deployments start with:</p>
                <ul className="mt-4 space-y-3 text-muted-foreground">
                  <li className="flex gap-2">• Building-specific zones for labs, gyms, and equipment rooms</li>
                  <li className="flex gap-2">• Perimeter line rules across campus grounds and parking areas</li>
                  <li className="flex gap-2">• Schedule profiles for term time, holidays, and exam periods</li>
                  <li className="flex gap-2">• After-hours event overrides for evening classes or sports fixtures</li>
                  <li className="flex gap-2">• Escalation routing to campus security or facilities on-call staff</li>
                </ul>
              </div>
            </ScrollReveal>
            <PlaceholderVisual type="config-ui" caption="EDUCATION FACILITIES ZONE SETUP" alt="Configuration panel showing building and grounds zones mapped across an education facilities camera layout" />
          </div>

          <div className="mt-16 grid items-center gap-12 lg:grid-cols-2">
            <PlaceholderVisual type="camera-feed" caption="EDUCATION FACILITIES PATROL IN PROGRESS" alt="Camera feed showing an active patrol check at a campus building entrance" />
            <ScrollReveal>
              <div>
                <h2 className="font-display text-2xl font-bold">Common scenarios</h2>
                <ul className="mt-4 space-y-3 text-muted-foreground">
                  <li className="flex gap-2">• A side entrance propped open after the last class of the day</li>
                  <li className="flex gap-2">• Movement detected in a laboratory building outside scheduled hours</li>
                  <li className="flex gap-2">• Loitering near a gym or sports facility after evening activities end</li>
                  <li className="flex gap-2">• An unlocked equipment room discovered during a holiday period</li>
                  <li className="flex gap-2">• A camera covering a building entrance going offline mid-shift</li>
                </ul>
              </div>
            </ScrollReveal>
          </div>

          <div className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">Deployment notes</h2>
              <p className="mt-4 max-w-prose text-muted-foreground">Education campuses span multiple buildings with existing camera networks. Camzify connects to these cameras centrally and runs patrol sequences building by building, with schedules aligned to academic calendars and class timetables.</p>
            </ScrollReveal>
          </div>

          <DeploymentPlan phases={deploymentPhases} />

          <div className="mt-12">
            <ScrollReveal>
              <p className="text-muted-foreground">
                See how the numbers work for your education facilities facility with the <Link href="/roi-calculator" className="text-primary hover:underline">ROI calculator</Link>, or review <Link href="/pricing" className="text-primary hover:underline">pricing</Link> to understand the per-camera licensing model.
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
                  <Link href="/ai-features/camera-tampering-detection" className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm hover:border-primary/30 hover:text-primary">Camera Tampering Detection</Link>
                </div>
              </div>
              <div className="rounded-xl border border-border bg-card p-6 text-center">
                <h3 className="font-display text-lg font-bold">Related use cases</h3>
                <div className="mt-4 flex flex-wrap justify-center gap-2">
                  <Link href="/use-cases/after-hours-monitoring" className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm hover:border-primary/30 hover:text-primary">After-Hours Monitoring</Link>
                  <Link href="/use-cases/vandalism-prevention" className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm hover:border-primary/30 hover:text-primary">Vandalism Prevention</Link>
                  <Link href="/use-cases/perimeter-security" className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm hover:border-primary/30 hover:text-primary">Perimeter Security</Link>
                </div>
              </div>
              <div className="rounded-xl border border-border bg-card p-6 text-center">
                <h3 className="font-display text-lg font-bold">Related industries</h3>
                <div className="mt-4 flex flex-wrap justify-center gap-2">
                  <Link href="/industries/healthcare" className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm hover:border-primary/30 hover:text-primary">Healthcare</Link>
                  <Link href="/industries/property-management" className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm hover:border-primary/30 hover:text-primary">Property Management</Link>
                  <Link href="/industries/residential" className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm hover:border-primary/30 hover:text-primary">Residential</Link>
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
