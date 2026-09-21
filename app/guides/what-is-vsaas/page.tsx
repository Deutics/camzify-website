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
 *
 * The definitional guide for "VSaaS" and "video surveillance as a service", the
 * analyst and vendor name for the model the site elsewhere calls cloud video
 * surveillance. It takes the buyer's side: what the subscription includes and leaves
 * out, how the term relates to cloud VMS, hosted NVR and on-premise VMS, how the
 * market prices it, what to check before signing, and when it is the wrong purchase.
 * The sibling guide, what-is-a-cloud-vms, covers the software side; this one does not
 * repeat it.
 */
const pageMeta = {
  title: "What Is VSaaS? | Video Surveillance as a Service",
  description: "VSaaS, video surveillance as a service, is cloud recording, storage and live view sold per camera per month. What it includes, costs and when it fits.",
  path: "/guides/what-is-vsaas",
};

const publishedTime = '2026-09-17';
const modifiedTime = '2026-09-17';

export const metadata = generatePageMeta({ ...pageMeta, type: 'article', publishedTime, modifiedTime });

const faqs = [
  { question: 'What does VSaaS stand for?', answer: 'Video surveillance as a service. It is a subscription under which a site\'s cameras stream to a vendor\'s cloud, which records, stores and serves their footage for a monthly fee per camera. The customer keeps the cameras and the internet connection; the vendor runs the recording, the storage and the software.' },
  { question: 'Is VSaaS the same as a cloud VMS?', answer: 'In practice, yes. VSaaS is the service the customer buys and a cloud VMS is the software that delivers it, so a cloud VMS sold by subscription is VSaaS. Analyst reports and vendor decks tend to say VSaaS; product pages and buyers searching for software tend to say cloud VMS.' },
  { question: 'What does VSaaS cost per camera?', answer: 'Across the market it is priced per camera per month, and most vendors quote rather than publish a rate card. Camzify is priced per instance per month, quoted per site, from $5 per camera per month for a stream instance with motion and camera tampering detection included. Detections, patrol rounds and storage are added as instances on the cameras that need them.' },
  { question: 'Do I need new cameras for VSaaS?', answer: 'Not for a software-only provider. Camzify connects any camera that produces an RTSP stream, which covers most IP cameras from the last decade, and accepts RTMP and HTTPS streams as well. Cameras on a private network are relayed by the Camzify Connector, an application on a PC inside that network, without port forwarding.' },
  { question: 'Who are the VSaaS providers?', answer: 'They fall into two kinds: camera vendors that sell their own hardware with a cloud subscription attached, and software-only vendors that connect the cameras a site already owns. Camzify is the second kind and sells no hardware. Whichever kind you evaluate, ask the same seven questions about retention, export, bandwidth, ownership, data location, certifications and exit terms.' },
  { question: 'When is VSaaS the wrong choice?', answer: 'When the site cannot carry its cameras upstream, when policy requires footage to stay on premises, or when one working recorder for occasional review is all that is wanted. In those cases a recorder on site is the better purchase, and the two can coexist: a recorder as the local archive with VSaaS on the same cameras for a second copy, remote viewing, detections and patrol rounds.' },
];

