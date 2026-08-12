'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { Search, Sparkles, Compass, Layers, Settings, ChevronDown, Users, ArrowRight } from 'lucide-react';
import { SITE_NAME } from '../../lib/brand';
import { isDeprecatedPersonaNavSlug } from '../../lib/seo/persona-visibility';

const ROLE_LINKS = [
  { name: 'Project Managers', slug: 'project-managers' },
  { name: 'Students', slug: 'students' },
  { name: 'Writers', slug: 'writers' },
  { name: 'Marketers', slug: 'marketers' },
  { name: 'Teachers', slug: 'teachers' },
  { name: 'Small Business', slug: 'small-business' },
  { name: 'Researchers', slug: 'researchers' },
  { name: 'Real Estate', slug: 'real-estate-agents' },
].filter((link) => !isDeprecatedPersonaNavSlug(link.slug));

const CATEGORY_LINKS = [
  { name: 'Project Management', slug: 'project-management' },
  { name: 'Study & Education', slug: 'study-education' },
  { name: 'Writing & Copywriting', slug: 'writing' },
  { name: 'Coding & Development', slug: 'coding' },
  { name: 'Image & Design', slug: 'image' },
  { name: 'Video & Motion', slug: 'video' },
  { name: 'Voice & Audio', slug: 'voice' },
  { name: 'SEO & Research', slug: 'seo' },
  { name: 'Presentations & Slides', slug: 'presentations' },
  { name: 'Productivity & Workspace', slug: 'productivity' },
  { name: 'Marketing & CRM', slug: 'marketing' },
];

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

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Logo */}
          <div className="flex items-center gap-8">
            <Link
              href="/"
              className="flex items-center gap-2.5 group cursor-pointer text-left focus:outline-hidden"
              id="header-logo-btn"
            >
              <div className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center text-white font-bold text-xs shadow-xs group-hover:bg-slate-800 transition-colors">
                <Sparkles className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-lg text-slate-900 tracking-tight">TheRadarHub</span>
                <span className="text-[10px] uppercase tracking-wider font-bold px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
                  Engine
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1 text-sm font-medium">
              {/* By Role Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setShowRolesMenu(!showRolesMenu)}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg transition-colors cursor-pointer text-sm ${
                    pathname.startsWith('/for')
                      ? 'text-slate-900 bg-slate-100 font-semibold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                  id="nav-by-role-btn"
                >
                  By Role
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>

                {showRolesMenu && (
                  <div
                    className="absolute top-full left-0 mt-1.5 w-64 bg-white rounded-xl shadow-lg border border-slate-200 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                    onMouseLeave={() => setShowRolesMenu(false)}
                  >
                    <div className="px-3.5 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                      Find Tools By Role
                    </div>
                    {ROLE_LINKS.map((role) => (
                      <Link
                        key={role.slug}
                        href={`/for/${role.slug}`}
                        onClick={() => setShowRolesMenu(false)}
                        className="w-full text-left px-3.5 py-2 text-sm font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-50 flex items-center justify-between cursor-pointer"
                      >
                        {role.name}
                      </Link>
                    ))}
                    <div className="border-t border-slate-100 my-1"></div>
                    <Link
                      href="/for"
                      onClick={() => setShowRolesMenu(false)}
                      className="w-full text-left px-3.5 py-2 text-xs font-bold text-slate-900 hover:bg-slate-50 flex items-center gap-1.5 cursor-pointer"
                    >
                      <Users className="w-3.5 h-3.5 text-emerald-600" />
                      View All Roles &rarr;
                    </Link>
                  </div>
                )}
              </div>

              {/* All Tools Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setShowCategoriesMenu(!showCategoriesMenu)}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg transition-colors cursor-pointer text-sm ${
                    (isActive('/ai-tools') && pathname === '/ai-tools') ||
                    pathname.startsWith('/category') ||
                    pathname === '/ai-tools-directory' ||
                    pathname === '/best-ai-tools' ||
                    pathname === '/free-ai-tools' ||
                    pathname === '/ai-apps'
                      ? 'text-slate-900 bg-slate-100 font-semibold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                  id="nav-all-tools-btn"
                >
                  All Tools
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>

                {showCategoriesMenu && (
                  <div
                    className="absolute top-full left-0 mt-1.5 w-64 bg-white rounded-xl shadow-lg border border-slate-200 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                    onMouseLeave={() => setShowCategoriesMenu(false)}
                  >
                    <Link
                      href="/ai-tools"
                      onClick={() => setShowCategoriesMenu(false)}
                      className="w-full text-left px-3.5 py-2 text-sm font-bold text-slate-900 hover:bg-slate-50 flex items-center justify-between cursor-pointer"
                      id="nav-browse-all-tools-btn"
                    >
                      Browse All Tools
                      <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                    </Link>
                    <div className="border-t border-slate-100 my-1"></div>
                    <div className="px-3.5 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                      Browse Categories
                    </div>
                    {CATEGORY_LINKS.map((cat) => (
                      <Link
                        key={cat.slug}
                        href={`/category/${cat.slug}`}
                        onClick={() => setShowCategoriesMenu(false)}
                        className="w-full text-left px-3.5 py-2 text-sm font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-50 flex items-center justify-between cursor-pointer"
                      >
                        {cat.name}
                      </Link>
                    ))}
                    <div className="border-t border-slate-100 my-1"></div>
                    <Link
                      href="/best-ai-tools"
                      onClick={() => setShowCategoriesMenu(false)}
                      className="w-full text-left px-3.5 py-2 text-sm font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-50 flex items-center justify-between cursor-pointer"
                      id="nav-best-tools-btn"
                    >
                      Best AI Tools
                    </Link>
                    <Link
                      href="/free-ai-tools"
                      onClick={() => setShowCategoriesMenu(false)}
                      className="w-full text-left px-3.5 py-2 text-sm font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-50 flex items-center justify-between cursor-pointer"
                      id="nav-free-tools-btn"
                    >
                      Free Tools
                    </Link>
                    <div className="border-t border-slate-100 my-1"></div>
                    <Link
                      href="/ai-tools-directory"
                      onClick={() => setShowCategoriesMenu(false)}
                      className="w-full text-left px-3.5 py-2 text-xs font-bold text-slate-900 hover:bg-slate-50 flex items-center gap-1.5 cursor-pointer"
                    >
                      <Layers className="w-3.5 h-3.5 text-emerald-600" />
                      View Full Taxonomy Directory &rarr;
                    </Link>
                  </div>
                )}
              </div>

              <Link
                href="/compare"
                className={`px-3.5 py-2 rounded-lg transition-colors cursor-pointer text-sm ${
                  pathname.startsWith('/compare')
                    ? 'text-slate-900 bg-slate-100 font-semibold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
                id="nav-comparisons-btn"
              >
                Compare
              </Link>
            </nav>
          </div>

          {/* Quick Search & Right Controls */}
          <div className="flex items-center gap-3">
            <form onSubmit={handleSearch} className="relative hidden md:block w-48 lg:w-60">
              <input
                id="global-search-input"
                type="text"
                placeholder="Search AI tools... (/)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg pl-8 pr-7 py-1.5 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200 focus:border-slate-400 transition-all shadow-inner"
              />
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
              <span className="absolute right-2 top-2 text-[10px] font-mono text-slate-400 bg-slate-200/80 px-1 py-0.2 rounded">
                /
              </span>
            </form>

            <Link
              href="/ai-tool-finder"
              className="flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800 text-white font-medium text-xs sm:text-sm px-4 py-2 rounded-lg transition-colors cursor-pointer shadow-sm"
              id="header-finder-btn"
            >
              <Compass className="w-4 h-4 text-emerald-400" />
              <span className="hidden sm:inline">Tool Finder</span>
              <span className="sm:hidden">Finder</span>
            </Link>

            <Link
              href="/admin"
              className="p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
              title="Admin Settings"
              id="header-admin-btn"
            >
              <Settings className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}