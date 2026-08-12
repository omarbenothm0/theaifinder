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
  STUDENT_USE_CASES,
  STUDENT_PERSONA_USE_CASES,
  STUDENT_TOOL_USE_CASES,
  STUDENT_VERIFIED_AT,
  MARKETER_USE_CASES,
  MARKETER_PERSONA_USE_CASES,
  MARKETER_TOOL_USE_CASES,
  MARKETER_VERIFIED_AT,
  MARKETER_PERSONA,
  TEACHER_USE_CASES,
  TEACHER_PERSONA_USE_CASES,
  TEACHER_TOOL_USE_CASES,
  TEACHER_VERIFIED_AT,
  TEACHER_PERSONA,
  SMALL_BUSINESS_USE_CASES,
  SMALL_BUSINESS_PERSONA_USE_CASES,
  SMALL_BUSINESS_TOOL_USE_CASES,
  SMALL_BUSINESS_VERIFIED_AT,
  SMALL_BUSINESS_PERSONA,
  RESEARCHER_USE_CASES,
  RESEARCHER_PERSONA_USE_CASES,
  RESEARCHER_TOOL_USE_CASES,
  RESEARCHER_VERIFIED_AT,
  RESEARCHER_PERSONA,
  REAL_ESTATE_USE_CASES,
  REAL_ESTATE_PERSONA_USE_CASES,
  REAL_ESTATE_TOOL_USE_CASES,
  REAL_ESTATE_VERIFIED_AT,
  REAL_ESTATE_PERSONA,
  WRITER_USE_CASES,
  WRITER_PERSONA_USE_CASES,
  WRITER_TOOL_USE_CASES,
  WRITER_VERIFIED_AT,
  WRITER_PERSONA,
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

  // Sync enriched category metadata when seed modules replace placeholders
  const ENRICHED_CATEGORY_SLUGS = new Set([
    'writing',
    'coding',
    'study-education',
    'project-management',
    'productivity',
    'marketing',
    'seo',
    'image',
    'voice',
    'video',
  ]);
  for (const cat of INITIAL_CATEGORIES) {
    if (!ENRICHED_CATEGORY_SLUGS.has(cat.slug)) continue;

    const existing = await prisma.category.findUnique({ where: { slug: cat.slug } });
    if (!existing) continue;

    await prisma.category.update({
      where: { slug: cat.slug },
      data: {
        name: cat.name,
        iconName: cat.iconName,
        description: cat.description,
        longDescription: cat.longDescription,
        seoTitle: cat.seoTitle,
        seoDescription: cat.seoDescription,
      },
    });

    await prisma.categoryFAQ.deleteMany({ where: { categoryId: existing.id } });
    if (cat.faqs.length > 0) {
      await prisma.categoryFAQ.createMany({
        data: cat.faqs.map((f) => ({
          categoryId: existing.id,
          question: f.question,
          answer: f.answer,
        })),
      });
    }
  }

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

  // Sync taxonomy category assignments when seed modules move tools between categories
  const TAXONOMY_CATEGORY_SYNC_SLUGS = new Set([
    'hubspot',
    'hootsuite',
    'todoist-assist',
    'notion-ai',
  ]);
  for (const tool of INITIAL_TOOLS) {
    if (!TAXONOMY_CATEGORY_SYNC_SLUGS.has(tool.slug)) continue;

    const existingTool = await prisma.tool.findUnique({ where: { slug: tool.slug } });
    if (!existingTool) continue;

    const categorySlug = categoryIdToSlug.get(tool.categoryId);
    const realCategoryId = categorySlug ? categorySlugToId.get(categorySlug) : undefined;
    if (!realCategoryId) continue;

    await prisma.tool.update({
      where: { slug: tool.slug },
      data: { categoryId: realCategoryId },
    });
  }

  // Sync refreshed tool records when seed modules replace stale data
  const SYNC_TOOL_SLUGS = new Set(['cursor', 'claude-code']);
  for (const tool of INITIAL_TOOLS) {
    if (!SYNC_TOOL_SLUGS.has(tool.slug)) continue;

    const existingTool = await prisma.tool.findUnique({ where: { slug: tool.slug } });
    if (!existingTool) continue;

    const categorySlug = categoryIdToSlug.get(tool.categoryId);
    const realCategoryId = categorySlug ? categorySlugToId.get(categorySlug) : undefined;
    if (!realCategoryId) continue;

    await prisma.tool.update({
      where: { slug: tool.slug },
      data: {
        name: tool.name,
        logo: tool.logo,
        tagline: tool.tagline,
        description: tool.description,
        categoryId: realCategoryId,
        pricingModel: tool.pricingModel,
        monthlyPrice: tool.monthlyPrice ?? null,
        hasFreeTrial: tool.hasFreeTrial,
        companyName: tool.companyName ?? null,
        lastVerifiedDate: tool.lastVerifiedDate ? new Date(tool.lastVerifiedDate) : null,
        verifiedBy: tool.verifiedBy ?? null,
        pricingSource: tool.pricingSource ?? null,
        featureSource: tool.featureSource ?? null,
        reviewState: tool.reviewState ?? null,
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
        updatedAt: tool.updatedAt ? new Date(tool.updatedAt) : new Date(),
      },
    });

    await prisma.pricingTier.deleteMany({ where: { toolId: existingTool.id } });
    if (tool.pricingTiers?.length) {
      await prisma.pricingTier.createMany({
        data: tool.pricingTiers.map((tier) => ({
          toolId: existingTool.id,
          name: tier.name,
          price: tier.price,
          billingPeriod: tier.billingPeriod,
          features: tier.features,
        })),
      });
    }

    await prisma.toolSource.deleteMany({ where: { toolId: existingTool.id } });
    if (tool.sources?.length) {
      await prisma.toolSource.createMany({
        data: tool.sources.map((s) => ({
          toolId: existingTool.id,
          type: s.type,
          url: s.url,
          verifiedAt: new Date(s.verifiedAt),
          notes: s.notes ?? null,
        })),
      });
    }

    toolSlugToId.set(tool.slug, existingTool.id);
  }

  // Sync legacy inflated review metadata (and corrected pros) from seed modules
  const LEGACY_REVIEW_METADATA_SYNC_SLUGS = new Set([
    'chatgpt',
    'claude',
    'elevenlabs',
    'midjourney',
    'notion-ai',
    'perplexity',
    'dall-e-3',
    'descript',
    'v0',
    'jasper',
    'runway',
    'suno-ai',
    'gamma',
  ]);
  const TOOL_PROS_SYNC_SLUGS = new Set([
    'chatgpt',
    'elevenlabs',
    'midjourney',
    'dall-e-3',
    'descript',
    'runway',
  ]);
  let reviewMetadataSyncCount = 0;
  for (const tool of INITIAL_TOOLS) {
    if (!LEGACY_REVIEW_METADATA_SYNC_SLUGS.has(tool.slug)) continue;

    const existingTool = await prisma.tool.findUnique({ where: { slug: tool.slug } });
    if (!existingTool) continue;

    await prisma.tool.update({
      where: { slug: tool.slug },
      data: {
        rating: tool.rating ?? 0,
        reviewCount: tool.reviewCount ?? 0,
        ...(TOOL_PROS_SYNC_SLUGS.has(tool.slug) ? { pros: tool.pros } : {}),
      },
    });
    reviewMetadataSyncCount++;
  }
  if (reviewMetadataSyncCount > 0) {
    console.log(`Synced review metadata for ${reviewMetadataSyncCount} legacy tools.`);
  }

  // Sync ChatGPT model/tier copy (blocker fix: description, features, tags, tagline)
  const chatgptSeed = INITIAL_TOOLS.find((tool) => tool.slug === 'chatgpt');
  if (chatgptSeed) {
    const existingChatgpt = await prisma.tool.findUnique({ where: { slug: 'chatgpt' } });
    if (existingChatgpt) {
      await prisma.tool.update({
        where: { slug: 'chatgpt' },
        data: {
          tagline: chatgptSeed.tagline,
          description: chatgptSeed.description,
          features: chatgptSeed.features,
          tags: chatgptSeed.tags,
        },
      });
      console.log('Synced ChatGPT model/tier copy (tagline, description, features, tags).');
    }
  }

  const midjourneySeed = INITIAL_TOOLS.find((tool) => tool.slug === 'midjourney');
  if (midjourneySeed) {
    const existingMidjourney = await prisma.tool.findUnique({ where: { slug: 'midjourney' } });
    if (existingMidjourney) {
      await prisma.tool.update({
        where: { slug: 'midjourney' },
        data: { tagline: midjourneySeed.tagline },
      });
      console.log('Synced Midjourney tagline.');
    }
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

  // 6. Reviews (need toolSlug -> toolId) — created as pending; moderate before public display
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
  const SYNC_COMPARISON_SLUGS = new Set(['claude-code-vs-cursor']);
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
      if (SYNC_COMPARISON_SLUGS.has(comp.slug)) {
        await prisma.comparison.update({
          where: { slug: comp.slug },
          data: {
            tool1Id,
            tool2Id,
            title: comp.title,
            overview: comp.overview,
            bestFor1: comp.bestFor1,
            bestFor2: comp.bestFor2,
            verdict: comp.verdict,
            winnerSlug: comp.winnerSlug,
          },
        });
        await prisma.comparisonFeature.deleteMany({
          where: { comparisonId: existingComparison.id },
        });
        await prisma.comparisonFeature.createMany({
          data: comp.featureBreakdown.map((f) => ({
            comparisonId: existingComparison.id,
            feature: f.feature,
            tool1Value: f.tool1Value,
            tool2Value: f.tool2Value,
            winnerSlug: f.winnerSlug,
          })),
        });
      }
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

  // Sync softened verdict/copy for noindex seed comparisons (verdict + feature rows only)
  const NOINDEX_COMPARISON_COPY_SYNC_SLUGS = new Set([
    'chatgpt-vs-claude',
    'midjourney-vs-dall-e-3',
    'cursor-vs-chatgpt',
  ]);
  let comparisonCopySyncCount = 0;
  for (const comp of INITIAL_COMPARISONS) {
    if (!NOINDEX_COMPARISON_COPY_SYNC_SLUGS.has(comp.slug)) continue;

    const existingComparison = await prisma.comparison.findUnique({ where: { slug: comp.slug } });
    if (!existingComparison) continue;

    await prisma.comparison.update({
      where: { slug: comp.slug },
      data: { verdict: comp.verdict },
    });

    await prisma.comparisonFeature.deleteMany({
      where: { comparisonId: existingComparison.id },
    });
    if (comp.featureBreakdown.length > 0) {
      await prisma.comparisonFeature.createMany({
        data: comp.featureBreakdown.map((f) => ({
          comparisonId: existingComparison.id,
          feature: f.feature,
          tool1Value: f.tool1Value,
          tool2Value: f.tool2Value,
          winnerSlug: f.winnerSlug,
        })),
      });
    }
    comparisonCopySyncCount++;
  }
  if (comparisonCopySyncCount > 0) {
    console.log(`Synced noindex comparison copy for ${comparisonCopySyncCount} comparisons.`);
  }

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

  // 9. Use cases (PM + Students clusters)
  const useCaseSlugToId = new Map<string, string>();
  const allUseCases = [...PM_USE_CASES, ...STUDENT_USE_CASES, ...MARKETER_USE_CASES, ...TEACHER_USE_CASES, ...SMALL_BUSINESS_USE_CASES, ...RESEARCHER_USE_CASES, ...REAL_ESTATE_USE_CASES, ...WRITER_USE_CASES];
  for (const uc of allUseCases) {
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
  const personaUseCaseClusters: Array<{
    personaSlug: string;
    links: typeof PM_PERSONA_USE_CASES;
  }> = [
    { personaSlug: 'project-managers', links: PM_PERSONA_USE_CASES },
    { personaSlug: 'students', links: STUDENT_PERSONA_USE_CASES },
    { personaSlug: 'marketers', links: MARKETER_PERSONA_USE_CASES },
    { personaSlug: 'teachers', links: TEACHER_PERSONA_USE_CASES },
    { personaSlug: 'small-business', links: SMALL_BUSINESS_PERSONA_USE_CASES },
    { personaSlug: 'researchers', links: RESEARCHER_PERSONA_USE_CASES },
    { personaSlug: 'real-estate-agents', links: REAL_ESTATE_PERSONA_USE_CASES },
    { personaSlug: 'writers', links: WRITER_PERSONA_USE_CASES },
  ];

  let personaUseCaseCount = 0;
  for (const cluster of personaUseCaseClusters) {
    const personaId = personaSlugToId.get(cluster.personaSlug);
    if (!personaId) continue;

    for (const link of cluster.links) {
      const useCaseId = useCaseSlugToId.get(link.useCaseSlug);
      if (!useCaseId) continue;

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
  }
  console.log(`Seeded ${personaUseCaseCount} persona-use-case links.`);

  // Sync verified cluster persona records (replace seed placeholders where applicable)
  for (const clusterPersona of [MARKETER_PERSONA, TEACHER_PERSONA, SMALL_BUSINESS_PERSONA, RESEARCHER_PERSONA, REAL_ESTATE_PERSONA, WRITER_PERSONA]) {
    const personaId = personaSlugToId.get(clusterPersona.slug);
    if (!personaId) continue;
    await prisma.persona.update({
      where: { id: personaId },
      data: {
        title: clusterPersona.title,
        subtitle: clusterPersona.subtitle,
        description: clusterPersona.description,
        targetRole: clusterPersona.targetRole,
        iconName: clusterPersona.iconName,
        keyBenefits: clusterPersona.keyBenefits,
      },
    });
    await prisma.personaFAQ.deleteMany({ where: { personaId } });
    if (clusterPersona.faqs.length > 0) {
      await prisma.personaFAQ.createMany({
        data: clusterPersona.faqs.map((faq) => ({
          personaId,
          question: faq.question,
          answer: faq.answer,
        })),
      });
    }
  }

  // Persona top tools (upsert even if persona already existed)
  for (const persona of INITIAL_PERSONAS) {
    if (!persona.topToolSlugs?.length) continue;
    const personaId = personaSlugToId.get(persona.slug);
    if (!personaId) continue;

    for (let i = 0; i < persona.topToolSlugs.length; i++) {
      const toolSlug = persona.topToolSlugs[i];
      const toolId = toolSlugToId.get(toolSlug);
      if (!toolId) continue;
      await prisma.personaTopTool.upsert({
        where: { personaId_toolId: { personaId, toolId } },
        create: { personaId, toolId, order: i },
        update: { order: i },
      });
    }
  }

  // 11. Tool ↔ use-case mappings
  const allToolUseCases = [
    ...PM_TOOL_USE_CASES.map((m) => ({ ...m, verifiedAt: PM_VERIFIED_AT })),
    ...STUDENT_TOOL_USE_CASES.map((m) => ({ ...m, verifiedAt: STUDENT_VERIFIED_AT })),
    ...MARKETER_TOOL_USE_CASES.map((m) => ({ ...m, verifiedAt: MARKETER_VERIFIED_AT })),
    ...TEACHER_TOOL_USE_CASES.map((m) => ({ ...m, verifiedAt: TEACHER_VERIFIED_AT })),
    ...SMALL_BUSINESS_TOOL_USE_CASES.map((m) => ({ ...m, verifiedAt: SMALL_BUSINESS_VERIFIED_AT })),
    ...RESEARCHER_TOOL_USE_CASES.map((m) => ({ ...m, verifiedAt: RESEARCHER_VERIFIED_AT })),
    ...REAL_ESTATE_TOOL_USE_CASES.map((m) => ({ ...m, verifiedAt: REAL_ESTATE_VERIFIED_AT })),
    ...WRITER_TOOL_USE_CASES.map((m) => ({ ...m, verifiedAt: WRITER_VERIFIED_AT })),
  ];

  let toolUseCaseCount = 0;
  for (const mapping of allToolUseCases) {
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
        verifiedAt: new Date(mapping.verifiedAt),
        displayOrder: mapping.displayOrder,
        section,
      },
      update: {
        fitTier: mapping.fitTier,
        capabilities: mapping.capabilities,
        limitation: mapping.limitation ?? null,
        evidenceUrl: mapping.evidenceUrl,
        verifiedAt: new Date(mapping.verifiedAt),
        displayOrder: mapping.displayOrder,
      },
    });
    toolUseCaseCount++;
  }
  console.log(`Seeded ${toolUseCaseCount} tool-use-case mappings.`);

  // 12. Ensure cross-persona targetUsers on shared tools
  const targetUserPatches: Record<string, string[]> = {
    gamma: ['students'],
    'notion-ai': [],
    'otter-ai': ['students'],
  };
  for (const [slug, extraUsers] of Object.entries(targetUserPatches)) {
    const tool = await prisma.tool.findUnique({ where: { slug } });
    if (!tool) continue;
    const merged = [...new Set([...tool.targetUsers, ...extraUsers])];
    if (merged.length !== tool.targetUsers.length) {
      await prisma.tool.update({
        where: { slug },
        data: { targetUsers: merged },
      });
    }
  }

  // Also ensure project-managers on gamma/notion if missing (existing PM seed behavior)
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