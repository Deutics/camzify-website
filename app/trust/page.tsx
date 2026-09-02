import { generatePageMeta } from '@/lib/page-utils';
import { PageShell } from '@/components/layout/page-shell';
import { ScrollReveal } from '@/components/motion/scroll-reveal';
import Link from 'next/link';

/**
 * Page identity. Declared once and consumed twice: by `generatePageMeta` for the
 * <head> tags, and by `PageShell` for the on-page structured data. Keeping it in one
 * const is what stops the meta description and the schema drifting apart.
 */
const pageMeta = {
  title: "Trust | Security & Transparency",
  description: "How Camzify handles data, security, and transparency. Honest answers about what we do and do not do with your camera feeds.",
  path: "/trust",
};

export const metadata = generatePageMeta({ ...pageMeta });

export default function TrustPage() {
  return (
    <PageShell {...pageMeta} breadcrumbs={[{ label: 'Trust' }]}>
      <section className="pb-16">
        <div className="mx-auto max-w-site px-6">
          <h1 className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl">Trust</h1>
          <p className="mt-6 max-w-prose text-body text-muted-foreground">
            Trust in a video surveillance platform is earned through transparency, not marketing claims. This page states plainly what Camzify does and does not do with your camera feeds, data, and <Link href="/virtual-patrolling" className="text-primary hover:underline">patrol records</Link>.
          </p>
          <div className="mt-16 space-y-12 max-w-prose">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">Data handling</h2>
              <p className="mt-4 text-muted-foreground">Camera feeds are processed for AI detection and patrol verification. Video footage is stored according to your configured retention policy and encrypted at rest. We do not sell, share, or use customer video data for model training without explicit consent.</p>
            </ScrollReveal>
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">Account actions are logged</h2>
              <p className="mt-4 text-muted-foreground">
                Every account keeps an activity record covering sign-ins, security changes,
                configuration changes, AI feature activity and user-management actions, filterable
                by category. It is visible to the account holder under My Profile, not something
                that has to be requested from us.
              </p>
              <p className="mt-4 text-muted-foreground">
                We mention it here because it is a thing that exists today and can be checked,
                rather than a certification we are working towards. If you need to answer who
                changed a retention policy, who added a camera, or who acknowledged an alert and
                when, that record is already being kept.
              </p>
            </ScrollReveal>
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">What we do not claim</h2>
              <p className="mt-4 text-muted-foreground">We do not claim to replace all security guards at all facilities. We do not claim zero false alarms. We do not claim compliance with certifications we have not obtained. See the <Link href="/security-and-compliance" className="text-primary hover:underline">security and compliance</Link> page for specific details on our security posture.</p>
            </ScrollReveal>
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">Honest numbers</h2>
              <p className="mt-4 text-muted-foreground">
                We do not publish customer counts, cameras-connected totals, patrol-round volumes,
                uptime percentages or average response times on this site. Not because they are
                unflattering, but because we have not put them through a verification process we
                would be willing to defend — and a security vendor quoting an unverifiable
                reliability figure is exactly the thing this page exists to avoid.
              </p>
              <p className="mt-4 text-muted-foreground">
                What we will do instead: during an evaluation we will show you the real numbers for
                your own deployment — rounds completed against rounds scheduled, per-camera
                compliance, and alert volumes — from the same{' '}
                <Link href="/platform/analytics-and-reporting" className="text-primary hover:underline">analytics and reporting</Link>{' '}
                surface your team would use in production. Those are numbers you can audit yourself
                rather than take on trust.
              </p>
              <p className="mt-4 text-muted-foreground">
                When aggregate figures are independently verified, they will appear here with the
                method used to produce them.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
