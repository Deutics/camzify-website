import { generatePageMeta } from '@/lib/page-utils';
import { PageShell } from '@/components/layout/page-shell';
import { ScrollReveal } from '@/components/motion/scroll-reveal';
import { ComparisonTable } from '@/components/content/comparison-table';
import { FAQAccordion } from '@/components/content/faq-accordion';
import { SectionVisual } from '@/components/content/section-visual';
import Link from 'next/link';

/**
 * Page identity. Declared once and consumed twice: by `generatePageMeta` for the
 * <head> tags, and by `PageShell` for the on-page structured data.
 *
 * Written for the guarding company that sells mobile patrols today. The lead files
 * say that is the most common service on the list, and that nobody on it uses the
 * words "virtual patrolling", so this page starts from the thing they know.
 */
const pageMeta = {
  title: "Virtual Patrolling vs Mobile Patrols",
  description: "For guarding companies that sell mobile patrols: what a scheduled camera round does that a drive-by cannot, what it cannot do, and how both are sold together.",
  path: "/compare/virtual-patrolling-vs-mobile-patrols",
};

export const metadata = generatePageMeta({ ...pageMeta });

const faqs = [
  { question: 'Is this meant to replace our mobile patrol business?', answer: 'No. A mobile patrol puts a person on site, and nothing on a camera does that. What a scheduled camera round replaces is the checks between visits: the doors, the yard, the dock, verified every hour with a frame each, so the driver goes where something has failed rather than to every site in turn. Most agencies sell both to the same client.' },
  { question: 'What does the client get that they do not get today?', answer: 'A report per round, with every camera stop, every checklist result, the snapshot each was judged against, and a compliance percentage. A mobile patrol produces a visit log; a camera round produces evidence that each condition held at each time. Clients with insurers or landlords to answer to notice the difference first.' },
  { question: 'How many rounds can we sell per night?', answer: 'As many as the schedule runs. Frequency is set per patrol sequence, every 30 minutes, every hour, every two hours, with active hours and days. The rounds run whether or not the driver is nearby, so the number is a matter of what the client will pay for, not what you can staff.' },
  { question: 'What happens when a camera round finds something?', answer: 'The checklist item is marked Not Compliant with the frame, and the guard designated for that camera is messaged on the configured channel. On an automated round that is immediate and unattended. The message is the dispatch: your driver attends a known problem at a known camera, with a picture, instead of a scheduled drive-by.' },
  { question: 'Does the client need new cameras?', answer: 'Usually not. Any camera producing an RTSP stream works, which covers ONVIF-conformant IP cameras from the major manufacturers, plus RTMP and HTTPS streams. Cameras on the client\'s LAN connect through the Camzify Connector. A site that has no cameras at all is the one case where a mobile patrol is the only option.' },
  { question: 'How is it priced for us?', answer: 'Per camera, quoted for the portfolio you would cover. We do not publish rates. The ROI calculator has an agency mode that takes your client count and the price you would charge and shows the recurring revenue; the quote comes back against that.' },
];

const rows = [
  { label: 'What the client is buying', values: ['A recorded check of each condition, every round, with a frame', 'A visit to the site by a person, on a route, at intervals'] },
  { label: 'Frequency', values: ['Every 30 minutes, hourly or two-hourly, per sequence, all night', 'Limited by drive time between sites on the route'] },
  { label: 'What it verifies', values: ['Door closed, yard empty, dock down, camera unobstructed: a checklist per camera', 'That the driver attended and what they noticed'] },
  { label: 'Evidence', values: ['Report per round: results, snapshots, before and after frames, compliance %', 'Visit log with time and notes'] },
  { label: 'Response', values: ['None on its own. It messages the guard; a person still attends', 'The person is already there, for the minutes they are there'] },
  { label: 'Staffing', values: ['Not capped by headcount; runs unattended on a schedule', 'One driver, one vehicle, one site at a time'] },
  { label: 'Where it cannot work', values: ['Sites with no cameras, or areas no camera covers', 'Nowhere, given enough drivers'] },
  { label: 'Sold as', values: ['A monthly service per client site', 'Per visit or per night'] },
];

