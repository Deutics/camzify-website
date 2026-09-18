import Link from 'next/link';
import { siteConfig } from '@/lib/site-config';
import { SiteImage } from '@/components/content/site-image';

/**
 * The byline under a guide's heading.
 *
 * Guides were Organization-attributed until the business supplied a real person to
 * credit. That mattered for more than tidiness: search quality guidance and AI answer
 * engines both weight content that has an identifiable, credentialed human behind it,
 * and none of these guides had one.
 *
 * The name, role and credential all come from `siteConfig.author`, which is also what
 * `personSchema()` reads — so the visible byline and the Person node in the structured
 * data cannot disagree. A byline claiming one thing while the schema claims another is
 * the specific failure that gets a rich result withheld.
 */
export function AuthorByline({ className = '' }: { className?: string }) {
  const { name, slug, role, credential } = siteConfig.author;

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* The author's own portrait, supplied by the business 2026-09-18, replacing the initials fallback. */}
      <SiteImage
        src="/author-muhammad-talha-profile.webp"
        alt=""
        width={80}
        height={80}
        sizes="40px"
        className="h-10 w-10 shrink-0 rounded-full border border-border object-cover"
      />
      <span className="text-sm leading-snug">
        <span className="block">
          <span className="text-muted-foreground">By </span>
          <Link
            href={`/about/${slug}`}
            className="font-semibold text-foreground hover:text-primary hover:underline"
          >
            {name}
          </Link>
          <span className="text-muted-foreground"> · {role}</span>
        </span>
        <span className="mt-0.5 block text-xs text-muted-foreground">{credential}</span>
      </span>
    </div>
  );
}
