import { generatePageMeta } from '@/lib/page-utils';
import { PageShell } from '@/components/layout/page-shell';
import { FaqSection } from '@/components/content/faq-section';
import { ROICalculator } from './_components/roi-calculator';
import Link from 'next/link';

/**
 * Page identity. Declared once and consumed twice: by `generatePageMeta` for the
 * <head> tags, and by `PageShell` for the on-page structured data.
 */
const pageMeta = {
  title: "ROI Calculator | Guard Cost and Agency Revenue",
  description: "What routine guard rounds cost you today against a Camzify estimate at list rates, or what remote patrols would earn an agency against what it would pay.",
  path: "/roi-calculator",
};

export const metadata = generatePageMeta({ ...pageMeta });

const faqs = [
  { question: 'Is the Camzify figure a price?', answer: 'It is an estimate at approximate list rates, before discounts: a stream instance per camera, a patrol instance per camera on rounds, a detection instance per feature per camera, and storage per terabyte. Quotes are lower with an annual term and with more features per camera, and are set for your site, so treat the estimate as the upper end of what the quote will say.' },
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
            <span className="font-mono text-mono-sm uppercase text-primary">Your numbers against a list-rate estimate</span>
            <h1 className="mt-3 font-display text-4xl font-extrabold tracking-tight sm:text-5xl">ROI calculator</h1>
            <p className="mt-6 text-body text-muted-foreground">
              Running sites? See what routine guard rounds cost you today, next to what the
              configuration you would license costs at list rates. Running a security agency or a
              monitoring company? See what remote patrols would earn at your own price against
              what you would pay. Results update as you move the sliders and nothing is sent anywhere.
            </p>
          </div>
          <div className="mt-12">
            <ROICalculator />
          </div>
          <div className="mt-16 grid gap-6 lg:grid-cols-2">
            <div className="rounded-xl border border-border bg-card p-6">
              <h2 className="font-display text-lg font-bold">Reading the site figures</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                The guard cost is hours times rate times sites; the <Link href="/guides/security-guard-cost-per-hour" className="text-primary hover:underline">guard cost guide</Link> gives typical ranges by region. The rounds figure is how many recorded checks a schedule would run instead, each with a <Link href="/virtual-patrolling/patrol-reports" className="text-primary hover:underline">report</Link>. What it replaces is the routine walk, not the response; the <Link href="/virtual-patrolling/vs-security-guards" className="text-primary hover:underline">guards comparison</Link> covers where a person is still needed.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-6">
              <h2 className="font-display text-lg font-bold">Reading the agency figures</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Revenue is client sites times your price. Camzify is quoted for the camera count, so your margin is the difference. <Link href="/partners/for-security-agencies" className="text-primary hover:underline">Security agencies</Link>, <Link href="/partners/for-monitoring-centers" className="text-primary hover:underline">monitoring companies</Link> and <Link href="/partners/for-security-integrators" className="text-primary hover:underline">installers</Link> each have a page on the model, the <Link href="/compare/virtual-patrolling-vs-mobile-patrols" className="text-primary hover:underline">mobile patrols comparison</Link> covers the client conversation, and the <Link href="/guides/what-goes-in-a-remote-patrol-proposal" className="text-primary hover:underline">proposal guide</Link> covers the document.
              </p>
            </div>
          </div>

          <FaqSection items={faqs} inline />
        </div>
      </section>
    </PageShell>
  );
}
