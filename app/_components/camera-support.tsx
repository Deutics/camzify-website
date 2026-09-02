import Link from 'next/link';
import { BrandStrip } from '@/components/content/brand-strip';
import { ScrollReveal } from '@/components/motion/scroll-reveal';
import { Wifi, Radio, Globe, Zap, ArrowRight } from 'lucide-react';

const paths = [
  { icon: Radio, title: 'RTSP', desc: 'Local network cameras relayed via the Camzify Connector.', href: '/camera-connectivity/rtsp-setup' },
  { icon: Wifi, title: 'RTMP', desc: 'Generated private ingest address with server URL and stream key.', href: '/camera-connectivity/rtmp-setup' },
  { icon: Globe, title: 'HLS', desc: 'Direct .m3u8 streaming with no connector required.', href: '/camera-connectivity/hls-setup' },
  { icon: Zap, title: 'WebRTC', desc: 'WHEP/WHIP protocol for the lowest-latency connection.', href: '/camera-connectivity/webrtc-setup' },
];

export function CameraSupport() {
  return (
    <section className="bg-muted/30 py-20 sm:py-28">
      <div className="mx-auto max-w-site px-6">
        <ScrollReveal>
          <div className="text-center">
            <span className="font-mono text-mono-sm uppercase text-primary">Cameras We Support</span>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl">
              Four ways to connect your cameras
            </h2>
            <p className="mt-4 mx-auto max-w-2xl text-body text-muted-foreground">
              Any RTSP-capable IP camera works with Camzify. No proprietary hardware, no
              vendor lock-in. Stream quality is auto-detected on connect.
            </p>
          </div>
        </ScrollReveal>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {(paths ?? []).map((p: any, i: number) => {
            const Icon = p?.icon ?? Wifi;
            return (
              <ScrollReveal key={i} delay={i * 0.06}>
                <Link
                  href={p?.href ?? '/'}
                  className="group flex flex-col items-center rounded-xl border border-border bg-card p-6 text-center transition-all duration-200 hover:border-primary/30 hover:shadow-lg hover:-translate-y-1"
                >
                  <div className="rounded-xl bg-primary/10 p-3">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="mt-4 font-mono text-mono-md font-bold uppercase">{p?.title ?? ''}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{p?.desc ?? ''}</p>
                </Link>
              </ScrollReveal>
            );
          })}
        </div>
        <div className="mt-8 text-center">
          <Link
            href="/supported-cameras"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary/80"
          >
            View supported camera database <ArrowRight className="h-4 w-4" />
          </Link>
          <div className="mt-14">
            <p className="text-center font-mono text-mono-sm uppercase text-muted-foreground">
              Deployed on cameras from
            </p>
            <BrandStrip className="mt-6" limit={8} />
          </div>
        </div>
      </div>
    </section>
  );
}
