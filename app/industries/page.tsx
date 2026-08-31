import { generatePageMeta } from '@/lib/page-utils';
import { PageShell } from '@/components/layout/page-shell';
import { serviceSchema } from '@/lib/seo';
import { ScrollReveal } from '@/components/motion/scroll-reveal';
import Link from 'next/link';
import { Warehouse, Store, Factory, HardHat, HeartPulse, GraduationCap, Landmark, Car, Zap, Building, Home, UtensilsCrossed, Archive, Trash2, Radio, MapPin } from 'lucide-react';

/**
 * Page identity. Declared once and consumed twice: by `generatePageMeta` for the
 * <head> tags, and by `PageShell` for the on-page structured data. Keeping it in one
 * const is what stops the meta description and the schema drifting apart.
 */
const pageMeta = {
  title: "Industries | AI Video Surveillance by Sector",
  description: "Camzify provides AI-powered virtual patrolling and video analytics for warehouses, retail, manufacturing, construction, healthcare, and more.",
  path: "/industries",
};

export const metadata = generatePageMeta({ ...pageMeta });

const items = [
  { slug: 'warehouses', name: 'Warehouses', icon: Warehouse },
  { slug: 'retail', name: 'Retail', icon: Store },
  { slug: 'manufacturing', name: 'Manufacturing', icon: Factory },
  { slug: 'construction-sites', name: 'Construction Sites', icon: HardHat },
  { slug: 'healthcare', name: 'Healthcare', icon: HeartPulse },
  { slug: 'education-facilities', name: 'Education Facilities', icon: GraduationCap },
  { slug: 'financial-services', name: 'Financial Services', icon: Landmark },
  { slug: 'automotive', name: 'Automotive', icon: Car },
  { slug: 'energy', name: 'Energy', icon: Zap },
  { slug: 'property-management', name: 'Property Management', icon: Building },
  { slug: 'residential', name: 'Residential', icon: Home },
  { slug: 'restaurants', name: 'Restaurants', icon: UtensilsCrossed },
  { slug: 'self-storage', name: 'Self-Storage', icon: Archive },
  { slug: 'waste-management', name: 'Waste Management', icon: Trash2 },
  { slug: 'remote-sites', name: 'Remote Sites', icon: Radio },
  { slug: 'multiple-sites', name: 'Multiple Sites', icon: MapPin },
];

export default function IndustriesHub() {
  return (
    <PageShell {...pageMeta} schema={[serviceSchema({ name: "Industries", description: "Camzify provides AI-powered virtual patrolling and video analytics for warehouses, retail, manufacturing, construction, healthcare, and more.", path: "/industries" })]} breadcrumbs={[{ label: 'Industries' }]}>
      <section className="pb-20">
        <div className="mx-auto max-w-site px-6">
          <h1 className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl">Industries</h1>
          <p className="mt-6 max-w-2xl text-body text-muted-foreground">
            Every facility is different, but the security challenge is the same: cameras record, guards can't be everywhere, and nobody checks what needs checking. Camzify's <a href="/virtual-patrolling" className="text-primary hover:underline">virtual patrolling</a> system is configured per environment to address industry-specific risks.
          </p>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {items.map((ind, i) => (
              <ScrollReveal key={ind.slug} delay={i * 0.04}>
                <Link href={`/industries/${ind.slug}`} className="group flex flex-col items-center rounded-xl bg-card p-6 text-center shadow-md transition-all hover:shadow-lg hover:-translate-y-0.5">
                  <ind.icon className="h-10 w-10 text-primary" />
                  <h2 className="mt-3 font-display text-base font-bold">{ind.name}</h2>
                  <span className="mt-2 text-xs font-semibold text-primary">Explore →</span>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
