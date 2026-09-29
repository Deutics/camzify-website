import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { Locale } from '@/lib/i18n';
import { t } from '@/lib/ui-strings';

export function CTABand({
  locale = 'en',
  title = t(locale).cta.title,
  description = t(locale).cta.description,
  primaryLabel = t(locale).cta.primaryLabel,
  primaryHref = '/book-a-demo',
  secondaryLabel = t(locale).cta.secondaryLabel,
  secondaryHref = '/roi-calculator',
}: {
  /** Chooses the default copy. Links stay on the English demo and calculator pages, which have no German version. */
  locale?: Locale;
  title?: string;
  description?: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
}) {
  return (
    <section className="bg-primary py-16 sm:py-20">
      <div className="mx-auto max-w-site px-6 text-center">
        <h2 className="font-display text-2xl font-bold tracking-tight text-white sm:text-3xl lg:text-4xl">
          {title}
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-body text-white/80">
          {description}
        </p>
        <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Link
            href={primaryHref}
            // Surface shade of the brand red, not `text-primary` (--primary-text), which is
            // lightened for dark mode and only reaches 3:1 on this white button. This holds 7:1.
            className="inline-flex items-center gap-2 rounded-lg bg-white px-8 py-3.5 font-semibold text-[hsl(var(--primary))] transition-all duration-fast hover:bg-white/90 hover:shadow-lg"
          >
            {primaryLabel}
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href={secondaryHref}
            className="inline-flex items-center gap-2 rounded-lg border-2 border-white/30 px-8 py-3.5 font-semibold text-white transition-all duration-fast hover:border-white/60 hover:bg-white/10"
          >
            {secondaryLabel}
          </Link>
        </div>
      </div>
    </section>
  );
}
