import { generatePageMeta } from '@/lib/page-utils';
import { PhotoFigure } from '@/components/content/photo-figure';
import { PageShell } from '@/components/layout/page-shell';
import { FaqSection } from '@/components/content/faq-section';
import { PointList } from '@/components/content/point-list';
import { articleSchema, personSchema } from '@/lib/seo';
import { AuthorByline } from '@/components/content/author-byline';
import { ScrollReveal } from '@/components/motion/scroll-reveal';
import Link from 'next/link';

/**
 * Page identity. Declared once and consumed twice: by `generatePageMeta` for the
 * <head> tags, and by `PageShell` for the on-page structured data. Keeping it in one
 * const is what stops the meta description and the schema drifting apart.
 *
 * Buyer-question guide for "use existing cameras with cloud VMS" and its variants
 * ("can I use my existing security cameras with cloud", "connect IP cameras to cloud").
 * Every H2 is the question the reader types, answered in its first two sentences so an
 * answer engine can quote the opening on its own.
 */
const pageMeta = {
  title: "Existing Cameras on a Cloud VMS | Guide",
  description: "Which existing security cameras work with a cloud VMS, how to check for ONVIF or RTSP, what will not connect, and how to try one camera first.",
  path: "/guides/using-existing-cameras-with-a-cloud-vms",
};

const publishedTime = '2026-09-16';
const modifiedTime = '2026-09-16';

export const metadata = generatePageMeta({ ...pageMeta, type: 'article', publishedTime, modifiedTime });

const linkClass = 'text-primary hover:underline';

const faqs = [
  {
    question: 'Can I use my existing security cameras with a cloud VMS?',
    answer: 'Yes, if they are IP cameras that support ONVIF or RTSP, which covers nearly every IP camera made in the last decade. Camzify connects to any ONVIF or RTSP-compatible camera over RTSP, RTMP or HTTPS, with no proprietary hardware. The brand does not decide compatibility; the protocol does.',
  },
  {
    question: 'Do I need to replace my NVR to move to the cloud?',
    answer: 'No. A cloud VMS takes the camera stream; it does not need the recorder removed. A recorder that publishes an RTSP stream for its channels can even be the source the cloud pulls from, so the two can run side by side while you decide what the recorder is still for.',
  },
  {
    question: 'Do my cameras need a static IP or port forwarding?',
    answer: 'No. A stream that is already reachable over the internet is added by its URL. Everything else goes through the Camzify Connector, an application on a Windows, macOS or Linux PC inside the camera network that connects outward to Camzify. No port is opened, no firewall rule is added and the cameras are never exposed to the internet.',
  },
  {
    question: 'What about analog cameras?',
    answer: 'An analog camera produces no network stream, so it cannot be added as it is. It needs something on site that converts its video and pushes it out, which is what an encoder does; Camzify gives the encoder a private RTMP ingest address. A recorder that publishes an RTSP stream for its analog channels is the other route.',
  },
  {
    question: 'Will cameras from different brands work together on one cloud VMS?',
    answer: 'Yes. ONVIF and RTSP are open standards, so cameras from different manufacturers connect the same way and appear side by side in the same console. Camzify keeps no per-model drivers; a camera that exposes an RTSP URL connects whoever made it, including models released after this guide was written.',
  },
  {
    question: 'Does the resolution of my cameras matter?',
    answer: 'Less than framing and lighting. The practical test is whether a person reviewing the feed can identify a person or vehicle at the distance you care about; if they can, the detection models have enough to work with. A 4K camera pointed at a wide car park can be worse than a 1080p camera framed on the entrance.',
  },
];

