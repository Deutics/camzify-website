'use client';

import Link from 'next/link';
import { ArrowRight, Loader2 } from 'lucide-react';
import { FormWrapper } from '@/components/system/form-wrapper';
import { configFields, EstimateFields, useEstimateConfig } from '@/components/content/estimate-fields';

/*
 * The pricing page quote request: build a configuration, send it, get the quote. No
 * figure is shown on the page; the counts travel with the form and the quote is set
 * for the site, with any annual-term or multi-feature discount applied.
 */
export function QuoteEstimator() {
  const { config, set } = useEstimateConfig();
  return (
    <div id="quote" className="scroll-mt-28 grid gap-8 lg:grid-cols-[1.2fr_1fr]">
      <div className="rounded-2xl border border-border bg-card p-8">
        <h3 className="font-display text-lg font-bold">Build your configuration</h3>
        <p className="mt-2 text-sm text-muted-foreground">Counts, not commitments. The quote prices exactly what you enter here.</p>
        <div className="mt-6">
          <EstimateFields config={config} onChange={set} />
        </div>
      </div>
      <div className="rounded-2xl border border-border bg-card p-8">
        <h3 className="font-display text-lg font-bold">Get the quote for this configuration</h3>
        <p className="mt-2 text-sm text-muted-foreground">It comes back within one business day, set for your site, with any annual-term or volume discount applied.</p>
        <div className="mt-6">
          <FormWrapper
            endpoint="/api/quote"
            successMessage="Quote request received. We will reply with a quote for this configuration within one business day."
            onSubmit={(data) => ({ ...data, ...configFields(config) })}
          >
            {({ loading }: { loading: boolean }) => (
              <>
                <div>
                  <label htmlFor="quote-name" className="text-sm font-medium">Full name *</label>
                  <input id="quote-name" name="name" required className="mt-1.5 w-full rounded-lg border border-border bg-background px-4 py-3 text-sm focus:border-primary focus:ring-1 focus:ring-primary" placeholder="Your full name" />
                </div>
                <div>
                  <label htmlFor="quote-email" className="text-sm font-medium">Work email *</label>
                  <input id="quote-email" name="email" type="email" required className="mt-1.5 w-full rounded-lg border border-border bg-background px-4 py-3 text-sm focus:border-primary focus:ring-1 focus:ring-primary" placeholder="you@company.com" />
                </div>
                <div>
                  <label htmlFor="quote-company" className="text-sm font-medium">Company</label>
                  <input id="quote-company" name="company" className="mt-1.5 w-full rounded-lg border border-border bg-background px-4 py-3 text-sm focus:border-primary focus:ring-1 focus:ring-primary" placeholder="Company name" />
                </div>
                <div>
                  <label htmlFor="quote-message" className="text-sm font-medium">Anything we should know</label>
                  <textarea id="quote-message" name="message" rows={3} className="mt-1.5 w-full rounded-lg border border-border bg-background px-4 py-3 text-sm focus:border-primary focus:ring-1 focus:ring-primary" placeholder="Sites, camera brands, an annual term, a partner portfolio" />
                </div>
                <button type="submit" disabled={loading} className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground transition-all hover:bg-primary/90 disabled:opacity-60">
                  {loading ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> : <ArrowRight className="h-4 w-4" aria-hidden="true" />}
                  {loading ? 'Sending...' : 'Request this quote'}
                </button>
                <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
                  We store what you send so we can reply, and nothing else happens with it. See the{' '}
                  <Link href="/privacy-policy" className="text-primary hover:underline">privacy policy</Link>.
                </p>
              </>
            )}
          </FormWrapper>
        </div>
      </div>
    </div>
  );
}
