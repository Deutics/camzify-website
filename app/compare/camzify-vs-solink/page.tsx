import { generatePageMeta } from '@/lib/page-utils';
import { PageShell } from '@/components/layout/page-shell';
import { FaqSection } from '@/components/content/faq-section';
import { ScrollReveal } from '@/components/motion/scroll-reveal';
import { ComparisonTable } from '@/components/content/comparison-table';
import { PhotoFigure } from '@/components/content/photo-figure';
import { PointList } from '@/components/content/point-list';
import { ProductShot } from '@/components/content/product-shot';
import Link from 'next/link';

/**
 * Page identity. Declared once and consumed twice: by `generatePageMeta` for the
 * <head> tags, and by `PageShell` for the on-page structured data. Keeping it in one
 * const is what stops the meta description and the schema drifting apart.
 *
 * Every statement about Solink on this page comes from a solink.com page that was
 * opened on 17 September 2026; the list is rendered at the foot of the page. Where a
 * Solink page did not state something (retention periods, a rate card, patrol rounds)
 * the page says so rather than guessing. Camzify facts come from /llms.txt.
 */
const pageMeta = {
  title: 'Camzify vs Solink | Cloud Video, Two Approaches',
  description: 'Both run on the cameras you own. Solink ties video to POS and operations data; Camzify runs scheduled patrol rounds with a compliance report each.',
  path: '/compare/camzify-vs-solink',
};

export const metadata = generatePageMeta({ ...pageMeta });

const sides = ['Camzify', 'Solink'];

/**
 * Solink's own pages, in the order they are cited. Kept as data so the Sources
 * section and the claims above it cannot drift: add a claim, add its page here.
 */
const sources = [
  { href: 'https://solink.com/', label: 'Solink homepage' },
  { href: 'https://solink.com/vision-intelligence-platform/', label: 'Solink vision intelligence platform' },
  { href: 'https://solink.com/ai-cloud-vms/', label: 'Solink AI Cloud VMS' },
  { href: 'https://solink.com/ai-video-alarms/', label: 'Solink AI Video Alarms' },
  { href: 'https://solink.com/camera-compatibility/', label: 'Solink camera compatibility' },
  { href: 'https://solink.com/partners/integrations/', label: 'Solink integrations' },
  { href: 'https://solink.com/solutions/exception-based-reporting/', label: 'Solink exception-based reporting' },
  { href: 'https://solink.com/solutions/loss-prevention/', label: 'Solink loss prevention' },
  { href: 'https://solink.com/solutions/retail/', label: 'Solink for retail' },
  { href: 'https://solink.com/solutions/restaurants/', label: 'Solink for restaurants' },
  { href: 'https://solink.com/security/', label: 'Solink security' },
  { href: 'https://solink.com/security/soc-2-type-2/', label: 'Solink SOC 2 Type 2' },
  { href: 'https://solink.com/pricing/', label: 'Solink pricing' },
];

const faqs = [
  {
    question: 'Is Solink a competitor to Camzify?',
    answer: 'Only partly. Both are cloud video services that run on the cameras a site already owns, so a buyer replacing a recorder could shortlist either. Solink then builds outward into point-of-sale and operations data; Camzify builds outward into scheduled patrol rounds and compliance reports. Most sites want one of those two things much more than the other.',
  },
  {
    question: 'Does Solink do virtual patrolling?',
    answer: 'Not as its own pages describe it. Solink describes AI agents that run across every site, video alarms with arm and disarm schedules, and exception reports drawn from video and business data. A scheduled round that checks a list at each camera and files a report with a compliance percentage is a Camzify capability, and we found no equivalent on the Solink pages we read.',
  },
  {
    question: 'Does Camzify integrate with my point-of-sale system?',
    answer: 'No. Camzify has no POS, labor, inventory or access-control data integrations, and no exception-based reporting on transactions. If matching a void or refund to the clip of it happening is the job, Solink is built for that and Camzify is not.',
  },
  {
    question: 'How do the prices compare?',
    answer: 'We do not characterize Solink\'s pricing here. Its pricing page states that pricing is customized to the business, and it publishes no rate. Camzify is quoted per site, per instance per month, from $5 per camera per month, and the quote depends on how many cameras carry detections or patrol rounds. Ask both for a quote on the same camera count and compare the two directly.',
  },
  {
    question: 'Which one is certified?',
    answer: 'Solink\'s security pages describe a SOC 2 Type 2 report and state that its software is NDAA-compliant. Camzify\'s SOC 2 Type II, ISO 27001, GDPR and PDPA work is in progress and none of the four is held; the security and compliance page lists each with its status. If a completed SOC 2 report is a procurement requirement today, that is a point in Solink\'s favor.',
  },
];

