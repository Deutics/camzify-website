import { generatePageMeta } from '@/lib/page-utils';
import { PageShell } from '@/components/layout/page-shell';
import { FaqSection } from '@/components/content/faq-section';
import { articleSchema, personSchema } from '@/lib/seo';
import { AuthorByline } from '@/components/content/author-byline';
import { ScrollReveal } from '@/components/motion/scroll-reveal';
import { PointList } from '@/components/content/point-list';
import { ProductShot } from '@/components/content/product-shot';
import Link from 'next/link';

/**
 * Page identity. Declared once and consumed twice: by `generatePageMeta` for the
 * <head> tags, and by `PageShell` for the on-page structured data. Keeping it in one
 * const is what stops the meta description and the schema drifting apart.
 *
 * The guide behind "hybrid cloud video surveillance", "cloud and local recording" and
 * "keep the NVR and add the cloud". It is written for a reader whose recorders work:
 * what a hybrid setup is, the three shapes it takes, what the cloud adds, which cameras
 * go first, what stays with the recorder, and how to move site by site. It deliberately
 * carries no bandwidth, bitrate or storage figure; the bandwidth guide teaches the
 * method and the reader's own cameras hold the numbers.
 */
const pageMeta = {
  title: "Hybrid Cloud Video Surveillance | Keep the NVR",
  description: "What a hybrid cloud video surveillance setup is, the three shapes it takes, which cameras to move to the cloud first, and what stays on the recorder.",
  path: "/guides/hybrid-cloud-video-surveillance",
};

const publishedTime = '2026-09-17';
const modifiedTime = '2026-09-17';

export const metadata = generatePageMeta({ ...pageMeta, type: 'article', publishedTime, modifiedTime });

const faqs = [
  { question: 'Can I keep my NVR and add cloud video surveillance?', answer: 'Yes. Camzify records from the camera stream, or from an RTSP stream the recorder publishes, so the recorder carries on exactly as before and the cloud copy is made alongside it. Nothing is switched off, nothing new is mounted, and the cameras stay where they are.' },
  { question: 'Do I have to send every camera to the cloud?', answer: 'No. Camzify licenses a stream instance per camera, so you decide which cameras stream to the cloud and which stay on the recorder alone. Most hybrid sites start with a few cameras and add more as the connection and the budget allow, and the cameras left on the recorder are not affected.' },
  { question: 'Does a hybrid setup use more bandwidth than a full cloud setup?', answer: 'Less, because only the cameras sent to the cloud leave the site, and the recorder needs nothing beyond the local network. The upstream figure to check is the sum of the cloud cameras\' stream bitrates, read from the cameras themselves. The bandwidth guide shows how to read and compare them.' },
  { question: 'Does the cloud copy the footage already on my recorder?', answer: 'No. Camzify records the stream from the moment a camera is connected, and the archive already on the recorder stays on the recorder for the rest of its window. Retrieve older footage with the recorder\'s own export tools, and plan the cloud retention from the connection date forward.' },
  { question: 'What happens if the internet drops on a hybrid site?', answer: 'Recording to the cloud stops at that moment, and everything recorded before it is kept. A camera the cloud cannot reach is shown as offline while the other cameras continue. The recorder keeps writing locally through the outage, which is the main reason to keep it under the cameras that must never have a gap.' },
  { question: 'Is a hybrid cloud VMS the same as a cloud NVR?', answer: 'A cloud NVR is the recording part of a cloud VMS with no recorder on site; a hybrid setup keeps the recorder and adds the cloud beside it. On Camzify the cloud side is the same in both cases: recording and retention per camera, live view, AI detections and patrol rounds. The difference is whether the box stays.' },
];