export default function VsMobilePatrolsPage() {
  return (
    <PageShell {...pageMeta} faqs={faqs} breadcrumbs={[
      { label: 'Compare', href: '/compare' },
      { label: 'Virtual Patrolling vs Mobile Patrols' },
    ]}>
      <section className="pb-16">
        <div className="mx-auto max-w-site px-6">
          <span className="font-mono text-mono-sm uppercase text-primary">For guarding companies</span>
          <h1 className="mt-3 font-display text-4xl font-extrabold tracking-tight sm:text-5xl">Virtual patrolling vs mobile patrols</h1>
          <p className="mt-6 max-w-2xl text-body text-muted-foreground">
            <strong className="font-semibold text-foreground">A mobile patrol puts a person on site at intervals. A virtual patrol checks the site&apos;s cameras on a schedule, records what it found, and messages the guard when a check fails.</strong>{' '}
            They are not rivals. One is coverage between visits, the other is the visit. This page sets them side by side for a guarding company that sells the second and is deciding whether to sell the first.
          </p>

          <div className="mt-12">
            <ScrollReveal>
              <ComparisonTable columns={['Virtual patrolling', 'Mobile patrols']} rows={rows} />
            </ScrollReveal>
          </div>

          <div className="mt-16 grid items-start gap-10 lg:grid-cols-[3fr_2fr]">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">What a drive-by cannot do</h2>
              <p className="mt-4 max-w-prose text-muted-foreground">
                A mobile patrol route covers a dozen sites a night, which means each site sees a
                person for a few minutes and nobody for the rest. The dock door that was up at
                midnight is found at the 03:00 visit, if the driver looks, and the visit log says
                &quot;all in order&quot; for the eleven sites where nothing was noticed.
              </p>
              <p className="mt-4 max-w-prose text-muted-foreground">
                A scheduled <Link href="/virtual-patrolling" className="text-primary hover:underline">camera round</Link> checks
                every one of those sites every hour, judges each item from the frame, and files a
                report with the frames in it. When an item fails, the driver is sent to that
                camera with a picture, not to the next site on the route. The client stops paying
                for drive-bys and starts paying for verified checks.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <SectionVisual variant="route" caption="One client site as a patrol sequence: camera stops in order, a checklist at each, run on the hour." alt="A patrol route across four camera stops with a checklist count at each" />
            </ScrollReveal>
          </div>

          <div className="mt-16 grid items-start gap-10 lg:grid-cols-[2fr_3fr]">
            <ScrollReveal>
              <SectionVisual variant="report" caption="What the client receives per round. A visit log has a time; this has the frames." alt="A patrol report excerpt with a checklist item, its before and after snapshots and a compliance percentage" />
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <h2 className="font-display text-2xl font-bold">What a camera cannot do</h2>
              <p className="mt-4 max-w-prose text-muted-foreground">
                It cannot close the door, move the vehicle or ask the person to leave. It cannot
                see an area with no camera on it. It cannot run when the site loses its internet
                connection, and it says so in the log rather than pretending. Every one of those
                is a reason the mobile patrol stays in the contract. A failed check messages the guard through{' '}
                <Link href="/virtual-patrolling/guard-notifications" className="text-primary hover:underline">guard notifications</Link>, which is where the drive-by becomes a dispatch.
              </p>
              <p className="mt-4 max-w-prose text-muted-foreground">
                The honest sale is both: rounds on the cameras all night, the driver dispatched to
                what fails, and a report per round the client can hand to their insurer. The{' '}
                <Link href="/partners/for-security-agencies" className="text-primary hover:underline">security agencies page</Link>{' '}
                covers how the account is set up so each client sees only their own reports, and the{' '}
                <Link href="/guides/how-to-sell-virtual-patrolling-to-clients" className="text-primary hover:underline">selling guide</Link>{' '}
                covers the conversation.
              </p>
            </ScrollReveal>
          </div>

          <div className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">The bottom line</h2>
              <p className="mt-4 max-w-prose text-muted-foreground">
                Sell the round as coverage between visits and the visit as the response. Priced per
                client site per month, the round is revenue that is not capped by how many drivers
                you have. Run your own numbers in the{' '}
                <Link href="/roi-calculator#agency" className="text-primary hover:underline">agency mode of the ROI calculator</Link>;
                Camzify&apos;s cost is quoted against them.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <section className="pb-16">
        <div className="mx-auto max-w-site px-6">
          <div className="rounded-2xl border border-border bg-card p-8 sm:p-10">
            <span className="font-mono text-mono-sm uppercase text-primary">FAQ</span>
            <h2 className="mt-2 font-display text-2xl font-bold">Frequently asked questions</h2>
            <div className="mt-6"><FAQAccordion items={faqs} /></div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
