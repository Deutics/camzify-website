'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ChevronDown, ChevronRight, ArrowUpRight } from 'lucide-react';
import { navItems, siteConfig } from '@/lib/site-config';
import { ThemeToggle } from '@/components/system/theme-toggle';
import { SiteLogo } from '@/components/layout/site-logo';
import { AnimatePresence, motion } from 'framer-motion';

/** A flat menu with more children than this renders as a columned panel. */
const WIDE_MENU_MIN = 8;
const NARROW_PANEL_WIDTH = 320;

type Column = { label: string; items: any[] };

/**
 * Columns for a menu, or null when it renders as a single narrow list. A `groups`
 * menu is one column per group; a long `children` menu is one column per distinct
 * `section`, with unsectioned children (the hub link) collected into the footer row.
 */
function columnsFor(item: any): { columns: Column[]; footer: any[] } | null {
  if (item?.groups) {
    return { columns: (item.groups as any[]).map((g) => ({ label: g?.label ?? '', items: g?.items ?? [] })), footer: [] };
  }
  const children: any[] = item?.children ?? [];
  if (children.length <= WIDE_MENU_MIN || !children.some((c) => c?.section)) return null;
  const columns: Column[] = [];
  const footer: any[] = [];
  for (const child of children) {
    if (!child?.section) {
      footer.push(child);
      continue;
    }
    const existing = columns.find((col) => col.label === child.section);
    if (existing) existing.items.push(child);
    else columns.push({ label: child.section, items: [child] });
  }
  return { columns, footer };
}

const MAX_PANEL_COLUMNS = 4;

/**
 * Split groups, in order, into at most `n` columns so the tallest column is as short
 * as possible. A menu with more groups than columns then stacks short groups instead
 * of wrapping to a second row. Weight is one line per item plus one for the heading.
 * The inputs are tiny (at most seven groups), so the exact search is cheap.
 */
