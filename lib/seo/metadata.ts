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
    ? absoluteUrl(canonicalUrl)
    : BASE_URL;

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
  const ogTitle = `${tool.name} Review, Pricing & Features (2026)`;
  const ogDescription = tool.tagline;
  const ogImage = `${BASE_URL}/api/og?title=${encodeURIComponent(ogTitle)}&description=${encodeURIComponent(ogDescription)}&badge=${encodeURIComponent('AI TOOL PROFILE')}&type=tool`;

  return constructMetadata({
    title: sitePageTitle(`${tool.name} Review, Pricing & Features (2026)`),
    description: tool.tagline
      ? `${tool.tagline} Read verified user reviews, pricing options, API availability, and top alternatives for ${tool.name}.`
      : `Read verified user reviews, pricing options, API availability, and top alternatives for ${tool.name}.`,
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
  const ogImage = `${BASE_URL}/api/og?title=${encodeURIComponent(title)}&description=${encodeURIComponent(description)}&badge=${encodeURIComponent('AI CATEGORY HUB')}&type=category`;

  return constructMetadata({
    title: sitePageTitle(title),
    description,
    canonicalUrl: `/category/${category.slug}`,
    ogImage,
    noIndex: !indexResult.indexable,
  });
}

export function generatePersonaMetadata(
  persona: Persona,
  linkedToolCount = 0
): Metadata {
  const indexResult = isPersonaIndexable(persona, linkedToolCount);
  const ogTitle = `Top AI Tools for ${persona.title} (2026)`;
  const ogDescription = persona.description;
  const ogImage = `${BASE_URL}/api/og?title=${encodeURIComponent(ogTitle)}&description=${encodeURIComponent(ogDescription)}&badge=${encodeURIComponent('AI WORKFLOW GUIDE')}&type=persona`;

  return constructMetadata({
    title: sitePageTitle(`Top AI Tools for ${persona.title} (2026)`),
    description: persona.description,
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
