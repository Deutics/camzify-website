import { generatePageMeta } from '@/lib/page-utils';
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
 * This guide explains the sum without publishing a price. Pricing is quote-based by
 * business decision (2026-09-07): no rate, "from" figure, per-camera amount or typical
 * dollar figure appears here for Camzify or for any other vendor.
 */
const pageMeta = {
  title: "Cloud VMS Cost | What Drives the Price",
  description: "What drives cloud VMS cost: cameras, detections per camera, retention, bandwidth, sites and users, the pricing models to compare and the hidden fees.",
  path: "/guides/cloud-vms-cost",
};

const publishedTime = '2026-09-16';
const modifiedTime = '2026-09-16';

export const metadata = generatePageMeta({ ...pageMeta, type: 'article', publishedTime, modifiedTime });

const link = 'text-primary hover:underline';

const faqs = [
  { question: 'How much does a cloud VMS cost?', answer: 'There is no single market figure, because the cost is set by counts that differ at every site: cameras, the detections licensed on each one, retention days and resolution, the number of sites and users, and the support included. Vendors price per camera per month, per site, as hardware plus a license, or in tiers by retention or features. The way to get a real number is to fix those counts for your own site and ask each vendor for the total per year.' },
  { question: 'Does Camzify publish a price?', answer: 'Approximate list rates, and an estimator that turns your counts into a figure at those rates. The quote is lower for an annual term and for more features per camera, which is why the site shows an estimate rather than a price. Camzify is priced per instance per month, a stream instance per camera plus a detection instance per AI feature per camera and cloud storage, and the quote depends on those counts, retention, and the number of sites and sub-users. Ask for one with your camera count and it comes back against your own guarding cost.' },
  { question: 'Is per camera per month cheaper than per site?', answer: 'It depends on how many cameras each site has. A flat per-site fee favors a site with many cameras and penalizes one with two or three, while a per-camera fee scales with what is actually connected. Convert both to a cost per camera per year at your retention before deciding.' },
  { question: 'What is the biggest hidden cost in a cloud VMS?', answer: 'Usually one of two things: storage that is billed beyond the retention plan when a busy scene produces more footage than the estimate assumed, or a hardware gateway at each site that is bought, replaced and tied to one vendor. Egress charges on exports, per-user seats and minimum terms are the next three to ask about.' },
  { question: 'Does a cloud VMS need hardware on site?', answer: 'Some do, and that hardware is part of the cost. Camzify sells no hardware and runs on the cameras a site already owns. The one thing sometimes needed is a PC running the Camzify Connector, for cameras on a private network that cannot be reached from the internet.' },
  { question: 'Is a cloud VMS more expensive than an NVR over time?', answer: 'Not once the recorder, its disks, their replacement, the software license and the person who maintains it are counted per year. An on-premise system has a lower recurring fee and higher upfront and staffing costs; a cloud VMS has the reverse. Total both over the replacement cycle of the hardware and compare that, not the monthly line alone.' },
];

