import Link from 'next/link';
import { FaqSection } from '@/components/content/faq-section';
import type { Locale } from '@/lib/i18n';

/**
 * Homepage FAQ.
 *
 * Exported so `app/page.tsx` can pass the identical array into `faqSchema()` — the
 * FAQPage structured data and the visible answers must come from one source or the
 * rich result is invalid.
 *
 * Questions are phrased the way buyers type them, and each answer opens with the
 * direct answer before elaborating, so a single pair survives being quoted out of
 * context by an answer engine.
 *
 * The first block is what a video-management buyer asks of any platform — deployment
 * model, camera lock-in, storage, security, search, mobile. The second is what is
 * specific to virtual patrolling. The earlier version had only the second, which meant
 * a VMS buyer found none of their questions answered on the page that ranks highest.
 */
export const homepageFaqs = [
  {
    question: 'Is Camzify a cloud video management system or an on-premise one?',
    answer:
      'Cloud by default, and on premises where footage has to stay on site. In the cloud deployment there is no server or NVR to install: cameras stream to the platform, footage is stored in the cloud with a retention window set per camera, and everything is managed from a browser. The only on-site software is the optional Camzify Connector, a small application for a Windows, macOS or Linux machine that relays cameras on a private network without port forwarding. Cameras that are already reachable over the internet need nothing installed at all. For clients whose footage must stay on their own premises for privacy reasons, Camzify is also deployed on premises, installed and set up by Camzify, or as a hybrid of the two.',
  },
  {
    question: 'Does Camzify work with the cameras I already have?',
    answer:
      'Yes, in almost all cases. Camzify connects to any IP camera that supports ONVIF or RTSP, which covers effectively every IP camera manufactured in the last decade, and it also accepts RTMP and HTTPS (HLS or WebRTC) streams. Camzify sells no hardware, so there is no feature reserved for its own cameras. Every detection model and every patrol capability runs on whatever cameras you have.',
  },
  {
    question: 'Where is footage stored, and for how long?',
    answer:
      'In the cloud deployment, in Amazon S3 in the AWS region nearest your sites, under a retention policy set per camera rather than once for the account, by a number of days or by a storage cap. Recording runs continuously or on a schedule you define, so an interior camera watching an empty office overnight does not have to consume storage doing it. Footage past its window is deleted automatically, and any clip can be exported for a chosen time range. Where footage has to stay on your premises, Camzify is deployed on premises or as a hybrid instead.',
  },
  {
    question: 'How is the platform secured?',
    answer:
      'Camera streams are transmitted over TLS 1.2 or higher and footage at rest is encrypted with AES-256. Access is role-based: each user carries one permission group combining page-level access with create, read, update and delete rights per resource, and every action on the account is logged in an audit trail the account holder can review. PDPA, GDPR, SOC 2 Type II and ISO 27001 alignment are in progress and none is yet held — the security page says so plainly.',
  },
  {
    question: 'Can I search recorded footage for a specific person?',
    answer:
      'Yes. AI suspect search takes a plain-language description, such as clothing color, bag, approximate age or direction of travel, and returns every matching appearance across indexed cameras and time windows, ranked by confidence. No reference photo is needed. It is not facial recognition: matches are made on confirmed object tracks and appearance attributes, and identification is always a human decision. The cross-camera journey map then shows a matched subject’s full path.',
  },
  {
    question: 'Can guards and managers use it on a phone?',
    answer:
      'Yes. Mobile access runs in the phone’s own browser, Safari, Chrome or whatever is already there, with live streams, alerts and patrol compliance in a responsive interface, so there is nothing to install for a relief guard on their first shift. Native iOS and Android apps are in development and listed on the roadmap; the browser interface stays available after they ship.',
  },
  {
    question: 'What is virtual patrolling?',
    answer:
      'Virtual patrolling is a scheduled, AI-driven patrol round run across existing security cameras. The system follows a defined camera route, checks a per-camera list of conditions at each stop, scores compliance, notifies the guard assigned to any failed check, and produces a timestamped report with the snapshot behind every result. It creates the same audit trail as a physical guard tour without a person walking the route.',
  },
  {
    question: 'Does virtual patrolling replace security guards?',
    answer:
      'It replaces the routine patrol round, not the security function. The repetitive walk-and-check that occupies most of a guard shift is what the AI takes over; guards are still needed for physical response, visitor management and judgment calls. Many sites use it to cover hours that were never staffed in the first place, and security agencies sell it alongside their guards as overnight coverage across every client site rather than instead of them.',
  },
  {
    question: 'How much does Camzify cost?',
    answer:
      'Camzify is priced per instance per month: a stream instance for each camera, a detection instance for each AI feature on a camera, and cloud storage for the account, so the price depends on those counts. It starts from $5 per camera per month, and a quote for your site comes in lower for an annual term or more features per camera; the pricing page turns your counts into a quote request. The comparison that matters is usually against manned guarding rather than against other software: the ROI calculator models it using your own guard rates and camera count, and a demo returns an exact quote.',
  },
  {
    question: 'How quickly does an alert reach someone?',
    answer:
      'Alerts fire within seconds of a confirmed detection and route to the contact assigned to that specific camera over email, SMS, WhatsApp or push, carrying the object type, confidence score, timestamp and a snapshot. Each alert has an acknowledgment state, so there is a record of who saw it and when, and unacknowledged high-severity events stay at the top of the queue.',
  },
  {
    question: 'What happens when a checklist item fails during a round?',
    answer:
      'The item is marked Not Compliant and the snapshot is kept. On an automated round the guard assigned to that camera is notified immediately; on a manual round the operator is offered the message and chooses. The item then has to be resolved before the round can close: either fixed and re-checked, which captures a second frame, or held as Pending with a written reason, which counts against the compliance score. The report carries all of it.',
  },
  {
    question: 'How is this different from motion detection?',
    answer:
      'Motion detection responds to pixel change, so it triggers on shadows, headlights, rain and moving foliage. Camzify detections operate on confirmed object tracks: the system maintains a persistent identity for each subject across frames and evaluates rules against that track. The practical difference is alert volume — object-track detection removes most of the noise that makes conventional motion alerts unusable.',
  },
  {
    question: 'Can Camzify detect something that is not in the 23 detections?',
    answer:
      'Often, yes. Behavioral anomaly detection, one of the 23, lets you describe the behavior to watch for in your own words. Where that is not enough, Camzify builds the detection to order: license plate recognition for US and Singapore plates, eating and drinking detection and shoplifting detection have been built for customers so far. A custom detection costs a one-off build price and is then licensed per camera like the rest, in the cloud or on premises.',
  },
  {
    question: 'Which industries use Camzify?',
    answer:
      'Any site with cameras already installed and hours when nobody is watching them. Camzify is built for warehouses and logistics sites, construction sites, retail estates, manufacturing plants, property management portfolios, self-storage, and remote or unmanned assets such as substations and pump stations, and for the security agencies that cover many of those sites for their own clients.',
  },
];

