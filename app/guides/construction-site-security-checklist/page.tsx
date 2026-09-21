import { generatePageMeta } from '@/lib/page-utils';
import { PageShell } from '@/components/layout/page-shell';
import { FaqSection } from '@/components/content/faq-section';
import { articleSchema, personSchema } from '@/lib/seo';
import { AuthorByline } from '@/components/content/author-byline';
import { ScrollReveal } from '@/components/motion/scroll-reveal';
import { PointList } from '@/components/content/point-list';
import { PhotoFigure } from '@/components/content/photo-figure';
import Link from 'next/link';

/**
 * Page identity. Declared once and consumed twice: by `generatePageMeta` for the
 * <head> tags, and by `PageShell` for the on-page structured data. Keeping it in one
 * const is what stops the meta description and the schema drifting apart.
 */
const pageMeta = {
  title: "Construction Site Security Checklist | Daily",
  description: "A construction site security checklist covering the perimeter, plant, the daily close, cameras and people, and how a camera round checks it nightly.",
  path: "/guides/construction-site-security-checklist",
};

const publishedTime = '2026-09-17';
const modifiedTime = '2026-09-17';

export const metadata = generatePageMeta({ ...pageMeta, type: 'article', publishedTime, modifiedTime });

const link = 'text-primary hover:underline';

const faqs = [
  { question: 'How often should a construction site security checklist be run?', answer: 'The daily close runs once, at the end of every working day, and the overnight camera round runs on a schedule after it. The perimeter, storage and people items belong on the closing walk; the camera items run every round. Reconcile the two once a week so the closing list and the camera checklist still describe the same site.' },
  { question: 'Who should sign the closing checklist?', answer: 'One named person per day, usually the site manager or the last supervisor to leave. The signature is worthless if it is delegated to whoever happens to be around. A camera round scheduled after the close gives the signature a second witness: the frame of the gate, the compound and the trailer as they were when the round ran.' },
  { question: 'Can a camera round replace the closing walk?', answer: 'No. The walk checks what only a person can, such as a padlock actually being locked or a fuel cap being on. The round checks what the cameras can see, every night, and files a report per round. Sites run both, with the round confirming the state of the site after the walk is done.' },
  { question: 'What if the cameras on site are temporary units on 4G?', answer: 'If a camera supports RTSP or HLS streaming over its cellular connection, Camzify can connect to it, and the Camzify Connector can relay LAN-only cameras over limited bandwidth. Zones and patrol stops are tied to the camera rather than a fixed position, so when a unit is moved as the build progresses its zone is redrawn against the new view.' },
  { question: 'What happens when a check fails at 2am?', answer: 'The item is marked Not Compliant with the frame that failed it, and the guard assigned to that camera is notified without an operator approving the message. The round records the result in its report and the item stays open until it is marked Fixed, with a second frame, or held as Pending with a written reason.' },
  { question: 'How long should construction site footage be kept?', answer: 'Long enough to cover the time between an incident and its discovery, which on a jobsite can be a weekend or a shutdown. Retention in Camzify is set per camera by number of days or by storage cap, so a gate camera can keep more than a general yard view. Read the video retention requirements guide before choosing a number.' },
];

