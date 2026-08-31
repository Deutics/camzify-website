import Link from 'next/link';
import { ScrollReveal } from '@/components/motion/scroll-reveal';
import {
  Warehouse, ShoppingCart, Factory, HardHat, Stethoscope, GraduationCap,
  DollarSign, Car, Zap, Building, Home, UtensilsCrossed, Archive,
  Trash2, Globe, LayoutGrid,
} from 'lucide-react';

const industries = [
  { icon: Warehouse, label: 'Warehouses', href: '/industries/warehouses' },
  { icon: ShoppingCart, label: 'Retail', href: '/industries/retail' },
  { icon: Factory, label: 'Manufacturing', href: '/industries/manufacturing' },
  { icon: HardHat, label: 'Construction', href: '/industries/construction-sites' },
  { icon: Stethoscope, label: 'Healthcare', href: '/industries/healthcare' },
  { icon: GraduationCap, label: 'Education', href: '/industries/education-facilities' },
  { icon: DollarSign, label: 'Financial Services', href: '/industries/financial-services' },
  { icon: Car, label: 'Automotive', href: '/industries/automotive' },
  { icon: Zap, label: 'Energy', href: '/industries/energy' },
  { icon: Building, label: 'Property Management', href: '/industries/property-management' },
  { icon: Home, label: 'Residential', href: '/industries/residential' },
  { icon: UtensilsCrossed, label: 'Restaurants', href: '/industries/restaurants' },
  { icon: Archive, label: 'Self-Storage', href: '/industries/self-storage' },
  { icon: Trash2, label: 'Waste Management', href: '/industries/waste-management' },
  { icon: Globe, label: 'Remote Sites', href: '/industries/remote-sites' },
  { icon: LayoutGrid, label: 'Multiple Sites', href: '/industries/multiple-sites' },
];

export function IndustrySelector() {
  return (
    <section className="bg-muted/30 py-20 sm:py-28">
      <div className="mx-auto max-w-site px-6">
        <ScrollReveal>
          <div className="text-center">
            <span className="font-mono text-mono-sm uppercase text-primary">Industries</span>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl">
              Built for operations that never close
            </h2>
            <p className="mt-4 mx-auto max-w-2xl text-body text-muted-foreground">
              From warehouse perimeters to hospital corridors — Camzify patrols any environment
              where cameras are already installed.
            </p>
          </div>
        </ScrollReveal>
        <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8">
          {(industries ?? []).map((ind: any, i: number) => {
            const Icon = ind?.icon ?? Building;
            return (
              <ScrollReveal key={i} delay={i * 0.03}>
                <Link
                  href={ind?.href ?? '/'}
                  className="group flex flex-col items-center gap-2 rounded-xl border border-border bg-card p-4 text-center transition-all duration-200 hover:border-primary/30 hover:shadow-md hover:-translate-y-1"
                >
                  <Icon className="h-6 w-6 text-muted-foreground transition-colors group-hover:text-primary" />
                  <span className="text-xs font-medium">{ind?.label ?? ''}</span>
                </Link>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
