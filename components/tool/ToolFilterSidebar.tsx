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

  return (
    <aside className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-6">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-100">
        <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
          <Filter className="w-4 h-4 text-slate-900" />
          Filter Tools ({totalResultsCount})
        </div>

        {hasActiveFilters && (
          <button
            onClick={onResetFilters}
            className="text-xs text-slate-500 hover:text-slate-900 flex items-center gap-1 cursor-pointer transition-colors"
          >
            <RotateCcw className="w-3 h-3" />
            Reset
          </button>
        )}
      </div>

      {/* Pricing Model Filter */}
      <div>
        <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2.5 flex items-center gap-1.5">
          <DollarSign className="w-3.5 h-3.5 text-slate-400" />
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
                onClick={() => handlePricingSelect(item.value as any)}
                className={`text-xs py-1.5 px-2 rounded-lg font-medium transition-colors cursor-pointer text-center ${
                  isSelected
                    ? 'bg-slate-900 text-white font-semibold shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200/80'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Categories Multi-Choice */}
      <div>
        <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2.5 flex items-center gap-1.5">
          <Tag className="w-3.5 h-3.5 text-slate-400" />
          Categories
        </h4>
        <div className="space-y-1 max-h-56 overflow-y-auto pr-1 text-xs">
          <button
            onClick={() => onFilterChange({ ...filters, category: 'all', page: 1 })}
            className={`w-full text-left px-3 py-2 rounded-lg flex items-center justify-between transition-colors cursor-pointer ${
              !filters.category || filters.category === 'all'
                ? 'bg-slate-900 text-white font-bold'
                : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            <span>All Categories</span>
            {(!filters.category || filters.category === 'all') && <Check className="w-3.5 h-3.5 text-emerald-400" />}
          </button>

          {categories.map((cat) => {
            const isSelected = filters.category === cat.id || filters.category === cat.slug;
            return (
              <button
                key={cat.id}
                onClick={() => handleCategorySelect(cat.id)}
                className={`w-full text-left px-3 py-2 rounded-lg flex items-center justify-between transition-colors cursor-pointer ${
                  isSelected
                    ? 'bg-slate-900 text-white font-bold'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                <span className="truncate">{cat.name}</span>
                <div className="flex items-center gap-1.5 shrink-0">
                  <span className={`text-[10px] px-1.5 py-0.2 rounded font-medium ${isSelected ? 'bg-slate-800 text-slate-300' : 'bg-slate-100 text-slate-500'}`}>
                    {cat.toolCount}
                  </span>
                  {isSelected && <Check className="w-3.5 h-3.5 text-emerald-400" />}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Workflow / Target Persona */}
      <div>
        <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2.5 flex items-center gap-1.5">
          <Users className="w-3.5 h-3.5 text-slate-400" />
          By Persona / Role
        </h4>
        <div className="space-y-1 max-h-44 overflow-y-auto pr-1 text-xs">
          <button
            onClick={() => onFilterChange({ ...filters, persona: 'all', page: 1 })}
            className={`w-full text-left px-3 py-2 rounded-lg flex items-center justify-between transition-colors cursor-pointer ${
              !filters.persona || filters.persona === 'all'
                ? 'bg-slate-900 text-white font-bold'
                : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            <span>All Roles</span>
            {(!filters.persona || filters.persona === 'all') && <Check className="w-3.5 h-3.5 text-emerald-400" />}
          </button>

          {visiblePersonas.map((p) => {
            const isSelected = filters.persona === p.slug;
            return (
              <button
                key={p.id}
                onClick={() => handlePersonaSelect(p.slug)}
                className={`w-full text-left px-3 py-2 rounded-lg flex items-center justify-between transition-colors cursor-pointer ${
                  isSelected
                    ? 'bg-slate-900 text-white font-bold'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                <span className="truncate">{p.title}</span>
                {isSelected && <Check className="w-3.5 h-3.5 text-emerald-400" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Feature Checkbox Toggles */}
      <div className="pt-2 border-t border-slate-100">
        <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2.5">
          Capabilities
        </h4>
        <div className="space-y-2 text-xs text-slate-700">
          <label className="flex items-center gap-2 cursor-pointer select-none hover:text-slate-900">
            <input
              type="checkbox"
              checked={!!filters.hasFreeOption}
              onChange={() => handleToggleFeature('hasFreeOption')}
              className="rounded text-slate-900 focus:ring-slate-400"
            />
            <span>Has Free Plan / Trial</span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer select-none hover:text-slate-900">
            <input
              type="checkbox"
              checked={!!filters.hasApi}
              onChange={() => handleToggleFeature('hasApi')}
              className="rounded text-slate-900 focus:ring-slate-400"
            />
            <span>Developer API Access</span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer select-none hover:text-slate-900">
            <input
              type="checkbox"
              checked={!!filters.hasMobileApp}
              onChange={() => handleToggleFeature('hasMobileApp')}
              className="rounded text-slate-900 focus:ring-slate-400"
            />
            <span>Mobile App Available</span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer select-none hover:text-slate-900">
            <input
              type="checkbox"
              checked={!!filters.hasExtension}
              onChange={() => handleToggleFeature('hasExtension')}
              className="rounded text-slate-900 focus:ring-slate-400"
            />
            <span>Browser Extension</span>
          </label>
        </div>
      </div>

      {/* Rating Filter */}
      <div className="pt-2 border-t border-slate-100">
        <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">
          Minimum Rating
        </h4>
        <div className="flex items-center gap-1 text-xs">
          {[0, 4.0, 4.5, 4.8].map((rate) => (
            <button
              key={rate}
              onClick={() => onFilterChange({ ...filters, minRating: rate, page: 1 })}
              className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                (filters.minRating || 0) === rate
                  ? 'bg-slate-900 text-white font-bold'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
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
