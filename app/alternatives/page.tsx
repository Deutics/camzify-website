import { generatePageMeta } from '@/lib/page-utils';
import { PageShell } from '@/components/layout/page-shell';
import { FaqSection } from '@/components/content/faq-section';
import { ScrollReveal } from '@/components/motion/scroll-reveal';
import Link from 'next/link';
import { ArrowLeftRight } from 'lucide-react';

/**
 * Page identity. Declared once and consumed twice: by `generatePageMeta` for the
 * <head> tags, and by `PageShell` for the on-page structured data. Keeping it in one
 * const is what stops the meta description and the schema drifting apart.
 *
 * The hub for the switch-intent pages. A "vs" page under /compare weighs two products
 * for a buyer choosing between them; an alternative page under /alternatives is for a
 * buyer who already has the other product and is asking what moving would mean. Both
 * kinds cite only the other vendor's own pages, listed on the page, checked on the
 * date shown.
 */
const pageMeta = {
  title: "Camzify as an Alternative | Switching Guides",
  description: "Switching guides for buyers who already use ADT or Verkada: what you keep, what you give up, and who should stay put. Every vendor fact is sourced.",
  path: "/alternatives",
};

export const metadata = generatePageMeta({ ...pageMeta });

const items = [
  { href: '/alternatives/adt', title: 'ADT alternative', desc: 'For businesses on ADT that want AI detections and patrol rounds on the cameras they already have.' },
  { href: '/alternatives/verkada', title: 'Verkada alternative', desc: 'For buyers who want a cloud VMS without replacing every camera with the vendor’s own.' },
];

const faqs = [
  { question: 'How is an alternative page different from a comparison?', answer: 'A comparison weighs two products for a buyer choosing between them. An alternative page starts from the product you already have and asks what a move would mean: which cameras you keep, which services stay with your current provider, and what you give up. The two Verkada pages, for instance, share sources but answer different questions.' },
  { question: 'Where do the facts about the other vendor come from?', answer: 'Only from that vendor’s own website, opened on the date shown at the bottom of each page and listed there. Nothing comes from reviews, forums or third-party listings, and pricing is never characterized beyond what the vendor’s own pricing page states.' },
  { question: 'Will these pages tell me to switch?', answer: 'Each one has a section on where the other vendor is the better choice, and it is written to be true. A business that wants doors, alarms and professional monitoring from one provider will usually read it and stay.' },
  { question: 'Can I keep my alarm monitoring and add Camzify?', answer: 'Camzify does not touch alarm panels, access control or monitoring centers, so those stay with whoever provides them. What it needs is a camera that publishes an ONVIF or RTSP stream, or one reachable through the Camzify Connector.' },
];

export default function AlternativesHub() {
  return (
    <PageShell {...pageMeta} faqs={faqs} breadcrumbs={[{ label: 'Alternatives' }]}>
      <section className="pb-20">
        <div className="mx-auto max-w-site px-6">
          <h1 className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl">Camzify as an alternative</h1>
          <p className="mt-6 max-w-2xl text-body text-muted-foreground">
            Guides for a business that already has a security provider and is weighing a move to <Link href="/cloud-video-surveillance" className="text-primary hover:underline">cloud video surveillance</Link> with <Link href="/virtual-patrolling" className="text-primary hover:underline">virtual patrolling</Link>. Each one says what you keep, what you give up, and who should not switch. For two products weighed side by side, see the <Link href="/compare" className="text-primary hover:underline">comparisons</Link>.
          </p>
          <div className="mt-14 grid gap-6 sm:grid-cols-2">
            {items.map((item, i) => (
              <ScrollReveal key={item.href} delay={i * 0.05}>
                <Link href={item.href} className="group flex h-full items-start gap-4 rounded-xl bg-card p-6 shadow-md transition-all hover:shadow-lg hover:-translate-y-0.5">
                  <ArrowLeftRight className="mt-0.5 h-6 w-6 shrink-0 text-primary" />
                  <div>
                    <h2 className="font-display text-lg font-bold">{item.title}</h2>
                    <p className="mt-2 text-sm text-muted-foreground">{item.desc}</p>
                    <span className="mt-3 block text-sm font-semibold text-primary">Read the guide →</span>
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
