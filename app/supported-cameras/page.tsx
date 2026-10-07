import { generatePageMeta } from '@/lib/page-utils';
import { PageShell } from '@/components/layout/page-shell';
import { FaqSection } from '@/components/content/faq-section';
import { ScrollReveal } from '@/components/motion/scroll-reveal';
import Link from 'next/link';
import { BrandStrip } from '@/components/content/brand-strip';
import { cameraBrands, type CameraBrand } from '@/lib/camera-brands';
import { guideFor } from '@/lib/camera-brand-guides';

/**
 * Page identity. Declared once and consumed twice: by `generatePageMeta` for the
 * <head> tags, and by `PageShell` for the on-page structured data. Keeping it in one
 * const is what stops the meta description and the schema drifting apart.
 */
const pageMeta = {
  title: "Supported Cameras | ONVIF and RTSP Brands",
  description: "Camzify works with any ONVIF, RTSP or RTMP camera, not only the brands listed: Axis, Hikvision, Dahua, Reolink, Amcrest and more, with a setup guide per brand.",
  path: "/supported-cameras",
};

export const metadata = generatePageMeta({ ...pageMeta });


const faqs = [
  { question: 'Does Camzify work with ONVIF and RTSP cameras?', answer: 'Yes. Camzify connects any IP camera that publishes an RTSP stream, which includes ONVIF-conformant cameras from every major manufacturer, and it also accepts RTMP pushes from encoders and HTTPS streams (HLS and WebRTC). No proprietary camera is required and none is sold: the cameras a site already owns are the cameras Camzify runs on.' },
  { question: 'My brand is not on the list. Will my cameras work?', answer: 'Very likely. Camzify is not limited to the brands listed: any camera that offers an RTSP stream (every ONVIF Profile S camera does), pushes RTMP, or streams over HTTPS as HLS or WebRTC can be connected. The list names the manufacturers seen most often; it is not an exclusive list.' },
  { question: 'Do cameras need to be reachable from the internet?', answer: 'No. Cameras on a local network connect through the Camzify Connector on a PC inside that network, with no port forwarding.' },
  { question: 'Does listing a brand mean a partnership?', answer: "No. Brand names and logos are their owners' trademarks. Listing states that the manufacturer's ONVIF-conformant cameras interoperate with Camzify and implies no partnership or endorsement." },
  { question: 'What about encoders and web streams?', answer: 'Encoders push RTMP to a private ingest address; web-delivered streams connect over HTTPS as HLS or WebRTC. The camera connectivity pages cover each route.' },
];

/** A brand with a setup guide links to it; every other tile links to the RTSP setup guide. */
function brandLink(b: CameraBrand) {
  const g = guideFor(b.name);
  return g
    ? { href: `/supported-cameras/${g.slug}`, label: `${b.name} setup guide` }
    : { href: '/camera-connectivity/rtsp-setup', label: 'Connect over RTSP' };
}

export default function SupportedCamerasPage() {
  return (
    <PageShell {...pageMeta} faqs={faqs} breadcrumbs={[{ label: 'Supported Cameras' }]}>
      <section className="pb-16">
        <div className="mx-auto max-w-site px-6">
          <h1 className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl">Cameras we support</h1>
          <p className="mt-6 max-w-prose text-body text-muted-foreground">
            Camzify connects to any IP camera that supports ONVIF or RTSP, which covers effectively every IP camera made in the last decade, whoever made it. A camera is added over one of three connection types: RTSP, RTMP or HTTPS. Compatibility is decided by the protocol rather than the brand, so if your camera exposes an RTSP stream it will work with Camzify and the <Link href="/virtual-patrolling" className="text-primary hover:underline">virtual patrolling</Link> system.
          </p>
          <div className="mt-8 max-w-prose rounded-xl border border-primary/30 bg-primary/5 p-6">
            <h2 className="font-display text-lg font-bold">Not limited to the brands on this page</h2>
            <p className="mt-2 text-muted-foreground">
              The manufacturers listed below are the ones seen most often, not the limit of what works. Camzify runs on
              any camera, from any maker, that does one of three things:
            </p>
            <ul className="mt-3 list-disc space-y-1 pl-5 text-muted-foreground">
              <li>offers an <Link href="/camera-connectivity/rtsp-setup" className="text-primary hover:underline">RTSP stream</Link>, which every ONVIF Profile S camera does;</li>
              <li>pushes <Link href="/camera-connectivity/rtmp-setup" className="text-primary hover:underline">RTMP</Link> to a server, natively or through an encoder;</li>
              <li>streams over <Link href="/camera-connectivity/https-setup" className="text-primary hover:underline">HTTPS</Link>, as HLS or WebRTC.</li>
            </ul>
            <p className="mt-3 text-muted-foreground">
              It works the same way as the AI detections: the 23 standard ones are a starting point, and anything else
              is <Link href="/ai-features/custom-detections" className="text-primary hover:underline">built to order</Link>.
            </p>
          </div>
          <p className="mt-6 text-muted-foreground">
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
                  RTSP, so a camera supporting either works, including models released after this
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
                who search by brand, it is not a compatibility matrix, and a manufacturer&rsquo;s
                absence from it says nothing about whether its cameras work.
              </p>
              <BrandStrip className="mt-8" showNotes linkFor={brandLink} />
            </ScrollReveal>
          </div>

          <div className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">The three connection types</h2>
              <div className="mt-6 grid gap-4 sm:grid-cols-3">
                <Link href="/camera-connectivity/rtsp-setup" className="rounded-lg bg-card p-5 shadow transition-shadow hover:shadow-md"><span className="font-display font-bold">RTSP</span><p className="mt-1 text-sm text-muted-foreground">Most common. Direct stream from camera.</p></Link>
                <Link href="/camera-connectivity/rtmp-setup" className="rounded-lg bg-card p-5 shadow transition-shadow hover:shadow-md"><span className="font-display font-bold">RTMP</span><p className="mt-1 text-sm text-muted-foreground">Encoder-based push streaming.</p></Link>
                <Link href="/camera-connectivity/https-setup" className="rounded-lg bg-card p-5 shadow transition-shadow hover:shadow-md"><span className="font-display font-bold">HTTPS</span><p className="mt-1 text-sm text-muted-foreground">Web-delivered streams. HLS (.m3u8) and WebRTC (WHEP/WHIP).</p></Link>
              </div>
            </ScrollReveal>
          </div>

          <div className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">How to check your own cameras</h2>
              <p className="mt-4 max-w-prose text-muted-foreground">
                We do not publish a model-by-model compatibility list, and you should be skeptical
                of vendors who do, those lists go stale the moment a manufacturer ships new
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
                    a: 'If the RTSP stream is already reachable over the internet — via a static IP or an existing forwarded route — connect it directly. If it only exists on the local network, the Camzify Connector relays it from a PC on that network, with no port forwarding and the camera never exposed to the internet.',
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
      <FaqSection items={faqs} />
    </PageShell>
  );
}