export default function CloudVmsCostPage() {
  return (
    <PageShell {...pageMeta} faqs={faqs} schema={[articleSchema({ headline: "Cloud VMS Cost", description: pageMeta.description, path: pageMeta.path, datePublished: publishedTime, dateModified: modifiedTime }), personSchema()]} breadcrumbs={[
      { label: 'Guides', href: '/guides' },
      { label: 'Cloud VMS Cost' },
    ]}>
      <article className="pb-16">
        <div className="mx-auto max-w-site px-6">
          <h1 className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl">Cloud VMS cost: what actually drives the price</h1>
          <AuthorByline className="mt-6" />
          <p className="mt-6 max-w-prose text-body text-muted-foreground">
            Cloud VMS cost is the recurring fee for video management software that the vendor hosts,
            and it is set by what your site asks the service to do: how many cameras stream to it,
            how much footage it keeps, and which detections run on which cameras. There is no
            recorder to buy, so the number is built from counts you already have or can gather in
            an afternoon. A{' '}
            <Link href="/platform" className={link}>cloud VMS</Link>{' '}
            replaces the recorder, the disks and the person who looks after them with a
            subscription, and the question is what that subscription is made of.
          </p>
          <p className="mt-4 max-w-prose text-body text-muted-foreground">
            This guide covers what moves the number, the pricing models the market uses, what to
            ask about before signing, what an on-premise recorder costs instead, and how to lay
            the comparison out for your own site. Camzify is a cloud VMS priced per instance and
            quoted for your site;{' '}
            <Link href="/pricing" className={link}>how a Camzify quote is built</Link>{' '}
            is on the pricing page, and this guide covers the market around it.
          </p>

          <section className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">What drives the cost of a cloud VMS?</h2>
              <div className="mt-4 max-w-prose space-y-4 text-muted-foreground">
                <p>
                  Six things drive the cost of a cloud VMS: the number of cameras, the detections
                  licensed on each one, retention days and resolution, the bandwidth the site must
                  supply, the number of sites and users, and onboarding and support. Cameras and
                  retention set the base, and detections and sites move it from there.
                </p>
              </div>
              <PointList items={[
                <><strong className="font-semibold text-foreground">Cameras.</strong> Every camera that streams to the service counts, whether it records continuously, on a schedule, or only carries a detection. It is the unit most vendors quote in and the count to have before any conversation.</>,
                <><strong className="font-semibold text-foreground">Detections per camera.</strong> AI features are sold per camera on most cloud VMS products, so a camera watching a perimeter costs more than a camera that only records. The waste to avoid is paying for a detection on a camera that will never use it.</>,
                <><strong className="font-semibold text-foreground">Retention days and resolution.</strong> Stored footage is what the vendor pays for on your behalf, and longer retention on more cameras at higher resolution means more of it. This is the second largest driver after camera count.</>,
                <><strong className="font-semibold text-foreground">Bandwidth.</strong> The site supplies upload bandwidth for every stream sent to the cloud, which is a cost on your side of the ledger. A connection that cannot carry the streams costs you again in dropped recordings.</>,
                <><strong className="font-semibold text-foreground">Sites and users.</strong> Some vendors charge per site or per user seat, and others include both. A guarding company with many client sites and a login per client should ask this before anything else.</>,
                <><strong className="font-semibold text-foreground">Onboarding and support.</strong> Camera connection, user setup and training may be included, charged once, or sold as a support tier. Ask which, and what the next tier up costs.</>,
              ]} />
              <div className="mt-4 max-w-prose space-y-4 text-muted-foreground">
                <p>
                  Two of the six are decisions rather than facts about the site. Camera count is
                  fixed by what is installed, but which cameras carry a detection and how long each
                  one retains footage are choices, and they are the two that move the number most
                  once the cameras are counted.
                </p>
              </div>
            </ScrollReveal>
          </section>

          <section className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">Which pricing models will you see, and how do you compare them?</h2>
              <div className="mt-4 max-w-prose space-y-4 text-muted-foreground">
                <p>
                  Four pricing models cover most of the cloud VMS market: per camera per month, per
                  site, hardware plus license, and tiers set by retention or features. To compare
                  them, convert every quote into a cost per camera per year at the retention you
                  actually need, including anything you must buy to make it work.
                </p>
              </div>
              <PointList items={[
                <><strong className="font-semibold text-foreground">Per camera per month.</strong> The cleanest model to compare, because it scales with what is connected. Confirm what the fee includes: recording, retention, detections, users and support are all things a vendor may itemize.</>,
                <><strong className="font-semibold text-foreground">Per site.</strong> A flat fee per location regardless of camera count. It suits a site with many cameras and penalizes a site with two or three.</>,
                <><strong className="font-semibold text-foreground">Hardware plus license.</strong> A vendor gateway or vendor camera at each site with a cloud license on top. The hardware is a capital cost with a replacement cycle, and it ties the site to that vendor's devices.</>,
                <><strong className="font-semibold text-foreground">Tiered by retention or features.</strong> A ladder of plans where the retention days or the detection set decides the tier. Check whether the tier one camera needs forces every camera onto it.</>,
              ]} />
              <div className="mt-4 max-w-prose space-y-4 text-muted-foreground">
                <p>
                  A vendor that quotes a low per-camera rate but charges separately for retention,
                  detections and users is not cheaper; it is itemized. The way to tell is to write
                  down the total for your camera count, at your retention, with your detections and
                  your users, per year, for each vendor. That total is the only number the four
                  models have in common.
                </p>
              </div>
            </ScrollReveal>
          </section>

          <section className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">What hidden costs should you ask about?</h2>
              <div className="mt-4 max-w-prose space-y-4 text-muted-foreground">
                <p>
                  The hidden costs of a cloud VMS sit outside the headline rate: egress, storage
                  overage, hardware gateways, minimum terms and per-user fees. Ask about each one in
                  writing before comparing quotes, because any of them can exceed the per-camera fee
                  over a year.
                </p>
              </div>
              <PointList items={[
                <><strong className="font-semibold text-foreground">Egress and export.</strong> Some vendors charge to download or share footage beyond an allowance. If your operation exports clips for police, insurers or clients, ask what an export costs.</>,
                <><strong className="font-semibold text-foreground">Storage overage.</strong> A plan sized by retention days may bill extra when a busy scene produces more footage than the estimate assumed. Ask whether the plan is capped by days, by storage, or both, and what happens at the cap.</>,
                <><strong className="font-semibold text-foreground">Hardware gateways.</strong> A bridge device or vendor camera at each site is a purchase, a replacement cycle and a single point of failure. Ask whether the service runs on the cameras you already own.</>,
                <><strong className="font-semibold text-foreground">Minimum terms and camera minimums.</strong> A minimum contract length or a minimum camera count changes the sum for a site that shrinks or a client that leaves. Ask what happens to the fee when a site is removed.</>,
                <><strong className="font-semibold text-foreground">Per-user fees.</strong> Charging per operator seat or per mobile user punishes a guarding company that gives every client a login. Ask whether sub-users and client logins count.</>,
                <><strong className="font-semibold text-foreground">Support tiers.</strong> Ask what is included, what is charged once, and what the next support tier costs. A quote that looks low with basic support may not be low with the support you need.</>,
              ]} />
              <div className="mt-4 max-w-prose space-y-4 text-muted-foreground">
                <p>
                  None of these is a reason to avoid a cloud VMS. They are the difference between
                  a quote and a cost, and a vendor that answers every one of them in writing has
                  given you a number you can put next to another vendor's.
                </p>
              </div>
            </ScrollReveal>
          </section>

          <section className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">What does an on-premise recorder cost instead?</h2>
              <div className="mt-4 max-w-prose space-y-4 text-muted-foreground">
                <p>
                  An on-premise VMS costs a recorder or server per site, the disks inside it, the
                  software license, and a person to keep it running. The recurring fee is lower or
                  absent, and the upfront and staffing costs are higher.
                </p>
                <p>
                  The hardware is a capital purchase with a life measured in years, after which it
                  is replaced. Disks fail before the server does and must be swapped, and the
                  footage on a failed disk is gone unless it was mirrored. Firmware, operating
                  system patches and software updates are somebody's job, on site or from an
                  integrator, billed by the visit or under a maintenance contract.
                </p>
                <p>
                  The costs that never appear on an invoice are the ones to write down. A recorder
                  that fails on a Friday loses the weekend's footage, and nobody bills for that.
                  Remote access to an on-premise system means port forwarding or a VPN, which is an
                  IT cost and a security decision. The{' '}
                  <Link href="/compare/cloud-vms-vs-on-premise" className={link}>cloud VMS vs on-premise comparison</Link>{' '}
                  goes through each of these; the point here is that no monthly fee is not the same
                  as no cost.
                </p>
              </div>
            </ScrollReveal>
          </section>

          <section className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">How does Camzify price a cloud VMS?</h2>
              <div className="mt-4 max-w-prose space-y-4 text-muted-foreground">
                <p>
                  Camzify is priced per instance per month and quoted for your site or client
                  portfolio. The platform modules come with the account, AI detections are licensed
                  per camera instance, storage is sold per terabyte per month and spent as you set retention per camera, and there is no hardware to buy.
                </p>
                <p>
                  An instance is one AI feature running on one camera. A perimeter camera carrying
                  line intrusion and a stockroom camera carrying zone intrusion cost differently,
                  and a camera that only records carries no detection at all. Retention is set per
                  camera by days or by a storage cap, and the storage figure shown during
                  configuration is an estimate from stream bitrate, recording hours and retention
                  days. Sites, cameras, instances and storage are allocated to sub-users from what
                  the account holds, which is how a security agency runs many clients on one quote.
                </p>
                <p>
                  Bandwidth is yours to supply, and no vendor can sell it to you. The one thing
                  sometimes needed on site is a PC running the Camzify Connector, for cameras on a
                  private network that cannot be reached from the internet. Minimums and contract
                  terms are agreed in the quote rather than published. The recording layer under
                  all of this, what is kept and for how long, is described on{' '}
                  <Link href="/cloud-video-surveillance" className={link}>cloud video surveillance</Link>.
                </p>
                <p>
                  The{' '}
                  <Link href="/roi-calculator" className={link}>ROI calculator</Link>{' '}
                  contains no Camzify cost by design. It computes your own guard cost from hours
                  per week, hourly rate and sites, or the revenue a partner would earn selling
                  remote patrols, and a quote comes back against that figure.
                </p>
              </div>
            </ScrollReveal>
          </section>

          <section className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">How do you build the comparison for your own site?</h2>
              <div className="mt-4 max-w-prose space-y-4 text-muted-foreground">
                <p>
                  Build the comparison as one table with a row per vendor and a column per cost,
                  totaled per year. The rows include the on-premise option and the cost of leaving
                  things as they are, because a quote only means something next to those two.
                </p>
              </div>
              <PointList items={[
                <>Count the cameras per site, and mark which ones need a detection and which only record.</>,
                <>Decide retention per camera from the rule that applies to you, using the{' '}<Link href="/guides/video-retention-requirements" className={link}>video retention requirements guide</Link>, rather than accepting a vendor's default tier.</>,
                <>Measure the upload bandwidth at each site and note any site that would need an upgrade to carry its streams.</>,
                <>List everyone who needs a login, and whether clients or subcontractors are among them.</>,
                <>Ask each vendor, in writing, for the answers to the hidden-cost questions above.</>,
                <>Total each column per year, with hardware divided over its replacement cycle and support priced at the tier you would actually use.</>,
              ]} />
              <div className="mt-4 max-w-prose space-y-4 text-muted-foreground">
                <p>
                  Then put that total next to what the routine work costs today. For a site paying
                  for patrol rounds, the ROI calculator computes that figure from your own numbers,
                  and for a guarding company its agency mode computes the revenue side instead. The
                  detection line of the table is covered in more depth in the{' '}
                  <Link href="/guides/ai-video-analytics-cost" className={link}>AI video analytics cost guide</Link>.
                </p>
              </div>
            </ScrollReveal>
          </section>

          <section className="mt-20 rounded-xl bg-card p-8 shadow">
            <h2 className="font-display text-xl font-bold">Related guides</h2>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link href="/guides/what-is-a-cloud-vms" className="rounded-full bg-muted px-4 py-2 text-sm font-medium transition-colors hover:bg-primary hover:text-white">What Is a Cloud VMS</Link>
              <Link href="/guides/cloud-vms-bandwidth-requirements" className="rounded-full bg-muted px-4 py-2 text-sm font-medium transition-colors hover:bg-primary hover:text-white">Cloud VMS Bandwidth Requirements</Link>
              <Link href="/guides/ai-video-analytics-cost" className="rounded-full bg-muted px-4 py-2 text-sm font-medium transition-colors hover:bg-primary hover:text-white">AI Video Analytics Cost</Link>
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
