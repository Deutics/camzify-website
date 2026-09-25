import { generatePageMeta } from '@/lib/page-utils';
import { PageShell } from '@/components/layout/page-shell';
import { FaqSection } from '@/components/content/faq-section';
import { ScrollReveal } from '@/components/motion/scroll-reveal';
import Link from 'next/link';
import { SiteImage } from '@/components/content/site-image';
import { Handshake, Shield, Monitor, Server, Users } from 'lucide-react';

/**
 * German counterpart of /partners (pair in lib/i18n.ts). Same cards, same images, same
 * order; each card links to the German partner page.
 */
const pageMeta = {
  title: 'Partner | Reseller und Integrationspartner',
  description: 'Partner von Camzify werden: für Reseller, Errichter, Leitstellen, Sicherheitsdienste und Managed Service Provider. Finden Sie die Seite, die zu Ihnen passt.',
  path: '/de/partner',
};

export const metadata = generatePageMeta(pageMeta);

const partnerTypes = [
  { href: '/de/fuer-sicherheitsdienste', image: { src: '/vp-vs-security-guards.jpg', alt: 'Ein Sicherheitsmitarbeiter an einem Streifenwagen neben einem Netz aus KI-Kameras' }, title: 'Für Sicherheitsdienste', icon: Users, desc: 'Verkaufen Sie nächtliche Absicherung für alle Kundenstandorte, mit einem Bericht je Kunde, zusätzlich zum Wachpersonal, das Sie bereits stellen.' },
  { href: '/de/reseller-werden', image: { src: '/product-license-plan-light.jpg', alt: 'Die Ansicht „Plan and Usage“: vergebene, aktivierte und verfügbare Instanzen' }, title: 'Reseller werden', icon: Handshake, desc: 'Verkaufen Sie ein Cloud-VMS mit integriertem KI-gestützten Wächterrundgang. Reine Software, Preise auf Angebotsbasis und eine Seite, die Sie für jede Aussage zitieren können.' },
  { href: '/de/fuer-installateure', image: { src: '/product-configuration-light.jpg', alt: 'Die Ansicht „Configuration“: eine Kamera wird über ihre Stream-Adresse hinzugefügt' }, title: 'Für Errichter und Installateure', icon: Shield, desc: 'Ergänzen Sie die Anlagen, die Sie ohnehin errichten, um den KI-gestützten Wächterrundgang: RTSP, RTMP oder HTTPS, ein Connector für Kameras im lokalen Netz und eine saubere Übergabe.' },
  { href: '/de/fuer-leitstellen', image: { src: '/partner-gate-opened.jpg', alt: 'Eine Kamera am Hoftor: das Tor steht offen, so wie der Rundgang es vorgefunden hat' }, title: 'Für Leitstellen', icon: Monitor, desc: 'Führen Sie geplante Rundgänge für jeden Sicherheitsdienst durch, für den Sie überwachen, benachrichtigen Sie dessen Wachpersonal direkt aus dem Rundgang und übergeben Sie ein Protokoll pro Runde.' },
  { href: '/de/fuer-managed-service-provider', image: { src: '/product-user-management-light.jpg', alt: 'Die Benutzerverwaltung: Unterkonten mit ihren Standorten und Berechtigungsgruppen' }, title: 'Für Managed Service Provider', icon: Server, desc: 'Ein Konto in Ihrer Hand, ein abgegrenzter Zugang je Kunde, Kontingent, das Sie zuteilen und zurückholen, Alarme und Protokolle je Kunde.' },
];

const faqs = [
  { question: 'Welche Partnerseite passt zu mir?', answer: 'Wenn Sie Wachstunden oder Revierdienst verkaufen: Sicherheitsdienste. Wenn Sie Alarme empfangen oder Kameras für andere überwachen: Leitstellen. Wenn Sie Kameras errichten: Errichter und Installateure von Video- und Alarmanlagen. Wenn Sie die IT für Kunden betreiben: Managed Service Provider. Wenn Sie Software verkaufen: Reseller.' },
  { question: 'Gibt es ein Partnerprogramm mit Stufen und Margen?', answer: 'Nein. Es gibt keine veröffentlichte Marge, keine Stufen, kein Portal und kein Schulungsprogramm. Die Konditionen werden im Gespräch vereinbart, und jede Partnerseite sagt das offen, statt ein Programm zu erfinden.' },
  { question: 'Wer hält das Konto, der Partner oder der Kunde?', answer: 'Wer die Konsole bedient. Ein Partner kann das Konto halten und jeden Kunden als abgegrenztes Unterkonto führen, oder der Kunde hält das Konto und gibt dem Partner einen Zugang. Beides wird unterstützt.' },
  { question: 'Wo rechne ich das durch?', answer: 'Der ROI-Rechner (auf Englisch) hat einen Modus für Sicherheitsdienste: Kundenstandorte, der Preis, den Sie berechnen würden, die Stunden, die Sie personell nicht besetzen können, und die wiederkehrenden Umsätze, die daraus folgen. Das Angebot für Camzify wird auf dieser Grundlage erstellt.' },
];

export default function DePartnerHub() {
  return (
    <PageShell {...pageMeta} faqs={faqs} breadcrumbs={[{ label: 'Partner' }]}>
      <section className="pb-20">
        <div className="mx-auto max-w-site px-6">
          <h1 className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl">Partner</h1>
          <p className="mt-6 max-w-2xl text-body text-muted-foreground">
            Camzify arbeitet mit Errichtern, Resellern, Leitstellen und Managed Service Providern zusammen, um den <Link href="/de/ki-waechterrundgang" className="text-primary hover:underline">KI-gestützten Wächterrundgang</Link> an Standorte weltweit zu bringen.
          </p>
          <div className="mt-14 grid gap-6 sm:grid-cols-2">
            {partnerTypes.map((p, i) => (
              <ScrollReveal key={p.href} delay={i * 0.08}>
                <Link href={p.href} className="group flex items-start gap-6 rounded-xl bg-card p-8 shadow-md transition-all hover:shadow-lg hover:-translate-y-0.5">
                <div className="hidden w-40 shrink-0 overflow-hidden rounded-lg border border-border sm:block"><SiteImage src={p.image.src} alt={p.image.alt} width={1229} height={692} sizes="160px" className="aspect-video h-auto w-full object-cover" /></div>
                  <p.icon className="mt-0.5 h-8 w-8 shrink-0 text-primary" />
                  <div>
                    <h2 className="font-display text-lg font-bold">{p.title}</h2>
                    <p className="mt-2 text-sm text-muted-foreground">{p.desc}</p>
                    <span className="mt-3 block text-sm font-semibold text-primary">Mehr erfahren →</span>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
      <FaqSection items={faqs} locale="de" />
    </PageShell>
  );
}
