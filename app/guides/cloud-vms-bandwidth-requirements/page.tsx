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
 * This guide deliberately carries no bandwidth, bitrate or storage figure. The reader's
 * cameras and connection hold the real numbers; the page teaches the method of reading
 * and comparing them, which is the only answer that is true for every site.
 */
const pageMeta = {
  title: "Cloud VMS Bandwidth | What Cameras Need",
  description: "How to work out whether your internet connection can carry your cameras to a cloud VMS: upload speed, stream bitrate, and what to do when it is short.",
  path: "/guides/cloud-vms-bandwidth-requirements",
};

const publishedTime = '2026-09-16';
const modifiedTime = '2026-09-16';

export const metadata = generatePageMeta({ ...pageMeta, type: 'article', publishedTime, modifiedTime });

const faqs = [
  {
    question: 'How much bandwidth do security cameras use?',
    answer: 'As much as their stream bitrate, which is a setting on the camera rather than a property of the camera type. Read it from the encoding page of each camera for the stream you plan to send, add the figures across every camera, and that sum is what the connection must carry upstream. A camera on variable bitrate shows a ceiling, so plan on the ceiling.',
  },
  {
    question: 'Does a cloud VMS use upload or download bandwidth?',
    answer: 'Upload, almost entirely. Cameras send video to the cloud, and nothing of any size comes back to the site except the console pages and the clips you choose to view. Most business connections have far less upload capacity than download, so the upload figure is the one to check against the cameras.',
  },
  {
    question: 'Does the Camzify Connector reduce bandwidth?',
    answer: 'No. It relays the streams of cameras on a private network to the cloud without port forwarding, and each relayed stream leaves the site at the bitrate the camera produces it. To reduce bandwidth, give the Connector the sub stream address instead of the main stream, or change the resolution, frame rate or bitrate setting on the camera itself.',
  },
  {
    question: 'Can some cameras stay on the NVR while others go to the cloud?',
    answer: 'Yes. Camzify licenses a stream instance per camera, so you decide which cameras stream to the cloud and which stay on the recorder. The cameras left on the recorder are not affected, and a recorder that publishes an RTSP stream for a camera can itself be the source the cloud connects to.',
  },
  {
    question: 'What happens to a camera when the connection cannot keep up?',
    answer: 'A camera the cloud cannot reach is shown as offline in the console, and recording of the other cameras continues. A cloud VMS records what reaches it, which is why the test that matters is run at the busiest hour of the working day rather than on a quiet evening. If a camera drops at peak, reduce its stream or record it on a schedule before adding more.',
  },
  {
    question: 'Does the storage estimate in the console tell me my bandwidth?',
    answer: 'It is derived from the same number. The storage figures shown during configuration are estimates from stream bitrate, recording hours and retention days, and actual consumption varies with scene activity. A storage estimate far larger than you expected means the stream bitrate is larger than you expected, which is the bandwidth question in another form.',
  },
];

const linkClass = 'text-primary hover:underline';