export default function HybridCloudVideoSurveillancePage() {
  return (
    <PageShell
      {...pageMeta}
      faqs={faqs}
      schema={[
        articleSchema({ headline: 'Hybrid cloud video surveillance: keep the recorder, add the cloud', description: pageMeta.description, path: pageMeta.path, datePublished: publishedTime, dateModified: modifiedTime }),
        personSchema(),
      ]}
      breadcrumbs={[
        { label: 'Guides', href: '/guides' },
        { label: 'Hybrid Cloud Video Surveillance' },
      ]}
    >
      <article className="pb-16">
        <div className="mx-auto max-w-site px-6">
          <h1 className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl">Hybrid cloud video surveillance: keep the recorder, add the cloud</h1>
          <AuthorByline className="mt-6" updated={modifiedTime} />
          <p className="mt-6 max-w-prose text-body text-muted-foreground">
            <strong className="font-semibold text-foreground">
              Hybrid cloud video surveillance keeps the recorder on site and adds cloud recording beside it, so the same cameras are recorded in two places: locally on the NVR and off site in a cloud VMS. The recorder carries on as it did; the cloud takes the cameras that need remote access, longer retention, AI detections or a copy that survives the building.
            </strong>
          </p>
          <p className="mt-4 max-w-prose text-body text-muted-foreground">
            That is the answer for the site whose recorder works. Most interest in{' '}
            <Link href="/cloud-video-surveillance" className="text-primary hover:underline">cloud video surveillance</Link>{' '}
            comes from sites that already record, and ripping out a working NVR to get there is neither necessary nor, for some cameras, wise. The{' '}
            <Link href="/guides/what-is-a-cloud-nvr" className="text-primary hover:underline">cloud NVR</Link>{' '}
            guide explains recording with no box at all; this guide covers the middle ground: what a hybrid setup is, the three shapes it takes, what the cloud adds, which cameras go first, what stays behind, and how to move site by site.
          </p>

          <div className="mt-10 max-w-3xl">
            <ProductShot src="/product-video-backup" alt="The video backup screen in the Camzify console: each cloud-connected camera with its recording mode and retention limit, and the account's storage totals above" label="Video backup and retention" sizes="(max-width: 1024px) 100vw, 768px" />
          </div>

          <section className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">What is a hybrid cloud video surveillance setup?</h2>
              <div className="mt-4 max-w-prose space-y-4 text-muted-foreground">
                <p>
                  It is a site that records to a recorder on the premises and to a cloud service at the same time, with the split decided camera by camera. Nothing about it is a special product: the recorder is the one you have, the cloud side is an ordinary cloud VMS, and the two do not need to know about each other.
                </p>
                <p>
                  The point of the arrangement is that each side does what it is good at. The recorder needs no upstream bandwidth and keeps writing through an internet outage. The cloud gives retention per camera, one login for every site, detections and patrol rounds on the same streams, and footage that is already outside the building on the day the recorder is stolen.
                </p>
                <p>
                  On Camzify the cloud side connects to whatever produces the stream. Any camera with an RTSP stream can be connected, and RTMP and HTTPS streams, whether HLS or WebRTC, connect as well. Camzify sells no hardware and needs nothing new on the wall, which is what makes a hybrid setup cheap to try: the cloud is added to the cameras, not swapped in for the recorder.
                </p>
              </div>
            </ScrollReveal>
          </section>

          <section className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">What shapes does a hybrid setup take?</h2>
              <div className="mt-4 max-w-prose space-y-4 text-muted-foreground">
                <p>
                  Three, and they differ in what the cloud records from and how many cameras it records. A site can use more than one at once, and most move from one to another over time.
                </p>
                <PointList items={[
                  <>The recorder keeps recording and the cloud records the same cameras in parallel. Each camera streams to the recorder as before and also to Camzify, through the{' '}<Link href="/camzify-connector" className="text-primary hover:underline">Camzify Connector</Link>{' '}when the cameras sit on a private network. Two independent recordings exist for every camera, and neither depends on the other.</>,
                  'The recorder publishes RTSP streams and becomes the source the cloud records from. A recorder that publishes its cameras as RTSP streams can be connected exactly as a camera would be, directly if its streams are reachable from the internet or through the Connector if they are not. The recorder keeps its local copy, the cloud holds the off-site one, and nothing changes on the cameras themselves.',
                  'Some cameras go to the cloud and the rest stay local. Camzify licenses a stream instance per camera, so the gate, the cash office and the loading bay can be cloud cameras while the stockroom stays on the recorder alone. The choice is made camera by camera, by how much upstream bandwidth the site has and by which cameras matter.',
                ]} />
                <p>
                  The second shape is the least work on the day, because the Connector is given the recorder&apos;s addresses instead of a list of cameras. The third shape is where a site with a thin internet connection ends up whichever one it started from, since only the cameras that leave the building count against the connection.
                </p>
              </div>
            </ScrollReveal>
          </section>

          <section className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">What does the cloud add that the recorder cannot?</h2>
              <div className="mt-4 max-w-prose space-y-4 text-muted-foreground">
                <p>
                  Four things, and each is a reason to add the cloud rather than a second recorder. A recorder keeps footage so that someone can review it later; the cloud side puts the following on the same streams.
                </p>
                <PointList items={[
                  'Retention set per camera rather than per box. On the recorder every camera shares one disk and one window; on Camzify each camera keeps a number of days or a storage cap of its own, so a gate camera can hold ninety days while a corridor keeps seven.',
                  'One login for every site. A company with several sites, or an agency with several clients, sees them in one console, folded together or held separate per site, with permission groups deciding who opens which camera, live or recorded. The recorders keep their own logins, but nobody has to use them to see the site.',
                  'Detections and patrol rounds on the same streams. Line and zone intrusion, loitering, camera tampering, fire and smoke and the other detection features can be licensed on any connected camera, and a scheduled patrol round checks a list at each camera, messages the guard responsible for a failure and files a timestamped report. The recorder has no equivalent, and its footage is untouched by any of it.',
                  'Footage that survives the recorder. Everything recorded to the cloud before the box was taken, smashed or unplugged is already outside the building, encrypted in transit over TLS 1.2 or higher and at rest with AES-256.',
                ]} />
                <p>
                  The{' '}
                  <Link href="/platform/video-backup-and-retention" className="text-primary hover:underline">video backup and retention</Link>{' '}
                  page describes the screen where the cloud side is set: recording mode and retention per camera, and storage shown as provisioned, used, assigned to sub-accounts and remaining. Compliance certifications are in progress and none is claimed as held.
                </p>
              </div>
            </ScrollReveal>
          </section>

          <section className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">Which cameras should go to the cloud first?</h2>
              <div className="mt-4 max-w-prose space-y-4 text-muted-foreground">
                <p>
                  The cameras whose footage you would most regret losing, and the cameras someone needs to watch from elsewhere. Those two questions rank every camera on the site, and the ranking is the order to connect them in.
                </p>
                <p>
                  Ask first which cameras record the events that end in a claim, a dispute or a police report: the entrance, the cash handling point, the loading bay, the perimeter gate. A recorder holds that footage only until the recorder is taken, so those are the cameras where an off-site copy earns its cost. Ask second which cameras a manager, an agency or a monitoring center needs to open without driving to the site. A camera nobody views remotely, whose footage is only reviewed after the fact, can stay on the recorder for now.
                </p>
                <p>
                  Then check the list against the connection. Every camera sent to the cloud needs upstream bandwidth for as long as it records, and the{' '}
                  <Link href="/guides/cloud-vms-bandwidth-requirements" className="text-primary hover:underline">cloud VMS bandwidth requirements</Link>{' '}
                  guide sets out how to read each camera&apos;s bitrate and compare the total with the site&apos;s upload capacity. Where the total is short, give the Connector a camera&apos;s sub stream instead of its main stream, record it on a schedule, or leave it on the recorder; the cloud list gets shorter before the recorder list does.
                </p>
                <p>
                  A camera that will carry a detection or sit on a patrol round moves up the list whatever its footage is worth, because neither runs on the recorder.
                </p>
              </div>
            </ScrollReveal>
          </section>

          <section className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">What stays with the recorder?</h2>
              <div className="mt-4 max-w-prose space-y-4 text-muted-foreground">
                <p>
                  The archive already on it, and any camera or site that should not stream out. Camzify records the stream from the moment a camera is connected, and footage that exists only on the recorder&apos;s disk is not a stream, so what was recorded before that day stays where it is and is reviewed there.
                </p>
                <PointList items={[
                  'The existing archive. What the recorder has already written stays on the recorder for the rest of its window, and the recorder\'s export tools are how that footage is retrieved. Plan the cloud retention window from the connection date forward.',
                  'Sites with too little upstream bandwidth. A site whose connection cannot carry even its most important cameras, after the sub stream and scheduling levers have been tried, keeps its recorder and joins the cloud side when the connection improves.',
                  'Footage that must stay on site by policy. Some sites carry a contractual or regulatory rule that recorded video does not leave the premises. The cloud sends it out encrypted, and encryption does not change where it is; those cameras stay local, and the cloud side can still carry the cameras the policy does not cover.',
                  'Recording through an internet outage. Recording to the cloud stops when the connection drops, with everything before it kept. A recorder on a battery keeps writing through the outage, which is a reason to keep it under the cameras that must never have a gap.',
                ]} />
                <p>
                  The{' '}
                  <Link href="/compare/cloud-vms-vs-on-premise" className="text-primary hover:underline">cloud VMS vs on-premise</Link>{' '}
                  comparison sets the two models against each other row by row, including the rows where the recorder wins. A hybrid setup is how a site takes the cloud&apos;s rows without giving up the recorder&apos;s.
                </p>
              </div>
            </ScrollReveal>
          </section>

          <section className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">How do I run the transition site by site?</h2>
              <div className="mt-4 max-w-prose space-y-4 text-muted-foreground">
                <p>
                  One site, a few cameras, a working week, then the next site. The recorder is what makes this safe: nothing is switched off, so a camera that does not connect cleanly is a camera still on the recorder.
                </p>
                <p>
                  Start with the site that has the most to gain and a connection that can carry it. Connect the two or three cameras at the top of the list through the{' '}
                  <Link href="/camera-connectivity/rtsp-setup" className="text-primary hover:underline">RTSP setup guide</Link>, directly if their streams are reachable from the internet or through the Connector on a PC on that network, set recording and retention for each, and watch live view and playback at the busy hours of the day. The{' '}
                  <Link href="/guides/using-existing-cameras-with-a-cloud-vms" className="text-primary hover:underline">using existing cameras with a cloud VMS</Link>{' '}
                  guide covers how to try one camera before committing to more.
                </p>
                <p>
                  Widen camera by camera, stopping at the number the connection carries cleanly, and switch on detections or a patrol round only once the recording underneath is steady. When the site is stable, repeat at the next one. Each site appears under the same account, held separate or folded together as you prefer, and the recorders at the sites you have not reached yet are unaffected.
                </p>
                <p>
                  Whether a recorder is ever switched off is a decision for later, and for some sites the answer is never. Camzify is priced per instance per month, from $5 per camera per month and quoted for the site, so the cloud list can grow one camera at a time rather than in one order.
                </p>
              </div>
            </ScrollReveal>
          </section>

          <section className="mt-20 rounded-xl bg-card p-8 shadow">
            <h2 className="font-display text-xl font-bold">Related guides</h2>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link href="/guides/what-is-a-cloud-nvr" className="rounded-full bg-muted px-4 py-2 text-sm font-medium transition-colors hover:bg-primary hover:text-white">Cloud NVR explained</Link>
              <Link href="/guides/cloud-vms-bandwidth-requirements" className="rounded-full bg-muted px-4 py-2 text-sm font-medium transition-colors hover:bg-primary hover:text-white">Cloud VMS bandwidth requirements</Link>
              <Link href="/guides/using-existing-cameras-with-a-cloud-vms" className="rounded-full bg-muted px-4 py-2 text-sm font-medium transition-colors hover:bg-primary hover:text-white">Using existing cameras with a cloud VMS</Link>
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
