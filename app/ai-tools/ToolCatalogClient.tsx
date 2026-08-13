'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Tool, Category, Persona, ToolFilterOptions } from '../../types/tool';
import { ToolCard } from '../../components/tool/ToolCard';
import { ToolFilterSidebar } from '../../components/tool/ToolFilterSidebar';
import { PageHero, PageHeroAccentBadge } from '../../components/ui/PageHero';
import { Search, Sparkles, Filter, Grid, List } from 'lucide-react';

interface ToolCatalogClientProps {
  initialTools: Tool[];
  totalCount: number;
  categories: Category[];
  personas: Persona[];
}

export function ToolCatalogClient({
  initialTools,
  totalCount,
  categories,
  personas
}: ToolCatalogClientProps) {
  const [tools, setTools] = useState<Tool[]>(initialTools);
  const [viewLayout, setViewLayout] = useState<'grid' | 'list'>('grid');
  const [filters, setFilters] = useState<ToolFilterOptions>({
    category: 'all',
    pricing: 'all',
    persona: 'all',
    sortBy: 'rating',
    page: 1,
    limit: 24
  });

  const [searchQuery, setSearchQuery] = useState('');
  const searchParams = useSearchParams();

  useEffect(() => {
    const query = searchParams.get('search');
    if (query) {
      setSearchQuery(query);
    }
  }, [searchParams]);

  const filteredTools = tools.filter((t) => {
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matches =
        t.name.toLowerCase().includes(q) ||
        t.tagline.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q) ||
        t.tags.some((tag) => tag.toLowerCase().includes(q));
      if (!matches) return false;
    }

    if (filters.category && filters.category !== 'all') {
      const cat = categories.find((c) => c.slug === filters.category || c.id === filters.category);
      if (
        cat &&
        t.categorySlug !== cat.slug &&
        t.categoryId !== cat.id &&
        t.categoryName !== cat.name
      ) {
        return false;
      }
    }

    if (filters.persona && filters.persona !== 'all') {
      if (!t.targetUsers.includes(filters.persona)) return false;
    }

    if (filters.pricing && filters.pricing !== 'all') {
      if (t.pricingModel !== filters.pricing) return false;
    }

    if (filters.hasApi && !t.hasApi) return false;
    if (filters.hasMobileApp && !t.hasMobileApp) return false;
    if (filters.hasExtension && !t.hasExtension) return false;
    if (filters.hasFreeOption && t.pricingModel === 'Paid') return false;
    if (filters.minRating && t.rating < filters.minRating) return false;

    return true;
  });

  const handleReset = () => {
    setFilters({
      category: 'all',
      pricing: 'all',
      persona: 'all',
      sortBy: 'rating',
      page: 1,
      limit: 24
    });
    setSearchQuery('');
  };

  return (
    <div className="space-y-8">
      <PageHero
        badge={
          <PageHeroAccentBadge icon={<Sparkles className="w-3 h-3 text-muted-foreground" />}>
            Taxonomy Catalog &bull; {totalCount} AI Tools
          </PageHeroAccentBadge>
        }
        title="Search & Filter All AI Tools"
        description="The complete searchable catalog — filter by category, pricing, persona fit, and API or mobile availability."
      >
        <div className="relative pt-2 max-w-2xl mx-auto">
          <input
            type="text"
            placeholder="Filter by name, keyword, capability, or tag..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-inverted-foreground/10 border border-inverted-foreground/20 rounded-2xl pl-11 pr-4 py-3 text-sm text-inverted-foreground placeholder:text-inverted-foreground/40 focus:outline-none focus:ring-2 focus:ring-foreground/20 shadow-inner"
          />
          <Search className="w-5 h-5 text-inverted-foreground/50 absolute left-4 top-3.5" />
        </div>
      </PageHero>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1">
          <ToolFilterSidebar
            categories={categories}
            personas={personas}
            filters={filters}
            onFilterChange={setFilters}
            onResetFilters={handleReset}
            totalResultsCount={filteredTools.length}
          />
        </div>

        <div className="lg:col-span-3 space-y-6">
          <div className="home-card flex items-center justify-between p-4">
            <div className="text-xs font-medium text-foreground">
              Showing <span className="text-foreground-strong">{filteredTools.length}</span> tools
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setViewLayout('grid')}
                className={`p-1.5 rounded-lg border transition-colors cursor-pointer ${
                  viewLayout === 'grid'
                    ? 'bg-primary text-primary-foreground border-primary'
                    : 'bg-background text-muted-foreground border-border/50'
                }`}
                title="Grid View"
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewLayout('list')}
                className={`p-1.5 rounded-lg border transition-colors cursor-pointer ${
                  viewLayout === 'list'
                    ? 'bg-primary text-primary-foreground border-primary'
                    : 'bg-background text-muted-foreground border-border/50'
                }`}
                title="List View"
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>

          {filteredTools.length === 0 ? (
            <div className="home-card p-12 text-center space-y-3">
              <Filter className="w-8 h-8 text-muted-foreground mx-auto" />
              <h3 className="font-medium text-foreground-strong text-lg">No tools found matching your criteria</h3>
              <p className="text-xs text-muted-foreground max-w-sm mx-auto">
                Try widening your filters or resetting pricing and category selections.
              </p>
              <button onClick={handleReset} className="home-btn-primary text-xs mt-2 cursor-pointer">
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className={viewLayout === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5' : 'space-y-4'}>
              {filteredTools.map((tool) => (
                <ToolCard key={tool.id} tool={tool} layout={viewLayout} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
