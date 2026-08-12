/** Seed personas removed from public nav/sitemap — records kept in DB for reversibility. */

import { Category, Persona } from '../../types/tool';

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

/** Personas safe for public-facing links (nav, grids, InternalLinks, filters). */
export function filterPublicPersonas<T extends { slug: string }>(personas: T[]): T[] {
  return personas.filter((p) => !isDeprecatedPersonaNavSlug(p.slug));
}

export type PublicAudienceLink = {
  key: string;
  href: string;
  label: string;
};

/** Map tool targetUsers to public hrefs without linking deprecated persona hubs. */
export function getPublicAudienceLinks(
  targetUsers: string[],
  personas: Persona[],
  categories: Category[],
  categorySlug?: string
): PublicAudienceLink[] {
  const links: PublicAudienceLink[] = [];
  const seenHrefs = new Set<string>();
  const isCodingTool = categorySlug === 'coding' || categorySlug === 'cat-coding';

  const addLink = (key: string, href: string, label: string) => {
    if (seenHrefs.has(href)) return;
    seenHrefs.add(href);
    links.push({ key, href, label });
  };

  for (const slug of targetUsers) {
    if (slug === 'developers' && isCodingTool) {
      const codingCategory = categories.find((c) => c.slug === 'coding');
      addLink(
        'category-coding',
        '/category/coding',
        codingCategory?.name ?? 'Coding & Software Development'
      );
      continue;
    }

    if (isDeprecatedPersonaNavSlug(slug)) {
      const redirectPath = PERSONA_REDIRECTS[slug];
      if (redirectPath) {
        const destSlug = redirectPath.replace(/^\/for\//, '');
        const persona = personas.find((p) => p.slug === destSlug);
        if (persona) {
          addLink(`redirect-${slug}`, redirectPath, persona.title);
        }
      }
      continue;
    }

    const persona = personas.find((p) => p.slug === slug);
    if (persona) {
      addLink(slug, `/for/${slug}`, persona.title);
    }
  }

  return links;
}
