import type { CameraBrandGuide } from '@/lib/camera-brand-guides';

/**
 * German camera brand guides, rendered at /de/unterstuetzte-kameras/<slug>
 * (app/de/unterstuetzte-kameras/[marke]/page.tsx). Each is the German counterpart of an
 * entry in lib/camera-brand-guides.ts, paired in lib/i18n.ts.
 *
 * Same sourcing rule as the English file, plus one: menu names and wording are taken from
 * the manufacturer's own German documentation where it exists, never translated by us, so
 * a reader finds the same words on the camera's screen. Sources are the German versions of
 * the pages the English entry cites.
 *
 * Reolink first because German demand for it is large ("reolink kamera" 33,100 a month,
 * "reolink onvif" 170, "reolink rtsp" 140; DataForSEO, October 2026).
 */
export const CAMERA_BRAND_GUIDES_DE: CameraBrandGuide[] = [
  {
    slug: 'reolink',
    brand: 'Reolink',
    title: 'Reolink RTSP-URL und ONVIF einrichten',
    description: 'Die Reolink-RTSP-URL für Haupt- und Substream, RTSP- und ONVIF-Ports aktivieren, welche Modelle streamen, und KI-Funktionen auf Reolink-Kameras.',
    opening:
      'Reolink-Kameras werden über RTSP an Camzify angebunden, sodass die vorhandenen Kameras KI-Erkennungen, den KI-gestützten Wächterrundgang und Cloud-Aufzeichnung nutzen, ohne ersetzt zu werden.',
    intro:
      'Bei vielen Reolink-Modellen sind die RTSP- und ONVIF-Ports ab Werk deaktiviert, und Akku- und 4G-Modelle streamen nicht eigenständig. Zuerst gilt es also, das Modell zu prüfen und die Ports zu aktivieren. Danach ist eine Reolink-Kamera eine ganz normale RTSP-Quelle.',
    streams: [
      { label: 'Hauptstream', url: 'rtsp://<Benutzername>:<Passwort>@<IP-Adresse>/Preview_01_main', note: 'Die Standard-RTSP-Portnummer ist 554 und kann weggelassen werden, solange sie nicht geändert wurde.' },
      { label: 'Substream', url: 'rtsp://<Benutzername>:<Passwort>@<IP-Adresse>/Preview_01_sub', note: 'Ein leichterer Stream derselben Kamera.' },
      { label: 'Über ein Reolink-NVR oder einen Home Hub', url: 'rtsp://<NVR-Benutzername>:<NVR-Passwort>@<NVR-IP-Adresse>/Preview_<Kanalnummer>_main', note: 'Benutzername und Passwort sind die des NVR; die Kanalnummer wählt die Kamera, etwa Preview_01_main für Kanal 1.' },
    ],
    enable: [
      'Reolink schreibt, dass bei einigen Modellen die RTMP-, HTTP-, RTSP- und ONVIF-Ports standardmäßig deaktiviert sind; aktivieren Sie sie zuerst. Im Webbrowser: Zahnradsymbol oben rechts, dann Netzwerk > Fortgeschritten > Servereinstellungen > Aufbau. Im Reolink Client: Geräteeinstellungen > Netzwerk > Erweitert > Servereinstellungen. In der Reolink App: Erweiterte Netzwerkeinstellungen > Server-Einstellungen.',
      'Diese Schalter gibt es bei Kameras, die Smart Person/Vehicle/Pet Detection unterstützen; bei anderen Kameras gibt es laut Reolink keinen Port-Schalter. Für Kameras an einem Reolink-NVR werden die Ports am NVR geöffnet: in der neuen Benutzeroberfläche unter Einstellungen > Netzwerk > Erweitert, dann Port Einstellungen.',
      'ONVIF wird unterstützt; der Standardport für ONVIF ist 8000, für RTSP 554.',
    ],
    rtmp:
      'Reolink beschreibt RTMP als Stream, den Software von der Kamera abruft (rtmp://<IP-Adresse>/bcs/channel0_main.bcs?channel=<Kanal>&stream=0&user=<Benutzername>&password=<Passwort>), nicht als Push an einen fremden Server, und RTMP unterstützt nur H.264-kodierte Videos. Für Camzify ist RTSP der einfachere Weg.',
    notes: [
      'Akkubetriebene WLAN-Kameras wie die Argus- und Altas-Serien bieten RTSP und ONVIF nicht eigenständig an: Laut Reolink müssen sie mit einem Reolink Home Hub verbunden sein, und jede Vorschau-Sitzung einer Akkukamera dauert höchstens 5 Minuten.',
      'Die 4G-LTE-Kameras von Reolink (Go-Serie, TrackMix LTE, Duo 2 LTE) unterstützen weder RTSP noch ONVIF. PoE- und Plug-in-WLAN-Kameras, etwa die RLC- und Duo-Serien, unterstützen beides eigenständig.',
      'Reolink rät, für das Passwort, das in der RTSP-URL steht, keine Sonderzeichen zu verwenden.',
      'Klappt die Verbindung nicht, nennt Reolink diese Schritte: alle Port-Schalter einschalten, die neueste Firmware installieren, prüfen, ob die Software den Codec der Kamera (etwa H.265) unterstützt, und die Sperre für illegale Anmeldungen deaktivieren.',
    ],
    faqs: [
      { question: 'Wie lautet die RTSP-URL einer Reolink-Kamera?', answer: 'rtsp://<Benutzername>:<Passwort>@<IP-Adresse>/Preview_01_main für den Hauptstream und Preview_01_sub für den Substream, auf dem Standard-RTSP-Port 554. Über ein Reolink-NVR gelten die Zugangsdaten des NVR und die Kanalnummer statt 01.' },
      { question: 'Warum streamt meine Reolink-Kamera nicht über RTSP?', answer: 'Bei vielen Modellen sind die RTSP- und ONVIF-Ports standardmäßig deaktiviert; aktivieren Sie sie unter Netzwerk > Fortgeschritten > Servereinstellungen. Akkumodelle streamen nur über einen Reolink Home Hub, und die 4G-LTE-Modelle unterstützen RTSP gar nicht.' },
      { question: 'Kann Camzify KI-Erkennungen und Rundgänge auf Reolink-Kameras ausführen?', answer: 'Ja. Sobald der RTSP-Stream der Kamera hinzugefügt ist, führt Camzify den KI-gestützten Wächterrundgang, seine KI-Erkennungen und die Cloud-Aufzeichnung darauf aus wie auf jeder anderen Kamera. Die Erkennungen stammen von Camzify und hängen nicht von der Smart-Erkennung der Kamera ab.' },
      { question: 'Brauche ich eine Portweiterleitung, um eine Reolink-Kamera anzubinden?', answer: 'Nein. Eine Kamera, die nur im lokalen Netzwerk erreichbar ist, wird über den Camzify Connector angebunden, der auf einem Windows-, macOS- oder Linux-Rechner in diesem Netzwerk läuft, ohne Portweiterleitung.' },
    ],
    sources: [
      { title: 'Reolink: Einführung in RTSP', url: 'https://support.reolink.com/de/articles/900000630706-Einf%C3%BChrung-in-RTSP/' },
      { title: 'Reolink: Reolink-Kameras über den VLC Media Player als Live-Ansicht ansehen', url: 'https://support.reolink.com/de/articles/360007010473-Reolink-Kameras-%C3%BCber-den-VLC-Media-Player-als-Live-Ansicht-ansehen/' },
      { title: 'Reolink: Reolink Port-Einstellungen konfigurieren', url: 'https://support.reolink.com/de/articles/900000621783-Reolink-Port-Einstellungen-konfigurieren/' },
      { title: 'Reolink: Einführung in das ONVIF-Protokoll', url: 'https://support.reolink.com/de/articles/360008718893-Einf%C3%BChrung-in-das-ONVIF-Protokoll/' },
      { title: 'Reolink: Welche Reolink-Produkte unterstützen CGI/RTSP/ONVIF', url: 'https://support.reolink.com/de/articles/900000617826-Welche-Reolink-Produkte-unterst%C3%BCtzen-CGI-RTSP-ONVIF/' },
      { title: 'Reolink: Einführung in das Real-Time Messaging Protocol (RTMP)', url: 'https://support.reolink.com/de/articles/23528840063769-Einf%C3%BChrung-in-das-Real-Time-Messaging-Protocol-RTMP/' },
      { title: 'Reolink: Reolink RTSP/ONVIF/RTMP funktioniert nicht', url: 'https://support.reolink.com/de/articles/900002151566-Reolink-RTSP-ONVIF-RTMP-funktioniert-nicht/' },
    ],
    checked: '8. Oktober 2026',
  },
];
