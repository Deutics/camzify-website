import { Metadata } from 'next';
import { siteConfig, absoluteUrl } from '@/lib/site-config';

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
  locale = siteConfig.locale,
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
  /** OpenGraph locale for this page, e.g. 'de_DE'. Defaults to the site's own locale. */
  locale?: string;
  /**
   * hreflang alternates for a page with a translated counterpart, keyed by BCP-47 tag
   * plus 'x-default', e.g. { 'de-DE': '/de/...', 'en-US': '/...', 'x-default': '/...' }.
   * Omitted for every page with no translated sibling.
   */
  hreflang?: Record<string, string>;
}): Metadata {
  const url = absoluteUrl(path);
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
      ...(hreflang
        ? { languages: Object.fromEntries(Object.entries(hreflang).map(([lang, p]) => [lang, absoluteUrl(p)])) }
        : {}),
    },
    openGraph: {
      title,
      description,
      url,
      siteName: siteConfig.name,
      locale,
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
