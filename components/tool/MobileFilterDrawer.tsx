'use client';

import React, { useEffect } from 'react';
import { Category, Persona, ToolFilterOptions } from '../../types/tool';
import { ToolFilterSidebar } from './ToolFilterSidebar';
import { X } from 'lucide-react';

interface MobileFilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  categories: Category[];
  personas: Persona[];
  filters: ToolFilterOptions;
  onFilterChange: (newFilters: ToolFilterOptions) => void;
  onResetFilters: () => void;
  totalResultsCount: number;
}

export function MobileFilterDrawer({
  isOpen,
  onClose,
  categories,
  personas,
  filters,
  onFilterChange,
  onResetFilters,
  totalResultsCount,
}: MobileFilterDrawerProps) {
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
          <span className="text-sm font-semibold text-foreground-strong">Filters</span>
          <button
            type="button"
            onClick={onClose}
            className="p-2 text-foreground hover:bg-foreground/5 rounded-lg transition-colors"
            aria-label="Close filters"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto p-4">
          <ToolFilterSidebar
            categories={categories}
            personas={personas}
            filters={filters}
            onFilterChange={onFilterChange}
            onResetFilters={onResetFilters}
            totalResultsCount={totalResultsCount}
          />
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-border/30 bg-foreground/5">
          <button
            type="button"
            onClick={onClose}
            className="w-full bg-primary hover:bg-foreground/90 text-primary-foreground font-medium text-sm px-4 py-3 rounded-xl transition-colors"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
}
