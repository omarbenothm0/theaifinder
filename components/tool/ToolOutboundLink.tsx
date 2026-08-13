import { ExternalLink } from 'lucide-react';
import { getToolOutboundLink, ToolLinkFields } from '../../lib/utils/toolOutboundLink';

interface ToolOutboundLinkProps {
  tool: ToolLinkFields;
  variant: 'button' | 'icon';
  className?: string;
}

export function ToolOutboundLink({ tool, variant, className = '' }: ToolOutboundLinkProps) {
  const link = getToolOutboundLink(tool);

  if (variant === 'button') {
    return (
      <a
        href={link.href}
        target="_blank"
        rel={link.rel}
        title={link.title}
        className={
          className ||
          'home-btn-primary text-sm px-6 py-3.5 rounded-xl shadow-md flex items-center justify-center gap-2 cursor-pointer'
        }
      >
        <span>{link.label}</span>
        <ExternalLink className="w-4 h-4" />
      </a>
    );
  }

  return (
    <a
      href={link.href}
      target="_blank"
      rel={link.rel}
      title={link.title}
      aria-label={link.title}
      className={
        className ||
        'p-1.5 text-muted-foreground hover:text-foreground-strong hover:bg-foreground/5 rounded-lg transition-colors cursor-pointer'
      }
    >
      <ExternalLink className="w-4 h-4" />
    </a>
  );
}

/** Server-safe helper when only metadata is needed (e.g. conditional disclosure). */
export function toolUsesAffiliateLink(tool: ToolLinkFields): boolean {
  return getToolOutboundLink(tool).isAffiliate;
}
