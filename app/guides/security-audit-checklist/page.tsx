import { generatePageMeta } from '@/lib/page-utils';
import { PhotoFigure } from '@/components/content/photo-figure';
import { PageShell } from '@/components/layout/page-shell';
import { FaqSection } from '@/components/content/faq-section';
import { articleSchema, personSchema } from '@/lib/seo';
import { AuthorByline } from '@/components/content/author-byline';
import { ScrollReveal } from '@/components/motion/scroll-reveal';
import { PointList } from '@/components/content/point-list';
import Link from 'next/link';

/**
 * Page identity. Declared once and consumed twice: by `generatePageMeta` for the
 * <head> tags, and by `PageShell` for the on-page structured data. Keeping it in one
 * const is what stops the meta description and the schema drifting apart.
 *
 * A checklist a reader can print and walk with. Every item is one line and describes
 * something to check, not something to buy; the areas run in the order an auditor
 * walks a site, from the fence inward, and the record is the last area because it is
 * the one that proves the others were done.
 */
const pageMeta = {
  title: "Security Audit Checklist | Site Assessment",
  description: "A security audit checklist for a site: perimeter, doors, cameras, lighting, alarms and the record of each check, so nothing is missed.",
  path: "/guides/security-audit-checklist",
};

const publishedTime = '2026-08-31';
const modifiedTime = '2026-09-18';

export const metadata = generatePageMeta({ ...pageMeta, type: 'article', publishedTime, modifiedTime });

const faqs = [
  { question: 'How often should the checklist be run?', answer: 'Formally, on the cadence your insurer or regulator expects. In practice, the items that fail between audits, doors, exits, camera views, are exactly the ones a scheduled patrol round can check every night with a frame per item.' },
  { question: 'Can a virtual patrol round replace part of the audit?', answer: 'It can produce the evidence for the physical-controls part: every round is a report with the result and the frame for each item. The policy and process items still need a person with a clipboard.' },
  { question: 'What should I check about the cameras themselves?', answer: 'That each one can see what it was installed to see. Camera health monitoring covers tampering, drift and obstruction, and a checklist item on every round, camera view unobstructed, catches the slow failures.' },
  { question: 'Where do the results go?', answer: 'Into the patrol report per round and the audit trail on the account. Reports export as PDF, which is the format most auditors ask for.' },
  { question: 'Who should carry out a security audit?', answer: 'Someone who does not run the site day to day, where that is possible. A manager who walks past a propped fire door every morning stops seeing it, and an auditor from another site, a head office or a security contractor sees it at once. Where the site has only its own staff, rotate the person who audits so that no one checks their own work twice in a row.' },
  { question: 'What is the difference between a security audit and a risk assessment?', answer: 'A risk assessment decides what could go wrong at the site and how much it would matter; a security audit checks whether the controls chosen in response are actually in place and working. The assessment produces the list of controls and the audit tests them. A site needs both, and the checklist on this page assumes the assessment has already been done.' },
  { question: 'What should happen when an item fails?', answer: 'Record the failure with a time and a photograph, assign it to a named person with a date, and check it again at that date. An audit that lists failures and stops is a record of what was wrong, not a control. The re-check is what turns it into one, and it is why every item on this page is written as something that can be checked again.' },
];

