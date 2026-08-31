import { generatePageMeta } from '@/lib/page-utils';
import { PageShell } from '@/components/layout/page-shell';
import { ScrollReveal } from '@/components/motion/scroll-reveal';

/**
 * Page identity. Declared once and consumed twice: by `generatePageMeta` for the
 * <head> tags, and by `PageShell` for the on-page structured data. Keeping it in one
 * const is what stops the meta description and the schema drifting apart.
 */
const pageMeta = {
  title: "HLS Camera Setup | Connect HLS Stream to Camzify",
  description: "How to connect HLS (.m3u8) streams to Camzify for AI video analytics and virtual patrolling.",
  path: "/camera-connectivity/hls-setup",
};

export const metadata = generatePageMeta({ ...pageMeta });

export default function HlsSetupPage() {
  return (
    <PageShell {...pageMeta} breadcrumbs={[
      { label: 'Camera Connectivity', href: '/camera-connectivity' },
      { label: 'HLS Camera Setup' },
    ]}>
      <section className="pb-16">
        <div className="mx-auto max-w-site px-6">
          <h1 className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl">HLS Camera Setup</h1>
          <p className="mt-6 max-w-2xl text-body text-muted-foreground">
            Follow these steps to connect your camera to Camzify using HLS.
          </p>
          <ol className="mt-12 space-y-10 max-w-prose">
            <ScrollReveal key={0} delay={0 * 0.1}>
              <li className="flex gap-5">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-lg font-bold text-white">1</span>
                <div>
                  <h2 className="font-display text-xl font-bold">Locate your HLS stream URL</h2>
                  <div className="mt-2 text-muted-foreground" dangerouslySetInnerHTML={{ __html: `HLS streams use .m3u8 playlist files served over HTTP. Your camera, NVR, or media server should provide the HLS URL. Format: https://[server]/[path]/stream.m3u8` }} />
                </div>
              </li>
            </ScrollReveal>
            <ScrollReveal key={1} delay={1 * 0.1}>
              <li className="flex gap-5">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-lg font-bold text-white">2</span>
                <div>
                  <h2 className="font-display text-xl font-bold">Add the camera in Camzify</h2>
                  <div className="mt-2 text-muted-foreground" dangerouslySetInnerHTML={{ __html: `In Camera Management → Add Camera → HLS, paste the .m3u8 URL. Camzify will connect to the stream and display the live preview.` }} />
                </div>
              </li>
            </ScrollReveal>
            <ScrollReveal key={2} delay={2 * 0.1}>
              <li className="flex gap-5">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-lg font-bold text-white">3</span>
                <div>
                  <h2 className="font-display text-xl font-bold">Verify stream quality</h2>
                  <div className="mt-2 text-muted-foreground" dangerouslySetInnerHTML={{ __html: `HLS streams may have higher latency (5-30 seconds) compared to RTSP or WebRTC. Verify that the stream quality is sufficient for AI detection. Minimum recommended resolution: 720p.` }} />
                </div>
              </li>
            </ScrollReveal>
            <ScrollReveal key={3} delay={3 * 0.1}>
              <li className="flex gap-5">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-lg font-bold text-white">4</span>
                <div>
                  <h2 className="font-display text-xl font-bold">Configure detection and patrols</h2>
                  <div className="mt-2 text-muted-foreground" dangerouslySetInnerHTML={{ __html: `Configure zones, lines, and other AI detections on the HLS feed. Add the camera to your <a href="/virtual-patrolling">virtual patrol</a> sequences. Note: HLS latency is acceptable for <a href="/virtual-patrolling">patrol rounds</a> but may not be suitable for real-time alerting use cases.` }} />
                </div>
              </li>
            </ScrollReveal>
          </ol>
        </div>
      </section>
    </PageShell>
  );
}
