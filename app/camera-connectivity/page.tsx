import { generatePageMeta } from '@/lib/page-utils';
import { PageShell } from '@/components/layout/page-shell';
import { ScrollReveal } from '@/components/motion/scroll-reveal';
import Link from 'next/link';
import { Radio, Upload, Globe } from 'lucide-react';

/**
 * Page identity. Declared once and consumed twice: by `generatePageMeta` for the
 * <head> tags, and by `PageShell` for the on-page structured data. Keeping it in one
 * const is what stops the meta description and the schema drifting apart.
 */
const pageMeta = {
  title: "Camera Connectivity | Connect Any Camera",
  description: "Connect your existing IP cameras to Camzify over RTSP, RTMP or HTTPS. Step-by-step setup guides for each of the three connection types.",
  path: "/camera-connectivity",
};

export const metadata = generatePageMeta({ ...pageMeta });

/**
 * The three connection types offered when adding a camera. HLS and WebRTC are not
 * separate choices — both are delivered over HTTPS and both are added under it, so
 * listing them as peers of RTSP and RTMP described a fourth option that does not
 * exist in the product. Their setup guides live under the HTTPS page.
 */
const protocols = [
  { slug: 'rtsp-setup', title: 'RTSP', icon: Radio, desc: 'The most common protocol. Connect an internet-reachable stream directly, or relay local cameras through the Camzify Connector.' },
  { slug: 'rtmp-setup', title: 'RTMP', icon: Upload, desc: 'Push-based streaming from encoders and RTMP-capable cameras.' },
  { slug: 'https-setup', title: 'HTTPS', icon: Globe, desc: 'Streams delivered over the web. Covers both HLS (.m3u8) and WebRTC (WHEP/WHIP).' },
];

export default function CameraConnectivityHub() {
  return (
    <PageShell {...pageMeta} breadcrumbs={[{ label: 'Camera Connectivity' }]}>
      <section className="pb-20">
        <div className="mx-auto max-w-site px-6">
          <h1 className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl">Camera Connectivity</h1>
          <p className="mt-6 max-w-2xl text-body text-muted-foreground">
            <strong className="font-semibold text-foreground">A camera connects to Camzify in one of three ways: RTSP, RTMP or HTTPS.</strong> Camzify uses the cameras you already own, with no proprietary hardware required. Choose your connection type below for step-by-step setup instructions, then start running <a href="/virtual-patrolling" className="text-primary hover:underline">virtual patrol</a> rounds within minutes.
          </p>
          <p className="mt-4 text-muted-foreground">
            An RTSP stream that is already reachable over the internet connects directly. For cameras on local networks without direct cloud access, the <Link href="/camzify-connector" className="text-primary hover:underline">Camzify Connector</Link> relays streams securely. See <Link href="/guides/onvif-and-rtsp-explained" className="text-primary hover:underline">ONVIF and RTSP explained</Link> for protocol fundamentals.
          </p>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {protocols.map((p, i) => (
              <ScrollReveal key={p.slug} delay={i * 0.08}>
                <Link href={`/camera-connectivity/${p.slug}`} className="group flex flex-col items-center rounded-xl bg-card p-6 text-center shadow-md transition-all hover:shadow-lg hover:-translate-y-0.5">
                  <p.icon className="h-10 w-10 text-primary" />
                  <h2 className="mt-3 font-display text-lg font-bold">{p.title}</h2>
                  <p className="mt-2 text-sm text-muted-foreground">{p.desc}</p>
                  <span className="mt-auto pt-4 text-xs font-semibold text-primary">Setup guide →</span>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
