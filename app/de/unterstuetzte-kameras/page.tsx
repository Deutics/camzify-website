import { generatePageMeta } from '@/lib/page-utils';
import { PageShell } from '@/components/layout/page-shell';
import { FaqSection } from '@/components/content/faq-section';
import { ScrollReveal } from '@/components/motion/scroll-reveal';
import Link from 'next/link';
import { BrandStrip } from '@/components/content/brand-strip';
import { cameraBrands, type CameraBrand } from '@/lib/camera-brands';
import { guideFor } from '@/lib/camera-brand-guides';
import { CAMERA_BRAND_GUIDES_DE } from '@/lib/camera-brand-guides-de';

/**
 * German counterpart of /supported-cameras.
 *
 * BrandStrip renders each brand's `note` as given, and lib/camera-brands.ts carries
 * English notes only. The German notes are mapped here from the English text, so the
 * brand list, logos and order still come from the one shared array; a note added
 * there without a German entry below falls back to its English text.
 */
const pageMeta = {
  title: 'Unterstützte Kameras: ONVIF- und RTSP-Hersteller',
  description: 'Camzify arbeitet mit jeder ONVIF- oder RTSP-fähigen IP-Kamera: Axis, Hikvision, Dahua, Hanwha, Uniview und weitere. Prüfen Sie Ihre Kameras vor der Demo.',
  path: '/de/unterstuetzte-kameras',
};

export const metadata = generatePageMeta(pageMeta);

const noteDe: Record<string, string> = {
  'ONVIF Profile S across current IP ranges': 'ONVIF Profile S in den aktuellen IP-Serien',
  'ONVIF and RTSP on standard IP models': 'ONVIF und RTSP bei Standard-IP-Modellen',
  'Formerly Wisenet; ONVIF conformant': 'Früher Wisenet; ONVIF-konform',
  'ONVIF Profile S and T on IP ranges': 'ONVIF Profile S und T in den IP-Serien',
  'ONVIF conformant IP cameras': 'ONVIF-konforme IP-Kameras',
  'ONVIF on commercial IP ranges': 'ONVIF in den gewerblichen IP-Serien',
  'ONVIF Profile S on Sarix and later': 'ONVIF Profile S ab der Sarix-Serie',
  'RTSP on most models; ONVIF on many': 'RTSP bei den meisten Modellen, ONVIF bei vielen',
  'ONVIF and RTSP on the VIGI range': 'ONVIF und RTSP in der VIGI-Serie',
  'RTSP on UniFi Protect cameras': 'RTSP bei UniFi-Protect-Kameras',
  'ONVIF and RTSP on IP models': 'ONVIF und RTSP bei IP-Modellen',
  'RTSP on IP models': 'RTSP bei IP-Modellen',
  'ONVIF Profile S on i-PRO IP ranges; formerly Panasonic Security': 'ONVIF Profile S in den IP-Serien von i-PRO; früher Panasonic Security',
  'RTSP on selected recorders only': 'RTSP nur bei ausgewählten Rekordern',
  'ONVIF on listed models; RTSP with the device password': 'ONVIF bei den aufgeführten Modellen; RTSP mit dem Gerätepasswort',
  'ONVIF on many mains-powered models, not battery models': 'ONVIF bei vielen netzbetriebenen Modellen, nicht bei Akkumodellen',
};

const brandsDe = cameraBrands.map((b) => ({ ...b, note: noteDe[b.note] ?? b.note }));

