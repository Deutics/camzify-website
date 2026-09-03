'use client';

import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import {
  Cable, MonitorPlay, HardDrive, ScanEye, Route, ShieldAlert, Search, BellRing,
} from 'lucide-react';

/**
 * The capability inventory, placed before the virtual patrolling deep-dive.
 *
 * The page previously went hero → problem → "what is virtual patrolling" → demo →
 * auto-patrol → how it works, and only reached live streaming, backup, users and
 * multi-site eight sections down. A buyer evaluating a VMS had to scroll past four
 * sections on one feature before learning the platform records video at all.
 *
 * This is the whole platform in one screen, ordered the way the product actually
 * works — connect, stream, record, detect, patrol, assess, investigate, notify — which
 * is why it renders as a numbered rail rather than another grid of cards. The rail
 * fills left to right as the section enters view: a small piece of motion that says
 * "this is a pipeline" without a paragraph.
 *
 * Every line below is a verified capability with its own page. Nothing here is a
 * roadmap item, and there are no numbers that cannot be checked.
 */
const layers = [
  {
    icon: Cable,
    title: 'Connect',
    desc: 'Any ONVIF or RTSP camera, plus RTMP and HTTPS streams. Local networks relay through the Connector with no port forwarding.',
    href: '/camera-connectivity',
  },
  {
    icon: MonitorPlay,
    title: 'Live streaming',
    desc: 'A multi-camera wall grouped by site, saved camera sets, explicit offline states, and PTZ control where the camera supports it.',
    href: '/platform/live-streaming',
  },
  {
    icon: HardDrive,
    title: 'Cloud backup & retention',
    desc: 'Continuous or scheduled recording, retention per camera by days or storage cap, playback, and clip export for a chosen window.',
    href: '/platform/video-backup-and-retention',
  },
  {
    icon: ScanEye,
    title: 'AI detection',
    desc: '22 shipping models on confirmed object tracks — intrusion, tampering, weapons, fire, PPE, behavior described in plain language.',
    href: '/ai-features',
  },
  {
    icon: Route,
    title: 'Virtual patrolling',
    desc: 'Scheduled rounds with a checklist per camera, before-and-after evidence on anything fixed, and a compliance report every time.',
    href: '/virtual-patrolling',
  },
  {
    icon: ShieldAlert,
    title: 'Risk detection',
    desc: 'Safety and security risks assessed at every patrol stop, and flagged even where no checklist item asked about them.',
    href: '/virtual-patrolling/risk-detection',
  },
  {
    icon: Search,
    title: 'Investigation',
    desc: 'Describe a person in plain language and retrieve every appearance across cameras. Journey maps and attribute extraction, no photo needed.',
    href: '/ai-features/forensic-video-search',
  },
  {
    icon: BellRing,
    title: 'Notify & manage',
    desc: 'One alert queue with acknowledgment over email, SMS, WhatsApp and push. Sub-users, permission groups, audit trail, many sites.',
    href: '/platform/notifications-and-alerts',
  },
];

export function PlatformCapabilities() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="border-t border-border bg-muted/20 py-20 sm:py-28" aria-labelledby="platform-capabilities">
      <div className="mx-auto max-w-site px-6">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-3xl">
            <span className="font-mono text-mono-sm uppercase text-primary">The platform</span>
            <h2 id="platform-capabilities" className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-4xl">
              One system, from the camera to the record
            </h2>
            <p className="mt-5 max-w-prose text-body text-muted-foreground">
              Video management, AI detection and virtual patrolling are one product on one
              login, not three integrations. Eight layers, in the order the platform runs them.
            </p>
          </div>
          <Link
            href="/platform"
            className="rounded font-semibold text-primary transition-colors hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            Explore the platform <span aria-hidden="true">→</span>
          </Link>
        </div>

        {/* The rail: a single line the layers hang from, filled as the section enters view. */}
        <div className="relative mt-14">
          <div aria-hidden="true" className="absolute inset-x-0 top-0 hidden h-px bg-border lg:block">
            <motion.div
              className="h-full origin-left bg-gradient-to-r from-primary via-primary to-primary/30"
              initial={reduceMotion ? { scaleX: 1 } : { scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: reduceMotion ? 0 : 1.4, ease: [0.16, 1, 0.3, 1] }}
            />
          </div>

          <ol className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {layers.map((layer, i) => {
              const Icon = layer.icon;
              return (
                <motion.li
                  key={layer.href}
                  initial={reduceMotion ? false : { opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.45, delay: reduceMotion ? 0 : 0.08 * i, ease: [0.16, 1, 0.3, 1] }}
                  className="relative lg:pt-8"
                >
                  {/* Tick where this layer meets the rail — first row only; row two has no rail above it. */}
                  {i < 4 && (
                    <span
                      aria-hidden="true"
                      className="absolute left-0 top-0 hidden h-2 w-2 -translate-y-1/2 rounded-full border border-primary bg-background lg:block"
                    />
                  )}
                  <Link
                    href={layer.href}
                    className="group flex h-full flex-col rounded-xl border border-border bg-card p-6 transition-all duration-normal hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <div className="flex items-center justify-between">
                      <span className="rounded-lg bg-primary/10 p-2">
                        <Icon className="h-4 w-4 text-primary" aria-hidden="true" />
                      </span>
                      <span className="font-mono text-mono-sm text-muted-foreground tabular-nums">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                    </div>
                    <h3 className="mt-4 font-display text-lg font-bold transition-colors group-hover:text-primary">
                      {layer.title}
                    </h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{layer.desc}</p>
                    <span className="mt-4 text-sm font-semibold text-primary opacity-0 transition-opacity duration-normal group-hover:opacity-100">
                      Explore <span aria-hidden="true">→</span>
                    </span>
                  </Link>
                </motion.li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
