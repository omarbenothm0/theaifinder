'use client';

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Search } from 'lucide-react';
import { Tool } from '../../types/tool';
import { getNavToolSuggestions } from '../../lib/search/nav-tool-suggestions';

type NavSearchVariant = 'nav' | 'hero';

interface NavSearchProps {
  className?: string;
  variant?: NavSearchVariant;
  inputId?: string;
}

const TOOLS_FETCH_LIMIT = 100;

const VARIANT_STYLES: Record<
  NavSearchVariant,
  {
    placeholder: string;
    input: string;
    iconButton: string;
    icon: string;
    dropdown: string;
    option: string;
    viewAll: string;
    empty: string;
  }
> = {
  nav: {
    placeholder: 'Search AI tools...',
    input:
      'w-full h-9 bg-background-raised border border-border/50 rounded-lg pl-8 pr-3 text-xs font-medium text-foreground placeholder:text-muted-foreground/70 focus:outline-none focus:border-border transition-colors duration-200',
    iconButton: 'absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground',
    icon: 'w-3.5 h-3.5 pointer-events-none',
    dropdown:
      'absolute left-0 right-0 top-full z-[60] mt-1 max-h-[min(16rem,calc(100dvh-5rem))] overflow-y-auto overscroll-contain rounded-lg border border-border/50 bg-background-raised shadow-sm',
    option: 'px-3 py-2 text-xs',
    viewAll: 'px-3 py-2 text-xs',
    empty: 'px-3 py-2.5 text-xs',
  },
  hero: {
    placeholder: 'Already know a tool? Look it up here.',
    input:
      'w-full h-9 md:h-10 bg-white/[0.15] backdrop-blur-[12px] border border-white/[0.28] rounded-xl pl-11 md:pl-12 pr-4 text-sm md:text-base font-medium text-white/90 placeholder:text-white/65 shadow-none focus:outline-none focus:border-white/40 transition-colors duration-200',
    iconButton: 'absolute left-3.5 md:left-4 top-1/2 -translate-y-1/2 text-white/70',
    icon: 'w-5 h-5 pointer-events-none',
    dropdown:
      'absolute left-0 right-0 top-full z-[60] mt-2 max-h-[min(18rem,calc(100dvh-6rem))] overflow-y-auto overscroll-contain rounded-xl border border-border/50 bg-background-raised shadow-sm text-left',
    option: 'px-4 py-3 text-sm',
    viewAll: 'px-4 py-3 text-sm',
    empty: 'px-4 py-3 text-sm',
  },
};

