import { generatePageMeta } from '@/lib/page-utils';
import { PageShell } from '@/components/layout/page-shell';
import { FaqSection } from '@/components/content/faq-section';
import { ScrollReveal } from '@/components/motion/scroll-reveal';
import Link from 'next/link';
import { BookOpen } from 'lucide-react';
import { AuthorByline } from '@/components/content/author-byline';

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

/** Guides carry a named byline; the index says so once rather than repeating it per card. */
const items = [
  { slug: 'what-is-virtual-patrolling', title: 'What Is Virtual Patrolling?' },
  { slug: 'what-is-intelligent-video-analytics', title: 'What Is Intelligent Video Analytics?' },
  { slug: 'how-to-run-a-virtual-patrol-round', title: 'How to Run a Virtual Patrol Round' },
  { slug: 'how-to-set-up-sites-and-cameras', title: 'How to Add Sites and Cameras' },
  { slug: 'how-to-monitor-live-camera-feeds', title: 'How to Monitor Live Camera Feeds' },
  { slug: 'how-to-configure-cloud-video-backup', title: 'How to Configure Cloud Video Backup' },
  { slug: 'how-to-manage-sub-users-and-quotas', title: 'How to Manage Sub-Users and Quotas' },
  { slug: 'how-to-manage-security-alerts', title: 'How to Manage Security Camera Alerts' },
  { slug: 'virtual-patrolling-cost', title: 'Virtual Patrolling Cost' },
  { slug: 'security-guard-cost-per-hour', title: 'Security Guard Cost Per Hour' },
  { slug: 'ai-video-analytics-cost', title: 'AI Video Analytics Cost' },
  { slug: 'remote-guarding-cost', title: 'Remote Guarding Cost' },
  { slug: 'how-to-choose-video-analytics-software', title: 'How to Choose Video Analytics Software' },
  { slug: 'how-to-reduce-false-alarms', title: 'How to Reduce False Alarms from Security Cameras' },
  { slug: 'onvif-and-rtsp-explained', title: 'ONVIF and RTSP Explained' },
  { slug: 'guard-tour-systems-explained', title: 'Guard Tour Systems Explained' },
  { slug: 'how-to-sell-virtual-patrolling-to-clients', title: 'How to Sell Virtual Patrolling to Your Clients' },
  { slug: 'what-goes-in-a-remote-patrol-proposal', title: 'What Goes in a Remote Patrol Proposal' },
  { slug: 'adding-remote-patrols-to-alarm-monitoring', title: 'Adding Remote Patrols to Alarm Monitoring' },
  { slug: 'security-audit-checklist', title: 'Security Audit Checklist' },
  { slug: 'video-retention-requirements', title: 'Video Retention Requirements' },
];

const faqs = [
  { question: 'Who are the guides written for?', answer: 'Two readers: the person configuring the console, who gets step-by-step guides with a HowTo schema, and the owner or manager deciding whether and how to buy, who gets the explainers, the cost guides and the owner guides for partners.' },
  { question: 'Are the how-to guides based on the real product?', answer: 'Yes. Each was written by running the steps in the console, and the screenshots on the product pages are the real screens. Where a step differs by plan we say so.' },
  { question: 'Why do the cost guides not give a price?', answer: "Because we do not publish rates. They give the reader's side of the sum and the ranges that exist in the market, and the ROI calculator turns your own numbers into a figure a quote is measured against." },
  { question: 'Who writes them?', answer: "Muhammad Talha, Camzify's product manager and CTO, with nine years in computer vision and automated surveillance. Each guide carries the byline." },
];

export default function GuidesHub() {
  return (
    <PageShell {...pageMeta} faqs={faqs} breadcrumbs={[{ label: 'Guides' }]}>
      <section className="pb-20">
        <div className="mx-auto max-w-site px-6">
          <h1 className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl">Guides</h1>
          <p className="mt-6 max-w-2xl text-body text-muted-foreground">
            Practical, honest guides on <a href="/virtual-patrolling" className="text-primary hover:underline">virtual patrolling</a>, security costs, camera technology, and best practices. Written to help you make informed decisions — including where Camzify is not the right answer.
          </p>
          <AuthorByline className="mt-8" />

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
      <FaqSection items={faqs} />
    </PageShell>
  );
}
