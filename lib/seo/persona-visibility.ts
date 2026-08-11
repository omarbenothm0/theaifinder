/** Seed personas removed from public nav/sitemap — records kept in DB for reversibility. */

export const PERSONA_REDIRECTS: Readonly<Record<string, string>> = {
  'content-creators': '/for/marketers',
  entrepreneurs: '/for/small-business',
};

export const PERSONA_NOINDEX_SLUGS: ReadonlySet<string> = new Set(['youtubers', 'developers']);

export const DEPRECATED_PERSONA_NAV_SLUGS: ReadonlySet<string> = new Set([
  'content-creators',
  'entrepreneurs',
  'youtubers',
  'developers',
]);

export function isDeprecatedPersonaNavSlug(slug: string): boolean {
  return DEPRECATED_PERSONA_NAV_SLUGS.has(slug);
}
