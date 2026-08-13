'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronDown, ArrowRight } from 'lucide-react';
import { NavSearch } from './NavSearch';
import { geistNav } from '../../lib/fonts/nav-font';
import { LogoWordmark, type LogoWordmarkVariant } from './LogoWordmark';
import { LogoMark } from './LogoMark';
import {
  ROLE_MEGA_MENU_COLUMNS,
  ROLE_MEGA_MENU_FOOTER,
  ALL_TOOLS_MEGA_MENU_COLUMNS,
  ALL_TOOLS_MEGA_MENU_FOOTER,
} from '../../lib/data/nav-mega-menu';
import { NavMegaMenu } from './NavMegaMenu';

const NAV_LINK_BASE =
  'inline-flex items-center px-4 h-9 text-sm font-medium text-foreground/75 hover:text-foreground hover:bg-foreground/5 transition-colors duration-200 rounded-lg';

const NAV_LINK_ACTIVE =
  'inline-flex items-center px-4 h-9 text-sm font-medium text-foreground bg-foreground/8 rounded-lg';

const MENU_CLOSE_DELAY_MS = 175;

/** Provisional — reply with 1, 2, or 3 to finalize. Preview all at /logo-preview */
const NAV_LOGO_VARIANT: LogoWordmarkVariant = '1';

export function Header() {
  const pathname = usePathname();
  const [showRolesMenu, setShowRolesMenu] = useState(false);
  const [showCategoriesMenu, setShowCategoriesMenu] = useState(false);

  const rolesCloseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const categoriesCloseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearTimer = useCallback((timerRef: React.MutableRefObject<ReturnType<typeof setTimeout> | null>) => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const openRolesMenu = useCallback(() => {
    clearTimer(rolesCloseTimer);
    clearTimer(categoriesCloseTimer);
    setShowCategoriesMenu(false);
    setShowRolesMenu(true);
  }, [clearTimer]);

  const scheduleCloseRolesMenu = useCallback(() => {
    clearTimer(rolesCloseTimer);
    rolesCloseTimer.current = setTimeout(() => setShowRolesMenu(false), MENU_CLOSE_DELAY_MS);
  }, [clearTimer]);

  const openCategoriesMenu = useCallback(() => {
    clearTimer(categoriesCloseTimer);
    clearTimer(rolesCloseTimer);
    setShowRolesMenu(false);
    setShowCategoriesMenu(true);
  }, [clearTimer]);

  const scheduleCloseCategoriesMenu = useCallback(() => {
    clearTimer(categoriesCloseTimer);
    categoriesCloseTimer.current = setTimeout(() => setShowCategoriesMenu(false), MENU_CLOSE_DELAY_MS);
  }, [clearTimer]);

  useEffect(() => {
    return () => {
      clearTimer(rolesCloseTimer);
      clearTimer(categoriesCloseTimer);
    };
  }, [clearTimer]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '/' && document.activeElement?.tagName !== 'INPUT' && document.activeElement?.tagName !== 'TEXTAREA') {
        e.preventDefault();
        const searchInput = document.getElementById('global-search-input');
        if (searchInput) searchInput.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const isActive = (path: string) => {
    if (path === '/' && pathname === '/') return true;
    if (path !== '/' && pathname.startsWith(path)) return true;
    return false;
  };

  const allToolsActive =
    (isActive('/ai-tools') && pathname === '/ai-tools') ||
    pathname.startsWith('/category') ||
    pathname === '/ai-tools-directory' ||
    pathname === '/best-ai-tools' ||
    pathname === '/free-ai-tools' ||
    pathname === '/ai-apps';

  return (
    <header
      className={`sticky top-0 z-50 bg-background ${geistNav.variable} font-[family-name:var(--font-nav)] font-medium antialiased`}
    >
      <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-10 xl:px-12">
        <div className="flex items-center h-16 w-full">
          <Link
            href="/"
            className="inline-flex items-center shrink-0 text-foreground-strong focus:outline-hidden group mr-8 lg:mr-12"
            id="header-logo-btn"
          >
            <span className="inline-flex items-end gap-2.5">
              <LogoMark
                height={31}
                className="block shrink-0 group-hover:opacity-90 transition-opacity duration-200"
              />
              <LogoWordmark
                variant={NAV_LOGO_VARIANT}
                className="block leading-none shrink-0 group-hover:opacity-90 transition-opacity duration-200"
              />
            </span>
          </Link>

          <nav className="hidden lg:flex items-center h-16 gap-8 xl:gap-10" aria-label="Main">
            <div
              className="relative flex items-center h-16"
              onMouseEnter={openRolesMenu}
              onMouseLeave={scheduleCloseRolesMenu}
            >
              <button
                type="button"
                className={`${pathname.startsWith('/for') ? NAV_LINK_ACTIVE : NAV_LINK_BASE} gap-1.5 cursor-pointer`}
                id="nav-by-role-btn"
                aria-expanded={showRolesMenu}
                aria-haspopup="true"
              >
                By Role
                <ChevronDown className="w-4 h-4 text-muted-foreground" />
              </button>

              <NavMegaMenu
                columns={ROLE_MEGA_MENU_COLUMNS}
                footer={ROLE_MEGA_MENU_FOOTER}
                open={showRolesMenu}
                onClose={() => setShowRolesMenu(false)}
              />
            </div>

            <div
              className="relative flex items-center h-16"
              onMouseEnter={openCategoriesMenu}
              onMouseLeave={scheduleCloseCategoriesMenu}
            >
              <button
                type="button"
                className={`${allToolsActive ? NAV_LINK_ACTIVE : NAV_LINK_BASE} gap-1.5 cursor-pointer`}
                id="nav-all-tools-btn"
                aria-expanded={showCategoriesMenu}
                aria-haspopup="true"
              >
                All Tools
                <ChevronDown className="w-4 h-4 text-muted-foreground" />
              </button>

              <NavMegaMenu
                columns={ALL_TOOLS_MEGA_MENU_COLUMNS}
                footer={ALL_TOOLS_MEGA_MENU_FOOTER}
                open={showCategoriesMenu}
                onClose={() => setShowCategoriesMenu(false)}
              />
            </div>

            <Link
              href="/compare"
              className={pathname.startsWith('/compare') ? NAV_LINK_ACTIVE : NAV_LINK_BASE}
              id="nav-comparisons-btn"
            >
              Compare
            </Link>
          </nav>

          <div className="flex items-center gap-5 sm:gap-6 shrink-0 ml-auto pl-6 lg:pl-10 h-16">
            <NavSearch className="hidden md:block w-40 lg:w-48" />

            <Link
              href="/ai-tool-finder"
              className="inline-flex items-center gap-1.5 bg-primary hover:bg-primary/90 text-primary-foreground font-medium text-xs sm:text-sm px-4 sm:px-5 h-9 rounded-full transition-colors duration-200"
              id="header-finder-btn"
            >
              <span className="hidden sm:inline">Tool Finder</span>
              <span className="sm:hidden">Finder</span>
              <ArrowRight className="w-3.5 h-3.5 shrink-0" />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
