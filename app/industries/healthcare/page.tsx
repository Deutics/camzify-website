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
  title: "AI Security for Healthcare | Video Surveillance",
  description: "Camzify provides AI-powered virtual patrolling and video analytics for healthcare — automated patrols, real-time alerts, and compliance reports.",
  path: "/industries/healthcare",
};

export const metadata = generatePageMeta({ ...pageMeta });

const deploymentPhases = [
    { title: "Begin at the controlled doors", body: "Pharmacy and drug storage, records rooms, plant rooms and after-hours entrances are onboarded first. Patient-care areas are deliberately excluded from the initial scope." },
    { title: "Write the checklist around access, not people", body: "Each stop asks whether a door is secured and a restricted area is clear — questions about the state of the building, which keeps the round useful without monitoring patients or clinical activity." },
    { title: "Hold the audit trail for review", body: "Every round is retained as a timestamped record showing which controlled areas were verified and when, which is the evidence internal governance reviews usually ask for." },
];

const faqs = [
  { question: "Does Camzify comply with HIPAA or patient privacy regulations?", answer: "Camzify monitors facility security zones — doors, corridors, perimeters — not patient care areas. Configuration should exclude areas where patient privacy applies. Consult your compliance team for facility-specific guidance." },
  { question: "Can it monitor emergency exits?", answer: "Yes. Zone detection at emergency exit areas can alert when doors are used outside of emergency situations, or when the exit path is obstructed." },
  { question: "How does Camzify avoid monitoring patient care areas?", answer: "Zones are drawn per camera during setup, so coverage can be scoped to entrances, corridors, pharmacy storage, and perimeters while excluding bedside or clinical care areas entirely. If a camera has any view into a patient care area, your team decides how or whether that feed is included before it goes live." },
  { question: "How accurate is detection in busy corridors with high foot traffic?", answer: "Zone and motion sensitivity are tuned per camera, so high-traffic corridors during shift changes or visiting hours can run different thresholds than a quiet overnight ward. Multi-Object Tracking helps the system follow individual movement through a crowd rather than treating normal traffic as a blanket trigger." },
  { question: "How long does deployment take for a hospital or clinic?", answer: "It depends on the number of buildings and cameras involved, but zone setup, patrol routes, and alert routing for a single facility are typically configured within a few days once camera access is confirmed. Larger campuses with multiple buildings are usually staged wing by wing." },
  { question: "How does virtual patrolling compare to a dedicated overnight security officer?", answer: "A single officer can only be in one place at a time and typically checks each area a few times per shift. Virtual patrolling checks every configured zone on a fixed schedule with a timestamped record of each round, and is commonly run alongside existing security staff to cover corridors, exits, and storage areas a roaming officer can't watch continuously." },
];

