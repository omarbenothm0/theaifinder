import Link from 'next/link';

interface AffiliateDisclosureProps {
  /** Inline near a CTA vs compact site-wide footer style */
  variant?: 'inline' | 'footer';
  className?: string;
}

export function AffiliateDisclosure({
  variant = 'inline',
  className = '',
}: AffiliateDisclosureProps) {
  const baseClass =
    variant === 'footer'
      ? 'text-[11px] text-muted-foreground leading-relaxed max-w-2xl'
      : 'text-[11px] text-muted-foreground leading-relaxed';

  return (
    <p className={`${baseClass} ${className}`.trim()}>
      Some outbound links on {variant === 'footer' ? 'this site' : 'this page'} are affiliate
      links. If you sign up through one of these links, we may earn a commission at no extra cost
      to you.{' '}
      <Link href="/terms" className="underline hover:text-foreground transition-colors">
        Learn more
      </Link>
    </p>
  );
}
