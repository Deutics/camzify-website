import { generatePageMeta } from '@/lib/page-utils';
import { PageShell } from '@/components/layout/page-shell';
import { articleSchema, personSchema } from '@/lib/seo';
import { AuthorByline } from '@/components/content/author-byline';
import { ScrollReveal } from '@/components/motion/scroll-reveal';
import Link from 'next/link';

/**
 * Page identity. Declared once and consumed twice: by `generatePageMeta` for the
 * <head> tags, and by `PageShell` for the on-page structured data. Keeping it in one
 * const is what stops the meta description and the schema drifting apart.
 */
const pageMeta = {
  title: "What Is RTSP? ONVIF Protocol Explained",
  description: "Plain-language explanation of ONVIF and RTSP — the protocols that connect security cameras to cloud platforms like Camzify.",
  path: "/guides/onvif-and-rtsp-explained",
};

export const metadata = generatePageMeta({ ...pageMeta, type: 'article', publishedTime: '2026-08-31', modifiedTime: '2026-08-31' });

export default function OnvifAndRtspExplainedPage() {
  return (
    <PageShell {...pageMeta} schema={[articleSchema({ headline: "What Is RTSP? ONVIF Protocol Explained", description: "Plain-language explanation of ONVIF and RTSP — the protocols that connect security cameras to cloud platforms like Camzify.", path: "/guides/onvif-and-rtsp-explained", datePublished: '2026-08-31', dateModified: '2026-08-31' }), personSchema()]} breadcrumbs={[
      { label: 'Guides', href: '/guides' },
      { label: 'ONVIF and RTSP Explained' },
    ]}>
      <article className="pb-16">
        <div className="mx-auto max-w-site px-6">
          <h1 className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl">ONVIF and RTSP Explained</h1>
          <AuthorByline className="mt-6" />
          <p className="mt-6 max-w-prose text-body text-muted-foreground">ONVIF and RTSP are the two most important protocols for connecting IP security cameras to video management and analytics platforms. ONVIF is a standardized interface for camera discovery and configuration. RTSP (Real Time Streaming Protocol) is the protocol for streaming live video from the camera to a receiving system.</p>

          <section className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">What is ONVIF?</h2>
              <div className="mt-4 max-w-prose space-y-4 text-muted-foreground" dangerouslySetInnerHTML={{ __html: `ONVIF (Open Network Video Interface Forum) is a standardized set of protocols that allow IP cameras from different manufacturers to communicate with video management software. An ONVIF-compliant camera exposes a standard API for discovery, configuration, PTZ control, and event handling — regardless of the camera brand.` }} />
            </ScrollReveal>
          </section>

          <section className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">What is RTSP?</h2>
              <div className="mt-4 max-w-prose space-y-4 text-muted-foreground" dangerouslySetInnerHTML={{ __html: `RTSP (Real Time Streaming Protocol) is the protocol used to stream live video from an IP camera to a receiving system. The camera provides an RTSP URL (e.g., rtsp://camera-ip:554/stream1) that the receiving system connects to for the live feed. Most IP cameras support RTSP natively.` }} />
            </ScrollReveal>
          </section>

          <section className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">How Camzify uses these protocols</h2>
              <div className="mt-4 max-w-prose space-y-4 text-muted-foreground" dangerouslySetInnerHTML={{ __html: `Camzify connects to cameras via RTSP for video streaming. ONVIF support means Camzify can discover and configure compatible cameras automatically. For cameras behind NAT or firewalls, the <a href="/camzify-connector">Camzify Connector</a> relays the RTSP stream securely to the cloud. See <a href="/camera-connectivity/rtsp-setup">RTSP setup</a> for step-by-step instructions.` }} />
            </ScrollReveal>
          </section>

          <section className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">Other supported protocols</h2>
              <div className="mt-4 max-w-prose space-y-4 text-muted-foreground" dangerouslySetInnerHTML={{ __html: `Beyond RTSP, Camzify supports <a href="/camera-connectivity/rtmp-setup">RTMP</a> (for encoder-based setups), <a href="/camera-connectivity/hls-setup">HLS</a> (for HTTP-based streaming), and <a href="/camera-connectivity/webrtc-setup">WebRTC</a> (for lowest-latency connections). Most deployments use RTSP as the primary protocol with <a href="/virtual-patrolling">virtual patrolling</a> running on the ingested feeds.` }} />
            </ScrollReveal>
          </section>

          <section className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">Checking camera compatibility</h2>
              <div className="mt-4 max-w-prose space-y-4 text-muted-foreground" dangerouslySetInnerHTML={{ __html: `Most IP cameras manufactured after 2010 support ONVIF and RTSP. Check the camera's specification sheet for "ONVIF Profile S" (streaming) or "ONVIF Profile T" (advanced streaming). The <a href="/supported-cameras">supported cameras</a> page lists verified models.` }} />
            </ScrollReveal>
          </section>

          <section className="mt-20 rounded-xl bg-card p-8 shadow">
            <h2 className="font-display text-xl font-bold">Related guides</h2>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link href="/guides/how-to-choose-video-analytics-software" className="rounded-full bg-muted px-4 py-2 text-sm font-medium transition-colors hover:bg-primary hover:text-white">How To Choose Video Analytics Software</Link>
              <Link href="/guides/how-to-reduce-false-alarms" className="rounded-full bg-muted px-4 py-2 text-sm font-medium transition-colors hover:bg-primary hover:text-white">How To Reduce False Alarms</Link>
              <Link href="/guides/video-retention-requirements" className="rounded-full bg-muted px-4 py-2 text-sm font-medium transition-colors hover:bg-primary hover:text-white">Video Retention Requirements</Link>
            </div>
            <div className="mt-6 flex flex-wrap gap-4">
              <Link href="/pricing" className="rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white shadow transition-colors hover:bg-primary/90">View pricing</Link>
              <Link href="/roi-calculator" className="rounded-lg border border-border px-5 py-2.5 text-sm font-semibold transition-colors hover:bg-muted">Calculate ROI</Link>
            </div>
          </section>
        </div>
      </article>
    </PageShell>
  );
}
