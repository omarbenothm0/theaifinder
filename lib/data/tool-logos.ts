/** Official-domain favicons for tool logos (homepage strip + seed data). */

export function toolLogoFromDomain(domain: string): string {
  return `https://www.google.com/s2/favicons?domain=${domain}&sz=128`;
}

/** Prefer official product domains over placeholder/stock image URLs. */
export const TOOL_LOGO_DOMAINS: Record<string, string> = {
  'chatgpt': 'openai.com',
  'claude': 'claude.ai',
  'claude-code': 'code.claude.com',
  'cursor': 'cursor.com',
  'v0': 'v0.dev',
  'midjourney': 'midjourney.com',
  'elevenlabs': 'elevenlabs.io',
  'perplexity': 'perplexity.ai',
  'notion-ai': 'notion.so',
  'runway': 'runwayml.com',
  'descript': 'descript.com',
  'dall-e-3': 'openai.com',
  'jasper': 'jasper.ai',
  'gamma': 'gamma.app',
  'suno-ai': 'suno.com',
};

export function resolveToolLogo(slug: string, fallbackUrl?: string | null): string {
  const domain = TOOL_LOGO_DOMAINS[slug];
  if (domain) return toolLogoFromDomain(domain);
  if (fallbackUrl) return fallbackUrl;
  return toolLogoFromDomain('openai.com');
}

export type HomeMarqueeLogo = {
  slug: string;
  name: string;
  logo: string;
  fallbackLogo?: string;
};

/** Curated, deduplicated logos for the homepage trusted strip. */
export const HOME_MARQUEE_LOGOS: HomeMarqueeLogo[] = [
  { slug: 'chatgpt', name: 'ChatGPT', logo: toolLogoFromDomain('openai.com') },
  { slug: 'claude', name: 'Claude', logo: toolLogoFromDomain('claude.ai') },
  { slug: 'cursor', name: 'Cursor', logo: toolLogoFromDomain('cursor.com') },
  { slug: 'midjourney', name: 'Midjourney', logo: toolLogoFromDomain('midjourney.com') },
  { slug: 'perplexity', name: 'Perplexity', logo: toolLogoFromDomain('perplexity.ai') },
  { slug: 'notion-ai', name: 'Notion AI', logo: toolLogoFromDomain('notion.so') },
  { slug: 'elevenlabs', name: 'ElevenLabs', logo: toolLogoFromDomain('elevenlabs.io') },
  { slug: 'runway', name: 'Runway', logo: toolLogoFromDomain('runwayml.com') },
  { slug: 'descript', name: 'Descript', logo: toolLogoFromDomain('descript.com') },
  {
    slug: 'v0',
    name: 'v0 by Vercel',
    logo: toolLogoFromDomain('v0.dev'),
    fallbackLogo: toolLogoFromDomain('vercel.com'),
  },
];
