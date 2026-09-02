import { generatePageMeta } from '@/lib/page-utils';
import { PageShell } from '@/components/layout/page-shell';
import { ScrollReveal } from '@/components/motion/scroll-reveal';
import { personSchema } from '@/lib/seo';
import { siteConfig } from '@/lib/site-config';
import Link from 'next/link';
import { Mail, Linkedin } from 'lucide-react';

/**
 * The author page.
 *
 * It exists so the byline on every guide resolves to a real person with a checkable
 * profile, rather than a name that appears nowhere else. That is the whole mechanism:
 * a byline linking to nothing is close to no byline at all, for a reader and for a
 * search engine.
 *
 * Everything here comes from `siteConfig.author`, which `personSchema()` also reads,
 * so the page and the Person node cannot drift apart.
 */
const { name, role, credential, email, linkedin, slug } = siteConfig.author;

const pageMeta = {
  title: `${name} | Product Manager and CTO at ${siteConfig.name}`,
  description: `${name} is ${role} at ${siteConfig.name}. ${credential}, and the author of the ${siteConfig.name} guides on virtual patrolling, AI video analytics and camera connectivity.`,
  path: `/about/${slug}`,
};

export const metadata = generatePageMeta({ ...pageMeta });

/** The guides carrying this byline, kept in one list so the page and links agree. */
const guides = [
  ['What is virtual patrolling?', '/guides/what-is-virtual-patrolling'],
  ['How to run a virtual patrol round', '/guides/how-to-run-a-virtual-patrol-round'],
  ['ONVIF and RTSP explained', '/guides/onvif-and-rtsp-explained'],
  ['How to reduce false alarms from security cameras', '/guides/how-to-reduce-false-alarms'],
  ['How to choose video analytics software', '/guides/how-to-choose-video-analytics-software'],
  ['Guard tour systems explained', '/guides/guard-tour-systems-explained'],
  ['Video retention requirements', '/guides/video-retention-requirements'],
  ['Security audit checklist', '/guides/security-audit-checklist'],
];

export default function AuthorPage() {
  return (
    <PageShell
      {...pageMeta}
      schema={[personSchema()]}
      breadcrumbs={[{ label: 'About', href: '/about' }, { label: name }]}
    >
      <section className="pb-16">
        <div className="mx-auto max-w-site px-6">
          <div className="flex flex-wrap items-center gap-5">
            <span
              aria-hidden="true"
              className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full border border-border bg-card font-display text-2xl font-bold text-primary"
            >
              {name.split(' ').map((p) => p[0]).join('').slice(0, 2)}
            </span>
            <div>
              <h1 className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl">{name}</h1>
              <p className="mt-2 font-mono text-mono-sm uppercase text-primary">
                {role}, {siteConfig.name}
              </p>
            </div>
          </div>

          <p className="mt-8 max-w-prose text-body text-muted-foreground">
            <strong className="font-semibold text-foreground">{credential}.</strong> {name} is{' '}
            {role} at {siteConfig.name}, where he is responsible for the{' '}
            <Link href="/virtual-patrolling" className="text-primary hover:underline">virtual patrolling</Link>{' '}
            system, the{' '}
            <Link href="/ai-features" className="text-primary hover:underline">AI detection models</Link>{' '}
            that run on customer cameras, and the platform those sit on.
          </p>

          <p className="mt-4 max-w-prose text-muted-foreground">
            He writes the guides on this site. They are written from building and running the
            product rather than from research &mdash; which is also why several of them say plainly
            what the software does not do, including that it does not predict incidents and does
            not eliminate false alarms.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={linkedin}
              rel="me noopener noreferrer"
              target="_blank"
              className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2.5 text-sm font-medium transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <Linkedin className="h-4 w-4 text-primary" aria-hidden="true" />
              LinkedIn
            </a>
            <a
              href={`mailto:${email}`}
              className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2.5 text-sm font-medium transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <Mail className="h-4 w-4 text-primary" aria-hidden="true" />
              {email}
            </a>
          </div>

          <div className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">Areas of focus</h2>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {[
                  ['Computer vision in production', 'Detection models running on cameras that were never installed with analytics in mind — poor angles, mixed lighting, whatever the site already had.'],
                  ['Automated surveillance workflows', 'Turning detections into something an operator can act on: patrol rounds, checklists, acknowledgement and an audit trail.'],
                  ['Camera interoperability', 'ONVIF and RTSP in practice, and relaying streams from networks that were never meant to be reachable.'],
                  ['False alarm reduction', 'The problem that decides whether a detection system gets used or switched off after a fortnight.'],
                ].map(([title, desc]) => (
                  <div key={title} className="rounded-xl border border-border bg-card p-6">
                    <h3 className="font-display text-base font-bold">{title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{desc}</p>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>

          <div className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">Guides by {name.split(' ')[0]}</h2>
              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {guides.map(([title, href]) => (
                  <li key={href}>
                    <Link
                      href={href}
                      className="block rounded-lg border border-border bg-card p-4 text-sm font-medium transition-colors hover:border-primary/30 hover:bg-accent/50"
                    >
                      {title}
                    </Link>
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-muted-foreground">
                <Link href="/guides" className="text-primary hover:underline">All guides &rarr;</Link>
              </p>
            </ScrollReveal>
          </div>

          <div className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">Getting in touch</h2>
              <p className="mt-4 max-w-prose text-muted-foreground">
                For anything about the product, a deployment or something on this site that looks
                wrong, <a href={`mailto:${email}`} className="text-primary hover:underline">{email}</a>{' '}
                reaches him directly. For sales and general enquiries use the{' '}
                <Link href="/contact" className="text-primary hover:underline">contact page</Link>, and for a
                walkthrough of the platform, <Link href="/book-a-demo" className="text-primary hover:underline">book a demo</Link>.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
