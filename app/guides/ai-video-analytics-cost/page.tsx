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
 * A cost guide with no figures in it, by design. The business publishes one number,
 * "from $5 per camera per month", and nothing else; the guide explains what a quote is
 * built from and how a buyer assembles their own estimate. Do not add a rate, a range,
 * a percentage or a payback period here.
 */
const pageMeta = {
  title: "AI Video Analytics Cost | Pricing Guide",
  description: "What does AI video analytics cost? Per-instance and per-camera pricing models, cloud vs on-premise, and how to evaluate ROI for your security budget.",
  path: "/guides/ai-video-analytics-cost",
};

const publishedTime = '2026-08-31';
const modifiedTime = '2026-09-18';

export const metadata = generatePageMeta({ ...pageMeta, type: 'article', publishedTime, modifiedTime });

const faqs = [
  { question: 'How is AI video analytics usually priced?', answer: 'Most vendors price per camera per month, per detection or per bundle, sometimes with a platform fee. Camzify licenses AI features per camera instance on top of an account that includes the platform modules; the rate is quoted, not published.' },
  { question: 'Do all cameras need every detection?', answer: 'No, and paying for that is the most common waste. A perimeter camera needs line and zone intrusion; a stockroom camera needs zone intrusion with a notification window; a dock camera may need illegal parking and PPE. Licensing per camera instance means each camera carries only what it uses.' },
  { question: 'Is there a hidden hardware cost?', answer: 'Not with a cloud platform running on your existing cameras. On-premise analytics often need a GPU server per site; a cloud service carries that centrally. The one on-site component Camzify may need is a PC running the Connector.' },
  { question: 'How do I get a figure for my site?', answer: 'Ask for a quote with the camera count and the detections you want per camera. The pricing page explains the model; the ROI calculator shows what the routine rounds cost you today.' },
  { question: 'Does the cost go down with more cameras or a longer term?', answer: 'Usually, and it is worth asking every vendor directly. Camzify quotes lower for an annual term and for accounts that license more features per camera, so the list rate for one camera on a monthly term is the upper end of what a quote will say. Ask for the quote on the term and the camera count you actually intend to run.' },
  { question: 'Is cloud storage part of the analytics cost?', answer: 'It is a separate line, and it is the one most easily left out of an estimate. Detection produces alerts and snapshots; continuous recording produces footage, and footage is what fills storage. Decide retention per camera first, because a camera kept for thirty days costs more to store than one kept for seven, and ask the vendor to price the storage pool that retention implies.' },
  { question: 'Why does no vendor publish a full rate card?', answer: 'Because the same product costs different amounts on different sites: the camera count, the detections per camera, the retention and the term all move the figure. A published rate would either overstate the cost for a large annual account or understate it for a small monthly one. The honest form is a floor, a description of what moves the price, and a quote per site.' },
];

