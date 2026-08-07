import { PrismaClient } from '@prisma/client';
import {
  INITIAL_TOOLS,
  INITIAL_CATEGORIES,
  INITIAL_PERSONAS,
  INITIAL_COMPARISONS,
  INITIAL_ARTICLES
} from '../lib/data';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding AIFind Database...');

  // Seed Categories
  for (const cat of INITIAL_CATEGORIES) {
    await prisma.category.upsert({
      where: { slug: cat.slug },
      update: {
        name: cat.name,
        iconName: cat.iconName,
        description: cat.description,
        longDescription: cat.longDescription,
        seoTitle: cat.seoTitle,
        seoDescription: cat.seoDescription,
      },
      create: {
        id: cat.id,
        name: cat.name,
        slug: cat.slug,
        iconName: cat.iconName,
        description: cat.description,
        longDescription: cat.longDescription,
        seoTitle: cat.seoTitle,
        seoDescription: cat.seoDescription,
      },
    });
  }

  // Seed Personas
  for (const p of INITIAL_PERSONAS) {
    await prisma.persona.upsert({
      where: { slug: p.slug },
      update: {
        title: p.title,
        iconName: p.iconName,
        subtitle: p.subtitle,
        description: p.description,
        targetRole: p.targetRole,
        keyBenefits: p.keyBenefits,
        topToolSlugs: p.topToolSlugs,
      },
      create: {
        id: p.id,
        title: p.title,
        slug: p.slug,
        iconName: p.iconName,
        subtitle: p.subtitle,
        description: p.description,
        targetRole: p.targetRole,
        keyBenefits: p.keyBenefits,
        topToolSlugs: p.topToolSlugs,
      },
    });
  }

  // Seed Tools
  for (const tool of INITIAL_TOOLS) {
    await prisma.tool.upsert({
      where: { slug: tool.slug },
      update: {
        name: tool.name,
        logo: tool.logo,
        tagline: tool.tagline,
        description: tool.description,
        categoryId: tool.categoryId,
        categoryName: tool.categoryName,
        pricingModel: tool.pricingModel as any,
        monthlyPrice: tool.monthlyPrice,
        hasFreeTrial: tool.hasFreeTrial,
        websiteUrl: tool.websiteUrl,
        rating: tool.rating,
        reviewCount: tool.reviewCount,
        verified: tool.verified,
        featured: tool.featured,
        trending: tool.trending,
        hasApi: tool.hasApi,
        hasMobileApp: tool.hasMobileApp,
        hasExtension: tool.hasExtension,
      },
      create: {
        id: tool.id,
        name: tool.name,
        slug: tool.slug,
        logo: tool.logo,
        tagline: tool.tagline,
        description: tool.description,
        categoryId: tool.categoryId,
        categoryName: tool.categoryName,
        pricingModel: tool.pricingModel as any,
        monthlyPrice: tool.monthlyPrice,
        hasFreeTrial: tool.hasFreeTrial,
        websiteUrl: tool.websiteUrl,
        rating: tool.rating,
        reviewCount: tool.reviewCount,
        verified: tool.verified,
        featured: tool.featured,
        trending: tool.trending,
        hasApi: tool.hasApi,
        hasMobileApp: tool.hasMobileApp,
        hasExtension: tool.hasExtension,
      },
    });
  }

  console.log('Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
