import Link from 'next/link';
import { LogoMarquee } from '@/components/motion/logo-marquee';
import { ScrollReveal } from '@/components/motion/scroll-reveal';
import { Wifi, Radio, Globe, ArrowRight } from 'lucide-react';

const paths = [
  { icon: Radio, title: 'RTSP', desc: 'Direct if the stream is reachable online, or via the Camzify Connector for local cameras.', href: '/camera-connectivity/rtsp-setup' },
  { icon: Wifi, title: 'RTMP', desc: 'Generated private ingest address with server URL and stream key.', href: '/camera-connectivity/rtmp-setup' },
  { icon: Globe, title: 'HTTPS', desc: 'Streams served over the web — both HLS and WebRTC connect here.', href: '/camera-connectivity/https-setup' },
];

export function CameraSupport() {
  return (
    <section className="bg-muted/30 py-20 sm:py-28">
      <div className="mx-auto max-w-site px-6">
        <ScrollReveal>
          <div className="text-center">
            <span className="font-mono text-mono-sm uppercase text-primary">Cameras We Support</span>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl">
              Three ways to connect your cameras
            </h2>
            <p className="mt-4 mx-auto max-w-2xl text-body text-muted-foreground">
              Any RTSP-capable IP camera works with Camzify. No proprietary hardware, no
              vendor lock-in. Stream quality is auto-detected on connect.
            </p>
          </div>
        </ScrollReveal>
        <div className="mt-12 grid gap-6 sm:grid-cols-3">
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
        {/*
          A marquee here rather than the grid: this is recognition, not reference. The
          full sixteen with their protocol notes stay on /supported-cameras, where a
          reader is checking a specific fleet and needs to scan rather than watch.
        */}
        <div className="mt-14">
          <p className="text-center font-mono text-mono-sm uppercase text-muted-foreground">
            Deployed on cameras from
          </p>
          <LogoMarquee className="mt-6" />
          {/*
            Disclaimer only. The link to the full list lives once, below, as the
            section's closing action — adding one here too put two links to the same
            page within a few hundred pixels of each other.
          */}
          <p className="mx-auto mt-6 max-w-3xl text-center text-xs leading-relaxed text-muted-foreground">
            Brand names and logos are trademarks of their respective owners. Listing a
            manufacturer states that its ONVIF-conformant cameras interoperate with Camzify;
            it does not imply partnership or endorsement.
          </p>
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/supported-cameras"
            className="inline-flex items-center gap-2 rounded text-sm font-semibold text-primary transition-colors hover:text-primary/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            View all supported camera brands <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
