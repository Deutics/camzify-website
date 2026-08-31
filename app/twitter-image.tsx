/**
 * Twitter/X card image. Re-exports the Open Graph card so the two can never diverge —
 * Next only applies `opengraph-image` to `twitter:image` when a twitter-image file
 * is absent, and being explicit here keeps both tags pointing at the same generated
 * 1200×630 asset.
 */
export { runtime, alt, size, contentType, default } from './opengraph-image';
