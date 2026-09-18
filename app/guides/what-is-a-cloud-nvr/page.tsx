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
 * The guide behind the "cloud NVR" and "NVR alternative" queries that the
 * cloud video surveillance pillar targets. It is written for a reader who has a
 * recorder today: what a cloud NVR is, how recording works without the box, what
 * happens to the cameras, what the cloud adds, and when the recorder should stay.
 */
const pageMeta = {
  title: "Cloud NVR Explained | An NVR Alternative",
  description: "What a cloud NVR is, how recording works with no box on site, what happens to your cameras, and when an on-site recorder should stay.",
  path: "/guides/what-is-a-cloud-nvr",
};

const publishedTime = '2026-09-16';
const modifiedTime = '2026-09-16';

export const metadata = generatePageMeta({ ...pageMeta, type: 'article', publishedTime, modifiedTime });

const faqs = [
  { question: 'Is a cloud NVR the same thing as a cloud VMS?', answer: 'A cloud NVR is the recording part of a cloud VMS. The recorder function, recording, retention, playback and export, runs as a service instead of on a box, and a cloud VMS wraps it with live view, users and permissions, and on Camzify the AI detections and patrol rounds. If cloud NVR is the phrase you know, a cloud VMS is the same idea with more on top.' },
  { question: 'Do I need to replace my cameras to use a cloud NVR?', answer: 'No. Any camera that produces an RTSP stream can be connected, and most IP cameras from the last decade do. RTMP and HTTPS streams, whether HLS or WebRTC, connect as well. Cameras on a private network reach Camzify through the Camzify Connector without any port being opened on the router.' },
  { question: 'Can I keep my existing NVR and add cloud recording?', answer: 'Yes. Camzify records from the camera stream, not from the recorder, so the recorder carries on as the local copy. A recorder that publishes its cameras as RTSP streams can even be the source instead of the cameras. Many sites run this way first and switch the recorder off later, or never.' },
  { question: 'What happens to recording if the internet connection drops?', answer: 'Recording to the cloud stops at that moment, and everything recorded before it is kept. A camera that cannot reach Camzify is shown as offline, and the other cameras continue. A site that must record through an outage should keep a recorder on site for that purpose.' },
  { question: 'How long is footage kept in a cloud NVR?', answer: 'For as long as the retention window set on that camera, in days or as a storage cap in GB. A gate camera can keep ninety days while a corridor keeps seven. Presets of 7, 30, 60 or 90 days can be applied to every camera on the account in one action.' },
  { question: 'What does a cloud NVR cost compared with a recorder?', answer: 'Camzify is priced per instance per month and quoted for the site, from $5 per camera per month. A recorder is bought once and then costs disks, replacement and a login per box, so the comparison depends on how many sites and cameras you run. The pricing page explains what a quote is built from.' },
];

