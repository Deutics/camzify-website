import { generatePageMeta } from '@/lib/page-utils';
import { PageShell } from '@/components/layout/page-shell';
import { ScrollReveal } from '@/components/motion/scroll-reveal';
import Link from 'next/link';
import { BookOpen } from 'lucide-react';

/**
 * Page identity. Declared once and consumed twice: by `generatePageMeta` for the
 * <head> tags, and by `PageShell` for the on-page structured data. Keeping it in one
 * const is what stops the meta description and the schema drifting apart.
 */
const pageMeta = {
  title: "Guides | Security & Video Analytics Resources",
  description: "In-depth guides on virtual patrolling, guard costs, video analytics, camera protocols, and security best practices.",
  path: "/guides",
};

export const metadata = generatePageMeta({ ...pageMeta });

const items = [
  { slug: 'what-is-virtual-patrolling', title: 'What Is Virtual Patrolling?' },
  { slug: 'how-to-run-a-virtual-patrol-round', title: 'How to Run a Virtual Patrol Round' },
  { slug: 'virtual-patrolling-cost', title: 'Virtual Patrolling Cost' },
  { slug: 'security-guard-cost-per-hour', title: 'Security Guard Cost Per Hour' },
  { slug: 'ai-video-analytics-cost', title: 'AI Video Analytics Cost' },
  { slug: 'remote-guarding-cost', title: 'Remote Guarding Cost' },
  { slug: 'how-to-choose-video-analytics-software', title: 'How to Choose Video Analytics Software' },
  { slug: 'how-to-reduce-false-alarms', title: 'How to Reduce False Alarms from Security Cameras' },
  { slug: 'onvif-and-rtsp-explained', title: 'ONVIF and RTSP Explained' },
  { slug: 'guard-tour-systems-explained', title: 'Guard Tour Systems Explained' },
  { slug: 'security-audit-checklist', title: 'Security Audit Checklist' },
  { slug: 'video-retention-requirements', title: 'Video Retention Requirements' },
];

export default function GuidesHub() {
  return (
    <PageShell {...pageMeta} breadcrumbs={[{ label: 'Guides' }]}>
      <section className="pb-20">
        <div className="mx-auto max-w-site px-6">
          <h1 className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl">Guides</h1>
          <p className="mt-6 max-w-2xl text-body text-muted-foreground">
            Practical, honest guides on <a href="/virtual-patrolling" className="text-primary hover:underline">virtual patrolling</a>, security costs, camera technology, and best practices. Written to help you make informed decisions — including where Camzify is not the right answer.
          </p>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((item, i) => (
              <ScrollReveal key={item.slug} delay={i * 0.05}>
                <Link href={`/guides/${item.slug}`} className="group flex items-start gap-4 rounded-xl bg-card p-6 shadow-md transition-all hover:shadow-lg hover:-translate-y-0.5">
                  <BookOpen className="mt-0.5 h-6 w-6 shrink-0 text-primary" />
                  <div>
                    <h2 className="font-display text-base font-bold">{item.title}</h2>
                    <span className="mt-2 block text-sm font-semibold text-primary">Read guide →</span>
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