/**
 * The same fourteen questions, in the same order, for the German homepage. `app/de/page.tsx`
 * feeds this array into its FAQPage schema exactly as `app/page.tsx` does the English one.
 * Translated, never extended: every claim here is one the English answer makes.
 */
export const homepageFaqsDe = [
  {
    question: 'Ist Camzify ein Cloud-Videomanagementsystem oder eine On-Premises-Lösung?',
    answer:
      'Standardmäßig Cloud, und vor Ort, wo die Aufnahmen am Standort bleiben müssen. In der Cloud-Variante wird kein Server und kein NVR installiert: Die Kameras streamen an die Plattform, die Aufnahmen werden in der Cloud mit einer pro Kamera eingestellten Aufbewahrungsdauer gespeichert, und verwaltet wird alles im Browser. Die einzige Software vor Ort ist der optionale Camzify Connector, eine kleine Anwendung für einen Windows-, macOS- oder Linux-Rechner, die Kameras in einem privaten Netzwerk ohne Portweiterleitung weiterleitet. Kameras, die bereits über das Internet erreichbar sind, brauchen gar keine Installation. Für Kunden, deren Aufnahmen aus Datenschutzgründen in den eigenen Räumen bleiben müssen, wird Camzify auch vor Ort (On-Premises) betrieben, von Camzify installiert und eingerichtet, oder als Hybrid aus beidem.',
  },
  {
    question: 'Funktioniert Camzify mit den Kameras, die ich bereits habe?',
    answer:
      'Ja, in fast allen Fällen. Camzify bindet jede IP-Kamera an, die ONVIF oder RTSP unterstützt, und das umfasst praktisch jede IP-Kamera, die im letzten Jahrzehnt hergestellt wurde. Außerdem nimmt Camzify RTMP- und HTTPS-Streams (HLS oder WebRTC) entgegen. Camzify verkauft keine Hardware, daher ist keine Funktion eigenen Kameras vorbehalten. Jedes Erkennungsmodell und jede Rundgangsfunktion läuft auf den Kameras, die Sie haben.',
  },
  {
    question: 'Wo werden Aufnahmen gespeichert, und wie lange?',
    answer:
      'In der Cloud-Variante in Amazon S3, in der AWS-Region, die Ihren Standorten am nächsten liegt, nach einer Aufbewahrungsregel, die pro Kamera statt einmal für das ganze Konto festgelegt wird, nach Anzahl der Tage oder nach Speicherlimit. Die Aufzeichnung läuft durchgehend oder nach einem Zeitplan, den Sie festlegen, sodass eine Innenkamera, die nachts ein leeres Büro zeigt, dafür keinen Speicher verbrauchen muss. Aufnahmen, deren Frist abgelaufen ist, werden automatisch gelöscht, und jeder Ausschnitt lässt sich für einen gewählten Zeitraum exportieren. Müssen die Aufnahmen in Ihren eigenen Räumen bleiben, wird Camzify stattdessen vor Ort oder als Hybrid betrieben.',
  },
  {
    question: 'Wie ist die Plattform abgesichert?',
    answer:
      'Kamerastreams werden über TLS 1.2 oder höher übertragen, gespeicherte Aufnahmen sind mit AES-256 verschlüsselt. Der Zugriff ist rollenbasiert: Jeder Benutzer hat genau eine Berechtigungsgruppe, die den Zugriff auf Seitenebene mit Rechten zum Anlegen, Lesen, Ändern und Löschen pro Ressource verbindet, und jede Aktion im Konto wird in einem Audit-Protokoll festgehalten, das der Kontoinhaber einsehen kann. Die Ausrichtung an PDPA, DSGVO, SOC 2 Type II und ISO 27001 ist in Vorbereitung, und keine davon ist bisher erteilt – die Seite zu Sicherheit und Datenschutz sagt das offen.',
  },
  {
    question: 'Kann ich Aufnahmen nach einer bestimmten Person durchsuchen?',
    answer:
      'Ja. Die KI-Personensuche nimmt eine Beschreibung in einfacher Sprache entgegen, etwa Farbe der Kleidung, Tasche, ungefähres Alter oder Bewegungsrichtung, und liefert jedes passende Auftreten über die indexierten Kameras und Zeitfenster hinweg, nach Konfidenz sortiert. Ein Referenzfoto ist nicht nötig. Es ist keine Gesichtserkennung: Treffer beruhen auf bestätigten Objektspuren und Erscheinungsmerkmalen, und die Identifizierung ist immer eine menschliche Entscheidung. Die kameraübergreifende Wegkarte zeigt anschließend den vollständigen Weg einer gefundenen Person.',
  },
  {
    question: 'Können Wachpersonen und Vorgesetzte es auf dem Smartphone nutzen?',
    answer:
      'Ja. Der mobile Zugriff läuft im Browser des Smartphones, in Safari, Chrome oder was bereits vorhanden ist, mit Live-Streams, Alarmen und dem Nachweis der Rundgänge in einer responsiven Oberfläche, sodass eine Vertretung in ihrer ersten Schicht nichts installieren muss. Native Apps für iOS und Android sind in Entwicklung und auf der Roadmap aufgeführt; die Browser-Oberfläche bleibt auch nach ihrem Erscheinen verfügbar.',
  },
  {
    question: 'Was ist ein KI-gestützter Wächterrundgang?',
    answer:
      'Ein KI-gestützter Wächterrundgang ist ein geplanter, von KI durchgeführter Kontrollgang über vorhandene Sicherheitskameras. Das System folgt einer festgelegten Kameraroute, prüft an jedem Kontrollpunkt eine Liste von Bedingungen pro Kamera, berechnet die Erfüllungsquote, benachrichtigt die Wachperson, die für eine nicht bestandene Prüfung zuständig ist, und erstellt ein Kontrollprotokoll mit Zeitstempeln und dem Bild hinter jedem Ergebnis. Es entsteht derselbe Nachweis wie bei einem physischen Wächterrundgang, ohne dass eine Person die Route abgeht.',
  },
  {
    question: 'Ersetzt der KI-gestützte Wächterrundgang das Wachpersonal?',
    answer:
      'Er ersetzt den Routinerundgang, nicht die Sicherheitsfunktion. Das wiederkehrende Abgehen und Prüfen, das den größten Teil einer Schicht ausmacht, übernimmt die KI; Wachpersonen bleiben nötig für das Eingreifen vor Ort, den Umgang mit Besuchern und Ermessensentscheidungen. Viele Standorte nutzen ihn, um Stunden abzudecken, die nie besetzt waren, und Sicherheitsdienste verkaufen ihn neben ihrem Wachpersonal als nächtliche Abdeckung über alle Kundenstandorte, nicht als Ersatz dafür.',
  },
  {
    question: 'Was kostet Camzify?',
    answer:
      'Camzify wird pro Instanz und Monat berechnet: eine Stream-Instanz für jede Kamera, eine Detektions-Instanz für jede KI-Funktion auf einer Kamera und Cloud-Speicher für das Konto, der Preis hängt also von diesen Anzahlen ab. Camzify gibt es ab 5 US-Dollar pro Kamera und Monat, und ein Angebot für Ihren Standort fällt bei einer Jahreslaufzeit oder mehr Funktionen pro Kamera niedriger aus; die Preisseite macht aus Ihren Anzahlen eine Angebotsanfrage. Der entscheidende Vergleich ist meist der mit Wachpersonal, nicht mit anderer Software: Der ROI-Rechner (auf Englisch) bildet ihn mit Ihren eigenen Stundensätzen für Wachpersonal und Ihrer Kameraanzahl ab, und eine Demo liefert ein genaues Angebot.',
  },
  {
    question: 'Wie schnell erreicht ein Alarm jemanden?',
    answer:
      'Alarme werden innerhalb von Sekunden nach einer bestätigten Erkennung ausgelöst und an die Kontaktperson geleitet, die genau dieser Kamera zugeordnet ist, per E-Mail, SMS, WhatsApp oder Push, mit Objekttyp, Konfidenzwert, Zeitstempel und einem Standbild. Jeder Alarm hat einen Quittierungsstatus, sodass festgehalten ist, wer ihn wann gesehen hat, und nicht quittierte Ereignisse mit hohem Schweregrad bleiben oben in der Warteschlange.',
  },
  {
    question: 'Was passiert, wenn ein Checklistenpunkt während eines Rundgangs nicht erfüllt ist?',
    answer:
      'Der Punkt wird als Not Compliant (nicht erfüllt) markiert, und das Standbild wird gespeichert. Bei einem automatischen Rundgang wird die für diese Kamera zuständige Wachperson sofort benachrichtigt; bei einem manuellen Rundgang wird dem Operator die Nachricht angeboten, und er entscheidet. Der Punkt muss dann geklärt werden, bevor der Rundgang abgeschlossen werden kann: entweder behoben und erneut geprüft, wobei ein zweites Bild aufgenommen wird, oder mit schriftlicher Begründung als Pending (ausstehend) zurückgestellt, was die Erfüllungsquote senkt. Das Kontrollprotokoll enthält all das.',
  },
  {
    question: 'Worin unterscheidet sich das von Bewegungserkennung?',
    answer:
      'Bewegungserkennung reagiert auf Pixeländerungen und löst deshalb bei Schatten, Scheinwerfern, Regen und sich bewegendem Laub aus. Die Erkennungen von Camzify arbeiten mit bestätigten Objektspuren: Das System führt für jedes Objekt über alle Einzelbilder hinweg eine durchgehende Kennung und prüft die Regeln an dieser Spur. Der praktische Unterschied liegt in der Menge der Alarme – die Erkennung anhand von Objektspuren beseitigt den größten Teil des Rauschens, das herkömmliche Bewegungsalarme unbrauchbar macht.',
  },
  {
    question: 'Kann Camzify etwas erkennen, das nicht zu den 23 Erkennungen gehört?',
    answer:
      'Oft ja. Mit der Verhaltensanomalie-Erkennung, einer der 23, beschreiben Sie das Verhalten, auf das geachtet werden soll, in eigenen Worten. Reicht das nicht, entwickelt Camzify die Erkennung auf Bestellung: Kennzeichenerkennung für Kennzeichen aus den USA und aus Singapur, Erkennung von Essen und Trinken sowie Ladendiebstahlerkennung wurden bisher für Kunden entwickelt. Eine individuelle Erkennung kostet einen einmaligen Entwicklungspreis und wird danach wie die übrigen pro Kamera lizenziert, in der Cloud oder vor Ort.',
  },
  {
    question: 'Welche Branchen setzen Camzify ein?',
    answer:
      'Jeder Standort, an dem bereits Kameras installiert sind und es Stunden gibt, in denen niemand hinsieht. Camzify ist gebaut für Lager- und Logistikstandorte, Baustellen, Einzelhandelsimmobilien, Produktionsbetriebe, Immobilienportfolios in der Verwaltung, Self-Storage sowie abgelegene oder unbesetzte Anlagen wie Umspannwerke und Pumpstationen, und für die Sicherheitsdienste, die viele dieser Standorte für ihre eigenen Kunden betreuen.',
  },
];

