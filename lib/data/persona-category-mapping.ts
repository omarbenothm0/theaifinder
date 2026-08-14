/** Persona → category cross-link mapping for persona detail pages.
 * Preserves existing hardcoded relationships in a maintainable configuration.
 */

export interface PersonaCategoryMapping {
  personaSlug: string;
  categorySlug: string;
  secondaryCategorySlug?: string; // For personas with multiple relevant categories
}

export const PERSONA_CATEGORY_MAPPINGS: ReadonlyArray<PersonaCategoryMapping> = [
  {
    personaSlug: 'project-managers',
    categorySlug: 'project-management',
  },
  {
    personaSlug: 'students',
    categorySlug: 'study-education',
  },
  {
    personaSlug: 'marketers',
    categorySlug: 'marketing',
    secondaryCategorySlug: 'writing',
  },
  {
    personaSlug: 'teachers',
    categorySlug: 'study-education',
  },
  {
    personaSlug: 'small-business',
    categorySlug: 'productivity',
  },
  {
    personaSlug: 'researchers',
    categorySlug: 'study-education',
  },
  {
    personaSlug: 'real-estate-agents',
    categorySlug: 'image',
  },
  {
    personaSlug: 'writers',
    categorySlug: 'writing',
  },
] as const;

export function getPersonaCategoryMapping(personaSlug: string): PersonaCategoryMapping | undefined {
  return PERSONA_CATEGORY_MAPPINGS.find((m) => m.personaSlug === personaSlug);
}
