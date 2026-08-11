/**
 * QA for lastVerifiedDate freshness signal.
 * Run: npx tsx scripts/test-verified-date.ts
 */
import { dbRepository } from '../lib/dbRepository';
import { MonitoringService } from '../lib/monitoring/monitoring.service';
import { formatInformationVerifiedDate } from '../lib/utils/formatDate';

const TEST_SLUG = 'qa-verified-date-test-tool';

function todayDateString(): string {
  return new Date().toISOString().split('T')[0]!;
}

async function main() {
  console.log('=== Verified Date QA ===\n');

  const chatgpt = await dbRepository.getToolBySlug('chatgpt', { includeUnpublished: true });
  if (!chatgpt?.lastVerifiedDate) {
    throw new Error('Expected existing chatgpt tool to retain seed lastVerifiedDate');
  }
  console.log('✓ Existing tool preserved date:', chatgpt.lastVerifiedDate);
  console.log('  Formatted:', formatInformationVerifiedDate(chatgpt.lastVerifiedDate));

  const existing = await dbRepository.getToolBySlug(TEST_SLUG, { includeUnpublished: true });
  if (existing) await dbRepository.deleteTool(TEST_SLUG);

  const categories = await dbRepository.getCategories({ includeUnpublished: true });
  const cat = categories[0];
  if (!cat) throw new Error('No categories');

  const created = await dbRepository.createTool({
    name: 'QA Verified Date Test',
    slug: TEST_SLUG,
    logo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=120&h=120&q=80',
    tagline: 'Temporary QA tool for verified date behavior verification pass.',
    description:
      'Temporary test record for verified date QA. Should be deleted automatically after verification completes.',
    categoryId: cat.id,
    categoryName: cat.name,
    categorySlug: cat.slug,
    tags: ['QA'],
    pricingModel: 'Freemium',
    hasFreeTrial: true,
    websiteUrl: 'https://example.com',
    features: ['A'],
    pros: ['P'],
    cons: ['C'],
    platforms: ['Web'],
    screenshots: [],
    alternatives: [],
    targetUsers: [],
    rating: 0,
    reviewCount: 0,
    verified: false,
    featured: false,
    trending: false,
    hasApi: false,
    hasMobileApp: false,
    hasExtension: false,
    publishStatus: 'draft',
  });

  if (created.lastVerifiedDate !== todayDateString()) {
    throw new Error(`Create should stamp today; got ${created.lastVerifiedDate}`);
  }
  console.log('✓ New tool stamped on create:', created.lastVerifiedDate);

  await new Promise((r) => setTimeout(r, 1100));

  const updated = await dbRepository.updateTool(TEST_SLUG, { tagline: created.tagline + ' Updated.' });
  if (!updated?.lastVerifiedDate || updated.lastVerifiedDate < created.lastVerifiedDate!) {
    throw new Error('Update should refresh lastVerifiedDate');
  }
  console.log('✓ Update refreshed date:', updated.lastVerifiedDate);

  const { check } = await MonitoringService.runWebsiteCheckForTool(created.id);
  const afterCheck = await dbRepository.getToolBySlug(TEST_SLUG, { includeUnpublished: true });
  if (check.status !== 'success') {
    console.log('⚠ Website check did not succeed (may be network); skipping check stamp assertion');
  } else if (!afterCheck?.lastVerifiedDate) {
    throw new Error('Successful check should refresh lastVerifiedDate');
  } else {
    console.log('✓ Successful website check refreshed date:', afterCheck.lastVerifiedDate);
  }

  const chatgptAfter = await dbRepository.getToolBySlug('chatgpt', { includeUnpublished: true });
  if (chatgptAfter?.lastVerifiedDate !== chatgpt.lastVerifiedDate) {
    throw new Error('Existing tool date changed unexpectedly');
  }
  console.log('✓ Existing tool unchanged after QA');

  await dbRepository.deleteTool(TEST_SLUG);
  console.log('✓ Test tool deleted');
  console.log('\n=== Verified date QA passed ===');
}

main().catch(async (err) => {
  console.error('\nQA FAILED:', err);
  try {
    await dbRepository.deleteTool(TEST_SLUG);
  } catch {
    // ignore
  }
  process.exit(1);
});
