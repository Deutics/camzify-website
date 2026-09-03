import Link from 'next/link';
import { ScrollReveal } from '@/components/motion/scroll-reveal';
import { ProductShot } from '@/components/content/product-shot';
import { SectionAtmosphere } from '@/components/motion/section-atmosphere';
import { Stagger, StaggerItem } from '@/components/motion/stagger';

/**
 * Every shipping detection model, grouped by the same six categories the main
 * navigation uses.
 *
 * This section previously showed six of them and claimed six was the total, which
 * contradicted the navigation, /llms.txt and the 23 feature pages. Listing all 21
 * corrects that, and it puts fifteen more internal links on the highest-authority
 * page on the site.
 *
 * `featured` marks the six with the deepest pages — they get a card each; the rest
 * render as a dense linked list so the section stays scannable rather than becoming
 * a wall of 21 identical cards.
 */
const featured = [
  {
    title: 'Behavioral Anomaly Detection',
    href: '/ai-features/behavioral-anomaly-detection',
    desc: 'Describe the behavior you want watched in plain language, such as fights, smoking, vandalism or trespassing, and it monitors for exactly that.',
  },
  {
    title: 'Line Intrusion Detection',
    href: '/ai-features/line-intrusion-detection',
    desc: 'A virtual tripwire with directional control. Fires on a confirmed object track crossing the line, not on a shadow or a lighting shift.',
  },
  {
    title: 'Zone Intrusion Detection',
    href: '/ai-features/zone-intrusion-detection',
    desc: 'Polygonal restricted areas with time-based rules. Any confirmed object entering the zone raises an alert.',
  },
  {
    title: 'Camera Tampering Detection',
    href: '/ai-features/camera-tampering-detection',
    desc: 'Five modes: defocus, physical coverage, scene change, brightness shift and frozen frames.',
  },
  {
    title: 'Multi-Object Tracking',
    href: '/ai-features/multi-object-tracking',
    desc: 'Persistent identity per subject, frame over frame. Survives brief occlusions and re-entries.',
  },
  {
    title: 'AI Attribute Extraction',
    href: '/ai-features/ai-attribute-extraction',
    desc: 'A vision-language model reads the scene and attaches structured attributes: clothing color, object type, behavior.',
  },
];

const groups = [
  {
    label: 'Perimeter & Access',
    items: [
      ['Line Intrusion Detection', '/ai-features/line-intrusion-detection'],
      ['Zone Intrusion Detection', '/ai-features/zone-intrusion-detection'],
      ['Motion Detection', '/ai-features/motion-detection'],
      ['Tailgating Detection', '/ai-features/tailgating-detection'],
    ],
  },
  {
    label: 'Threat & Incident',
    items: [
      ['Behavioral Anomaly Detection', '/ai-features/behavioral-anomaly-detection'],
      ['Weapons Detection', '/ai-features/weapons-detection'],
      ['Aggression & Fight Detection', '/ai-features/aggression-and-fight-detection'],
      ['Slip & Fall Detection', '/ai-features/slip-and-fall-detection'],
      ['Fire & Smoke Detection', '/ai-features/fire-and-smoke-detection'],
    ],
  },
  {
    label: 'Site Compliance',
    items: [
      ['PPE Violation Detection', '/ai-features/ppe-violation-detection'],
      ['Abandoned Object Detection', '/ai-features/abandoned-object-detection'],
      ['Littering Detection', '/ai-features/littering-detection'],
      ['Camera Tampering Detection', '/ai-features/camera-tampering-detection'],
    ],
  },
  {
    label: 'Vehicle & Parking',
    items: [
      ['Illegal Parking Detection', '/ai-features/illegal-parking-detection'],
      ['Wrong-Way Vehicle Detection', '/ai-features/wrong-way-vehicle-detection'],
      ['Vehicle Damage Report', '/ai-features/vehicle-damage-report'],
    ],
  },
  {
    label: 'Investigation & Tracking',
    items: [
      ['AI Suspect Search', '/ai-features/forensic-video-search'],
      ['Cross-Camera Journey Map', '/ai-features/cross-camera-journey-map'],
      ['Multi-Object Tracking', '/ai-features/multi-object-tracking'],
      ['AI Attribute Extraction', '/ai-features/ai-attribute-extraction'],
    ],
  },
  {
    label: 'Analytics & Insights',
    items: [
      ['Heatmap Anomalies', '/ai-features/heatmap-anomalies'],
      ['Occupancy & Peak Hour Trends', '/ai-features/occupancy-and-peak-hour-trends'],
    ],
  },
];