export default function WhatIsACloudNvrPage() {
  return (
    <PageShell
      {...pageMeta}
      faqs={faqs}
      schema={[
        articleSchema({ headline: 'Cloud NVR explained: recording without a recorder', description: pageMeta.description, path: pageMeta.path, datePublished: publishedTime, dateModified: modifiedTime }),
        personSchema(),
      ]}
      breadcrumbs={[
        { label: 'Guides', href: '/guides' },
        { label: 'Cloud NVR Explained' },
      ]}
    >
      <article className="pb-16">
        <div className="mx-auto max-w-site px-6">
          <h1 className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl">Cloud NVR explained: recording without a recorder</h1>
          <AuthorByline className="mt-6" updated={modifiedTime} />
          <p className="mt-6 max-w-prose text-body text-muted-foreground">
            A cloud NVR is a network video recorder that runs as a service in the cloud instead of as a box on site: the cameras stream to it, it records them, and the footage is played back from a browser. The cameras stay where they are; the recorder, its disks and its login are what go.
          </p>
          <p className="mt-4 max-w-prose text-body text-muted-foreground">
            The phrase is a search term more than a product category. What it describes is the recording half of{' '}
            <Link href="/cloud-video-surveillance" className="text-primary hover:underline">cloud video surveillance</Link>, and on Camzify that recording sits inside a{' '}
            <Link href="/platform" className="text-primary hover:underline">cloud VMS</Link>{' '}
            that also carries live view, AI detections and scheduled patrol rounds on the same streams. This guide answers the questions a site with an NVR or DVR asks before moving: how recording works with no box, what happens to the cameras, what the cloud adds, and when the recorder should stay.
          </p>

          <div className="mt-10 max-w-3xl">
            <PhotoFigure src="/guide-what-is-a-cloud-nvr.webp" alt="Illustration for this guide: the Camzify console and the cameras it runs on" priority />
          </div>

          <section className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">Does a cloud NVR exist, and what is it?</h2>
              <div className="mt-4 max-w-prose space-y-4 text-muted-foreground">
                <p>
                  Yes, although few products call themselves one. A cloud NVR is the recording function of a cloud video management system: cameras send their streams to storage outside the building, and the recording, retention, playback and export that a recorder used to do on a disk happen there instead. Cloud NVR is what buyers type; cloud CCTV, cloud camera storage and cloud VMS describe the same shift from the other side.
                </p>
                <p>
                  The distinction that matters is where footage is written. A recorder writes every camera to one disk in one building, and that disk is the single point of failure for all of them. A cloud NVR writes each camera to its own off-site storage as the frames arrive, so a camera going offline is shown as offline while recording of the others continues.
                </p>
              </div>
            </ScrollReveal>
          </section>

          <section className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">How does recording work without a recorder on site?</h2>
              <div className="mt-4 max-w-prose space-y-4 text-muted-foreground">
                <p>
                  The camera streams and the cloud records. Almost every IP camera already produces an RTSP stream, and that stream, sent to Camzify instead of to a recorder, is the recording source. Recording runs continuously or on a schedule set per camera, and a schedule can be applied to a whole site or to every camera at once.
                </p>
                <p>
                  Retention is set per camera, by a number of days or by a storage cap in GB. A camera on a days window drops footage older than the window; a camera on a storage cap rolls its oldest footage off as new footage arrives, and either way the camera keeps recording. Presets of 7, 30, 60 or 90 days can be pushed to every camera on the account in one action. Playback scrubs the recording, several cameras can be compared side by side, and a download exports a clip for the range you choose.
                </p>
                <p>
                  Storage is shown as provisioned, used, assigned to sub-accounts and remaining, never as one blended figure. The storage estimate for a camera is derived from its bitrate, recording hours and retention days, and it is labeled as an estimate because actual consumption varies with scene activity. The{' '}
                  <Link href="/platform/video-backup-and-retention" className="text-primary hover:underline">video backup and retention</Link>{' '}
                  page describes the screen in full.
                </p>
              </div>
            </ScrollReveal>
          </section>

          <section className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">What happens to the cameras I already have?</h2>
              <div className="mt-4 max-w-prose space-y-4 text-muted-foreground">
                <p>
                  They stay. Any camera that produces an RTSP stream can be connected, and most IP cameras from the last decade do; RTMP and HTTPS streams, whether HLS or WebRTC, connect as well. Camzify sells no hardware and requires none, so nothing new is mounted.
                </p>
                <p>
                  Cameras on a private network, which is most of them, connect through the{' '}
                  <Link href="/camzify-connector" className="text-primary hover:underline">Camzify Connector</Link>. It is a small application on a Windows, macOS or Linux machine inside that network, often an office PC that is already there, and it makes an outbound connection to Camzify in the same direction as ordinary web traffic. No port is forwarded, no static IP is needed and the cameras are never exposed to the internet. Pan, tilt and zoom control is carried alongside the video for cameras that support it.
                </p>
                <p>
                  The recorder itself can stay as well. A recorder that publishes its cameras as RTSP streams can be the source instead of the cameras, in which case it keeps its local copy and Camzify holds the off-site one. That is the usual first step for a site that is not ready to switch the box off on day one.
                </p>
              </div>
            </ScrollReveal>
          </section>

          <section className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">What does a cloud NVR do that a recorder cannot?</h2>
              <div className="mt-4 max-w-prose space-y-4 text-muted-foreground">
                <p>
                  Five things, and each follows from the footage being in one service rather than on one disk. A recorder keeps footage so that someone can review it after something has happened; a cloud VMS puts the following on the same streams.
                </p>
                <PointList items={[
                  'Retention per camera rather than per box. A gate camera can keep ninety days while a corridor keeps seven, instead of every camera sharing one disk and one window.',
                  'Every site on one login. A company with several sites, or an agency with several clients, sees them in one console, folded together or held separate per site, with permission groups deciding who opens which camera, live or recorded.',
                  'AI detections on the recorded streams. Line and zone intrusion, loitering, camera tampering, fire and smoke and the other detection features can be licensed on any connected camera, and a detection opens the footage around it.',
                  'Scheduled patrol rounds. A round runs through the cameras on a schedule, checks a list at each one from the frame, messages the guard responsible for a failure and files a timestamped report. A recorder has no equivalent.',
                  <>Footage that survives the theft of the recorder. Everything recorded before the box was taken, smashed or unplugged is already outside the building, which is the case set out in{' '}<Link href="/use-cases/cloud-video-backup-against-dvr-theft" className="text-primary hover:underline">cloud video backup against DVR theft</Link>.</>,
                ]} />
                <p>
                  Footage off site is still yours. Streams are encrypted in transit over TLS 1.2 or higher and at rest with AES-256, every action on the account is written to an audit trail, and access follows the same permission groups as everything else in the console. Compliance certifications are in progress and none is claimed as held; the{' '}
                  <Link href="/security-and-compliance" className="text-primary hover:underline">security and compliance page</Link>{' '}
                  lists each one with its status.
                </p>
              </div>
            </ScrollReveal>
          </section>

          <section className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">When should the recorder stay?</h2>
              <div className="mt-4 max-w-prose space-y-4 text-muted-foreground">
                <p>
                  When the site cannot carry its cameras upstream, when footage must not leave the building, or when local review is all that is wanted. A cloud NVR is not the right answer for every site, and a page that says otherwise is selling a box by another name.
                </p>
                <PointList items={[
                  <>Poor upstream bandwidth. Every camera streamed to the cloud needs upload capacity for as long as it records, while a recorder needs nothing beyond the local network. A site on a thin or metered link should keep its recorder, or record fewer cameras to the cloud; the{' '}<Link href="/guides/cloud-vms-bandwidth-requirements" className="text-primary hover:underline">bandwidth guide</Link>{' '}sets out how to size the link.</>,
                  'Footage that must not leave the building. Some sites carry a policy, contractual or regulatory, that recorded video stays on the premises. A cloud NVR sends it out, encrypted, and encryption does not change where it is.',
                  'Local review only. One site, a recorder that works, and nobody who needs to watch it from elsewhere or be told when something happens. The recorder is doing its job, and there is nothing to fix.',
                  'Recording through an outage. Footage is off site up to the moment the router is unplugged or the machine running the Connector is taken; recording stops at that moment and everything before it is kept. A recorder on a battery keeps writing through an internet outage.',
                ]} />
                <p>
                  The{' '}
                  <Link href="/compare/cloud-vms-vs-on-premise" className="text-primary hover:underline">cloud VMS vs on-premise</Link>{' '}
                  comparison sets the two models against each other row by row, including the rows where on-premise wins.
                </p>
              </div>
            </ScrollReveal>
          </section>

          <section className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">How do I decide retention before I move?</h2>
              <div className="mt-4 max-w-prose space-y-4 text-muted-foreground">
                <p>
                  Set the window first, then the cameras. The{' '}
                  <Link href="/guides/video-retention-requirements" className="text-primary hover:underline">video retention requirements</Link>{' '}
                  guide covers what different sectors and insurers typically expect, and the number you land on is what the per-camera setting enforces, so the policy on paper and the policy in the system stay identical. A recorder has one disk and one window for every camera on it; a cloud NVR lets a cash office and a parking lot carry different windows on the same account.
                </p>
                <p>
                  Then decide which cameras record continuously and which record on a schedule. An interior camera watching an empty office overnight is paying to store twelve hours of nothing, and scheduled recording is the bluntest control on storage cost. Continuous recording is the right default where an incident could happen at any hour, or where an insurer expects unbroken coverage.
                </p>
              </div>
            </ScrollReveal>
          </section>

          <section className="mt-20 rounded-xl bg-card p-8 shadow">
            <h2 className="font-display text-xl font-bold">Related guides</h2>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link href="/guides/what-is-a-cloud-vms" className="rounded-full bg-muted px-4 py-2 text-sm font-medium transition-colors hover:bg-primary hover:text-white">What is a cloud VMS</Link>
              <Link href="/guides/hybrid-cloud-video-surveillance" className="rounded-full bg-muted px-4 py-2 text-sm font-medium transition-colors hover:bg-primary hover:text-white">Hybrid Cloud Video Surveillance</Link>
              <Link href="/guides/using-existing-cameras-with-a-cloud-vms" className="rounded-full bg-muted px-4 py-2 text-sm font-medium transition-colors hover:bg-primary hover:text-white">Using existing cameras with a cloud VMS</Link>
              <Link href="/guides/cloud-vms-bandwidth-requirements" className="rounded-full bg-muted px-4 py-2 text-sm font-medium transition-colors hover:bg-primary hover:text-white">Cloud VMS bandwidth requirements</Link>
            </div>
            <div className="mt-6 flex flex-wrap gap-4">
              <Link href="/book-a-demo" className="rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white shadow transition-colors hover:bg-primary/90">Book a demo</Link>
              <Link href="/roi-calculator" className="rounded-lg border border-border px-5 py-2.5 text-sm font-semibold transition-colors hover:bg-muted">Calculate ROI</Link>
            </div>
          </section>
        </div>
      </article>
      <FaqSection items={faqs} />
    </PageShell>
  );
}
