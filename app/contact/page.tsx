import { generatePageMeta } from '@/lib/page-utils';
import { PageShell } from '@/components/layout/page-shell';
import { ContactForm } from './_components/contact-form';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { siteConfig, formattedAddress } from '@/lib/site-config';
import Link from 'next/link';

/**
 * Page identity. Declared once and consumed twice: by `generatePageMeta` for the
 * <head> tags, and by `PageShell` for the on-page structured data. Keeping it in one
 * const is what stops the meta description and the schema drifting apart.
 */
const pageMeta = {
  title: "Contact Us",
  description: "Get in touch with the Camzify team. Reach us by email, phone, or submit a message through our contact form.",
  path: "/contact",
};

export const metadata = generatePageMeta({ ...pageMeta });

export default function ContactPage() {
  return (
    <PageShell {...pageMeta} breadcrumbs={[{ label: 'Contact' }]} showCTA={false}>
      <section className="pb-20">
        <div className="mx-auto max-w-site px-6">
          <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr]">
            <div>
              <h1 className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl">Contact Us</h1>
              <p className="mt-6 text-body text-muted-foreground">
                Have a question about <Link href="/virtual-patrolling" className="text-primary hover:underline">virtual patrolling</Link>,
                need technical support, or want to discuss a deployment? Reach out and we will respond within one business day.
              </p>

              <div className="mt-10 space-y-6">
                <div className="flex items-start gap-4">
                  <MapPin className="mt-0.5 h-5 w-5 text-primary flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold">Address</h3>
                    <p className="text-sm text-muted-foreground">{formattedAddress}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Phone className="mt-0.5 h-5 w-5 text-primary flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold">Phone</h3>
                    <p className="text-sm text-muted-foreground" suppressHydrationWarning>{siteConfig?.phone ?? ''}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Mail className="mt-0.5 h-5 w-5 text-primary flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold">Email</h3>
                    <p className="text-sm text-muted-foreground" suppressHydrationWarning>{siteConfig?.email ?? ''}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Clock className="mt-0.5 h-5 w-5 text-primary flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold">Response time</h3>
                    <p className="text-sm text-muted-foreground">Within one business day</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-card p-8">
              <h2 className="font-display text-xl font-bold">Send us a message</h2>
              <div className="mt-6">
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
