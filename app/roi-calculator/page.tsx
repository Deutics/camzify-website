import { generatePageMeta } from '@/lib/page-utils';
import { PageShell } from '@/components/layout/page-shell';
import { FAQAccordion } from '@/components/content/faq-accordion';
import { ROICalculator } from './_components/roi-calculator';

/**
 * Page identity. Declared once and consumed twice: by `generatePageMeta` for the
 * <head> tags, and by `PageShell` for the on-page structured data.
 */
const pageMeta = {
  title: "ROI Calculator | Guard Cost and Agency Revenue",
  description: "Two calculators, your numbers only. Site operators see what routine guard rounds cost today; security agencies and monitoring companies see the recurring revenue remote patrols would earn.",
  path: "/roi-calculator",
};

export const metadata = generatePageMeta({ ...pageMeta });

const faqs = [
  { question: 'Why does the calculator not show what Camzify costs?', answer: 'Because we do not publish prices. Camzify is priced per camera and quoted for your site or your client portfolio, so the honest calculation is the half that is yours: what routine rounds cost you today, or what remote patrols would earn you at the rate you set. The quote comes back against that figure.' },
  { question: 'Where do the guard cost figures come from?', answer: 'From you. Hours per week and hourly rate are sliders with your own numbers in them. The guard cost guide gives typical ranges by region if you want a reference, but nothing in the result is assumed on your behalf.' },
  { question: 'What is the agency mode for?', answer: 'For a guarding company or monitoring company that would sell remote patrols to its own clients. You enter the number of client sites, the price you would charge per site per month, and the hours you cannot staff today. The result is recurring revenue and the rounds delivered, with the margin left for you to set once you have a quote.' },
  { question: 'Does a scheduled round replace the guard?', answer: 'It replaces the routine walk, not the response. The rounds figure is how many recorded checks a schedule would run; someone still attends what fails. The security agencies page explains why that is the right framing for a guarding company.' },
];

export default function ROIPage() {
  return (
    <PageShell {...pageMeta} faqs={faqs} breadcrumbs={[{ label: 'ROI Calculator' }]}>
      <section className="pb-20">
        <div className="mx-auto max-w-site px-6">
          <div className="mx-auto max-w-2xl text-center">
            <span className="font-mono text-mono-sm uppercase text-primary">Your numbers, not ours</span>
            <h1 className="mt-3 font-display text-4xl font-extrabold tracking-tight sm:text-5xl">ROI calculator</h1>
            <p className="mt-6 text-body text-muted-foreground">
              Running sites? See what routine guard rounds cost you today. Running a security
              agency or a monitoring company? See what remote patrols would earn at your own
              price. Results update as you move the sliders and nothing is sent anywhere.
            </p>
          </div>
          <div className="mt-12">
            <ROICalculator />
          </div>
          <div className="mt-16 rounded-2xl border border-border bg-card p-8 sm:p-10">
            <span className="font-mono text-mono-sm uppercase text-primary">FAQ</span>
            <h2 className="mt-2 font-display text-2xl font-bold">Frequently asked questions</h2>
            <div className="mt-6"><FAQAccordion items={faqs} /></div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
