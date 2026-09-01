/**
 * Ambient background for a content section.
 *
 * The hero has a layered atmosphere — drifting grid, glow plates, scan sweep — and
 * every section below it was flat black. That is what made the page read as sparse
 * rather than deliberate: twelve sections with no depth and no differentiation.
 *
 * This reuses the hero's visual language at much lower intensity so sections gain
 * depth without competing with the hero. Purely decorative, so `aria-hidden`, and
 * every animated layer sits behind a `motion-safe:` guard.
 *
 * `variant` positions the glow so consecutive sections do not look identical:
 *   left | right | center — where the warm plate sits
 *   none  — grid texture only, for sections that already carry a lot of colour
 */
export function SectionAtmosphere({
  variant = 'right',
  grid = true,
  intensity = 'normal',
}: {
  variant?: 'left' | 'right' | 'center' | 'none';
  grid?: boolean;
  intensity?: 'subtle' | 'normal';
}) {
  const glowOpacity = intensity === 'subtle' ? 'opacity-40' : 'opacity-70';

  const position =
    variant === 'left'
      ? '-left-[15%] top-[10%]'
      : variant === 'center'
        ? 'left-1/2 top-[5%] -translate-x-1/2'
        : '-right-[15%] top-[8%]';

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {grid && (
        <div
          className="absolute inset-0 opacity-[0.055] [mask-image:radial-gradient(ellipse_at_center,#000_20%,transparent_75%)]"
          style={{
            backgroundImage:
              'linear-gradient(hsl(var(--primary)/0.9) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary)/0.9) 1px, transparent 1px)',
            backgroundSize: '64px 64px',
          }}
        />
      )}

      {variant !== 'none' && (
        <div
          className={`absolute ${position} h-[60%] w-[55%] rounded-full blur-3xl ${glowOpacity} motion-safe:animate-hero-glow-drift-a`}
          style={{
            background:
              'radial-gradient(circle, hsl(var(--primary)/0.16) 0%, hsl(var(--primary)/0) 70%)',
          }}
        />
      )}

      {/* Hairline at the top edge, brightest in the middle — reads as a machined seam
          between sections rather than a flat 1px border. */}
      <div
        className="absolute inset-x-0 top-0 h-px"
        style={{
          background:
            'linear-gradient(90deg, transparent, hsl(var(--primary)/0.35) 50%, transparent)',
        }}
      />
    </div>
  );
}
