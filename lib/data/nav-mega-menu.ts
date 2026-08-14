/** Nav mega-menu copy — short title + description pairs for header dropdowns. */

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

export const ROLE_MEGA_MENU_COLUMNS: NavMegaMenuColumn[] = [
  {
    label: 'Delivery & Ops',
    items: [
      {
        title: 'Project Managers',
        description: 'Meeting notes, tasks, plans, and stakeholder reports.',
        href: '/for/project-managers',
      },
      {
        title: 'Small Business Owners',
        description: 'Marketing, sales, support, research, and admin workflows.',
        href: '/for/small-business',
      },
      {
        title: 'Real Estate Agents',
        description: 'Listing copy, visuals, client decks, and market research.',
        href: '/for/real-estate-agents',
      },
    ],
  },
  {
    label: 'Create & Teach',
    items: [
      {
        title: 'Writers & Authors',
        description: 'Drafting, editing, research, and long-form manuscripts.',
        href: '/for/writers',
      },
      {
        title: 'Marketers & Growth Leads',
        description: 'Content, SEO, social, email, ads, and analytics.',
        href: '/for/marketers',
      },
      {
        title: 'Teachers & Educators',
        description: 'Lesson plans, quizzes, grading, and classroom support.',
        href: '/for/teachers',
      },
    ],
  },
  {
    label: 'Research & Study',
    items: [
      {
        title: 'Students',
        description: 'Study, homework, flashcards, research, and lecture notes.',
        href: '/for/students',
      },
      {
        title: 'Researchers',
        description: 'Literature discovery, synthesis, writing, and references.',
        href: '/for/researchers',
      },
    ],
  },
];

export const ALL_TOOLS_MEGA_MENU_COLUMNS: NavMegaMenuColumn[] = [
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
  {
    label: 'Categories',
    items: [
      {
        title: 'Project Management',
        description: 'Planning, tasks, meetings, and reporting tools.',
        href: '/category/project-management',
      },
      {
        title: 'Study & Education',
        description: 'Learning, research, notes, and study aids.',
        href: '/category/study-education',
      },
      {
        title: 'Writing & Copywriting',
        description: 'Drafting, editing, and marketing copy workflows.',
        href: '/category/writing',
      },
      {
        title: 'Coding & Development',
        description: 'IDE assistants, agents, and generative UI tools.',
        href: '/category/coding',
      },
      {
        title: 'Image & Design',
        description: 'Generative art and marketing design platforms.',
        href: '/category/image',
      },
    ],
  },
  {
    label: 'More Categories',
    items: [
      {
        title: 'Video & Motion',
        description: 'Editing, generation, and motion graphics tools.',
        href: '/category/video',
      },
      {
        title: 'Voice & Audio',
        description: 'Speech synthesis, dubbing, and music generation.',
        href: '/category/voice',
      },
      {
        title: 'SEO & Web Research',
        description: 'Cited research and search optimization tools.',
        href: '/category/seo',
      },
      {
        title: 'Productivity & Workspace',
        description: 'Notes, docs, and team workspace assistants.',
        href: '/category/productivity',
      },
      {
        title: 'Marketing & CRM',
        description: 'Campaigns, CRM, and growth automation software.',
        href: '/category/marketing',
      },
    ],
  },
];

export const ROLE_MEGA_MENU_FOOTER = {
  label: 'View All Roles',
  href: '/for',
};

export const ALL_TOOLS_MEGA_MENU_FOOTER = {
  label: 'Browse All Tools',
  href: '/ai-tools',
};
