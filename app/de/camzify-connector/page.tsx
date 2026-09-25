import { generatePageMeta } from '@/lib/page-utils';
import { PageShell } from '@/components/layout/page-shell';
import { FaqSection } from '@/components/content/faq-section';
import { ScrollReveal } from '@/components/motion/scroll-reveal';
import Link from 'next/link';
import { ProductShot } from '@/components/content/product-shot';

/** German counterpart of /camzify-connector. */
const pageMeta = {
  title: 'Camzify Connector | RTSP-Relay-Software',
  description: 'Der Camzify Connector leitet Kameras im lokalen Netz von einem Windows-, macOS- oder Linux-PC in die Cloud weiter, ohne Portweiterleitung, mit PTZ-Steuerung.',
  path: '/de/camzify-connector',
};

export const metadata = generatePageMeta(pageMeta);

const faqs = [
  {
    question: 'Brauche ich den Camzify Connector immer?',
    answer: 'Nein. Der Connector ist für Kameras gedacht, die aus dem Internet nicht selbst erreichbar sind. Ein RTSP-Stream, der unter einer öffentlichen Adresse bereitsteht, wird direkt angebunden, ebenso ein HTTPS-Stream, ob HLS oder WebRTC. Stehen Ihre Kameras hinter einem Router oder einer Firewall ohne öffentlichen Zugang, stellt der Connector die Verbindung her.',
  },
  {
    question: 'Auf welchem Betriebssystem läuft der Connector?',
    answer: 'Auf Windows, macOS oder Linux. Er lässt sich auf jedem Rechner installieren, der die Kameras im lokalen Netzwerk erreicht und gleichzeitig Zugang zum Internet hat, oft ein vorhandener Büro-PC oder ein kleiner Server, der ohnehin vor Ort steht, statt neuer Hardware.',
  },
  {
    question: 'Funktioniert die PTZ-Steuerung über den Connector?',
    answer: 'Ja. Bei einer Kamera im lokalen Netzwerk überträgt der Connector neben dem Video auch die Steuerung für Schwenken, Neigen und Zoomen, sodass sich die Kamera aus Camzify heraus bewegen und nicht nur ansehen lässt.',
  },
  {
    question: 'Braucht der Connector eine Portweiterleitung oder eine feste IP-Adresse?',
    answer: 'Weder noch. Er baut von innerhalb Ihres Netzwerks eine ausgehende Verbindung zu Camzify auf, in dieselbe Richtung wie gewöhnlicher Webverkehr. Es wird nichts für eingehende Verbindungen geöffnet, keine Firewall-Regel hinzugefügt, und die Kameras sind zu keinem Zeitpunkt aus dem Internet erreichbar.',
  },
];

