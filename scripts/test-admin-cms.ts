/**
 * QA script for Admin CMS completeness — creates a test tool, verifies persistence, deletes it.
 * Run: npx tsx scripts/test-admin-cms.ts
 */
import { dbRepository } from '../lib/dbRepository';
import { validateToolInput, validateToolForPublish } from '../lib/validation/tool.validation';
import { isToolIndexable } from '../lib/seo/indexability';

const TEST_SLUG = 'qa-admin-cms-test-tool';

async function main() {
  console.log('=== Admin CMS QA ===\n');

  const existing = await dbRepository.getToolBySlug(TEST_SLUG, { includeUnpublished: true });
  if (existing) {
    await dbRepository.deleteTool(TEST_SLUG);
    console.log('Cleaned up pre-existing test tool');
  }

  const categories = await dbRepository.getCategories({ includeUnpublished: true });
  const cat = categories[0];
  if (!cat) throw new Error('No categories in DB');

  const chatgpt = await dbRepository.getToolBySlug('chatgpt', { includeUnpublished: true });
  const chatgptRatingBefore = chatgpt?.rating;

  const draftPayload = {
    name: 'QA Admin CMS Test Tool',
    slug: TEST_SLUG,
    logo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=120&h=120&q=80',
    tagline: 'Temporary QA tool for admin CMS completeness verification pass.',
    description:
      'This is a temporary test record created by the admin CMS QA script. It should be deleted automatically after verification completes successfully.',
    categoryId: cat.id,
    categoryName: cat.name,
    categorySlug: cat.slug,
    tags: ['QA', 'Test'],
    pricingModel: 'Freemium' as const,
    monthlyPrice: 10,
    hasFreeTrial: true,
    companyName: 'QA Corp',
    websiteUrl: 'https://example.com',
    features: ['Feature A', 'Feature B'],
    pros: ['Pro one'],
    cons: ['Con one'],
    platforms: ['Web'],
    screenshots: ['https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=400&h=300&q=80'],
    sources: [
      {
        type: 'pricing' as const,
        url: 'https://example.com/pricing',
        verifiedAt: '2026-08-11T00:00:00.000Z',
        notes: 'QA source',
      },
    ],
    pricingTiers: [
      {
        name: 'Basic',
        price: 0,
        billingPeriod: 'monthly' as const,
        features: ['Limited'],
      },
    ],
    alternatives: chatgpt ? ['chatgpt'] : [],
    targetUsers: [],
    rating: 4.2,
    reviewCount: 99,
    verified: true,
    featured: false,
    trending: false,
    hasApi: true,
    hasMobileApp: false,
    hasExtension: false,
    publishStatus: 'draft' as const,
    reviewState: 'unverified' as const,
  };

  const draftErrors = validateToolInput(draftPayload, { isCreate: true });
  if (draftErrors.length) {
    throw new Error(`Draft validation failed: ${JSON.stringify(draftErrors)}`);
  }
  console.log('✓ Draft validation passed');

  const created = await dbRepository.createTool(draftPayload);
  console.log('✓ Created draft tool:', created.id);

  const fetched = await dbRepository.getToolBySlug(TEST_SLUG, { includeUnpublished: true });
  if (!fetched) throw new Error('Tool not found after create');

  const checks: Array<[string, boolean]> = [
    ['sources persisted', (fetched.sources?.length ?? 0) === 1],
    ['pricing tiers persisted', (fetched.pricingTiers?.length ?? 0) === 1],
    ['alternatives persisted', chatgpt ? (fetched.alternatives?.includes('chatgpt') ?? false) : true],
    ['tags persisted', fetched.tags.includes('QA')],
    ['features persisted', fetched.features.includes('Feature A')],
    ['rating persisted', fetched.rating === 4.2],
    ['draft status', fetched.publishStatus === 'draft'],
  ];

  for (const [label, ok] of checks) {
    if (!ok) throw new Error(`FAIL: ${label}`);
    console.log(`✓ ${label}`);
  }

  const publishedPayload = {
    ...fetched,
    publishStatus: 'published' as const,
    tagline: fetched.tagline,
    description: fetched.description,
  };

  const publishErrors = [
    ...validateToolInput(publishedPayload),
    ...validateToolForPublish(publishedPayload),
  ];
  if (publishErrors.length) {
    throw new Error(`Publish validation failed: ${JSON.stringify(publishErrors)}`);
  }

  const indexResult = isToolIndexable(publishedPayload);
  if (!indexResult.indexable) {
    throw new Error(`Not indexable: ${indexResult.reason}`);
  }
  console.log('✓ Publish validation + indexability passed');

  const updated = await dbRepository.updateTool(TEST_SLUG, {
    publishStatus: 'published',
    targetUsers: [],
    tags: ['QA', 'Test', 'Updated'],
    sources: fetched.sources,
    pricingTiers: fetched.pricingTiers,
    alternatives: fetched.alternatives,
  });
  if (updated?.publishStatus !== 'published') throw new Error('Publish update failed');
  console.log('✓ Updated to published');

  const chatgptAfter = await dbRepository.getToolBySlug('chatgpt', { includeUnpublished: true });
  if (chatgptRatingBefore !== undefined && chatgptAfter?.rating !== chatgptRatingBefore) {
    throw new Error('Existing tool data was modified unexpectedly');
  }
  console.log('✓ Existing tool data unchanged');

  await dbRepository.deleteTool(TEST_SLUG);
  const gone = await dbRepository.getToolBySlug(TEST_SLUG, { includeUnpublished: true });
  if (gone) throw new Error('Test tool not deleted');
  console.log('✓ Test tool deleted');

  console.log('\n=== All Admin CMS QA checks passed ===');
}

main()
  .then(async () => {
    try {
      const leftover = await dbRepository.getToolBySlug(TEST_SLUG, { includeUnpublished: true });
      if (leftover) {
        await dbRepository.deleteTool(TEST_SLUG);
        console.log('Cleanup: removed leftover test tool');
      }
    } catch {
      // ignore cleanup errors
    }
  })
  .catch(async (err) => {
    console.error('\nQA FAILED:', err);
    try {
      await dbRepository.deleteTool(TEST_SLUG);
    } catch {
      // ignore
    }
    process.exit(1);
  });
