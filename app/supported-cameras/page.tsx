import { generatePageMeta } from '@/lib/page-utils';
import { PageShell } from '@/components/layout/page-shell';
import { ScrollReveal } from '@/components/motion/scroll-reveal';
import Link from 'next/link';

/**
 * Page identity. Declared once and consumed twice: by `generatePageMeta` for the
 * <head> tags, and by `PageShell` for the on-page structured data. Keeping it in one
 * const is what stops the meta description and the schema drifting apart.
 */
const pageMeta = {
  title: "Supported Cameras | ONVIF Compatible Cameras",
  description: "Camzify works with any ONVIF or RTSP-compatible IP camera. Browse supported camera brands and models, or check compatibility.",
  path: "/supported-cameras",
};

export const metadata = generatePageMeta({ ...pageMeta });

const brands = ['Axis', 'Dahua', 'Hanwha (Wisenet)', 'Hikvision', 'Uniview', 'Vivotek', 'Bosch', 'Honeywell', 'Pelco', 'Reolink', 'TP-Link (VIGI)', 'Ubiquiti'];

export default function SupportedCamerasPage() {
  return (
    <PageShell {...pageMeta} breadcrumbs={[{ label: 'Supported Cameras' }]}>
      <section className="pb-16">
        <div className="mx-auto max-w-site px-6">
          <h1 className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl">Cameras We Support</h1>
          <p className="mt-6 max-w-prose text-body text-muted-foreground">
            Camzify connects to any IP camera that supports ONVIF, RTSP, RTMP, HLS, or WebRTC. Most IP cameras manufactured after 2010 are compatible. The list below represents verified brands — if your camera streams via RTSP, it will likely work with Camzify and the <Link href="/virtual-patrolling" className="text-primary hover:underline">virtual patrolling</Link> system.
          </p>
          <p className="mt-4 text-muted-foreground">
            New to camera protocols? Read <Link href="/guides/onvif-and-rtsp-explained" className="text-primary hover:underline">ONVIF and RTSP explained</Link> for a plain-language guide.
          </p>

          <div className="mt-14">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">Verified brands</h2>
              <div className="mt-6 grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {brands.map(b => (
                  <div key={b} className="rounded-lg bg-card p-4 text-center font-display font-bold shadow">{b}</div>
                ))}
              </div>
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
