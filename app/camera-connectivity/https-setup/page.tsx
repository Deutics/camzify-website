import { generatePageMeta } from '@/lib/page-utils';
import { PageShell } from '@/components/layout/page-shell';
import { FAQAccordion } from '@/components/content/faq-accordion';
import { ScrollReveal } from '@/components/motion/scroll-reveal';
import Link from 'next/link';

/**
 * Page identity. Declared once and consumed twice: by `generatePageMeta` for the
 * <head> tags, and by `PageShell` for the on-page structured data. Keeping it in one
 * const is what stops the meta description and the schema drifting apart.
 */
const pageMeta = {
  title: "HTTPS Camera Setup | Connect HLS and WebRTC Streams",
  description: "HTTPS is one of Camzify's three camera connection types. It covers both HLS (.m3u8) and WebRTC (WHEP/WHIP) streams — how to choose between them and connect either.",
  path: "/camera-connectivity/https-setup",
};

export const metadata = generatePageMeta({ ...pageMeta });

const faqs = [
  {
    question: 'How many ways can cameras connect to Camzify?',
    answer: 'Three. A camera is added over RTSP, RTMP, or HTTPS. RTSP covers most IP cameras and NVRs, RTMP covers encoders and appliances that push a stream out, and HTTPS covers streams delivered over the web — both HLS and WebRTC are added under it.',
  },
  {
    question: 'Why are HLS and WebRTC grouped under HTTPS?',
    answer: 'Because both are delivered over HTTPS rather than as a dedicated video transport. An HLS playlist is fetched over HTTPS, and a WebRTC session is negotiated over HTTPS using WHEP or WHIP before media flows. Grouping them reflects how the stream reaches Camzify, so there is one connection type to choose rather than two that behave the same way at the point of setup.',
  },
  {
    question: 'Should I use HLS or WebRTC?',
    answer: 'Choose on latency. WebRTC delivers sub-second latency and suits live viewing and real-time alerting. HLS typically runs several seconds behind but is more widely supported by cameras, NVRs and media servers. Both are adequate for scheduled patrol rounds, where a few seconds of delay changes nothing about whether a gate was closed.',
  },
  {
    question: 'Do I need the Camzify Connector for an HTTPS stream?',
    answer: 'Only if the stream is not reachable from the internet. An HLS or WebRTC endpoint that a browser can already reach needs nothing extra. A camera or NVR that only serves its stream inside a private network needs the Camzify Connector to relay it, which avoids port forwarding and never exposes the camera directly.',
  },
];

const steps = [
  {
    title: 'Get the stream URL from the camera, NVR or media server',
    body: 'An HLS stream is a playlist URL ending in .m3u8. A WebRTC stream is a WHEP or WHIP endpoint URL. Either comes from the device serving the stream, not from Camzify — check its streaming, publishing or integration settings.',
  },
  {
    title: 'Add the camera under the HTTPS connection type',
    body: 'In Camera Management, choose Add Camera, select HTTPS, and paste the URL. HLS and WebRTC are both added here; there is no separate option to pick between them.',
  },
  {
    title: 'Confirm the picture is good enough for detection',
    body: 'Check the live preview before going further. If a person reviewing the feed can identify a person or vehicle at the distance that matters, the detection models have enough to work with. Framing and lighting matter more than resolution.',
  },
  {
    title: 'Configure detections and add the camera to a patrol',
    body: 'Set up zones, lines and the AI features you want on the feed, then add the camera to a patrol sequence so it is included in scheduled rounds.',
  },
];

export default function HttpsSetupPage() {
  return (
    <PageShell {...pageMeta} faqs={faqs} breadcrumbs={[
      { label: 'Camera Connectivity', href: '/camera-connectivity' },
      { label: 'HTTPS Camera Setup' },
    ]}>
      <section className="pb-16">
        <div className="mx-auto max-w-site px-6">
          <h1 className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl">HTTPS Camera Setup</h1>
          <p className="mt-6 max-w-prose text-body text-muted-foreground">
            <strong className="font-semibold text-foreground">
              HTTPS is one of Camzify&rsquo;s three camera connection types, alongside{' '}
              <Link href="/camera-connectivity/rtsp-setup" className="text-primary hover:underline">RTSP</Link> and{' '}
              <Link href="/camera-connectivity/rtmp-setup" className="text-primary hover:underline">RTMP</Link>.
            </strong>{' '}
            It covers both stream formats a device can deliver over the web:{' '}
            <Link href="/camera-connectivity/hls-setup" className="text-primary hover:underline">HLS</Link> and{' '}
            <Link href="/camera-connectivity/webrtc-setup" className="text-primary hover:underline">WebRTC</Link>.
            You pick HTTPS once and paste the stream URL; there is no separate choice to make between
            the two at setup.
          </p>

          <div className="mt-14">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">Which of the two you are using</h2>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="rounded-xl border border-border bg-card p-6">
                  <h3 className="font-display text-lg font-bold">HLS</h3>
                  <p className="mt-1 font-mono text-mono-sm uppercase text-muted-foreground">.m3u8 playlist</p>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    Widely supported by cameras, NVRs and media servers, and the easier of the two to
                    obtain. It runs several seconds behind live, which is immaterial for scheduled
                    patrol rounds and noticeable when watching a feed in real time.
                  </p>
                  <Link href="/camera-connectivity/hls-setup" className="mt-4 inline-block text-sm font-semibold text-primary hover:underline">
                    HLS setup guide &rarr;
                  </Link>
                </div>
                <div className="rounded-xl border border-border bg-card p-6">
                  <h3 className="font-display text-lg font-bold">WebRTC</h3>
                  <p className="mt-1 font-mono text-mono-sm uppercase text-muted-foreground">WHEP / WHIP endpoint</p>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    Sub-second latency, which is what you want for live viewing and for alerts someone
                    is expected to act on immediately. Fewer devices expose a WHEP or WHIP endpoint
                    without a media server in front of them.
                  </p>
                  <Link href="/camera-connectivity/webrtc-setup" className="mt-4 inline-block text-sm font-semibold text-primary hover:underline">
                    WebRTC setup guide &rarr;
                  </Link>
                </div>
              </div>
            </ScrollReveal>
          </div>

          <div className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">Connecting an HTTPS stream</h2>
              <ol className="mt-8 max-w-prose space-y-9">
                {steps.map((step, i) => (
                  <li key={step.title} className="flex gap-5">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-foreground">
                      {i + 1}
                    </span>
                    <div>
                      <h3 className="font-display text-xl font-bold">{step.title}</h3>
                      <p className="mt-2 text-muted-foreground">{step.body}</p>
                    </div>
                  </li>
                ))}
              </ol>
              <p className="mt-8 max-w-prose text-muted-foreground">
                If the stream only exists inside a private network, connect it through the{' '}
                <Link href="/camzify-connector" className="text-primary hover:underline">Camzify Connector</Link>{' '}
                instead of opening a port. For background on how these protocols differ, see{' '}
                <Link href="/guides/onvif-and-rtsp-explained" className="text-primary hover:underline">ONVIF and RTSP explained</Link>,
                or return to the{' '}
                <Link href="/camera-connectivity" className="text-primary hover:underline">camera connectivity guides</Link>.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>
      <section className="pb-16">
        <div className="mx-auto max-w-site px-6">
          <div className="rounded-2xl border border-border bg-card p-8 sm:p-10">
            <span className="font-mono text-mono-sm uppercase text-primary">FAQ</span>
            <h2 className="mt-2 font-display text-2xl font-bold">Frequently asked questions</h2>
            <div className="mt-6">
              <FAQAccordion items={faqs} />
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
