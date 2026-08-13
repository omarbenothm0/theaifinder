import Link from 'next/link';
import type { ReactNode } from 'react';

interface LinkChipProps {
  href: string;
  children: ReactNode;
  className?: string;
}

/** Secondary navigation chip — neutral, matches homepage pill language. */
export function LinkChip({ href, children, className = '' }: LinkChipProps) {
  return (
    <Link
      href={href}
      className={`home-hub-chip ${className}`}
    >
      {children}
    </Link>
  );
}