const faqs = [
  { question: 'Funktioniert Camzify mit ONVIF- und RTSP-Kameras?', answer: 'Ja. Camzify bindet jede IP-Kamera an, die einen RTSP-Stream bereitstellt, darunter ONVIF-konforme Kameras aller großen Hersteller. Außerdem nimmt Camzify RTMP-Streams von Encodern und HTTPS-Streams (HLS und WebRTC) entgegen. Eine proprietäre Kamera ist nicht nötig und wird auch nicht verkauft: Die Kameras, die ein Standort bereits hat, sind die Kameras, auf denen Camzify läuft.' },
  { question: 'Mein Hersteller steht nicht auf der Liste. Funktionieren meine Kameras trotzdem?', answer: 'Sehr wahrscheinlich. Camzify ist nicht auf die genannten Hersteller beschränkt: Jede Kamera, die einen RTSP-Stream bereitstellt (das tut jede Kamera nach ONVIF Profile S), per RTMP sendet oder über HTTPS als HLS oder WebRTC streamt, lässt sich anbinden. Die Liste nennt die häufigsten Hersteller; sie ist nicht abschließend.' },
  { question: 'Müssen die Kameras aus dem Internet erreichbar sein?', answer: 'Nein. Kameras in einem lokalen Netzwerk werden über den Camzify Connector auf einem PC in diesem Netzwerk angebunden, ohne Portweiterleitung.' },
  { question: 'Bedeutet die Nennung eines Herstellers eine Partnerschaft?', answer: 'Nein. Markennamen und Logos sind Marken ihrer Inhaber. Die Nennung besagt, dass die ONVIF-konformen Kameras des Herstellers mit Camzify zusammenarbeiten, und bedeutet weder eine Partnerschaft noch eine Empfehlung.' },
  { question: 'Wie sieht es mit Encodern und Webstreams aus?', answer: 'Encoder senden RTMP an eine private Empfangsadresse; über das Web ausgelieferte Streams werden per HTTPS als HLS oder WebRTC angebunden. Die Seiten zur Kameraanbindung beschreiben jeden dieser Wege.' },
];

/** Wie auf /supported-cameras: Hersteller mit Anleitung verlinken dorthin, alle anderen auf die RTSP-Anleitung (beide Englisch). */
function brandLinkDe(b: CameraBrand) {
  const de = CAMERA_BRAND_GUIDES_DE.find((x) => x.brand === b.name);
  if (de) return { href: `/de/unterstuetzte-kameras/${de.slug}`, label: `Einrichtung für ${b.name}` };
  const g = guideFor(b.name);
  return g
    ? { href: `/supported-cameras/${g.slug}`, label: `Einrichtung für ${b.name} (EN)` }
    : { href: '/camera-connectivity/rtsp-setup', label: 'Über RTSP anbinden (EN)' };
}

