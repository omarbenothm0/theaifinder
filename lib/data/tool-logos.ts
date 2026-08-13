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

/** Flat monochrome brand glyph for the homepage logo marquee (no background box). */
export function marqueeMonochromeLogo(slug: string): string {
  return `/logos/marquee/${slug}.svg`;
}

/** Curated, deduplicated logos for the homepage trusted strip. */
export const HOME_MARQUEE_LOGOS: HomeMarqueeLogo[] = [
  { slug: 'chatgpt', name: 'ChatGPT', logo: marqueeMonochromeLogo('chatgpt') },
  { slug: 'claude', name: 'Claude', logo: marqueeMonochromeLogo('claude') },
  { slug: 'cursor', name: 'Cursor', logo: marqueeMonochromeLogo('cursor') },
  { slug: 'midjourney', name: 'Midjourney', logo: marqueeMonochromeLogo('midjourney') },
  { slug: 'perplexity', name: 'Perplexity', logo: marqueeMonochromeLogo('perplexity') },
  { slug: 'notion-ai', name: 'Notion AI', logo: marqueeMonochromeLogo('notion-ai') },
  { slug: 'elevenlabs', name: 'ElevenLabs', logo: marqueeMonochromeLogo('elevenlabs') },
  { slug: 'runway', name: 'Runway', logo: marqueeMonochromeLogo('runway') },
  { slug: 'descript', name: 'Descript', logo: marqueeMonochromeLogo('descript') },
  { slug: 'v0', name: 'v0 by Vercel', logo: marqueeMonochromeLogo('v0') },
];
