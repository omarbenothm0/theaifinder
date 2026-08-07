import { Metadata } from 'next';
import { Tool, Category, Persona, Comparison } from '../../types/tool';
import { SITE_URL } from '../site-config';

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
  ogImage = 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
  noIndex = false,
}: SEOConfig): Metadata {
  const fullCanonical = canonicalUrl ? (canonicalUrl.startsWith('http') ? canonicalUrl : `${SITE_URL}${canonicalUrl}`) : SITE_URL;

  return {
    title,
    description,
    metadataBase: new URL(SITE_URL),
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
          url: ogImage,
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
      images: [ogImage],
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
  return constructMetadata({
    title: `${tool.name} Review, Pricing & Features (2026) | AIFind`,
    description: `${tool.tagline} Read verified user reviews, pricing options, API availability, and top alternatives for ${tool.name}.`,
    canonicalUrl: `/tools/${tool.slug}`,
    ogImage: tool.logo
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
