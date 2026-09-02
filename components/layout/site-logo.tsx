import { SiteImage } from '@/components/content/site-image';
import { siteConfig } from '@/lib/site-config';

/**
 * The Camzify wordmark, matched to the active theme.
 *
 * The original asset has a white wordmark, so it was only ever legible on the dark
 * theme — in light mode the lettering disappeared into the background and only the
 * crimson mark survived. There are now two files, named for the theme they belong to:
 *
 *   camzify-logo-dark.png   white wordmark, for the dark theme
 *   camzify-logo-light.png  black wordmark, for the light theme
 *
 * Same class-based swap as ProductShot, for the same reason: the site themes by class
 * through next-themes, so a media query would track the OS rather than the toggle.
 *
 * Both files load here rather than one. That is intentional — the header logo is
 * above the fold and `priority`, and an eager image is fetched regardless of
 * `display`. At ~17KB each the swap is worth the second file; a flash of the wrong
 * wordmark in the masthead is not.
 */
export function SiteLogo({
  className = 'h-9 w-auto',
  priority = false,
}: {
  className?: string;
  priority?: boolean;
}) {
  const shared = {
    alt: siteConfig.name,
    width: 825,
    height: 192,
    priority,
    // The masthead renders it around 150px wide, so a 300px variant covers 1x and a
    // 600px variant covers 2x. Without this the browser has no reason not to take the
    // widest file in the set for a wordmark the height of a line of text.
    sizes: '165px',
  };

  return (
    <>
      <SiteImage {...shared} src="/camzify-logo-light.png" className={`${className} dark:hidden`} />
      <SiteImage
        {...shared}
        src="/camzify-logo-dark.png"
        alt=""
        aria-hidden="true"
        className={`hidden ${className} dark:block`}
      />
    </>
  );
}
