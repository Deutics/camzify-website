/**
 * Stand-in for a feature page's hero photograph.
 *
 * The brief was placeholders the business can replace later. The old placeholder was a
 * gray box with an icon and the word VISUAL in a crimson tag — honest, but it made
 * every sub-page look unfinished, and a buyer does not distinguish "not yet supplied"
 * from "broken".
 *
 * This renders something presentable in the meantime: a console-framed camera wall
 * built from the site's own synthesized frames, labelled for the page it sits on. It
 * reads as product rather than as an empty slot, and the page ships looking finished.
 *
 * TO REPLACE: drop the photograph in public/, run scripts/optimise-images.py, and pass
 * a <SiteImage> as the hero's `visual` instead of this component. `data-replace="hero"`
 * is on the root so the remaining instances can be found with one grep.
 *
 * Frames come from public/cam-*.jpg — synthesized scenes, no third-party copyright,
 * see scripts/assets/camera-frames.html.
 */
const DEFAULT_FRAMES = [
  { src: '/cam-06.jpg', id: 'CAM 01', loc: 'MAIN GATE' },
  { src: '/cam-02.jpg', id: 'CAM 04', loc: 'LOADING DOCK' },
  { src: '/cam-03.jpg', id: 'CAM 09', loc: 'SERVER CORRIDOR' },
  { src: '/cam-04.jpg', id: 'CAM 02', loc: 'PARKING LOT A' },
];

export function HeroPlaceholder({
  label,
  alt,
  frames = DEFAULT_FRAMES,
  active = 0,
}: {
  /** Chrome-bar label, e.g. "Patrol sequence · Perimeter round". */
  label: string;
  alt: string;
  frames?: { src: string; id: string; loc: string }[];
  /** Which tile is highlighted as the current stop. */
  active?: number;
}) {
  return (
    <figure
      data-replace="hero"
      role="img"
      aria-label={alt}
      className="console-panel corner-ticks w-full min-w-0 max-w-full overflow-hidden"
    >
      <div className="flex items-center gap-2 border-b border-border bg-muted/30 px-4 py-2.5">
        <span className="flex gap-1.5" aria-hidden="true">
          <span className="h-2 w-2 rounded-full bg-muted-foreground/25" />
          <span className="h-2 w-2 rounded-full bg-muted-foreground/25" />
          <span className="h-2 w-2 rounded-full bg-muted-foreground/25" />
        </span>
        <span className="font-mono text-mono-sm uppercase text-muted-foreground">{label}</span>
        <span className="ml-auto flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-live">
          <span className="h-1.5 w-1.5 rounded-full bg-live motion-safe:animate-pulse-dot" aria-hidden="true" />
          Live
        </span>
      </div>

      <div className="grid grid-cols-2 gap-2 p-3">
        {frames.slice(0, 4).map((f, i) => {
          const isActive = i === active;
          return (
            <div
              key={f.id}
              className={`camera-tile-frame relative overflow-hidden rounded-lg border ${
                isActive ? 'border-primary/60' : 'border-border'
              }`}
            >
              <img
                src={f.src}
                alt=""
                aria-hidden="true"
                width={480}
                height={270}
                loading={i === 0 ? 'eager' : 'lazy'}
                className={`aspect-video h-full w-full object-cover ${isActive ? 'opacity-95' : 'opacity-75'}`}
              />
              <div aria-hidden="true" className="camera-tile-scrim absolute inset-0" />
              <div className="camera-tile absolute inset-0 flex flex-col justify-between p-2.5">
                <div className="flex items-center justify-between">
                  <span className={`font-mono text-[10px] uppercase tracking-wider ${isActive ? 'text-live' : 'camera-tile-label'}`}>
                    {f.id}
                  </span>
                  {isActive && <span className="h-1.5 w-1.5 rounded-full bg-live" aria-hidden="true" />}
                </div>
                <span className="font-mono camera-tile-label text-[9px] uppercase tracking-wider">{f.loc}</span>
              </div>
            </div>
          );
        })}
      </div>

      <figcaption className="border-t border-border px-4 py-2 text-[11px] text-muted-foreground">
        Console view with sample cameras. Interface illustration, not customer footage.
      </figcaption>
    </figure>
  );
}
