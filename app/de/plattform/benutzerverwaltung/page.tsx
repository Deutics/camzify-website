import { generatePageMeta } from '@/lib/page-utils';
import { PageShell } from '@/components/layout/page-shell';
import { FaqSection } from '@/components/content/faq-section';
import { ScrollReveal } from '@/components/motion/scroll-reveal';
import { FeatureHero } from '@/components/content/feature-hero';
import { ProductShot } from '@/components/content/product-shot';
import { UserManagementMockup } from '@/components/mockups/user-management-mockup';
import Link from 'next/link';
import { ShieldCheck, Cpu, MapPin, UserCog } from 'lucide-react';

/**
 * German counterpart of /platform/user-management. The built-in permission groups
 * (Site Admin, Guard, Auditor, Surveillance Manager) and user states are console labels;
 * the console is English, so the group names are kept and explained in German.
 */
const pageMeta = {
  title: 'Benutzerverwaltung für Sicherheitssysteme',
  description: 'Camzify-Benutzerverwaltung: Berechtigungsgruppen mit Zugriff pro Modul, Kontrolle auf Standortebene und Zuteilung von KI-Instanzen an mehrere Mandanten.',
  path: '/de/plattform/benutzerverwaltung',
};

export const metadata = generatePageMeta(pageMeta);

const faqs = [
  { question: 'Wie richte ich delegierten Zugriff für ein Team ein?', answer: 'Legen Sie zuerst eine Berechtigungsgruppe an, fügen Sie dann den Benutzer mit dieser Gruppe hinzu, weisen Sie ihm Standorte und Kameras zu und teilen Sie ihm Lizenzkontingent aus Ihrem eigenen zu. Die Schritt-für-Schritt-Anleitung (auf Englisch) finden Sie unter /guides/how-to-manage-sub-users-and-quotas.' },
  { question: 'Kann ein Unterkonto eigene Unterkonten anlegen?', answer: 'Ja, nach demselben Prinzip wie das übergeordnete Konto. Ein Unterkonto kann Benutzer unter sich anlegen, ihnen eine Berechtigungsgruppe zuweisen und Standorte, Kameras, Instanzen für Funktionen und Backup-Speicher aus seinem eigenen ungenutzten Kontingent zuteilen, nie mehr, als es selbst hält. Enddatum des Abonnements und Preise bleiben dem Administrator des übergeordneten Kontos vorbehalten, sodass ein delegierter Administrator seinen Teil des Kontos führen kann, ohne die kommerziellen Bedingungen zu berühren.' },
  { question: 'Was passiert, wenn ein Unterkonto keine lizenzierten Instanzen mehr hat?', answer: 'Es sieht das Limit und erhält ein Formular, um mehr Kontingent anzufordern, statt in einer Sackgasse zu landen. Die Anfrage kommt im übergeordneten Konto unter „User Management“ an und kann dort freigegeben werden, sofern genug nicht zugeteiltes Kontingent vorhanden ist, oder abgelehnt werden. Nichts wird automatisch vergeben, das übergeordnete Konto behält also die Kontrolle darüber, was ausgegeben wurde.' },
  { question: 'Kann ich ein Unterkonto sperren, ohne es zu löschen?', answer: 'Ja. Wird ein Benutzer deaktiviert, kann er sich nicht mehr anmelden, seine Zuteilung und seine Daten bleiben aber reserviert. Ein Dienstleister zwischen zwei Einsätzen oder ein Mitarbeiter im Urlaub lässt sich so später wieder freischalten, ohne den Zugriff neu aufzubauen. Das Löschen ist eine eigene, endgültige Aktion.' },
  { question: 'Wie setze ich das Passwort eines Unterkontos zurück?', answer: 'Über das Menü dieses Benutzers in der Benutzerverwaltung: Legen Sie ein Passwort direkt fest oder lassen Sie ein starkes Zufallspasswort erzeugen. Der Benutzer muss dafür nicht selbst ein Zurücksetzen anstoßen, was für Schichtpersonal wichtig ist, dessen Zugriff wiederhergestellt werden muss, während es vor Ort ist.' },
  { question: 'Was passiert mit den zugeteilten KI-Instanzen eines deaktivierten Unterkontos?', answer: 'Sie gehen in der Regel an das verfügbare Kontingent des übergeordneten Kontos zurück, sobald das Unterkonto deaktiviert ist. Die Erkennungskapazität lässt sich dann anderweitig zuteilen, statt ungenutzt an einem inaktiven Konto zu hängen.' },
  { question: 'Kann ein Unterkonto andere Unterkonten im Konto sehen?', answer: 'Standardmäßig nicht. Die Sichtbarkeit von Unterkonten richtet sich nach der Berechtigungsgruppe, und die Benutzerliste des Kontos einzusehen ist eine eigene Berechtigung. Eine Rolle wie Guard oder Auditor sieht in der Regel nicht, wer sonst eingeladen wurde, solange dieser Zugriff nicht ausdrücklich gewährt wird.' },
  { question: 'Was bedeutet der Status „Invited“, und wie lange gilt er?', answer: '„Invited“ (eingeladen) bedeutet, dass das Konto angelegt und eine Rolle, Standorte und gegebenenfalls eine Instanzzuteilung zugewiesen sind, die Person die Einladung aber noch nicht angenommen und sich noch nicht angemeldet hat. Mit der ersten Anmeldung wechselt der Status auf „Active“. Eine nie angenommene Einladung bleibt in diesem ausstehenden Zustand, bis sie angenommen oder widerrufen wird.' },
  { question: 'Kann ein Unterkonto mehreren Standorten zugeordnet sein?', answer: 'Ja. Der Standortzugriff wird pro Unterkonto vergeben und ist nicht auf einen Standort beschränkt. Eine Rolle wie Surveillance Manager kann zum Beispiel für mehrere Standorte zugleich freigegeben sein, etwa für eine Filiale und ein Parkhaus.' },
  { question: 'Wie wirkt sich die Zuteilung von Instanzen an ein Unterkonto auf das Kontingent des übergeordneten Kontos aus?', answer: 'Jede Instanz einer KI-Funktion, die einem Unterkonto zugeteilt wird, stammt aus der lizenzierten Kapazität des übergeordneten Kontos. Werden einem Unterkonto Detektions-Instanzen zugeteilt, steht entsprechend weniger für das übergeordnete Konto oder andere Unterkonten zur Verfügung, bis die Instanzen neu zugeteilt oder freigegeben werden.' },
];

