export function HeroBgAnimation() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {/*
        Plate 1: drifting security-grid texture. The layer is oversized by two grid
        cells and moved with a transform, so the browser composites it on the GPU
        instead of repainting a background-position change sixty times a second. The
        earlier version also ran an SVG color filter on this layer, which forced a full
        re-rasterization on every frame and pushed the mobile Speed Index past 14s.
      */}
      <div className="absolute inset-0 overflow-hidden opacity-[0.16]">
        <div
          className="absolute -inset-24 animate-hero-grid-pan will-change-transform"
          style={{
            backgroundImage:
              'linear-gradient(rgba(199,27,28,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(199,27,28,0.5) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />
      </div>

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