export default function WhatIsVsaasPage() {
  return (
    <PageShell {...pageMeta} faqs={faqs} schema={[articleSchema({ headline: "What Is VSaaS?", description: pageMeta.description, path: pageMeta.path, datePublished: publishedTime, dateModified: modifiedTime }), personSchema()]} breadcrumbs={[
      { label: 'Guides', href: '/guides' },
      { label: 'What Is VSaaS?' },
    ]}>
      <article className="pb-16">
        <div className="mx-auto max-w-site px-6">
          <h1 className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl">What is VSaaS? Video surveillance as a service, explained</h1>
          <AuthorByline className="mt-6" updated={modifiedTime} />
          <p className="mt-6 max-w-prose text-body text-muted-foreground">
            VSaaS, video surveillance as a service, is a subscription under which a site&apos;s cameras stream to a vendor&apos;s cloud, which records, stores and serves their footage for a monthly fee per camera. The customer keeps the cameras and the internet connection; the vendor owns and runs the recording, the storage and the software, and delivers all of it through a browser.
          </p>
          <p className="mt-4 max-w-prose text-body text-muted-foreground">
            The acronym is the analyst and vendor name for the model buyers more often call{' '}
            <Link href="/cloud-video-surveillance" className="text-primary hover:underline">cloud video surveillance</Link>, and the software that delivers it is a{' '}
            <Link href="/guides/what-is-a-cloud-vms" className="text-primary hover:underline">cloud VMS</Link>. The three terms describe one thing from three angles: the market category, the buying model and the software. This guide takes the buyer&apos;s angle: what the subscription includes and leaves out, how it is priced, what to check before signing, and when it is the wrong purchase.
          </p>

          <div className="mt-10 max-w-3xl">
            <PhotoFigure src="/guide-what-is-vsaas.webp" alt="Illustration for this guide: the Camzify console and the cameras it runs on" priority />
          </div>

          <section className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">What does a VSaaS subscription include?</h2>
              <div className="mt-4 max-w-prose space-y-4 text-muted-foreground">
                <p>
                  A VSaaS subscription includes everything that used to sit on the recorder and the server: recording, storage, live viewing, playback, user access, and the updates that keep all of it current. On Camzify it also includes the AI detections and scheduled patrol rounds switched on per camera. The vendor runs it; the customer uses it.
                </p>
              </div>
              <PointList items={[
                <>Recording per camera, continuously or on a schedule, into cloud storage sold as a pool for the account.</>,
                <>Retention per camera, in days or as a storage cap, with footage deleted when the window ends. The screen above is where it is set.</>,
                <>Live view and playback from a browser, with export from the same place, for every site on one login.</>,
                <>Users and permission groups, so a person sees only the sites and cameras they are scoped to, with every action written to an audit trail.</>,
                <>Software updates and the infrastructure underneath, applied by the vendor without a visit to the site.</>,
                <>On Camzify, AI detections licensed per feature per camera, and virtual patrolling: a scheduled round with a checklist at each camera stop, the responsible guard notified on a failure, and a timestamped report.</>,
              ]} />
            </ScrollReveal>
          </section>

          <section className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">What does VSaaS not include?</h2>
              <div className="mt-4 max-w-prose space-y-4 text-muted-foreground">
                <p>
                  VSaaS does not include the cameras, their installation, or the internet connection that carries them. Those three stay with the customer, and the subscription assumes they are in place and working. A vendor that sells cameras alongside the service is bundling hardware with VSaaS, not delivering VSaaS.
                </p>
                <p>
                  Camzify sells no hardware. Any camera that produces an RTSP stream can be connected, and a camera on a private network is relayed by the Camzify Connector, an application on a PC inside that network, without port forwarding. That PC is the one item sometimes needed on site. The upstream bandwidth to carry every streamed camera is the customer&apos;s to provide, and{' '}
                  <Link href="/guides/cloud-vms-bandwidth-requirements" className="text-primary hover:underline">cloud VMS bandwidth requirements</Link>{' '}
                  explains how to work out whether a connection has enough.
                </p>
              </div>
            </ScrollReveal>
          </section>

          <section className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">How is VSaaS different from a cloud VMS?</h2>
              <div className="mt-4 max-w-prose space-y-4 text-muted-foreground">
                <p>
                  Largely, it is not: VSaaS and cloud VMS describe the same model from two sides. VSaaS is the service the customer buys, a monthly subscription for surveillance delivered from the cloud; a cloud VMS is the software that delivers it. When a vendor sells a cloud VMS by subscription, the customer is buying VSaaS.
                </p>
                <p>
                  The distinction that survives is one of emphasis. A cloud VMS is described by what the software does: connect cameras, record, play back, manage users, run analytics. VSaaS is described by what the buyer gets and gives up: no server, no recorder, no capital purchase, a monthly bill, and a dependency on the vendor and on the connection.
                </p>
                <p>
                  Analyst reports and vendor decks tend to use VSaaS; product pages, and buyers searching for software, tend to use cloud VMS. Camzify&apos;s{' '}
                  <Link href="/platform" className="text-primary hover:underline">platform pages</Link>{' '}
                  describe the software; this guide describes the service.
                </p>
              </div>
            </ScrollReveal>
          </section>

          <section className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">How is VSaaS different from a hosted NVR and an on-premise VMS?</h2>
              <div className="mt-4 max-w-prose space-y-4 text-muted-foreground">
                <p>
                  A hosted NVR moves the recorder into the cloud and stops there; an on-premise VMS keeps everything, including the software, on a server inside the building. VSaaS has nothing on site and covers the management layer as well as the recording.
                </p>
                <p>
                  A hosted NVR, often sold as a cloud NVR, records off site and plays back from a browser, and may offer little else. VSaaS is expected to cover users, permissions, multi-site management, alerts and analytics as part of the fee, and on Camzify the detections and patrol rounds as well.
                </p>
                <p>
                  An on-premise VMS is the opposite purchase. The customer buys and maintains the server and the licenses, and the footage never leaves the building unless someone exports it. It needs no upstream bandwidth, and the server is the single point of failure for every camera on it. The full comparison is on{' '}
                  <Link href="/compare/cloud-vms-vs-on-premise" className="text-primary hover:underline">cloud VMS vs on-premise VMS</Link>.
                </p>
              </div>
            </ScrollReveal>
          </section>

          <section className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">How is VSaaS priced?</h2>
              <div className="mt-4 max-w-prose space-y-4 text-muted-foreground">
                <p>
                  VSaaS is priced per camera per month across the market, and a quote expressed any other way should be converted so it can be compared. Camzify is priced per instance per month, quoted per site, from $5 per camera per month. The per-camera figure is the stream instance, and the rest of a quote is built from what is switched on.
                </p>
                <p>
                  On Camzify every connected camera takes a stream instance, which connects it, streams it live and makes it available to record and patrol, with motion detection and camera tampering detection included. Every AI feature enabled on a camera takes a detection instance of that feature, so ten cameras with line intrusion are ten line intrusion instances. Every camera on patrol rounds takes a virtual patrolling instance, cloud storage is sold per terabyte per month as a pool that the retention on each camera draws from, and the platform modules come with the account.
                </p>
                <p>
                  No rate is published beyond the $5 floor. Quotes come in lower for an annual term and for accounts that license more features per camera, and the{' '}
                  <Link href="/pricing" className="text-primary hover:underline">pricing page</Link>{' '}
                  turns camera and feature counts into a quote request answered within one business day.
                </p>
              </div>
            </ScrollReveal>
          </section>

          <section className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">What should you check before signing a VSaaS contract?</h2>
              <div className="mt-4 max-w-prose space-y-4 text-muted-foreground">
                <p>
                  Check retention, export, bandwidth, ownership of the footage, where it is stored, certification status and exit terms before the price. A VSaaS contract is a dependency on a vendor for evidence you may one day need to show an insurer or a court. Each item below is a question to put to any vendor, with Camzify&apos;s answer where this site states one.
                </p>
              </div>
              <PointList items={[
                <>Retention. Can it be set per camera, in days or as a storage cap, and is deletion enforced when the window ends? On Camzify it can, and{' '}<Link href="/guides/video-retention-requirements" className="text-primary hover:underline">video retention requirements</Link>{' '}explains how to choose the number.</>,
                <>Export. Can a clip be pulled from the browser without a support ticket? Playback and export are in the same console on Camzify, under the same permissions as live view.</>,
                <>Bandwidth. Does the vendor say what each camera needs upstream, and what happens when the connection drops? Camzify detects stream quality when a camera connects and does not publish a per-camera number, because the figure depends on resolution, frame rate and codec.</>,
                <>Ownership of the footage. The contract should say the footage is yours and state what the vendor may do with it. Ask for the clause, not the assurance.</>,
                <>Data location. Ask which country the footage is stored in and whether that can be chosen; encryption in transit does not change where the data ends up.</>,
                <>Certifications. Ask which are held and which are in progress, and ask for the report rather than the badge. Camzify&apos;s PDPA, GDPR, SOC 2 Type II and ISO 27001 work is in progress and none is held; the{' '}<Link href="/security-and-compliance" className="text-primary hover:underline">security and compliance page</Link>{' '}lists each with its status.</>,
                <>Exit terms. Ask what happens to the footage when the subscription ends, how long there is to export it, and what notice is required. Camzify agrees terms in the quote rather than publishing them, so ask for them in writing before signing.</>,
              ]} />
            </ScrollReveal>
          </section>

          <section className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">When is VSaaS the wrong fit?</h2>
              <div className="mt-4 max-w-prose space-y-4 text-muted-foreground">
                <p>
                  VSaaS is the wrong fit when the site cannot carry its cameras upstream, when policy requires footage to stay on premises, or when one working recorder for occasional review is all that is wanted. Those cases are real, and a subscription does not win them.
                </p>
                <p>
                  Bandwidth is the most common. Every streamed camera needs continuous upstream capacity, and a thin, metered or already committed connection will drop frames or starve the rest of the network. Policy is the second: a contractual or regulatory rule that footage never leaves the building is not answered by encryption.
                </p>
                <p>
                  There is a fourth case. A buyer who wants recording and nothing else may find a per-camera fee harder to justify than a disk, because the value in VSaaS is in what runs on top of the recording; on Camzify that is detections and patrol rounds, measured against the guard hours a round replaces. A site with one of these constraints on a few cameras can keep the recorder for those and add VSaaS on the rest, or on all of them for a second copy with detections and patrol rounds.
                </p>
              </div>
            </ScrollReveal>
          </section>

          <section className="mt-20 rounded-xl bg-card p-8 shadow">
            <h2 className="font-display text-xl font-bold">Related guides</h2>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link href="/guides/what-is-a-cloud-vms" className="rounded-full bg-muted px-4 py-2 text-sm font-medium transition-colors hover:bg-primary hover:text-white">What Is a Cloud VMS?</Link>
              <Link href="/guides/what-is-a-cloud-nvr" className="rounded-full bg-muted px-4 py-2 text-sm font-medium transition-colors hover:bg-primary hover:text-white">What Is a Cloud NVR?</Link>
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