export default function UsingExistingCamerasWithACloudVmsPage() {
  return (
    <PageShell
      {...pageMeta}
      faqs={faqs}
      schema={[
        articleSchema({
          headline: 'Using your existing cameras with a cloud VMS',
          description: pageMeta.description,
          path: pageMeta.path,
          datePublished: publishedTime,
          dateModified: modifiedTime,
        }),
        personSchema(),
      ]}
      breadcrumbs={[
        { label: 'Guides', href: '/guides' },
        { label: 'Existing Cameras on a Cloud VMS' },
      ]}
    >
      <article className="pb-16">
        <div className="mx-auto max-w-site px-6">
          <h1 className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl">Using your existing cameras with a cloud VMS</h1>
          <AuthorByline className="mt-6" updated={modifiedTime} />
          <div className="mt-10 max-w-3xl">
            <PhotoFigure src="/guide-using-existing-cameras-with-a-cloud-vms.webp" alt="Illustration for this guide: the Camzify console and the cameras it runs on" priority />
          </div>
          <p className="mt-6 max-w-prose text-body text-muted-foreground">
            <strong className="font-semibold text-foreground">
              Most security cameras installed in the last decade can be used with a{' '}
              <Link href="/platform" className={linkClass}>cloud VMS</Link> without being replaced.
            </strong>{' '}
            If a camera exposes an ONVIF or RTSP stream, a{' '}
            <Link href="/cloud-video-surveillance" className={linkClass}>cloud video surveillance</Link>{' '}
            service can take that stream straight from the camera, or through a small relay on the
            local network, and the recorder the camera feeds today does not have to go on day one.
            This guide covers which cameras qualify, how to check yours in the camera&rsquo;s own
            interface, what will not connect, the two ways a stream reaches the cloud, and how to
            try a single camera before committing a fleet.
          </p>

          <section className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">Will my existing security cameras work with a cloud VMS?</h2>
              <div className="mt-4 max-w-prose space-y-4 text-muted-foreground">
                <p>
                  Yes, if they are IP cameras that support ONVIF or RTSP, which covers nearly every
                  IP camera made in the last decade whoever made it. Compatibility is decided by
                  the protocol the camera speaks, not by the name on the housing.
                </p>
                <p>
                  Camzify connects to any ONVIF or RTSP-compatible IP camera over one of three
                  connection types: RTSP, RTMP or HTTPS, where HTTPS covers both HLS playlists and
                  WebRTC streams. No proprietary hardware is involved and nothing new is mounted.
                  We do not keep per-model drivers, so a camera that exposes an RTSP URL connects
                  whether or not its brand appears on the{' '}
                  <Link href="/supported-cameras" className={linkClass}>supported cameras</Link> page,
                  which is a recognition aid for buyers who search by brand rather than a
                  compatibility matrix.
                </p>
                <p>
                  The two protocols do different jobs. ONVIF is the open standard that lets cameras,
                  recorders and software from different manufacturers discover and configure one
                  another; RTSP is what carries the live video. A camera that supports RTSP but not
                  ONVIF still connects, because the stream is what matters.
                </p>
              </div>
            </ScrollReveal>
          </section>

          <section className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">How do I check whether a camera supports ONVIF or RTSP?</h2>
              <div className="mt-4 max-w-prose space-y-4 text-muted-foreground">
                <p>
                  Open the camera&rsquo;s own admin interface in a browser and look under Network,
                  Streaming or Integration for an RTSP URL. If the camera offers one, it will work;
                  if its specification sheet lists ONVIF Profile S or Profile T, the same applies.
                </p>
                <p>
                  The URL usually takes the form rtsp://[camera-ip]:[port]/[stream-path], with 554
                  as the default port and 8554 the other common one. Most cameras require a
                  username and password on the stream, so note the credentials while you are in the
                  admin panel; Camzify has optional fields for them and asks only if the camera
                  does. Three checks tell you where a camera stands:
                </p>
                <PointList items={[
                  <>Does it speak ONVIF or RTSP? If you can find an RTSP URL in the admin panel, the camera qualifies.</>,
                  <>Can the stream be reached? A stream already reachable over the internet connects directly; a stream that exists only on the local network goes through the Camzify Connector.</>,
                  <>Is the picture good enough? If a person reviewing the feed can identify a person or vehicle at the distance you care about, the detection models have enough to work with.</>,
                ]} />
                <p>
                  If the protocols themselves are unfamiliar,{' '}
                  <Link href="/guides/onvif-and-rtsp-explained" className={linkClass}>ONVIF and RTSP explained</Link>{' '}
                  covers them in plain language before you open the admin panel.
                </p>
              </div>
            </ScrollReveal>
          </section>

          <section className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">Which cameras will not work?</h2>
              <div className="mt-4 max-w-prose space-y-4 text-muted-foreground">
                <p>
                  Three kinds of camera cannot be connected as they are: analog cameras with no
                  network stream, consumer cameras locked to one vendor&rsquo;s cloud app, and any
                  camera whose stream cannot be reached from anywhere useful. Each has a route
                  around it, but none connects by pasting a URL.
                </p>
                <PointList items={[
                  <>An analog camera produces no IP stream at all. It needs an encoder on site that converts its video and pushes it out over RTMP, or a recorder that publishes an RTSP stream for its channels; either of those becomes the source, not the camera itself.</>,
                  <>A consumer camera locked to a vendor cloud app sometimes exposes no local stream. If there is no RTSP URL anywhere in its admin panel, there is nothing for a cloud VMS to connect to.</>,
                  <>A camera on a network that no PC can see while also reaching the internet has no path out. The Camzify Connector needs a machine on the same LAN or VLAN as the cameras with outbound internet access, and without one the stream stays inside.</>,
                ]} />
                <p>
                  A fourth case connects but disappoints. A camera framed so that a person cannot be
                  identified at the distance that matters will stream and record, but detections
                  and patrol checks will not have enough to work with. Resolution matters less than
                  framing and lighting, so the fix is usually re-aiming the camera rather than
                  buying a new one.
                </p>
              </div>
            </ScrollReveal>
          </section>

          <section className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">How does the camera reach the cloud: direct stream or the Connector?</h2>
              <div className="mt-4 max-w-prose space-y-4 text-muted-foreground">
                <p>
                  An RTSP camera reaches Camzify in one of two ways: directly, if its stream is
                  already reachable over the internet, or through the Camzify Connector, an
                  application installed on a PC inside the camera&rsquo;s network. Both end up in
                  the same place; the route only decides how the stream gets there.
                </p>
                <p>
                  The direct route applies when the stream is already published to the internet
                  through a static IP, an existing forwarded route, or an NVR that exposes it. You
                  paste the URL into Camzify and nothing is installed. The{' '}
                  <Link href="/camera-connectivity/rtsp-setup" className={linkClass}>RTSP setup guide</Link>{' '}
                  walks through finding the URL, testing it and adding the camera.
                </p>
                <p>
                  The Connector route applies to everything else, which in practice is most cameras
                  on a site network behind a router. The{' '}
                  <Link href="/camzify-connector" className={linkClass}>Camzify Connector</Link> runs
                  on a Windows, macOS or Linux machine that can see the cameras and reach the
                  internet at the same time, often an office PC or a small server already on site.
                  You enter the RTSP URLs of the local cameras into it, and it makes an outbound
                  connection to Camzify and relays the streams, carrying pan, tilt and zoom control
                  for cameras that support it. No port is forwarded, no static IP is needed, no
                  firewall rule is added and the cameras are never exposed to the internet.
                </p>
                <p>
                  Plan the upload bandwidth before the software. Every relayed camera adds its own
                  stream bitrate to what the site must send upstream, and that sum, not the Connector
                  itself, is the constraint that bites on a site with many cameras. The{' '}
                  <Link href="/guides/cloud-vms-bandwidth-requirements" className="text-primary hover:underline">bandwidth guide</Link>{' '}
                  shows how to work it out from the cameras&apos; own settings.
                </p>
                <p>
                  Two other sources use the same console. An encoder pushes RTMP to a private ingest
                  address that Camzify generates, with a server URL and a stream key, and an HLS
                  playlist or WebRTC endpoint is added by its URL under the HTTPS connection type.
                  The{' '}
                  <Link href="/camera-connectivity" className={linkClass}>camera connectivity</Link>{' '}
                  pages cover each route step by step.
                </p>
              </div>
            </ScrollReveal>
          </section>

          <section className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">Can my recorder stay while I move to the cloud?</h2>
              <div className="mt-4 max-w-prose space-y-4 text-muted-foreground">
                <p>
                  Yes. A cloud VMS consumes the camera&rsquo;s stream, so it does not need the
                  recorder removed, and a recorder that publishes an RTSP stream for its channels
                  can itself be the source the cloud pulls from.
                </p>
                <p>
                  That makes a staged transition the normal shape rather than a cut-over. The
                  recorder keeps its local footage and its retention while cameras are added to the
                  cloud one at a time, and cloud recording is switched on per camera with its own
                  retention window, so the two can overlap for as long as you need to trust the
                  new one. If a camera cannot serve a second stream on its own, a recorder that
                  republishes it is the way around that.
                </p>
                <p>
                  The recorder is also the honest answer for some sites. Where upstream bandwidth is
                  too thin to carry the cameras, or where policy says footage never leaves the
                  building, the cloud does not win, and the{' '}
                  <Link href="/cloud-video-surveillance" className={linkClass}>cloud video surveillance</Link>{' '}
                  page sets that comparison out row by row instead of pretending otherwise.
                </p>
              </div>
            </ScrollReveal>
          </section>

          <section className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">How do I try one camera first?</h2>
              <div className="mt-4 max-w-prose space-y-4 text-muted-foreground">
                <p>
                  Pick one camera that matters, connect it, and judge the live picture before
                  touching the rest. A single camera proves the protocol, the route out of the
                  network and the picture quality at once, and it costs nothing if it fails.
                </p>
                <PointList items={[
                  <><strong className="font-semibold text-foreground">1. Choose the camera.</strong> An entrance or gate camera on the site network, with the admin login to hand, is the useful test; a corridor camera proves less.</>,
                  <><strong className="font-semibold text-foreground">2. Find its RTSP URL.</strong> Open the admin panel, look under Network, Streaming or Integration, and copy the URL along with the stream username and password.</>,
                  <><strong className="font-semibold text-foreground">3. Decide the route.</strong> Test the URL from a machine outside the camera&rsquo;s network. If it plays, connect it directly; if it does not, install the Camzify Connector on a PC on that network and enter the URL there.</>,
                  <><strong className="font-semibold text-foreground">4. Create the site, then the camera.</strong> A site is the physical location that groups its cameras. Add the camera against it and name it for the place, so that &ldquo;Loading Dock B&rdquo; rather than &ldquo;Cam 14&rdquo; follows it into alerts and reports.</>,
                  <><strong className="font-semibold text-foreground">5. Add the stream.</strong> Choose the RTSP connection type, paste the URL or select the stream the Connector is already relaying, and enter the credentials if the camera asks for them.</>,
                  <><strong className="font-semibold text-foreground">6. Verify it.</strong> Use Test Stream in the camera form, then open the tile in live streaming and confirm footage is flowing. Stream quality is detected automatically once the camera connects.</>,
                  <><strong className="font-semibold text-foreground">7. Judge the picture, then build on it.</strong> If a person or vehicle can be identified at the distance that matters, switch on recording, a detection or a place on a patrol sequence, the same as any other camera.</>,
                ]} />
                <p>
                  A stream that authenticated once but drops is the failure that quietly empties a
                  patrol report later, which is why the verification step comes before anything is
                  built on the camera. Once one camera works, the others on the same network and of
                  the same make usually follow the same route, and{' '}
                  <Link href="/guides/how-to-set-up-sites-and-cameras" className={linkClass}>how to add sites and cameras</Link>{' '}
                  covers organizing them as the count grows.
                </p>
              </div>
            </ScrollReveal>
          </section>

          <section className="mt-20 rounded-xl bg-card p-8 shadow">
            <h2 className="font-display text-xl font-bold">Related guides</h2>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link href="/guides/what-is-a-cloud-nvr" className="rounded-full bg-muted px-4 py-2 text-sm font-medium transition-colors hover:bg-primary hover:text-white">What Is a Cloud NVR</Link>
              <Link href="/guides/cloud-vms-bandwidth-requirements" className="rounded-full bg-muted px-4 py-2 text-sm font-medium transition-colors hover:bg-primary hover:text-white">Cloud VMS Bandwidth Requirements</Link>
              <Link href="/guides/onvif-and-rtsp-explained" className="rounded-full bg-muted px-4 py-2 text-sm font-medium transition-colors hover:bg-primary hover:text-white">ONVIF and RTSP Explained</Link>
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
