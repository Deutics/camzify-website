import { Metadata } from 'next';
import { siteConfig, absoluteUrl } from '@/lib/site-config';
import { alternatesFor, localeFromPath, LOCALES } from '@/lib/i18n';

/**
 * Builds page metadata with the parts that are easy to forget and expensive to omit:
 * an absolute canonical, per-page OpenGraph/Twitter cards, and explicit robots
 * directives including `max-image-preview:large` (required for large image previews
 * in Google Discover and AI Overviews).
 *
 * `path` must be site-relative, e.g. '/pricing'.
 */
export function generatePageMeta({
  title,
  description,
  path,
  image,
  type = 'website',
  publishedTime,
  modifiedTime,
  noIndex = false,
  locale,
  hreflang,
}: {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
  noIndex?: boolean;
  /** OpenGraph locale, e.g. 'de_DE'. Derived from the path (/de/... is German) when omitted. */
  locale?: string;
  /**
   * hreflang alternates, keyed by BCP-47 tag plus 'x-default'. Derived from the
   * translation registry in lib/i18n.ts when omitted, which is the normal case: declare
   * the pair there, not here, so both sides always agree.
   */
  hreflang?: Record<string, string>;
}): Metadata {
  const url = absoluteUrl(path);
  const ogLocale = locale ?? (localeFromPath(path) === 'de' ? LOCALES.de.og : siteConfig.locale);
  const languages = hreflang ?? alternatesFor(path);
  // The root app/opengraph-image.tsx card is only attached to the root segment's own
  // metadata. A page that exports its own `metadata` (every page but the homepage)
  // replaces the openGraph object and loses the card, so social shares and AI answer
  // engines saw no image on 130 of 131 pages. Fall back to the generated card
  // explicitly; a page can still supply its own.
  const ogImage = absoluteUrl(image ?? '/opengraph-image');

  return {
    title,
    description,
    alternates: {
      canonical: url,
      ...(languages
        ? { languages: Object.fromEntries(Object.entries(languages).map(([lang, p]) => [lang, absoluteUrl(p)])) }
        : {}),
    },
    openGraph: {
      title,
      description,
      url,
      siteName: siteConfig.name,
      locale: ogLocale,
      type,
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
      ...(publishedTime ? { publishedTime } : {}),
      ...(modifiedTime ? { modifiedTime } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
    robots: noIndex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
          },
        },
  };
}
