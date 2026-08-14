'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronDown, ArrowRight } from 'lucide-react';
import { NavSearch } from './NavSearch';
import { geistMonoNav } from '../../lib/fonts/nav-font';
import { LogoWordmark } from './LogoWordmark';
import { LogoMark } from './LogoMark';
import {
  ROLE_MEGA_MENU_COLUMNS,
  ROLE_MEGA_MENU_FOOTER,
  ALL_TOOLS_MEGA_MENU_COLUMNS,
  ALL_TOOLS_MEGA_MENU_FOOTER,
} from '../../lib/data/nav-mega-menu';
import { NavMegaMenu } from './NavMegaMenu';

const NAV_LINK_BASE =
  'flex items-center h-16 px-4 gap-0.5 font-[family-name:var(--font-inter)] text-sm font-normal leading-[18.9px] tracking-[-0.42px] text-foreground/75 hover:text-foreground hover:bg-foreground/5 transition-colors duration-200';

const NAV_LINK_ACTIVE =
  'flex items-center h-16 px-4 gap-0.5 font-[family-name:var(--font-inter)] text-sm font-normal leading-[18.9px] tracking-[-0.42px] text-foreground bg-foreground/8';

const NAV_CTA =
  'inline-flex items-center justify-center gap-1.5 h-8 py-1.5 px-2.5 border border-foreground/20 rounded bg-transparent font-[family-name:var(--font-nav-mono)] text-xs font-medium leading-[1.3] tracking-[0.015em] uppercase text-foreground hover:bg-foreground/5 active:scale-[0.97] cursor-pointer';

const MENU_CLOSE_DELAY_MS = 175;

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
    <header className={`sticky top-0 z-50 bg-background ${geistMonoNav.variable} antialiased`}>
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
              <LogoWordmark className="block leading-none shrink-0 group-hover:opacity-90 transition-opacity duration-200" />
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
                className={`${pathname.startsWith('/for') ? NAV_LINK_ACTIVE : NAV_LINK_BASE} cursor-pointer`}
                id="nav-by-role-btn"
                aria-expanded={showRolesMenu}
                aria-haspopup="true"
              >
                I Am A...
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
                className={`${allToolsActive ? NAV_LINK_ACTIVE : NAV_LINK_BASE} cursor-pointer`}
                id="nav-all-tools-btn"
                aria-expanded={showCategoriesMenu}
                aria-haspopup="true"
              >
                AI Tools
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
              className={NAV_CTA}
              style={{ transition: 'transform 0.1s ease, border-color 0.1s ease, color 0.1s ease, background-color 0.5s linear' }}
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
