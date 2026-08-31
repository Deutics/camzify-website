'use client';

import { FormWrapper } from '@/components/system/form-wrapper';
import { Loader2, Send } from 'lucide-react';

export function ContactForm() {
  return (
    <FormWrapper
      endpoint="/api/contact"
      successMessage="Message sent. We will respond within one business day."
    >
      {({ loading }: { loading: boolean }) => (
        <>
          <div>
            <label htmlFor="name" className="text-sm font-medium">Name *</label>
            <input id="name" name="name" required className="mt-1.5 w-full rounded-lg border border-border bg-background px-4 py-3 text-sm focus:border-primary focus:ring-1 focus:ring-primary" placeholder="Your name" />
          </div>
          <div>
            <label htmlFor="email" className="text-sm font-medium">Email *</label>
            <input id="email" name="email" type="email" required className="mt-1.5 w-full rounded-lg border border-border bg-background px-4 py-3 text-sm focus:border-primary focus:ring-1 focus:ring-primary" placeholder="you@company.com" />
          </div>
          <div>
            <label htmlFor="subject" className="text-sm font-medium">Subject</label>
            <input id="subject" name="subject" className="mt-1.5 w-full rounded-lg border border-border bg-background px-4 py-3 text-sm focus:border-primary focus:ring-1 focus:ring-primary" placeholder="What is this about?" />
          </div>
          <div>
            <label htmlFor="message" className="text-sm font-medium">Message *</label>
            <textarea id="message" name="message" required rows={4} className="mt-1.5 w-full rounded-lg border border-border bg-background px-4 py-3 text-sm focus:border-primary focus:ring-1 focus:ring-primary" placeholder="Tell us how we can help" />
          </div>
          <button type="submit" disabled={loading} className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground transition-all hover:bg-primary/90 disabled:opacity-60">
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
            {loading ? 'Sending...' : 'Send Message'}
          </button>
        </>
      )}
    </FormWrapper>
  );
}
