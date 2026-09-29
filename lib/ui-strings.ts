import type { Locale } from '@/lib/i18n';

/**
 * Interface strings for the shared chrome (header, footer, breadcrumbs, the closing
 * CTA band, the FAQ block, the cookie banner), one entry per locale.
 *
 * Page copy does not go here: each German page carries its own text. This file is only
 * for the words that shared components render on every page, which is what lets the
 * same component serve both languages instead of being forked per locale.
 *
 * German strings are drafted, not yet reviewed by a native speaker; see docs/I18N.md.
 */
const en = {
  skipToContent: 'Skip to content',
  home: 'Home',
  homeLabel: 'Camzify home',
  signIn: 'Sign in',
  signInConsole: 'Sign in to the console',
  bookDemo: 'Book a Demo',
  theme: 'Theme',
  language: 'Language',
  languageMenu: 'Choose a language',
  languageSamePage: 'This page in English',
  languageHomeFallback: 'English home page',
  openMenu: 'Open menu',
  closeMenu: 'Close menu',
  menuSuffix: 'menu',
  overview: 'overview',
  mainNav: 'Main',
  mobileNav: 'Mobile',
  dismiss: 'Dismiss',
  cta: {
    title: 'Ready to patrol your site 24/7?',
    description: 'Book a 15-minute demo and see a live patrol run on your own cameras.',
    primaryLabel: 'Book a Demo',
    secondaryLabel: 'Calculate Your Savings',
  },
  faqHeading: 'Frequently asked questions',
  cookies: {
    region: 'Cookie consent',
    title: 'Cookies on this site',
    bodyBefore: "With your permission we'd like to use analytics cookies to see how the site is used, so we can improve it. See the",
    policy: 'cookie policy',
    bodyAfter: 'for exactly what that sets.',
    accept: 'Accept',
    reject: 'Reject',
  },
};

export type UiStrings = typeof en;

const de: UiStrings = {
  skipToContent: 'Zum Inhalt springen',
  home: 'Startseite',
  homeLabel: 'Camzify Startseite',
  signIn: 'Anmelden',
  signInConsole: 'In der Konsole anmelden',
  bookDemo: 'Demo anfragen',
  theme: 'Darstellung',
  language: 'Sprache',
  languageMenu: 'Sprache wählen',
  languageSamePage: 'Diese Seite auf Deutsch',
  languageHomeFallback: 'Deutsche Übersicht',
  openMenu: 'Menü öffnen',
  closeMenu: 'Menü schließen',
  menuSuffix: 'Menü',
  overview: 'Übersicht',
  mainNav: 'Hauptnavigation',
  mobileNav: 'Mobile Navigation',
  dismiss: 'Ausblenden',
  cta: {
    title: 'Ihre Standorte rund um die Uhr kontrollieren?',
    description: 'Vereinbaren Sie eine 15-minütige Demo und sehen Sie einen Rundgang live auf Ihren eigenen Kameras.',
    primaryLabel: 'Demo anfragen',
    secondaryLabel: 'Einsparung berechnen',
  },
  faqHeading: 'Häufige Fragen',
  cookies: {
    region: 'Cookie-Einwilligung',
    title: 'Cookies auf dieser Website',
    bodyBefore: 'Mit Ihrer Einwilligung setzen wir Analyse-Cookies ein, um zu sehen, wie die Website genutzt wird, und sie zu verbessern. Was genau gesetzt wird, steht in der',
    policy: 'Cookie-Richtlinie (auf Englisch)',
    bodyAfter: '.',
    accept: 'Akzeptieren',
    reject: 'Ablehnen',
  },
};

export const ui: Record<Locale, UiStrings> = { en, de };

export function t(locale: Locale): UiStrings {
  return ui[locale];
}
