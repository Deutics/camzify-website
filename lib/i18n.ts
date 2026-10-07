/**
 * Languages and translated pages: the single source of truth.
 *
 * The site is English first. A subset of pages has a German counterpart under /de, and
 * this file is the one place that pairing is declared. Everything else derives from it:
 *
 *   - hreflang: generatePageMeta() looks the page's path up here and emits the
 *     `alternates.languages` pair on BOTH sides, so a pair can never be one-sided.
 *   - the header's language menu: sends a visitor to this page's counterpart, or to
 *     the German home when the page has none.
 *   - the sitemap's `de` group.
 *   - scripts/check-translations.py, which fails when a pair points at a missing file
 *     and flags a German page whose English source changed after it was translated.
 *
 * ADDING A TRANSLATED PAGE
 *   1. Create app/de/<slug>/page.tsx from the English page (docs/I18N.md has the rules).
 *   2. Add the pair below with `sourceHash: ''`.
 *   3. Run `python3 scripts/check-translations.py --stamp /de/<slug>` to record which
 *      version of the English page it was translated from.
 *
 * WHEN THE ENGLISH PAGE CHANGES
 *   check-translations.py reports the pair as stale. Carry the change into the German
 *   page, then stamp it again. Stamping without updating the German page defeats the
 *   check, so do not.
 */

export type Locale = 'en' | 'de';

export const LOCALES: Record<Locale, { htmlLang: string; hreflang: string; og: string; label: string; short: string; home: string }> = {
  en: { htmlLang: 'en', hreflang: 'en-US', og: 'en_US', label: 'English', short: 'EN', home: '/' },
  de: { htmlLang: 'de', hreflang: 'de-DE', og: 'de_DE', label: 'Deutsch', short: 'DE', home: '/de' },
};

export function localeFromPath(path: string | null | undefined): Locale {
  if (!path) return 'en';
  return path === '/de' || path.startsWith('/de/') ? 'de' : 'en';
}

export interface TranslationPair {
  en: string;
  de: string;
  /**
   * First 12 hex characters of the SHA-256 of the English page's source file at the
   * time the German page was last brought in line with it. Written by
   * `scripts/check-translations.py --stamp`; never edited by hand.
   */
  sourceHash: string;
}