export default function DePlattformBenutzerverwaltungPage() {
  return (
    <PageShell {...pageMeta} faqs={faqs} breadcrumbs={[
      { label: 'Plattform', href: '/de/plattform' },
      { label: 'Benutzerverwaltung' },
    ]}>
      <FeatureHero
        eyebrow="Rollenbasiert, auf Standorte begrenzt"
        title="Benutzerverwaltung für Sicherheitssysteme"
        lede={<><strong className="font-semibold text-foreground">Die Benutzerverwaltung in Camzify arbeitet mit Unterkonten und Berechtigungsgruppen: einer Matrix aus Anzeigen, Bearbeiten und Löschen für jedes Modul.</strong> Die Zugriffskontrolle auf Standortebene legt fest, welche Standorte ein Benutzer sehen kann. Über die Zuteilung von Instanzen für KI-Funktionen gibt ein übergeordnetes Konto Erkennungskapazität an untergeordnete Konten weiter.</>}
        primary={{ href: '/book-a-demo', label: 'Demo anfragen' }}
        secondary={{ href: '/guides/how-to-manage-sub-users-and-quotas', label: 'Zugriff delegieren (auf Englisch)' }}
        visual={<ProductShot
            src="/product-user-management"
            alt="Ein Laptop mit der Ansicht User Management in Camzify: Das Fenster zum Anlegen einer Berechtigungsgruppe ist geöffnet, mit Schaltern für den Seitenzugriff und einer Matrix der Instanzrechte Anzeigen, Anlegen, Bearbeiten und Löschen"
            label="Benutzerverwaltung · Camzify-Konsole"
            priority
            sizes="(max-width: 1024px) 100vw, 45vw"
          />}
      />

      <section className="pb-16">
        <div className="mx-auto max-w-site px-6">

          <div className="mt-12">
            <UserManagementMockup />
          </div>

          <div className="mt-16">
            <span className="font-mono text-mono-sm uppercase text-primary">In der Praxis</span>
            <h2 className="mt-2 font-display text-2xl font-bold">So wird Zugriff delegiert</h2>
          </div>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: ShieldCheck, title: 'Rollenbasierte Berechtigungsgruppen', desc: 'Site Admin, Guard, Auditor, Surveillance Manager oder eine eigene Gruppe: Jede legt genau fest, was ein Unterkonto ansehen, bearbeiten oder löschen darf.' },
              { icon: Cpu, title: 'Instanzzuteilung pro Benutzer', desc: 'Instanzen für KI-Funktionen (Linienüberschreitung, Kamerasabotage, VPS und weitere) lassen sich einem Unterkonto direkt aus der Lizenz des übergeordneten Kontos zuteilen.' },
              { icon: MapPin, title: 'Begrenzung auf Standorte', desc: 'Jedes Unterkonto sieht einen Standort, mehrere oder alle. Die Sichtbarkeit muss nie ein Alles-oder-nichts sein.' },
              { icon: UserCog, title: 'Einladen und deaktivieren', desc: 'Unterkonten durchlaufen die Zustände eingeladen, aktiv und deaktiviert, ohne ihre eingerichtete Rolle oder ihren Standortzugriff zu verlieren.' },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <ScrollReveal key={i} delay={i * 0.06}>
                  <div className="rounded-xl border border-border bg-card p-6 transition-all hover:border-primary/20 hover:shadow-md">
                    <Icon className="h-5 w-5 text-primary" />
                    <h3 className="mt-3 font-display text-base font-bold">{item.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>

          <div className="mt-16 grid items-center gap-12 lg:grid-cols-2">
            <ScrollReveal>
              <div>
                <span className="font-mono text-mono-sm uppercase text-primary">Teil jedes Rundgangs</span>
                <h2 className="mt-2 font-display text-2xl font-bold">Ein Konto, viele Rollen</h2>
                <p className="mt-4 text-muted-foreground">
                  Dieses Modul ist mit dem <Link href="/de/ki-waechterrundgang" className="text-primary hover:underline">KI-gestützten Wächterrundgang</Link> verbunden
                  und ergibt so ein vollständiges Lagebild. Rundgangsergebnisse, Erkennungsalarme und der Zustand
                  der Plattform laufen in derselben Konsole zusammen.
                </p>
                <p className="mt-4 text-muted-foreground">
                  Die ausführliche Berechtigungsmatrix, also welche Rechte zum Anzeigen, Bearbeiten und Löschen
                  jede der vier vordefinierten Gruppen pro Modul hat, steht auf einer eigenen Seite. Die vollständige
                  Aufschlüsselung finden Sie unter{' '}
                  <Link href="/platform/permission-groups" className="text-primary hover:underline">Berechtigungsgruppen</Link>, und wie
                  KI-Erkennungskapazität überhaupt lizenziert und zugeteilt wird, unter{' '}
                  <Link href="/platform/license-and-instance-management" className="text-primary hover:underline">Lizenz- und Instanzverwaltung</Link> (beide
                  Seiten auf Englisch).
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.06}>
              <div className="rounded-2xl border border-border bg-card p-6">
                <span className="font-mono text-mono-sm uppercase text-primary">Berechtigungsgruppen</span>
                <div className="mt-4 space-y-3">
                  {[
                    { role: 'Site Admin', desc: 'Weitreichender Zugriff auf einen zugewiesenen Standort' },
                    { role: 'Guard', desc: 'Tägliche Beobachtung, eingeschränkte Bearbeitungsrechte' },
                    { role: 'Auditor', desc: 'Überwiegend lesender Zugriff für Prüfung und Nachweis' },
                    { role: 'Surveillance Manager', desc: 'Verwaltet Kameras und Erkennungen über Standorte hinweg' },
                  ].map((r) => (
                    <div key={r.role} className="flex items-center justify-between gap-4 rounded-lg bg-muted/30 px-4 py-2.5">
                      <span className="shrink-0 font-mono text-mono-sm text-primary">{r.role}</span>
                      <span className="text-right text-xs text-muted-foreground">{r.desc}</span>
                    </div>
                  ))}
                </div>
                <Link href="/platform/permission-groups" className="mt-4 inline-block text-sm text-primary hover:underline">Vollständige Berechtigungsmatrix ansehen (auf Englisch) →</Link>
              </div>
            </ScrollReveal>
          </div>

          <FaqSection items={faqs} locale="de" inline />

          <div className="mt-16">
            <h2 className="font-display text-2xl font-bold">Weiterführende Seiten</h2>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link href="/de/plattform" className="rounded-lg border border-border bg-card px-4 py-2 text-sm hover:border-primary/30 hover:text-primary">Plattform-Übersicht</Link>
              <Link href="/platform/permission-groups" className="rounded-lg border border-border bg-card px-4 py-2 text-sm hover:border-primary/30 hover:text-primary">Berechtigungsgruppen (auf Englisch)</Link>
              <Link href="/platform/license-and-instance-management" className="rounded-lg border border-border bg-card px-4 py-2 text-sm hover:border-primary/30 hover:text-primary">Lizenz- und Instanzverwaltung (auf Englisch)</Link>
              <Link href="/de/ki-waechterrundgang" className="rounded-lg border border-border bg-card px-4 py-2 text-sm hover:border-primary/30 hover:text-primary">KI-gestützter Wächterrundgang</Link>
              <Link href="/de/preise" className="rounded-lg border border-border bg-card px-4 py-2 text-sm hover:border-primary/30 hover:text-primary">Preise</Link>
              <Link href="/book-a-demo" className="rounded-lg border border-border bg-card px-4 py-2 text-sm hover:border-primary/30 hover:text-primary">Demo anfragen</Link>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
