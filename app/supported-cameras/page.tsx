import { generatePageMeta } from '@/lib/page-utils';
import { PageShell } from '@/components/layout/page-shell';
import { ScrollReveal } from '@/components/motion/scroll-reveal';
import Link from 'next/link';
import { BrandStrip } from '@/components/content/brand-strip';
import { cameraBrands } from '@/lib/camera-brands';

/**
 * Page identity. Declared once and consumed twice: by `generatePageMeta` for the
 * <head> tags, and by `PageShell` for the on-page structured data. Keeping it in one
 * const is what stops the meta description and the schema drifting apart.
 */
const pageMeta = {
  title: "Supported Cameras | ONVIF Compatible IP Camera Brands",
  description: "Camzify works with any ONVIF or RTSP-compatible IP camera — Axis, Hikvision, Dahua, Hanwha, Bosch and more. What ONVIF means, and how to check your own cameras.",
  path: "/supported-cameras",
};

export const metadata = generatePageMeta({ ...pageMeta });


export default function SupportedCamerasPage() {
  return (
    <PageShell {...pageMeta} breadcrumbs={[{ label: 'Supported Cameras' }]}>
      <section className="pb-16">
        <div className="mx-auto max-w-site px-6">
          <h1 className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl">Cameras We Support</h1>
          <p className="mt-6 max-w-prose text-body text-muted-foreground">
            Camzify connects to any IP camera that supports ONVIF, RTSP, RTMP, HLS or WebRTC — which covers effectively every IP camera made in the last decade, whoever made it. Compatibility is decided by the protocol rather than the brand, so if your camera exposes an RTSP stream it will work with Camzify and the <Link href="/virtual-patrolling" className="text-primary hover:underline">virtual patrolling</Link> system.
          </p>
          <p className="mt-4 text-muted-foreground">
            New to camera protocols? Read <Link href="/guides/onvif-and-rtsp-explained" className="text-primary hover:underline">ONVIF and RTSP explained</Link> for a plain-language guide.
          </p>

          <div className="mt-14">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">What ONVIF means for compatibility</h2>
              <div className="mt-4 max-w-prose space-y-4 text-muted-foreground">
                <p>
                  <strong className="font-semibold text-foreground">
                    ONVIF is an open standard that lets IP cameras, recorders and software from
                    different manufacturers work together.
                  </strong>{' '}
                  A camera that conforms to ONVIF Profile S exposes its video stream and basic
                  controls in a documented way, so any conformant system can consume it without a
                  manufacturer-specific integration.
                </p>
                <p>
                  This is why compatibility is a property of the protocol rather than the badge on
                  the housing. Camzify does not maintain per-model drivers; it speaks ONVIF and
                  RTSP, so a camera supporting either works — including models released after this
                  page was written, and brands not listed below.
                </p>
                <p>
                  Practically, nearly every IP camera manufactured in the last decade qualifies.
                  The exceptions are consumer devices locked to a vendor cloud app, which
                  sometimes expose no local stream at all. If the camera has an RTSP URL in its
                  admin panel, it works.
                </p>
              </div>
            </ScrollReveal>
          </div>

          <div className="mt-14">
            <ScrollReveal>
              <div className="flex flex-wrap items-end justify-between gap-4">
                <h2 className="font-display text-2xl font-bold">Manufacturers commonly deployed</h2>
                <span className="font-mono text-mono-sm uppercase text-muted-foreground">
                  {cameraBrands.length} listed &middot; not exhaustive
                </span>
              </div>
              <p className="mt-4 max-w-prose text-muted-foreground">
                These come up most often in deployments. The list is a recognition aid for buyers
                who search by brand — it is not a compatibility matrix, and a manufacturer&rsquo;s
                absence from it says nothing about whether its cameras work.
              </p>
              <BrandStrip className="mt-8" showNotes />
            </ScrollReveal>
          </div>

          <div className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">Connectivity options</h2>
              <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <Link href="/camera-connectivity/rtsp-setup" className="rounded-lg bg-card p-5 shadow transition-shadow hover:shadow-md"><span className="font-display font-bold">RTSP</span><p className="mt-1 text-sm text-muted-foreground">Most common. Direct stream from camera.</p></Link>
                <Link href="/camera-connectivity/rtmp-setup" className="rounded-lg bg-card p-5 shadow transition-shadow hover:shadow-md"><span className="font-display font-bold">RTMP</span><p className="mt-1 text-sm text-muted-foreground">Encoder-based push streaming.</p></Link>
                <Link href="/camera-connectivity/hls-setup" className="rounded-lg bg-card p-5 shadow transition-shadow hover:shadow-md"><span className="font-display font-bold">HLS</span><p className="mt-1 text-sm text-muted-foreground">HTTP-based .m3u8 streams.</p></Link>
                <Link href="/camera-connectivity/webrtc-setup" className="rounded-lg bg-card p-5 shadow transition-shadow hover:shadow-md"><span className="font-display font-bold">WebRTC</span><p className="mt-1 text-sm text-muted-foreground">Lowest latency via WHEP/WHIP.</p></Link>
              </div>
            </ScrollReveal>
          </div>

          <div className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">How to check your own cameras</h2>
              <p className="mt-4 max-w-prose text-muted-foreground">
                We do not publish a model-by-model compatibility list, and you should be sceptical
                of vendors who do — those lists go stale the moment a manufacturer ships new
                firmware, and they imply that unlisted models are unsupported when in practice
                compatibility is decided by the protocol, not the badge on the housing.
              </p>
              <p className="mt-4 max-w-prose text-muted-foreground">
                Camzify works with any camera that can produce a standards-compliant stream. Three
                checks tell you where yours stands:
              </p>
              <ol className="mt-6 grid gap-5 sm:grid-cols-3">
                {[
                  {
                    q: 'Does it speak ONVIF or RTSP?',
                    a: 'Nearly every IP camera made in the last decade does. Check the admin panel under Network, Streaming or Integration. If you can find an RTSP URL, the camera works.',
                  },
                  {
                    q: 'Can Camzify reach the stream?',
                    a: 'On a local network with no public route, the Camzify Connector relays the stream to the cloud — no port forwarding, and the camera is never exposed to the internet.',
                  },
                  {
                    q: 'Is the picture good enough?',
                    a: 'If a person reviewing the feed can identify a person or vehicle at the distance you care about, the detection models have enough to work with. Resolution matters less than framing and lighting.',
                  },
                ].map((item) => (
                  <li key={item.q} className="rounded-xl border border-border bg-card p-6">
                    <h3 className="font-display text-base font-bold">{item.q}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.a}</p>
                  </li>
                ))}
              </ol>
              <p className="mt-6 max-w-prose text-muted-foreground">
                Unsure about a specific fleet? Send us the make, model and firmware version through{' '}
                <Link href="/contact" className="text-primary hover:underline">contact</Link> and we
                will confirm before you commit to anything. Protocol-level setup steps are covered
                in the{' '}
                <Link href="/camera-connectivity" className="text-primary hover:underline">camera connectivity guides</Link>.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