export function NavSearch({ className, variant = 'nav', inputId }: NavSearchProps) {
  const styles = VARIANT_STYLES[variant];
  const resolvedInputId = inputId ?? (variant === 'hero' ? 'hero-search-input' : 'global-search-input');
  const listboxId = variant === 'hero' ? 'hero-search-suggestions' : 'nav-search-suggestions';
  const optionIdPrefix = variant === 'hero' ? 'hero-search-option' : 'nav-search-option';
  const router = useRouter();
  const rootRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const [searchQuery, setSearchQuery] = useState('');
  const [tools, setTools] = useState<Tool[]>([]);
  const [toolsLoaded, setToolsLoaded] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  useEffect(() => {
    let cancelled = false;

    fetch(`/api/tools?limit=${TOOLS_FETCH_LIMIT}`)
      .then((res) => {
        if (!res.ok) return null;
        return res.json();
      })
      .then((data: { tools?: Tool[] } | null) => {
        if (!cancelled && data && Array.isArray(data.tools)) {
          setTools(data.tools);
        }
      })
      .catch(() => {
        // Autocomplete degrades gracefully to submit-only search.
      })
      .finally(() => {
        if (!cancelled) setToolsLoaded(true);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const trimmedQuery = searchQuery.trim();
  const { suggestions, totalMatches, hasMore } = useMemo(
    () => getNavToolSuggestions(tools, trimmedQuery),
    [tools, trimmedQuery]
  );

  const showViewAll = hasMore && trimmedQuery.length > 0;
  const optionCount = suggestions.length + (showViewAll ? 1 : 0);
  const showDropdown = isOpen && trimmedQuery.length > 0;

  const closeDropdown = useCallback(() => {
    setIsOpen(false);
    setActiveIndex(-1);
  }, []);

  useEffect(() => {
    const handlePointerDown = (event: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
        closeDropdown();
      }
    };

    document.addEventListener('mousedown', handlePointerDown);
    return () => document.removeEventListener('mousedown', handlePointerDown);
  }, [closeDropdown]);

  useEffect(() => {
    if (!showDropdown) {
      setActiveIndex(-1);
    }
  }, [showDropdown, trimmedQuery]);

  const openToolPage = (slug: string) => {
    closeDropdown();
    router.push(`/tools/${slug}`);
  };

  const navigateToCatalog = (query: string) => {
    closeDropdown();
    router.push(`/ai-tools?search=${encodeURIComponent(query)}`);
  };

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    const trimmed = String(new FormData(e.currentTarget).get('search') ?? '').trim();
    if (!trimmed) {
      e.preventDefault();
      return;
    }

    if (showDropdown && activeIndex >= 0) {
      e.preventDefault();
      if (activeIndex < suggestions.length) {
        openToolPage(suggestions[activeIndex].slug);
      } else if (showViewAll) {
        navigateToCatalog(trimmed);
      }
      return;
    }

    const searchInput = e.currentTarget.elements.namedItem('search') as HTMLInputElement | null;
    if (searchInput) {
      searchInput.value = trimmed;
    }
    if (trimmed !== searchQuery) {
      setSearchQuery(trimmed);
    }
    closeDropdown();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') {
      e.preventDefault();
      closeDropdown();
      return;
    }

    if (!showDropdown || optionCount === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex((prev) => (prev < optionCount - 1 ? prev + 1 : 0));
      return;
    }

    if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex((prev) => (prev > 0 ? prev - 1 : optionCount - 1));
    }
  };

  return (
    <div ref={rootRef} className={className}>
      <form action="/ai-tools" method="get" onSubmit={handleSearch} className="relative">
        <input
          ref={inputRef}
          id={resolvedInputId}
          name="search"
          type="search"
          placeholder={styles.placeholder}
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => {
            if (trimmedQuery.length > 0) setIsOpen(true);
          }}
          onKeyDown={handleKeyDown}
          role="combobox"
          aria-expanded={showDropdown}
          aria-controls={showDropdown ? listboxId : undefined}
          aria-autocomplete="list"
          aria-activedescendant={
            showDropdown && activeIndex >= 0 ? `${optionIdPrefix}-${activeIndex}` : undefined
          }
          autoComplete="off"
          className={styles.input}
        />
        <button type="submit" aria-label="Search" className={styles.iconButton}>
          <Search className={styles.icon} />
        </button>

        {showDropdown && (
          <div id={listboxId} role="listbox" className={styles.dropdown}>
            {toolsLoaded && totalMatches === 0 ? (
              <p className={`${styles.empty} text-muted-foreground`}>No matching tools</p>
            ) : (
              <>
                {suggestions.map((tool, index) => (
                  <button
                    key={tool.id}
                    id={`${optionIdPrefix}-${index}`}
                    type="button"
                    role="option"
                    aria-selected={activeIndex === index}
                    onMouseDown={() => openToolPage(tool.slug)}
                    onClick={() => openToolPage(tool.slug)}
                    className={`flex w-full items-center gap-2.5 text-left font-medium text-foreground transition-colors duration-150 ${styles.option} ${
                      activeIndex === index ? 'bg-foreground/8' : 'hover:bg-foreground/5'
                    }`}
                  >
                    <Image
                      src={tool.logo}
                      alt=""
                      width={variant === 'hero' ? 24 : 20}
                      height={variant === 'hero' ? 24 : 20}
                      referrerPolicy="no-referrer"
                      className={`shrink-0 rounded object-cover bg-background border border-border/40 ${
                        variant === 'hero' ? 'h-6 w-6' : 'h-5 w-5'
                      }`}
                    />
                    <span className="truncate">{tool.name}</span>
                  </button>
                ))}

                {showViewAll && (
                  <button
                    id={`${optionIdPrefix}-${suggestions.length}`}
                    type="button"
                    role="option"
                    aria-selected={activeIndex === suggestions.length}
                    onMouseDown={() => navigateToCatalog(trimmedQuery)}
                    onClick={() => navigateToCatalog(trimmedQuery)}
                    className={`block w-full border-t border-border/40 text-left font-medium text-muted-foreground transition-colors duration-150 ${styles.viewAll} ${
                      activeIndex === suggestions.length
                        ? 'bg-foreground/8 text-foreground'
                        : 'hover:bg-foreground/5 hover:text-foreground'
                    }`}
                  >
                    View all results →
                  </button>
                )}
              </>
            )}
          </div>
        )}
      </form>
    </div>
  );
}
