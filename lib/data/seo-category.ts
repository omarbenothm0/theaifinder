import { Category } from '../../types/tool';

export const CAT_SEO = 'cat-seo';

export const SEO_SECTIONS = [
  {
    slug: 'ai-answer-web-research',
    title: 'AI Answer & Web Research',
    description:
      'Live web discovery with synthesized answers and inline citations — for background reading, competitor scans, and cited fact-finding. Perplexity AI is an answer engine, not a keyword-rank tracker or site audit suite.',
    toolSlugs: ['perplexity'],
  },
  {
    slug: 'seo-keyword-toolkits',
    title: 'SEO & Keyword Toolkits',
    description:
      'Keyword research, competitive analysis, site audits, and SEO content workflows for marketing teams. Semrush is a traditional SEO platform with AI-assisted writing modules — not a general-purpose cited answer engine.',
    toolSlugs: ['semrush'],
  },
] as const;

export const SEO_CATEGORY: Category = {
  id: CAT_SEO,
  name: 'SEO & Web Research',
  slug: 'seo',
  iconName: 'Search',
  description:
    'Two curated paths in our catalog — cited AI web research (Perplexity) and SEO keyword toolkits (Semrush) — with clear intent boundaries vs academic and marketing categories.',
  longDescription:
    'This category separates two different jobs: Perplexity AI for live web discovery with footnote citations, and Semrush for keyword research, competitive SEO analysis, and site workflows. It is not a catch-all for every research tool on the site — academic paper search (Consensus, Elicit, Scite.ai) lives on Study & Education, and marketing CRM/social platforms live on Marketing & CRM.',
  toolCount: 0,
  faqs: [
    {
      question: 'What is the difference between Perplexity and Semrush?',
      answer:
        'Perplexity AI searches the live web, synthesizes an answer, and attaches inline source links — useful when you need quick, cited background on a topic. Semrush is an SEO platform for keyword research, site audits, competitive analysis, and content optimization workflows. Most teams use Perplexity for open-ended web discovery and Semrush when the job is rankings, keywords, or technical SEO.',
    },
    {
      question: 'Is Perplexity an SEO tool?',
      answer:
        'Not in the traditional sense. Perplexity is primarily an AI answer engine with Pro Search and cited web results per perplexity.ai — it does not replace a dedicated SEO suite for rank tracking, backlink audits, or keyword gap analysis. It belongs on this page for the web-research half of the SEO & research intent, alongside Semrush for toolkit workflows.',
    },
    {
      question: 'Where should I look for academic research tools?',
      answer:
        'Peer-reviewed literature tools — Consensus, Elicit, and Scite.ai — are cataloged under Study & Education (/category/study-education) and mapped on the Researchers hub (/for/researchers). Perplexity on this page covers live general web research with citations, not academic paper databases.',
    },
    {
      question: 'What tools are useful for marketers doing SEO research?',
      answer:
        'Semrush is the primary SEO toolkit listing here and is mapped to the seo-search workflow on /for/marketers#seo-search. Perplexity supports cited competitor and market scans. HubSpot and Hootsuite for CRM and social scheduling live on Marketing & CRM (/category/marketing). Copy platforms Jasper and Copy.ai are under Writing.',
    },
    {
      question: 'Which tool should I use for web research vs keyword/SEO research?',
      answer:
        'Choose Perplexity when you want a cited answer from live web sources — market background, quick fact checks, or synthesis across pages. Choose Semrush when you need keyword volumes, site audits, competitive domain data, or SEO content workflows from semrush.com. If your question is about published academic papers, start at Study & Education instead.',
    },
  ],
  seoTitle: 'AI SEO & Web Research Tools (2026)',
  seoDescription:
    'Curated Perplexity (cited web research) and Semrush (SEO keyword toolkits) — with clear intent boundaries vs Study & Education and Marketing categories.',
};
