import { Category } from '../../types/tool';

export const CAT_IMAGE = 'cat-image';

export const IMAGE_SECTIONS = [
  {
    slug: 'generative-art',
    title: 'Generative Art',
    description:
      'Text-to-image models for concept art, photorealistic scenes, and creative exploration. Midjourney and DALL-E 3 generate new pixels from prompts — they are not layout editors, brand-template systems, or social-post schedulers.',
    toolSlugs: ['midjourney', 'dall-e-3'],
  },
  {
    slug: 'design-marketing-visuals',
    title: 'Design & Marketing Visuals',
    description:
      'Template-driven design with AI-assisted copy and image tools for social posts, ads, and marketing assets. Canva combines layouts, brand kits, and Magic Write — it is not a standalone diffusion art studio like Midjourney.',
    toolSlugs: ['canva'],
  },
] as const;

export const IMAGE_CATEGORY: Category = {
  id: CAT_IMAGE,
  name: 'Image & Design',
  slug: 'image',
  iconName: 'Image',
  description:
    'Three curated tools split by intent — generative art (Midjourney, DALL-E 3) and marketing design (Canva) — with clear boundaries vs Writing, Marketing, and persona workflow hubs.',
  longDescription:
    'This category covers two different visual jobs: Midjourney and DALL-E 3 for prompt-driven image generation, and Canva for template-based marketing design with AI-assisted visuals and copy. It is not a catch-all for every creative tool — video generation lives under Video & Motion, copy platforms under Writing, and CRM/social scheduling under Marketing & CRM.',
  toolCount: 0,
  faqs: [
    {
      question: 'What is the difference between AI image generation and design tools?',
      answer:
        'Image generators like Midjourney and DALL-E 3 create new visuals from text prompts — useful for concept art, illustrations, and exploratory photorealistic scenes. Design platforms like Canva start from templates and layouts for social posts, ads, and branded marketing assets, with AI assisting copy and image edits inside an editor. Most teams use generators for net-new artwork and Canva when the deliverable is a formatted post, ad, or deck slide.',
    },
    {
      question: 'How do Midjourney and DALL-E 3 compare?',
      answer:
        'Both are text-to-image generators on this page. Midjourney (midjourney.com) runs through its web app and Discord with paid subscription tiers starting around $10/month per official billing — no free tier listed. DALL-E 3 is available through ChatGPT and OpenAI APIs; ChatGPT includes limited free image generations with higher limits on paid ChatGPT plans per openai.com pricing. Midjourney is often chosen for stylized and photorealistic exploration; DALL-E 3 fits teams already working inside ChatGPT who want conversational prompting and readable text in images.',
    },
    {
      question: 'When does Canva make more sense than an image generator?',
      answer:
        'Choose Canva when you need a finished marketing asset — a sized social post, ad creative, flyer, or presentation slide — with templates, brand kits, and Magic Write copy in one editor. Choose Midjourney or DALL-E 3 when the primary job is generating a standalone image from a creative prompt without a layout template. Canva also maps to marketer ad-creation and social workflows on /for/marketers.',
    },
    {
      question: 'Which of these tools offer free access?',
      answer:
        'Per our verified catalog data: Canva is freemium with a free tier and Pro features on paid plans (canva.com/pricing). DALL-E 3 offers limited free generations via ChatGPT with expanded access on paid ChatGPT plans (openai.com/pricing). Midjourney is paid-only with subscription tiers from official billing — no free trial listed. Always confirm current limits on each vendor site before planning production workflows.',
    },
    {
      question: 'Where should marketers and real-estate agents go for related visual workflows?',
      answer:
        'Marketers: Canva is mapped to ad-creation and social-media workflows on /for/marketers; HubSpot and Hootsuite for CRM and scheduling live on /category/marketing. Real-estate agents: property visuals and staging concepts are on /for/real-estate-agents#property-visuals-staging, with listing copy and client decks on the same persona hub. This category lists the core image tools — persona pages show how each role uses them.',
    },
  ],
  seoTitle: 'AI Image & Design Tools (2026)',
  seoDescription:
    'Curated Midjourney and DALL-E 3 for generative art, plus Canva for marketing design — with clear intent boundaries and persona workflow links.',
};
