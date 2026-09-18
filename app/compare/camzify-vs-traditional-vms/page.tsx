import { generatePageMeta } from '@/lib/page-utils';
import { PhotoFigure } from '@/components/content/photo-figure';
import { PageShell } from '@/components/layout/page-shell';
import { FaqSection } from '@/components/content/faq-section';
import { ScrollReveal } from '@/components/motion/scroll-reveal';
import { ComparisonTable } from '@/components/content/comparison-table';
import { PointList } from '@/components/content/point-list';
import Link from 'next/link';

/**
 * Page identity. Declared once and consumed twice: by `generatePageMeta` for the
 * <head> tags, and by `PageShell` for the on-page structured data. Keeping it in one
 * const is what stops the meta description and the schema drifting apart.
 *
 * This page compares Camzify with a category, the server-based VMS, not with a named
 * product, so it names no vendor and cites nothing. Every Camzify fact comes from
 * /llms.txt or /platform.
 */
const pageMeta = {
  title: "Camzify vs Traditional VMS | Cloud vs Recorder",
  description: "Compare Camzify with traditional video management systems. See how AI-powered virtual patrolling goes beyond recording to active verification.",
  path: "/compare/camzify-vs-traditional-vms",
};

export const metadata = generatePageMeta({ ...pageMeta });

const sides = 'Camzify vs Traditional VMS'.split(' vs ');

const vmsBetter = [
  'Footage may not leave the building. A policy, a contract or a regulator that requires recordings to stay on site is met by a recorder on the local network and by nothing else.',
  'The site has no usable upload bandwidth. A recorder takes the streams over the local network and needs no internet at all; a cloud system needs enough upload capacity for every stream it records.',
  'Video has to be tied to doors, alarm panels and building systems in one console. A traditional VMS is built for those integrations; Camzify offers no access control, no alarm panel integration and no monitoring center.',
  'An operator works at a wall of monitors on the site network and never needs to see the cameras from anywhere else. Local viewing is the recorder at its best, with no internet link in the path.',
];

const camzifyBetter = [
  'Someone has to prove the rounds were done. A scheduled virtual patrol round checks a list at every camera, notifies the assigned guard on a failure and files a timestamped report with a compliance percentage, which a recorder cannot produce.',
  'There is more than one site. Every site sits on one account with sub-users scoped to their own sites, so a portfolio is read from one console instead of one recorder per building.',
  'The cameras are already on the wall. Camzify connects ONVIF, RTSP, RTMP and HTTPS cameras and sells no hardware, so the change is a subscription, not a server.',
  'A person has to act on detections. The 23 AI detections fire on confirmed object tracks and reach a named person by email, SMS, WhatsApp or push, rather than sitting in an event log on the recorder.',
  'You are a security agency or monitoring company covering other people\'s sites. Each client is a sub-user with its own cameras and its own report per round, on one account you hold.',
];

const faqs = [
  { question: 'What does a traditional VMS do that Camzify does not?', answer: 'Deep integration with on-premise recorders, access control panels and building systems is where a traditional VMS is strongest. Camzify is cloud-first and runs on the camera streams; it does not replace an NVR and does not integrate with alarm panels.' },
  { question: 'What does Camzify do that a traditional VMS does not?', answer: 'Virtual patrolling: scheduled rounds with a checklist per camera, a guard notified on failure and a report per round. Most VMS products record and alert; none runs the round.' },
  { question: 'Can I keep my NVR?', answer: 'Yes. Camzify takes a stream from the camera and records to the cloud on its own schedule; the recorder keeps doing what it does.' },
  { question: 'Which is right for several sites?', answer: 'Cloud, in most cases: one console, sites and sub-users under one account, and no server per site. The cloud versus on-premise comparison covers the exceptions.' },
  { question: 'Which cameras can move to Camzify?', answer: 'Any camera that produces an ONVIF or RTSP stream, plus RTMP and HTTPS streams. A camera on a private network that is not reachable from the internet connects through the Camzify Connector, an application installed on a PC on that network, without opening ports. The cameras stay where they are; only the stream gains a second destination.' },
  { question: 'Does Camzify hold the compliance certifications a VMS buyer asks about?', answer: 'Not yet. Singapore PDPA, GDPR, SOC 2 Type II and ISO 27001 alignment work is in progress and none of the four is held as a completed certification. We state this on the trust page rather than implying otherwise, and a buyer whose procurement requires a held certificate should read that page before a demo.' },
  { question: 'Does Camzify replace the VMS or sit beside it?', answer: 'Either. A site that keeps its recorder adds Camzify for the detections, the rounds and the cloud copy of the footage, and the recorder remains the local archive. A site with no recorder, or one that is due for replacement, can record to the cloud alone with retention set per camera and no server to buy.' },
];

