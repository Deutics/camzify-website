'use client';

import { useState, useEffect, useRef, useCallback, type MouseEvent as ReactMouseEvent } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X, ChevronDown, ChevronRight } from 'lucide-react';
import { navItems, siteConfig } from '@/lib/site-config';
import { ThemeToggle } from '@/components/system/theme-toggle';
import { AnimatePresence, motion } from 'framer-motion';

const FLYOUT_WIDTH = 280;

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
 */
export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [activeGroup, setActiveGroup] = useState<string | null>(null);
  const [flyoutAlign, setFlyoutAlign] = useState<'left' | 'right'>('right');
  const [mobileOpenGroup, setMobileOpenGroup] = useState<string | null>(null);
  const [ctaOpen, setCtaOpen] = useState(false);

  const pathname = usePathname();
  const triggerRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const ctaTriggerRef = useRef<HTMLButtonElement | null>(null);

  const closeAll = useCallback(() => {
    setActiveMenu(null);
    setActiveGroup(null);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close every menu on navigation.
  useEffect(() => {
    setMobileOpen(false);
    setMobileOpenGroup(null);
    setCtaOpen(false);
    closeAll();
  }, [pathname, closeAll]);

  // Escape closes the open menu and returns focus to whatever opened it.
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      if (activeGroup) {
        setActiveGroup(null);
        return;
      }
      if (activeMenu) {
        triggerRefs.current[activeMenu]?.focus();
        closeAll();
        return;
      }
      if (ctaOpen) {
        setCtaOpen(false);
        ctaTriggerRef.current?.focus();
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [activeMenu, activeGroup, ctaOpen, closeAll]);

  const handleGroupOpen = (label: string, el: HTMLElement | null) => {
    setActiveGroup(label);
    if (!el) return;
    const rect = el.getBoundingClientRect();
    setFlyoutAlign(rect.right + 4 + FLYOUT_WIDTH > window.innerWidth ? 'left' : 'right');
  };

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
      <div className="mx-auto flex max-w-site items-center justify-between px-6">
        <Link
          href="/"
          className="flex items-center rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          aria-label={`${siteConfig.name} home`}
        >
          <Image src="/camzify-logo.png" alt={siteConfig.name} width={825} height={192} className="h-9 w-auto" priority />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
          {(navItems ?? []).map((item: any) => {
            const label = item?.label ?? '';
            const href = item?.href ?? '/';
            const hasMenu = Boolean(item?.children || item?.groups);
            const menuId = `nav-menu-${label.replace(/\s+/g, '-').toLowerCase()}`;
            const isOpen = activeMenu === label;

            return (
              <div
                key={label}
                className="relative"
                onMouseEnter={() => hasMenu && setActiveMenu(label)}
                onMouseLeave={() => hasMenu && closeAll()}
                onFocus={() => hasMenu && setActiveMenu(label)}
                onBlur={(e) => hasMenu && handleBlurOut(e, closeAll)}
              >
                <div className="flex items-center">
                  <Link
                    href={href}
                    className={`rounded-md px-3 py-2 text-sm font-medium transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                      isActivePath(href) ? 'text-primary' : 'text-foreground/80'
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
                      onClick={() => (isOpen ? closeAll() : setActiveMenu(label))}
                      aria-expanded={isOpen}
                      aria-controls={menuId}
                      aria-label={`${label} menu`}
                      className="-ml-1 rounded-md p-1 text-foreground/80 transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      <ChevronDown
                        className={`h-3.5 w-3.5 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                        aria-hidden="true"
                      />
                    </button>
                  )}
                </div>

                {/* Flat dropdown */}
                {item?.children && (
                  <div
                    id={menuId}
                    {...({ inert: isOpen ? undefined : '' } as any)}
                    className={`absolute left-0 top-full z-50 w-[320px] rounded-xl border border-border bg-card p-3 shadow-lg transition-all duration-fast ${
                      isOpen
                        ? 'visible translate-y-0 opacity-100'
                        : 'invisible pointer-events-none translate-y-2 opacity-0'
                    }`}
                  >
                    <ul className="grid gap-0.5">
                      {(item.children ?? []).map((child: any) => (
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
                  </div>
                )}

                {/* Two-level mega menu */}
                {item?.groups && (
                  <div
                    id={menuId}
                    {...({ inert: isOpen ? undefined : '' } as any)}
                    className={`absolute left-0 top-full z-50 w-[260px] rounded-xl border border-border bg-card p-2 shadow-lg transition-all duration-fast ${
                      isOpen
                        ? 'visible translate-y-0 opacity-100'
                        : 'invisible pointer-events-none translate-y-2 opacity-0'
                    }`}
                  >
                    {(item.groups ?? []).map((group: any) => {
                      const groupLabel = group?.label ?? '';
                      const groupId = `${menuId}-${groupLabel.replace(/\s+/g, '-').toLowerCase()}`;
                      const groupOpen = activeGroup === groupLabel;

                      return (
                        <div
                          key={groupLabel}
                          className="relative"
                          onMouseEnter={(e: ReactMouseEvent<HTMLDivElement>) =>
                            handleGroupOpen(groupLabel, e.currentTarget)
                          }
                          onBlur={(e) => handleBlurOut(e, () => setActiveGroup(null))}
                        >
                          <button
                            type="button"
                            onClick={(e) =>
                              groupOpen ? setActiveGroup(null) : handleGroupOpen(groupLabel, e.currentTarget.parentElement)
                            }
                            onFocus={(e) => handleGroupOpen(groupLabel, e.currentTarget.parentElement)}
                            aria-expanded={groupOpen}
                            aria-controls={groupId}
                            className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                              groupOpen ? 'bg-accent text-primary' : ''
                            }`}
                          >
                            {groupLabel}
                            <ChevronRight
                              aria-hidden="true"
                              className={`h-3.5 w-3.5 text-muted-foreground ${
                                flyoutAlign === 'left' && groupOpen ? 'rotate-180' : ''
                              }`}
                            />
                          </button>

                          <div
                            id={groupId}
                            {...({ inert: groupOpen && isOpen ? undefined : '' } as any)}
                            className={`absolute top-0 z-50 w-[280px] rounded-xl border border-border bg-card p-2 shadow-lg transition-all duration-fast ${
                              flyoutAlign === 'left' ? 'right-full mr-1' : 'left-full ml-1'
                            } ${
                              groupOpen
                                ? 'visible translate-x-0 opacity-100'
                                : 'invisible pointer-events-none opacity-0'
                            }`}
                          >
                            <ul>
                              {(group.items ?? []).map((sub: any) => (
                                <li key={sub?.href ?? ''}>
                                  <Link
                                    href={sub?.href ?? '/'}
                                    className="block rounded-lg px-3 py-2.5 text-sm transition-colors hover:bg-accent hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                                  >
                                    {sub?.label ?? ''}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      );
                    })}
                    <div className="mt-1 border-t border-border pt-1">
                      <Link
                        href={href}
                        className="block rounded-lg px-3 py-2 text-sm font-medium text-primary transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      >
                        View all {label} <span aria-hidden="true">→</span>
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <div
            className="relative hidden sm:block"
            onMouseEnter={() => setCtaOpen(true)}
            onMouseLeave={() => setCtaOpen(false)}
            onBlur={(e) => handleBlurOut(e, () => setCtaOpen(false))}
          >
            <button
              type="button"
              ref={ctaTriggerRef}
              onClick={() => setCtaOpen((v) => !v)}
              className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-all duration-fast hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              aria-expanded={ctaOpen}
              aria-controls="header-cta-menu"
            >
              Book a Demo
              <ChevronDown className={`h-3.5 w-3.5 transition-transform ${ctaOpen ? 'rotate-180' : ''}`} aria-hidden="true" />
            </button>

            <div
              id="header-cta-menu"
              {...({ inert: ctaOpen ? undefined : '' } as any)}
              className={`absolute right-0 top-full z-50 mt-1 w-[200px] rounded-xl border border-border bg-card p-2 shadow-lg transition-all duration-fast ${
                ctaOpen ? 'visible translate-y-0 opacity-100' : 'invisible pointer-events-none translate-y-2 opacity-0'
              }`}
            >
              <Link
                href="/book-a-demo"
                className="block rounded-lg px-3 py-2.5 text-sm font-medium transition-colors hover:bg-accent hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                Book a Demo
              </Link>
              <a
                href={siteConfig.appUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block rounded-lg px-3 py-2.5 text-sm font-medium transition-colors hover:bg-accent hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                App Login
              </a>
            </div>
          </div>

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
                return (
                  <div key={label}>
                    <Link
                      href={item?.href ?? '/'}
                      className="block rounded-md px-3 py-2.5 text-sm font-medium transition-colors hover:bg-accent hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      {label}
                    </Link>

                    {item?.children && (
                      <ul className="ml-4 space-y-0.5">
                        {(item.children ?? []).map((child: any) => (
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
                  App Login
                </a>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
