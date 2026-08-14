'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { SITE_NAME } from '../../lib/brand';
import { isDeprecatedPersonaNavSlug } from '../../lib/seo/persona-visibility';
import { PUBLIC_CATEGORY_NAV_LINKS } from '../../lib/data/category-nav-links';
import { AffiliateDisclosure } from '../tool/AffiliateDisclosure';
import { Sparkles, ArrowRight, CheckCircle2, ShieldCheck } from 'lucide-react';

export function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="bg-background border-t border-border/40 pt-16 pb-10 mt-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-border/40">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-foreground" />
              <span className="font-medium text-base text-foreground tracking-tight">{SITE_NAME}</span>
            </div>
            <p className="text-[13px] leading-[1.35] text-muted-foreground max-w-xs">
              Find the right AI tool for any task. An independent directory and discovery engine for professionals,
              creators, and engineering teams.
            </p>
            <div className="pt-2">
              <span className="text-[11px] font-medium uppercase tracking-[0.015em] text-muted-foreground block mb-2">
                Weekly AI tool updates
              </span>
              {subscribed ? (
                <div className="flex items-center gap-2 bg-background-raised border border-border/50 text-foreground px-3 py-2 rounded-lg text-[12px] font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5 text-verified shrink-0" />
                  Subscribed — check your inbox.
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex items-center gap-2 max-w-sm">
                  <input
                    type="email"
                    required
                    placeholder="Work email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-background-raised border border-border/50 rounded-lg px-3 py-2 text-[12px] text-foreground placeholder:text-muted-foreground/70 focus:outline-none focus:border-border flex-1"
                  />
                  <button
                    type="submit"
                    className="inline-flex items-center gap-1 bg-primary hover:bg-primary/90 text-primary-foreground font-medium text-[12px] px-3 py-2 rounded-full transition-colors cursor-pointer"
                  >
                    Subscribe
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </form>
              )}
            </div>
          </div>

          <div>
            <h4 className="text-[11px] font-medium uppercase tracking-[0.015em] text-foreground mb-4">Categories</h4>
            <ul className="space-y-2.5 text-[13px] text-muted-foreground">
              {PUBLIC_CATEGORY_NAV_LINKS.map((c) => (
                <li key={c.slug}>
                  <Link href={`/category/${c.slug}`} className="hover:text-foreground transition-colors">
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[11px] font-medium uppercase tracking-[0.015em] text-foreground mb-4">I Am A...</h4>
            <ul className="space-y-2.5 text-[13px] text-muted-foreground">
              {[
                { name: 'Project Managers', slug: 'project-managers' },
                { name: 'Students', slug: 'students' },
                { name: 'Writers', slug: 'writers' },
                { name: 'Marketers', slug: 'marketers' },
                { name: 'Teachers', slug: 'teachers' },
                { name: 'Small Business', slug: 'small-business' },
                { name: 'Researchers', slug: 'researchers' },
                { name: 'Real Estate Agents', slug: 'real-estate-agents' },
              ]
                .filter((p) => !isDeprecatedPersonaNavSlug(p.slug))
                .map((p) => (
                  <li key={p.slug}>
                    <Link href={`/for/${p.slug}`} className="hover:text-foreground transition-colors">
                      {p.name}
                    </Link>
                  </li>
                ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[11px] font-medium uppercase tracking-[0.015em] text-foreground mb-4">Discover</h4>
            <ul className="space-y-2.5 text-[13px] text-muted-foreground">
              <li>
                <Link href="/best-ai-tools" className="hover:text-foreground transition-colors">
                  Best AI Tools
                </Link>
              </li>
              <li>
                <Link href="/free-ai-tools" className="hover:text-foreground transition-colors">
                  Free AI Tools
                </Link>
              </li>
              <li>
                <Link href="/ai-apps" className="hover:text-foreground transition-colors">
                  AI Apps
                </Link>
              </li>
              <li>
                <Link href="/ai-tool-finder" className="hover:text-foreground transition-colors">
                  Tool Finder
                </Link>
              </li>

              <li>
                <Link href="/compare" className="hover:text-foreground transition-colors">
                  Comparisons
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-foreground transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-foreground transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-4 pb-2 border-b border-border/40">
          <AffiliateDisclosure variant="footer" />
        </div>

        <div className="pt-6 flex flex-wrap justify-center gap-x-6 gap-y-2 text-[11px] text-muted-foreground">
          <Link href="/privacy" className="hover:text-foreground transition-colors">
            Privacy Policy
          </Link>
          <Link href="/terms" className="hover:text-foreground transition-colors">
            Terms of Service
          </Link>
          <a href="/sitemap.xml" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">
            Sitemap
          </a>
        </div>

        <div className="pt-6 flex flex-col md:flex-row items-center justify-between text-[12px] text-muted-foreground gap-4">
          <span>&copy; 2026 {SITE_NAME}. All rights reserved.</span>
          <span className="flex items-center gap-1 text-muted-foreground">
            <ShieldCheck className="w-3.5 h-3.5" />
            SEO architecture verified
          </span>
        </div>
      </div>
    </footer>
  );
}
