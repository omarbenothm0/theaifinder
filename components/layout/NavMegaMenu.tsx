'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { NavMegaMenuColumn } from '../../lib/data/nav-mega-menu';

type NavMegaMenuProps = {
  columns: NavMegaMenuColumn[];
  footer?: { label: string; href: string };
  open: boolean;
  onClose: () => void;
  panelClassName?: string;
};

export function NavMegaMenu({
  columns,
  footer,
  open,
  onClose,
  panelClassName = '',
}: NavMegaMenuProps) {
  if (!open) return null;

  return (
    <div
      className={`absolute top-full left-1/2 -translate-x-1/2 z-50 pt-2 min-w-[min(100vw-2rem,52rem)] ${panelClassName}`}
    >
      <div className="bg-background-raised rounded-xl p-6 border border-border/50">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {columns.map((column) => (
            <div key={column.label}>
              <p className="text-xs font-medium uppercase tracking-[0.015em] text-muted-foreground mb-4">
                {column.label}
              </p>
              <ul className="space-y-5">
                {column.items.map((item) => (
                  <li key={item.href + item.title}>
                    <Link
                      href={item.href}
                      id={item.id}
                      onClick={onClose}
                      className="group block transition-colors duration-200"
                    >
                      <span className="block text-[15px] font-medium leading-snug text-foreground group-hover:text-foreground-strong">
                        {item.title}
                      </span>
                      <span className="block text-[13px] font-normal leading-[1.35] text-muted-foreground mt-1">
                        {item.description}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {footer && (
          <div className="mt-6 pt-4 border-t border-border/50">
            <Link
              href={footer.href}
              onClick={onClose}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              {footer.label}
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
