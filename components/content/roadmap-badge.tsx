import { Clock } from 'lucide-react';

export function RoadmapBadge({ className = '' }: { className?: string }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full bg-warn/15 px-3 py-1 font-mono text-mono-sm uppercase text-warn ${className}`}
    >
      <Clock className="h-3 w-3" />
      On the Roadmap
    </span>
  );
}
