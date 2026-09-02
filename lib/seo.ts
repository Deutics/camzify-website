/**
 * Structured-data builders (schema.org JSON-LD).
 *
 * Two audiences read this output and neither tolerates drift:
 *   1. Search engines — for rich results (FAQ, breadcrumb, product, article, sitelinks).
 *   2. LLM crawlers (GPTBot, ClaudeBot, PerplexityBot, Google-Extended) — for entity
 *      resolution and citation. This is the GEO surface.
 *
 * Rules enforced here so callers can't get them wrong:
 *   - Every `@id`, `url` and BreadcrumbList `item` is an ABSOLUTE URL. Relative values
 *     are silently dropped by Google and misparsed by LLM crawlers.
 *   - Every entity is linked to the shared Organization/WebSite nodes by `@id`, so the
 *     whole site resolves to one entity graph rather than N disconnected islands.
 *   - All identity facts come from `siteConfig`. Never inline them here.
 */
import { siteConfig, formattedAddress, absoluteUrl } from '@/lib/site-config';

/** Stable @id anchors so every page's schema joins the same entity graph. */
export const ORG_ID = `${siteConfig.url}/#organization`;
/** The named author. Stable @id so every Article can reference one Person node. */
export const PERSON_ID = `${siteConfig.url}/about/${siteConfig.author.slug}#person`;
export const WEBSITE_ID = `${siteConfig.url}/#website`;
export const SOFTWARE_ID = `${siteConfig.url}/#software`;

export interface Crumb {
  label: string;
  href?: string;
}

const postalAddress = {
  '@type': 'PostalAddress',
  streetAddress: siteConfig.address.street,
  addressLocality: siteConfig.address.locality,
  addressRegion: siteConfig.address.region,
  postalCode: siteConfig.address.postalCode,
  addressCountry: siteConfig.address.country,
} as const;

/**
 * The root Organization node. Emitted once, in the root layout.
 * Typed as both Organization and LocalBusiness so it can carry a physical address
 * and opening hours while still acting as the publisher for every Article.
 */
export function organizationSchema() {
  return {
    '@type': ['Organization', 'LocalBusiness'],
    '@id': ORG_ID,
    name: siteConfig.name,
    legalName: siteConfig.legalName,
    alternateName: [siteConfig.company, siteConfig.legalName],
    url: siteConfig.url,
    logo: {
      '@type': 'ImageObject',
      '@id': `${siteConfig.url}/#logo`,
      url: absoluteUrl(siteConfig.logo),
      contentUrl: absoluteUrl(siteConfig.logo),
      caption: siteConfig.name,
    },
    image: { '@id': `${siteConfig.url}/#logo` },
    description: siteConfig.description,
    slogan: siteConfig.tagline,
    address: postalAddress,
    telephone: siteConfig.phone,
    email: siteConfig.email,
    areaServed: siteConfig.areaServed.map((name) => ({ '@type': 'Place', name })),
    knowsAbout: [
      'Virtual patrolling',
      'AI video analytics',
      'Video surveillance',
      'Perimeter intrusion detection',
      'Remote guarding',
      'Video management systems',
      'ONVIF and RTSP camera integration',
    ],
    contactPoint: [
      {
        '@type': 'ContactPoint',
        contactType: 'sales',
        telephone: siteConfig.phone,
        email: siteConfig.email,
        areaServed: siteConfig.address.country,
        availableLanguage: ['English'],
      },
      {
        '@type': 'ContactPoint',
        contactType: 'customer support',
        telephone: siteConfig.phone,
        email: siteConfig.email,
        availableLanguage: ['English'],
      },
    ],
    sameAs: siteConfig.sameAs,
  };
}

/**
 * WebSite node with a SearchAction. This is what makes Google render a sitelinks
 * search box, and it tells LLM crawlers the site has an internal search surface.
 */
export function websiteSchema() {
  return {
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    url: siteConfig.url,
    name: siteConfig.name,
    description: siteConfig.description,
    publisher: { '@id': ORG_ID },
    inLanguage: 'en',
  };
}

/**
 * The product itself, as SoftwareApplication. Carries the pricing model without
 * publishing a price we cannot verify — `Offer` with no `price` and an explicit
 * quote-based availability is the correct representation of "contact sales".
 */
export function softwareApplicationSchema() {
  return {
    '@type': 'SoftwareApplication',
    '@id': SOFTWARE_ID,
    name: siteConfig.name,
    applicationCategory: 'SecurityApplication',
    applicationSubCategory: 'Video Surveillance and Virtual Patrolling',
    operatingSystem: 'Web-based, iOS, Android',
    url: siteConfig.url,
    description:
      'Camzify runs scheduled AI patrol rounds across existing IP cameras, checking a per-camera compliance checklist at every point, flagging failures, notifying the assigned guard, and generating a timestamped PDF report.',
    publisher: { '@id': ORG_ID },
    provider: { '@id': ORG_ID },
    featureList: [
      'Automated virtual patrol rounds',
      'Per-camera compliance checklists',
      'Line and zone intrusion detection',
      'Camera tampering detection',
      'Multi-object tracking',
      'AI attribute extraction',
      'PDF patrol reports',
      'Multi-site management',
    ],
    offers: {
      '@type': 'Offer',
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
      // Quote-based: no `price` is published because none is verified.
      url: absoluteUrl('/pricing'),
      seller: { '@id': ORG_ID },
    },
  };
}

