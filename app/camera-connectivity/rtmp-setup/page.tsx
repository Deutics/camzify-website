import { ProductShot } from '@/components/content/product-shot';
import { generatePageMeta } from '@/lib/page-utils';
import { PageShell } from '@/components/layout/page-shell';
import { FaqSection } from '@/components/content/faq-section';
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

const faqs = [
  { question: 'When is RTMP the right choice?', answer: 'When the source is an encoder or a streaming appliance that pushes video rather than a camera that serves it. Camzify generates a private ingest address with a server URL and a stream key for it.' },
  { question: 'Is the stream key sensitive?', answer: 'Yes. Anyone with it can push video into that camera slot. Keep it out of shared documents and rotate it from the console if it leaks.' },
  { question: 'Does RTMP work through a firewall?', answer: "The encoder pushes outward on the RTMP port to Camzify's ingest address, so no inbound port needs opening on your side. Outbound access to that address is all that is required." },
  { question: 'Can I use RTMP for an ordinary IP camera?', answer: 'Only if something on site converts its RTSP stream and pushes it, which is what an encoder does. For an ordinary IP camera the RTSP route, direct or through the Connector, is simpler.' },
];

export default function RtmpSetupPage() {
  return (
    <PageShell {...pageMeta} faqs={faqs} breadcrumbs={[
      { label: 'Camera Connectivity', href: '/camera-connectivity' },
      { label: 'RTMP Camera Setup' },
    ]}>
      <section className="pb-16">
        <div className="mx-auto max-w-site px-6">
          <h1 className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl">RTMP camera setup</h1>
          <p className="mt-6 max-w-2xl text-body text-muted-foreground">
            Follow these steps to connect your camera to Camzify using RTMP.
          </p>

          <div className="mt-10 max-w-3xl">
            <ProductShot src="/product-configuration" alt="The Configuration screen in the console: adding a camera by its RTMP, RTSP or HTTPS address, with the cameras already on the site listed below" label="Configuration · Add camera" sizes="(max-width: 1024px) 100vw, 768px" />
          </div>
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
      <FaqSection items={faqs} />
    </PageShell>
  );
}