export default function SecurityAuditChecklistPage() {
  return (
    <PageShell {...pageMeta} faqs={faqs} schema={[articleSchema({ headline: "Security Audit Checklist", description: pageMeta.description, path: pageMeta.path, datePublished: publishedTime, dateModified: modifiedTime }), personSchema()]} breadcrumbs={[
      { label: 'Guides', href: '/guides' },
      { label: 'Security Audit Checklist' },
    ]}>
      <article className="pb-16">
        <div className="mx-auto max-w-site px-6">
          <h1 className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl">Security audit checklist</h1>
          <AuthorByline className="mt-6" updated={modifiedTime} />
          <p className="mt-6 max-w-prose text-body text-muted-foreground">
            A security audit checklist is a written list of the physical security controls at a site, checked one at a time and recorded with a result, so that a gap is found by the audit rather than by an incident. It covers the perimeter, the entrances, the interior, the cameras and their recordings, the alerting and response arrangements, and the documentation that proves each check was made.
          </p>
          <p className="mt-4 max-w-prose text-body text-muted-foreground">
            The checklist below is written to be walked with. Each item is one line, describes a condition to check rather than a product to buy, and can be answered pass or fail on the spot. It runs in the order an auditor moves through a site, from the fence inward, and ends with the record, because a check nobody can prove was made is not a control.
          </p>

          <div className="mt-10 max-w-3xl">
            <PhotoFigure src="/guide-security-audit-checklist.webp" alt="Illustration for this guide: the Camzify console and the cameras it runs on" priority />
          </div>

          <section className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">What does a security audit checklist cover?</h2>
              <div className="mt-4 max-w-prose space-y-4 text-muted-foreground">
                <p>
                  A security audit checklist covers six areas: the perimeter, the entrances, the interior, the cameras and recording, alerting and response, and documentation. The first three are the physical layers an intruder would cross in order, the fourth is how the site sees them, the fifth is what happens when something is seen, and the sixth is the proof that all of it was checked.
                </p>
                <p>
                  The order matters because each layer assumes the one before it. A camera that watches a gate nobody locks records a failure rather than preventing one, and an alert routed to a person who has left the company is not an alert. Walk the layers from the outside in and the cause of a failure is usually found in the layer before the one where it shows.
                </p>
              </div>
            </ScrollReveal>
          </section>

          <section className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">How do you check the perimeter?</h2>
              <div className="mt-4 max-w-prose space-y-4 text-muted-foreground">
                <p>
                  Check the perimeter by walking the whole of it, on the outside where you can, after dark as well as in daylight. Most perimeter failures are slow ones, a washed-out fence footing, a pallet stack that has become a ladder, a light that failed months ago, and none of them is visible from the office. The{' '}
                  <Link href="/use-cases/perimeter-security" className="text-primary hover:underline">perimeter security</Link>{' '}
                  use case covers what the fence line cameras can watch between walks.
                </p>
              </div>
              <PointList items={[
                <>The fence or wall is continuous, with no cut, gap, washout or loose panel along its full length.</>,
                <>Nothing is stacked against the fence on either side that would let a person climb it.</>,
                <>Every gate closes and latches under its own weight, and is locked at the time the closing schedule says.</>,
                <>Lighting covers the whole perimeter after dark, with no unlit stretch between fixtures and no fixture out.</>,
                <>Vegetation and stored material do not hide any part of the fence from the cameras or from the road.</>,
                <>Adjacent cameras overlap, so no stretch of the perimeter falls between two fields of view.</>,
                <>Signs stating that the site is monitored are present and legible at every approach.</>,
              ]} />
            </ScrollReveal>
          </section>

          <section className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">How do you check entrances and access points?</h2>
              <div className="mt-4 max-w-prose space-y-4 text-muted-foreground">
                <p>
                  Check every door, shutter and window that opens to the outside, and check the people and credentials allowed through each one. An entrance fails as often through a stale access list as through a broken lock, so the audit covers the hardware and the register behind it.{' '}
                  <Link href="/use-cases/unauthorized-access-detection" className="text-primary hover:underline">Unauthorized access detection</Link>{' '}
                  adds a camera check on the doors that matter most.
                </p>
              </div>
              <PointList items={[
                <>Every external door closes fully and latches on its own without being pulled.</>,
                <>Every lock works, and every key or credential for it is held by a person who still works here.</>,
                <>Credentials of everyone who left in the last quarter were revoked on the day they left, and the register shows it.</>,
                <>Emergency exits open from inside, are alarmed, and are not propped, wedged or chained.</>,
                <>Loading doors and roller shutters are closed and secured outside delivery hours.</>,
                <>Visitors are signed in, escorted where the policy requires, and signed out.</>,
                <>Each entrance has a camera positioned to capture a face at the door rather than the top of a head.</>,
              ]} />
            </ScrollReveal>
          </section>

          <section className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">How do you check the interior?</h2>
              <div className="mt-4 max-w-prose space-y-4 text-muted-foreground">
                <p>
                  Check the interior against the closing procedure, because most interior controls are conditions that should be true at a particular hour: a room locked, a safe closed, a corridor clear. Audit it once at the end of the day, when the procedure says the site is closed, and once during working hours, when the restricted rooms are in use.
                </p>
              </div>
              <PointList items={[
                <>Restricted rooms, the server room, the cash office, the stores, are locked, and their entries are logged.</>,
                <>High-value stock and equipment are kept where a camera can see them, not in a blind corner.</>,
                <>Corridors, stairwells and escape routes are clear of stock, pallets and anything else that would slow an evacuation.</>,
                <>Safes, cash drawers and tills are closed and locked outside operating hours.</>,
                <>Windows reachable from the ground or from a flat roof are closed and locked.</>,
                <>Master keys and key safes are accounted for, and the last sign-out of each is recorded.</>,
              ]} />
            </ScrollReveal>
          </section>

          <section className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">How do you check cameras and recording?</h2>
              <div className="mt-4 max-w-prose space-y-4 text-muted-foreground">
                <p>
                  Check each camera for whether it still sees what it was installed to see, and check the recorder for whether it has kept what the policy says it should. A camera that is online is not necessarily useful: it can be misaligned, obscured by growth, fogged, or pointed at a wall since the last refit.{' '}
                  <Link href="/ai-features/camera-tampering-detection" className="text-primary hover:underline">Camera tampering detection</Link>{' '}
                  catches the sudden versions of these failures between audits.
                </p>
              </div>
              <PointList items={[
                <>Every camera on the plan is online, and its live view matches the view recorded on the plan.</>,
                <>No camera is obstructed, misaligned, out of focus, fogged, or facing into glare at the hours that matter.</>,
                <>The recorded image at each entrance is clear enough to identify a person, checked by playing back a real entry.</>,
                <>Recording is running on every camera under the schedule set for it, and any gap in the timeline is explained.</>,
                <>Retention on each camera matches the written policy, and footage from the oldest day of that window plays back.</>,
                <>The clock on every camera and recorder is correct and synchronized, so timestamps can be relied on as evidence.</>,
                <>A clip can be exported from any camera in the time the procedure allows, tested by exporting one during the audit.</>,
                <>Live view and playback are limited to named users, and everyone who has left has been removed.</>,
              ]} />
              <div className="mt-6 max-w-prose space-y-4 text-muted-foreground">
                <p>
                  The retention item deserves a number rather than a judgment;{' '}
                  <Link href="/guides/video-retention-requirements" className="text-primary hover:underline">video retention requirements</Link>{' '}
                  explains how to set it per camera.
                </p>
              </div>
            </ScrollReveal>
          </section>

          <section className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">How do you check alerting and response?</h2>
              <div className="mt-4 max-w-prose space-y-4 text-muted-foreground">
                <p>
                  Check alerting by following one alert from the event to the person who acted on it, using a real example from the last month rather than a description of the procedure. A response arrangement is only as good as its weakest name and number, and both go stale without anyone noticing.{' '}
                  <Link href="/virtual-patrolling" className="text-primary hover:underline">Virtual patrolling</Link>{' '}
                  turns the routine part of this into a scheduled round with a record per stop.
                </p>
              </div>
              <PointList items={[
                <>Every alert category is routed to a named person, not to a shared inbox or a group address nobody owns.</>,
                <>A sample of last month&rsquo;s alerts was acknowledged within the time the procedure sets, and the acknowledgment is logged.</>,
                <>The escalation path is written down, and each person on it knows they are on it.</>,
                <>The after-hours contact list is current, and every number on it was dialed during the audit.</>,
                <>The intruder alarm was tested and its signal reached the monitoring destination.</>,
                <>The sources of false alarms are known and are being tuned, not muted.</>,
                <>Patrol routes are defined, the checks at each stop are written down, and the last round&rsquo;s record shows each one answered.</>,
              ]} />
            </ScrollReveal>
          </section>

          <section className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">What documentation should the audit leave behind?</h2>
              <div className="mt-4 max-w-prose space-y-4 text-muted-foreground">
                <p>
                  The audit should leave a record for every item with its result, the time, the person who checked it and the evidence, together with the registers the other sections depend on. That record is what an insurer, a regulator or a client asks for after an incident, and it is what the next audit is compared against.
                </p>
              </div>
              <PointList items={[
                <>Every item above has a recorded result, a time, a name, and a photograph or frame where the item is visual.</>,
                <>Every failure from the previous audit has a recorded fix, or a recorded reason it is still open.</>,
                <>An incident report exists for every incident in the period, and each was reviewed by someone other than its author.</>,
                <>The written retention policy matches the retention actually set on each camera.</>,
                <>The key register and the credential register are current and were reconciled during the audit.</>,
                <>Patrol records for the period exist and can be produced for any date on request.</>,
              ]} />
              <div className="mt-6 max-w-prose space-y-4 text-muted-foreground">
                <p>
                  Where routine checks run as virtual patrol rounds, the{' '}
                  <Link href="/virtual-patrolling/patrol-reports" className="text-primary hover:underline">patrol reports</Link>{' '}
                  and{' '}
                  <Link href="/virtual-patrolling/patrol-compliance-tracking" className="text-primary hover:underline">compliance tracking</Link>{' '}
                  produce the first and last of those records automatically, with the frame behind each result.
                </p>
              </div>
            </ScrollReveal>
          </section>

          <section className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">What can be checked between audits?</h2>
              <div className="mt-4 max-w-prose space-y-4 text-muted-foreground">
                <p>
                  Any item that is visible from a camera can be checked between audits, on a schedule, without a person walking the route. The items that fail between audits are the physical ones: a door propped open, a gate left unlocked, a camera view obstructed, a corridor blocked. They are also the ones a camera sees and a guard on a round would otherwise have to walk to.
                </p>
                <p>
                  Camzify is one way of doing that. A scheduled virtual patrol round moves through a sequence of cameras, checks a defined list at each one, notifies the assigned guard when an item fails, and files a report with a compliance percentage per round, so the monthly audit finds a record of every night rather than a single snapshot. The policy items, the registers and the alarm test still need a person, and the audit still needs to be walked.
                </p>
              </div>
            </ScrollReveal>
          </section>

          <section className="mt-20 rounded-xl bg-card p-8 shadow">
            <h2 className="font-display text-xl font-bold">Related guides</h2>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link href="/guides/what-is-virtual-patrolling" className="rounded-full bg-muted px-4 py-2 text-sm font-medium transition-colors hover:bg-primary hover:text-white">What Is Virtual Patrolling</Link>
              <Link href="/guides/video-retention-requirements" className="rounded-full bg-muted px-4 py-2 text-sm font-medium transition-colors hover:bg-primary hover:text-white">Video Retention Requirements</Link>
              <Link href="/guides/guard-tour-systems-explained" className="rounded-full bg-muted px-4 py-2 text-sm font-medium transition-colors hover:bg-primary hover:text-white">Guard Tour Systems Explained</Link>
              <Link href="/guides/construction-site-security-checklist" className="rounded-full bg-muted px-4 py-2 text-sm font-medium transition-colors hover:bg-primary hover:text-white">Construction Site Security Checklist</Link>
            </div>
            <div className="mt-6 flex flex-wrap gap-4">
              <Link href="/pricing" className="rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white shadow transition-colors hover:bg-primary/90">View pricing</Link>
              <Link href="/roi-calculator" className="rounded-lg border border-border px-5 py-2.5 text-sm font-semibold transition-colors hover:bg-muted">Calculate ROI</Link>
            </div>
          </section>
        </div>
      </article>
      <FaqSection items={faqs} />
    </PageShell>
  );
}
