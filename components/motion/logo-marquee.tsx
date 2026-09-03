import Image from 'next/image';
import { cameraBrands } from '@/lib/camera-brands';

/**
 * A continuously scrolling strip of manufacturer logos.
 *
 * This replaces the grid on the homepage only. The two placements do different jobs and
 * want different shapes:
 *
 *   Homepage — recognition. The visitor is scanning for a brand they own, and the
 *   question is "does this work with my cameras". A moving strip carries more marks in
 *   less vertical space and reads as a logo wall rather than a specification.
 *
 *   /supported-cameras — reference. A buyer is checking a specific fleet and reading the
 *   protocol note under each name. You cannot scan moving text for one word, so that
 *   page keeps the grid. Motion there would actively cost the reader something.
 *
 * Only brands with real artwork appear here. Mixed logos and typographic wordmarks look
 * fine in a static grid, where the eye takes the row as a set; scrolling past at speed
 * the wordmarks read as logos that failed to load.
 *
 * Mechanics: the set is rendered twice inside a `w-max` track animated across exactly
 * half its width, which is what makes the loop seamless. The second copy is
 * `aria-hidden` so a screen reader is not read the same eight names twice.
 *
 * Motion is off under `prefers-reduced-motion` — the track then wraps and sits still,
 * showing every logo rather than freezing mid-scroll with half of them out of frame.
 * It also pauses on hover and on keyboard focus, which is what WCAG 2.2.2 asks of
 * content that moves on its own for more than five seconds.
 */
const withLogos = cameraBrands.filter((b) => b.logo);

function Mark({ name, logo }: { name: string; logo: string }) {
  return (
    <span className="brand-plate flex h-16 w-40 shrink-0 items-center justify-center rounded-lg px-5">
      <Image
        src={logo}
        alt={name}
        width={180}
        height={44}
        className="max-h-9 w-auto max-w-[130px] object-contain"
      />
    </span>
  );
}

export function LogoMarquee({ className = '' }: { className?: string }) {
  return (
    <div className={`group relative ${className}`}>
      {/*
        Marks fade out at both edges instead of being sliced by the container.

        Done with a mask on the strip rather than two gradient overlays in the section's
        background colour: this section is `bg-muted/30`, so a `from-background`
        gradient would be a near-match rather than a match, and the seam shows on the
        white plates. A mask fades the content itself and is correct over any backdrop.

        Dropped under reduced motion — nothing is moving, so there is no edge to soften,
        and masking a wrapped block would fade logos that are simply sitting there.
      */}
      <div className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_7%,black_93%,transparent)] [-webkit-mask-image:linear-gradient(to_right,transparent,black_7%,black_93%,transparent)] motion-reduce:overflow-visible motion-reduce:[mask-image:none] motion-reduce:[-webkit-mask-image:none]">
        <ul className="flex w-max gap-4 motion-safe:animate-logo-marquee motion-safe:group-hover:[animation-play-state:paused] motion-safe:group-focus-within:[animation-play-state:paused] motion-reduce:w-full motion-reduce:flex-wrap motion-reduce:justify-center">
          {withLogos.map((b) => (
            <li key={b.name}>
              <Mark name={b.name} logo={b.logo as string} />
            </li>
          ))}
          {/* Second pass: the thing that makes the loop seamless, and nothing a reader needs. */}
          {withLogos.map((b) => (
            <li key={`${b.name}-loop`} aria-hidden="true" className="motion-reduce:hidden">
              <Mark name="" logo={b.logo as string} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
