import { generatePageMeta } from '@/lib/page-utils';
import { PageShell } from '@/components/layout/page-shell';
import { ScrollReveal } from '@/components/motion/scroll-reveal';

/**
 * Page identity. Declared once and consumed twice: by `generatePageMeta` for the
 * <head> tags, and by `PageShell` for the on-page structured data. Keeping it in one
 * const is what stops the meta description and the schema drifting apart.
 */
const pageMeta = {
  title: "RTSP Camera Setup | Connect RTSP Camera to Cloud",
  description: "Connect an RTSP camera to Camzify two ways: directly if the stream is reachable online, or through the Camzify Connector for cameras on a local network.",
  path: "/camera-connectivity/rtsp-setup",
};

export const metadata = generatePageMeta({ ...pageMeta });

const faqs = [
  {
    question: 'Does my RTSP camera need a static IP or port forwarding?',
    answer: 'No. There are two routes and only one of them involves exposing anything. If the RTSP stream is already reachable over the internet — a static IP, an existing forwarded port, a camera behind an NVR that publishes it — connect that URL directly. If the camera only exists on the local network, install the Camzify Connector on a PC on that network instead. The Connector makes an outbound connection to Camzify, so nothing needs to be opened up and the camera is never exposed to the internet.',
  },
  {
    question: 'What is the Camzify Connector and where does it run?',
    answer: 'It is a lightweight application for Windows, macOS or Linux, installed on a machine that can reach both the local cameras and the internet at the same time. You give it the RTSP URLs of the cameras on that network, and it relays their streams to Camzify, where they appear alongside any directly connected cameras.',
  },
  {
    question: 'Is a directly connected RTSP camera treated differently from a relayed one?',
    answer: 'No. Once connected, both behave identically in Camzify — the same live view, AI detections, patrol sequences and reports. PTZ control on a local camera is carried by the Connector along with the video. The route only decides how the stream reaches the platform.',
  },
];

export default function RtspSetupPage() {
  return (
    <PageShell {...pageMeta} faqs={faqs} breadcrumbs={[
      { label: 'Camera Connectivity', href: '/camera-connectivity' },
      { label: 'RTSP Camera Setup' },
    ]}>
      <section className="pb-16">
        <div className="mx-auto max-w-site px-6">
          <h1 className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl">RTSP Camera Setup</h1>
          <p className="mt-6 max-w-prose text-body text-muted-foreground">
            <strong className="font-semibold text-foreground">
              An RTSP camera connects to Camzify in one of two ways, depending on whether its
              stream is reachable from the internet.
            </strong>{' '}
            Both end up in the same place; the difference is only how the stream gets there.
          </p>

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-border bg-card p-6">
              <span className="font-mono text-mono-sm uppercase text-primary">Route 1</span>
              <h2 className="mt-2 font-display text-lg font-bold">Connect the stream directly</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                If the RTSP stream is already published to the internet &mdash; a static IP, an
                existing forwarded route, or an NVR that exposes it &mdash; paste the URL into
                Camzify and you are done. Nothing is installed.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-6">
              <span className="font-mono text-mono-sm uppercase text-primary">Route 2</span>
              <h2 className="mt-2 font-display text-lg font-bold">Relay local cameras with the Connector</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                If the cameras only exist on the local network, install the{' '}
                <a href="/camzify-connector" className="text-primary hover:underline">Camzify Connector</a>{' '}
                on a Windows, macOS or Linux machine that can reach both those cameras and the internet.
                It relays the streams out &mdash; along with PTZ control &mdash; with no port
                forwarding, no static IP, and the cameras never exposed to the internet.
              </p>
            </div>
          </div>
          <ol className="mt-12 space-y-10 max-w-prose">
            <ScrollReveal key={0} delay={0 * 0.1}>
              <li className="flex gap-5">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-lg font-bold text-white">1</span>
                <div>
                  <h2 className="font-display text-xl font-bold">Find your camera's RTSP URL</h2>
                  <div className="mt-2 text-muted-foreground" dangerouslySetInnerHTML={{ __html: `Check your camera's documentation or admin panel for the RTSP stream URL. The format is typically rtsp://[camera-ip]:[port]/[stream-path]. Common ports are 554 (default) and 8554.` }} />
                </div>
              </li>
            </ScrollReveal>
            <ScrollReveal key={1} delay={1 * 0.1}>
              <li className="flex gap-5">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-lg font-bold text-white">2</span>
                <div>
                  <h2 className="font-display text-xl font-bold">Decide which route the stream takes</h2>
                  <div className="mt-2 text-muted-foreground" dangerouslySetInnerHTML={{ __html: `Test the URL from a machine outside the camera's network. If it plays, the stream is internet-reachable and you can skip straight to adding it. If it does not, install the <a href="/camzify-connector">Camzify Connector</a> on a Windows, macOS or Linux machine that sits on the camera network and has internet access, and enter the RTSP URL there instead.` }} />
                </div>
              </li>
            </ScrollReveal>
            <ScrollReveal key={2} delay={2 * 0.1}>
              <li className="flex gap-5">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-lg font-bold text-white">3</span>
                <div>
                  <h2 className="font-display text-xl font-bold">Add the camera in Camzify</h2>
                  <div className="mt-2 text-muted-foreground" dangerouslySetInnerHTML={{ __html: `In the Camzify dashboard, go to Camera Management → Add Camera. Enter the RTSP URL directly, or select a stream the Connector is already relaying. Most cameras require a username and password on the stream; there are optional fields for them, and you only need them if the camera asks for credentials. Either way the platform verifies connectivity and displays the live preview.` }} />
                </div>
              </li>
            </ScrollReveal>
            <ScrollReveal key={3} delay={3 * 0.1}>
              <li className="flex gap-5">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-lg font-bold text-white">4</span>
                <div>
                  <h2 className="font-display text-xl font-bold">Configure detection and patrols</h2>
                  <div className="mt-2 text-muted-foreground" dangerouslySetInnerHTML={{ __html: `Once connected, configure AI detections (zones, lines, motion) and add the camera to a <a href="/virtual-patrolling/patrol-sequences">patrol sequence</a>. The camera is now part of your automated <a href="/virtual-patrolling">virtual patrolling</a> system.` }} />
                </div>
              </li>
            </ScrollReveal>
          </ol>
        </div>
      </section>
    </PageShell>
  );
}
