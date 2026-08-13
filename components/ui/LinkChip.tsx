import Link from 'next/link';
import type { ReactNode } from 'react';

interface LinkChipProps {
  href: string;
  children: ReactNode;
  className?: string;
}

/** Secondary navigation chip — accent tint, matches homepage pill language. */
export function LinkChip({ href, children, className = '' }: LinkChipProps) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center gap-1.5 rounded-xl border border-accent/20 bg-accent/10 px-4 py-2.5 text-xs font-medium text-accent transition-colors hover:bg-accent/15 hover:text-foreground ${className}`}
    >
      {children}
    </Link>
  );
}
