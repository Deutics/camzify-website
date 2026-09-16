'use client';

import Link from 'next/link';
import { ArrowRight, Loader2 } from 'lucide-react';
import { FormWrapper } from '@/components/system/form-wrapper';
import { configFields, ConfigSummary, EstimateFields, useEstimateConfig } from '@/components/content/estimate-fields';

/*
 * The pricing page quote request: build a configuration, send it, get the quote. No
 * figure is shown on the page; the counts travel with the form and the quote is set
 * for the site, with any annual-term or multi-feature discount applied.
 *
 * The two steps sit in one frame and the quote form opens with a live summary of the
 * configuration, so it is plain that the request is for exactly what was entered.
 */
function Step({ n, title, sub }: { n: number; title: string; sub: string }) {
  return (
    <div className="flex items-start gap-3">
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary font-mono text-sm font-bold text-primary-foreground" aria-hidden="true">{n}</span>
      <div>
        <h3 className="font-display text-lg font-bold">{title}</h3>
        <p className="mt-1 text-sm text-muted-foreground">{sub}</p>
      </div>
    </div>
  );
}
export function QuoteEstimator() {
  const { config, set } = useEstimateConfig();
  return (
    <div id="quote" className="scroll-mt-28 overflow-hidden rounded-2xl border border-border bg-card">
      <div className="grid lg:grid-cols-[1.15fr_1fr]">
        <div className="p-8 lg:border-r lg:border-border">
          <Step n={1} title="Build your configuration" sub="Counts, not commitments. Change any number and the summary on the right follows." />
          <div className="mt-6">
            <EstimateFields config={config} onChange={set} />
          </div>
        </div>
        <div className="border-t border-border bg-background/40 p-8 lg:border-t-0">
          <Step n={2} title="Get the quote for it" sub="It comes back within one business day, set for your site, with any annual-term or volume discount applied." />
          <div className="mt-6">
            <ConfigSummary config={config} />
          </div>
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
                    {loading ? 'Sending...' : 'Request a quote for this configuration'}
                  </button>
                  <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
                    The counts above are sent with your request. We store what you send so we can reply, and nothing else happens with it. See the{' '}
                    <Link href="/privacy-policy" className="text-primary hover:underline">privacy policy</Link>.
                  </p>
                </>
              )}
            </FormWrapper>
          </div>
        </div>
      </div>
    </div>
  );
}
