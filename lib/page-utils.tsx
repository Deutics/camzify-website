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
}: {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
  noIndex?: boolean;
}): Metadata {
  const url = absoluteUrl(path);
  // `image` is only set when a page supplies its own card. Left undefined, the root
  // app/opengraph-image.tsx convention supplies a correctly-sized 1200×630 card —
  // setting `images` unconditionally here would override that everywhere.
  const ogImage = image ? absoluteUrl(image) : undefined;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      type,
      ...(ogImage ? { images: [{ url: ogImage, width: 1200, height: 630, alt: title }] } : {}),
      ...(publishedTime ? { publishedTime } : {}),
      ...(modifiedTime ? { modifiedTime } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      ...(ogImage ? { images: [ogImage] } : {}),
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
