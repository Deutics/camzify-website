import { generatePageMeta } from '@/lib/page-utils';
import { PageShell } from '@/components/layout/page-shell';
import { ROICalculator } from './_components/roi-calculator';

/**
 * Page identity. Declared once and consumed twice: by `generatePageMeta` for the
 * <head> tags, and by `PageShell` for the on-page structured data. Keeping it in one
 * const is what stops the meta description and the schema drifting apart.
 */
const pageMeta = {
  title: "ROI Calculator | Security Guard Cost vs Virtual Patrolling",
  description: "Calculate how much you can save by replacing guard patrol rounds with Camzify virtual patrolling. Enter your sites, cameras, and guard costs.",
  path: "/roi-calculator",
};

export const metadata = generatePageMeta({ ...pageMeta });

export default function ROIPage() {
  return (
    <PageShell {...pageMeta} breadcrumbs={[{ label: 'ROI Calculator' }]}>
      <section className="pb-20">
        <div className="mx-auto max-w-site px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl">ROI Calculator</h1>
            <p className="mt-6 text-body text-muted-foreground">
              Enter your current guarding setup and see how much you could save with Camzify
              virtual patrolling. Results are calculated instantly and shown on-page.
            </p>
          </div>
          <div className="mt-12">
            <ROICalculator />
          </div>
        </div>
      </section>
    </PageShell>
  );
}
