import { generatePageMeta } from '@/lib/page-utils';
import { PageShell } from '@/components/layout/page-shell';
import { ScrollReveal } from '@/components/motion/scroll-reveal';
import { RoadmapBadge } from '@/components/content/roadmap-badge';
import Link from 'next/link';
import { Clock, Search, Brain, Smartphone } from 'lucide-react';

/**
 * Page identity. Declared once and consumed twice: by `generatePageMeta` for the
 * <head> tags, and by `PageShell` for the on-page structured data. Keeping it in one
 * const is what stops the meta description and the schema drifting apart.
 */
const pageMeta = {
  title: "Product Roadmap | Upcoming Features",
  description: "See what is coming next for Camzify — loitering detection, forensic video search, and behavioral analytics. Transparent roadmap with honest timelines.",
  path: "/roadmap",
};

export const metadata = generatePageMeta({ ...pageMeta });

const roadmapItems = [
  { title: 'Loitering Detection', href: '/ai-features/loitering-detection', icon: Clock, status: 'In Development', desc: 'Detect when a person or vehicle remains in a defined area beyond a configured dwell time. This addresses a common security gap — someone lingering near a fence line, ATM, or restricted entrance.' },
  { title: 'Camzify Mobile Apps', href: '/platform/mobile-access', icon: Smartphone, status: 'In Development', desc: 'Native iOS and Android apps for live streams, push alerts and patrol reviews on the go. Not yet released — mobile access today is the responsive browser interface, which will remain available after the apps ship.' },
  { title: 'Forensic Video Search', href: '/ai-features/forensic-video-search', icon: Search, status: 'Planned', desc: 'Search recorded footage using natural language queries — "person in red jacket near gate 3 between 2am and 4am." This will significantly reduce the time required for incident investigation.' },
];

export default function RoadmapPage() {
  return (
    <PageShell {...pageMeta} breadcrumbs={[{ label: 'Roadmap' }]}>
      <section className="pb-16">
        <div className="mx-auto max-w-site px-6">
          <h1 className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl">Product Roadmap</h1>
          <p className="mt-6 max-w-2xl text-body text-muted-foreground">
            Transparency about what is coming, what is not, and where we are in the process. These features are not yet available in production. They appear here because we believe a public roadmap builds more trust than a hidden one.
          </p>
          <p className="mt-4 max-w-2xl text-muted-foreground">
            For capabilities available today, see the <Link href="/ai-features" className="text-primary hover:underline">detection hub</Link> and <Link href="/virtual-patrolling" className="text-primary hover:underline">virtual patrolling</Link> system.
          </p>

          <div className="mt-14 space-y-8">
            {roadmapItems.map((item, i) => (
              <ScrollReveal key={item.href} delay={i * 0.1}>
                <Link href={item.href} className="group flex gap-6 rounded-xl bg-card p-8 shadow-md transition-all hover:shadow-lg">
                  <item.icon className="mt-1 h-8 w-8 shrink-0 text-warn" />
                  <div>
                    <div className="flex items-center gap-3">
                      <h2 className="font-display text-xl font-bold">{item.title}</h2>
                      <RoadmapBadge />
                    </div>
                    <span className="mt-1 block text-sm font-mono text-warn">{item.status}</span>
                    <p className="mt-3 max-w-prose text-muted-foreground">{item.desc}</p>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
