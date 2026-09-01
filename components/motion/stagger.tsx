'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { ReactNode } from 'react';

/**
 * Sequenced reveal for a group of siblings.
 *
 * `ScrollReveal` handles one element and needs a hand-calculated `delay` per item,
 * which meant most grids revealed all at once or with delays that drifted out of sync
 * with the layout. This drives the sequence from the parent so a grid resolves as one
 * gesture rather than N unrelated fades.
 *
 * Under `prefers-reduced-motion` both components render their children immediately at
 * final position — never a partially-applied animation.
 */
export function Stagger({
  children,
  className = '',
  delay = 0,
  stagger = 0.07,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  stagger?: number;
}) {
  const reduced = useReducedMotion();
  if (reduced) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-60px' }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: stagger, delayChildren: delay } },
      }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduced = useReducedMotion();
  if (reduced) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: 18 },
        show: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
        },
      }}
    >
      {children}
    </motion.div>
  );
}
