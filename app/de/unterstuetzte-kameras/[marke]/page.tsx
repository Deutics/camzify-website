import { notFound } from 'next/navigation';
import Link from 'next/link';
import { generatePageMeta } from '@/lib/page-utils';
import { PageShell } from '@/components/layout/page-shell';
import { FaqSection } from '@/components/content/faq-section';
import { ScrollReveal } from '@/components/motion/scroll-reveal';
import { CAMERA_BRAND_GUIDES } from '@/lib/camera-brand-guides';
import { CAMERA_BRAND_GUIDES_DE } from '@/lib/camera-brand-guides-de';

/**
 * German counterpart of app/supported-cameras/[brand]/page.tsx: one brand's setup guide,
 * rendered from lib/camera-brand-guides-de.ts. Same sections in the same order; the
 * brand-specific half comes from the manufacturer's German documentation (see that file),
 * the Camzify half restates only what the German site already says. Links to pages that
 * exist only in English carry hrefLang="en-US" and an "(EN)" marker (docs/I18N.md).
 */
export function generateStaticParams() {
  return CAMERA_BRAND_GUIDES_DE.map((g) => ({ marke: g.slug }));
}

function find(slug: string) {
  return CAMERA_BRAND_GUIDES_DE.find((g) => g.slug === slug);
}

export function generateMetadata({ params }: { params: { marke: string } }) {
  const g = find(params.marke);
  if (!g) return {};
  return generatePageMeta({ title: g.title, description: g.description, path: `/de/unterstuetzte-kameras/${g.slug}` });
}

const RUNS_ON = [
  { href: '/de/ki-waechterrundgang', label: 'KI-gestützter Wächterrundgang', body: 'geplante Kontrollgänge über jede Kamera mit ihrer Checkliste und einem Kontrollprotokoll pro Rundgang' },
  { href: '/de/ki-funktionen', label: 'KI-Erkennungen', body: 'Eindringen in Bereiche, Linienüberschreitung, Verweilen, persönliche Schutzausrüstung und die übrigen der 23' },
  { href: '/de/ki-funktionen/sabotageerkennung', label: 'Kamerasabotage', body: 'ein Alarm, wenn eine Kamera verdeckt, verdreht, defokussiert oder eingefroren wird' },
  { href: '/de/plattform/videospeicherung', label: 'Cloud-Aufzeichnung', body: 'Aufnahmen außerhalb des Standorts, mit einer Aufbewahrungsdauer pro Kamera' },
  { href: '/de/ki-funktionen/individuelle-erkennungen', label: 'Individuelle Erkennungen', body: 'auf Anfrage entwickelt, wenn die Standard-Erkennungen nicht abdecken, was ein Standort braucht' },
];

