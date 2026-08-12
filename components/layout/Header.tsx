'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { Search, Sparkles, Compass, ChevronDown } from 'lucide-react';
import { SITE_NAME } from '../../lib/brand';
import {
  ROLE_MEGA_MENU_COLUMNS,
  ROLE_MEGA_MENU_FOOTER,
  ALL_TOOLS_MEGA_MENU_COLUMNS,
  ALL_TOOLS_MEGA_MENU_FOOTER,
} from '../../lib/data/nav-mega-menu';
import { NavMegaMenu } from './NavMegaMenu';

const NAV_LINK_BASE =
  'inline-flex items-center h-full px-4 text-sm font-medium text-foreground/75 hover:text-foreground hover:bg-foreground/5 transition-colors duration-200';

const NAV_LINK_ACTIVE =
  'inline-flex items-center h-full px-4 text-sm font-medium text-foreground bg-foreground/8';

export function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const [searchQuery, setSearchQuery] = useState('');
  const [showRolesMenu, setShowRolesMenu] = useState(false);
  const [showCategoriesMenu, setShowCategoriesMenu] = useState(false);

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

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/ai-tools?search=${encodeURIComponent(searchQuery)}`);
    }
  };

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

  const toggleRolesMenu = () => {
    if (showRolesMenu) {
      setShowRolesMenu(false);
    } else {
      setShowCategoriesMenu(false);
      setShowRolesMenu(true);
    }
  };

  const toggleCategoriesMenu = () => {
    if (showCategoriesMenu) {
      setShowCategoriesMenu(false);
    } else {
      setShowRolesMenu(false);
      setShowCategoriesMenu(true);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link
            href="/"
            className="inline-flex items-center gap-2.5 shrink-0 h-16 focus:outline-hidden group"
            id="header-logo-btn"
          >
            <Sparkles
              className="h-[22px] w-[22px] text-accent transition-opacity duration-200 group-hover:opacity-80"
              aria-hidden
            />
            <div className="flex items-center gap-2 min-w-0">
              <span className="font-medium text-base text-foreground tracking-tight truncate">{SITE_NAME}</span>
              <span className="hidden sm:inline text-[10px] uppercase tracking-[0.015em] font-medium px-1.5 py-0.5 rounded-md border border-border/50 text-muted-foreground">
                Engine
              </span>
            </div>
          </Link>

          <div className="flex items-stretch h-16 gap-3 shrink-0">
            <nav className="hidden lg:flex items-stretch h-16 gap-6" aria-label="Main">
              <div className="relative h-16">
                <button
                  type="button"
                  onClick={toggleRolesMenu}
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

              <div className="relative h-16">
                <button
                  type="button"
                  onClick={toggleCategoriesMenu}
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
                  align="right"
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

            <form onSubmit={handleSearch} className="relative hidden md:block w-48 lg:w-60 self-center">
              <input
                id="global-search-input"
                type="text"
                placeholder="Search AI tools... (/)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-background-raised border border-border/50 rounded-lg pl-8 pr-7 py-1.5 text-xs text-foreground placeholder:text-muted-foreground/70 focus:outline-none focus:border-border transition-colors duration-200"
              />
              <Search className="w-3.5 h-3.5 text-muted-foreground absolute left-2.5 top-2.5" />
              <span className="absolute right-2 top-2 text-[10px] font-mono text-muted-foreground px-1 rounded-md border border-border/40">
                /
              </span>
            </form>

            <Link
              href="/ai-tool-finder"
              className="inline-flex items-center gap-1.5 self-center bg-primary hover:bg-primary/90 text-primary-foreground font-medium text-xs sm:text-sm px-4 h-9 rounded-full transition-colors duration-200"
              id="header-finder-btn"
            >
              <Compass className="w-4 h-4" />
              <span className="hidden sm:inline">Tool Finder</span>
              <span className="sm:hidden">Finder</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
