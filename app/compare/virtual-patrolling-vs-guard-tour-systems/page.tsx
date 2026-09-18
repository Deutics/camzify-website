import { generatePageMeta } from '@/lib/page-utils';
import { PageShell } from '@/components/layout/page-shell';
import { FaqSection } from '@/components/content/faq-section';
import { ScrollReveal } from '@/components/motion/scroll-reveal';
import { ComparisonTable } from '@/components/content/comparison-table';
import { PointList } from '@/components/content/point-list';
import Link from 'next/link';
import { PhotoFigure } from '@/components/content/photo-figure';

/**
 * Page identity. Declared once and consumed twice: by `generatePageMeta` for the
 * <head> tags, and by `PageShell` for the on-page structured data. Keeping it in one
 * const is what stops the meta description and the schema drifting apart.
 *
 * This page compares two ways of proving a round, not two vendors, so it names no
 * product other than Camzify and cites nothing. Every Camzify fact comes from
 * /llms.txt or /platform.
 */
const pageMeta = {
  title: "Virtual Patrolling vs Guard Tour Systems",
  description: "Guard tour systems prove a guard reached a checkpoint. Virtual patrolling proves the condition there, with a frame per item. How the two run together.",
  path: "/compare/virtual-patrolling-vs-guard-tour-systems",
};

export const metadata = generatePageMeta({ ...pageMeta });

const sides = 'Virtual Patrolling vs Guard Tour Systems'.split(' vs ');

const guardTourBetter = [
  'The checkpoint has no camera on it. A plant room, a stairwell landing, the back of a rack or a fenced compound with no coverage can only be verified by a person standing there, and the tag proves they did.',
  'The check needs hands. Trying a door handle, feeling a motor for heat, smelling for gas, resetting a tripped breaker or locking up at close are physical tasks, and a camera can only confirm the result where it can see one.',
  'The contract requires a physical presence. Where a client is paying for a guard to walk the site at set times, the record that matters is that the guard walked it, which is exactly what a guard tour system produces.',
  'The guard\'s own safety and accountability are the point. A lone worker checking in at each tag on schedule is a welfare record as much as a security one, and it needs no camera and no internet.',
];

const virtualBetter = [
  'There is no guard on site for part of the day. A scheduled round runs at the frequency, hours and days set for it, with nobody present, and messages the guard responsible for a camera only when a check fails.',
  'The question is the condition, not the presence. If the client wants to know that the gate was closed at two in the morning, a frame of the closed gate answers it and a tap on a tag beside the gate does not.',
  'The evidence has to be shown to someone else. Each round files a timestamped report with every item, its result, the frame it was judged against, before and after frames on anything fixed, and a compliance percentage, which a client or an auditor can read without trusting anyone.',
  'There are many sites and one team. Every site sits on one account with sub-users scoped to their own sites, so an agency runs the same round across every client on one schedule and hands each client its own report.',
  'A tap has been found to prove nothing. Where a guard can reach a tag without looking at what is next to it, the tour record has stopped answering the question the client asked, and the frame does.',
];

const faqs = [
  { question: 'Do I have to choose one?', answer: "No. Many sites keep the tag system for the guard's own accountability and add the virtual round for the condition at each point. The two records line up by time." },
  { question: 'What does each record contain?', answer: 'A guard tour record: checkpoint ID and time. A virtual round record: each item, its result, the frame it was judged against, before and after frames on fixes, and a compliance percentage.' },
  { question: 'Which works without a guard on site?', answer: 'The virtual round. It runs on schedule with nobody in the loop and messages the guard designated for a camera when a check fails.' },
  { question: 'How are they priced?', answer: "A guard tour system is priced per device and per guard; Camzify is priced per instance per month and quoted. Neither figure is on this page; the ROI calculator works the reader's side." },
  { question: 'What does the guard receive when a virtual check fails?', answer: 'A message from the round, delivered by email, SMS, WhatsApp or push, naming the camera and the item that failed with the snapshot behind it. On an automated round the message goes out with no operator approving it; on a manual round the operator chooses to send it, skip it or send it later.' },
  { question: 'Can a virtual round check something the camera cannot see?', answer: 'No. A round judges each item from the frame at that camera stop, so a condition out of view, behind a door or in a room with no camera cannot be verified by it. That is the case for keeping a guard tour system on those points and running the virtual round on the ones a camera covers.' },
  { question: 'Does virtual patrolling need new cameras or hardware?', answer: 'No. It runs on the ONVIF, RTSP, RTMP and HTTPS cameras a site already owns, and Camzify sells no hardware. A camera on a private network connects through the Camzify Connector, an application on a PC, without opening ports.' },
];

