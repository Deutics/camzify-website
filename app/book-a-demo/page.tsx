import { generatePageMeta } from '@/lib/page-utils';
import { PageShell } from '@/components/layout/page-shell';
import { BookDemoForm } from './_components/book-demo-form';
import { CheckCircle, Shield, Camera, Clock } from 'lucide-react';

/**
 * Page identity. Declared once and consumed twice: by `generatePageMeta` for the
 * <head> tags, and by `PageShell` for the on-page structured data. Keeping it in one
 * const is what stops the meta description and the schema drifting apart.
 */
const pageMeta = {
  title: "Book a Demo | See Camzify Virtual Patrolling Live",
  description: "Book a 15-minute demo of Camzify virtual patrolling. See a live patrol run on real cameras and get a custom quote for your sites.",
  path: "/book-a-demo",
};

export const metadata = generatePageMeta({ ...pageMeta });

export default function BookDemoPage() {
  return (
    <PageShell {...pageMeta} breadcrumbs={[{ label: 'Book a Demo' }]} showCTA={false}>
      <section className="pb-20">
        <div className="mx-auto max-w-site px-6">
          <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr]">
            <div>
              <h1 className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl">
                Book a Demo
              </h1>
              <p className="mt-6 text-body text-muted-foreground">
                See a live patrol run on real cameras. We will walk through the full workflow —
                connecting cameras, building a patrol sequence, running a round, and reviewing
                the compliance report.
              </p>

              <div className="mt-10 space-y-4">
                <h3 className="font-display text-lg font-bold">What to expect</h3>
                {[
                  { icon: Clock, text: '15 minutes, no slides, just the live product' },
                  { icon: Camera, text: 'See a patrol round run across real cameras' },
                  { icon: Shield, text: 'Custom quote based on your sites and camera count' },
                  { icon: CheckCircle, text: 'No commitment — try the free trial first if you prefer' },
                ].map((item: any, i: number) => {
                  const Icon = item?.icon ?? CheckCircle;
                  return (
                    <div key={i} className="flex items-center gap-3">
                      <Icon className="h-5 w-5 text-primary flex-shrink-0" />
                      <span className="text-muted-foreground">{item?.text ?? ''}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-card p-8">
              <BookDemoForm />
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
