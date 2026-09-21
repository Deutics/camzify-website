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
 * Every statement about Coram AI on this page comes from a Coram page that was opened
 * on 17 September 2026; the list is rendered at the foot of the page. Coram's trust
 * center rendered no readable content on that date, so no certification is stated for
 * either side.
 */
const pageMeta = {
  title: "Camzify vs Coram AI | Cloud Rounds vs Appliance",
  description: "Camzify vs Coram AI: a cloud service with no recorder that runs scheduled patrol rounds, against an on-site AI NVR with cameras, faces and plates.",
  path: "/compare/camzify-vs-coram-ai",
};

export const metadata = generatePageMeta({ ...pageMeta });

const sides = ['Camzify', 'Coram AI'];

const faqs = [
  { question: 'Is this comparison fair to Coram AI?', answer: 'It describes Coram as its own pages describe it, with every Coram statement taken from a page we opened and listed at the foot of this page. Where Coram does something Camzify does not, the page says so. Where we could not verify a claim on a Coram page, we left it out rather than guess.' },
  { question: 'What is the single biggest difference between Camzify and Coram AI?', answer: 'Where the system lives. Coram runs its AI and stores video on the Coram Point, an NVR you buy and install at each site, with the cloud used for access. Camzify has no recorder: the cameras stream to the cloud, where recording, detection and scheduled patrol rounds all run, and the only on-site software is the optional Connector on a PC.' },
  { question: 'Does Camzify do facial recognition or license plate reading like Coram?', answer: 'No. Coram lists face recognition with watchlists and license plate recognition on its own pages, and Camzify offers neither. Camzify searches recorded footage by a plain-language description of a person and tracks a subject across cameras, but it does not identify who a person is or read a plate. If identification is the requirement, Coram covers it and Camzify does not.' },
  { question: 'How do the prices compare?', answer: "We do not characterize Coram's price. Its pricing page publishes no figure; it describes a per-camera video license fee on a 1, 3, 5 or 10 year term, with the Coram Point bought upfront. Camzify publishes one figure, from $5 per camera per month, and quotes the rest per site within one business day. Put both quotes beside what routine rounds cost you today." },
  { question: 'Can I keep my existing cameras with either one?', answer: 'Yes, on both. Coram states that the Coram Point is compatible with any IP camera and that it detects the cameras on the network automatically. Camzify connects any ONVIF or RTSP camera, directly or through the Camzify Connector on a private network. Neither requires the cameras to be replaced, though Coram also supplies its own.' },
];

const sources = [
  { label: 'Coram AI homepage', href: 'https://www.coram.ai/' },
  { label: 'Coram AI pricing', href: 'https://www.coram.ai/pricing' },
  { label: 'Coram Point AI NVR', href: 'https://www.coram.ai/nvr' },
  { label: 'Coram AI security camera system', href: 'https://www.coram.ai/security-camera-system' },
  { label: 'Coram AI gun detection', href: 'https://www.coram.ai/gun-detection' },
  { label: 'Coram AI video search', href: 'https://www.coram.ai/ai-security-camera-search' },
  { label: 'Coram AI face recognition', href: 'https://www.coram.ai/face-recognition' },
  { label: 'Coram AI license plate recognition', href: 'https://www.coram.ai/license-plate-recognition' },
  { label: 'Coram AI access control', href: 'https://www.coram.ai/access-control' },
];

