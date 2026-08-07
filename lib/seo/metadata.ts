import { Metadata } from 'next';
import { Tool, Category, Persona, Comparison } from '../../types/tool';

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://aifind.io';

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
  const fullCanonical = canonicalUrl ? (canonicalUrl.startsWith('http') ? canonicalUrl : `${BASE_URL}${canonicalUrl}`) : BASE_URL;

  // Set the default ogImage fallback using our branded /api/og dynamic generation endpoint
  const finalOgImage = ogImage || `${BASE_URL}/api/og?title=${encodeURIComponent(title)}&description=${encodeURIComponent(description)}&badge=${encodeURIComponent('AI DISCOVERY')}&type=default`;

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
      ? { index: false, follow: false }
      : { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  };
}

export function generatePageMetadata(config: SEOConfig): Metadata {
  return constructMetadata(config);
}

export function generateToolMetadata(tool: Tool): Metadata {
  const ogTitle = `${tool.name} Review, Pricing & Features (2026)`;
  const ogDescription = tool.tagline || `Read reviews, pricing options, and alternatives for ${tool.name}.`;
  const ogImage = `${BASE_URL}/api/og?title=${encodeURIComponent(ogTitle)}&description=${encodeURIComponent(ogDescription)}&badge=${encodeURIComponent('AI TOOL PROFILE')}&type=tool`;

  return constructMetadata({
    title: `${tool.name} Review, Pricing & Features (2026) | AIFind`,
    description: `${tool.tagline} Read verified user reviews, pricing options, API availability, and top alternatives for ${tool.name}.`,
    canonicalUrl: `/tools/${tool.slug}`,
    ogImage
  });
}

export function generateCategoryMetadata(category: Category): Metadata {
  const ogTitle = `Best ${category.name} AI Tools (2026)`;
  const ogDescription = category.description || `Compare top artificial intelligence software for ${category.name.toLowerCase()}.`;
  const ogImage = `${BASE_URL}/api/og?title=${encodeURIComponent(ogTitle)}&description=${encodeURIComponent(ogDescription)}&badge=${encodeURIComponent('AI CATEGORY HUB')}&type=category`;

  return constructMetadata({
    title: `Best ${category.name} AI Tools (2026) | AIFind`,
    description: `${category.description} Compare top artificial intelligence software for ${category.name.toLowerCase()}.`,
    canonicalUrl: `/category/${category.slug}`,
    ogImage
  });
}

export function generatePersonaMetadata(persona: Persona): Metadata {
  const ogTitle = `Top AI Tools for ${persona.title} (2026)`;
  const ogDescription = persona.description || `Browse custom artificial intelligence software matched for ${persona.title}.`;
  const ogImage = `${BASE_URL}/api/og?title=${encodeURIComponent(ogTitle)}&description=${encodeURIComponent(ogDescription)}&badge=${encodeURIComponent('AI WORKFLOW GUIDE')}&type=persona`;

  return constructMetadata({
    title: `Top AI Tools for ${persona.title} (2026) | AIFind`,
    description: persona.description,
    canonicalUrl: `/for/${persona.slug}`,
    ogImage
  });
}

export function generateComparisonMetadata(comparison: Comparison): Metadata {
  const ogTitle = `${comparison.title}`;
  const ogDescription = comparison.verdict || `Comprehensive feature and pricing matrix side-by-side.`;
  const ogImage = `${BASE_URL}/api/og?title=${encodeURIComponent(ogTitle)}&description=${encodeURIComponent(ogDescription)}&badge=${encodeURIComponent('HEAD-TO-HEAD')}&type=comparison`;

  return constructMetadata({
    title: `${comparison.title}: Head-to-Head Comparison (2026) | AIFind`,
    description: comparison.verdict,
    canonicalUrl: `/compare/${comparison.slug}`,
    ogImage
  });
}
