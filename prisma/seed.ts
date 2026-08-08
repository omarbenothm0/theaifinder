import { PrismaClient } from '@prisma/client';
import {
  INITIAL_TOOLS,
  INITIAL_CATEGORIES,
  INITIAL_PERSONAS,
  INITIAL_COMPARISONS,
  INITIAL_ARTICLES,
} from '../lib/data';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting seed...');

  // 1. Categories first (Tools depend on them)
  const categorySlugToId = new Map<string, string>();
  for (const cat of INITIAL_CATEGORIES) {
    const created = await prisma.category.create({
      data: {
        name: cat.name,
        slug: cat.slug,
        iconName: cat.iconName,
        description: cat.description,
        longDescription: cat.longDescription,
        seoTitle: cat.seoTitle,
        seoDescription: cat.seoDescription,
        faqs: {
          create: cat.faqs.map((f) => ({
            question: f.question,
            answer: f.answer,
          })),
        },
      },
    });
    categorySlugToId.set(cat.slug, created.id);
  }
  console.log(`Seeded ${INITIAL_CATEGORIES.length} categories.`);

  // 2. Personas (independent of tools for now, topTools linked later)
  const personaSlugToId = new Map<string, string>();
  for (const persona of INITIAL_PERSONAS) {
    const created = await prisma.persona.create({
      data: {
        title: persona.title,
        slug: persona.slug,
        iconName: persona.iconName,
        subtitle: persona.subtitle,
        description: persona.description,
        targetRole: persona.targetRole,
        keyBenefits: persona.keyBenefits,
        faqs: {
          create: persona.faqs.map((f) => ({
            question: f.question,
            answer: f.answer,
          })),
        },
      },
    });
    personaSlugToId.set(persona.slug, created.id);
  }
  console.log(`Seeded ${INITIAL_PERSONAS.length} personas.`);

  // 3. Tools (need categoryId resolved from categorySlugToId)
  // We derive categorySlug from the tool's categoryId (e.g. 'cat-writing' -> slug 'writing')
  // by matching against INITIAL_CATEGORIES' id field, since tools reference category by id, not slug.
  const categoryIdToSlug = new Map<string, string>();
  for (const cat of INITIAL_CATEGORIES) {
    categoryIdToSlug.set(cat.id, cat.slug);
  }

  const toolSlugToId = new Map<string, string>();
  for (const tool of INITIAL_TOOLS) {
    const categorySlug = categoryIdToSlug.get(tool.categoryId);
    const realCategoryId = categorySlug ? categorySlugToId.get(categorySlug) : undefined;

    if (!realCategoryId) {
      console.warn(
        `Skipping tool "${tool.slug}" — could not resolve categoryId "${tool.categoryId}"`
      );
      continue;
    }

    const created = await prisma.tool.create({
      data: {
        name: tool.name,
        slug: tool.slug,
        logo: tool.logo,
        tagline: tool.tagline,
        description: tool.description,
        categoryId: realCategoryId,
        pricingModel: tool.pricingModel,
        monthlyPrice: tool.monthlyPrice ?? null,
        hasFreeTrial: tool.hasFreeTrial,
        companyName: tool.companyName ?? null,
        lastVerifiedDate: tool.lastVerifiedDate
          ? new Date(tool.lastVerifiedDate)
          : null,
        verifiedBy: tool.verifiedBy ?? null,
        pricingSource: tool.pricingSource ?? null,
        featureSource: tool.featureSource ?? null,
        reviewState: tool.reviewState ?? null,
        reviewRequestedAt: tool.reviewRequestedAt
          ? new Date(tool.reviewRequestedAt)
          : null,
        reviewAssignedTo: tool.reviewAssignedTo ?? null,
        reviewNotes: tool.reviewNotes ?? null,
        websiteUrl: tool.websiteUrl,
        rating: tool.rating,
        reviewCount: tool.reviewCount,
        verified: tool.verified,
        featured: tool.featured,
        trending: tool.trending,
        hasApi: tool.hasApi,
        hasMobileApp: tool.hasMobileApp,
        hasExtension: tool.hasExtension,
        tags: tool.tags,
        features: tool.features,
        pros: tool.pros,
        cons: tool.cons,
        screenshots: tool.screenshots,
        platforms: tool.platforms ?? [],
        targetUsers: tool.targetUsers,
        createdAt: tool.createdAt ? new Date(tool.createdAt) : new Date(),
        updatedAt: tool.updatedAt ? new Date(tool.updatedAt) : new Date(),
        pricingTiers: tool.pricingTiers
          ? {
              create: tool.pricingTiers.map((tier) => ({
                name: tier.name,
                price: tier.price,
                billingPeriod: tier.billingPeriod,
                features: tier.features,
              })),
            }
          : undefined,
        sources: tool.sources
          ? {
              create: tool.sources.map((s) => ({
                type: s.type,
                url: s.url,
                verifiedAt: new Date(s.verifiedAt),
                notes: s.notes ?? null,
              })),
            }
          : undefined,
      },
    });
    toolSlugToId.set(tool.slug, created.id);
  }
  console.log(`Seeded ${toolSlugToId.size} tools.`);

  // 4. Tool alternatives (self-referential, needs all tools created first)
  let altCount = 0;
  for (const tool of INITIAL_TOOLS) {
    const sourceId = toolSlugToId.get(tool.slug);
    if (!sourceId || !tool.alternatives) continue;

    for (const altSlug of tool.alternatives) {
      const targetId = toolSlugToId.get(altSlug);
      if (!targetId) {
        console.warn(
          `Skipping alternative "${altSlug}" for tool "${tool.slug}" — target tool not found`
        );
        continue;
      }
      await prisma.toolAlternative.create({
        data: { sourceToolId: sourceId, targetToolId: targetId },
      });
      altCount++;
    }
  }
  console.log(`Seeded ${altCount} tool alternatives.`);

  // 5. Persona topTools (ordered join table)
  let topToolCount = 0;
  for (const persona of INITIAL_PERSONAS) {
    const personaId = personaSlugToId.get(persona.slug);
    if (!personaId || !persona.topToolSlugs) continue;

    for (let i = 0; i < persona.topToolSlugs.length; i++) {
      const toolSlug = persona.topToolSlugs[i];
      const toolId = toolSlugToId.get(toolSlug);
      if (!toolId) {
        console.warn(
          `Skipping topTool "${toolSlug}" for persona "${persona.slug}" — tool not found`
        );
        continue;
      }
      await prisma.personaTopTool.create({
        data: { personaId, toolId, order: i },
      });
      topToolCount++;
    }
  }
  console.log(`Seeded ${topToolCount} persona-topTool links.`);

  // 6. Reviews (need toolSlug -> toolId)
  const seedReviews = [
    {
      toolSlug: 'chatgpt',
      authorName: 'Alex Rivers',
      authorRole: 'Product Manager',
      rating: 5,
      comment:
        'ChatGPT is an indispensable daily copilot. Standard GPT-4o analysis saves hours on market research.',
      date: '2026-07-28',
      verifiedUser: true,
    },
    {
      toolSlug: 'claude',
      authorName: 'Elena Rostova',
      authorRole: 'Lead Frontend Engineer',
      rating: 5,
      comment:
        'Artifacts UI and Claude Sonnet prose quality are miles ahead for React code generation.',
      date: '2026-08-02',
      verifiedUser: true,
    },
    {
      toolSlug: 'cursor',
      authorName: 'David Chen',
      authorRole: 'Senior TypeScript Developer',
      rating: 5,
      comment:
        'Composer multi-file edit mode completely changed how fast we refactor large components.',
      date: '2026-08-04',
      verifiedUser: true,
    },
  ];

  let reviewCount = 0;
  for (const rev of seedReviews) {
    const toolId = toolSlugToId.get(rev.toolSlug);
    if (!toolId) {
      console.warn(`Skipping review for "${rev.toolSlug}" — tool not found`);
      continue;
    }
    await prisma.review.create({
      data: {
        toolId,
        authorName: rev.authorName,
        authorRole: rev.authorRole,
        rating: rev.rating,
        comment: rev.comment,
        date: new Date(rev.date),
        verifiedUser: rev.verifiedUser,
      },
    });
    reviewCount++;
  }
  console.log(`Seeded ${reviewCount} reviews.`);

  // 7. Comparisons (static list only — dynamic ones are generated at request time, not seeded)
  let comparisonCount = 0;
  for (const comp of INITIAL_COMPARISONS) {
    const tool1Id = toolSlugToId.get(comp.tool1Slug);
    const tool2Id = toolSlugToId.get(comp.tool2Slug);
    if (!tool1Id || !tool2Id) {
      console.warn(`Skipping comparison "${comp.slug}" — one or both tools not found`);
      continue;
    }
    await prisma.comparison.create({
      data: {
        slug: comp.slug,
        tool1Id,
        tool2Id,
        title: comp.title,
        overview: comp.overview,
        bestFor1: comp.bestFor1,
        bestFor2: comp.bestFor2,
        verdict: comp.verdict,
        winnerSlug: comp.winnerSlug,
        features: {
          create: comp.featureBreakdown.map((f) => ({
            feature: f.feature,
            tool1Value: f.tool1Value,
            tool2Value: f.tool2Value,
            winnerSlug: f.winnerSlug,
          })),
        },
      },
    });
    comparisonCount++;
  }
  console.log(`Seeded ${comparisonCount} comparisons.`);

  // 8. Articles
  let articleCount = 0;
  for (const article of INITIAL_ARTICLES) {
    await prisma.article.create({
      data: {
        title: article.title,
        slug: article.slug,
        excerpt: article.excerpt,
        content: article.content,
        author: article.author,
        readTime: article.readTime,
        publishedAt: new Date(article.publishedAt),
        relatedCategorySlug: article.relatedCategorySlug ?? null,
        relatedToolSlugs: article.relatedToolSlugs ?? [],
      },
    });
    articleCount++;
  }
  console.log(`Seeded ${articleCount} articles.`);

  console.log('Seed complete.');
}

main()
  .catch((e) => {
    console.error('Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });