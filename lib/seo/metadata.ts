import { Metadata } from 'next';
import { Tool, Category, Persona, Comparison, UseCase } from '../../types/tool';
import { getBaseUrl, absoluteUrl } from './base-url';
import {
  isToolIndexable,
  isCategoryIndexable,
  isPersonaIndexable,
  isComparisonIndexable,
  isUseCasePageIndexable,
} from './indexability';
import {
  SITE_NAME,
  SITE_OG_NAME,
  SITE_OG_BADGE_DEFAULT,
  sitePageTitle,
} from '../brand';

const BASE_URL = getBaseUrl();

/**
 * Strips tracking and analytics parameters from URLs to prevent duplicate content issues
 * while preserving functional query parameters.
 */
function stripUrlParameters(url: string): string {
  try {
    const urlObj = new URL(url);
    // Remove tracking parameters that don't affect page content
    const trackingParams = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'fbclid', 'gclid', 'msclkid'];
    trackingParams.forEach(param => {
      urlObj.searchParams.delete(param);
    });
    return urlObj.toString();
  } catch {
    // If URL parsing fails, return original
    return url;
  }
}

export interface SEOConfig {
  title: string;
  description: string;
  canonicalUrl?: string;
  ogImage?: string;
  noIndex?: boolean;
}

export function constructMetadata({
  title,
  description,
  canonicalUrl,
  ogImage,
  noIndex = false,
}: SEOConfig): Metadata {
  const fullCanonical = canonicalUrl
    ? stripUrlParameters(absoluteUrl(canonicalUrl))
    : stripUrlParameters(BASE_URL);

  const finalOgImage =
    ogImage ||
    `${BASE_URL}/api/og?title=${encodeURIComponent(title)}&description=${encodeURIComponent(description)}&badge=${encodeURIComponent(SITE_OG_BADGE_DEFAULT)}&type=default`;

  return {
    title,
    description,
    metadataBase: new URL(BASE_URL),
    alternates: {
      canonical: fullCanonical,
    },
    openGraph: {
      title,
      description,
      url: fullCanonical,
      siteName: SITE_OG_NAME,
      images: [
        {
          url: finalOgImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [finalOgImage],
    },
    robots: noIndex
      ? { index: false, follow: true }
      : { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  };
}

export function generateNotFoundMetadata(title = 'Page Not Found'): Metadata {
  return {
    title,
    robots: { index: false, follow: false },
  };
}

export function generatePageMetadata(config: SEOConfig): Metadata {
  return constructMetadata(config);
}

export function generateToolMetadata(tool: Tool): Metadata {
  const indexResult = isToolIndexable(tool);
  const hasUserReviews = tool.reviewCount > 0;
  const ogTitle = hasUserReviews
    ? `${tool.name} Review, Pricing & Features (2026)`
    : `${tool.name} Pricing, Features & Alternatives (2026)`;
  const ogDescription = tool.tagline;
  const ogImage = `${BASE_URL}/api/og?title=${encodeURIComponent(ogTitle)}&description=${encodeURIComponent(ogDescription)}&badge=${encodeURIComponent('AI TOOL PROFILE')}&type=tool`;

  const description = tool.tagline
    ? hasUserReviews
      ? `${tool.tagline} Read verified user reviews, pricing options, API availability, and top alternatives for ${tool.name}.`
      : `${tool.tagline} Editorial listing with pricing, features, API availability, and top alternatives for ${tool.name}.`
    : hasUserReviews
      ? `Read verified user reviews, pricing options, API availability, and top alternatives for ${tool.name}.`
      : `Editorial listing with pricing, features, API availability, and top alternatives for ${tool.name}.`;

  return constructMetadata({
    title: sitePageTitle(ogTitle),
    description,
    canonicalUrl: `/tools/${tool.slug}`,
    ogImage,
    noIndex: !indexResult.indexable,
  });
}

export function generateCategoryMetadata(category: Category): Metadata {
  const indexResult = isCategoryIndexable(category);
  const title = category.seoTitle?.trim()
    ? category.seoTitle
    : `Best ${category.name} AI Tools (2026)`;
  const description = category.seoDescription?.trim()
    ? category.seoDescription
    : category.description;
  const ogImage = `${BASE_URL}/api/og?title=${encodeURIComponent(title)}&description=${encodeURIComponent(description)}&badge=${encodeURIComponent('SOFTWARE DIRECTORY')}&type=category`;

  return constructMetadata({
    title: sitePageTitle(title),
    description,
    canonicalUrl: `/category/${category.slug}`,
    ogImage,
    noIndex: !indexResult.indexable,
  });
}

// Persona-specific title templates for better search intent targeting
const PERSONA_TITLE_TEMPLATES: Record<string, string> = {
  writers: 'Best AI Writing Tools for Authors & Content Creators (2026)',
  students: 'AI Study Tools for Students: Homework, Research & Writing (2026)',
  marketers: 'AI Marketing Tools: Content, SEO, Social & Email (2026)',
  teachers: 'AI Tools for Teachers: Lesson Planning, Grading & Classroom (2026)',
  'small-business': 'AI Tools for Small Business: Marketing, CRM & Operations (2026)',
  researchers: 'AI Research Tools: Literature Discovery & Academic Writing (2026)',
  'real-estate-agents': 'AI Tools for Real Estate: Listings, Marketing & Client Management (2026)',
  'project-managers': 'AI Tools for Project Managers: Workflow Guide & Recommendations (2026)',
};

// Persona-specific meta descriptions with unique value propositions
const PERSONA_META_DESCRIPTIONS: Record<string, (persona: Persona, toolCount: number) => string> = {
  writers: (persona, toolCount) => 
    `Discover verified AI writing tools for authors, bloggers, and content creators. Draft, edit, research, and organize manuscripts with AI assistants designed for professional writing workflows.`,
  students: (persona, toolCount) => 
    `Compare verified AI study tools for homework help, flashcards, academic research, and lecture notes. ${toolCount > 0 ? `${toolCount}+ tools` : 'Tools'} for K-12, college, and graduate students with citation-backed academic features.`,
  marketers: (persona, toolCount) => 
    `Find verified AI marketing tools for content creation, SEO research, social media, email campaigns, and analytics. Streamline marketing workflows with AI-powered platforms for growth teams.`,
  teachers: (persona, toolCount) => 
    `Explore AI tools for K-12 and university educators — lesson planning, worksheet generation, quiz creation, grading feedback, and classroom support. Verified tools for teaching workflows.`,
  'small-business': (persona, toolCount) => 
    `Discover AI tools for small business operations: marketing content, CRM, customer support, business research, and team productivity. Streamline daily workflows with verified AI platforms.`,
  researchers: (persona, toolCount) => 
    `Compare AI research tools for literature discovery, paper reading, evidence synthesis, and academic writing. ${toolCount > 0 ? `${toolCount}+ verified tools` : 'Verified tools'} for academic and professional researchers.`,
  'real-estate-agents': (persona, toolCount) => 
    `Find AI tools for real estate agents: listing descriptions, property visuals, client presentations, market research, and meeting notes. Verified tools for real estate workflows.`,
  'project-managers': (persona, toolCount) => 
    `Practical AI workflow guide for project managers: capture meeting notes, manage tasks and priorities, generate status reports. Role-specific recommendations with PM context for real workflows.`,
};

export function generatePersonaMetadata(
  persona: Persona,
  linkedToolCount = 0
): Metadata {
  const indexResult = isPersonaIndexable(persona, linkedToolCount);
  
  // Use persona-specific title template, fall back to generic
  const ogTitle = PERSONA_TITLE_TEMPLATES[persona.slug] || `Top AI Tools for ${persona.title} (2026)`;
  
  // Use persona-specific meta description, fall back to generic persona description
  const descriptionGenerator = PERSONA_META_DESCRIPTIONS[persona.slug];
  const ogDescription = descriptionGenerator 
    ? descriptionGenerator(persona, linkedToolCount)
    : persona.description;
  
  const ogImage = `${BASE_URL}/api/og?title=${encodeURIComponent(ogTitle)}&description=${encodeURIComponent(ogDescription)}&badge=${encodeURIComponent('WORKFLOW GUIDE')}&type=persona&persona=${persona.slug}`;

  return constructMetadata({
    title: sitePageTitle(ogTitle),
    description: ogDescription,
    canonicalUrl: `/for/${persona.slug}`,
    ogImage,
    noIndex: !indexResult.indexable,
  });
}

export function generateUseCaseMetadata(
  persona: Persona,
  useCase: UseCase,
  strongPlusCount: number,
  pageEnabled = true
): Metadata {
  const indexResult = isUseCasePageIndexable(strongPlusCount, pageEnabled);
  const ogTitle = useCase.seoTitle;
  const ogDescription = useCase.seoDescription;
  const ogImage = `${BASE_URL}/api/og?title=${encodeURIComponent(ogTitle)}&description=${encodeURIComponent(ogDescription)}&badge=${encodeURIComponent('AI USE CASE GUIDE')}&type=persona`;

  return constructMetadata({
    title: sitePageTitle(useCase.seoTitle),
    description: useCase.seoDescription,
    canonicalUrl: `/for/${persona.slug}/${useCase.slug}`,
    ogImage,
    noIndex: !indexResult.indexable,
  });
}

export function generateComparisonMetadata(comparison: Comparison): Metadata {
  const indexResult = isComparisonIndexable(comparison);
  const ogTitle = comparison.title;
  const ogDescription = comparison.verdict;
  const ogImage = `${BASE_URL}/api/og?title=${encodeURIComponent(ogTitle)}&description=${encodeURIComponent(ogDescription)}&badge=${encodeURIComponent('HEAD-TO-HEAD')}&type=comparison`;

  return constructMetadata({
    title: sitePageTitle(`${comparison.title}: Head-to-Head Comparison (2026)`),
    description: comparison.verdict,
    canonicalUrl: `/compare/${comparison.slug}`,
    ogImage,
    noIndex: !indexResult.indexable,
  });
}
