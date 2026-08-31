'use client';

import { useState, useEffect, useCallback } from 'react';
import { usePathname } from 'next/navigation';
import { X, Download, ClipboardCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function ExitIntentModal() {
  const [show, setShow] = useState(false);
  const pathname = usePathname();

  const excludedPaths = ['/contact', '/book-a-demo', '/free-trial'];
  const isExcluded = excludedPaths?.some((p: string) => pathname?.startsWith(p));

  const handleMouseLeave = useCallback(
    (e: MouseEvent) => {
      if (
        e.clientY <= 0 &&
        !isExcluded &&
        typeof window !== 'undefined' &&
        !sessionStorage?.getItem?.('exitModalShown') &&
        window.innerWidth > 768
      ) {
        setShow(true);
        sessionStorage?.setItem?.('exitModalShown', 'true');
      }
    },
    [isExcluded]
  );

  useEffect(() => {
    document?.addEventListener?.('mouseleave', handleMouseLeave);
    return () => document?.removeEventListener?.('mouseleave', handleMouseLeave);
  }, [handleMouseLeave]);

  if (isExcluded) return null;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
          onClick={() => setShow(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e: any) => e?.stopPropagation?.()}
            className="relative w-full max-w-md rounded-2xl border border-border bg-card p-8"
          >
            <button
              onClick={() => setShow(false)}
              className="absolute right-4 top-4 text-muted-foreground hover:text-foreground"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-primary/10 p-3">
                <ClipboardCheck className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-display text-xl font-bold">Before you go...</h3>
            </div>
            <p className="mt-4 text-body text-muted-foreground">
              Download our free Security Patrol Checklist Template — the same format used
              by operations managers to run consistent patrol rounds across every site.
            </p>
            <div className="mt-6 flex gap-3">
              <a
                href="/book-a-demo"
                className="flex-1 rounded-lg bg-primary px-5 py-3 text-center text-sm font-semibold text-primary-foreground transition-all hover:bg-primary/90"
              >
                Book a Demo
              </a>
              <button
                onClick={() => setShow(false)}
                className="flex-1 rounded-lg border border-border px-5 py-3 text-center text-sm font-medium transition-all hover:bg-accent"
              >
                No thanks
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
