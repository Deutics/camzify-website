'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ChevronDown, ArrowRight, ArrowUpRight, MousePointerClick, Calculator, Milestone } from 'lucide-react';
import { navItems, siteConfig, isNavMenu, type NavMenu, type NavColumn, type NavSection, type NavFeature } from '@/lib/site-config';
import { ThemeToggle } from '@/components/system/theme-toggle';
import { SiteLogo } from '@/components/layout/site-logo';
import { AnimatePresence, motion } from 'framer-motion';

/** Width of one column unit in a mega-menu panel, in px. A `span: 2` column takes two. */
const COLUMN_UNIT = 236;
const PANEL_PADDING = 40;

const FEATURE_ICONS: Record<NavFeature['icon'], typeof Calculator> = {
  demo: MousePointerClick,
  calculator: Calculator,
  roadmap: Milestone,
};

function unitsFor(menu: NavMenu): number {
  return menu.columns.reduce((sum, col) => sum + (col.span ?? 1), 0);
}

function panelWidthFor(menu: NavMenu): number {
  return unitsFor(menu) * COLUMN_UNIT + PANEL_PADDING;
}

/** Every href a menu reaches, so the top-level item can show as active on any of its pages. */
function hrefsFor(menu: NavMenu): string[] {
  return menu.columns.flatMap((col) => [
    ...(col.href ? [col.href] : []),
    ...col.sections.flatMap((s) => s.items.map((i) => i.href)),
  ]);
}

/**
 * Split sections, in order, into `n` sub-columns so the tallest is as short as
 * possible. Weight is one line per item plus one for the heading. The inputs are tiny
 * (at most six sections), so the exact search is cheap.
 */
function packSections(sections: NavSection[], n: number): NavSection[][] {
  const weights = sections.map((s) => s.items.length + (s.label ? 1 : 0));
  const k = Math.min(n, sections.length);
  if (k <= 1) return sections.length ? [sections] : [];
  const INF = Number.POSITIVE_INFINITY;
  const best: number[][] = Array.from({ length: sections.length + 1 }, () => Array(k + 1).fill(INF));
  const cut: number[][] = Array.from({ length: sections.length + 1 }, () => Array(k + 1).fill(0));
  best[0][0] = 0;
  for (let i = 1; i <= sections.length; i++) {
    for (let j = 1; j <= Math.min(i, k); j++) {
      let load = 0;
      for (let start = i; start >= j; start--) {
        load += weights[start - 1];
        const candidate = Math.max(best[start - 1][j - 1], load);
        if (candidate < best[i][j]) {
          best[i][j] = candidate;
          cut[i][j] = start - 1;
        }
      }
    }
  }
  const packed: NavSection[][] = [];
  let end = sections.length;
  for (let j = k; j >= 1; j--) {
    const start = cut[end][j];
    packed.unshift(sections.slice(start, end));
    end = start;
  }
  return packed;
}

