import Image from 'next/image';

/**
 * A continuously scrolling strip of logos, on white plates.
 *
 * Shared by the customer strip under the homepage hero and the camera-brand strip
 * lower down. Both are recognition surfaces — a visitor scanning for a name they know,
 * not looking one up — which is the case where motion earns its place. Reference
 * surfaces keep a grid: /supported-cameras carries a protocol note under each brand
 * and you cannot scan moving text for one word.
 *
 * Two strips on one page would read as the same trick twice, so the caller picks a
 * direction; the two on the homepage run opposite ways.
 *
 * Mechanics: the set is rendered twice inside a `w-max` track animated across exactly
 * half its width, which is what makes the loop seamless. The second copy is
 * `aria-hidden` so a screen reader is not read every name twice.
 *
 * Motion is off under `prefers-reduced-motion` — the track wraps and sits still,
 * showing every logo rather than freezing mid-scroll with half of them out of frame.
 * It pauses on hover and on keyboard focus, which is what WCAG 2.2.2 asks of content
 * that moves on its own for more than five seconds.
 *
 * Every mark sits on a white plate in both themes. These are colour marks — brand reds,
 * blues and golds — and inverting or recolouring a trademark is worse than omitting it.
 */
export interface MarqueeItem {
  name: string;
  logo: string;
}

function Mark({ name, logo }: MarqueeItem) {
  return (
    <span className="brand-plate flex h-16 w-40 shrink-0 items-center justify-center rounded-lg px-5">
      <Image
        src={logo}
        alt={name}
        width={180}
        height={44}
        className="max-h-10 w-auto max-w-[130px] object-contain"
      />
    </span>
  );
}

export function LogoMarquee({
  items,
  direction = 'left',
  className = '',
}: {
  items: MarqueeItem[];
  direction?: 'left' | 'right';
  className?: string;
}) {
  const anim = direction === 'left' ? 'motion-safe:animate-logo-marquee' : 'motion-safe:animate-logo-marquee-reverse';

  return (
    <div className={`group relative ${className}`}>
      {/*
        Marks fade at both edges instead of being sliced by the container. Done with a
        mask on the strip rather than gradient overlays in a background colour: the
        sections these sit in use different tints, and a mask is correct over any
        backdrop. Dropped under reduced motion — nothing is moving, so nothing to soften.
      */}
      <div className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_7%,black_93%,transparent)] [-webkit-mask-image:linear-gradient(to_right,transparent,black_7%,black_93%,transparent)] motion-reduce:overflow-visible motion-reduce:[mask-image:none] motion-reduce:[-webkit-mask-image:none]">
        <ul
          className={`flex w-max gap-4 ${anim} motion-safe:group-hover:[animation-play-state:paused] motion-safe:group-focus-within:[animation-play-state:paused] motion-reduce:w-full motion-reduce:flex-wrap motion-reduce:justify-center`}
        >
          {items.map((b) => (
            <li key={b.name}>
              <Mark name={b.name} logo={b.logo} />
            </li>
          ))}
          {/* Second pass: the thing that makes the loop seamless, and nothing a reader needs. */}
          {items.map((b) => (
            <li key={`${b.name}-loop`} aria-hidden="true" className="motion-reduce:hidden">
              <Mark name="" logo={b.logo} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
