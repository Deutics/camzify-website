import { generatePageMeta } from '@/lib/page-utils';
import { PageShell } from '@/components/layout/page-shell';
import { ScrollReveal } from '@/components/motion/scroll-reveal';

/**
 * Page identity. Declared once and consumed twice: by `generatePageMeta` for the
 * <head> tags, and by `PageShell` for the on-page structured data. Keeping it in one
 * const is what stops the meta description and the schema drifting apart.
 */
const pageMeta = {
  title: "WebRTC Camera Setup | Low-Latency Streaming",
  description: "Connect cameras to Camzify using WebRTC (WHEP/WHIP) for the lowest possible latency. Ideal for real-time monitoring.",
  path: "/camera-connectivity/webrtc-setup",
};

export const metadata = generatePageMeta({ ...pageMeta });

export default function WebrtcSetupPage() {
  return (
    <PageShell {...pageMeta} breadcrumbs={[
      { label: 'Camera Connectivity', href: '/camera-connectivity' },
      { label: 'WebRTC Camera Setup' },
    ]}>
      <section className="pb-16">
        <div className="mx-auto max-w-site px-6">
          <h1 className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl">WebRTC Camera Setup</h1>
          <p className="mt-6 max-w-2xl text-body text-muted-foreground">
            Follow these steps to connect your camera to Camzify using WebRTC. WebRTC is one of the two stream formats handled by the <a href="/camera-connectivity/https-setup" className="text-primary hover:underline">HTTPS connection type</a>; <a href="/camera-connectivity/hls-setup" className="text-primary hover:underline">HLS</a> is the other.
          </p>
          <ol className="mt-12 space-y-10 max-w-prose">
            <ScrollReveal key={0} delay={0 * 0.1}>
              <li className="flex gap-5">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-lg font-bold text-white">1</span>
                <div>
                  <h2 className="font-display text-xl font-bold">Verify WebRTC support</h2>
                  <div className="mt-2 text-muted-foreground" dangerouslySetInnerHTML={{ __html: `WebRTC connectivity uses WHEP (WebRTC-HTTP Egress Protocol) and WHIP (WebRTC-HTTP Ingress Protocol). Check if your camera or media server supports these protocols. WebRTC provides sub-second latency — ideal for real-time monitoring.` }} />
                </div>
              </li>
            </ScrollReveal>
            <ScrollReveal key={1} delay={1 * 0.1}>
              <li className="flex gap-5">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-lg font-bold text-white">2</span>
                <div>
                  <h2 className="font-display text-xl font-bold">Configure the WebRTC endpoint</h2>
                  <div className="mt-2 text-muted-foreground" dangerouslySetInnerHTML={{ __html: `In Camera Management → Add Camera → HTTPS, enter the WHEP/WHIP endpoint URL provided by your camera or media server.` }} />
                </div>
              </li>
            </ScrollReveal>
            <ScrollReveal key={2} delay={2 * 0.1}>
              <li className="flex gap-5">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-lg font-bold text-white">3</span>
                <div>
                  <h2 className="font-display text-xl font-bold">Establish the connection</h2>
                  <div className="mt-2 text-muted-foreground" dangerouslySetInnerHTML={{ __html: `Camzify initiates the WebRTC session. The live preview should appear with minimal latency. Verify the connection is stable before configuring detections.` }} />
                </div>
              </li>
            </ScrollReveal>
            <ScrollReveal key={3} delay={3 * 0.1}>
              <li className="flex gap-5">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-lg font-bold text-white">4</span>
                <div>
                  <h2 className="font-display text-xl font-bold">Configure detection and patrols</h2>
                  <div className="mt-2 text-muted-foreground" dangerouslySetInnerHTML={{ __html: `WebRTC streams support all AI capabilities. Add the camera to your <a href="/virtual-patrolling">virtual patrol</a> sequences. The low latency makes WebRTC ideal for use cases requiring immediate alert response.` }} />
                </div>
              </li>
            </ScrollReveal>
          </ol>
        </div>
      </section>
    </PageShell>
  );
}