function SectionList({ section }: { section: NavSection }) {
  return (
    <div>
      {section.label && (
        <p className="mb-1 px-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">{section.label}</p>
      )}
      <ul className="grid">
        {section.items.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="group block rounded-md px-2 py-1.5 transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <span className="block text-[13px] font-medium leading-snug group-hover:text-primary">{link.label}</span>
              {link.description && (
                <span className="mt-0.5 block text-xs leading-snug text-muted-foreground">{link.description}</span>
              )}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function PanelColumn({ column }: { column: NavColumn }) {
  const span = column.span ?? 1;
  const stacks = packSections(column.sections, span);
  return (
    <div className="min-w-0">
      {column.href ? (
        <Link
          href={column.href}
          className="group mb-2 inline-flex items-center gap-1 rounded-md px-2 py-1 text-sm font-semibold text-foreground transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          {column.label}
          <ArrowRight className="h-3.5 w-3.5 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-primary" aria-hidden="true" />
        </Link>
      ) : (
        <p className="mb-2 px-2 py-1 text-sm font-semibold text-foreground">{column.label}</p>
      )}
      <div className="grid gap-x-3" style={{ gridTemplateColumns: `repeat(${stacks.length}, minmax(0, 1fr))` }}>
        {stacks.map((stack, i) => (
          <div key={stack[0]?.label ?? i} className="space-y-3">
            {stack.map((section, j) => (
              <SectionList key={section.label ?? j} section={section} />
            ))}
          </div>
        ))}
      </div>
      {column.more && (
        <Link
          href={column.more.href}
          className="group mt-2 inline-flex items-center gap-1 rounded-md px-2 py-1 text-[13px] font-medium text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          {column.more.label}
          <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
        </Link>
      )}
    </div>
  );
}

function FeatureLink({ feature, compact = false }: { feature: NavFeature; compact?: boolean }) {
  const Icon = FEATURE_ICONS[feature.icon];
  return (
    <Link
      href={feature.href}
      className={`group flex items-center gap-3 rounded-lg transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${compact ? 'px-3 py-2.5' : 'px-3 py-2'}`}
    >
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
        <Icon className="h-4 w-4" aria-hidden="true" />
      </span>
      <span className="min-w-0">
        <span className="block text-sm font-semibold group-hover:text-primary">{feature.label}</span>
        <span className="block text-xs text-muted-foreground">{feature.description}</span>
      </span>
      <ArrowRight className="ml-auto h-4 w-4 shrink-0 text-muted-foreground group-hover:text-primary" aria-hidden="true" />
    </Link>
  );
}

/**
 * Primary site navigation: logo, four top-level entries, and the actions (theme,
 * console sign-in, book a demo).
 *
 * Two properties this component has to hold simultaneously:
 *
 * 1. **Keyboard operable.** Each mega-menu has a real `<button aria-expanded
 *    aria-controls>` trigger beside its hub link, opens on hover, focus or click,
 *    closes on Escape (returning focus to its trigger), and closes when focus leaves.
 *
 * 2. **Crawlable.** Desktop panels stay mounted and are hidden with
 *    `opacity/visibility` + `inert` rather than removed. They are also in the HTML at
 *    every viewport width (the desktop nav is only CSS-hidden on small screens), so the
 *    full link set reaches the mobile crawler too. See the coverage rule in
 *    lib/site-config.ts: this header is the main internal-link path to the deep pages.
 *
 * Layout is a three-column grid with the nav centered. The logo's distance from the
 * nav is then fixed by the grid, not by whatever space `justify-between` leaves over,
 * which is what used to squeeze it on laptops.
 */
export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  /** Horizontal offset (px) that keeps a wide panel inside the viewport. */
  const [menuShift, setMenuShift] = useState(0);
  const [mobileOpenItem, setMobileOpenItem] = useState<string | null>(null);
  const [mobileOpenColumn, setMobileOpenColumn] = useState<string | null>(null);

  const pathname = usePathname();
  const triggerRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const wrapperRefs = useRef<Record<string, HTMLDivElement | null>>({});

  /** Pending close from a mouse leave; cancelled if the pointer comes back within the delay. */
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const cancelClose = useCallback(() => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  }, []);

  const closeAll = useCallback(() => {
    cancelClose();
    setActiveMenu(null);
  }, [cancelClose]);

  /**
   * Close after a short grace period. A menu that closes the instant the pointer
   * crosses the gap between trigger and panel reads as broken; 140ms is long enough
   * to cross the gap and short enough that leaving the nav feels immediate.
   */
  const scheduleClose = useCallback(() => {
    cancelClose();
    closeTimer.current = setTimeout(() => setActiveMenu(null), 140);
  }, [cancelClose]);

  useEffect(() => cancelClose, [cancelClose]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close every menu on navigation.
  useEffect(() => {
    setMobileOpen(false);
    setMobileOpenItem(null);
    setMobileOpenColumn(null);
    closeAll();
  }, [pathname, closeAll]);

  // Escape closes the open menu and returns focus to whatever opened it.
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Escape' || !activeMenu) return;
      triggerRefs.current[activeMenu]?.focus();
      closeAll();
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [activeMenu, closeAll]);

  /**
   * Open a menu. The nav is centered, so its panel is centered on the viewport too
   * (clamped to a 16px margin) rather than hanging off its trigger, which left wide
   * panels hugging the right edge. The pointer arrow compensates and stays under the
   * trigger.
   */
  const openMenu = useCallback((menu: NavMenu) => {
    cancelClose();
    setActiveMenu(menu.label);
    const el = wrapperRefs.current[menu.label];
    if (!el) return;
    const margin = 16;
    const width = Math.min(panelWidthFor(menu), window.innerWidth - margin * 2);
    const rect = el.getBoundingClientRect();
    const centeredLeft = Math.max(margin, Math.min((window.innerWidth - width) / 2, window.innerWidth - margin - width));
    setMenuShift(Math.round(centeredLeft - rect.left));
  }, [cancelClose]);

  /** Close the group when focus moves entirely outside it. */
  const handleBlurOut = (e: React.FocusEvent<HTMLElement>, close: () => void) => {
    if (!e.currentTarget.contains(e.relatedTarget as Node | null)) close();
  };

  const isActivePath = (href: string) =>
    href === '/' ? pathname === '/' : pathname === href || Boolean(pathname?.startsWith(`${href}/`));

  const topLinkClass = (active: boolean) =>
    `whitespace-nowrap rounded-md py-2 pl-3 text-sm font-medium transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
      active ? 'text-primary' : 'text-foreground/80'
    }`;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-normal ${
        scrolled ? 'bg-background/90 shadow-md backdrop-blur-xl py-2' : 'bg-transparent py-4'
      }`}
    >
      {/*
        Three columns, 1fr | auto | 1fr, so the nav sits at the true center of the bar
        whatever the widths of the logo and the actions. Each child is pinned to its
        column: on small screens the nav is display:none, and without explicit
        placement the actions would fall into the middle column.
      */}
      <div className="mx-auto grid max-w-site grid-cols-[1fr_auto_1fr] items-center px-4 xl:px-6">
        <Link
          href="/"
          className="col-start-1 flex flex-shrink-0 items-center justify-self-start rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          aria-label={`${siteConfig.name} home`}
        >
          <SiteLogo className="h-8 w-auto" priority />
        </Link>

        {/* Desktop nav */}
        <nav className="col-start-2 hidden items-center gap-1 lg:flex" aria-label="Main">
          {navItems.map((entry) => {
            if (!isNavMenu(entry)) {
              return (
                <Link
                  key={entry.label}
                  href={entry.href}
                  className={`${topLinkClass(isActivePath(entry.href))} pr-3`}
                  aria-current={pathname === entry.href ? 'page' : undefined}
                >
                  {entry.label}
                </Link>
              );
            }

            const menu = entry;
            const menuId = `nav-menu-${menu.label.toLowerCase()}`;
            const isOpen = activeMenu === menu.label;
            const active = hrefsFor(menu).some(isActivePath);
            const width = panelWidthFor(menu);

            return (
              <div
                key={menu.label}
                ref={(el) => {
                  wrapperRefs.current[menu.label] = el;
                }}
                className="relative"
                onMouseEnter={() => openMenu(menu)}
                onMouseLeave={scheduleClose}
                onFocus={() => openMenu(menu)}
                onBlur={(e) => handleBlurOut(e, closeAll)}
              >
                <div className={`flex items-center rounded-md transition-colors duration-fast ${isOpen ? 'bg-accent' : ''}`}>
                  <Link href={menu.href} className={topLinkClass(active || isOpen)}>
                    {menu.label}
                  </Link>
                  <button
                    type="button"
                    ref={(el) => {
                      triggerRefs.current[menu.label] = el;
                    }}
                    onClick={() => (isOpen ? closeAll() : openMenu(menu))}
                    aria-expanded={isOpen}
                    aria-controls={menuId}
                    aria-label={`${menu.label} menu`}
                    className={`flex h-9 w-7 items-center justify-center rounded-md transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                      active || isOpen ? 'text-primary' : 'text-foreground/70'
                    }`}
                  >
                    <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-fast ${isOpen ? 'rotate-180' : ''}`} aria-hidden="true" />
                  </button>
                </div>

                <div
                  id={menuId}
                  {...({ inert: isOpen ? undefined : '' } as Record<string, unknown>)}
                  style={{ width: `min(${width}px, calc(100vw - 2rem))`, left: menuShift }}
                  className={`absolute top-full z-50 origin-top pt-2.5 transition-[opacity,transform,visibility] duration-200 ease-out-expo ${
                    isOpen
                      ? 'visible translate-y-0 scale-100 opacity-100'
                      : 'invisible pointer-events-none -translate-y-1 scale-[0.98] opacity-0'
                  }`}
                >
                  {/* Pointer under the trigger; it stays put when the panel is shifted left to fit the viewport. */}
                  <span
                    aria-hidden="true"
                    className="absolute top-[5px] z-10 h-3 w-3 rotate-45 rounded-sm border-l border-t border-border bg-card"
                    style={{ left: 28 - menuShift }}
                  />
                  {/* Solid, not translucent: at this size a see-through panel lets the hero headline read through the links. */}
                  <div className="max-h-[calc(100vh-6rem)] overflow-y-auto rounded-xl border border-border bg-card shadow-2xl">
                    <div
                      className="grid gap-x-5 p-4"
                      style={{ gridTemplateColumns: menu.columns.map((c) => `minmax(0, ${c.span ?? 1}fr)`).join(' ') }}
                    >
                      {menu.columns.map((column, i) => (
                        <div key={column.label} className={i > 0 ? 'border-l border-border pl-5' : ''}>
                          <PanelColumn column={column} />
                        </div>
                      ))}
                    </div>
                    {menu.feature && (
                      <div className="rounded-b-xl border-t border-border bg-muted/40 p-2">
                        <div className="max-w-md">
                          <FeatureLink feature={menu.feature} />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </nav>

        {/* Right actions */}
        <div className="col-start-3 flex flex-shrink-0 items-center gap-2 justify-self-end">
          {/* On phones the theme toggle moves into the menu, so the bar keeps room for the demo button. */}
          <div className="hidden sm:block">
            <ThemeToggle />
          </div>
          {/*
            Two distinct actions rather than one dropdown. Sign-in and booking a demo
            are different intents — an existing customer should not have to open a menu
            labelled "Book a Demo" to reach the product.
          */}
          <a
            href={siteConfig.appUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-1.5 whitespace-nowrap rounded-lg border border-border px-3.5 py-2 text-[13px] font-semibold lg:inline-flex transition-colors duration-fast hover:border-primary/40 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            Sign in
            <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
          </a>

          {/* Visible at every width: on a phone this is the one action that matters most. */}
          <Link
            href="/book-a-demo"
            className="inline-flex items-center whitespace-nowrap rounded-lg bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground transition-all duration-fast hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:py-2 sm:text-[13px] xl:px-4"
          >
            Book a Demo
          </Link>

          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="rounded-md p-2 text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring lg:hidden"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
          >
            {mobileOpen ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden border-t border-border bg-background lg:hidden"
          >
            <nav aria-label="Mobile" className="mx-auto max-h-[calc(100vh-72px)] max-w-site overflow-y-auto px-6 py-4">
              {navItems.map((entry) => {
                if (!isNavMenu(entry)) {
                  return (
                    <Link
                      key={entry.label}
                      href={entry.href}
                      className="block border-b border-border/60 px-3 py-3 text-sm font-medium transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      {entry.label}
                    </Link>
                  );
                }

                const menu = entry;
                const itemId = `mobile-item-${menu.label.toLowerCase()}`;
                const itemOpen = mobileOpenItem === menu.label;

                return (
                  <div key={menu.label} className="border-b border-border/60">
                    <button
                      type="button"
                      onClick={() => {
                        setMobileOpenItem(itemOpen ? null : menu.label);
                        setMobileOpenColumn(null);
                      }}
                      className={`flex w-full items-center justify-between px-3 py-3 text-left text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                        itemOpen ? 'text-primary' : 'text-foreground'
                      }`}
                      aria-expanded={itemOpen}
                      aria-controls={itemId}
                    >
                      {menu.label}
                      <ChevronDown aria-hidden="true" className={`h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200 ${itemOpen ? 'rotate-180' : ''}`} />
                    </button>

                    <motion.div
                      id={itemId}
                      {...({ inert: itemOpen ? undefined : '' } as Record<string, unknown>)}
                      initial={false}
                      animate={{ height: itemOpen ? 'auto' : 0, opacity: itemOpen ? 1 : 0 }}
                      transition={{ duration: 0.2, ease: 'easeOut' }}
                      className="overflow-hidden"
                    >
                      <div className="pb-3 pl-3">
                        {menu.columns.map((column) => {
                          if (menu.mobileFlat) {
                            return (
                              <div key={column.label} className="pt-1">
                                <p className="px-3 pb-0.5 pt-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">{column.label}</p>
                                <MobileSections column={column} />
                              </div>
                            );
                          }
                          const colKey = `${menu.label}-${column.label}`;
                          const colId = `mobile-col-${colKey}`.replace(/\s+/g, '-').toLowerCase();
                          const colOpen = mobileOpenColumn === colKey;
                          return (
                            <div key={column.label}>
                              <button
                                type="button"
                                onClick={() => setMobileOpenColumn(colOpen ? null : colKey)}
                                className={`flex w-full items-center justify-between px-3 py-2.5 text-left text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                                  colOpen ? 'text-foreground' : 'text-muted-foreground'
                                }`}
                                aria-expanded={colOpen}
                                aria-controls={colId}
                              >
                                {column.label}
                                <ChevronDown aria-hidden="true" className={`h-3.5 w-3.5 shrink-0 transition-transform duration-200 ${colOpen ? 'rotate-180' : ''}`} />
                              </button>
                              <motion.div
                                id={colId}
                                {...({ inert: colOpen ? undefined : '' } as Record<string, unknown>)}
                                initial={false}
                                animate={{ height: colOpen ? 'auto' : 0, opacity: colOpen ? 1 : 0 }}
                                transition={{ duration: 0.15 }}
                                className="overflow-hidden pl-3"
                              >
                                {column.href && (
                                  <Link
                                    href={column.href}
                                    className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                                  >
                                    {column.label} overview
                                    <ArrowRight className="h-3 w-3" aria-hidden="true" />
                                  </Link>
                                )}
                                <MobileSections column={column} />
                              </motion.div>
                            </div>
                          );
                        })}
                        {menu.feature && (
                          <div className="mt-2">
                            <FeatureLink feature={menu.feature} compact />
                          </div>
                        )}
                      </div>
                    </motion.div>
                  </div>
                );
              })}

              <div className="space-y-2 pt-4">
                <Link
                  href="/book-a-demo"
                  className="block w-full rounded-lg bg-primary px-5 py-3 text-center text-sm font-semibold text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  Book a Demo
                </Link>
                <a
                  href={siteConfig.appUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full items-center justify-center gap-1.5 rounded-lg border border-border px-5 py-3 text-center text-sm font-semibold transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  Sign in to the console
                  <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                </a>
                <div className="flex items-center justify-between px-3 pt-1 text-sm text-muted-foreground sm:hidden">
                  Theme
                  <ThemeToggle />
                </div>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function MobileSections({ column }: { column: NavColumn }) {
  return (
    <div className="space-y-1 pb-2">
      {column.sections.map((section, i) => (
        <div key={section.label ?? i}>
          {section.label && (
            <p className="px-3 pb-0.5 pt-1.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/80">{section.label}</p>
          )}
          <ul>
            {section.items.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="block px-3 py-1.5 text-[13px] text-foreground/80 transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
      {column.more && (
        <Link href={column.more.href} className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-primary">
          {column.more.label}
          <ArrowRight className="h-3 w-3" aria-hidden="true" />
        </Link>
      )}
    </div>
  );
}
