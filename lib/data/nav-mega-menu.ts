/** Nav mega-menu copy — short title + description pairs for header dropdowns. */

import { PUBLIC_CATEGORY_NAV_LINKS } from './category-nav-links';
import { INITIAL_PERSONAS } from './index';
import {
  PUBLIC_PERSONA_NAV_GROUPS,
  isDeprecatedPersonaNavSlug,
} from '../seo/persona-visibility';

export type NavMegaMenuItem = {
  title: string;
  description: string;
  href: string;
  id?: string;
};

export type NavMegaMenuColumn = {
  label: string;
  items: NavMegaMenuItem[];
};

function buildRoleMegaMenuColumns(): NavMegaMenuColumn[] {
  const personaBySlug = new Map(INITIAL_PERSONAS.map((persona) => [persona.slug, persona]));

  return PUBLIC_PERSONA_NAV_GROUPS.map((group) => ({
    label: group.label,
    items: group.slugs
      .filter((slug) => !isDeprecatedPersonaNavSlug(slug))
      .map((slug) => {
        const persona = personaBySlug.get(slug);
        return {
          title: persona?.title ?? slug,
          description: persona?.subtitle ?? persona?.description ?? '',
          href: `/for/${slug}`,
        };
      }),
  }));
}

function buildAllToolsMegaMenuColumns(): NavMegaMenuColumn[] {
  const categoryItems: NavMegaMenuItem[] = PUBLIC_CATEGORY_NAV_LINKS.map((link) => ({
    title: link.name,
    description: link.description,
    href: `/category/${link.slug}`,
  }));
  const midpoint = Math.ceil(categoryItems.length / 2);

  return [
    {
      label: 'Browse',
      items: [
        {
          title: 'Browse All Tools',
          description: 'Search and filter the full curated directory.',
          href: '/ai-tools',
          id: 'nav-browse-all-tools-btn',
        },
        {
          title: 'Best AI Tools',
          description: 'Editorially highlighted picks across categories.',
          href: '/best-ai-tools',
          id: 'nav-best-tools-btn',
        },
        {
          title: 'Free Tools',
          description: 'Free-tier and freemium listings with trial access.',
          href: '/free-ai-tools',
          id: 'nav-free-tools-btn',
        },
        {
          title: 'AI Apps Directory',
          description: 'Mobile and desktop apps with AI capabilities.',
          href: '/ai-apps',
        },
      ],
    },
    { label: 'Categories', items: categoryItems.slice(0, midpoint) },
    { label: 'More Categories', items: categoryItems.slice(midpoint) },
  ];
}

export const ROLE_MEGA_MENU_COLUMNS = buildRoleMegaMenuColumns();
export const ALL_TOOLS_MEGA_MENU_COLUMNS = buildAllToolsMegaMenuColumns();

export const ROLE_MEGA_MENU_FOOTER = {
  label: 'View All Roles',
  href: '/for',
};

export const ALL_TOOLS_MEGA_MENU_FOOTER = {
  label: 'Browse All Tools',
  href: '/ai-tools',
};