/** BreadcrumbList with absolute `item` URLs. Home is always position 1. */
export function breadcrumbSchema(items: Crumb[], currentPath?: string) {
  const trail = items ?? [];
  return {
    '@type': 'BreadcrumbList',
    '@id': `${absoluteUrl(currentPath ?? '/')}#breadcrumb`,
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: siteConfig.url },
      ...trail.map((item, i) => ({
        '@type': 'ListItem',
        position: i + 2,
        name: item?.label ?? '',
        // The final crumb is the current page: schema.org omits `item` on the last entry.
        ...(item?.href && i < trail.length - 1 ? { item: absoluteUrl(item.href) } : {}),
      })),
    ],
  };
}

export interface QA {
  question: string;
  answer: string;
}

/** FAQPage — drives the FAQ rich result and is heavily quoted by AI answer engines. */
export function faqSchema(items: QA[], currentPath?: string) {
  return {
    '@type': 'FAQPage',
    '@id': `${absoluteUrl(currentPath ?? '/')}#faq`,
    mainEntity: (items ?? []).map((item) => ({
      '@type': 'Question',
      name: item?.question ?? '',
      acceptedAnswer: { '@type': 'Answer', text: item?.answer ?? '' },
    })),
  };
}

/** Article node for guides. `dateModified` materially affects freshness ranking. */
/**
 * The Person behind the guides.
 *
 * Emitted once on the author page and referenced by @id from every Article, rather
 * than repeated inline on each one — a single node is what lets a search engine treat
 * eleven bylines as one author with a track record instead of eleven strangers.
 */
export function personSchema() {
  return {
    '@type': 'Person',
    '@id': PERSON_ID,
    name: siteConfig.author.name,
    jobTitle: siteConfig.author.role,
    description: siteConfig.author.credential,
    email: siteConfig.author.email,
    url: absoluteUrl(`/about/${siteConfig.author.slug}`),
    sameAs: [siteConfig.author.linkedin],
    worksFor: { '@id': ORG_ID },
    // Affiliation rather than a second worksFor: the employer relevant to this site is
    // Camzify, and a competing Organization node would reintroduce exactly the entity
    // ambiguity that removing Deutics from the footer was meant to fix.
    affiliation: {
      '@type': 'Organization',
      name: siteConfig.author.alsoLeads.name,
      url: siteConfig.author.alsoLeads.url,
    },
    knowsAbout: [
      'Computer vision',
      'Video surveillance',
      'Video analytics',
      'Virtual patrolling',
      'Physical security operations',
    ],
  };
}

export function articleSchema({
  headline,
  description,
  path,
  datePublished,
  dateModified,
  image,
}: {
  headline: string;
  description: string;
  path: string;
  datePublished: string;
  dateModified?: string;
  image?: string;
}) {
  return {
    '@type': 'Article',
    '@id': `${absoluteUrl(path)}#article`,
    headline,
    description,
    url: absoluteUrl(path),
    mainEntityOfPage: { '@type': 'WebPage', '@id': absoluteUrl(path) },
    datePublished,
    dateModified: dateModified ?? datePublished,
    // Named author rather than the Organization: guides carry a byline now, and the
    // schema has to agree with what the page shows.
    author: { '@id': PERSON_ID },
    publisher: { '@id': ORG_ID },
    image: absoluteUrl(image ?? siteConfig.ogImage),
    isPartOf: { '@id': WEBSITE_ID },
    inLanguage: 'en',
  };
}

/** Service node for industry and use-case pages — the "what we do for whom" entity. */
export function serviceSchema({
  name,
  description,
  path,
  serviceType = 'AI video surveillance and virtual patrolling',
  audience,
}: {
  name: string;
  description: string;
  path: string;
  serviceType?: string;
  audience?: string;
}) {
  return {
    '@type': 'Service',
    '@id': `${absoluteUrl(path)}#service`,
    name,
    description,
    serviceType,
    url: absoluteUrl(path),
    provider: { '@id': ORG_ID },
    areaServed: siteConfig.areaServed.map((a) => ({ '@type': 'Place', name: a })),
    ...(audience ? { audience: { '@type': 'BusinessAudience', name: audience } } : {}),
  };
}

/** HowTo node for the camera-connectivity setup walkthroughs. */
export function howToSchema({
  name,
  description,
  path,
  steps,
}: {
  name: string;
  description: string;
  path: string;
  steps: { name: string; text: string }[];
}) {
  return {
    '@type': 'HowTo',
    '@id': `${absoluteUrl(path)}#howto`,
    name,
    description,
    url: absoluteUrl(path),
    publisher: { '@id': ORG_ID },
    step: (steps ?? []).map((s, i) => ({
      '@type': 'HowToStep',
      position: i + 1,
      name: s?.name ?? '',
      text: s?.text ?? '',
      url: `${absoluteUrl(path)}#step-${i + 1}`,
    })),
  };
}

/** WebPage node tying an individual page back into the site graph. */
export function webPageSchema({
  name,
  description,
  path,
}: {
  name: string;
  description: string;
  path: string;
}) {
  return {
    '@type': 'WebPage',
    '@id': absoluteUrl(path),
    url: absoluteUrl(path),
    name,
    description,
    isPartOf: { '@id': WEBSITE_ID },
    about: { '@id': ORG_ID },
    inLanguage: 'en',
  };
}

/**
 * Wraps any set of nodes in a single `@graph`.
 *
 * Emitting one graph per page rather than N sibling <script> tags is what lets
 * crawlers resolve the `@id` cross-references between nodes — it is the difference
 * between "some JSON-LD" and a connected entity graph.
 */
export function graph(...nodes: object[]) {
  return {
    '@context': 'https://schema.org',
    '@graph': nodes.filter(Boolean),
  };
}
