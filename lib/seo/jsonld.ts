import { Tool, Category, Persona, ToolWithUseCaseFit } from '../../types/tool';
import { getBaseUrl, absoluteUrl } from './base-url';
import { SITE_NAME } from '../brand';

const BASE_URL = getBaseUrl();

export function getWebsiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: BASE_URL,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${BASE_URL}/ai-tools?search={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

export function generateSoftwareApplicationSchema(tool: Tool) {
  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: tool.name,
    url: absoluteUrl(`/tools/${tool.slug}`),
    description: tool.tagline,
    applicationCategory: tool.categoryName,
  };

  if (tool.monthlyPrice != null && tool.monthlyPrice > 0) {
    schema.offers = {
      '@type': 'Offer',
      price: tool.monthlyPrice.toString(),
      priceCurrency: 'USD',
    };
  } else if (tool.pricingModel === 'Free') {
    schema.offers = {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    };
  }

  if (tool.reviewCount > 0 && tool.rating > 0) {
    schema.aggregateRating = {
      '@type': 'AggregateRating',
      ratingValue: tool.rating.toString(),
      reviewCount: tool.reviewCount.toString(),
      bestRating: '5',
      worstRating: '1',
    };
  }

  return schema;
}

export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function getFAQSchema(faqs: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

export function getCollectionPageSchema(category: Category) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: category.name,
    description: category.description,
    url: `${BASE_URL}/category/${category.slug}`,
  };
}

/**
 * Generates CollectionPage schema for persona hub pages with ItemList for recommended tools.
 * Only includes tools actually rendered on the page to avoid claiming non-existent content.
 */
export function generatePersonaCollectionPageSchema(persona: Persona, tools: Tool[] | ToolWithUseCaseFit[], personaSlug: string, useCaseSlug?: string, useCaseTitle?: string, useCaseDescription?: string) {
  // Handle both Tool and ToolWithUseCaseFit types
  const toolsToProcess = tools.map(t => 'useCaseFit' in t ? t : { tool: t, useCaseFit: null });
  // Only include top 10 tools to avoid bloating the schema
  const schemaTools = toolsToProcess.slice(0, 10);
  
  const collectionPage: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: useCaseTitle || persona.title,
    description: useCaseDescription || persona.description,
    url: useCaseSlug ? absoluteUrl(`/for/${personaSlug}/${useCaseSlug}`) : absoluteUrl(`/for/${personaSlug}`),
    about: {
      '@type': 'Thing',
      name: persona.targetRole || persona.title,
    },
  };

  // Only add ItemList if there are tools to list
  if (schemaTools.length > 0) {
    collectionPage.mainEntity = {
      '@type': 'ItemList',
      numberOfItems: schemaTools.length,
      itemListElement: schemaTools.map((item, index) => {
        const tool = 'tool' in item ? item.tool : item;
        return {
          '@type': 'SoftwareApplication',
          position: index + 1,
          name: tool.name,
          url: absoluteUrl(`/tools/${tool.slug}`),
          description: tool.tagline || tool.description,
          applicationCategory: tool.categoryName,
          // Only include offers if pricing information exists
          ...(tool.monthlyPrice !== null && tool.monthlyPrice !== undefined && {
            offers: {
              '@type': 'Offer',
              price: tool.monthlyPrice.toString(),
              priceCurrency: 'USD',
            },
          }),
          // Only include aggregateRating if it exists
          ...(tool.reviewCount > 0 && tool.rating > 0 && {
            aggregateRating: {
              '@type': 'AggregateRating',
              ratingValue: tool.rating.toString(),
              reviewCount: tool.reviewCount.toString(),
              bestRating: '5',
              worstRating: '1',
            },
          }),
        };
      }),
    };
  }

  return collectionPage;
}