export default function ConstructionSiteSecurityChecklistPage() {
  return (
    <PageShell {...pageMeta} faqs={faqs} schema={[articleSchema({ headline: "Construction Site Security Checklist", description: pageMeta.description, path: pageMeta.path, datePublished: publishedTime, dateModified: modifiedTime }), personSchema()]} breadcrumbs={[
      { label: 'Guides', href: '/guides' },
      { label: 'Construction Site Security Checklist' },
    ]}>
      <article className="pb-16">
        <div className="mx-auto max-w-site px-6">
          <h1 className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl">Construction site security checklist: what to check every day</h1>
          <AuthorByline className="mt-6" updated={modifiedTime} />
          <p className="mt-6 max-w-prose text-body text-muted-foreground">
            <strong className="font-semibold text-foreground">A construction site security checklist is the list of conditions a site must be in at the end of each working day, checked by a named person and recorded.</strong>{' '}
            It covers six areas: the perimeter and access, plant and materials, the daily close, cameras and monitoring, people, and incident readiness. The lists below can be copied and cut to fit the site.
          </p>
          <p className="mt-4 max-w-prose text-muted-foreground">
            A jobsite is empty for more hours than it is worked and its layout changes week to week, so the list has to hold every night. <Link href="/industries/construction-sites" className={link}>Construction site security</Link> covers the camera side in full; this guide is the checklist itself, with a section at the end on how <Link href="/virtual-patrolling" className={link}>virtual patrolling</Link> runs the camera items every night.
          </p>

          <div className="mt-10 max-w-3xl">
            <PhotoFigure src="/guide-construction-site-security-checklist.webp" alt="A construction site gate at dusk with the day's checklist items ticked off on a tablet" caption="The gate, the compound and the boundary are the three views every jobsite checklist depends on." priority />
          </div>

          <section className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">What should the perimeter and access checklist cover?</h2>
              <p className="mt-4 max-w-prose text-muted-foreground">The perimeter checklist confirms that the site has one controlled way in and that every other way in is closed. On a jobsite the fence is temporary panels, so the list is walked, not assumed.</p>
              <PointList items={[
                'Every fence panel is upright, clipped to its neighbor and weighted; a panel that can be lifted is an open gate.',
                'One vehicle entrance and one pedestrian entrance are in use, and every other gate is locked and signed as closed.',
                'The gates in use are locked at the close, not left on the latch for the early crew.',
                'Lighting covers the gate, the compound and the boundary, and every fitting is checked before dark.',
                'Signage at the entrance states that the site is monitored and gives the number to call.',
              ]} />
              <p className="mt-4 max-w-prose text-muted-foreground">The boundary fails most often between checks, because wind and deliveries move panels. <Link href="/use-cases/perimeter-security" className={link}>Perimeter security</Link> covers how a line drawn along the fence on each camera catches a breach as it happens.</p>
            </ScrollReveal>
          </section>

          <section className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">How do you secure plant, tools and materials overnight?</h2>
              <p className="mt-4 max-w-prose text-muted-foreground">Plant, tools and materials are secured by putting them somewhere specific at the end of the day and recording that they are there. Anything that can be lifted is locked away; anything that cannot is immobilized.</p>
              <PointList items={[
                'Hand tools and power tools are returned to the tool crib at the close and the crib is locked; a tool not signed back in is a missing item.',
                'Copper, cable drums, fixings and other high-value items are taken off site or held in a locked cage inside the compound.',
                'Plant is parked inside the compound with keys removed and held in the site office, and wheel locks are on where the site has them.',
                'Fuel is kept in a locked bowser or tank inside the compound, with the cap locked and the level noted.',
              ]} />
            </ScrollReveal>
          </section>

          <section className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">What does the daily close check, and who signs it?</h2>
              <p className="mt-4 max-w-prose text-muted-foreground">The daily close is a walk of the site by one named person against a fixed list, ending in a signature and a time. It is the same list every day, so a missed item is not a judgment call.</p>
              <PointList items={[
                'One person is named for the close each day, usually the site manager or the last supervisor out.',
                'The walk follows the same route every day: gates, boundary, compound, plant, trailer and office, fuel, then the gate on the way out.',
                'Each item is ticked as seen, not from memory; a shutter checked from the parking lot is not a checked shutter.',
                'Anything that cannot be secured, a broken lock or a panel that will not clip, is written on the sheet with who was told.',
                'The sheet is signed with the time of leaving and kept with the site diary.',
              ]} />
              <p className="mt-4 max-w-prose text-muted-foreground"><Link href="/use-cases/lock-up-and-closing-checks" className={link}>Lock-up and closing checks</Link> covers how the round keeps a frame per item, so a closed gate is a picture and not a tick.</p>
            </ScrollReveal>
          </section>

          <section className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">What should cameras and monitoring cover on a jobsite?</h2>
              <p className="mt-4 max-w-prose text-muted-foreground">The camera checklist has two halves: whether the cameras cover the right things, and whether anyone is watching them after the crew leaves. A camera nobody watches is a recording of the theft.</p>
              <PointList items={[
                'Both entrances, the compound, the fuel store and the trailer row are each inside a camera view, and the boundary is covered end to end with no gap.',
                'Every camera is confirmed live, in focus and pointing where it was installed to point.',
                'Someone is named as watching after hours: a guard, a monitoring center, or a scheduled camera round with a guard on call.',
                'The scheduled round has a list per camera written for what that view can see: gate closed, compound clear, no person inside the fence line.',
              ]} />
              <p className="mt-4 max-w-prose text-muted-foreground">Camera health is its own item, because a blind camera fails quietly. <Link href="/use-cases/camera-health-monitoring" className={link}>Camera health monitoring</Link> covers tampering raised as it happens, offline shown as offline, and the camera view checked on every round.</p>
            </ScrollReveal>
          </section>

          <section className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">What do the people and access records need?</h2>
              <p className="mt-4 max-w-prose text-muted-foreground">The people checklist confirms that everyone on site was expected, inducted and signed in, and that everyone who left was signed out. Most jobsite losses involve someone who once belonged there.</p>
              <PointList items={[
                'Every worker, including each subcontractor crew, is inducted before their first shift, and the induction covers tools, keys and the close.',
                'A visitor log at the controlled entrance records name, company, host, time in and time out, and the host walks the visitor.',
                'Subcontractor access is limited to the days and areas their work needs; compound and crib keys stay with the site team.',
                'The sign-in sheet is reconciled with the close: nobody is signed in and not out when the gate is locked.',
              ]} />
            </ScrollReveal>
          </section>

          <section className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">What does incident readiness look like on a construction site?</h2>
              <p className="mt-4 max-w-prose text-muted-foreground">Incident readiness means the site can answer three questions within minutes of a break-in: who is called, what evidence exists, and where the footage is. It is written down before the first night, not worked out at 3am.</p>
              <PointList items={[
                'A call list names the guard or keyholder first, then the site manager, then the police non-emergency line.',
                'The evidence is known in advance: the closing sheet, the round report with its frames, the visitor log and the plant register with serial numbers.',
                'Every alert and every round report carries a time, so the question of when the site was last checked has an answer.',
                'The list is reviewed after any incident, and the item that would have caught it is added.',
              ]} />
              <p className="mt-4 max-w-prose text-muted-foreground">The <Link href="/guides/security-audit-checklist" className={link}>security audit checklist</Link> covers the periodic review of the whole site, including the policy items a daily list does not carry.</p>
            </ScrollReveal>
          </section>

          <section className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">How does a camera round run the same checklist every night?</h2>
              <p className="mt-4 max-w-prose text-muted-foreground">A scheduled camera round steps through every camera on the site in a fixed order, judges a short list of items at each one, and files a report for that round. The list is written once per camera and does not vary with the night.</p>
              <PointList items={[
                <>The cameras are ordered into a patrol sequence: gate, boundary cameras, compound, fuel store, trailer row. Each carries two to four <Link href="/virtual-patrolling/patrol-checklists" className={link}>checklist items</Link> written for what it can see.</>,
                <>The sequence runs on a schedule set by frequency, active hours and active days in the site timezone. <Link href="/virtual-patrolling/automated-patrol-scheduling" className={link}>Automated patrol scheduling</Link> covers the settings, including holiday exceptions and pausing.</>,
                'At each stop every item is marked Compliant or Not Compliant against the live view; a failed item captures the frame and notifies the guard assigned to that camera without an operator approving the message.',
                'The round also assesses each stop for safety and security risks the list did not ask about, such as smoke, and raises a critical notification for anything it finds.',
                <>When the round finishes, a PDF <Link href="/virtual-patrolling/patrol-reports" className={link}>patrol report</Link> is emailed to the named recipients with every item, its result, the frame it was judged against and the compliance percentage.</>,
                'A failed item is marked Fixed, with a second frame, or held as Pending with a written reason before the round closes.',
              ]} />
              <p className="mt-4 max-w-prose text-muted-foreground">When a camera is moved as the build progresses, its zone and checklist are redrawn against the new view. The round runs on the cameras the site already has, including temporary units on cellular that stream RTSP or HLS.</p>
            </ScrollReveal>
          </section>

          <section className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">What can a camera round not check?</h2>
              <p className="mt-4 max-w-prose text-muted-foreground">A camera round checks what is visible in the frame and nothing else. Several items on this checklist are not visible from any camera, and they stay on the closing walk.</p>
              <PointList items={[
                'Whether a padlock is actually locked rather than hanging closed; the camera sees a lock on the gate, not its shackle.',
                'Whether a fuel cap is on and locked, or a fuel level has dropped, unless a camera is mounted on the bowser itself.',
                'Whether a tool signed out was signed back in; that is the crib record, not a view of the crib.',
                'A fence clip or a lock that is failing but has not yet failed, which takes a hand on it.',
                'Anything inside a closed container or trailer, which the walk checks before the doors are shut.',
              ]} />
              <p className="mt-4 max-w-prose text-muted-foreground">The walk checks condition and the round checks state. A site that runs both has a signed sheet from a person who touched the locks and a report from a round that looked at the gate every hour until morning.</p>
            </ScrollReveal>
          </section>

          <section className="mt-20 rounded-xl bg-card p-8 shadow">
            <h2 className="font-display text-xl font-bold">Related guides</h2>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link href="/guides/security-audit-checklist" className="rounded-full bg-muted px-4 py-2 text-sm font-medium transition-colors hover:bg-primary hover:text-white">Security Audit Checklist</Link>
              <Link href="/guides/how-to-run-a-virtual-patrol-round" className="rounded-full bg-muted px-4 py-2 text-sm font-medium transition-colors hover:bg-primary hover:text-white">How to Run a Virtual Patrol Round</Link>
              <Link href="/guides/what-is-virtual-patrolling" className="rounded-full bg-muted px-4 py-2 text-sm font-medium transition-colors hover:bg-primary hover:text-white">What Is Virtual Patrolling</Link>
            </div>
            <div className="mt-6 flex flex-wrap gap-4">
              <Link href="/pricing" className="rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white shadow transition-colors hover:bg-primary/90">View pricing</Link>
              <Link href="/book-a-demo" className="rounded-lg border border-border px-5 py-2.5 text-sm font-semibold transition-colors hover:bg-muted">Book a demo</Link>
            </div>
          </section>
        </div>
      </article>
      <FaqSection items={faqs} />
    </PageShell>
  );
}