export const translations: TranslationPair[] = [
  // Pilot, September 2026
  { en: '/', de: '/de', sourceHash: '0418913979af' },
  { en: '/virtual-guard', de: '/de/virtueller-waechterrundgang', sourceHash: '0c55e683e5cf' },
  { en: '/cloud-video-surveillance', de: '/de/cloud-videomanagementsystem', sourceHash: 'a85dfd1fc8dc' },
  { en: '/guides/what-is-intelligent-video-analytics', de: '/de/ki-videoanalyse', sourceHash: '9ef9cd0f0dfb' },
  { en: '/partners/for-security-agencies', de: '/de/fuer-sicherheitsdienste', sourceHash: '523d760b2ff8' },
  { en: '/partners/for-security-integrators', de: '/de/fuer-installateure', sourceHash: '7508ad8aad42' },

  // Virtual patrolling
  { en: '/virtual-patrolling', de: '/de/ki-waechterrundgang', sourceHash: 'e7fd8e745439' },
  { en: '/virtual-patrolling/how-it-works', de: '/de/ki-waechterrundgang/so-funktioniert-es', sourceHash: '15dd9f7b9e4c' },
  { en: '/virtual-patrolling/automated-patrol-scheduling', de: '/de/ki-waechterrundgang/automatische-planung', sourceHash: '5cea897fdc37' },
  { en: '/virtual-patrolling/patrol-checklists', de: '/de/ki-waechterrundgang/checklisten', sourceHash: 'b3d6dcf89d92' },
  { en: '/virtual-patrolling/patrol-reports', de: '/de/ki-waechterrundgang/kontrollprotokolle', sourceHash: '6177648e170b' },
  { en: '/virtual-patrolling/guard-notifications', de: '/de/ki-waechterrundgang/benachrichtigungen', sourceHash: '9825bd76ad92' },
  { en: '/virtual-patrolling/patrol-compliance-tracking', de: '/de/ki-waechterrundgang/digitales-wachbuch', sourceHash: '65350fed8f4d' },
  { en: '/virtual-patrolling/risk-detection', de: '/de/ki-waechterrundgang/risikoerkennung', sourceHash: '2b83880ab6ee' },
  { en: '/virtual-patrolling/vs-security-guards', de: '/de/ki-waechterrundgang/vergleich-wachpersonal', sourceHash: '3d5730175beb' },

  // Platform
  { en: '/platform', de: '/de/plattform', sourceHash: 'e15bcf891f3f' },
  { en: '/platform/live-streaming', de: '/de/plattform/live-streaming', sourceHash: 'ff03ca91ad98' },
  { en: '/platform/video-backup-and-retention', de: '/de/plattform/videospeicherung', sourceHash: '55f033e829bc' },
  { en: '/platform/multi-site-management', de: '/de/plattform/mehrere-standorte', sourceHash: '58009f121a5c' },
  { en: '/platform/notifications-and-alerts', de: '/de/plattform/alarme-und-benachrichtigungen', sourceHash: 'd68cdc050e98' },
  { en: '/platform/deployment-options', de: '/de/plattform/bereitstellung', sourceHash: '6c152eebef5c' },
  { en: '/platform/user-management', de: '/de/plattform/benutzerverwaltung', sourceHash: 'e1e8e9e7e506' },

  // AI detections
  { en: '/ai-features', de: '/de/ki-funktionen', sourceHash: '74f2acd59a41' },
  { en: '/ai-features/zone-intrusion-detection', de: '/de/ki-funktionen/bereichsueberwachung', sourceHash: '264f6a75a6bb' },
  { en: '/ai-features/line-intrusion-detection', de: '/de/ki-funktionen/linienueberschreitung', sourceHash: 'c6bb271fbbf9' },
  { en: '/ai-features/loitering-detection', de: '/de/ki-funktionen/verweilerkennung', sourceHash: '2cd739d014a3' },
  { en: '/ai-features/fire-and-smoke-detection', de: '/de/ki-funktionen/feuer-und-rauch-erkennung', sourceHash: 'f917bf1828de' },
  { en: '/ai-features/ppe-violation-detection', de: '/de/ki-funktionen/psa-erkennung', sourceHash: '105c926cbfad' },
  { en: '/ai-features/camera-tampering-detection', de: '/de/ki-funktionen/sabotageerkennung', sourceHash: '442038ead4a9' },
  { en: '/ai-features/custom-detections', de: '/de/ki-funktionen/individuelle-erkennungen', sourceHash: 'c448812ec067' },

  // Partners
  { en: '/partners', de: '/de/partner', sourceHash: 'e6848d67821d' },
  { en: '/partners/for-monitoring-centers', de: '/de/fuer-leitstellen', sourceHash: '8da3fa4a24e3' },
  { en: '/partners/for-managed-service-providers', de: '/de/fuer-managed-service-provider', sourceHash: 'fc827b4e4c9d' },
  { en: '/partners/become-a-reseller', de: '/de/reseller-werden', sourceHash: '8e28a60bfc09' },

  // Industries
  { en: '/industries', de: '/de/branchen', sourceHash: '3247e76491f5' },
  { en: '/industries/manufacturing', de: '/de/branchen/industrie-und-produktion', sourceHash: 'fdaa16b9d900' },
  { en: '/industries/warehouses', de: '/de/branchen/lager-und-logistik', sourceHash: '5f42b24ca62c' },
  { en: '/industries/construction-sites', de: '/de/branchen/baustellen', sourceHash: '0cb2a969af6f' },

  // Buying and trust
  { en: '/pricing', de: '/de/preise', sourceHash: '59e579252dad' },
  { en: '/security-and-compliance', de: '/de/sicherheit-und-datenschutz', sourceHash: 'b6ae1839138b' },
  { en: '/supported-cameras', de: '/de/unterstuetzte-kameras', sourceHash: '4099c0a3ffcd' },
  { en: '/supported-cameras/reolink', de: '/de/unterstuetzte-kameras/reolink', sourceHash: 'dcdafcf21ea2' },
  { en: '/camzify-connector', de: '/de/camzify-connector', sourceHash: '76cce2afb081' },
];

const byEn = new Map(translations.map((t) => [t.en, t]));
const byDe = new Map(translations.map((t) => [t.de, t]));

function normalize(path: string): string {
  const clean = path.split(/[?#]/)[0] || '/';
  return clean.length > 1 ? clean.replace(/\/+$/, '') : clean;
}

/** The page's counterpart in `target`, or null when it has none. */
export function counterpartOf(path: string, target: Locale): string | null {
  const p = normalize(path);
  const pair = byEn.get(p) ?? byDe.get(p);
  if (!pair) return null;
  return pair[target];
}

/** hreflang alternates for a translated page (both sides), or undefined when it has no pair. */
export function alternatesFor(path: string): Record<string, string> | undefined {
  const p = normalize(path);
  const pair = byEn.get(p) ?? byDe.get(p);
  if (!pair) return undefined;
  return {
    [LOCALES.en.hreflang]: pair.en,
    [LOCALES.de.hreflang]: pair.de,
    'x-default': pair.en,
  };
}

/** Every German path, in registry order, for the sitemap. */
export const germanPaths: string[] = translations.map((t) => t.de);

/**
 * The link target for `href` on a page in `locale`: its German counterpart when the
 * registry has one, otherwise `href` unchanged (an English-only page). Hash fragments
 * are kept. Use it in shared components that render in both languages.
 */
export function hrefFor(href: string, locale: Locale): string {
  if (locale === 'en') return href;
  const [path, hash] = href.split('#');
  const target = counterpartOf(path || '/', locale);
  if (!target) return href;
  return hash ? `${target}#${hash}` : target;
}

/** True when `href` has no page in `locale`, so a German page links out to English. */
export function isForeignFor(href: string, locale: Locale): boolean {
  if (locale === 'en') return false;
  const path = href.split('#')[0] || '/';
  if (!path.startsWith('/')) return false;
  return counterpartOf(path, locale) === null;
}
