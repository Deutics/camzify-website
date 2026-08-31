import { generatePageMeta } from '@/lib/page-utils';
import { PageShell } from '@/components/layout/page-shell';
import { ScrollReveal } from '@/components/motion/scroll-reveal';

/**
 * Page identity. Declared once and consumed twice: by `generatePageMeta` for the
 * <head> tags, and by `PageShell` for the on-page structured data. Keeping it in one
 * const is what stops the meta description and the schema drifting apart.
 */
const pageMeta = {
  title: "RTMP Camera Setup | Stream to Camzify via RTMP",
  description: "How to connect cameras or encoders to Camzify using RTMP push. Ideal for encoder-based setups and cameras with RTMP output.",
  path: "/camera-connectivity/rtmp-setup",
};

export const metadata = generatePageMeta({ ...pageMeta });

export default function RtmpSetupPage() {
  return (
    <PageShell {...pageMeta} breadcrumbs={[
      { label: 'Camera Connectivity', href: '/camera-connectivity' },
      { label: 'RTMP Camera Setup' },
    ]}>
      <section className="pb-16">
        <div className="mx-auto max-w-site px-6">
          <h1 className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl">RTMP Camera Setup</h1>
          <p className="mt-6 max-w-2xl text-body text-muted-foreground">
            Follow these steps to connect your camera to Camzify using RTMP.
          </p>
          <ol className="mt-12 space-y-10 max-w-prose">
            <ScrollReveal key={0} delay={0 * 0.1}>
              <li className="flex gap-5">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-lg font-bold text-white">1</span>
                <div>
                  <h2 className="font-display text-xl font-bold">Get your Camzify RTMP server URL and stream key</h2>
                  <div className="mt-2 text-muted-foreground" dangerouslySetInnerHTML={{ __html: `In the Camzify dashboard, go to Camera Management → Add Camera → RTMP. The platform generates a unique server URL and stream key for this camera.` }} />
                </div>
              </li>
            </ScrollReveal>
            <ScrollReveal key={1} delay={1 * 0.1}>
              <li className="flex gap-5">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-lg font-bold text-white">2</span>
                <div>
                  <h2 className="font-display text-xl font-bold">Configure your encoder or camera</h2>
                  <div className="mt-2 text-muted-foreground" dangerouslySetInnerHTML={{ __html: `Enter the Camzify RTMP server URL and stream key into your encoder's streaming settings. This works with hardware encoders, OBS, and cameras with built-in RTMP push capability.` }} />
                </div>
              </li>
            </ScrollReveal>
            <ScrollReveal key={2} delay={2 * 0.1}>
              <li className="flex gap-5">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-lg font-bold text-white">3</span>
                <div>
                  <h2 className="font-display text-xl font-bold">Start the stream</h2>
                  <div className="mt-2 text-muted-foreground" dangerouslySetInnerHTML={{ __html: `Start the stream from your encoder. Camzify will detect the incoming feed and display the live preview in the dashboard.` }} />
                </div>
              </li>
            </ScrollReveal>
            <ScrollReveal key={3} delay={3 * 0.1}>
              <li className="flex gap-5">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-lg font-bold text-white">4</span>
                <div>
                  <h2 className="font-display text-xl font-bold">Configure detection and patrols</h2>
                  <div className="mt-2 text-muted-foreground" dangerouslySetInnerHTML={{ __html: `Once streaming, configure AI detections and add the camera to your <a href="/virtual-patrolling">virtual patrol</a> sequences. RTMP streams support all the same AI capabilities as RTSP connections.` }} />
                </div>
              </li>
            </ScrollReveal>
          </ol>
        </div>
      </section>
    </PageShell>
  );
}
