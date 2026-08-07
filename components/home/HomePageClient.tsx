'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Tool, Category, Persona, Comparison } from '../../types/tool';
import { ToolCard } from '../tool/ToolCard';
import { CategoryCard } from '../category/CategoryCard';
import {
  Sparkles,
  Search,
  Compass,
  ArrowRight,
  CheckCircle2,
  Trophy,
  Users,
  Layers,
  Zap,
  HelpCircle,
  ShieldCheck,
  Star
} from 'lucide-react';

interface HomePageClientProps {
  featuredTools: Tool[];
  freeTools: Tool[];
  trendingTools: Tool[];
  apiTools: Tool[];
  categories: Category[];
  personas: Persona[];
  comparisons: Comparison[];
}

export function HomePageClient({
  featuredTools,
  freeTools,
  trendingTools,
  apiTools,
  categories,
  personas,
  comparisons
}: HomePageClientProps) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'featured' | 'free' | 'trending' | 'api'>('featured');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/ai-tools?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  const currentTabTools =
    activeTab === 'featured'
      ? featuredTools
      : activeTab === 'free'
      ? freeTools
      : activeTab === 'trending'
      ? trendingTools
      : apiTools;

  return (
    <div className="space-y-16">
      {/* 1. Hero Banner */}
      <section className="bg-slate-900 text-white rounded-3xl p-8 sm:p-14 shadow-xl relative overflow-hidden border border-slate-800">
        <div className="max-w-3xl space-y-6 relative z-10">
          <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            Curated AI Discovery Engine &bull; Updated Daily 2026
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
            Discover &amp; Compare the <span className="text-emerald-400">Best AI Tools</span> for Any Workflow
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
            Search 100+ verified artificial intelligence platforms, filter by pricing and developer APIs, and compare side-by-side to make confident software decisions.
          </p>

          {/* Search Bar */}
          <form onSubmit={handleSearchSubmit} className="relative pt-2 max-w-xl">
            <div className="relative">
              <input
                type="text"
                placeholder="Search tools (e.g., ChatGPT, Claude, Cursor, voice cloning, React UI)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-800/90 border border-slate-700 rounded-2xl pl-12 pr-28 py-4 text-sm text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-inner"
              />
              <Search className="w-5 h-5 text-slate-400 absolute left-4 top-4.5" />
              <button
                type="submit"
                className="absolute right-2 top-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-xs px-5 py-2.5 rounded-xl transition-all cursor-pointer"
              >
                Search
              </button>
            </div>
          </form>

          {/* Popular Tag Quick Links */}
          <div className="flex items-center gap-2 text-xs text-slate-400 flex-wrap pt-1">
            <span className="font-semibold text-slate-300">Popular Searches:</span>
            {[
              { name: 'Coding IDEs', slug: 'coding' },
              { name: 'Prose Writing', slug: 'writing' },
              { name: 'Generative Images', slug: 'image' },
              { name: 'Text to Speech', slug: 'voice' },
              { name: 'Search Engines', slug: 'seo' }
            ].map((tag) => (
              <Link
                key={tag.slug}
                href={`/category/${tag.slug}`}
                className="bg-slate-800 hover:bg-slate-700 text-slate-300 px-2.5 py-1 rounded-lg border border-slate-700/80 transition-colors"
              >
                {tag.name}
              </Link>
            ))}
          </div>

          {/* Persona Quick-Pick Strip */}
          <div className="flex items-center gap-2 text-xs flex-wrap pt-3 border-t border-slate-800/80 mt-2">
            <span className="font-semibold text-emerald-300 flex items-center gap-1.5 shrink-0">
              <Users className="w-3.5 h-3.5" />
              I am a...
            </span>
            {personas.slice(0, 6).map((p) => (
              <Link
                key={p.slug}
                href={`/for/${p.slug}`}
                className="bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 px-3 py-1.5 rounded-full border border-emerald-500/30 transition-colors font-semibold"
              >
                {p.title}
              </Link>
            ))}
            <Link
              href="/for"
              className="text-slate-400 hover:text-white px-2.5 py-1.5 rounded-full transition-colors font-semibold flex items-center gap-1"
            >
              See all roles
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </section>

      {/* 2. Platform Stats Bar */}
      <section className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs">
        <div className="text-center space-y-1">
          <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 block">100+</span>
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Curated AI Tools</span>
        </div>
        <div className="text-center space-y-1">
          <span className="text-2xl sm:text-3xl font-extrabold text-emerald-600 block">8 Categories</span>
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Taxonomy Map</span>
        </div>
        <div className="text-center space-y-1">
          <span className="text-2xl sm:text-3xl font-extrabold text-indigo-600 block">8 Workflows</span>
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Persona Guides</span>
        </div>
        <div className="text-center space-y-1">
          <span className="text-2xl sm:text-3xl font-extrabold text-amber-500 block">100% Verified</span>
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Independent Ratings</span>
        </div>
      </section>

      {/* 3. Find Tools For Your Role (persona-first entry point) */}
      <section className="space-y-6">
        <div className="flex items-center justify-between border-b border-slate-200 pb-3">
          <div>
            <h2 className="text-2xl font-extrabold text-slate-900 flex items-center gap-2">
              <Users className="w-6 h-6 text-indigo-600" />
              Find Tools For Your Role
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Curated software stacks optimized for your specific professional role &mdash; start here
            </p>
          </div>
          <Link
            href="/for"
            className="text-xs font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1 group shrink-0"
          >
            <span>View All Roles</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {personas.map((p) => (
            <Link
              key={p.slug}
              href={`/for/${p.slug}`}
              className="bg-white p-5 rounded-2xl border border-slate-200 hover:border-indigo-300 shadow-2xs hover:shadow-xs transition-all group flex flex-col justify-between space-y-4"
            >
              <div className="space-y-2">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 font-bold group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                  <Users className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-slate-900 text-sm group-hover:text-indigo-600 transition-colors">
                  {p.title}
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">{p.description}</p>
              </div>

              <div className="flex items-center justify-between text-[11px] font-bold text-indigo-600 pt-3 border-t border-slate-100">
                <span>Explore Workflow Stack</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center text-xs text-slate-500 pt-1">
          Not seeing your role?{' '}
          <Link href="/ai-tool-finder" className="font-bold text-indigo-600 hover:text-indigo-700">
            Take the 30-second Tool Finder quiz &rarr;
          </Link>
        </div>
      </section>

      {/* 4. Browse Software Categories */}
      <section className="space-y-6">
        <div className="flex items-center justify-between border-b border-slate-200 pb-3">
          <div>
            <h2 className="text-2xl font-extrabold text-slate-900 flex items-center gap-2">
              <Layers className="w-6 h-6 text-emerald-600" />
              Browse Software Categories
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Explore specialized artificial intelligence solutions by functional directory domain
            </p>
          </div>
          <Link
            href="/ai-tools-directory"
            className="text-xs font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1 group"
          >
            <span>View Full Directory</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {categories.map((cat) => (
            <CategoryCard key={cat.id} category={cat} />
          ))}
        </div>
      </section>

      {/* 5. Top Ranked & Featured AI Tools */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-200 pb-3 gap-4">
          <div>
            <h2 className="text-2xl font-extrabold text-slate-900 flex items-center gap-2">
              <Trophy className="w-6 h-6 text-amber-500" />
              Featured &amp; Top Ranked AI Tools
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Highest rated software evaluated by features, output quality, and price fairness
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl shrink-0 self-start sm:self-auto">
            <button
              onClick={() => setActiveTab('featured')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'featured'
                  ? 'bg-white text-slate-900 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Top Ranked
            </button>
            <button
              onClick={() => setActiveTab('free')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'free'
                  ? 'bg-white text-slate-900 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Free / Freemium
            </button>
            <button
              onClick={() => setActiveTab('trending')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'trending'
                  ? 'bg-white text-slate-900 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Trending
            </button>
            <button
              onClick={() => setActiveTab('api')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'api'
                  ? 'bg-white text-slate-900 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              API Available
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentTabTools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      </section>

      {/* 6. Popular Head-to-Head Comparisons */}
      <section className="space-y-6">
        <div className="flex items-center justify-between border-b border-slate-200 pb-3">
          <div>
            <h2 className="text-2xl font-extrabold text-slate-900 flex items-center gap-2">
              <Zap className="w-6 h-6 text-amber-500" />
              Popular Software Comparisons
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Detailed feature-by-feature evaluations of top AI platforms
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {comparisons.map((comp) => (
            <Link
              key={comp.slug}
              href={`/compare/${comp.slug}`}
              className="bg-white p-6 rounded-2xl border border-slate-200 hover:border-amber-300 shadow-2xs hover:shadow-xs transition-all group space-y-4"
            >
              <div className="inline-flex items-center gap-1.5 bg-amber-50 text-amber-800 border border-amber-200 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase">
                <Zap className="w-3 h-3 text-amber-500" />
                Head-to-Head Evaluation
              </div>

              <h3 className="font-extrabold text-slate-900 text-base group-hover:text-amber-600 transition-colors">
                {comp.title}
              </h3>

              <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">{comp.verdict}</p>

              <div className="flex items-center justify-between text-xs font-bold text-amber-600 pt-3 border-t border-slate-100">
                <span>Read Full Comparison</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 7. Interactive Finder Quiz Banner */}
      <section className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-8 sm:p-12 shadow-xl flex flex-col md:flex-row items-center justify-between gap-8 border border-slate-800">
        <div className="space-y-3 max-w-xl">
          <div className="inline-flex items-center gap-1.5 bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
            <Compass className="w-4 h-4 text-emerald-400" />
            Personalized Tool Matcher
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            Not Sure Which AI Tool to Pick?
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Answer 3 quick questions about your task, budget, and role to get instant customized software recommendations with compatibility score breakdowns.
          </p>
        </div>

        <Link
          href="/ai-tool-finder"
          className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-sm px-7 py-4 rounded-2xl transition-all shadow-lg flex items-center gap-2 cursor-pointer shrink-0"
        >
          <Compass className="w-5 h-5" />
          <span>Launch AI Tool Finder</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </section>

      {/* 8. Comprehensive SEO Content Block & FAQ */}
      <section className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 shadow-2xs space-y-8">
        <div className="max-w-3xl space-y-4">
          <div className="flex items-center gap-2 text-emerald-600 font-bold text-xs uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4" />
            Editorial Integrity &bull; Methodology
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            How We Evaluate &amp; Index Artificial Intelligence Software
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            At AIFind, our objective is to simplify the rapidly evolving landscape of generative artificial intelligence software. We maintain strict evaluation standards, verifying developer capabilities, pricing transparently, testing API availability, and analyzing real-world workflow suitability.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4 border-t border-slate-100">
          <div className="space-y-3 text-xs text-slate-700 leading-relaxed">
            <h3 className="font-bold text-slate-900 text-sm">Key Evaluation Criteria</h3>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Output Quality &amp; Accuracy:</strong> Model reasoning fidelity, writing prose naturalness, and visual image photorealism.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Pricing Transparency:</strong> Clear distinctions between free tiers, freemium limits, and paid monthly subscriptions.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Developer API Integration:</strong> Availability of REST APIs, SDKs, and custom extension support for software engineers.</span>
              </li>
            </ul>
          </div>

          <div className="space-y-3 text-xs text-slate-700 leading-relaxed">
            <h3 className="font-bold text-slate-900 text-sm">Frequently Asked Questions</h3>
            <div className="space-y-2">
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                <p className="font-bold text-slate-900">Are all listed AI tools free to use?</p>
                <p className="text-slate-500 mt-1">Many platforms offer generous free plans or trial credits. Filter using our &quot;Free Tools&quot; directory for zero-cost options.</p>
              </div>
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                <p className="font-bold text-slate-900">How often is the directory updated?</p>
                <p className="text-slate-500 mt-1">Listings, pricing models, and new model releases (such as GPT-4o and Claude 3.5 Sonnet) are updated daily.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}