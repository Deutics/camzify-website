'use client';

import { useEffect, type ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import { localeFromPath, LOCALES } from '@/lib/i18n';
import { t } from '@/lib/ui-strings';

/*
 * Locale plumbing for the root layout, which is shared by every route and so cannot
 * know which language it is rendering. The path is the locale (lib/i18n.ts), and the
 * path is known during the static render, so everything below is in the prerendered
 * HTML, not patched in afterwards; DocumentLang is the one exception, see there.
 */

/**
 * Renders the child for the current path's language. Both children are server
 * components passed in from the layout (e.g. the English and German footers), so the
 * footer stays a server component; only the choice between them happens here.
 */
export function LocaleSlot({ en, de }: { en: ReactNode; de: ReactNode }) {
  return <>{localeFromPath(usePathname()) === 'de' ? de : en}</>;
}

/**
 * Keeps `<html lang>` in step with the page. The static HTML's root says `en` on every
 * route, because the root layout is shared; German content already carries `lang="de"`
 * on its own wrappers (PageShell, header, footer), and this corrects the document root
 * once the page hydrates, including after client-side navigation between languages.
 */
export function DocumentLang() {
  const pathname = usePathname();
  useEffect(() => {
    document.documentElement.lang = LOCALES[localeFromPath(pathname)].htmlLang;
  }, [pathname]);
  return null;
}

export function SkipLink() {
  const locale = localeFromPath(usePathname());
  return (
    <a
      href="#main"
      lang={LOCALES[locale].htmlLang}
      className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-primary-foreground"
    >
      {t(locale).skipToContent}
    </a>
  );
}
