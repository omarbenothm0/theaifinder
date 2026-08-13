'use client';

import { useState, useMemo } from 'react';
import { Tool } from '../../types/tool';
import { ToolCard } from './ToolCard';

interface PersonaToolsFilterProps {
  tools: Tool[];
}

export function PersonaToolsFilter({ tools }: PersonaToolsFilterProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Derive unique categories present in this persona's tool list only
  const availableCategories = useMemo(() => {
    const seen = new Map<string, string>(); // categoryId -> categoryName
    tools.forEach((t) => {
      if (!seen.has(t.categoryId)) {
        seen.set(t.categoryId, t.categoryName);
      }
    });
    return Array.from(seen.entries()).map(([id, name]) => ({ id, name }));
  }, [tools]);

  const filteredTools = useMemo(() => {
    if (selectedCategory === 'all') return tools;
    return tools.filter((t) => t.categoryId === selectedCategory);
  }, [tools, selectedCategory]);

  // No point showing a filter strip when there's only one (or zero) categories present
  const showFilterStrip = availableCategories.length > 1;

  return (
    <div className="space-y-6">
      {showFilterStrip && (
        <div className="flex flex-wrap gap-1.5">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`text-xs py-1.5 px-3 rounded-lg font-medium transition-colors cursor-pointer ${
              selectedCategory === 'all'
                ? 'bg-inverted text-inverted-foreground font-semibold shadow-xs'
                : 'bg-foreground/5 text-foreground hover:bg-foreground/8'
            }`}
          >
            All Categories
          </button>
          {availableCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`text-xs py-1.5 px-3 rounded-lg font-medium transition-colors cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-inverted text-inverted-foreground font-semibold shadow-xs'
                  : 'bg-foreground/5 text-foreground hover:bg-foreground/8'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTools.map((tool) => (
          <ToolCard key={tool.id} tool={tool} />
        ))}
      </div>
    </div>
  );
}