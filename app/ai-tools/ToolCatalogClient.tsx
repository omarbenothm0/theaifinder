'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Tool, Category, Persona, ToolFilterOptions } from '../../types/tool';
import { ToolCard } from '../../components/tool/ToolCard';
import { ToolFilterSidebar } from '../../components/tool/ToolFilterSidebar';
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

  // Local filtering for fast client response
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
      {/* Search Header Banner */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-10 shadow-lg relative overflow-hidden">
        <div className="max-w-2xl space-y-4 relative z-10">
          <div className="inline-flex items-center gap-1.5 bg-emerald-950 border border-emerald-800 text-emerald-300 px-3 py-1 rounded-full text-xs font-semibold">
            <Sparkles className="w-3 h-3 text-emerald-400" />
            Taxonomy Catalog &bull; {totalCount} AI Tools
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Search &amp; Filter All AI Tools
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            The complete searchable catalog — filter by category, pricing, persona fit, and API or mobile availability.
          </p>

          <div className="relative pt-2">
            <input
              type="text"
              placeholder="Filter by name, keyword, capability, or tag..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-800/90 border border-slate-700/80 rounded-2xl pl-11 pr-4 py-3 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-inner"
            />
            <Search className="w-5 h-5 text-slate-400 absolute left-4 top-5" />
          </div>
        </div>
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Sidebar Filters */}
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

        {/* Tools Results List */}
        <div className="lg:col-span-3 space-y-6">
          <div className="flex items-center justify-between bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
            <div className="text-xs font-bold text-slate-700">
              Showing <span className="text-slate-900">{filteredTools.length}</span> tools
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setViewLayout('grid')}
                className={`p-1.5 rounded-lg border transition-colors cursor-pointer ${
                  viewLayout === 'grid' ? 'bg-slate-900 text-white border-slate-900' : 'bg-slate-50 text-slate-500 border-slate-200'
                }`}
                title="Grid View"
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewLayout('list')}
                className={`p-1.5 rounded-lg border transition-colors cursor-pointer ${
                  viewLayout === 'list' ? 'bg-slate-900 text-white border-slate-900' : 'bg-slate-50 text-slate-500 border-slate-200'
                }`}
                title="List View"
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>

          {filteredTools.length === 0 ? (
            <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-3">
              <Filter className="w-8 h-8 text-slate-300 mx-auto" />
              <h3 className="font-bold text-slate-900 text-lg">No tools found matching your criteria</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Try widening your filters or resetting pricing and category selections.
              </p>
              <button
                onClick={handleReset}
                className="bg-slate-900 text-white text-xs font-bold px-4 py-2 rounded-xl transition-colors cursor-pointer mt-2"
              >
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
