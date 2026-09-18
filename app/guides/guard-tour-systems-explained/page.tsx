import { generatePageMeta } from '@/lib/page-utils';
import { PageShell } from '@/components/layout/page-shell';
import { FaqSection } from '@/components/content/faq-section';
import { articleSchema, personSchema } from '@/lib/seo';
import { AuthorByline } from '@/components/content/author-byline';
import { ScrollReveal } from '@/components/motion/scroll-reveal';
import { PointList } from '@/components/content/point-list';
import Link from 'next/link';
import { PhotoFigure } from '@/components/content/photo-figure';

/**
 * Page identity. Declared once and consumed twice: by `generatePageMeta` for the
 * <head> tags, and by `PageShell` for the on-page structured data. Keeping it in one
 * const is what stops the meta description and the schema drifting apart.
 *
 * An explainer for the category the site positions against, written to be fair to it.
 * It names no vendor, cites no third party and carries no statistic; the section on
 * where a physical tour is still the better choice is there on purpose, because a
 * guide that pretends a camera can smell gas would not deserve to be cited.
 */
const pageMeta = {
  title: "Guard Tour Systems Explained",
  description: "What is a guard tour system? How NFC/QR guard tour systems work, their limitations, and how virtual patrolling offers a different approach.",
  path: "/guides/guard-tour-systems-explained",
};

const publishedTime = '2026-08-31';
const modifiedTime = '2026-09-18';

export const metadata = generatePageMeta({ ...pageMeta, type: 'article', publishedTime, modifiedTime });

const faqs = [
  { question: 'What does a guard tour system actually prove?', answer: 'That a guard reached a checkpoint at a time: a tag was scanned or a code was read. It does not prove what the guard saw or whether the condition at the checkpoint was in order.' },
  { question: 'Can virtual patrolling and a guard tour system run together?', answer: "Yes. Keep the tag system for the guard's own record and run the virtual round over the same points. The two records line up by time and either agree or do not, which is the point of guard tour verification." },
  { question: 'Which is cheaper?', answer: 'They are not priced alike. A tag system is priced per device and per guard; a virtual round is priced per instance per month. The honest comparison is what each proves, and the comparison page sets that out.' },
  { question: 'Is one better for compliance?', answer: 'A record with the frame behind each check is stronger evidence than a timestamp beside a checkpoint ID, and it exists whether or not a guard was on shift. Where a client asks for proof of the condition, not proof of presence, the virtual round is what answers.' },
  { question: 'Do guard tour systems need a network connection?', answer: 'Not always. A wand-based system stores scans on the wand and uploads them when it is docked at the end of the shift, which is why it works in basements, plant rooms and outdoor sites with no signal. A phone-based system usually needs a connection to report in real time but can queue scans while offline. A virtual patrol round needs the cameras to be online, because the camera is the thing being checked.' },
  { question: 'Can a guard tour system be cheated?', answer: 'A scan proves the reader was at the tag, and the usual ways around that are moving the tag, scanning several tags in one trip, or handing the wand to someone else. Systems answer with tags fixed in place, time windows between checkpoints, GPS on the reader and photographs at each stop. None of those proves what the guard checked, which is the limit this guide is about.' },
  { question: 'What should a guard tour report contain?', answer: 'For each checkpoint: the time it was scanned, the guard who scanned it, whether the scan fell inside the window the schedule allowed, and any note or photograph the guard attached. For the round as a whole: which checkpoints were missed and how late any of them were. A report that lists scans but not misses is a log, not a report, because the misses are what a client wants to know about.' },
];