const rows = [
  {
    label: 'What you buy',
    values: [
      'Software only. A per-instance subscription that runs on the cameras a site already owns; Camzify sells no hardware.',
      'A vision intelligence service that joins video with business data. Its site states no rip-and-replace and no new hardware.',
    ],
  },
  {
    label: 'Cameras',
    values: [
      'Any ONVIF or RTSP camera, plus RTMP and HTTPS streams. The Camzify Connector relays a private network without port forwarding.',
      'Its compatibility page lists IP cameras, DVRs and NVRs, and states support for 30,000+ models across 270 brands.',
    ],
  },
  {
    label: 'Recording and retention',
    values: [
      'Cloud recording, continuous or scheduled, with retention set per camera by days or by storage cap.',
      'Cloud-first, with short- and long-term full camera backups and AI-searchable footage. Retention periods are not stated on the pages read.',
    ],
  },
  {
    label: 'AI detections',
    values: [
      '23 detection models that fire on confirmed object tracks, each licensed as an instance per feature per camera.',
      'AI agents across every site, video alarms for unauthorized and after-hours activity, and search by object, person or event.',
    ],
  },
  {
    label: 'Patrol rounds and compliance reporting',
    values: [
      'Scheduled rounds with a checklist per camera, the guard notified on a failure, and a timestamped PDF report with a compliance percentage per round.',
      'Not described on the pages read. Compliance is approached through exceptions flagged from video and operations data.',
    ],
  },
  {
    label: 'Operations and point of sale',
    values: [
      'None. No POS, labor, inventory or access-control integrations.',
      '375+ data integrations including POS and access control; exception-based reporting attaches the clip to each flagged transaction.',
    ],
  },
  {
    label: 'Multi-site and users',
    values: [
      'Every site on one account. Sub-users scoped to their own sites, quota allocated from the parent, permission groups per user.',
      'Every location and camera on one login, exceptions compared across locations, districts and regions, with MFA, SSO and role-based access.',
    ],
  },
  {
    label: 'Pricing model',
    values: [
      'Per instance per month, quoted per site, from $5 per camera per month.',
      'Customized to the business. No rate is published.',
    ],
  },
  {
    label: 'Best fit',
    values: [
      'Sites and security agencies that need proof a round was walked: gates, perimeters, warehouses, after-hours checks across many sites.',
      'Retail, restaurant and other multi-location operators who want video tied to transactions and operations data.',
    ],
  },
];