export default function DeCamzifyConnectorPage() {
  return (
    <PageShell {...pageMeta} faqs={faqs} breadcrumbs={[{ label: 'Camzify Connector' }]}>
      <section className="pb-16">
        <div className="mx-auto max-w-site px-6">
          <h1 className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl">Camzify Connector</h1>
          <p className="mt-6 max-w-prose text-body text-muted-foreground">
            Der Camzify Connector ist eine schlanke Software, die auf einem PC oder Server im selben lokalen Netzwerk wie Ihre Kameras installiert wird. Er leitet RTSP-Streams und die zugehörige Steuerung für Schwenken, Neigen und Zoomen sicher an die Camzify-Cloud weiter, ohne Portweiterleitung, feste IP-Adressen oder Änderungen an der Firewall. Er läuft unter Windows, macOS oder Linux.
          </p>

          <div className="mt-10 max-w-3xl">
            <ProductShot src="/product-configuration" alt="Die Ansicht Configuration in der Konsole: Eine Kamera wird über ihre RTMP-, RTSP- oder HTTPS-Adresse hinzugefügt, darunter die Kameras, die bereits am Standort eingerichtet sind" label="Konfiguration · Kamera hinzufügen" sizes="(max-width: 1024px) 100vw, 768px" />
          </div>

          <div className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">Wozu Sie ihn brauchen</h2>
              <p className="mt-4 max-w-prose text-muted-foreground">
                Die meisten IP-Kameras sind in lokalen Netzwerken hinter NAT-Routern installiert. Aus dem Internet sind sie nicht direkt erreichbar, was gut für die Sicherheit ist, die Anbindung an die Cloud aber erschwert. Der Connector löst das, indem er von innerhalb des Netzwerks eine ausgehende Verbindung aufbaut und die Kamerabilder darüber sicher an Camzify weiterleitet.
              </p>
            </ScrollReveal>
          </div>

          <div className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">So funktioniert es</h2>
              <ol className="mt-4 space-y-4 max-w-prose text-muted-foreground list-decimal list-inside">
                <li>Installieren Sie den Connector auf einem beliebigen PC oder Server im Kameranetzwerk.</li>
                <li>Tragen Sie die RTSP-URLs Ihrer lokalen Kameras im Connector ein.</li>
                <li>Der Connector authentifiziert sich bei der Camzify-Cloud und beginnt, die Videostreams weiterzuleiten, bei Kameras, die es unterstützen, zusammen mit der PTZ-Steuerung.</li>
                <li>Die Kameras erscheinen im Camzify-Dashboard, als wären sie direkt mit der Cloud verbunden.</li>
              </ol>
            </ScrollReveal>
          </div>

          <div className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">Systemvoraussetzungen</h2>
              <ul className="mt-4 space-y-2 max-w-prose text-muted-foreground">
                <li>• Windows, macOS oder Linux</li>
                <li>• Netzwerkzugriff auf die Kameras (dasselbe LAN oder VLAN)</li>
                <li>• Ausgehender Internetzugang (HTTPS, keine eingehenden Ports erforderlich)</li>
                <li>• Upload-Bandbreite für alle weitergeleiteten Kameras: die Summe ihrer Stream-Bitraten, wie sie an den Kameras eingestellt sind</li>
              </ul>
              <p className="mt-4 max-w-prose text-muted-foreground">
                Wie Sie die Upload-Bandbreite, die ein Standort braucht, anhand der eigenen Kameras berechnen, erklärt der{' '}
                <Link href="/guides/cloud-vms-bandwidth-requirements" className="text-primary hover:underline">Leitfaden zur Bandbreite eines Cloud-VMS</Link> (auf Englisch).
              </p>
            </ScrollReveal>
          </div>

          <div className="mt-16">
            <ScrollReveal>
              <p className="max-w-prose text-muted-foreground">
                Sobald Kameras über den Connector angebunden sind, funktionieren sie mit allen Camzify-Funktionen, darunter der <Link href="/de/ki-waechterrundgang" className="text-primary hover:underline">KI-gestützte Wächterrundgang</Link>, die <Link href="/de/ki-funktionen" className="text-primary hover:underline">KI-Erkennungen</Link> und das <Link href="/de/plattform" className="text-primary hover:underline">Dashboard der Plattform</Link>. Ausführliche Anweisungen zur Anbindung enthält die <Link href="/camera-connectivity/rtsp-setup" className="text-primary hover:underline">Anleitung zur RTSP-Einrichtung</Link> (auf Englisch).
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>
      <section className="pb-4">
        <div className="mx-auto max-w-site px-6">
          <p className="max-w-prose text-muted-foreground">
            Sie installieren den Connector im Rahmen eines größeren Auftrags im Netzwerk eines Kunden? Die Seite{' '}
            <Link href="/de/fuer-installateure" className="text-primary hover:underline">für Errichter und Installateure</Link>{' '}
            richtet sich an Sie; Inbetriebnahme und Übergabe beschreibt die englische Seite{' '}
            <Link href="/partners/for-security-integrators" className="text-primary hover:underline">for security integrators</Link>.
          </p>
        </div>
      </section>

      <FaqSection items={faqs} locale="de" />
    </PageShell>
  );
}