export default function CamzifyVsTraditionalVmsPage() {
  return (
    <PageShell {...pageMeta} faqs={faqs} breadcrumbs={[
      { label: 'Compare', href: '/compare' },
      { label: 'Camzify vs Traditional VMS' },
    ]}>
      <section className="pb-16">
        <div className="mx-auto max-w-site px-6">
          <h1 className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl">Camzify vs traditional VMS</h1>
          <p className="mt-6 max-w-2xl text-body text-muted-foreground">
            A traditional VMS is video management software installed on a server or network video recorder inside the building: it takes the camera streams over the local network, records them to its own disks and plays them back to operators on that network. Camzify is a cloud video management system that takes the streams from the same cameras, records them to the cloud with retention set per camera, runs 23 AI detections on confirmed object tracks, and runs scheduled virtual patrol rounds that check a list at each camera and file a report.
          </p>
          <p className="mt-4 max-w-2xl text-body text-muted-foreground">
            The two overlap on recording and playback and differ on everything after that. If the term is new, start with <Link href="/guides/what-is-a-video-management-system" className="text-primary hover:underline">what a video management system is</Link>.
          </p>

          <div className="mt-10 max-w-3xl">
            <PhotoFigure src="/compare-vs-traditional-vms.webp" alt="Camzify on a laptop beside an operator at a wall of traditional VMS monitors" />
          </div>

          <div className="mt-12">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">Side by side</h2>
              <div className="mt-6">
                <ComparisonTable
                  columns={['Aspect', sides?.[0] ?? 'Option A', sides?.[1] ?? 'Option B']}
                  rows={[
                    { label: "Primary function", values: ["Active AI verification via patrol rounds", "Passive video recording and playback"] },
                    { label: "Detection", values: ["AI-powered: zone, line, motion, tampering, tracking", "Basic motion detection or none"] },
                    { label: "Deployment", values: ["Cloud-based, connect via RTSP/RTMP/HTTPS", "On-premise NVR/server installation"] },
                    { label: "Patrol automation", values: ["Built-in virtual patrolling with checklists", "Not available"] },
                    { label: "Compliance reporting", values: ["Automated PDF reports with compliance %", "Manual review of recorded footage"] },
                    { label: "Scalability", values: ["Add cameras from any location", "Limited by on-premise hardware capacity"] },
                  ]}
                />
              </div>
            </ScrollReveal>
          </div>

          <div className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">What does a traditional VMS do?</h2>
              <p className="mt-4 max-w-prose text-muted-foreground">
                A traditional VMS records video and lets an operator watch it, live or later. It runs on a server or recorder that the site owns, takes each camera over the local network, writes the footage to local disks under a retention window, and presents a wall of live views and a timeline for playback.
              </p>
              <p className="mt-4 max-w-prose text-muted-foreground">
                Because it lives on the site network, its strengths are local. Nothing depends on an internet link, footage never leaves the building unless someone exports it, and the same server can be wired to door controllers, alarm panels and other building systems so that an event on one shows up next to video from another. Reaching it from outside the building needs a VPN or an opened port, and each site is its own installation with its own server to patch and disks to replace.
              </p>
            </ScrollReveal>
          </div>

          <div className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">What does Camzify do differently?</h2>
              <p className="mt-4 max-w-prose text-muted-foreground">
                Camzify records the same cameras to the cloud and adds two things a recorder does not have: detections that reach a person, and a scheduled round that verifies conditions and files a report. There is no server, and there is no hardware to buy; the cameras stream to the cloud directly, or through the Camzify Connector when they sit on a private network.
              </p>
              <p className="mt-4 max-w-prose text-muted-foreground">
                Recording runs continuously or on a schedule, with retention set per camera in days or as a storage cap from a pool the account sizes itself. The 23 AI detections, motion and camera tampering among them, fire on confirmed object tracks rather than pixel change, and every alert is delivered to a named person by email, SMS, WhatsApp or push. The <Link href="/ai-features" className="text-primary hover:underline">AI features</Link> index lists each detection.
              </p>
              <p className="mt-4 max-w-prose text-muted-foreground">
                The <Link href="/virtual-patrolling" className="text-primary hover:underline">virtual patrol round</Link> is the part with no equivalent on a recorder. On a schedule, the system visits each camera in a sequence, checks a defined list of conditions at each stop, notifies the guard assigned to any camera where a check fails, and files a timestamped report with the frame behind every answer and a compliance percentage for the round.
              </p>
            </ScrollReveal>
          </div>

          <div className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">Where a traditional VMS is the better choice</h2>
              <p className="mt-4 max-w-prose text-muted-foreground">
                A traditional VMS is the better choice when the footage has to stay inside the building, when the site cannot carry its streams to the internet, or when video must sit in one console with doors and alarm panels. Those are real requirements, and a cloud system does not meet them.
              </p>
              <PointList items={vmsBetter} />
            </ScrollReveal>
          </div>

          <div className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">Where Camzify is the better choice</h2>
              <p className="mt-4 max-w-prose text-muted-foreground">
                Camzify is the better choice when the gap is not recording but verification: nobody can show that the rounds were done, or the sites are too many for one recorder each. The <Link href="/supported-cameras" className="text-primary hover:underline">supported cameras</Link> page lists what connects.
              </p>
              <PointList items={camzifyBetter} />
            </ScrollReveal>
          </div>

          <div className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">Can Camzify run alongside a traditional VMS?</h2>
              <p className="mt-4 max-w-prose text-muted-foreground">
                Yes, and for a site that already owns a working recorder that is the usual starting point. Camzify takes its own stream from each camera and records it to the cloud under its own retention; the recorder keeps its local archive and keeps doing whatever the building systems depend on it for. Nothing on the recorder has to change.
              </p>
              <p className="mt-4 max-w-prose text-muted-foreground">
                The practical question is how the streams reach the cloud. A camera whose stream is already reachable over the internet connects directly; a camera on a private network behind the recorder connects through the Camzify Connector, an application on a PC that can reach both the cameras and the internet, with no port forwarding and no camera exposed. The <Link href="/compare/cloud-vms-vs-on-premise" className="text-primary hover:underline">cloud VMS vs on-premise</Link> comparison covers what the site needs to provide.
              </p>
            </ScrollReveal>
          </div>

          <div className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">How is each one paid for?</h2>
              <p className="mt-4 max-w-prose text-muted-foreground">
                A traditional VMS is bought: a server or recorder, disks sized for the retention window, and software licenses, usually per camera, followed by whatever it costs to keep that hardware running for its life. Camzify is subscribed to: a stream instance per connected camera from $5 per camera per month, a detection instance per AI feature on the cameras that need it, and cloud storage per terabyte, quoted per site.
              </p>
            </ScrollReveal>
          </div>

          <div className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">The bottom line</h2>
              <p className="mt-4 max-w-prose text-muted-foreground">
                Neither approach is universally better. If recording and playback on the site network are the whole requirement, or footage may not leave the building, a traditional VMS is the right tool and replacing it gains nothing. If the cameras work and the gap is that nobody can prove the rounds were done, <a href="/virtual-patrolling" className="text-primary hover:underline">virtual patrolling</a> puts detections and scheduled rounds on those cameras without a hardware purchase, and it is strongest where consistency, audit trails and cost against guard hours matter most: multi-site operations, after-hours coverage, and facilities where guarding is the dominant security spend.
              </p>
              <p className="mt-4 max-w-prose text-muted-foreground">
                Use the <Link href="/roi-calculator" className="text-primary hover:underline">ROI calculator</Link> to model the cost comparison for your specific scenario, or <Link href="/pricing" className="text-primary hover:underline">review pricing</Link> to understand the per-instance licensing model.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>
      <FaqSection items={faqs} />
    </PageShell>
  );
}
