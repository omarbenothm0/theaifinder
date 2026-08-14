'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { X, Layers, Users, Zap, ArrowRight, Search, Compass } from 'lucide-react';

import { PUBLIC_CATEGORY_NAV_LINKS } from '../../lib/data/category-nav-links';
import { getPublicPersonaNavSlugs } from '../../lib/seo/persona-visibility';
import { INITIAL_PERSONAS } from '../../lib/data/index';

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
  pathname: string;
}

export function MobileNav({ isOpen, onClose, pathname }: MobileNavProps) {
  // Handle escape key and prevent body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose();
      };
      window.addEventListener('keydown', handleEscape);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleEscape);
      };
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const personaBySlug = new Map(INITIAL_PERSONAS.map((persona) => [persona.slug, persona]));
  const publicPersonaSlugs = getPublicPersonaNavSlugs();
  const mobilePersonas = publicPersonaSlugs
    .map((slug) => personaBySlug.get(slug))
    .filter((persona): persona is NonNullable<typeof persona> => persona != null);

  const isActive = (path: string) => {
    if (path === '/' && pathname === '/') return true;
    if (path !== '/' && pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div className="fixed inset-y-0 right-0 w-full max-w-sm bg-background shadow-xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border/30">
          <span className="text-sm font-semibold text-foreground-strong">Menu</span>
          <button
            type="button"
            onClick={onClose}
            className="p-2 text-foreground hover:bg-foreground/5 rounded-lg transition-colors"
            aria-label="Close navigation menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto">
          {/* Main Navigation */}
          <nav className="py-2" aria-label="Main navigation">
            <Link
              href="/"
              onClick={onClose}
              className={`block px-4 py-3 text-sm font-medium transition-colors border-b border-border/30 ${
                isActive('/') ? 'text-foreground-strong bg-foreground/5' : 'text-foreground hover:bg-foreground/5'
              }`}
            >
              Home
            </Link>

            {/* Personas Section */}
            <div className="px-4 py-3 bg-foreground/5 border-b border-border/30">
              <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                <Users className="w-4 h-4" />
                I Am A...
              </div>
              <div className="space-y-1">
                {mobilePersonas.map((persona) => (
                  <Link
                    key={persona.slug}
                    href={`/for/${persona.slug}`}
                    onClick={onClose}
                    className={`block px-3 py-2 text-sm rounded-lg transition-colors ${
                      isActive(`/for/${persona.slug}`)
                        ? 'text-foreground-strong bg-foreground/10'
                        : 'text-foreground hover:bg-foreground/10'
                    }`}
                  >
                    {persona.title}
                  </Link>
                ))}
                <Link
                  href="/for"
                  onClick={onClose}
                  className="block px-3 py-2 text-sm rounded-lg text-muted-foreground hover:bg-foreground/10 transition-colors"
                >
                  View all roles
                </Link>
              </div>
            </div>

            {/* AI Tools Section */}
            <div className="px-4 py-3 border-b border-border/30">
              <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                <Layers className="w-4 h-4" />
                AI Tools
              </div>
              <div className="space-y-1">
                <Link
                  href="/ai-tools"
                  onClick={onClose}
                  className={`block px-3 py-2 text-sm rounded-lg transition-colors ${
                    isActive('/ai-tools') ? 'text-foreground-strong bg-foreground/10' : 'text-foreground hover:bg-foreground/10'
                  }`}
                >
                  Browse All Tools
                </Link>
                <Link
                  href="/best-ai-tools"
                  onClick={onClose}
                  className={`block px-3 py-2 text-sm rounded-lg transition-colors ${
                    isActive('/best-ai-tools') ? 'text-foreground-strong bg-foreground/10' : 'text-foreground hover:bg-foreground/10'
                  }`}
                >
                  Best AI Tools
                </Link>
                <Link
                  href="/free-ai-tools"
                  onClick={onClose}
                  className={`block px-3 py-2 text-sm rounded-lg transition-colors ${
                    isActive('/free-ai-tools') ? 'text-foreground-strong bg-foreground/10' : 'text-foreground hover:bg-foreground/10'
                  }`}
                >
                  Free Tools
                </Link>
                <Link
                  href="/ai-apps"
                  onClick={onClose}
                  className={`block px-3 py-2 text-sm rounded-lg transition-colors ${
                    isActive('/ai-apps') ? 'text-foreground-strong bg-foreground/10' : 'text-foreground hover:bg-foreground/10'
                  }`}
                >
                  AI Apps
                </Link>
              </div>

              {/* Categories */}
              <div className="mt-3 space-y-1">
                {PUBLIC_CATEGORY_NAV_LINKS.map((category) => (
                  <Link
                    key={category.slug}
                    href={`/category/${category.slug}`}
                    onClick={onClose}
                    className={`block px-3 py-2 text-sm rounded-lg transition-colors ${
                      isActive(`/category/${category.slug}`)
                        ? 'text-foreground-strong bg-foreground/10'
                        : 'text-foreground hover:bg-foreground/10'
                    }`}
                  >
                    {category.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* Compare */}
            <div className="px-4 py-3 border-b border-border/30">
              <Link
                href="/compare"
                onClick={onClose}
                className={`flex items-center gap-2 text-sm font-medium transition-colors ${
                  isActive('/compare') ? 'text-foreground-strong' : 'text-foreground'
                }`}
              >
                <Zap className="w-4 h-4" />
                Comparisons
              </Link>
            </div>

            {/* Tool Finder */}
            <div className="px-4 py-3 border-b border-border/30">
              <Link
                href="/ai-tool-finder"
                onClick={onClose}
                className={`flex items-center gap-2 text-sm font-medium transition-colors ${
                  isActive('/ai-tool-finder') ? 'text-foreground-strong' : 'text-foreground'
                }`}
              >
                <Compass className="w-4 h-4" />
                Tool Finder
              </Link>
            </div>
          </nav>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-border/30 bg-foreground/5">
          <Link
            href="/ai-tools"
            onClick={onClose}
            className="flex items-center justify-center gap-2 text-sm font-semibold text-foreground-strong bg-primary text-primary-foreground px-4 py-3 rounded-xl transition-colors"
          >
            <Search className="w-4 h-4" />
            Search Tools
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
