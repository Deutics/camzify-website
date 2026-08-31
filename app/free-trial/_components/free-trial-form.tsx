'use client';
import { FormWrapper } from '@/components/system/form-wrapper';
import { Loader2, ArrowRight } from 'lucide-react';

export function FreeTrialForm() {
  return (
    <FormWrapper endpoint="/api/free-trial" successMessage="Trial request submitted. Check your email for setup instructions.">
      {({ loading }: { loading: boolean }) => (
        <>
          <div>
            <label htmlFor="name" className="text-sm font-medium">Full name *</label>
            <input id="name" name="name" required className="mt-1.5 w-full rounded-lg border border-border bg-background px-4 py-3 text-sm focus:border-primary focus:ring-1 focus:ring-primary" placeholder="Your full name" />
          </div>
          <div>
            <label htmlFor="email" className="text-sm font-medium">Work email *</label>
            <input id="email" name="email" type="email" required className="mt-1.5 w-full rounded-lg border border-border bg-background px-4 py-3 text-sm focus:border-primary focus:ring-1 focus:ring-primary" placeholder="you@company.com" />
          </div>
          <div>
            <label htmlFor="company" className="text-sm font-medium">Company</label>
            <input id="company" name="company" className="mt-1.5 w-full rounded-lg border border-border bg-background px-4 py-3 text-sm focus:border-primary focus:ring-1 focus:ring-primary" placeholder="Company name" />
          </div>
          <div>
            <label htmlFor="cameras" className="text-sm font-medium">Number of cameras</label>
            <select id="cameras" name="cameras" className="mt-1.5 w-full rounded-lg border border-border bg-background px-4 py-3 text-sm focus:border-primary focus:ring-1 focus:ring-primary">
              <option value="">Select range</option>
              <option value="1-8">1–8 cameras</option>
              <option value="9-16">9–16 cameras</option>
              <option value="17-32">17–32 cameras</option>
              <option value="33+">33+ cameras</option>
            </select>
          </div>
          <button type="submit" disabled={loading} className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground transition-all hover:bg-primary/90 disabled:opacity-60">
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <ArrowRight className="h-4 w-4" />}
            {loading ? 'Submitting...' : 'Start Free Trial'}
          </button>
        </>
      )}
    </FormWrapper>
  );
}
