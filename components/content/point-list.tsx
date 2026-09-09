import type { ReactNode } from 'react';

/*
 * The site's one list treatment for body content: a small dot in the accent colour and
 * a full sentence per item. Used wherever a section's paragraph was really a list of
 * things a reader scans (what a round checks, what gets configured, the scenarios, the
 * limits). Each item should be a complete sentence so an answer engine can quote it on
 * its own; fragments read as a brochure and quote as nothing.
 */
export function PointList({ items, className = '', tone = 'primary' }: { items: ReactNode[]; className?: string; tone?: 'primary' | 'live' | 'warn' | 'critical' }) {
  const dot = { primary: 'bg-primary', live: 'bg-live', warn: 'bg-warn', critical: 'bg-critical' }[tone];
  return (
    <ul className={`mt-4 max-w-prose space-y-2.5 text-muted-foreground ${className}`}>
      {items.map((item, i) => (
        <li key={i} className="flex gap-3">
          <span aria-hidden="true" className={`mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full ${dot}`} />
          <span className="min-w-0">{item}</span>
        </li>
      ))}
    </ul>
  );
}
