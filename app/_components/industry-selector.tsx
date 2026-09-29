import Link from 'next/link';
import { ScrollReveal } from '@/components/motion/scroll-reveal';
import {
  Warehouse, ShoppingCart, Factory, HardHat, Stethoscope, GraduationCap,
  DollarSign, Car, Zap, Building, Home, UtensilsCrossed, Archive,
  Trash2, Globe, LayoutGrid,
} from 'lucide-react';
import { hrefFor, isForeignFor, type Locale } from '@/lib/i18n';

/*
 * Renders on both homepages; the words switch with `locale`. The German names match
 * /de/branchen. Three industries have a German page (hrefFor finds it); the other
 * thirteen link to the English page and carry an "EN" marker on the German side.
 */
const industries = [
  { icon: Warehouse, label: 'Warehouses', labelDe: 'Lager und Logistik', href: '/industries/warehouses' },
  { icon: ShoppingCart, label: 'Retail', labelDe: 'Einzelhandel', href: '/industries/retail' },
  { icon: Factory, label: 'Manufacturing', labelDe: 'Industrie und Produktion', href: '/industries/manufacturing' },
  { icon: HardHat, label: 'Construction', labelDe: 'Baustellen', href: '/industries/construction-sites' },
  { icon: Stethoscope, label: 'Healthcare', labelDe: 'Gesundheitswesen', href: '/industries/healthcare' },
  { icon: GraduationCap, label: 'Education', labelDe: 'Bildungseinrichtungen', href: '/industries/education-facilities' },
  { icon: DollarSign, label: 'Financial Services', labelDe: 'Banken und Finanzdienstleister', href: '/industries/financial-services' },
  { icon: Car, label: 'Automotive', labelDe: 'Autohäuser und Werkstätten', href: '/industries/automotive' },
  { icon: Zap, label: 'Energy', labelDe: 'Energie und Versorgung', href: '/industries/energy' },
  { icon: Building, label: 'Property Management', labelDe: 'Immobilienverwaltung', href: '/industries/property-management' },
  { icon: Home, label: 'Residential', labelDe: 'Wohnanlagen', href: '/industries/residential' },
  { icon: UtensilsCrossed, label: 'Restaurants', labelDe: 'Gastronomie', href: '/industries/restaurants' },
  { icon: Archive, label: 'Self-Storage', labelDe: 'Self-Storage', href: '/industries/self-storage' },
  { icon: Trash2, label: 'Waste Management', labelDe: 'Entsorgung und Recycling', href: '/industries/waste-management' },
  { icon: Globe, label: 'Remote Sites', labelDe: 'Abgelegene Standorte', href: '/industries/remote-sites' },
  { icon: LayoutGrid, label: 'Multiple Sites', labelDe: 'Mehrere Standorte', href: '/industries/multiple-sites' },
];

const COPY = {
  en: {
    eyebrow: 'Industries',
    heading: 'Built for operations that never close',
    lede: 'From warehouse perimeters to hospital corridors. Camzify patrols any environment where cameras are already installed.',
  },
  de: {
    eyebrow: 'Branchen',
    heading: 'Für Betriebe, die nie schließen',
    lede: 'Vom Zaun des Lagers bis zum Krankenhausflur. Camzify führt Rundgänge in jeder Umgebung durch, in der bereits Kameras installiert sind.',
  },
} as const;

export function IndustrySelector({ locale = 'en' }: { locale?: Locale }) {
  const copy = COPY[locale];
  return (
    <section className="bg-muted/30 py-20 sm:py-28">
      <div className="mx-auto max-w-site px-6">
        <ScrollReveal>
          <div className="text-center">
            <span className="font-mono text-mono-sm uppercase text-primary">{copy.eyebrow}</span>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl">
              {copy.heading}
            </h2>
            <p className="mt-4 mx-auto max-w-2xl text-body text-muted-foreground">
              {copy.lede}
            </p>
          </div>
        </ScrollReveal>
        <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8">
          {(industries ?? []).map((ind: any, i: number) => {
            const Icon = ind?.icon ?? Building;
            const href: string = ind?.href ?? '/';
            const foreign = isForeignFor(href, locale);
            return (
              <ScrollReveal key={i} delay={i * 0.03}>
                <Link
                  href={hrefFor(href, locale)}
                  hrefLang={foreign ? 'en-US' : undefined}
                  className="group flex flex-col items-center gap-2 rounded-xl border border-border bg-card p-4 text-center transition-all duration-200 hover:border-primary/30 hover:shadow-md hover:-translate-y-1"
                >
                  <Icon className="h-6 w-6 text-muted-foreground transition-colors group-hover:text-primary" />
                  <span className="text-xs font-medium">{(locale === 'de' ? ind?.labelDe : ind?.label) ?? ''}</span>
                  {foreign && (
                    <span
                      title="Seite auf Englisch"
                      className="rounded border border-border px-1 font-mono text-[10px] font-semibold leading-4 text-muted-foreground"
                    >
                      EN
                    </span>
                  )}
                </Link>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