export default function CamzifyVsSolinkPage() {
  return (
    <PageShell {...pageMeta} faqs={faqs} breadcrumbs={[
      { label: 'Compare', href: '/compare' },
      { label: 'Camzify vs Solink' },
    ]}>
      <section className="pb-16">
        <div className="mx-auto max-w-site px-6">
          <h1 className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl">Camzify vs Solink</h1>
          <p className="mt-6 max-w-2xl text-body text-muted-foreground">
            Camzify and Solink are both cloud video services that run on the cameras a business already owns, and they go in different directions from there. Solink connects video to point-of-sale and operations data so that a flagged transaction opens the clip behind it. Camzify runs scheduled virtual patrol rounds across the same cameras and files a compliance report for each round. If you are looking for a Solink alternative because you need scheduled rounds with a report, rather than transactions matched to video, this page sets out the difference plainly.
          </p>
          <div className="mt-10 max-w-3xl">
            <PhotoFigure src="/compare-vs-solink.webp" alt="The Camzify console on a laptop beside a restaurant counter under camera coverage, a neutral stand-in for retail and restaurant operations" />
          </div>

          <div className="mt-10 max-w-3xl">
            <ProductShot src="/product-live-streaming" alt="The live streaming wall in the Camzify console, cameras grouped by site with their online state" label="Live streaming" sizes="(max-width: 1024px) 100vw, 768px" />
          </div>

          <div className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">What Solink does</h2>
              <p className="mt-4 max-w-prose text-muted-foreground">
                Solink describes itself as agentic vision intelligence for physical operations: it brings video, data and operations together and uses AI to identify, understand and act on what matters. Its cloud VMS keeps short- and long-term camera backups, makes footage searchable by object, person or event, and shows every location and camera on a single login from a browser or a mobile device. Its site states that you use the cameras and systems you already have, with no rip-and-replace and no new hardware, and its compatibility page lists IP cameras, DVRs and NVRs across 270 brands.
              </p>
              <p className="mt-4 max-w-prose text-muted-foreground">
                The depth is in the data. Solink lists 375+ integrations, including POS, access control, alarm, labor and inventory systems, and its exception-based reporting flags transactions and events that fall outside normal patterns so investigators review a short list instead of every record. The clip is attached to the exception itself, so confirming a void, refund or discount abuse takes seconds. Its restaurant pages go as far as confirming guests are greeted within the first two minutes and tracking ticket times.
              </p>
              <p className="mt-4 max-w-prose text-muted-foreground">
                On the security side, Solink offers AI video alarms with three monitoring models: self-monitoring by SMS with video, routing to your own SOC, or live operators during your armed periods. Its security pages describe encryption in transit and at rest, regular penetration tests, MFA, SSO and role-based access, and a SOC 2 Type 2 report. It also states that the Solink software is NDAA-compliant.
              </p>
            </ScrollReveal>
          </div>

          <div className="mt-12">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">What Camzify does</h2>
              <p className="mt-4 max-w-prose text-muted-foreground">
                Camzify is a cloud video management system that runs on any ONVIF or RTSP camera, with{' '}
                <Link href="/virtual-patrolling" className="text-primary hover:underline">virtual patrolling</Link>{' '}
                built in. A patrol sequence is an ordered list of camera stops, each with its own checklist, run on a schedule in the site&apos;s own timezone. A failing item notifies the guard assigned to that camera, and every round files a timestamped report with each item, the frame it was judged against, before-and-after frames for anything fixed, and an overall compliance percentage. That report is the product: proof that the round happened and what it found.
              </p>
              <p className="mt-4 max-w-prose text-muted-foreground">
                Underneath the rounds is the{' '}
                <Link href="/cloud-video-surveillance" className="text-primary hover:underline">cloud video surveillance</Link>{' '}
                layer: continuous or scheduled recording with retention set per camera, a live wall grouped by site, and 23{' '}
                <Link href="/ai-features" className="text-primary hover:underline">AI detections</Link>{' '}
                that fire on confirmed object tracks rather than pixel motion. Everything is licensed as an instance per camera: a stream instance for every connected camera, a detection instance for every feature on it, and a patrol instance for every camera on rounds. Camzify sells no hardware and has no business-data integrations.
              </p>
            </ScrollReveal>
          </div>

          <div className="mt-12">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">Side by side</h2>
              <p className="mt-4 max-w-prose text-muted-foreground">
                Each Solink cell is drawn from the pages in the sources list. Where a page did not cover a row, the cell says so.
              </p>
              <div className="mt-8">
                <ComparisonTable columns={['Aspect', sides[0] ?? 'Camzify', sides[1] ?? 'Solink']} rows={rows} />
              </div>
            </ScrollReveal>
          </div>

          <div className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">Where Solink is the better choice</h2>
              <PointList items={[
                <>Your losses show up at the register. Solink matches voids, refunds, comps and discount abuse to the clip of them happening, and Camzify has no point-of-sale integration at all. Read the <Link href="/use-cases/theft-prevention" className="text-primary hover:underline">theft prevention</Link> use case to see what Camzify covers instead: people and vehicles in view, not transactions.</>,
                <>You run <Link href="/industries/retail" className="text-primary hover:underline">retail stores</Link> or <Link href="/industries/restaurants" className="text-primary hover:underline">restaurants</Link> and want operations data from the video: queue depth, dwell time, greeting times, drive-thru performance and staffing against demand. That is Solink&apos;s core, and Camzify does not offer it.</>,
                <>You need to compare exceptions across locations, districts and regions so a pattern repeating at four stores surfaces once. Solink describes that; Camzify reports per site and per round.</>,
                <>Your procurement requires a completed SOC 2 Type 2 report today. Solink&apos;s security pages describe one; Camzify&apos;s is in progress and not held.</>,
                <>You want a professionally monitored video alarm with live operators during armed periods, bought from the same vendor. Solink offers that as a service; Camzify notifies your own guard or monitoring center.</>,
              ]} />
            </ScrollReveal>
          </div>

          <div className="mt-12">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">Where Camzify is the better choice</h2>
              <PointList items={[
                <>You are paying for routine patrol rounds and need evidence they were walked. A Camzify round checks a defined list at every camera stop and files a report with a compliance percentage; nothing on the Solink pages we read describes an equivalent.</>,
                <>You are a security agency or monitoring center covering many client sites. Each client is a sub-user scoped to its own sites, license quota is allocated from yours, and the client receives a compliance report per round with its own sites on it.</>,
                <>You want the licensing to follow the camera, not the account. A corridor camera can carry a stream instance and nothing more, while the gate camera records, detects and is a stop on the round, and the quote is the sum of exactly that.</>,
                <>Your cameras sit on a private network and cannot be reached from the internet. The Camzify Connector relays them without port forwarding, and there is nothing to mount.</>,
                <>You need detections beyond intrusion: weapons, aggression, PPE, fire and smoke, slip and fall, abandoned objects, tailgating, or a behavior you describe in ordinary language, each switched on per camera.</>,
              ]} />
            </ScrollReveal>
          </div>

          <div className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">The bottom line</h2>
              <p className="mt-4 max-w-prose text-muted-foreground">
                The two products share a starting point and not a destination. Solink is the stronger choice wherever the question is what happened at the register, in the queue or on the schedule, and the answer needs transaction and operations data alongside the video. Camzify is the stronger choice wherever the question is whether the round was walked, what failed and who was told, across sites that may belong to different clients. A store group with shrink to chase should shortlist Solink; a warehouse, a perimeter or a guarding company with rounds to prove should shortlist Camzify.
              </p>
              <p className="mt-4 max-w-prose text-muted-foreground">
                Neither vendor publishes a rate card, so the honest comparison is quote against quote for the same cameras. Camzify is quoted per site from $5 per camera per month; the{' '}
                <Link href="/pricing" className="text-primary hover:underline">pricing page</Link>{' '}
                explains what a quote is built from, and the{' '}
                <Link href="/roi-calculator" className="text-primary hover:underline">ROI calculator</Link>{' '}
                puts the cost of the rounds you run today next to it.
              </p>
            </ScrollReveal>
          </div>

          <div className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">Sources, checked 17 September 2026</h2>
              <p className="mt-4 max-w-prose text-muted-foreground">
                Every statement about Solink on this page comes from one of these pages on solink.com, read on the date above. Solink changes its pages; if a claim here no longer matches, the page below is the authority.
              </p>
              <ul className="mt-4 max-w-prose space-y-2 text-muted-foreground">
                {sources.map((s) => (
                  <li key={s.href} className="flex gap-3">
                    <span aria-hidden="true" className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                    <a href={s.href} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">{s.label}</a>
                  </li>
                ))}
              </ul>
            </ScrollReveal>
          </div>
        </div>
      </section>
      <FaqSection items={faqs} />
    </PageShell>
  );
}
