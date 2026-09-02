import { SiteImage } from '@/components/content/site-image';

/**
 * A product screenshot in a console frame, matched to the visitor's theme.
 *
 * Every screen is captured twice — `<name>-light.jpg` and `<name>-dark.jpg` — because
 * a baked-dark screenshot sitting in a light-themed page looks like a mistake. Pass
 * `src` as the base path with no suffix or extension: "/product-dashboard".
 *
 * Both variants are in the markup and one is hidden with `dark:hidden` / `dark:block`.
 * That is deliberate rather than a JS theme swap: the site themes by class through
 * next-themes, so a CSS media query would not track the actual theme, and a
 * `useTheme()` swap would render the wrong variant on the server and flash after
 * hydration.
 *
 * Cost, measured rather than assumed: a `display:none` lazy image never intersects the
 * viewport, so it is not fetched. Walking the whole page in dark mode pulled four dark
 * files and one light one — the single leak is the shot highest in the document, which
 * the browser's preload scanner starts fetching before CSS has applied. So the real
 * cost is one extra file per page, not one per shot.
 *
 * `priority` opts out of that entirely: an eager image loads regardless of display, so
 * a priority shot always costs both files. Only set it for a genuine LCP element.
 *
 * `label` renders in the chrome bar so each shot is identified as the Camzify console.
 * Figures inside are interface illustrations, not customer data — stated once per page.
 */
export function ProductShot({
  src,
  alt,
  label,
  priority = false,
  className = '',
  sizes = '(max-width: 1024px) 100vw, 55vw',
}: {
  /** Base path without theme suffix or extension, e.g. "/product-dashboard". */
  src: string;
  alt: string;
  label: string;
  priority?: boolean;
  className?: string;
  sizes?: string;
}) {
  const base = src.replace(/(-(?:light|dark))?\.jpg$/, '');
  const shared = {
    alt,
    width: 1600,
    height: 1224,
    sizes,
    priority,
  };

  return (
    <figure
      className={`group relative overflow-hidden rounded-xl border border-border bg-card shadow-2xl shadow-black/40 ${className}`}
    >
      <div className="flex items-center gap-2 border-b border-border bg-background/60 px-4 py-2.5">
        <span className="flex gap-1.5" aria-hidden="true">
          <span className="h-2 w-2 rounded-full bg-muted-foreground/25" />
          <span className="h-2 w-2 rounded-full bg-muted-foreground/25" />
          <span className="h-2 w-2 rounded-full bg-muted-foreground/25" />
        </span>
        <span className="font-mono text-mono-sm uppercase text-muted-foreground">{label}</span>
      </div>

      <SiteImage
        {...shared}
        src={`${base}-light.jpg`}
        className="w-full transition-transform duration-slow ease-out dark:hidden motion-safe:group-hover:scale-[1.015]"
      />
      <SiteImage
        {...shared}
        src={`${base}-dark.jpg`}
        // Empty alt on the duplicate: the light variant above already carries the
        // description, and announcing the same image twice is noise for screen readers.
        alt=""
        aria-hidden="true"
        className="hidden w-full transition-transform duration-slow ease-out dark:block motion-safe:group-hover:scale-[1.015]"
      />
    </figure>
  );
}
