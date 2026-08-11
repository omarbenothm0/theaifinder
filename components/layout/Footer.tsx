'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { SITE_NAME } from '../../lib/brand';
import { isDeprecatedPersonaNavSlug } from '../../lib/seo/persona-visibility';
import { AffiliateDisclosure } from '../tool/AffiliateDisclosure';
import { Sparkles, ArrowRight, CheckCircle2, ShieldCheck, Database, FileText } from 'lucide-react';

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
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 pt-16 pb-12 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center text-slate-900 font-bold">
                <Sparkles className="w-4 h-4 text-slate-900" />
              </div>
              <span className="font-bold text-xl text-white tracking-tight">{SITE_NAME}</span>
            </div>
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              Find the right AI tool for any task. An independent AI tools directory and discovery engine built for professionals, creators, and engineering teams.
            </p>

            {/* Newsletter Subscription Box */}
            <div className="pt-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-2">
                Join 15,000+ Professionals Receiving Weekly AI Digest
              </span>
              {subscribed ? (
                <div className="flex items-center gap-2 bg-emerald-950/80 border border-emerald-800 text-emerald-300 px-3.5 py-2 rounded-xl text-xs font-medium">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  Successfully subscribed! Check your inbox for top tool insights.
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex items-center gap-2 max-w-sm">
                  <input
                    type="email"
                    required
                    placeholder="Enter your work email..."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-slate-800 border border-slate-700/80 rounded-xl px-3.5 py-2 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 flex-1"
                  />
                  <button
                    type="submit"
                    className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold text-xs px-4 py-2 rounded-xl transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    Subscribe
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">Categories</h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              {[
                { name: 'Project Management', slug: 'project-management' },
                { name: 'Study & Education', slug: 'study-education' },
                { name: 'Writing & Copywriting', slug: 'writing' },
                { name: 'Coding & IDEs', slug: 'coding' },
                { name: 'Image Generation', slug: 'image' },
                { name: 'Video & VFX', slug: 'video' },
                { name: 'Voice & Speech', slug: 'voice' },
                { name: 'SEO & Research', slug: 'seo' },
                { name: 'Presentations & Decks', slug: 'presentations' },
                { name: 'Productivity', slug: 'productivity' }
              ].map((c) => (
                <li key={c.slug}>
                  <Link
                    href={`/category/${c.slug}`}
                    className="hover:text-emerald-400 transition-colors cursor-pointer text-left"
                  >
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Personas / For Workflows */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">By Role</h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              {[
                { name: 'AI for Project Managers', slug: 'project-managers' },
                { name: 'AI for Students', slug: 'students' },
                { name: 'AI for Writers', slug: 'writers' },
                { name: 'AI for Marketers', slug: 'marketers' },
                { name: 'AI for Teachers', slug: 'teachers' },
                { name: 'AI for Small Business', slug: 'small-business' },
                { name: 'AI for Researchers', slug: 'researchers' },
                { name: 'AI for Real Estate Agents', slug: 'real-estate-agents' },
              ]
                .filter((p) => !isDeprecatedPersonaNavSlug(p.slug))
                .map((p) => (
                <li key={p.slug}>
                  <Link
                    href={`/for/${p.slug}`}
                    className="hover:text-emerald-400 transition-colors cursor-pointer text-left"
                  >
                    {p.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Core Directory & SEO Pages */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">Directory & Hubs</h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <Link href="/best-ai-tools" className="hover:text-emerald-400 transition-colors cursor-pointer">
                  Best AI Tools (2026)
                </Link>
              </li>
              <li>
                <Link href="/free-ai-tools" className="hover:text-emerald-400 transition-colors cursor-pointer">
                  Free AI Tools Directory
                </Link>
              </li>
              <li>
                <Link href="/ai-apps" className="hover:text-emerald-400 transition-colors cursor-pointer">
                  AI Apps & Mobile Directory
                </Link>
              </li>
              <li>
                <Link href="/ai-tool-finder" className="hover:text-emerald-400 transition-colors cursor-pointer">
                  Interactive Tool Finder
                </Link>
              </li>
              <li>
                <Link href="/ai-tools-directory" className="hover:text-emerald-400 transition-colors cursor-pointer">
                  Full Category Taxonomy
                </Link>
              </li>
              <li>
                <Link href="/compare/otter-ai-vs-fireflies-ai" className="hover:text-emerald-400 transition-colors cursor-pointer">
                  Otter.ai vs Fireflies.ai
                </Link>
              </li>
              <li>
                <Link href="/compare/clickup-brain-vs-asana-ai" className="hover:text-emerald-400 transition-colors cursor-pointer">
                  ClickUp Brain vs Asana AI
                </Link>
              </li>
              <li>
                <Link href="/compare/chatgpt-vs-claude" className="hover:text-emerald-400 transition-colors cursor-pointer">
                  ChatGPT vs Claude
                </Link>
              </li>
              <li>
                <Link href="/compare/cursor-vs-chatgpt" className="hover:text-emerald-400 transition-colors cursor-pointer">
                  Cursor vs ChatGPT
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-emerald-400 transition-colors cursor-pointer">
                  About {SITE_NAME}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-emerald-400 transition-colors cursor-pointer">
                  Contact & Support
                </Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-emerald-400 transition-colors cursor-pointer text-slate-500">
                  Admin Portal
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Affiliate disclosure (site-wide expectation per Terms) */}
        <div className="pt-4 pb-2 border-b border-slate-800">
          <AffiliateDisclosure variant="footer" />
        </div>

        {/* Legal Row */}
        <div className="pt-6 pb-8 border-b border-slate-800 flex flex-wrap justify-center gap-x-6 gap-y-3 text-[11px] text-slate-400">
          <Link href="/about" className="hover:text-white transition-colors">
            About
          </Link>
          <Link href="/contact" className="hover:text-white transition-colors">
            Contact
          </Link>
          <Link href="/privacy" className="hover:text-white transition-colors">
            Privacy Policy
          </Link>
          <Link href="/terms" className="hover:text-white transition-colors">
            Terms of Service
          </Link>
          <a href="/sitemap.xml" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
            Sitemap
          </a>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex items-center gap-1.5 bg-slate-800/90 border border-slate-700/80 px-2.5 py-1 rounded-full text-[11px]">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="font-medium text-slate-300">Platform Curation Live</span>
            </div>
            <span>&copy; 2026 {SITE_NAME}. All rights reserved.</span>
          </div>

          <div className="flex items-center gap-4">
            <a href="/sitemap.xml" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-1">
              <Database className="w-3.5 h-3.5 text-slate-500" />
              Sitemap.xml
            </a>
            <a href="/robots.txt" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-1">
              <FileText className="w-3.5 h-3.5 text-slate-500" />
              Robots.txt
            </a>
            <span className="flex items-center gap-1 text-emerald-400">
              <ShieldCheck className="w-3.5 h-3.5" />
              SEO Architecture Verified
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}