const shippingCount = groups.reduce((n, g) => n + g.items.length, 0);

export function DetectionGrid() {
  return (
    <section className="relative overflow-hidden py-20 sm:py-24">
      <SectionAtmosphere variant="right" />
      <div className="relative z-10 mx-auto max-w-site px-6">
        <ScrollReveal>
          <div className="max-w-3xl">
            <span className="font-mono text-mono-sm uppercase text-primary">AI Detection</span>
            <h2 className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-4xl">
              {shippingCount} detection models, all shipping
            </h2>
            <p className="mt-5 max-w-prose text-body text-muted-foreground">
              Every detection fires on a confirmed object track, not a shadow, not a lighting
              shift, not camera noise. Each one feeds directly into your patrol rounds, so a
              detection between rounds is logged against the camera it belongs to.
            </p>
          </div>
        </ScrollReveal>

        <Stagger className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featured.map((f) => (
            <StaggerItem key={f.href} className="h-full">
              <Link
                href={f.href}
                className="console-panel corner-ticks group flex h-full flex-col p-6 transition-transform duration-normal hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 font-mono text-mono-sm uppercase text-live">
                    <span className="h-1.5 w-1.5 rounded-full bg-live motion-safe:animate-pulse-dot" />
                    Live
                  </span>
                  <span
                    aria-hidden="true"
                    className="text-muted-foreground transition-transform duration-fast group-hover:translate-x-0.5 group-hover:text-primary"
                  >
                    →
                  </span>
                </div>
                <h3 className="mt-4 font-display text-lg font-bold group-hover:text-primary">
                  {f.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.desc}</p>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>

        <ScrollReveal delay={0.1}>
          <div className="mt-16 rounded-2xl border border-border bg-card/40 p-8 sm:p-10">
            <h3 className="font-display text-xl font-bold">The full detection set</h3>
            <p className="mt-2 max-w-prose text-sm text-muted-foreground">
              Grouped the way the platform groups them. One further model, loitering
              detection, is in development and marked as such on its page; the{' '}
              <Link href="/roadmap" className="text-primary hover:underline">roadmap</Link> lists
              what else is coming.
            </p>
            <div className="mt-8 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
              {groups.map((g) => (
                <div key={g.label}>
                  <h4 className="font-mono text-mono-sm uppercase text-muted-foreground">
                    {g.label}
                  </h4>
                  <ul className="mt-3 space-y-2">
                    {g.items.map(([label, href]) => (
                      <li key={href}>
                        <Link
                          href={href}
                          className="rounded text-sm text-foreground/80 transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        >
                          {label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        <div className="mt-16 grid items-center gap-12 lg:grid-cols-2">
          <ScrollReveal>
            <div>
              <h3 className="font-display text-2xl font-bold">Every detection, one queue</h3>
              <p className="mt-4 max-w-prose text-muted-foreground">
                Detections do not land in separate tools. They arrive in a single notification
                queue with severity, site, camera and feature, an acknowledgment state, and the
                option to mark a false positive so the model's behavior on that camera is
                recorded.
              </p>
              <Link
                href="/platform/notifications-and-alerts"
                className="mt-6 inline-flex items-center gap-2 rounded font-semibold text-primary transition-colors hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                See alert management <span aria-hidden="true">→</span>
              </Link>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.08}>
            <ProductShot
              src="/product-notifications"
              alt="Camzify notifications screen showing 54 detection events with severity filters, a critical acknowledgment banner, and average time to acknowledge"
              label="Notifications · Camzify console"
            />
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