export function HomepageFaq({ locale = 'en' }: { locale?: Locale }) {
  if (locale === 'de') {
    // /faqs and /contact have no German counterpart, so both links are marked.
    return (
      <section className="border-t border-border bg-muted/20 py-20 sm:py-28">
        <div className="mx-auto max-w-site px-6">
          <FaqSection
            items={homepageFaqsDe}
            locale="de"
            inline
            className="!mt-0"
            eyebrow="Häufige Fragen"
            heading="Was Interessenten vor einer Demo fragen"
            lede={
              <>
                Ist Ihre Frage nicht dabei, gehen die{' '}
                <Link href="/faqs" hrefLang="en-US" className="text-primary hover:underline">
                  vollständigen FAQ
                </Link>{' '}
                (auf Englisch) weiter, und über das{' '}
                <Link href="/contact" hrefLang="en-US" className="text-primary hover:underline">
                  Kontaktformular
                </Link>{' '}
                (auf Englisch) erreichen Sie eine Person.
              </>
            }
          />
        </div>
      </section>
    );
  }
  return (
    <section className="border-t border-border bg-muted/20 py-20 sm:py-28">
      <div className="mx-auto max-w-site px-6">
        <FaqSection items={homepageFaqs} inline className="!mt-0" eyebrow="Common questions" heading="What buyers ask before a demo" lede={<>If your question is not here, the{' '} <Link href="/faqs" className="text-primary hover:underline"> full FAQ </Link>{' '} goes further, and{' '} <Link href="/contact" className="text-primary hover:underline"> contact </Link>{' '} reaches a person.</>} />
      </div>
    </section>
  );
}