export default function DeUnterstuetzteKamerasPage() {
  return (
    <PageShell {...pageMeta} faqs={faqs} breadcrumbs={[{ label: 'Unterstützte Kameras' }]}>
      <section className="pb-16">
        <div className="mx-auto max-w-site px-6">
          <h1 className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl">Unterstützte Kameras</h1>
          <p className="mt-6 max-w-prose text-body text-muted-foreground">
            Camzify verbindet sich mit jeder IP-Kamera, die ONVIF oder RTSP unterstützt, und das
            sind praktisch alle IP-Kameras der letzten zehn Jahre, gleich von welchem Hersteller.
            Eine Kamera wird über eine von drei Verbindungsarten hinzugefügt: RTSP, RTMP oder HTTPS.
            Über die Kompatibilität entscheidet das Protokoll, nicht die Marke: Liefert Ihre Kamera
            einen RTSP-Stream, funktioniert sie mit Camzify und dem{' '}
            <Link href="/de/ki-waechterrundgang" className="text-primary hover:underline">KI-gestützten Wächterrundgang</Link>.
          </p>
          <div className="mt-8 max-w-prose rounded-xl border border-primary/30 bg-primary/5 p-6">
            <h2 className="font-display text-lg font-bold">Nicht auf die genannten Hersteller beschränkt</h2>
            <p className="mt-2 text-muted-foreground">
              Die unten genannten Hersteller sind die, die am häufigsten vorkommen, nicht die Grenze dessen, was
              funktioniert. Camzify läuft auf jeder Kamera jedes Herstellers, die eines von drei Dingen kann:
            </p>
            <ul className="mt-3 list-disc space-y-1 pl-5 text-muted-foreground">
              <li>einen <Link href="/camera-connectivity/rtsp-setup" hrefLang="en-US" className="text-primary hover:underline">RTSP-Stream</Link> bereitstellen, wie es jede Kamera nach ONVIF Profile S tut;</li>
              <li>per <Link href="/camera-connectivity/rtmp-setup" hrefLang="en-US" className="text-primary hover:underline">RTMP</Link> an einen Server senden, direkt oder über einen Encoder;</li>
              <li>über <Link href="/camera-connectivity/https-setup" hrefLang="en-US" className="text-primary hover:underline">HTTPS</Link> streamen, als HLS oder WebRTC.</li>
            </ul>
            <p className="mt-3 text-muted-foreground">
              Bei den KI-Funktionen ist es genauso: Die 23 Standard-Erkennungen sind ein Ausgangspunkt, alles Weitere
              wird <Link href="/de/ki-funktionen/individuelle-erkennungen" className="text-primary hover:underline">auf Anfrage entwickelt</Link>.
              Die Einrichtungsanleitungen sind auf Englisch.
            </p>
          </div>
          <p className="mt-6 text-muted-foreground">
            Neu bei Kameraprotokollen? Der Leitfaden{' '}
            <Link href="/guides/onvif-and-rtsp-explained" className="text-primary hover:underline">ONVIF und RTSP erklärt</Link>{' '}
            (auf Englisch) führt verständlich in das Thema ein.
          </p>

          <div className="mt-14">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">Was ONVIF für die Kompatibilität bedeutet</h2>
              <div className="mt-4 max-w-prose space-y-4 text-muted-foreground">
                <p>
                  <strong className="font-semibold text-foreground">
                    ONVIF ist ein offener Standard, über den IP-Kameras, Rekorder und Software
                    verschiedener Hersteller zusammenarbeiten.
                  </strong>{' '}
                  Eine Kamera, die ONVIF Profile S erfüllt, stellt ihren Videostream und
                  grundlegende Steuerfunktionen auf dokumentierte Weise bereit, sodass jedes
                  konforme System ihn ohne herstellerspezifische Integration nutzen kann.
                </p>
                <p>
                  Deshalb ist Kompatibilität eine Eigenschaft des Protokolls und nicht des Logos auf
                  dem Gehäuse. Camzify pflegt keine Treiber für einzelne Modelle, sondern spricht
                  ONVIF und RTSP. Jede Kamera, die eines davon unterstützt, funktioniert also, auch
                  Modelle, die nach dem Verfassen dieser Seite erschienen sind, und Marken, die unten
                  nicht aufgeführt sind.
                </p>
                <p>
                  In der Praxis erfüllt fast jede IP-Kamera der letzten zehn Jahre diese
                  Voraussetzung. Ausnahmen sind Consumer-Geräte, die an die Cloud-App ihres
                  Herstellers gebunden sind und mitunter gar keinen lokalen Stream bereitstellen.
                  Steht im Verwaltungsmenü der Kamera eine RTSP-URL, funktioniert sie.
                </p>
              </div>
            </ScrollReveal>
          </div>

          <div className="mt-14">
            <ScrollReveal>
              <div className="flex flex-wrap items-end justify-between gap-4">
                <h2 className="font-display text-2xl font-bold">Häufig eingesetzte Hersteller</h2>
                <span className="font-mono text-mono-sm uppercase text-muted-foreground">
                  {brandsDe.length} genannt &middot; nicht abschließend
                </span>
              </div>
              <p className="mt-4 max-w-prose text-muted-foreground">
                Diese Hersteller begegnen uns in Projekten am häufigsten. Die Liste ist eine
                Orientierungshilfe für alle, die nach Marke suchen, keine Kompatibilitätsmatrix, und
                fehlt ein Hersteller, sagt das nichts darüber aus, ob seine Kameras funktionieren.
              </p>
              <BrandStrip className="mt-8" brands={brandsDe} showNotes locale="de" linkFor={brandLinkDe} />
            </ScrollReveal>
          </div>

          <div className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">Die drei Verbindungsarten</h2>
              <div className="mt-6 grid gap-4 sm:grid-cols-3">
                <Link href="/camera-connectivity/rtsp-setup" className="rounded-lg bg-card p-5 shadow transition-shadow hover:shadow-md"><span className="font-display font-bold">RTSP</span><p className="mt-1 text-sm text-muted-foreground">Am häufigsten. Direkter Stream von der Kamera. Anleitung auf Englisch.</p></Link>
                <Link href="/camera-connectivity/rtmp-setup" className="rounded-lg bg-card p-5 shadow transition-shadow hover:shadow-md"><span className="font-display font-bold">RTMP</span><p className="mt-1 text-sm text-muted-foreground">Push-Streaming über einen Encoder. Anleitung auf Englisch.</p></Link>
                <Link href="/camera-connectivity/https-setup" className="rounded-lg bg-card p-5 shadow transition-shadow hover:shadow-md"><span className="font-display font-bold">HTTPS</span><p className="mt-1 text-sm text-muted-foreground">Über das Web ausgelieferte Streams: HLS (.m3u8) und WebRTC (WHEP/WHIP). Anleitung auf Englisch.</p></Link>
              </div>
            </ScrollReveal>
          </div>

          <div className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">So prüfen Sie Ihre eigenen Kameras</h2>
              <p className="mt-4 max-w-prose text-muted-foreground">
                Wir veröffentlichen keine Kompatibilitätsliste Modell für Modell, und Sie sollten
                Anbietern, die das tun, mit Vorsicht begegnen: Solche Listen veralten, sobald ein
                Hersteller neue Firmware ausliefert, und sie erwecken den Eindruck, nicht
                aufgeführte Modelle würden nicht unterstützt, obwohl in der Praxis das Protokoll über
                die Kompatibilität entscheidet, nicht das Logo auf dem Gehäuse.
              </p>
              <p className="mt-4 max-w-prose text-muted-foreground">
                Camzify funktioniert mit jeder Kamera, die einen standardkonformen Stream liefern
                kann. Drei Prüfungen zeigen, wo Ihre Kameras stehen:
              </p>
              <ol className="mt-6 grid gap-5 sm:grid-cols-3">
                {[
                  {
                    q: 'Spricht sie ONVIF oder RTSP?',
                    a: 'Fast jede IP-Kamera der letzten zehn Jahre tut das. Sehen Sie im Verwaltungsmenü unter Netzwerk, Streaming oder Integration nach. Finden Sie dort eine RTSP-URL, funktioniert die Kamera.',
                  },
                  {
                    q: 'Erreicht Camzify den Stream?',
                    a: 'Ist der RTSP-Stream bereits über das Internet erreichbar, etwa über eine feste IP-Adresse oder eine bestehende Portweiterleitung, binden Sie ihn direkt an. Gibt es ihn nur im lokalen Netzwerk, leitet der Camzify Connector ihn von einem PC in diesem Netzwerk weiter, ohne Portweiterleitung und ohne dass die Kamera jemals aus dem Internet erreichbar wird.',
                  },
                  {
                    q: 'Ist das Bild gut genug?',
                    a: 'Wenn eine Person, die das Bild prüft, auf der für Sie relevanten Entfernung eine Person oder ein Fahrzeug erkennen kann, haben die Erkennungsmodelle genug, womit sie arbeiten können. Die Auflösung ist dabei weniger wichtig als Bildausschnitt und Beleuchtung.',
                  },
                ].map((item) => (
                  <li key={item.q} className="rounded-xl border border-border bg-card p-6">
                    <h3 className="font-display text-base font-bold">{item.q}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.a}</p>
                  </li>
                ))}
              </ol>
              <p className="mt-6 max-w-prose text-muted-foreground">
                Unsicher bei einem bestimmten Kamerabestand? Schicken Sie uns Hersteller, Modell und
                Firmware-Version über die{' '}
                <Link href="/contact" className="text-primary hover:underline">Kontaktseite</Link>{' '}
                (auf Englisch), und wir bestätigen die Kompatibilität, bevor Sie sich festlegen. Die
                Einrichtung auf Protokollebene beschreiben die{' '}
                <Link href="/camera-connectivity" className="text-primary hover:underline">Anleitungen zur Kameraanbindung</Link>{' '}
                (auf Englisch).
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>
      <FaqSection items={faqs} locale="de" />
    </PageShell>
  );
}