export default function HealthcarePage() {
  return (
    <PageShell {...pageMeta} schema={[serviceSchema({ name: "AI Security for Healthcare", description: "Camzify provides AI-powered virtual patrolling and video analytics for healthcare — automated patrols, real-time alerts, and compliance reports.", path: "/industries/healthcare", audience: "Healthcare" })]} faqs={faqs} breadcrumbs={[
      { label: 'Industries', href: '/industries' },
      { label: 'Healthcare' },
    ]}>
      <section className="pb-16">
        <div className="mx-auto max-w-site px-6">
          <h1 className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl">AI Security for Healthcare</h1>
          <p className="mt-6 max-w-2xl text-body text-muted-foreground">
            Healthcare facilities face security challenges that cameras alone cannot solve and manned guards cannot cover consistently. Camzify's <a href="/virtual-patrolling" className="text-primary hover:underline">virtual patrolling</a> system runs automated AI patrol rounds on your existing cameras — checking every point, flagging failures, and notifying the right person.
          </p>

          <div className="mt-12 grid items-center gap-12 lg:grid-cols-2">
            <ScrollReveal>
              <div>
                <h2 className="font-display text-2xl font-bold">Common healthcare security gaps Camzify closes:</h2>
                <ul className="mt-4 space-y-3 text-muted-foreground">
                  <li className="flex gap-2">• Pharmacy and medication storage rooms with no continuous after-hours check</li>
                  <li className="flex gap-2">• Ward corridors and restricted wings relying on infrequent guard rounds</li>
                  <li className="flex gap-2">• Emergency exits used or blocked without anyone noticing in real time</li>
                  <li className="flex gap-2">• Equipment and supply rooms exposed to unauthorized access between shifts</li>
                  <li className="flex gap-2">• Camera outages on security zones going unnoticed for hours</li>
                  <li className="flex gap-2">• No timestamped record proving a security check actually happened</li>
                </ul>
              </div>
            </ScrollReveal>
            <SiteImage
              src="/ai-security-for-healthcare.jpg" alt="AI-monitored hospital corridor showing bounding boxes around staff and equipment, with an emergency entrance and clinical team scenes" className="w-full rounded-xl"
              width={1600}
              height={900}
              priority
              sizes="(max-width: 1024px) 100vw, 60vw"
            />
          </div>

          <div className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">Why healthcare needs continuous AI monitoring</h2>
              <div className="mt-4 space-y-4 max-w-prose text-muted-foreground">
                <p>Hospitals and clinics run around the clock, but security staff and clinical staff both thin out overnight, leaving pharmacy storage, restricted wings, equipment rooms, and emergency exits with far less oversight during the hours they're most exposed. A guard covering a large campus can only be in one place at a time.</p>
                <p>Plain CCTV records every corridor and storage room but nobody reviews the footage until after an incident is reported, and healthcare facilities also carry patient privacy considerations that make blanket monitoring the wrong approach — security coverage needs to be scoped precisely to facility zones, not clinical care areas.</p>
                <p>Continuous AI monitoring solves both problems at once: it checks only the zones you define, on a fixed schedule, and flags a failure the moment it happens rather than after the fact — giving security teams a documented, privacy-scoped patrol record without adding headcount.</p>
              </div>
            </ScrollReveal>
          </div>

          <div className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">Three questions healthcare security teams ask</h2>
              <div className="mt-8 grid gap-6 md:grid-cols-3">
                <div className="rounded-xl bg-card p-6 shadow">
                  <p className="font-display text-lg font-bold italic">"Is the pharmacy storage room secure right now?"</p>
                  <p className="mt-3 text-sm text-muted-foreground">Camzify answers this with <Link href="/ai-features/zone-intrusion-detection" className="text-primary hover:underline">Zone Intrusion Detection</Link> and automated patrol verification.</p>
                </div>
                <div className="rounded-xl bg-card p-6 shadow">
                  <p className="font-display text-lg font-bold italic">"Is anyone in the ward corridor who shouldn't be there at 3am?"</p>
                  <p className="mt-3 text-sm text-muted-foreground">Camzify answers this with <Link href="/ai-features/motion-detection" className="text-primary hover:underline">Motion Detection</Link> and automated patrol verification.</p>
                </div>
                <div className="rounded-xl bg-card p-6 shadow">
                  <p className="font-display text-lg font-bold italic">"Were all emergency exits checked in the last hour?"</p>
                  <p className="mt-3 text-sm text-muted-foreground">Camzify answers this with <Link href="/ai-features/camera-tampering-detection" className="text-primary hover:underline">Camera Tampering Detection</Link> and automated patrol verification.</p>
                </div>
              </div>
            </ScrollReveal>
          </div>

          <div className="mt-16 grid items-center gap-12 lg:grid-cols-2">
            <PlaceholderVisual type="diagram" caption="HEALTHCARE PATROL SEQUENCE" alt="Diagram of a healthcare patrol route stepping through pharmacy storage, ward corridors, and emergency exits" />
            <ScrollReveal>
              <div>
                <h2 className="font-display text-2xl font-bold">How Camzify works for healthcare</h2>

                <h3 className="mt-6 font-display text-lg font-bold">Building the patrol route</h3>
                <p className="mt-2 text-muted-foreground">
                  A patrol sequence is set up once, ordering every camera stop — pharmacy storage, restricted wings, equipment rooms, emergency exits — into a single route that runs on a configurable schedule.
                </p>

                <h3 className="mt-6 font-display text-lg font-bold">Checking each stop</h3>
                <p className="mt-2 text-muted-foreground">
                  At each stop, the AI checks the defined conditions for that camera using <Link href="/ai-features/zone-intrusion-detection" className="text-primary hover:underline">Zone Intrusion Detection</Link> and <Link href="/ai-features/motion-detection" className="text-primary hover:underline">Motion Detection</Link> — is the storage room clear, is the exit path unobstructed, is the camera unobstructed.
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
                <h2 className="font-display text-2xl font-bold">What to configure for a healthcare site</h2>
                <p className="mt-4 text-muted-foreground">Most healthcare deployments start with:</p>
                <ul className="mt-4 space-y-3 text-muted-foreground">
                  <li className="flex gap-2">• Restricted zones over pharmacy storage, server rooms, and restricted wards</li>
                  <li className="flex gap-2">• Emergency exit zones with obstruction and unauthorized-use alerting</li>
                  <li className="flex gap-2">• Camera scope reviewed to exclude patient care and bedside areas</li>
                  <li className="flex gap-2">• After-hours patrol frequency, typically every 30-60 minutes overnight</li>
                  <li className="flex gap-2">• Escalation routing to the on-duty security or facilities contact</li>
                </ul>
              </div>
            </ScrollReveal>
            <PlaceholderVisual type="config-ui" caption="HEALTHCARE ZONE SETUP" alt="Configuration panel showing pharmacy storage and emergency exit zones mapped across a hospital camera layout" />
          </div>

          <div className="mt-16 grid items-center gap-12 lg:grid-cols-2">
            <PlaceholderVisual type="camera-feed" caption="HEALTHCARE PATROL IN PROGRESS" alt="Camera feed showing an active patrol check at a hospital corridor" />
            <ScrollReveal>
              <div>
                <h2 className="font-display text-2xl font-bold">Common scenarios</h2>
                <ul className="mt-4 space-y-3 text-muted-foreground">
                  <li className="flex gap-2">• Someone entering pharmacy storage outside of scheduled access hours</li>
                  <li className="flex gap-2">• An emergency exit propped open or used as a routine walkway</li>
                  <li className="flex gap-2">• Unfamiliar presence in a restricted ward corridor overnight</li>
                  <li className="flex gap-2">• A camera covering an equipment room going dark or losing focus</li>
                  <li className="flex gap-2">• Unattended equipment or supplies left in a controlled-access area</li>
                </ul>
              </div>
            </ScrollReveal>
          </div>

          <div className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">Deployment notes</h2>
              <p className="mt-4 max-w-prose text-muted-foreground">Healthcare facilities have extensive camera infrastructure and strict regulatory requirements. Camzify operates on the video feed without storing patient data. Zone detection is configured to monitor restricted areas — pharmacies, server rooms, restricted wards — without affecting clinical areas.</p>
            </ScrollReveal>
          </div>

          <DeploymentPlan phases={deploymentPhases} />

          <div className="mt-12">
            <ScrollReveal>
              <p className="text-muted-foreground">
                See how the numbers work for your healthcare facility with the <Link href="/roi-calculator" className="text-primary hover:underline">ROI calculator</Link>, or review <Link href="/pricing" className="text-primary hover:underline">pricing</Link> to understand the per-camera licensing model.
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
                  <Link href="/use-cases/unauthorized-access-detection" className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm hover:border-primary/30 hover:text-primary">Unauthorized Access Detection</Link>
                  <Link href="/use-cases/after-hours-monitoring" className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm hover:border-primary/30 hover:text-primary">After-Hours Monitoring</Link>
                  <Link href="/use-cases/guard-tour-verification" className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm hover:border-primary/30 hover:text-primary">Guard Tour Verification</Link>
                </div>
              </div>
              <div className="rounded-xl border border-border bg-card p-6 text-center">
                <h3 className="font-display text-lg font-bold">Related industries</h3>
                <div className="mt-4 flex flex-wrap justify-center gap-2">
                  <Link href="/industries/education-facilities" className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm hover:border-primary/30 hover:text-primary">Education Facilities</Link>
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