export default function GuardTourSystemsExplainedPage() {
  return (
    <PageShell {...pageMeta} faqs={faqs} schema={[articleSchema({ headline: "Guard Tour Systems Explained", description: pageMeta.description, path: pageMeta.path, datePublished: publishedTime, dateModified: modifiedTime }), personSchema()]} breadcrumbs={[
      { label: 'Guides', href: '/guides' },
      { label: 'Guard Tour Systems Explained' },
    ]}>
      <article className="pb-16">
        <div className="mx-auto max-w-site px-6">
          <h1 className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl">Guard tour systems explained</h1>
          <AuthorByline className="mt-6" updated={modifiedTime} />
          <p className="mt-6 max-w-prose text-body text-muted-foreground">
            A guard tour system is a method of proving that a security guard visited a set of checkpoints on a patrol route at the times the route required. Each checkpoint carries a tag, a code or a beacon; the guard reads it with a wand or a phone, and the reading produces a timestamped log of where the guard was and when.
          </p>
          <p className="mt-4 max-w-prose text-body text-muted-foreground">
            This guide explains how those systems work, the kinds that exist, what the log they produce does and does not prove, and where they remain the right tool. It then sets out how a{' '}
            <Link href="/virtual-patrolling" className="text-primary hover:underline">virtual patrol round</Link>{' '}
            differs, and, because the difference cuts both ways, where a physical tour is still the better choice. The side-by-side table is on the{' '}
            <Link href="/compare/virtual-patrolling-vs-guard-tour-systems" className="text-primary hover:underline">comparison page</Link>.
          </p>

          <div className="mt-10 max-w-3xl">
            <PhotoFigure src="/guide-guard-tour-systems-explained.webp" alt="Illustration for this guide: the Camzify console and the cameras it runs on" priority />
          </div>

          <section className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">How does a guard tour system work?</h2>
              <div className="mt-4 max-w-prose space-y-4 text-muted-foreground">
                <p>
                  A guard tour system works by fixing an identifier at each checkpoint and giving the guard a reader that records the identifier and the time whenever the two meet. The route is defined as an ordered list of checkpoints with a time window for each, and the readings are compared with that list to produce a report of what was visited, what was missed and what was late.
                </p>
                <p>
                  Every system, whatever its hardware, has the same five parts.
                </p>
              </div>
              <PointList items={[
                <>Checkpoints: a tag, button, code or beacon fixed at each point on the route, usually where a guard should stop and look at something, such as a door, a gate, a plant room or a fire panel.</>,
                <>A reader: a dedicated wand, or a phone running the system&rsquo;s app, that records each checkpoint it is presented to together with the time and, on some systems, the guard&rsquo;s identity and position.</>,
                <>A route: the ordered list of checkpoints a round should cover, with a window for each so that a scan made too early or too late is reported as such.</>,
                <>A schedule: how often the route runs, at what hours, and on which days, so that a round that never started is reported as clearly as a checkpoint that was missed.</>,
                <>A report: for the round, which checkpoints were visited on time, which were late and which were missed; for the period, how many rounds were completed and by whom.</>,
              ]} />
            </ScrollReveal>
          </section>

          <section className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">What kinds of guard tour system are there?</h2>
              <div className="mt-4 max-w-prose space-y-4 text-muted-foreground">
                <p>
                  Guard tour systems differ mainly in how the checkpoint is read: by touching a metal button with a wand, by holding a reader near an RFID or NFC tag, by scanning a QR code with a phone, or by walking within range of a Bluetooth beacon or a GPS position. Each trade-off is between the cost of the checkpoint, the cost of the reader, and how hard the checkpoint is to fake.
                </p>
              </div>
              <PointList items={[
                <>Touch-button wands. A sealed wand touches a small metal button fixed at each checkpoint and stores the reading until the wand is docked. No network is needed and the hardware survives weather and rough handling.</>,
                <>RFID and NFC tags. A reader, or a phone with NFC, is held near a tag screwed or glued at the checkpoint. The tag is cheap, needs no power, and can be hidden behind a plate.</>,
                <>QR codes. A printed code is scanned with the phone camera. Cheapest to deploy and easiest to replace, and also the easiest to photograph and scan from somewhere else, which is why phone-based systems often pair the scan with a GPS position.</>,
                <>Beacons and GPS. The reader records that it came within range of a beacon, or reached a position, without the guard touching anything. This suits outdoor and vehicle patrols where fixing a tag is impractical.</>,
                <>Mobile apps. Most current systems run on a phone the guard already carries, combining one of the methods above with a checklist, a photograph and a note at each stop, and reporting to a supervisor in real time.</>,
              ]} />
            </ScrollReveal>
          </section>

          <div className="mt-12 max-w-3xl">
            <PhotoFigure src="/guard-tour-verification.webp" alt="A guard with a tablet outside an office at night, checkpoints ticked on the map beside him" caption="Proof of the condition at each checkpoint, not of a tap" />
          </div>

          <section className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">What does a guard tour system prove, and what does it not?</h2>
              <div className="mt-4 max-w-prose space-y-4 text-muted-foreground">
                <p>
                  A guard tour system proves presence: that the reader was at the checkpoint at the recorded time. It does not prove attention, meaning what the guard looked at while there, and it does not prove condition, meaning whether the door was locked, the area was clear or the gate was closed. The log shows the guard was at the door, not that the door was checked.
                </p>
                <p>
                  That is not a flaw in the design; it is what the design set out to do. Guard tour systems were built to answer a contractual question, was the round walked, at a time when the alternative was a signature on a sheet. The gap opens when a client reads the report as proof that the site was in order, which is a different claim that the scan cannot support.
                </p>
                <p>
                  Phone-based systems narrow the gap by asking the guard to answer a checklist and take a photograph at each stop, which moves the record from presence toward condition. It still depends on the guard being present at every stop on every round, and the photograph shows what the guard chose to point the phone at.
                </p>
              </div>
            </ScrollReveal>
          </section>

          <section className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">Where does a guard tour system remain the right choice?</h2>
              <div className="mt-4 max-w-prose space-y-4 text-muted-foreground">
                <p>
                  A guard tour system remains the right choice wherever the check cannot be made by looking, wherever there is no camera, and wherever the client is paying for a person to be present rather than for a condition to be confirmed. Those three cases cover a large part of guarding work, and a camera does not replace any of them.
                </p>
              </div>
              <PointList items={[
                <>Checks that need hands. Pulling a padlock, pushing a fire door to confirm it latches, testing a barrier, reading a gauge in a plant room or noticing a smell of gas cannot be done from a frame.</>,
                <>Places with no camera. Stairwells, basements, roof spaces, remote fence lines and the inside of locked stores are usually on the route precisely because nothing else watches them.</>,
                <>Contracts that specify presence. Where the client is paying for a guard to be seen walking the site, as a deterrent or as a term of insurance, the tour system is the record that the term was met.</>,
                <>Sites with no reliable connectivity. A wand that docks at the end of the shift works where a stream cannot leave the building.</>,
              ]} />
            </ScrollReveal>
          </section>

          <section className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">How is a virtual patrol round different?</h2>
              <div className="mt-4 max-w-prose space-y-4 text-muted-foreground">
                <p>
                  A virtual patrol round checks the condition at each point rather than the presence of a person there. The route is a sequence of cameras instead of tags, each stop carries a checklist of conditions to confirm, and the record is the frame the check was judged against, kept beside the result. It runs on a schedule whether or not a guard is on shift.
                </p>
                <p>
                  Camzify is one example of the model. A scheduled round moves through the cameras in sequence, checks a defined list at each one, notifies the guard assigned to any failing camera, and files a report with a compliance percentage per round and the snapshot behind every item. The round does not replace the guard; it replaces the walk to the points a camera can already see, and it sends the guard to the ones that fail.
                </p>
                <p>
                  The two records therefore answer different questions. The tag log answers whether the round was walked. The patrol report answers whether the door was closed, the area clear and the gate locked at the time of the round, and it shows the picture. Where a client asks the second question, the first record cannot answer it, however complete the scans are.
                </p>
              </div>
            </ScrollReveal>
          </section>

          <section className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">When is a physical tour still the better choice?</h2>
              <div className="mt-4 max-w-prose space-y-4 text-muted-foreground">
                <p>
                  A physical tour is the better choice when the checkpoint has no camera, when the check is physical rather than visual, when a person on site is part of what the client is buying, and when the site cannot carry its cameras to the cloud. A virtual round cannot do any of those, and a vendor who says it can is selling rather than advising.
                </p>
                <p>
                  There is also a middle case. Many sites have cameras on the entrances, the perimeter and the main floors, and none in the plant rooms, the stairwells or the yard behind the bins. The honest design for such a site is a virtual round over the points the cameras cover and a shorter physical tour over the points they do not, with the guard&rsquo;s time going to the checks that need a person.
                </p>
                <p>
                  The two records also verify each other. Run the virtual round over the same points the guard scans, at the same times, and the frame shows the guard at the checkpoint or does not. That is what the{' '}
                  <Link href="/use-cases/guard-tour-verification" className="text-primary hover:underline">guard tour verification</Link>{' '}
                  use case describes, and it is the most common way the two systems end up running together.
                </p>
              </div>
            </ScrollReveal>
          </section>

          <section className="mt-20 rounded-xl bg-card p-8 shadow">
            <h2 className="font-display text-xl font-bold">Related guides</h2>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link href="/guides/what-is-virtual-patrolling" className="rounded-full bg-muted px-4 py-2 text-sm font-medium transition-colors hover:bg-primary hover:text-white">What Is Virtual Patrolling</Link>
              <Link href="/guides/security-guard-cost-per-hour" className="rounded-full bg-muted px-4 py-2 text-sm font-medium transition-colors hover:bg-primary hover:text-white">Security Guard Cost Per Hour</Link>
              <Link href="/guides/security-audit-checklist" className="rounded-full bg-muted px-4 py-2 text-sm font-medium transition-colors hover:bg-primary hover:text-white">Security Audit Checklist</Link>
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
