'use client';

import { useId, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';

export interface FAQItem {
  question: string;
  answer: string;
}

/**
 * Accessible FAQ disclosure list.
 *
 * Two deliberate choices here, both load-bearing:
 *
 * 1. **Answers stay in the DOM when collapsed.** The previous version unmounted them
 *    via AnimatePresence, so the server-rendered HTML contained only the questions —
 *    every answer was invisible to crawlers that read rendered text rather than
 *    JSON-LD, which is most AI answer engines. Collapsed panels are now height-0 and
 *    `inert`, so they are hidden from assistive tech and pointer input but present in
 *    the markup.
 *
 * 2. **No JSON-LD here.** FAQPage schema is emitted once by `PageShell` from the same
 *    `faqs` array, so the structured data and the visible answers cannot drift apart.
 */
export function FAQAccordion({ items, id }: { items: FAQItem[]; id?: string }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const baseId = useId();
  const list = items ?? [];

  return (
    <div id={id} className="space-y-3">
      {list.map((item: FAQItem, i: number) => {
        const isOpen = openIndex === i;
        const panelId = `${baseId}-panel-${i}`;
        const buttonId = `${baseId}-button-${i}`;

        return (
          <div
            key={i}
            className="rounded-xl border border-border bg-card transition-colors hover:border-primary/20"
          >
            <h3>
              <button
                id={buttonId}
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : i)}
                aria-expanded={isOpen}
                aria-controls={panelId}
                className="flex w-full items-center justify-between rounded-xl px-6 py-4 text-left text-sm font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:text-base"
              >
                <span className="pr-4">{item?.question ?? ''}</span>
                <ChevronDown
                  aria-hidden="true"
                  className={`h-4 w-4 flex-shrink-0 text-muted-foreground transition-transform duration-200 ${
                    isOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>
            </h3>
            <motion.div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              // `inert` keeps collapsed text out of the a11y tree and tab order while
              // leaving it in the HTML for crawlers. Cast: React 18 has no typing yet.
              {...({ inert: isOpen ? undefined : '' } as any)}
              initial={false}
              animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden"
            >
              <div className="px-6 pb-4 text-sm leading-relaxed text-muted-foreground">
                {item?.answer ?? ''}
              </div>
            </motion.div>
          </div>
        );
      })}
    </div>
  );
}
