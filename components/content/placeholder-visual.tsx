import { Camera, BarChart3, Map, ClipboardCheck, FileText, Settings, GitBranch, Building } from 'lucide-react';

const typeIcons: Record<string, any> = {
  dashboard: BarChart3,
  'camera-feed': Camera,
  'patrol-route': Map,
  checklist: ClipboardCheck,
  report: FileText,
  'config-ui': Settings,
  diagram: GitBranch,
  industry: Building,
};

export function PlaceholderVisual({
  type = 'camera-feed',
  caption = '',
  alt = 'Platform visual',
  className = '',
}: {
  type?: string;
  caption?: string;
  alt?: string;
  className?: string;
}) {
  const Icon = typeIcons[type ?? ''] ?? Camera;

  return (
    <div
      className={`relative overflow-hidden rounded-xl border border-border bg-card ${className}`}
      data-replace="true"
      role="img"
      aria-label={alt ?? ''}
    >
      <div className="flex aspect-video flex-col items-center justify-center gap-3 p-8">
        <Icon className="h-12 w-12 text-muted-foreground/30" />
        <span className="font-mono text-mono-sm uppercase text-muted-foreground/40">
          {caption || type || 'VISUAL'}
        </span>
        {type === 'camera-feed' && (
          <>
            <div className="absolute left-4 top-4 font-mono text-mono-sm text-muted-foreground/50">
              CAM 07 · LOADING DOCK
            </div>
            <div className="absolute right-4 top-4 flex items-center gap-1.5">
              <span className="h-2 w-2 animate-pulse-dot rounded-full bg-live" />
              <span className="font-mono text-mono-sm text-live">LIVE</span>
            </div>
            <div className="absolute bottom-4 left-4 font-mono text-mono-sm text-muted-foreground/40">
              2024-01-15 02:34:17
            </div>
            {/* Detection bounding box */}
            <div className="absolute left-[30%] top-[35%] h-[30%] w-[20%] rounded border-2 border-primary/60" />
          </>
        )}
      </div>
      {/* Crimson corner tag */}
      <div className="absolute right-0 top-0 rounded-bl-lg bg-primary px-2.5 py-1">
        <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-white">
          Visual
        </span>
      </div>
    </div>
  );
}
