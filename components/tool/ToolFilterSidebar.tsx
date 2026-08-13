'use client';

import { Category, Persona, PricingModel, ToolFilterOptions } from '../../types/tool';
import { filterPublicPersonas } from '../../lib/seo/persona-visibility';
import { Filter, RotateCcw, Check, DollarSign, Tag, Users } from 'lucide-react';

interface ToolFilterSidebarProps {
  categories: Category[];
  personas: Persona[];
  filters: ToolFilterOptions;
  onFilterChange: (newFilters: ToolFilterOptions) => void;
  onResetFilters: () => void;
  totalResultsCount: number;
}

export function ToolFilterSidebar({
  categories,
  personas,
  filters,
  onFilterChange,
  onResetFilters,
  totalResultsCount
}: ToolFilterSidebarProps) {
  const handleCategorySelect = (catId: string) => {
    onFilterChange({
      ...filters,
      category: filters.category === catId ? 'all' : catId,
      page: 1
    });
  };

  const handlePricingSelect = (pricing: PricingModel | 'all') => {
    onFilterChange({
      ...filters,
      pricing: filters.pricing === pricing ? 'all' : pricing,
      page: 1
    });
  };

  const handlePersonaSelect = (personaSlug: string) => {
    onFilterChange({
      ...filters,
      persona: filters.persona === personaSlug ? 'all' : personaSlug,
      page: 1
    });
  };

  const handleToggleFeature = (key: 'hasApi' | 'hasMobileApp' | 'hasExtension' | 'hasFreeOption') => {
    onFilterChange({
      ...filters,
      [key]: !filters[key],
      page: 1
    });
  };

  const visiblePersonas = filterPublicPersonas(personas);

  const hasActiveFilters =
    (filters.category && filters.category !== 'all') ||
    (filters.pricing && filters.pricing !== 'all') ||
    (filters.persona && filters.persona !== 'all') ||
    filters.hasApi ||
    filters.hasMobileApp ||
    filters.hasExtension ||
    filters.hasFreeOption ||
    (filters.minRating && filters.minRating > 0);

  const selectedBtn = 'bg-primary text-primary-foreground font-medium shadow-xs';
  const idleBtn = 'bg-foreground/5 text-foreground hover:bg-foreground/8';

  return (
    <aside className="home-card p-5 space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-border/30">
        <div className="flex items-center gap-2 font-medium text-foreground-strong text-sm">
          <Filter className="w-4 h-4" />
          Filter Tools ({totalResultsCount})
        </div>

        {hasActiveFilters && (
          <button
            onClick={onResetFilters}
            className="text-xs text-muted-foreground hover:text-foreground-strong flex items-center gap-1 cursor-pointer transition-colors"
          >
            <RotateCcw className="w-3 h-3" />
            Reset
          </button>
        )}
      </div>

      <div>
        <h4 className="text-xs font-medium uppercase tracking-widest text-muted-foreground mb-2.5 flex items-center gap-1.5">
          <DollarSign className="w-3.5 h-3.5" />
          Pricing Model
        </h4>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
          {[
            { label: 'All', value: 'all' },
            { label: 'Free', value: 'Free' },
            { label: 'Freemium', value: 'Freemium' },
            { label: 'Paid', value: 'Paid' }
          ].map((item) => {
            const isSelected = (filters.pricing || 'all') === item.value;
            return (
              <button
                key={item.value}
                onClick={() => handlePricingSelect(item.value as PricingModel | 'all')}
                className={`text-xs py-1.5 px-2 rounded-lg font-medium transition-colors cursor-pointer text-center ${
                  isSelected ? selectedBtn : idleBtn
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <h4 className="text-xs font-medium uppercase tracking-widest text-muted-foreground mb-2.5 flex items-center gap-1.5">
          <Tag className="w-3.5 h-3.5" />
          Categories
        </h4>
        <div className="space-y-1 max-h-56 overflow-y-auto pr-1 text-xs">
          <button
            onClick={() => onFilterChange({ ...filters, category: 'all', page: 1 })}
            className={`w-full text-left px-3 py-2 rounded-lg flex items-center justify-between transition-colors cursor-pointer ${
              !filters.category || filters.category === 'all' ? selectedBtn : `text-foreground ${idleBtn}`
            }`}
          >
            <span>All Categories</span>
            {(!filters.category || filters.category === 'all') && <Check className="w-3.5 h-3.5 text-accent" />}
          </button>

          {categories.map((cat) => {
            const isSelected = filters.category === cat.id || filters.category === cat.slug;
            return (
              <button
                key={cat.id}
                onClick={() => handleCategorySelect(cat.id)}
                className={`w-full text-left px-3 py-2 rounded-lg flex items-center justify-between transition-colors cursor-pointer ${
                  isSelected ? selectedBtn : `text-foreground ${idleBtn}`
                }`}
              >
                <span className="truncate">{cat.name}</span>
                <div className="flex items-center gap-1.5 shrink-0">
                  <span className={`text-[10px] px-1.5 py-0.5 rounded font-medium ${isSelected ? 'bg-inverted-foreground/15 text-inverted-foreground/80' : 'bg-foreground/5 text-muted-foreground'}`}>
                    {cat.toolCount}
                  </span>
                  {isSelected && <Check className="w-3.5 h-3.5 text-accent" />}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <h4 className="text-xs font-medium uppercase tracking-widest text-muted-foreground mb-2.5 flex items-center gap-1.5">
          <Users className="w-3.5 h-3.5" />
          By Persona / Role
        </h4>
        <div className="space-y-1 max-h-44 overflow-y-auto pr-1 text-xs">
          <button
            onClick={() => onFilterChange({ ...filters, persona: 'all', page: 1 })}
            className={`w-full text-left px-3 py-2 rounded-lg flex items-center justify-between transition-colors cursor-pointer ${
              !filters.persona || filters.persona === 'all' ? selectedBtn : `text-foreground ${idleBtn}`
            }`}
          >
            <span>All Roles</span>
            {(!filters.persona || filters.persona === 'all') && <Check className="w-3.5 h-3.5 text-accent" />}
          </button>

          {visiblePersonas.map((p) => {
            const isSelected = filters.persona === p.slug;
            return (
              <button
                key={p.id}
                onClick={() => handlePersonaSelect(p.slug)}
                className={`w-full text-left px-3 py-2 rounded-lg flex items-center justify-between transition-colors cursor-pointer ${
                  isSelected ? selectedBtn : `text-foreground ${idleBtn}`
                }`}
              >
                <span className="truncate">{p.title}</span>
                {isSelected && <Check className="w-3.5 h-3.5 text-accent" />}
              </button>
            );
          })}
        </div>
      </div>

      <div className="pt-2 border-t border-border/30">
        <h4 className="text-xs font-medium uppercase tracking-widest text-muted-foreground mb-2.5">
          Capabilities
        </h4>
        <div className="space-y-2 text-xs text-foreground">
          {(
            [
              ['hasFreeOption', 'Has Free Plan / Trial'],
              ['hasApi', 'Developer API Access'],
              ['hasMobileApp', 'Mobile App Available'],
              ['hasExtension', 'Browser Extension'],
            ] as const
          ).map(([key, label]) => (
            <label key={key} className="flex items-center gap-2 cursor-pointer select-none hover:text-foreground-strong">
              <input
                type="checkbox"
                checked={!!filters[key]}
                onChange={() => handleToggleFeature(key)}
                className="rounded border-border text-primary focus:ring-accent"
              />
              <span>{label}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="pt-2 border-t border-border/30">
        <h4 className="text-xs font-medium uppercase tracking-widest text-muted-foreground mb-2">
          Minimum Rating
        </h4>
        <div className="flex items-center gap-1 text-xs">
          {[0, 4.0, 4.5, 4.8].map((rate) => (
            <button
              key={rate}
              onClick={() => onFilterChange({ ...filters, minRating: rate, page: 1 })}
              className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                (filters.minRating || 0) === rate ? selectedBtn : idleBtn
              }`}
            >
              {rate === 0 ? 'Any' : `${rate}+ ★`}
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
}
