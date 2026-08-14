'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Tool, Category, Persona, Comparison } from '../../types/tool';
import { SITE_NAME } from '../../lib/brand';
import { sortPublicPersonasByNavOrder } from '../../lib/seo/persona-visibility';
import { orderPublicCategories } from '../../lib/data/category-nav-links';
import {
  HOMEPAGE_FAQ_UPDATE_CADENCE,
  HOMEPAGE_FEATURED_SECTION_SUBTITLE,
  HOMEPAGE_FEATURED_SECTION_TITLE,
  HOMEPAGE_FEATURED_TAB_LABEL,
  HOMEPAGE_HERO_BADGE,
} from '../../lib/seo/site-copy';
import { NavSearch } from '../layout/NavSearch';
import { HomeToolCard } from './HomeToolCard';
import { buildMarqueeLogos } from './home-marquee-logos';
import { MarqueeLogoImage } from './MarqueeLogoImage';
import {
  ArrowRight,
  CheckCircle2,
  Compass,
  ShieldCheck,
  Briefcase,
  GraduationCap,
  TrendingUp,
  BookOpen,
  Store,
  Microscope,
  Home,
  PenTool,
  Users,
  ChevronRight,
  type LucideIcon,
} from 'lucide-react';
interface HomePageClientProps {
  totalToolCount: number;
  featuredTools: Tool[];
  freeTools: Tool[];
  trendingTools: Tool[];
  apiTools: Tool[];
  categories: Category[];
  personas: Persona[];
  comparisons: Comparison[];
}

const PERSONA_ICONS: Record<string, LucideIcon> = {
  'project-managers': Briefcase,
  students: GraduationCap,
  marketers: TrendingUp,
  teachers: BookOpen,
  'small-business': Store,
  researchers: Microscope,
  'real-estate-agents': Home,
  writers: PenTool,
};

const ROLE_CARD_LABELS: Record<string, string> = {
  'project-managers': 'Project Manager',
  students: 'Student',
  'small-business': 'Small Business Owner',
  'real-estate-agents': 'Real Estate Agent',
  researchers: 'Researcher',
  writers: 'Writer',
  teachers: 'Teacher',
  marketers: 'Marketer',
};

function SectionHeading({
  title,
  description,
  centered = true,
}: {
  title: string;
  description?: string;
  centered?: boolean;
}) {
  return (
    <div className={`home-container mb-8 md:mb-10 ${centered ? 'text-center' : ''}`}>
      <h2 className="text-[30px] leading-[1.15] tracking-[-0.3px] font-medium text-foreground-strong max-w-3xl mx-auto">
        {title}
      </h2>
      {description && (
        <p className="text-base leading-[1.35] text-muted-foreground mt-4 max-w-2xl mx-auto">{description}</p>
      )}
    </div>
  );
}