export default function VirtualPatrollingVsGuardTourSystemsPage() {
  return (
    <PageShell {...pageMeta} faqs={faqs} breadcrumbs={[
      { label: 'Compare', href: '/compare' },
      { label: 'Virtual Patrolling vs Guard Tour Systems' },
    ]}>
      <section className="pb-16">
        <div className="mx-auto max-w-site px-6">
          <h1 className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl">Virtual patrolling vs guard tour systems</h1>
          <p className="mt-6 max-w-2xl text-body text-muted-foreground">
            A guard tour system is a set of checkpoint tags, NFC, RFID or QR, fixed around a site and a reader the guard carries, and each tap records that the guard reached that point at that time. Virtual patrolling is a scheduled round run over a site&apos;s cameras: at each camera stop the system checks a defined list of conditions, is the door closed, is the area clear, notifies the assigned guard when one fails, and files a timestamped report with a compliance percentage.
          </p>
          <p className="mt-4 max-w-2xl text-body text-muted-foreground">
            Both exist to prove that a round happened, and they prove different things: one that a person was present, the other that a condition held. This page sets out how each works, where the tag system remains the right tool, where the virtual round is, and how sites run the two together.
          </p>

          <div className="mt-10 max-w-3xl">
            <PhotoFigure src="/compare-vs-guard-tour-systems.webp" alt="A guard checking a virtual patrol on a tablet beside a guard tapping a checkpoint tag" caption="Proof of the condition at each checkpoint, not of a tap" />
          </div>

          <div className="mt-12">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">Side by side</h2>
              <div className="mt-6">
                <ComparisonTable
                  columns={['Aspect', sides?.[0] ?? 'Option A', sides?.[1] ?? 'Option B']}
                  rows={[
                    { label: "What it verifies", values: ["The condition at each checkpoint: is the door closed, is the area clear", "That the guard was physically present at the checkpoint"] },
                    { label: "Requires on-site staff", values: ["No: runs on existing cameras remotely", "Yes: requires a guard to walk the route"] },
                    { label: "False compliance risk", values: ["Low: AI checks the actual condition", "High: guard can tap tag and walk past"] },
                    { label: "Report quality", values: ["Camera snapshots, AI analysis, compliance %", "Timestamp + checkpoint ID"] },
                    { label: "Cost", values: ["Per instance per month", "Per guard per shift + device costs"] },
                    { label: "Overnight capability", values: ["Runs continuously without staffing", "Requires overnight guard shift"] },
                  ]}
                />
              </div>
            </ScrollReveal>
          </div>

          <div className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">How does a guard tour system work?</h2>
              <p className="mt-4 max-w-prose text-muted-foreground">
                A guard tour system records presence. Tags are fixed at the points a round must cover, the guard carries a reader or a phone, and each tap writes the checkpoint identity and the time to a log that is uploaded at the end of the shift or as it happens.
              </p>
              <p className="mt-4 max-w-prose text-muted-foreground">
                The report that comes out is a list of checkpoints with times against them, and gaps where a tag was missed or reached late. It is simple, it works with no cameras and no connectivity, and it holds the guard to a route and a schedule. What it cannot say is what the guard saw: a tap beside a gate is the same tap whether the gate was closed, open or off its hinges.
              </p>
            </ScrollReveal>
          </div>

          <div className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">How does virtual patrolling work?</h2>
              <p className="mt-4 max-w-prose text-muted-foreground">
                Virtual patrolling records the condition. A patrol sequence is an ordered list of camera stops, each with its own checklist, and at each stop every item is judged from the camera&apos;s frame and marked Compliant or Not Compliant. A failed item captures a snapshot and sends a message to the guard assigned to that camera, and the item cannot stay failed: it is either fixed and re-checked, with a second snapshot marking it fixed and verified, or held as pending with a written reason.
              </p>
              <p className="mt-4 max-w-prose text-muted-foreground">
                Automated rounds run the sequence on a schedule set by frequency, active hours and active days in the site&apos;s own timezone, with no operator present, and notify the guard responsible for any failing camera without anyone approving the message. A manual round puts an operator in the loop, who works the same checklist from the live view and decides whether each guard message is sent. Either way the round ends in a timestamped report, as a web page or a PDF, with every item, its result, the frame it was judged against, the guard notified on any failure, and an overall compliance percentage.
              </p>
            </ScrollReveal>
          </div>

          <div className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">Where a guard tour system is the better choice</h2>
              <p className="mt-4 max-w-prose text-muted-foreground">
                A guard tour system is the better choice wherever the check needs a person on the spot: a point no camera covers, a task that needs hands, or a contract that pays for presence itself. A camera can only verify what it can see, and those cases are outside its view.
              </p>
              <PointList items={guardTourBetter} />
            </ScrollReveal>
          </div>

          <div className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">Where virtual patrolling is the better choice</h2>
              <p className="mt-4 max-w-prose text-muted-foreground">
                Virtual patrolling is the better choice when the question is what the site looked like at a given time, and when there is nobody on site to walk it. The <Link href="/virtual-patrolling/patrol-reports" className="text-primary hover:underline">patrol reports</Link> page shows what the record contains.
              </p>
              <PointList items={virtualBetter} />
            </ScrollReveal>
          </div>

          <div className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">How do the two run together?</h2>
              <p className="mt-4 max-w-prose text-muted-foreground">
                On most sites they divide the route rather than compete for it. The virtual round takes every point a camera covers and runs at whatever frequency the risk justifies, day and night, while the guard tour keeps the points that need a person and the physical tasks on the shift. The two records line up by time, so a client sees the gate closed on camera at two in the morning and the guard at the plant room tag at half past.
              </p>
              <p className="mt-4 max-w-prose text-muted-foreground">
                The virtual round also changes what the guard walks toward. Because each camera has a guard assigned to it and a failed check messages that guard with the snapshot, the walk starts at the point that is already known to be wrong rather than at the first tag on the route. That is the sense in which <a href="/virtual-patrolling" className="text-primary hover:underline">virtual patrolling</a> replaces the routine patrol round and not the security function: the round runs itself, and the guard is called to the failure.
              </p>
            </ScrollReveal>
          </div>

          <div className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">The bottom line</h2>
              <p className="mt-4 max-w-prose text-muted-foreground">
                Neither approach is universally better. A guard tour system is right wherever the check needs a person present and a camera cannot see the point; virtual patrolling is right wherever the check is a visible condition and the record has to be shown to someone who was not there. It is strongest where consistency, audit trails and cost against guard hours matter most: multi-site operations, after-hours coverage, and facilities where guarding is the dominant security spend.
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