function packColumns(groups: Column[], n: number): Column[][] {
  const weights = groups.map((g) => g.items.length + 1);
  const k = Math.min(n, groups.length);
  if (k <= 1) return groups.length ? [groups] : [];
  // best[i][j]: minimal tallest column when the first i groups fill j columns.
  const INF = Number.POSITIVE_INFINITY;
  const best: number[][] = Array.from({ length: groups.length + 1 }, () => Array(k + 1).fill(INF));
  const cut: number[][] = Array.from({ length: groups.length + 1 }, () => Array(k + 1).fill(0));
  best[0][0] = 0;
  for (let i = 1; i <= groups.length; i++) {
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
  const packed: Column[][] = [];
  let end = groups.length;
  for (let j = k; j >= 1; j--) {
    const start = cut[end][j];
    packed.unshift(groups.slice(start, end));
    end = start;
  }
  return packed;
}

/** Panel width in px: wide enough for four columns of one-line descriptions, narrow for a plain list. */
function panelWidthFor(item: any): number {
  const layout = columnsFor(item);
  if (!layout) return NARROW_PANEL_WIDTH;
  return Math.min(layout.columns.length, MAX_PANEL_COLUMNS) >= 4 ? 1080 : 760;
}

/**
 * Primary site navigation.
 *
 * Two properties this component has to hold simultaneously:
 *
 * 1. **Keyboard operable.** Submenus previously opened only on `mouseenter` and were
 *    unmounted when closed, which put roughly 80 navigation destinations permanently
 *    out of reach of keyboard and screen-reader users. Each submenu now has a real
 *    `<button aria-expanded aria-controls>` trigger alongside the hub link, opens on
 *    hover *or* focus *or* click, closes on Escape (returning focus to its trigger),
 *    and closes when focus leaves the group.
 *
 * 2. **Crawlable.** Submenu panels stay mounted and are hidden with
 *    `opacity/visibility` + `inert` rather than being removed from the tree. `inert`
 *    keeps closed panels out of the tab order and the accessibility tree, while the
 *    links remain in the server-rendered HTML — which is what carries internal-link
 *    equity from every page to every silo page.
 *
 * Every desktop panel is a single level: a short list is one column, and a long or
 * grouped menu is a columned panel with headings, sized to fit a laptop viewport and
 * shifted left when it would overflow the right edge. The earlier hover flyout for
 * grouped menus needed a second sideways move that closed the menu on the way.
 */
export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  /** Horizontal offset (px) that keeps a wide panel inside the viewport. */
  const [menuShift, setMenuShift] = useState(0);
  const [mobileOpenItem, setMobileOpenItem] = useState<string | null>(null);
  const [mobileOpenGroup, setMobileOpenGroup] = useState<string | null>(null);

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
    setMobileOpenGroup(null);
    closeAll();
  }, [pathname, closeAll]);

  // Escape closes the open menu and returns focus to whatever opened it.
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      if (activeMenu) {
        triggerRefs.current[activeMenu]?.focus();
        closeAll();
        return;
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [activeMenu, closeAll]);

  /** Open a top-level menu; its panel is shifted left just enough to stay inside the viewport. */
  const openMenu = useCallback((label: string) => {
    cancelClose();
    setActiveMenu(label);
    const el = wrapperRefs.current[label];
    if (!el) return;
    const margin = 16;
    const item = (navItems as readonly any[]).find((entry) => entry?.label === label);
    const width = Math.min(panelWidthFor(item), window.innerWidth - margin * 2);
    const rect = el.getBoundingClientRect();
    const overflow = rect.left + width - (window.innerWidth - margin);
    setMenuShift(overflow > 0 ? -Math.min(overflow, rect.left - margin) : 0);
  }, [cancelClose]);

  /** Close the group when focus moves entirely outside it. */
  const handleBlurOut = (e: React.FocusEvent<HTMLElement>, close: () => void) => {
    if (!e.currentTarget.contains(e.relatedTarget as Node | null)) close();
  };

  const isActivePath = (href: string) => pathname === href || pathname?.startsWith(`${href}/`);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-normal ${
        scrolled ? 'bg-background/90 shadow-md backdrop-blur-xl py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="mx-auto flex max-w-site items-center justify-between px-4 xl:px-6">
        <Link
          href="/"
          className="flex flex-shrink-0 items-center rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          aria-label={`${siteConfig.name} home`}
        >
          <SiteLogo className="h-8 w-auto" priority />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-0.5 lg:flex" aria-label="Main">
          {(navItems ?? []).map((item: any) => {
            const label = item?.label ?? '';
            const href = item?.href ?? '/';
            const hasMenu = Boolean(item?.children || item?.groups);
            const menuId = `nav-menu-${label.replace(/\s+/g, '-').toLowerCase()}`;
            const isOpen = activeMenu === label;
            const children: any[] = item?.children ?? [];
            const layout = columnsFor(item);
            const wide = layout !== null;
            const sections = layout ? packColumns(layout.columns, Math.min(layout.columns.length, MAX_PANEL_COLUMNS)) : [];
            // A grouped menu has no hub child, so its footer links to the hub page itself.
            const footerLinks = layout ? (layout.footer.length > 0 ? layout.footer : [{ label: `${label} overview`, href }]) : [];
            const panelWidth = panelWidthFor(item);

            return (
              <div
                key={label}
                ref={(el) => {
                  wrapperRefs.current[label] = el;
                }}
                className="relative"
                onMouseEnter={() => hasMenu && openMenu(label)}
                onMouseLeave={() => hasMenu && scheduleClose()}
                onFocus={() => hasMenu && openMenu(label)}
                onBlur={(e) => hasMenu && handleBlurOut(e, closeAll)}
              >
                <div className={`flex items-center rounded-md transition-colors duration-fast ${isOpen ? 'bg-accent' : ''}`}>
                  <Link
                    href={href}
                    className={`whitespace-nowrap rounded-md px-1.5 py-2 text-[13px] font-medium xl:px-2 transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                      isActivePath(href) || isOpen ? 'text-primary' : 'text-foreground/80'
                    }`}
                    aria-current={pathname === href ? 'page' : undefined}
                  >
                    {label}
                  </Link>
                  {hasMenu && (
                    <button
                      type="button"
                      ref={(el) => {
                        triggerRefs.current[label] = el;
                      }}
                      onClick={() => (isOpen ? closeAll() : openMenu(label))}
                      aria-expanded={isOpen}
                      aria-controls={menuId}
                      aria-label={`${label} menu`}
                      className={`-ml-1.5 rounded-md p-0.5 pr-1.5 transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${isOpen ? 'text-primary' : 'text-foreground/80'}`}
                    >
                      <ChevronDown
                        className={`h-3.5 w-3.5 transition-transform duration-fast ${isOpen ? 'rotate-180' : ''}`}
                        aria-hidden="true"
                      />
                    </button>
                  )}
                </div>

                {/* One column for a short list; a columned panel for long or grouped menus */}
                {hasMenu && (
                  <div
                    id={menuId}
                    {...({ inert: isOpen ? undefined : '' } as any)}
                    style={{
                      width: wide ? `min(${panelWidth}px, calc(100vw - 2rem))` : NARROW_PANEL_WIDTH,
                      left: menuShift,
                    }}
                    className={`absolute top-full z-50 origin-top pt-2.5 transition-[opacity,transform,visibility] duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                      isOpen
                        ? 'visible translate-y-0 scale-100 opacity-100'
                        : 'invisible pointer-events-none -translate-y-1 scale-[0.98] opacity-0'
                    }`}
                  >
                    {/* Pointer under the trigger; it stays put when the panel is shifted left to fit the viewport. */}
                    <span
                      aria-hidden="true"
                      className="absolute top-[5px] z-10 h-3 w-3 rotate-45 rounded-sm border-l border-t border-border bg-card"
                      style={{ left: 22 - menuShift }}
                    />
                    <div
                      className={`max-h-[calc(100vh-6rem)] overflow-y-auto rounded-xl border border-border bg-card/95 shadow-2xl backdrop-blur-xl ${
                        wide ? 'p-4' : 'p-2'
                      }`}
                    >
                    {wide ? (
                      <>
                        <div
                          className="grid gap-x-3 gap-y-5"
                          style={{ gridTemplateColumns: `repeat(${sections.length}, minmax(0, 1fr))` }}
                        >
                          {sections.map((stack, stackIndex) => (
                          <div key={stack[0]?.label ?? ''} className={`space-y-5 ${stackIndex > 0 ? 'border-l border-border pl-3' : ''}`}>
                          {stack.map((sec) => (
                            <div key={sec.label}>
                              <p className="mb-1.5 px-3 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                                {sec.label}
                              </p>
                              <ul className="grid gap-0.5">
                                {sec.items.map((child: any) => (
                                  <li key={child?.href ?? ''}>
                                    <Link
                                      href={child?.href ?? '/'}
                                      className="group block rounded-lg px-3 py-2 transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                                    >
                                      <span className="block text-sm font-medium group-hover:text-primary">
                                        {child?.label ?? ''}
                                      </span>
                                      {child?.description && (
                                        <span className="mt-0.5 block text-xs leading-snug text-muted-foreground">
                                          {child.description}
                                        </span>
                                      )}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                          </div>
                          ))}
                        </div>
                        {footerLinks.length > 0 && (
                          <div className="-mx-4 -mb-4 mt-4 flex flex-wrap gap-x-4 gap-y-1 rounded-b-xl border-t border-border bg-muted/40 px-3 py-2">
                            {footerLinks.map((child: any) => (
                              <Link
                                key={child?.href ?? ''}
                                href={child?.href ?? '/'}
                                className="group inline-flex items-center gap-1 rounded-md px-3 py-1.5 text-sm font-medium transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                              >
                                {child?.label ?? ''}
                                <ChevronRight className="h-3.5 w-3.5 text-muted-foreground group-hover:text-primary" aria-hidden="true" />
                              </Link>
                            ))}
                          </div>
                        )}
                      </>
                    ) : (
                      <ul className="grid gap-0.5">
                        {children.map((child: any) => (
                          <li key={child?.href ?? ''}>
                            <Link
                              href={child?.href ?? '/'}
                              className="group block rounded-lg px-3 py-2.5 transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                            >
                              <span className="block text-sm font-medium group-hover:text-primary">
                                {child?.label ?? ''}
                              </span>
                              {child?.description && (
                                <span className="mt-0.5 block text-xs text-muted-foreground">
                                  {child.description}
                                </span>
                              )}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                    </div>
                  </div>
                )}

              </div>
            );
          })}
        </nav>

        {/* Right actions */}
        <div className="flex flex-shrink-0 items-center gap-2">
          <ThemeToggle />
          {/*
            Two distinct actions rather than one dropdown. Sign-in and booking a demo
            are different intents — an existing customer should not have to open a menu
            labelled "Book a Demo" to reach the product — and burying the app link cost
            a click for the people who use it most.
          */}
          <a
            href={siteConfig.appUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-1.5 whitespace-nowrap rounded-lg border border-border px-3.5 py-2 text-[13px] font-semibold xl:inline-flex transition-colors duration-fast hover:border-primary/40 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            Sign in
            <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
          </a>

          <Link
            href="/book-a-demo"
            className="hidden items-center whitespace-nowrap rounded-lg bg-primary px-3 py-2 text-[13px] font-semibold text-primary-foreground xl:px-4 transition-all duration-fast hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:inline-flex"
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
            <nav
              aria-label="Mobile"
              className="mx-auto max-h-[calc(100vh-72px)] max-w-site space-y-1 overflow-y-auto px-6 py-4"
            >
              {(navItems ?? []).map((item: any) => {
                const label = item?.label ?? '';
                const href = item?.href ?? '/';
                const hasMenu = Boolean(item?.children || item?.groups);
                const itemId = `mobile-item-${label}`.replace(/\s+/g, '-').toLowerCase();
                const itemOpen = mobileOpenItem === label;
                // Items whose child list already starts with the hub page do not need a second link to it.
                const hubInChildren = (item?.children ?? []).some((child: any) => child?.href === href);

                if (!hasMenu) {
                  return (
                    <Link
                      key={label}
                      href={href}
                      className="block rounded-md px-3 py-3 text-sm font-medium transition-colors hover:bg-accent hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      {label}
                    </Link>
                  );
                }

                return (
                  <div key={label} className="border-b border-border/60 last:border-b-0">
                    <button
                      type="button"
                      onClick={() => {
                        setMobileOpenItem(itemOpen ? null : label);
                        setMobileOpenGroup(null);
                      }}
                      className={`flex w-full items-center justify-between rounded-md px-3 py-3 text-left text-sm font-medium transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                        itemOpen ? 'text-primary' : 'text-foreground'
                      }`}
                      aria-expanded={itemOpen}
                      aria-controls={itemId}
                    >
                      {label}
                      <ChevronDown
                        aria-hidden="true"
                        className={`h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200 ${
                          itemOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </button>

                    <motion.div
                      id={itemId}
                      {...({ inert: itemOpen ? undefined : '' } as any)}
                      initial={false}
                      animate={{ height: itemOpen ? 'auto' : 0, opacity: itemOpen ? 1 : 0 }}
                      transition={{ duration: 0.2, ease: 'easeOut' }}
                      className="overflow-hidden"
                    >
                      <div className="pb-2">
                        {!hubInChildren && (
                          <Link
                            href={href}
                            className="ml-4 flex items-center gap-1 rounded-md px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                          >
                            {label} overview
                            <ChevronRight className="h-3 w-3" aria-hidden="true" />
                          </Link>
                        )}

                        {item?.children && (
                          <div className="ml-4 space-y-2">
                            {/* A sectioned menu keeps its section headings on mobile so the list reads the same as the desktop panel. */}
                            {(columnsFor(item)?.columns ?? [{ label: '', items: item.children ?? [] }]).map((sec: any) => (
                              <div key={sec.label || 'all'}>
                                {sec.label && (
                                  <p className="px-3 pb-0.5 pt-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/80">{sec.label}</p>
                                )}
                                <ul className="space-y-0.5">
                                  {(sec.items ?? []).map((child: any) => (
                                    <li key={child?.href ?? ''}>
                                      <Link
                                        href={child?.href ?? '/'}
                                        className="block rounded-md px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                                      >
                                        {child?.label ?? ''}
                                      </Link>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            ))}
                            {(columnsFor(item)?.footer ?? []).map((child: any) => (
                              <Link
                                key={child?.href ?? ''}
                                href={child?.href ?? '/'}
                                className="block rounded-md px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                              >
                                {child?.label ?? ''}
                              </Link>
                            ))}
                          </div>
                        )}

                        {item?.groups && (
                          <div className="ml-2 mt-0.5 space-y-0.5">
                            {(item.groups ?? []).map((group: any) => {
                              const groupLabel = group?.label ?? '';
                              const groupId = `mobile-${label}-${groupLabel}`.replace(/\s+/g, '-').toLowerCase();
                              const isOpen = mobileOpenGroup === groupLabel;
                              return (
                                <div key={groupLabel}>
                                  <button
                                    type="button"
                                    onClick={() => setMobileOpenGroup(isOpen ? null : groupLabel)}
                                    className="flex w-full items-center justify-between rounded-md px-3 py-1.5 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                                    aria-expanded={isOpen}
                                    aria-controls={groupId}
                                  >
                                    {groupLabel}
                                    <ChevronDown
                                      aria-hidden="true"
                                      className={`h-3 w-3 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                                    />
                                  </button>
                                  <motion.ul
                                    id={groupId}
                                    {...({ inert: isOpen ? undefined : '' } as any)}
                                    initial={false}
                                    animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
                                    transition={{ duration: 0.15 }}
                                    className="ml-2 overflow-hidden"
                                  >
                                    {(group.items ?? []).map((sub: any) => (
                                      <li key={sub?.href ?? ''}>
                                        <Link
                                          href={sub?.href ?? '/'}
                                          className="block rounded-md px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                                        >
                                          {sub?.label ?? ''}
                                        </Link>
                                      </li>
                                    ))}
                                  </motion.ul>
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    </motion.div>
                  </div>
                );
              })}
              <div className="space-y-2 pt-3">
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
                  className="block w-full rounded-lg border border-border px-5 py-3 text-center text-sm font-semibold transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  Sign in to Camzify
                </a>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