export default function KameraMarkePage({ params }: { params: { marke: string } }) {
  const g = find(params.marke);
  if (!g) notFound();
  const path = `/de/unterstuetzte-kameras/${g.slug}`;
  const pageMeta = { title: g.title, description: g.description, path };
  const others = CAMERA_BRAND_GUIDES.filter((o) => o.slug !== g.slug);

  return (
    <PageShell
      {...pageMeta}
      faqs={g.faqs}
      breadcrumbs={[{ label: 'Unterstützte Kameras', href: '/de/unterstuetzte-kameras' }, { label: g.brand }]}
    >
      <article className="pb-16">
        <div className="mx-auto max-w-site px-6">
          <span className="font-mono text-mono-sm uppercase text-primary">Unterstützte Kameras · {g.brand}</span>
          <h1 className="mt-3 font-display text-4xl font-extrabold tracking-tight sm:text-5xl">
            {g.brand}-Kameras mit Camzify verbinden
          </h1>
          <p className="mt-6 max-w-prose text-body leading-relaxed text-muted-foreground">
            <strong className="font-semibold text-foreground">{g.opening}</strong> {g.intro}
          </p>

          <ScrollReveal>
            <section className="mt-14">
              <h2 className="font-display text-2xl font-bold">{g.brand}-RTSP-URL</h2>
              <p className="mt-3 max-w-prose text-muted-foreground">
                So, wie {g.brand} sie in der eigenen Dokumentation angibt. Ersetzen Sie die Teile in spitzen Klammern durch die Werte Ihrer Kamera.
              </p>
              <dl className="mt-6 space-y-4">
                {g.streams.map((s) => (
                  <div key={s.label} className="rounded-xl border border-border bg-card p-5">
                    <dt className="font-mono text-mono-sm uppercase text-muted-foreground">{s.label}</dt>
                    <dd className="mt-2">
                      <code className="block break-all rounded-md bg-background px-3 py-2 font-mono text-sm text-foreground">{s.url}</code>
                      {s.note && <p className="mt-2 text-sm text-muted-foreground">{s.note}</p>}
                    </dd>
                  </div>
                ))}
              </dl>
            </section>
          </ScrollReveal>

          <ScrollReveal>
            <section className="mt-14 max-w-prose">
              <h2 className="font-display text-2xl font-bold">RTSP und ONVIF an einer {g.brand}-Kamera aktivieren</h2>
              <div className="mt-4 space-y-4 text-muted-foreground">
                {g.enable.map((p, i) => <p key={i}>{p}</p>)}
              </div>
            </section>
          </ScrollReveal>

          <ScrollReveal>
            <section className="mt-14 max-w-prose">
              <h2 className="font-display text-2xl font-bold">Kann eine {g.brand}-Kamera RTMP senden?</h2>
              <p className="mt-4 text-muted-foreground">
                {g.rtmp ?? `Die Dokumentation von ${g.brand} beschreibt, soweit für diese Seite geprüft, kein Senden per RTMP. Nutzen Sie RTSP; braucht ein Standort einen Push, kann ein Encoder den RTSP-Stream umwandeln.`}{' '}
                <Link href="/camera-connectivity/rtmp-setup" hrefLang="en-US" className="text-primary hover:underline">RTMP in Camzify (EN)</Link>.
              </p>
            </section>
          </ScrollReveal>

          {g.notes.length > 0 && (
            <ScrollReveal>
              <section className="mt-14 max-w-prose">
                <h2 className="font-display text-2xl font-bold">Gut zu wissen vor dem Anbinden</h2>
                <ul className="mt-4 list-disc space-y-2 pl-5 text-muted-foreground">
                  {g.notes.map((n, i) => <li key={i}>{n}</li>)}
                </ul>
              </section>
            </ScrollReveal>
          )}

          <ScrollReveal>
            <section className="mt-14">
              <h2 className="font-display text-2xl font-bold">Den {g.brand}-Stream in Camzify hinzufügen</h2>
              <ol className="mt-6 grid gap-4 md:grid-cols-3">
                <li className="rounded-xl border border-border bg-card p-6">
                  <span className="font-mono text-mono-sm text-primary">1</span>
                  <h3 className="mt-2 font-display text-base font-bold">Prüfen, ob der Stream läuft</h3>
                  <p className="mt-2 text-sm text-muted-foreground">Öffnen Sie die RTSP-URL in einem Player wie VLC. Läuft sie auch außerhalb des Kameranetzwerks, kann Camzify sie direkt anbinden.</p>
                </li>
                <li className="rounded-xl border border-border bg-card p-6">
                  <span className="font-mono text-mono-sm text-primary">2</span>
                  <h3 className="mt-2 font-display text-base font-bold">Nur lokal? Mit dem Connector</h3>
                  <p className="mt-2 text-sm text-muted-foreground">Ist die Kamera nur im lokalen Netzwerk erreichbar, leitet der <Link href="/de/camzify-connector" className="text-primary hover:underline">Camzify Connector</Link> auf einem Windows-, macOS- oder Linux-Rechner dort den Stream weiter, ohne Portweiterleitung.</p>
                </li>
                <li className="rounded-xl border border-border bg-card p-6">
                  <span className="font-mono text-mono-sm text-primary">3</span>
                  <h3 className="mt-2 font-display text-base font-bold">In der Konsole hinzufügen</h3>
                  <p className="mt-2 text-sm text-muted-foreground">Unter „Camera Management“ → „Add Camera“ die URL einfügen (oder den weitergeleiteten Stream wählen) und die Zugangsdaten der Kamera eingeben. Details in der <Link href="/camera-connectivity/rtsp-setup" hrefLang="en-US" className="text-primary hover:underline">RTSP-Anleitung (EN)</Link>.</p>
                </li>
              </ol>
            </section>
          </ScrollReveal>

          <ScrollReveal>
            <section className="mt-14">
              <h2 className="font-display text-2xl font-bold">Was auf {g.brand}-Kameras läuft, sobald sie angebunden sind</h2>
              <p className="mt-3 max-w-prose text-muted-foreground">
                Sobald der Stream in Camzify ist, wird eine {g.brand}-Kamera wie jede andere behandelt: Die Marke entscheidet nicht darüber, welche Funktionen sie nutzen kann.
              </p>
              <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {RUNS_ON.map((r) => (
                  <li key={r.href}>
                    <Link href={r.href} className="block h-full rounded-xl border border-border bg-card p-5 no-underline transition-colors hover:border-primary/30">
                      <span className="font-display font-bold">{r.label}</span>
                      <span className="mt-1 block text-sm text-muted-foreground">{r.body}</span>
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/book-a-demo" hrefLang="en-US" className="rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow transition-colors hover:bg-primary/90">Demo auf Ihren {g.brand}-Kameras buchen (EN)</Link>
                <Link href="/de/preise" className="rounded-lg border border-border px-5 py-2.5 text-sm font-semibold transition-colors hover:border-primary/30 hover:text-primary">Preise</Link>
              </div>
            </section>
          </ScrollReveal>

          <section className="mt-14 max-w-prose">
            <h2 className="font-display text-2xl font-bold">Quellen, geprüft am {g.checked}</h2>
            <p className="mt-3 text-sm text-muted-foreground">
              Alle {g.brand}-spezifischen Angaben auf dieser Seite stammen aus der deutschen Dokumentation von {g.brand}, unten aufgeführt. Firmware-Updates ändern Menüs mit der Zeit; weicht die Oberfläche der Kamera ab, gilt sie.
            </p>
            <ul className="mt-4 space-y-2 text-sm">
              {g.sources.map((s) => (
                <li key={s.url}>
                  <a href={s.url} className="text-primary hover:underline" rel="noopener nofollow" target="_blank">{s.title}</a>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-xs leading-relaxed text-muted-foreground">
              {g.brand} ist eine Marke ihres Inhabers. Diese Seite besagt, dass {g.brand}-Kameras mit einem standardmäßigen RTSP-Stream mit Camzify zusammenarbeiten; sie bedeutet keine Partnerschaft, Empfehlung oder Zertifizierung durch {g.brand}.
            </p>
          </section>

          <section className="mt-12">
            <h2 className="font-mono text-mono-sm uppercase text-muted-foreground">Andere Kamerahersteller (Anleitungen auf Englisch)</h2>
            <ul className="mt-3 flex flex-wrap gap-x-6 gap-y-2 text-sm">
              {others.map((o) => (
                <li key={o.slug}>
                  <Link href={`/supported-cameras/${o.slug}`} hrefLang="en-US" className="text-primary hover:underline">{o.brand} (EN)</Link>
                </li>
              ))}
              <li><Link href="/de/unterstuetzte-kameras" className="text-muted-foreground hover:text-primary">Alle unterstützten Hersteller, und warum jede RTSP-Kamera funktioniert</Link></li>
            </ul>
          </section>
        </div>
      </article>
      <FaqSection items={g.faqs} locale="de" />
    </PageShell>
  );
}
