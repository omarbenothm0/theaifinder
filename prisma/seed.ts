import { PrismaClient } from '@prisma/client';
import {
  INITIAL_TOOLS,
  INITIAL_CATEGORIES,
  INITIAL_PERSONAS,
  INITIAL_COMPARISONS,
  INITIAL_ARTICLES,
  PM_USE_CASES,
  PM_PERSONA_USE_CASES,
  PM_TOOL_USE_CASES,
  PM_VERIFIED_AT,
} from '../lib/data';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting seed...');

  // 1. Categories first (Tools depend on them)
  const categorySlugToId = new Map<string, string>();
  for (const cat of INITIAL_CATEGORIES) {
    const existing = await prisma.category.findUnique({ where: { slug: cat.slug } });
    if (existing) {
      categorySlugToId.set(cat.slug, existing.id);
      continue;
    }

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
    const existing = await prisma.persona.findUnique({ where: { slug: persona.slug } });
    if (existing) {
      personaSlugToId.set(persona.slug, existing.id);
      continue;
    }

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

    const existingTool = await prisma.tool.findUnique({ where: { slug: tool.slug } });
    if (existingTool) {
      toolSlugToId.set(tool.slug, existingTool.id);
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
      await prisma.toolAlternative.upsert({
        where: {
          sourceToolId_targetToolId: { sourceToolId: sourceId, targetToolId: targetId },
        },
        create: { sourceToolId: sourceId, targetToolId: targetId },
        update: {},
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
      await prisma.personaTopTool.upsert({
        where: { personaId_toolId: { personaId, toolId } },
        create: { personaId, toolId, order: i },
        update: { order: i },
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
    const existingComparison = await prisma.comparison.findUnique({ where: { slug: comp.slug } });
    if (existingComparison) {
      comparisonCount++;
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
    const existingArticle = await prisma.article.findUnique({ where: { slug: article.slug } });
    if (existingArticle) {
      articleCount++;
      continue;
    }
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

  // 9. Use cases (PM cluster)
  const useCaseSlugToId = new Map<string, string>();
  for (const uc of PM_USE_CASES) {
    const existing = await prisma.useCase.findUnique({ where: { slug: uc.slug } });
    if (existing) {
      useCaseSlugToId.set(uc.slug, existing.id);
      continue;
    }
    const created = await prisma.useCase.create({
      data: {
        title: uc.title,
        slug: uc.slug,
        description: uc.description,
        primaryKeyword: uc.primaryKeyword,
        seoTitle: uc.seoTitle,
        seoDescription: uc.seoDescription,
      },
    });
    useCaseSlugToId.set(uc.slug, created.id);
  }
  console.log(`Seeded ${useCaseSlugToId.size} use cases.`);

  // 10. Persona ↔ use-case links
  let personaUseCaseCount = 0;
  for (const link of PM_PERSONA_USE_CASES) {
    const personaId = personaSlugToId.get('project-managers');
    const useCaseId = useCaseSlugToId.get(link.useCaseSlug);
    if (!personaId || !useCaseId) continue;

    await prisma.personaUseCase.upsert({
      where: { personaId_useCaseId: { personaId, useCaseId } },
      create: {
        personaId,
        useCaseId,
        order: link.order,
        isPrimary: link.isPrimary,
        pageEnabled: link.pageEnabled,
        hubNote: link.hubNote ?? null,
      },
      update: {
        order: link.order,
        isPrimary: link.isPrimary,
        pageEnabled: link.pageEnabled,
        hubNote: link.hubNote ?? null,
      },
    });
    personaUseCaseCount++;
  }
  console.log(`Seeded ${personaUseCaseCount} persona-use-case links.`);

  // PM persona top tools (upsert even if persona already existed)
  const pmPersona = INITIAL_PERSONAS.find((p) => p.slug === 'project-managers');
  const pmPersonaId = personaSlugToId.get('project-managers');
  if (pmPersona && pmPersonaId && pmPersona.topToolSlugs) {
    for (let i = 0; i < pmPersona.topToolSlugs.length; i++) {
      const toolSlug = pmPersona.topToolSlugs[i];
      const toolId = toolSlugToId.get(toolSlug);
      if (!toolId) continue;
      await prisma.personaTopTool.upsert({
        where: { personaId_toolId: { personaId: pmPersonaId, toolId } },
        create: { personaId: pmPersonaId, toolId, order: i },
        update: { order: i },
      });
    }
  }

  // 11. Tool ↔ use-case mappings
  let toolUseCaseCount = 0;
  for (const mapping of PM_TOOL_USE_CASES) {
    const toolId = toolSlugToId.get(mapping.toolSlug);
    const useCaseId = useCaseSlugToId.get(mapping.useCaseSlug);
    if (!toolId || !useCaseId) {
      console.warn(
        `Skipping tool-use-case "${mapping.toolSlug}" → "${mapping.useCaseSlug}" — missing tool or use case`
      );
      continue;
    }

    const section = mapping.section ?? '';
    await prisma.toolUseCase.upsert({
      where: {
        toolId_useCaseId_section: { toolId, useCaseId, section },
      },
      create: {
        toolId,
        useCaseId,
        fitTier: mapping.fitTier,
        capabilities: mapping.capabilities,
        limitation: mapping.limitation ?? null,
        evidenceUrl: mapping.evidenceUrl,
        verifiedAt: new Date(PM_VERIFIED_AT),
        displayOrder: mapping.displayOrder,
        section,
      },
      update: {
        fitTier: mapping.fitTier,
        capabilities: mapping.capabilities,
        limitation: mapping.limitation ?? null,
        evidenceUrl: mapping.evidenceUrl,
        verifiedAt: new Date(PM_VERIFIED_AT),
        displayOrder: mapping.displayOrder,
      },
    });
    toolUseCaseCount++;
  }
  console.log(`Seeded ${toolUseCaseCount} tool-use-case mappings.`);

  // 12. Ensure gamma + notion-ai include project-managers in targetUsers
  for (const slug of ['gamma', 'notion-ai']) {
    const tool = await prisma.tool.findUnique({ where: { slug } });
    if (!tool) continue;
    if (!tool.targetUsers.includes('project-managers')) {
      await prisma.tool.update({
        where: { slug },
        data: { targetUsers: [...tool.targetUsers, 'project-managers'] },
      });
    }
  }

  // 13. Sync tool alternatives for tools with explicit alternatives (incl. PM rivals)
  for (const tool of INITIAL_TOOLS) {
    if (!tool.alternatives?.length) continue;
    const sourceId = toolSlugToId.get(tool.slug);
    if (!sourceId) continue;
    for (const altSlug of tool.alternatives) {
      const targetId = toolSlugToId.get(altSlug);
      if (!targetId) continue;
      await prisma.toolAlternative.upsert({
        where: {
          sourceToolId_targetToolId: { sourceToolId: sourceId, targetToolId: targetId },
        },
        create: { sourceToolId: sourceId, targetToolId: targetId },
        update: {},
      });
    }
  }

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