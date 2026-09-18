import Link from 'next/link';
import { generatePageMeta } from '@/lib/page-utils';
import { PageShell } from '@/components/layout/page-shell';
import { FaqSection } from '@/components/content/faq-section';
import { ScrollReveal } from '@/components/motion/scroll-reveal';
import { GLOSSARY_TERMS } from '@/lib/glossary-terms';

/**
 * The glossary hub: every term in lib/glossary-terms.ts, alphabetically, each with its
 * first sentence. The individual pages are the answer-engine surface; this page is the
 * index that links them all and gives the set one URL for the DefinedTermSet.
 */
const pageMeta = {
  title: "Security Video Glossary | Terms Defined",
  description: "Plain definitions of the terms used in video surveillance and virtual patrolling: VMS, NVR, VSaaS, remote video monitoring, virtual guard, ONVIF.",
  path: "/glossary",
};

export const metadata = generatePageMeta({ ...pageMeta });

const faqs = [
  { question: 'What is this glossary for?', answer: 'For the words a buyer meets in a vendor deck, a quote or a monitoring contract. Each entry gives a plain two-sentence definition as the industry uses the term, then how the same thing appears on Camzify, and where it does not.' },
  { question: 'Are the definitions specific to Camzify?', answer: 'No. Each term is defined generically first; the Camzify part is kept to one paragraph and says only what the product pages say, including what the product does not do, such as facial recognition or plate reading.' },
  { question: 'Can I suggest a term?', answer: 'Yes, through the contact page. Terms that come up in demos and quotes are added as they recur.' },
];

export default function GlossaryHub() {
  const terms = [...GLOSSARY_TERMS].sort((a, b) => a.term.localeCompare(b.term));
  return (
    <PageShell {...pageMeta} faqs={faqs} breadcrumbs={[{ label: 'Glossary' }]}>
      <section className="pb-20">
        <div className="mx-auto max-w-site px-6">
          <span className="font-mono text-mono-sm uppercase text-primary">Glossary</span>
          <h1 className="mt-3 font-display text-4xl font-extrabold tracking-tight sm:text-5xl">Security video terms, defined</h1>
          <p className="mt-6 max-w-2xl text-body text-muted-foreground">
            The vocabulary of cloud video surveillance, AI detection and virtual patrolling, each term defined in two sentences the way the industry uses it, with a note on how it appears on Camzify.
          </p>
          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {terms.map((t, i) => (
              <ScrollReveal key={t.slug} delay={Math.min(i, 8) * 0.04}>
                <Link href={`/glossary/${t.slug}`} className="group flex h-full flex-col rounded-xl border border-border bg-card p-5 transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                  <h2 className="font-display text-base font-bold group-hover:text-primary">
                    {t.term}
                    {t.abbreviation && <span className="ml-2 font-mono text-sm font-medium text-muted-foreground">({t.abbreviation})</span>}
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t.definition.split(/(?<=\.)\s/)[0]}</p>
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
