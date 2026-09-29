import Link from 'next/link';
import { LogoMarquee } from '@/components/motion/logo-marquee';
import { cameraBrands } from '@/lib/camera-brands';
import { ScrollReveal } from '@/components/motion/scroll-reveal';
import { Wifi, Radio, Globe, ArrowRight } from 'lucide-react';
import { hrefFor, isForeignFor, type Locale } from '@/lib/i18n';

/*
 * Renders on both homepages; the words switch with `locale`. The three connection
 * set-up pages are English-only, so on the German side those cards keep the English
 * href and carry an "EN" marker.
 */
const paths = [
  {
    icon: Radio,
    title: 'RTSP',
    desc: {
      en: 'Direct if the stream is reachable online, or via the Camzify Connector for local cameras.',
      de: 'Direkt, wenn der Stream online erreichbar ist, oder über den Camzify Connector für lokale Kameras.',
    },
    href: '/camera-connectivity/rtsp-setup',
  },
  {
    icon: Wifi,
    title: 'RTMP',
    desc: {
      en: 'Generated private ingest address with server URL and stream key.',
      de: 'Eine generierte private Empfangsadresse mit Server-URL und Stream-Schlüssel.',
    },
    href: '/camera-connectivity/rtmp-setup',
  },
  {
    icon: Globe,
    title: 'HTTPS',
    desc: {
      en: 'Streams served over the web, both HLS and WebRTC connect here.',
      de: 'Über das Web ausgelieferte Streams, HLS wie WebRTC, werden hier angebunden.',
    },
    href: '/camera-connectivity/https-setup',
  },
];

const COPY = {
  en: {
    eyebrow: 'Cameras We Support',
    heading: 'Three ways to connect your cameras',
    lede: 'Any RTSP-capable IP camera works with Camzify. No proprietary hardware, no vendor lock-in. Stream quality is auto-detected on connect.',
    deployedOn: 'Deployed on cameras from',
    disclaimer:
      'Brand names and logos are trademarks of their respective owners. Listing a manufacturer states that its ONVIF-conformant cameras interoperate with Camzify; it does not imply partnership or endorsement.',
    viewAll: 'View all supported camera brands',
  },
  de: {
    eyebrow: 'Unterstützte Kameras',
    heading: 'Drei Wege, Ihre Kameras anzubinden',
    lede: 'Jede RTSP-fähige IP-Kamera funktioniert mit Camzify. Keine proprietäre Hardware, keine Herstellerbindung. Die Streamqualität wird beim Verbinden automatisch erkannt.',
    deployedOn: 'Im Einsatz auf Kameras von',
    disclaimer:
      'Markennamen und Logos sind Marken ihrer jeweiligen Inhaber. Die Nennung eines Herstellers besagt, dass seine ONVIF-konformen Kameras mit Camzify zusammenarbeiten; sie bedeutet weder eine Partnerschaft noch eine Empfehlung.',
    viewAll: 'Alle unterstützten Kameramarken ansehen',
  },
} as const;

export function CameraSupport({ locale = 'en' }: { locale?: Locale }) {
  const copy = COPY[locale];
  return (
    <section className="bg-muted/30 py-20 sm:py-28">
      <div className="mx-auto max-w-site px-6">
        <ScrollReveal>
          <div className="text-center">
            <span className="font-mono text-mono-sm uppercase text-primary">{copy.eyebrow}</span>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl">
              {copy.heading}
            </h2>
            <p className="mt-4 mx-auto max-w-2xl text-body text-muted-foreground">
              {copy.lede}
            </p>
          </div>
        </ScrollReveal>
        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {(paths ?? []).map((p: any, i: number) => {
            const Icon = p?.icon ?? Wifi;
            const href: string = p?.href ?? '/';
            const foreign = isForeignFor(href, locale);
            return (
              <ScrollReveal key={i} delay={i * 0.06}>
                <Link
                  href={hrefFor(href, locale)}
                  hrefLang={foreign ? 'en-US' : undefined}
                  className="group flex flex-col items-center rounded-xl border border-border bg-card p-6 text-center transition-all duration-200 hover:border-primary/30 hover:shadow-lg hover:-translate-y-1"
                >
                  <div className="rounded-xl bg-primary/10 p-3">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="mt-4 font-mono text-mono-md font-bold uppercase">
                    {p?.title ?? ''}
                    {foreign && (
                      <span
                        title="Seite auf Englisch"
                        className="ml-1.5 inline-block rounded border border-border px-1 align-middle font-mono text-[10px] font-semibold leading-4 text-muted-foreground"
                      >
                        EN
                      </span>
                    )}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">{p?.desc?.[locale] ?? ''}</p>
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
            {copy.deployedOn}
          </p>
          <LogoMarquee items={cameraBrands.filter((b) => b.logo).map((b) => ({ name: b.name, logo: b.logo as string }))} className="mt-6" />
          {/*
            Disclaimer only. The link to the full list lives once, below, as the
            section's closing action — adding one here too put two links to the same
            page within a few hundred pixels of each other.
          */}
          <p className="mx-auto mt-6 max-w-3xl text-center text-xs leading-relaxed text-muted-foreground">
            {copy.disclaimer}
          </p>
        </div>

        <div className="mt-10 text-center">
          <Link
            href={hrefFor('/supported-cameras', locale)}
            className="inline-flex items-center gap-2 rounded text-sm font-semibold text-primary transition-colors hover:text-primary/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            {copy.viewAll} <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
