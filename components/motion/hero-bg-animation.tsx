export function HeroBgAnimation() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {/* Hidden SVG grade filter — subtle contrast/warmth pass, mirrors a video color-grade LUT */}
      <svg className="absolute h-0 w-0 overflow-hidden">
        <defs>
          <filter id="heroGrade" colorInterpolationFilters="sRGB">
            <feComponentTransfer>
              <feFuncR type="gamma" amplitude="1" exponent="0.92" offset="0.01" />
              <feFuncG type="gamma" amplitude="1" exponent="0.97" offset="0" />
              <feFuncB type="gamma" amplitude="0.94" exponent="1.04" offset="0" />
            </feComponentTransfer>
          </filter>
        </defs>
      </svg>

      {/* Plate 1: drifting security-grid texture, graded */}
      <div
        className="absolute inset-0 animate-hero-grid-pan opacity-[0.16]"
        style={{
          filter: 'url(#heroGrade)',
          backgroundImage:
            'linear-gradient(rgba(199,27,28,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(199,27,28,0.5) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />

      {/* Plate 2: soft additive glows, lifted lower-right — the "bg2" pass */}
      <div className="absolute inset-0 mix-blend-plus-lighter [mask-image:linear-gradient(180deg,transparent_0%,#000_55%)]">
        <div
          className="absolute -right-[10%] top-[10%] h-[55%] w-[55%] animate-hero-glow-drift-a rounded-full blur-3xl"
          style={{ background: 'radial-gradient(circle, rgba(199,27,28,0.35) 0%, rgba(199,27,28,0) 70%)' }}
        />
        <div
          className="absolute -right-[5%] bottom-[5%] h-[45%] w-[45%] animate-hero-glow-drift-b rounded-full blur-3xl"
          style={{ background: 'radial-gradient(circle, rgba(255,90,90,0.28) 0%, rgba(255,90,90,0) 70%)' }}
        />
      </div>

      {/* Scan sweep — a single light band drifting down, radar/CCTV feel */}
      <div
        className="absolute inset-x-0 top-0 h-1/3 animate-hero-scan-sweep"
        style={{
          background:
            'linear-gradient(180deg, transparent 0%, rgba(199,27,28,0.10) 45%, rgba(255,255,255,0.04) 50%, rgba(199,27,28,0.10) 55%, transparent 100%)',
        }}
      />

      {/* Bottom scrim — keeps foreground copy legible over the animation */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-background/40" />
    </div>
  );
}