export default function AiVideoAnalyticsCostPage() {
  return (
    <PageShell {...pageMeta} faqs={faqs} schema={[articleSchema({ headline: "AI Video Analytics Cost", description: pageMeta.description, path: pageMeta.path, datePublished: publishedTime, dateModified: modifiedTime }), personSchema()]} breadcrumbs={[
      { label: 'Guides', href: '/guides' },
      { label: 'AI Video Analytics Cost' },
    ]}>
      <article className="pb-16">
        <div className="mx-auto max-w-site px-6">
          <h1 className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl">AI video analytics cost</h1>
          <AuthorByline className="mt-6" updated={modifiedTime} />
          <p className="mt-6 max-w-prose text-body text-muted-foreground">
            AI video analytics cost is what a business pays to run automated detection on its cameras: software that watches each stream, recognizes a defined event such as a person crossing a line, and sends an alert to a named person. When the analytics run in the cloud on cameras the site already owns, it is a recurring software subscription rather than a hardware purchase, and it is priced per camera per month.
          </p>
          <p className="mt-4 max-w-prose text-body text-muted-foreground">
            This guide does not contain a price list, because a figure quoted without your camera count, your detections per camera and your retention would be wrong for your site. It explains the pricing models a buyer meets, the six things that move the number, the difference between cloud and on-premise cost, and how to assemble an estimate you can defend before you ask for a quote. The related guides on{' '}
            <Link href="/guides/cloud-vms-cost" className="text-primary hover:underline">cloud VMS cost</Link>{' '}
            and{' '}
            <Link href="/guides/virtual-patrolling-cost" className="text-primary hover:underline">virtual patrolling cost</Link>{' '}
            cover the recording layer and the patrol round on the same terms.
          </p>

          <div className="mt-10 max-w-3xl">
            <PhotoFigure src="/guide-ai-video-analytics-cost.webp" alt="Illustration for this guide: the Camzify console and the cameras it runs on" priority />
          </div>

          <section className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">How is AI video analytics priced?</h2>
              <div className="mt-4 max-w-prose space-y-4 text-muted-foreground">
                <p>
                  AI video analytics is priced in one of three ways: as a subscription per camera per month, as a perpetual license per channel that runs on a server you buy, or as a bundle where the analytics come with the vendor&rsquo;s own cameras and recorders. The subscription model has the lowest entry cost and no hardware to depreciate. The perpetual model front-loads the spend and adds a server, a maintenance contract and an upgrade cycle, and the bundled model ties the analytics to a camera replacement.
                </p>
                <p>
                  Within the subscription model there are two further shapes, and the difference matters more than the headline rate. Some vendors charge one flat rate per camera that includes every detection, whether or not the camera uses it. Others charge a base rate per camera for the stream and recording, then a separate rate per detection enabled on that camera. The second shape is the per-instance model, and it rewards a buyer who licenses only what each camera needs. Cloud storage is a separate line in either shape, sold per terabyte per month or as a retention period that maps onto storage behind the scenes.
                </p>
              </div>
            </ScrollReveal>
          </section>

          <section className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">What drives the cost of AI video analytics?</h2>
              <div className="mt-4 max-w-prose space-y-4 text-muted-foreground">
                <p>
                  Six things move the number: how many cameras are connected, how many detections each camera runs, how much footage is kept and for how long, the length of the term, the number of sites, and whether the cameras you own are kept or replaced. Everything else in a quote is a consequence of those six.
                </p>
              </div>
              <PointList items={[
                <>Camera count. Every connected camera carries a stream cost whether or not it runs any detection, because the stream has to be received, shown live and made recordable. This is the floor of the bill and the figure to fix first.</>,
                <>Detections per camera. Each AI feature enabled on a camera is a separate cost on the per-instance model. Ten cameras with intrusion on two of them is ten stream instances and two detection instances, not ten of each.</>,
                <>Storage and retention. Continuous recording fills storage at a rate set by resolution, frame rate and codec, multiplied by the days each camera is kept. Retention set per camera, longer on the cameras that matter and shorter on the rest, is the single largest lever on this line.</>,
                <>Term. A monthly term costs more per month than an annual one; a quote is lower for a longer commitment, and the difference is worth asking about explicitly.</>,
                <>Number of sites. Each site adds its own cameras, and on some products its own license or its own recorder. On a cloud service every site sits on one account, so the cost of a second site is the cost of its cameras and nothing more.</>,
                <>Whether cameras are kept. Analytics that run on any ONVIF or RTSP camera cost the subscription and nothing else. Analytics bundled with proprietary cameras cost the subscription plus a replacement of every camera on the site, which is usually the largest number in the whole comparison.</>,
              ]} />
            </ScrollReveal>
          </section>

          <section className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">Does cloud or on-premise analytics cost more?</h2>
              <div className="mt-4 max-w-prose space-y-4 text-muted-foreground">
                <p>
                  Neither is cheaper in every case, and a vendor that says otherwise is selling rather than advising. Cloud analytics remove the server, the GPU, the on-site IT time and the upgrade cycle and replace them with a subscription per camera. On-premise analytics require that hardware up front and its upkeep every year, and in return the per-camera running cost can be lower once the hardware is paid for, provided the site has the people to run it.
                </p>
                <p>
                  The comparison turns on three questions: how many sites there are, because on-premise cost is repeated per site while cloud cost is not; whether there is an IT team on site to patch, back up and replace the server; and whether the site has the upstream bandwidth to carry its cameras to the cloud. Write both columns down for a three-year period, including the hardware refresh on one side and the storage growth on the other, and the answer is usually clear. The full comparison is on{' '}
                  <Link href="/compare/cloud-vms-vs-on-premise" className="text-primary hover:underline">cloud VMS vs on-premise</Link>.
                </p>
              </div>
            </ScrollReveal>
          </section>

          <section className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">How should you build your own estimate?</h2>
              <div className="mt-4 max-w-prose space-y-4 text-muted-foreground">
                <p>
                  Build the estimate from the site outward: count the cameras, decide what each one needs to detect, set retention per camera, then choose a term. That order produces a list a vendor can price line by line, and it stops the estimate being anchored to a headline rate that was never going to apply to you.
                </p>
              </div>
              <PointList items={[
                <>List every camera by name and location, and mark the ones that must be recorded continuously against the ones that only need recording on a schedule.</>,
                <>Against each camera, write the one or two detections it actually needs. Perimeter cameras need line and zone intrusion; loading docks need illegal parking and PPE; interior cameras that should be empty after hours need zone intrusion with a notification window. Most cameras need none.</>,
                <>Set retention per camera in days, longest on entrances and cash points, shortest on cameras kept only for live viewing, and ask the vendor to convert that into a storage pool.</>,
                <>Decide the term you can commit to, and ask for the quote on that term rather than on a monthly one.</>,
                <>Add the costs outside the subscription: upstream bandwidth per site, an on-site PC if cameras on a private network need a relay, and the staff time to configure alerts and read reports in the first month.</>,
              ]} />
              <div className="mt-6 max-w-prose space-y-4 text-muted-foreground">
                <p>
                  Camzify is one example of the per-instance model applied throughout. Every connected camera takes a stream instance, priced from $5 per camera per month with motion detection and camera tampering detection included; each of the 23 AI detections enabled on a camera takes a detection instance of that feature; cloud storage is a pool sold per terabyte per month, spent as retention set per camera; and the account holds every site with sub-users scoped to their own cameras. Every rate beyond the $5 floor is quoted per site through the{' '}
                  <Link href="/pricing" className="text-primary hover:underline">pricing page</Link>, where you enter camera and feature counts and receive a quote within one business day.
                </p>
              </div>
            </ScrollReveal>
          </section>

          <section className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">What costs are easy to miss?</h2>
              <div className="mt-4 max-w-prose space-y-4 text-muted-foreground">
                <p>
                  The costs most often missed are the ones that sit outside the subscription line: bandwidth, retention growth, the time spent tuning alerts, and the terms on which you can leave. None of them appears on a vendor&rsquo;s headline rate, and all of them appear on the invoice or in the first month of running the system.
                </p>
              </div>
              <PointList items={[
                <>Bandwidth. Cloud analytics stream every enabled camera upstream continuously, so a site on a thin or metered connection may need a better line first. See <Link href="/guides/cloud-vms-bandwidth-requirements" className="text-primary hover:underline">cloud VMS bandwidth requirements</Link>.</>,
                <>Retention creep. Retention set once and never revisited grows the storage line every time a camera is added. Review it per camera when the site changes.</>,
                <>Alert tuning. A detection left at its default will fire on events nobody cares about until somebody adjusts the zone, the schedule and the severity. Budget the time.</>,
                <>Exit terms. Ask what happens to footage and reports when the subscription ends, whether they export in a standard format, and whether the cameras keep working with another product. A product that runs on ONVIF and RTSP cameras leaves the cameras yours.</>,
              ]} />
            </ScrollReveal>
          </section>

          <section className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">How do you evaluate the return?</h2>
              <div className="mt-4 max-w-prose space-y-4 text-muted-foreground">
                <p>
                  The return on AI video analytics is measured against the cost it replaces, not against the price of other software. That means guard hours spent on routine rounds, investigation time spent scrubbing footage after an incident, and the effort of producing compliance reports by hand. Each of those has a figure your own records already hold.
                </p>
                <p>
                  Start with the routine patrol round, because it is the most measurable. Count the hours a guard spends walking a fixed route each week, multiply by the loaded hourly rate you pay, and set that against the subscription for the cameras that cover the same points. The{' '}
                  <Link href="/roi-calculator" className="text-primary hover:underline">ROI calculator</Link>{' '}
                  runs that comparison on your own figures for a{' '}
                  <Link href="/virtual-patrolling" className="text-primary hover:underline">virtual patrolling</Link>{' '}
                  deployment, and it shows no vendor cost, only yours. Resist a return built on figures the vendor supplies; a claimed detection rate or another customer&rsquo;s saving tells you nothing about your site.
                </p>
              </div>
            </ScrollReveal>
          </section>

          <section className="mt-20 rounded-xl bg-card p-8 shadow">
            <h2 className="font-display text-xl font-bold">Related guides</h2>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link href="/guides/virtual-patrolling-cost" className="rounded-full bg-muted px-4 py-2 text-sm font-medium transition-colors hover:bg-primary hover:text-white">Virtual Patrolling Cost</Link>
              <Link href="/guides/security-guard-cost-per-hour" className="rounded-full bg-muted px-4 py-2 text-sm font-medium transition-colors hover:bg-primary hover:text-white">Security Guard Cost Per Hour</Link>
              <Link href="/guides/how-to-choose-video-analytics-software" className="rounded-full bg-muted px-4 py-2 text-sm font-medium transition-colors hover:bg-primary hover:text-white">How To Choose Video Analytics Software</Link>
              <Link href="/guides/cloud-vms-cost" className="rounded-full bg-muted px-4 py-2 text-sm font-medium transition-colors hover:bg-primary hover:text-white">Cloud VMS Cost</Link>
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