export default function CamzifyVsCoramAiPage() {
  return (
    <PageShell {...pageMeta} faqs={faqs} breadcrumbs={[
      { label: 'Compare', href: '/compare' },
      { label: 'Camzify vs Coram AI' },
    ]}>
      <section className="pb-16">
        <div className="mx-auto max-w-site px-6">
          <h1 className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl">Camzify vs Coram AI</h1>
          <p className="mt-6 max-w-2xl text-body text-muted-foreground">
            Camzify and Coram AI both put AI detection on the IP cameras a site already owns, and they differ on where the system lives. Coram runs its detection and stores video on the Coram Point, an AI NVR installed at each site. Camzify is software only: the cameras stream to the cloud, which records them, runs the detections and runs scheduled patrol rounds with a report per round. Anyone searching for a Coram AI alternative should start with that split, because it decides the hardware, the cost shape and the record you keep.
          </p>
          <p className="mt-4 max-w-2xl text-body text-muted-foreground">
            The two are not the same product with different labels. Coram sells cameras, the recorder, door readers and mobile units alongside the software, and lists face recognition and license plate reading among its AI features. Camzify sells no hardware, identifies nobody, and instead adds <Link href="/virtual-patrolling" className="text-primary hover:underline">virtual patrolling</Link>: a scheduled round through the cameras that checks a list at each one and files a timestamped compliance record.
          </p>

          <div className="mt-10 max-w-3xl">
            <PhotoFigure src="/compare-vs-coram-ai.webp" alt="The Camzify console on a laptop beside an on-site recorder appliance, a neutral stand-in for a site-installed AI NVR" />
          </div>

          <p className="mt-4 max-w-2xl text-body text-muted-foreground">
            The table below sets the two side by side on nine points, from what you buy to who each one fits. The Coram column repeats what Coram&apos;s own pages say, and the Camzify column repeats what this site says elsewhere. Neither column scores the other, and a row where one side has nothing says so.
          </p>

          <div className="mt-10 max-w-3xl">
            <ProductShot src="/product-live-streaming" alt="The live streaming wall in the Camzify console, cameras grouped by site with their online state" label="Live streaming" sizes="(max-width: 1024px) 100vw, 768px" />
          </div>

          <div className="mt-12">
            <ScrollReveal>
              <ComparisonTable
                columns={['Aspect', sides[0], sides[1]]}
                rows={[
                  { label: 'What you buy', values: ['A software subscription. No hardware; the optional Camzify Connector is an application on a PC for cameras on a private network', 'Software plus the Coram Point, an AI NVR bought upfront that you own; Coram also offers its own cameras, door readers and mobile surveillance units'] },
                  { label: 'Cameras and recorder', values: ['Any ONVIF or RTSP camera, added directly or through the Connector; no recorder on site', 'Any IP camera; Coram states it detects the cameras on the network automatically, and that at least one Coram Point is needed per site on a separate local network'] },
                  { label: 'Recording and retention', values: ['Recorded in the cloud, continuously or on a schedule, with retention set per camera in days or as a storage cap', 'Video stored locally on the Coram Point and accessed through the cloud; models rated from 30 up to 365 days of storage and from 4 to 80 feeds, with a cloud archive for clips'] },
                  { label: 'AI detections', values: ['23 detections run in the cloud on confirmed object tracks, licensed per camera: intrusion, loitering, weapons, fire and smoke, PPE, tailgating and behavior described in plain language', 'Models run on the Coram Point, including gun detection that analyzes every frame with alerts stated at under five seconds, tailgating, PPE and dock delay monitoring'] },
                  { label: 'Identification: faces and plates', values: ['None. Camzify does not do facial recognition or license plate reading; it searches by plain-language description and tracks a subject across cameras', 'Face recognition with uploaded watchlists and license plate recognition with alerts and partial-plate search, both stated on Coram pages'] },
                  { label: 'Patrol rounds and compliance reporting', values: ['Scheduled rounds with a checklist per camera, a guard notified on a failure, and a timestamped report per round with a compliance percentage', 'Not described on the Coram pages we read. Coram describes continuous alerts and a Deep Investigation feature that generates reports from footage'] },
                  { label: 'Multi-site and users', values: ['Every site on one console; sub-users scoped to their own sites with permission groups and license quota allocated from the parent account', 'Unlimited user seats with role-based access to specific cameras; sites scale with one Coram Point per site; iOS and Android apps'] },
                  { label: 'Pricing model', values: ['Per instance per month, quoted per site, from $5 per camera; a quote within one business day', 'A per-camera video license fee on a 1, 3, 5 or 10 year term, with the Coram Point purchased upfront; no figure is published, and Coram states a price comes back within minutes'] },
                  { label: 'Best fit', values: ['Sites that want no appliance, retention per camera, and a compliance record that rounds were run', 'Sites that want a recorder they own, on-site AI, identification of people and vehicles, and access control on the same system'] },
                ]}
              />
            </ScrollReveal>
          </div>

          <div className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">Where Coram AI is the better choice</h2>
              <PointList items={[
                <>You want a recorder on site that you own. The Coram Point stores video locally and is bought upfront rather than leased, and a site with poor upstream bandwidth keeps working because the AI runs on the box.</>,
                <>You need to identify people or read plates. Coram lists face recognition with watchlists and license plate recognition on its own pages; Camzify offers neither.</>,
                <>You want cameras, access control and video from one vendor. Coram supplies its own cameras, a four-door controller and readers, and pairs each door event with the footage around it.</>,
                <>You want a price quickly. Coram states its sales team can return a price within minutes of receiving the site details; Camzify quotes within one business day.</>,
              ]} />
            </ScrollReveal>
          </div>

          <div className="mt-12">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">Where Camzify is the better choice</h2>
              <PointList items={[
                <>You want nothing new installed. Camzify runs on the cameras a site already has with no appliance to buy, mount or replace, which matters most across many small sites or many client sites.</>,
                <>You need proof that a round was done, not only an alert that something happened. Each <Link href="/virtual-patrolling" className="text-primary hover:underline">patrol round</Link> checks a list at every camera and files a report with the frame behind each result and a compliance percentage.</>,
                <>You want retention set per camera rather than per box. A gate camera can keep ninety days while a corridor keeps seven, with the storage pool spent however the account decides.</>,
                <>You run monitoring for other people. Sub-users are scoped to their own sites, license quota is allocated from the parent account, and the guard responsible is messaged from the round itself.</>,
              ]} />
            </ScrollReveal>
          </div>

          <div className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">The bottom line</h2>
              <p className="mt-4 max-w-prose text-muted-foreground">
                Coram AI is an appliance-based system: the Coram Point records, runs the AI and holds the footage, and the cloud is how you reach it. That is a sound design for a site that wants a recorder it owns, identification of people and vehicles, and doors on the same console. It is more to buy, and it puts one box at every site.
              </p>
              <p className="mt-4 max-w-prose text-muted-foreground">
                Camzify is <Link href="/cloud-video-surveillance" className="text-primary hover:underline">cloud video surveillance</Link> with no recorder, which the guide to <Link href="/guides/what-is-a-cloud-nvr" className="text-primary hover:underline">what a cloud NVR is</Link> explains in full. Its <Link href="/ai-features" className="text-primary hover:underline">AI detections</Link> cover much of the same ground, including <Link href="/ai-features/weapons-detection" className="text-primary hover:underline">weapons detection</Link>, and it stops short of faces and plates. What it adds is the scheduled round with a compliance record, which is the part a security agency or a facilities manager is asked to show afterwards.
              </p>
              <p className="mt-4 max-w-prose text-muted-foreground">
                Both work with the cameras you already own, so the choice is not about replacing anything. If continuous detection is the whole requirement, either will do it and Coram does it on site. If the requirement includes evidence that specific things were checked at specific times, Camzify is built for that and Coram, on the pages we read, is not. Use the <Link href="/roi-calculator" className="text-primary hover:underline">ROI calculator</Link> to put your own guarding hours beside each option, and <Link href="/pricing" className="text-primary hover:underline">request a quote</Link> for your camera count.
              </p>
            </ScrollReveal>
          </div>

          <div className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-xl font-bold">Sources, checked 17 September 2026</h2>
              <p className="mt-3 max-w-prose text-sm text-muted-foreground">
                Every statement about Coram AI above comes from one of these Coram pages, read on that date. Coram&apos;s trust center rendered no readable content when opened, so this page states no certification for either company.
              </p>
              <ul className="mt-4 max-w-prose space-y-2 text-sm text-muted-foreground">
                {sources.map((s) => (
                  <li key={s.href}>
                    <a href={s.href} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">{s.label}</a>
                    <span className="ml-2 font-mono text-xs">{s.href}</span>
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
