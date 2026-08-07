import { Metadata } from 'next';
import { Tool, Category, Persona, Comparison } from '../../types/tool';

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://aifind.io';
const DEFAULT_OG_IMAGE = '/og/default.svg';

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
  ogImage = DEFAULT_OG_IMAGE,
  noIndex = false,
}: SEOConfig): Metadata {
  const fullCanonical = canonicalUrl ? (canonicalUrl.startsWith('http') ? canonicalUrl : `${BASE_URL}${canonicalUrl}`) : BASE_URL;
  const fullOgImage = ogImage.startsWith('http') ? ogImage : `${BASE_URL}${ogImage}`;

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
      siteName: 'AIFind Discovery Platform',
      images: [
        {
          url: fullOgImage,
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
      images: [fullOgImage],
    },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  };
}

export function generatePageMetadata(config: SEOConfig): Metadata {
  return constructMetadata(config);
}

export function generateToolMetadata(tool: Tool): Metadata {
  const ogImage = tool.screenshots && tool.screenshots.length > 0
    ? tool.screenshots[0]
    : DEFAULT_OG_IMAGE;

  return constructMetadata({
    title: `${tool.name} Review, Pricing & Features (2026) | AIFind`,
    description: `${tool.tagline} Read verified user reviews, pricing options, API availability, and top alternatives for ${tool.name}.`,
    canonicalUrl: `/tools/${tool.slug}`,
    ogImage
  });
}

export function generateCategoryMetadata(category: Category): Metadata {
  return constructMetadata({
    title: `Best ${category.name} AI Tools (2026) | AIFind`,
    description: `${category.description} Compare top artificial intelligence software for ${category.name.toLowerCase()}.`,
    canonicalUrl: `/category/${category.slug}`
  });
}

export function generatePersonaMetadata(persona: Persona): Metadata {
  return constructMetadata({
    title: `Top AI Tools for ${persona.title} (2026) | AIFind`,
    description: persona.description,
    canonicalUrl: `/for/${persona.slug}`
  });
}

export function generateComparisonMetadata(comparison: Comparison): Metadata {
  return constructMetadata({
    title: `${comparison.title}: Head-to-Head Comparison (2026) | AIFind`,
    description: comparison.verdict,
    canonicalUrl: `/compare/${comparison.slug}`
  });
}
