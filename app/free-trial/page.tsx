import { generatePageMeta } from '@/lib/page-utils';
import { PageShell } from '@/components/layout/page-shell';
import { FreeTrialForm } from './_components/free-trial-form';
import { CheckCircle } from 'lucide-react';
import Link from 'next/link';

/**
 * Page identity. Declared once and consumed twice: by `generatePageMeta` for the
 * <head> tags, and by `PageShell` for the on-page structured data. Keeping it in one
 * const is what stops the meta description and the schema drifting apart.
 */
const pageMeta = {
  title: "Free Trial | Try Camzify Virtual Patrolling",
  description: "Try Camzify free — connect your cameras, build patrol sequences, and run rounds with no credit card required.",
  path: "/free-trial",
};

export const metadata = generatePageMeta({ ...pageMeta });

export default function FreeTrialPage() {
  return (
    <PageShell {...pageMeta} breadcrumbs={[{ label: 'Free Trial' }]} showCTA={false}>
      <section className="pb-20">
        <div className="mx-auto max-w-site px-6">
          <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr]">
            <div>
              <h1 className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl">Start Your Free Trial</h1>
              <p className="mt-6 text-body text-muted-foreground">
                Connect your own cameras and try <Link href="/virtual-patrolling" className="text-primary hover:underline">virtual patrolling</Link> with
                no credit card required. Build patrol sequences, run rounds, and see the compliance reports.
              </p>
              <div className="mt-8 space-y-3">
                {['No credit card required', 'Connect your own cameras', 'Full virtual patrolling access', 'Core AI detection features', 'PDF patrol reports'].map((item: string, i: number) => (
                  <div key={i} className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-live flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-2xl border border-border bg-card p-8">
              <FreeTrialForm />
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
