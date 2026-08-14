import type { Category } from '../../types/tool';

/** Canonical category labels for public navigation — slugs match DB `Category.slug`. */
export const PUBLIC_CATEGORY_NAV_LINKS = [
  {
    name: 'Project Management',
    slug: 'project-management',
    description: 'Planning, tasks, meetings, and reporting tools.',
  },
  {
    name: 'Study & Education',
    slug: 'study-education',
    description: 'Learning, research, notes, and study aids.',
  },
  {
    name: 'Writing & Copywriting',
    slug: 'writing',
    description: 'Drafting, editing, and marketing copy workflows.',
  },
  {
    name: 'Coding & Software Development',
    slug: 'coding',
    description: 'IDE assistants, agents, and generative UI tools.',
  },
  {
    name: 'Image & Design',
    slug: 'image',
    description: 'Generative art and marketing design platforms.',
  },
  {
    name: 'Video & Motion',
    slug: 'video',
    description: 'Editing, generation, and motion graphics tools.',
  },
  {
    name: 'Voice & Audio',
    slug: 'voice',
    description: 'Speech synthesis, dubbing, and music generation.',
  },
  {
    name: 'SEO & Web Research',
    slug: 'seo',
    description: 'Cited research and search optimization tools.',
  },
  {
    name: 'Productivity & Workspace',
    slug: 'productivity',
    description: 'Notes, docs, and team workspace assistants.',
  },
  {
    name: 'Marketing & CRM',
    slug: 'marketing',
    description: 'Campaigns, CRM, and growth automation software.',
  },
] as const;

const PUBLIC_CATEGORY_SLUG_ORDER = PUBLIC_CATEGORY_NAV_LINKS.map((link) => link.slug);

export function orderPublicCategories(categories: Category[]): Category[] {
  const bySlug = new Map(categories.map((category) => [category.slug, category]));
  return PUBLIC_CATEGORY_SLUG_ORDER.map((slug) => bySlug.get(slug)).filter(
    (category): category is Category => category != null
  );
}
