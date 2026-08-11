import { Tool } from '../../types/tool';

export type ToolLinkFields = Pick<
  Tool,
  'websiteUrl' | 'affiliateUrl' | 'affiliateEnabled' | 'name'
>;

export interface ToolOutboundLinkMeta {
  href: string;
  isAffiliate: boolean;
  label: string;
  rel: string;
  title: string;
}

const OFFICIAL_REL = 'noopener noreferrer';
const AFFILIATE_REL = 'sponsored nofollow noopener noreferrer';

/** Central outbound destination for public CTAs (affiliate when enabled, else official). */
export function getToolOutboundLink(tool: ToolLinkFields): ToolOutboundLinkMeta {
  const official = tool.websiteUrl?.trim() ?? '';
  const affiliate = tool.affiliateUrl?.trim() ?? '';
  const useAffiliate = Boolean(tool.affiliateEnabled && affiliate);

  return {
    href: useAffiliate ? affiliate : official,
    isAffiliate: useAffiliate,
    label: useAffiliate ? 'Visit Website' : 'Visit Official Website',
    rel: useAffiliate ? AFFILIATE_REL : OFFICIAL_REL,
    title: useAffiliate
      ? `Visit ${tool.name} (affiliate link — we may earn a commission)`
      : `Visit ${tool.name} official website`,
  };
}

/** Official URL only — monitoring, editorial reference, never for monetized clicks. */
export function getToolOfficialWebsiteUrl(tool: Pick<Tool, 'websiteUrl'>): string {
  return tool.websiteUrl?.trim() ?? '';
}