function LogoMarquee() {
  const logos = buildMarqueeLogos();
  if (logos.length === 0) return null;

  const duplicated = [...logos, ...logos];

  return (
    <div className="home-logo-marquee-section">
      <div className="home-container pb-4">
        <p className="text-[12px] font-medium uppercase tracking-[0.015em] text-muted-foreground text-center mb-6">
          Popular tools on theradarhub
        </p>
        <div className="home-marquee-wrap py-4">
          <div className="home-marquee-track">
            {duplicated.map((item, i) => (
              <Link
                key={`${item.slug}-${i}`}
                href={`/tools/${item.slug}`}
                aria-label={item.name}
                className="inline-flex items-center gap-3 shrink-0 min-h-10 opacity-[0.65] hover:opacity-100 transition-opacity duration-300"
              >
                <span className="flex h-8 shrink-0 items-center justify-center">
                  <MarqueeLogoImage
                    src={item.logo}
                    name={item.name}
                    fallbackSrc={item.fallbackLogo}
                  />
                </span>
                <span className="text-[13px] font-medium leading-none text-foreground/80 whitespace-nowrap">
                  {item.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function HomePageClient({
  totalToolCount,
  featuredTools,
  freeTools,
  trendingTools,
  apiTools,
  categories,
  personas,
  comparisons,
}: HomePageClientProps) {
  const [activeTab, setActiveTab] = useState<'featured' | 'free' | 'trending' | 'api'>('featured');

  const publicPersonas = sortPublicPersonasByNavOrder(personas);
  const orderedCategories = orderPublicCategories(categories);

  const currentTabTools =
    activeTab === 'featured'
      ? featuredTools
      : activeTab === 'free'
        ? freeTools
        : activeTab === 'trending'
          ? trendingTools
          : apiTools;

  const tabItems = [
    { id: 'featured' as const, label: HOMEPAGE_FEATURED_TAB_LABEL },
    { id: 'free' as const, label: 'Free / Freemium' },
    { id: 'trending' as const, label: 'Trending' },
    { id: 'api' as const, label: 'API Available' },
  ];

  return (
    <div className="home-page relative left-1/2 -translate-x-1/2 w-screen max-w-[100vw] -mt-6 sm:-mt-4 home-fade-in">
      {/* Hero */}
      <section className="home-section !pt-0 pb-6 -mt-4 md:-mt-8">
        <div className="home-container">
          <div
            className="-mx-5 sm:-mx-7 md:-mx-8 rounded-2xl bg-cover bg-center bg-no-repeat overflow-hidden px-4 sm:px-6 md:px-8 py-24 md:py-28 text-center"
            style={{ backgroundImage: "url('/hero/radar-bg.png')" }}
          >
            <span className="home-pill home-pill-outline mb-8 text-inverted-foreground border-inverted-foreground/30 hover:bg-inverted-foreground/10 hover:border-inverted-foreground/50">
              {HOMEPAGE_HERO_BADGE}
            </span>

            <h1 className="text-[38px] md:text-[48px] leading-[1.1] tracking-[-0.3px] font-medium text-inverted-foreground max-w-3xl mx-auto">
              Tell us what you do. We&apos;ll tell you what to use.
            </h1>

            <p className="text-base md:text-[16px] leading-[1.35] text-inverted-foreground/70 max-w-[550px] mx-auto mt-6">
              We scan the noise so you don&apos;t have to.
            </p>

            <div className="home-hero-search mt-8 md:mt-10">
              <NavSearch variant="hero" className="w-full" />
            </div>

            <nav
              aria-label="Hero navigation"
              className="mt-5 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-[13px] md:text-sm text-inverted-foreground/70"
            >
              <Link href="/ai-tools" className="text-inverted-foreground/80 hover:text-inverted-foreground transition-colors duration-200">
                Browse all tools
              </Link>
              <span aria-hidden="true" className="text-inverted-foreground/40">
                ·
              </span>
              <Link href="/compare" className="text-inverted-foreground/80 hover:text-inverted-foreground transition-colors duration-200">
                Compare tools
              </Link>
              <span aria-hidden="true" className="text-inverted-foreground/40">
                ·
              </span>
              <Link href="/ai-tool-finder" className="text-inverted-foreground/80 hover:text-inverted-foreground transition-colors duration-200">
                Tool Finder
              </Link>
            </nav>
          </div>
        </div>
      </section>

      {/* Find Tools For Your Role */}
      <section className="home-section border-t border-border/30">
        <SectionHeading
          title="I am a..."
          description="Find AI tools that fit the way you work."
        />
        <div className="home-container">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {publicPersonas.slice(0, 6).map((p) => {
              const Icon = PERSONA_ICONS[p.slug] ?? Users;
              return (
                <Link
                  key={p.slug}
                  href={`/for/${p.slug}`}
                  className="home-card p-5 group transition-all duration-200 ease shadow-[0_1px_3px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] hover:-translate-y-[-4px]"
                >
                  <div className="flex items-start gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-role-accent-muted group-hover:bg-role-accent-hover transition-colors duration-200">
                      <Icon className="w-5 h-5 text-role-accent" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p className="text-[14px] font-medium text-foreground group-hover:text-accent transition-colors">
                          {ROLE_CARD_LABELS[p.slug] ?? p.title}
                        </p>
                        <ChevronRight className="w-4 h-4 text-role-accent opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
                      </div>
                      <p className="text-[13px] leading-[1.35] text-muted-foreground mt-1 line-clamp-2">
                        {p.subtitle || p.description || `AI tools curated for ${p.title.toLowerCase()}.`}
                      </p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
          <div className="text-center mt-8">
            <Link
              href="/for"
              className="inline-flex items-center gap-1 text-[13px] font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              View all roles
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </section>

      <LogoMarquee />

      {/* Featured stat card */}
      <section className="home-section !pt-8 !pb-8">
        <div className="home-container">
          <div className="home-card home-card-lg p-6 md:p-8 max-w-3xl mx-auto text-center">
            <p className="text-[12px] font-medium uppercase tracking-[0.015em] text-muted-foreground mb-3">
              Curated directory
            </p>
            <p className="text-[30px] leading-[1.15] tracking-[-0.3px] font-medium text-foreground-strong">
              {totalToolCount}+ AI tools indexed
            </p>
            <p className="text-[14px] leading-[1.35] text-muted-foreground mt-3 max-w-md mx-auto">
              Editorially verified profiles with pricing, API availability, and workflow fit — updated regularly.
            </p>
            <Link
              href="/ai-tools"
              className="inline-flex items-center gap-1 text-[13px] font-medium text-muted-foreground hover:text-foreground transition-colors mt-5"
            >
              Explore the directory
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </section>

      {/* Stats grid */}
      <section className="home-section !pt-0">
        <div className="home-container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {[
              { value: totalToolCount, label: 'Curated AI Tools', sub: 'Verified listings' },
              { value: orderedCategories.length, label: 'Categories', sub: 'Taxonomy map' },
              { value: personas.length, label: 'Workflow Guides', sub: 'By role' },
              { value: 'Editorial', label: 'Source Profiles', sub: 'Official data' },
            ].map((stat) => (
              <div key={stat.label} className="home-card p-5 md:p-6 grid-rows-[auto_auto]">
                <p className="text-[20px] md:text-[30px] leading-[1.15] tracking-[-0.3px] font-medium text-foreground-strong">
                  {stat.value}
                </p>
                <p className="text-[13px] font-medium text-foreground mt-2">{stat.label}</p>
                <p className="text-[12px] text-muted-foreground mt-1">{stat.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Browse Categories */}
      <section className="home-section border-t border-border/30">
        <SectionHeading
          title="Browse Software Categories"
          description="Explore specialized artificial intelligence solutions by functional directory domain"
        />
        <div className="home-container">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {orderedCategories.map((cat) => (
              <Link key={cat.id} href={`/category/${cat.slug}`} className="home-card p-5 group">
                <p className="text-[14px] font-medium text-foreground group-hover:text-accent transition-colors">
                  {cat.name}
                </p>
                <p className="text-[13px] text-muted-foreground mt-1">
                  {cat.toolCount ?? 0} tools indexed
                </p>
              </Link>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link
              href="/ai-tools"
              className="inline-flex items-center gap-1 text-[13px] font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Browse all tools
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </section>

      {/* Featured AI Tools */}
      <section className="home-section border-t border-border/30">
        <SectionHeading
          title={HOMEPAGE_FEATURED_SECTION_TITLE}
          description={HOMEPAGE_FEATURED_SECTION_SUBTITLE}
        />
        <div className="home-container mb-8">
          <div className="flex flex-wrap justify-center gap-2">
            {tabItems.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`home-pill px-3 py-1 ${activeTab === tab.id ? 'home-pill-active' : 'home-pill-outline'}`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
        <div className="home-container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {currentTabTools.map((tool) => (
              <HomeToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        </div>
      </section>

      {/* Comparisons */}
      <section className="home-section border-t border-border/30">
        <SectionHeading
          title="Popular Software Comparisons"
          description="Detailed feature-by-feature evaluations of top AI platforms"
        />
        <div className="home-container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {comparisons.map((comp) => (
              <Link
                key={comp.slug}
                href={`/compare/${comp.slug}`}
                className="home-card home-card-lg p-6 md:p-8 flex flex-col min-h-[200px] group"
              >
                <p className="text-[12px] font-medium uppercase tracking-[0.015em] text-muted-foreground mb-3">
                  Head-to-head evaluation
                </p>
                <h3 className="text-[16px] font-medium text-foreground group-hover:text-accent transition-colors mb-2">
                  {comp.title}
                </h3>
                <p className="text-[13px] leading-[1.35] text-muted-foreground line-clamp-3 flex-1">
                  {comp.verdict}
                </p>
                <span className="inline-flex items-center gap-1 text-[13px] font-medium text-muted-foreground group-hover:text-foreground transition-colors mt-5">
                  Read full comparison
                  <ArrowRight className="w-3 h-3" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Tool Matcher feature section */}
      <section className="home-section border-t border-border/30">
        <div className="home-container text-center max-w-3xl">
          <p className="text-[12px] font-medium uppercase tracking-[0.015em] text-muted-foreground mb-4">
            Personalized tool matcher
          </p>
          <h2 className="text-[30px] leading-[1.15] tracking-[-0.3px] font-medium text-foreground-strong">
            Not Sure Which AI Tool to Pick?
          </h2>
          <p className="text-base leading-[1.35] text-muted-foreground mt-4 max-w-xl mx-auto">
            Answer 3 quick questions about your task, budget, and role to get instant customized software
            recommendations with compatibility score breakdowns.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 mt-8">
            <Link href="/ai-tool-finder" className="home-btn-primary">
              <Compass className="w-4 h-4" />
              Launch AI Tool Finder
            </Link>
            <Link href="/compare" className="home-btn-secondary">
              View comparisons
            </Link>
          </div>
        </div>
      </section>

      {/* SEO / Methodology */}
      <section className="home-section border-t border-border/30">
        <div className="home-container max-w-4xl">
          <div className="flex items-center gap-2 text-[12px] font-medium uppercase tracking-[0.015em] text-muted-foreground mb-6">
            <ShieldCheck className="w-4 h-4" />
            Editorial integrity &bull; Methodology
          </div>
          <h2 className="text-[30px] leading-[1.15] tracking-[-0.3px] font-medium text-foreground-strong">
            How We Evaluate &amp; Index Artificial Intelligence Software
          </h2>
          <p className="text-base leading-[1.35] text-muted-foreground mt-5">
            At {SITE_NAME}, our objective is to simplify the rapidly evolving landscape of generative artificial
            intelligence software. We maintain strict evaluation standards, verifying developer capabilities, pricing
            transparently, testing API availability, and analyzing real-world workflow suitability.
          </p>
        </div>

        <div className="home-container mt-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-5xl mx-auto">
            <div className="home-card p-6 md:p-8 space-y-4">
              <h3 className="text-[16px] font-medium text-foreground">Key Evaluation Criteria</h3>
              <ul className="space-y-4 text-[13px] leading-[1.35] text-muted-foreground">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-highlighted shrink-0 mt-0.5" />
                  <span>
                    <span className="text-foreground font-medium">Output Quality &amp; Accuracy:</span> Model reasoning
                    fidelity, writing prose naturalness, and visual image photorealism.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-highlighted shrink-0 mt-0.5" />
                  <span>
                    <span className="text-foreground font-medium">Pricing Transparency:</span> Clear distinctions between
                    free tiers, freemium limits, and paid monthly subscriptions.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-highlighted shrink-0 mt-0.5" />
                  <span>
                    <span className="text-foreground font-medium">Developer API Integration:</span> Availability of REST
                    APIs, SDKs, and custom extension support for software engineers.
                  </span>
                </li>
              </ul>
            </div>

            <div className="home-card p-6 md:p-8 space-y-4">
              <h3 className="text-[16px] font-medium text-foreground">Frequently Asked Questions</h3>
              <div className="space-y-4">
                <div className="rounded-lg border border-border/40 p-4">
                  <p className="text-[14px] font-medium text-foreground">Are all listed AI tools free to use?</p>
                  <p className="text-[13px] leading-[1.35] text-muted-foreground mt-2">
                    Many platforms offer generous free plans or trial credits. Filter using our &quot;Free Tools&quot;
                    directory for zero-cost options.
                  </p>
                </div>
                <div className="rounded-lg border border-border/40 p-4">
                  <p className="text-[14px] font-medium text-foreground">How often is the directory updated?</p>
                  <p className="text-[13px] leading-[1.35] text-muted-foreground mt-2">{HOMEPAGE_FAQ_UPDATE_CADENCE}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA band */}
      <section className="home-section bg-inverted text-inverted-foreground">
        <div className="home-container text-center max-w-2xl">
          <h2 className="text-[30px] leading-[1.15] tracking-[-0.3px] font-medium">Start discovering</h2>
          <p className="text-[14px] leading-[1.35] text-inverted-foreground/70 mt-4">
            Browse curated listings, compare platforms side-by-side, or get personalized recommendations in seconds.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 mt-8">
            <Link
              href="/ai-tools"
              className="inline-flex items-center gap-1.5 rounded-full px-5 py-2.5 text-[14px] font-medium bg-inverted-foreground text-inverted transition-colors hover:bg-inverted-foreground/90"
            >
              Browse all tools
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <Link
              href="/ai-tool-finder"
              className="inline-flex items-center gap-1.5 rounded-full px-5 py-2.5 text-[14px] font-medium border border-inverted-foreground/30 text-inverted-foreground transition-colors hover:bg-inverted-foreground/10"
            >
              Launch Tool Finder
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
