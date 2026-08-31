'use client';

import { useRef } from 'react';
import { ScanSearch, Route, Boxes, MessageSquare, Radio, Zap, ChevronDown, Cpu } from 'lucide-react';
import { gsap } from 'gsap';
import { useDeferredGsap, revealTrigger } from '@/hooks/use-deferred-gsap';

// Camzify's real six-layer AI pipeline, in processing order.
const layers = [
  { icon: ScanSearch, name: 'Object Detection', desc: 'Locates people, vehicles, and other objects of interest in each frame.' },
  { icon: Route, name: 'Multi-Object Tracking', desc: 'Follows each detected object across frames to build a continuous path, not isolated snapshots.' },
  { icon: Boxes, name: 'Custom Domain Models', desc: 'Industry-specific object classes trained for the environment being monitored, on top of general detection.' },
  { icon: MessageSquare, name: 'Vision-Language Model', desc: 'Adds attributes and natural-language context to detections rather than just a bounding box and a label.' },
  { icon: Radio, name: 'Signal Analysis', desc: 'Handles tampering, motion gating, and stream health — this layer needs no GPU at all.' },
  { icon: Zap, name: 'Adaptive Inference', desc: 'Skips static frames and puts full attention on active scenes, so compute goes where the activity is.' },
];

export function AiPipelineDiagram() {
  const containerRef = useRef<HTMLDivElement>(null);

  useDeferredGsap(containerRef, ({ prefersReducedMotion, contextSafe }) => {
    const st = revealTrigger(containerRef.current);
    gsap.from(containerRef.current, { opacity: 0, y: 24, duration: 0.6, ease: 'power2.out', scrollTrigger: st });

    // Hover: layer cards lift slightly (motion only — Tailwind handles the border-color glow)
    gsap.utils.toArray<HTMLElement>('[data-pipeline-card]').forEach((card) => {
      const onEnter = contextSafe(() => gsap.to(card, { y: -3, scale: 1.01, duration: 0.2, ease: 'power2.out' }));
      const onLeave = contextSafe(() => gsap.to(card, { y: 0, scale: 1, duration: 0.25, ease: 'power2.out' }));
      card.addEventListener('mouseenter', onEnter);
      card.addEventListener('mouseleave', onLeave);
    });

    if (prefersReducedMotion) return;

    // Layer cards assemble in sequence, reading like the pipeline building itself
    gsap.from('[data-pipeline-card]', {
      opacity: 0,
      y: 18,
      duration: 0.5,
      ease: 'power2.out',
      stagger: 0.14,
      scrollTrigger: st,
    });

    // Connector chevrons fade in just after each card above them
    gsap.from('[data-pipeline-connector]', {
      opacity: 0,
      duration: 0.3,
      ease: 'power2.out',
      stagger: 0.14,
      delay: 0.2,
      scrollTrigger: st,
    });
  });

  return (
    <div ref={containerRef} className="overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8">
      <div className="flex items-center gap-2">
        <Cpu className="h-3.5 w-3.5 text-primary" />
        <span className="font-mono text-mono-sm uppercase text-muted-foreground">Six-Layer Processing Pipeline</span>
      </div>

      <div className="mt-6">
        {layers.map((layer, i) => {
          const Icon = layer.icon;
          return (
            <div key={layer.name}>
              <div
                data-pipeline-card
                className="flex items-start gap-4 rounded-xl border border-border bg-background/50 p-4 transition-colors hover:border-primary/50"
              >
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-primary/10 font-mono text-sm font-bold text-primary">
                  0{i + 1}
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <Icon className="h-4 w-4 flex-shrink-0 text-primary" />
                    <span className="font-display text-base font-bold">{layer.name}</span>
                  </div>
                  <p className="mt-1 text-[13px] leading-relaxed text-muted-foreground">{layer.desc}</p>
                </div>
              </div>
              {i < layers.length - 1 && (
                <div data-pipeline-connector className="flex justify-center py-1">
                  <ChevronDown className="h-4 w-4 text-muted-foreground/40" />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