export default function CloudVmsBandwidthRequirementsPage() {
  return (
    <PageShell
      {...pageMeta}
      faqs={faqs}
      schema={[
        articleSchema({ headline: 'Cloud VMS bandwidth requirements: what your cameras will send', description: pageMeta.description, path: pageMeta.path, datePublished: publishedTime, dateModified: modifiedTime }),
        personSchema(),
      ]}
      breadcrumbs={[
        { label: 'Guides', href: '/guides' },
        { label: 'Cloud VMS Bandwidth Requirements' },
      ]}
    >
      <article className="pb-16">
        <div className="mx-auto max-w-site px-6">
          <h1 className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl">Cloud VMS bandwidth requirements: what your cameras will send</h1>
          <AuthorByline className="mt-6" />
          <div className="mt-10 max-w-3xl">
            <PhotoFigure src="/guide-cloud-vms-bandwidth-requirements.webp" alt="Illustration for this guide: the Camzify console and the cameras it runs on" priority />
          </div>
          <p className="mt-6 max-w-prose text-body text-muted-foreground">
            <strong className="font-semibold text-foreground">
              Cloud VMS bandwidth requirements come down to one comparison: the upstream capacity of your site&apos;s internet connection against the combined bitrate of every camera stream you send to the cloud.
            </strong>{' '}
            In <Link href="/cloud-video-surveillance" className={linkClass}>cloud video surveillance</Link>, the cameras stream to a <Link href="/platform" className={linkClass}>cloud VMS</Link> instead of a recorder on site, so video that used to stay on the local network now leaves the building over your internet connection for as long as those cameras record. This guide shows how to work out what your cameras will send, how to measure what the connection can carry, and what to change when the two do not fit.
          </p>
          <p className="mt-4 max-w-prose text-body text-muted-foreground">
            It gives no figures, and that is deliberate. The numbers belong to your cameras and your connection, and both can be read directly.
          </p>

          <section className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">Why does upload speed matter more than download?</h2>
              <div className="mt-4 max-w-prose space-y-4 text-muted-foreground">
                <p>
                  Cameras send video; they do not receive it. A cloud VMS therefore uses the upload half of your internet connection almost exclusively, and that is the half most business connections ration. A symmetrical fiber line gives the same speed in both directions, but cable, DSL and most wireless services are asymmetrical: the download figure on the contract is the headline and the upload figure is a fraction of it. When a site&apos;s cameras stall or drop frames in the cloud, the advertised download speed is almost never the reason.
                </p>
                <p>
                  That upload capacity is also shared. Email, cloud backups, video calls, point-of-sale terminals and every phone on the guest Wi-Fi draw from the same upstream pool as the cameras. The question is not whether the connection can carry the cameras on a quiet night but whether it can carry them at the busiest hour of the working day with everything else running.
                </p>
              </div>
            </ScrollReveal>
          </section>

          <section className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">How do I work out what my cameras will send?</h2>
              <div className="mt-4 max-w-prose space-y-4 text-muted-foreground">
                <p>
                  Add up the bitrate of every stream you intend to send to the cloud. That sum is the upstream bandwidth the cameras need, and every figure in it is a setting you can read from the camera&apos;s own interface. Open the camera&apos;s admin page, find the video or encoding settings, and note the bitrate for the stream you plan to use. If the camera is set to variable bitrate, the figure shown is a ceiling and the real rate rises and falls with scene activity, so plan on the ceiling.
                </p>
                <p>
                  Four settings decide that bitrate, and all four live on the camera. Resolution sets how many pixels each frame holds. Frame rate sets how many frames are sent each second. The codec decides how efficiently those frames are compressed, and the bitrate setting itself caps or fixes the result, which is why two cameras of the same model can send very different amounts.
                </p>
                <p>
                  Most IP cameras expose two streams. The main stream is the full-resolution feed, and the sub stream is a smaller version of the same view at lower resolution and often a lower frame rate, on its own RTSP address. Camzify connects to whichever RTSP URL you give it, so which of the two reaches the cloud is your choice, made per camera. The <Link href="/guides/onvif-and-rtsp-explained" className={linkClass}>ONVIF and RTSP guide</Link> explains where those addresses come from, and the <Link href="/camera-connectivity/rtsp-setup" className={linkClass}>RTSP setup guide</Link> shows how a camera is added.
                </p>
                <p>
                  Once a camera is connected, Camzify detects the stream quality automatically, and the storage figures shown while you configure recording are estimates derived from the stream bitrate, the recording hours and the retention days you set. Actual consumption varies with scene activity. Those estimates are a useful cross-check: if the storage figure is far larger than you expected, the bitrate feeding it is larger than you expected too.
                </p>
              </div>
            </ScrollReveal>
          </section>

          <section className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">Does continuous recording use more bandwidth than scheduled recording?</h2>
              <div className="mt-4 max-w-prose space-y-4 text-muted-foreground">
                <p>
                  Yes, because bandwidth is consumed whenever a stream is being sent, and continuous recording sends the stream all the time. Recording on Camzify runs continuously or on a schedule defined per camera, and a schedule can be applied to a whole site or to every camera at once, so the hours a camera streams to the cloud for recording are yours to set. A camera that records only outside business hours draws nothing from the upstream pool for recording during the working day, which is when the rest of the site needs that capacity most.
                </p>
                <p>
                  Recording is not the only thing that pulls a stream. A camera with an AI detection enabled is watched for it continuously, whatever its recording schedule says, and a camera on a patrol route is read at each stop, as is any camera someone opens in the live wall. Treat the recording schedule as the floor of a camera&apos;s bandwidth use and its live, detection and patrol use as what sits above it. The <Link href="/platform/video-backup-and-retention" className={linkClass}>video backup and retention</Link> page sets out the recording modes and the per-camera retention that goes with them.
                </p>
              </div>
            </ScrollReveal>
          </section>

          <section className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">How does the Camzify Connector affect bandwidth?</h2>
              <div className="mt-4 max-w-prose space-y-4 text-muted-foreground">
                <p>
                  The <Link href="/camzify-connector" className={linkClass}>Camzify Connector</Link> is how cameras on a private network reach the cloud, and it changes the route, not the amount. It is a lightweight application installed on a Windows, macOS or Linux machine that can see the cameras on the local network and reach the internet at the same time. You enter the cameras&apos; RTSP URLs into it; it makes an outbound connection to Camzify over HTTPS, the same direction as ordinary web traffic, and relays the streams along with pan, tilt and zoom control for cameras that support it. No port is forwarded, no static IP is needed, and the cameras are never exposed to the internet.
                </p>
                <p>
                  For bandwidth planning, two things follow. Every stream the Connector relays still leaves the site over the same upstream connection at the bitrate the camera produces it, so the sum from the previous section is unchanged. And because the Connector is where the RTSP URLs are entered, it is also where you choose main stream or sub stream for each local camera.
                </p>
                <p>
                  A camera that already publishes an RTSP stream to the internet, or sits behind a recorder that does, connects directly without the Connector. The <Link href="/camera-connectivity" className={linkClass}>camera connectivity</Link> page covers all three connection types, RTSP, RTMP and HTTPS, and which route suits which camera.
                </p>
              </div>
            </ScrollReveal>
          </section>

          <section className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">What should I do when bandwidth is short?</h2>
              <div className="mt-4 max-w-prose space-y-4 text-muted-foreground">
                <p>
                  Reduce what the cameras send, reduce when they send it, or leave some of them out of the cloud. Those are the only three levers, and they can be combined per camera, so a site rarely has to choose between every camera in the cloud and none. In order of cost to you:
                </p>
              </div>
              <PointList
                items={[
                  <><strong className="font-semibold text-foreground">Switch to the sub stream.</strong> Give Camzify the sub stream&apos;s RTSP address instead of the main stream&apos;s. It is usually the largest single saving available and needs no change on the camera itself.</>,
                  <><strong className="font-semibold text-foreground">Lower the frame rate or the bitrate cap on the camera.</strong> Both are settings in the camera&apos;s interface and both reduce the stream directly. Check the live view and any detections you rely on afterward before treating the new setting as final.</>,
                  <><strong className="font-semibold text-foreground">Record on a schedule.</strong> Set the cameras that only matter after hours to record after hours, and keep continuous recording for the few that need it.</>,
                  <><strong className="font-semibold text-foreground">Put fewer cameras in the cloud.</strong> Camzify licenses a stream instance per camera, so the gate, the cash office and the loading bay can be cloud cameras while the stockroom stays on the local recorder.</>,
                  <><strong className="font-semibold text-foreground">Keep the NVR for that site.</strong> A site whose upstream connection cannot carry its cameras, even after the steps above, should keep its recorder. The cloud model is the wrong answer there, and pretending otherwise produces a site with missing footage and a bill for it.</>,
                ]}
              />
              <div className="mt-4 max-w-prose space-y-4 text-muted-foreground">
                <p>
                  That last point is stated on the <Link href="/cloud-video-surveillance" className={linkClass}>cloud video surveillance</Link> page and in full on <Link href="/compare/cloud-vms-vs-on-premise" className={linkClass}>cloud VMS vs on-premise</Link>, and it is why we would rather you measured first. A better connection is also an option, and its cost belongs in the comparison against the recorder it replaces.
                </p>
              </div>
            </ScrollReveal>
          </section>

          <section className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">How do I test before committing?</h2>
              <div className="mt-4 max-w-prose space-y-4 text-muted-foreground">
                <p>
                  Measure the upload speed at the site at a busy time, and compare it with the sum of the streams you intend to send. A speed test run from a machine on the camera network gives the upload figure; run it more than once across the working day, because the shared pool is what matters. If the sum of your streams sits close to that figure there is no headroom for the rest of the site, and something will give.
                </p>
                <p>
                  Then connect a small number of cameras and watch them. Add one or two through the <Link href="/camera-connectivity/rtsp-setup" className={linkClass}>RTSP setup guide</Link>, leave them recording continuously through a working week, and check the live view and playback at the busy hours. A camera that is fine on a Sunday evening and stutters on a Monday morning tells you what the speed test could not.
                </p>
                <p>
                  Widen to the rest of the site camera by camera, watching the same things each time, and stop at the number the connection carries cleanly. A <Link href="/book-a-demo" className={linkClass}>demo</Link> on your own cameras is the same test with someone alongside you.
                </p>
              </div>
            </ScrollReveal>
          </section>

          <section className="mt-20 rounded-xl bg-card p-8 shadow">
            <h2 className="font-display text-xl font-bold">Related guides</h2>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link href="/guides/what-is-a-cloud-vms" className="rounded-full bg-muted px-4 py-2 text-sm font-medium transition-colors hover:bg-primary hover:text-white">What Is a Cloud VMS</Link>
              <Link href="/guides/what-is-a-cloud-nvr" className="rounded-full bg-muted px-4 py-2 text-sm font-medium transition-colors hover:bg-primary hover:text-white">What Is a Cloud NVR</Link>
              <Link href="/guides/hybrid-cloud-video-surveillance" className="rounded-full bg-muted px-4 py-2 text-sm font-medium transition-colors hover:bg-primary hover:text-white">Hybrid Cloud Video Surveillance</Link>
              <Link href="/guides/using-existing-cameras-with-a-cloud-vms" className="rounded-full bg-muted px-4 py-2 text-sm font-medium transition-colors hover:bg-primary hover:text-white">Using Existing Cameras with a Cloud VMS</Link>
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
