import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { RoadmapBadge } from './roadmap-badge';

export function FeatureCard({
  icon,
  title,
  description,
  href,
  isRoadmap = false,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  href: string;
  isRoadmap?: boolean;
}) {
  return (
    <Link
      href={href ?? '/'}
      className="group relative flex flex-col rounded-xl border border-border bg-card p-6 transition-all duration-200 hover:border-primary/30 hover:shadow-lg hover:-translate-y-1"
    >
      <div className="flex items-start justify-between">
        <div className="rounded-lg bg-primary/10 p-2.5 text-primary transition-colors group-hover:bg-primary/15">
          {icon}
        </div>
        {isRoadmap && <RoadmapBadge />}
        {!isRoadmap && (
          <span className="font-mono text-mono-sm text-live uppercase">
            Live
          </span>
        )}
      </div>
      <h3 className="mt-4 font-display text-lg font-bold">{title ?? ''}</h3>
      <p className="mt-2 flex-1 text-sm text-muted-foreground">{description ?? ''}</p>
      <div className="mt-4 flex items-center gap-1 text-sm font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
        Learn more <ArrowRight className="h-3.5 w-3.5" />
      </div>
    </Link>
  );
}
