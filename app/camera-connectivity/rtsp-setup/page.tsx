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
  description: "Step-by-step guide to connecting your RTSP camera to Camzify. Works with any ONVIF-compatible IP camera.",
  path: "/camera-connectivity/rtsp-setup",
};

export const metadata = generatePageMeta({ ...pageMeta });

export default function RtspSetupPage() {
  return (
    <PageShell {...pageMeta} breadcrumbs={[
      { label: 'Camera Connectivity', href: '/camera-connectivity' },
      { label: 'RTSP Camera Setup' },
    ]}>
      <section className="pb-16">
        <div className="mx-auto max-w-site px-6">
          <h1 className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl">RTSP Camera Setup</h1>
          <p className="mt-6 max-w-2xl text-body text-muted-foreground">
            Follow these steps to connect your camera to Camzify using RTSP.
          </p>
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
                  <h2 className="font-display text-xl font-bold">Install the Camzify Connector</h2>
                  <div className="mt-2 text-muted-foreground" dangerouslySetInnerHTML={{ __html: `If your camera is on a local network without direct cloud access, install the <a href="/camzify-connector">Camzify Connector</a> on a PC on the same network. The Connector relays the RTSP stream securely to the Camzify cloud without exposing the camera to the internet.` }} />
                </div>
              </li>
            </ScrollReveal>
            <ScrollReveal key={2} delay={2 * 0.1}>
              <li className="flex gap-5">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-lg font-bold text-white">3</span>
                <div>
                  <h2 className="font-display text-xl font-bold">Add the camera in Camzify</h2>
                  <div className="mt-2 text-muted-foreground" dangerouslySetInnerHTML={{ __html: `In the Camzify dashboard, go to Camera Management → Add Camera. Enter the RTSP URL (or select the Connector-relayed stream). The platform will verify connectivity and display the live preview.` }} />
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
