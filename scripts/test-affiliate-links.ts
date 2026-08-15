/**
 * QA script for affiliate link routing — creates a test tool, verifies CTA logic, deletes it.
 * Run: npx tsx scripts/test-affiliate-links.ts
 */
import { ToolRepository } from '../lib/repositories/tool.repository';
import { CategoryRepository } from '../lib/repositories/category.repository';
import { validateToolInput } from '../lib/validation/tool.validation';
import { getToolOutboundLink, getToolOfficialWebsiteUrl } from '../lib/utils/toolOutboundLink';

const TEST_SLUG = 'qa-affiliate-link-test-tool';

async function main() {
  console.log('=== Affiliate Link QA ===\n');

  const existing = await ToolRepository.getToolBySlug(TEST_SLUG, { includeUnpublished: true });
  if (existing) {
    await ToolRepository.deleteTool(TEST_SLUG);
    console.log('Cleaned up pre-existing test tool');
  }

  const categories = await CategoryRepository.getCategories({ includeUnpublished: true });
  const cat = categories[0];
  if (!cat) throw new Error('No categories in DB');

  const chatgpt = await ToolRepository.getToolBySlug('chatgpt', { includeUnpublished: true });
  const chatgptBefore = chatgpt
    ? {
        websiteUrl: chatgpt.websiteUrl,
        affiliateUrl: chatgpt.affiliateUrl,
        affiliateEnabled: chatgpt.affiliateEnabled,
      }
    : null;

  const basePayload = {
    name: 'QA Affiliate Link Test Tool',
    slug: TEST_SLUG,
    logo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=120&h=120&q=80',
    tagline: 'Temporary QA tool for affiliate link routing verification pass.',
    description:
      'This is a temporary test record created by the affiliate link QA script. It should be deleted automatically after verification completes successfully.',
    categoryId: cat.id,
    categoryName: cat.name,
    categorySlug: cat.slug,
    tags: ['QA'],
    pricingModel: 'Freemium' as const,
    hasFreeTrial: true,
    websiteUrl: 'https://example.com',
    features: ['Feature A'],
    pros: ['Pro one'],
    cons: ['Con one'],
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
    publishStatus: 'draft' as const,
  };

  const created = await ToolRepository.createTool(basePayload);
  let link = getToolOutboundLink(created);
  if (link.href !== 'https://example.com') throw new Error('Expected official URL in CTA');
  if (link.isAffiliate) throw new Error('Should not be affiliate without enable flag');
  if (link.rel !== 'noopener noreferrer') throw new Error('Expected standard rel for official link');
  console.log('✓ CTA uses official URL when no affiliate configured');

  const withAffiliateDisabled = await ToolRepository.updateTool(TEST_SLUG, {
    affiliateUrl: 'https://example.com/?ref=qa-test',
    affiliateEnabled: false,
  });
  link = getToolOutboundLink(withAffiliateDisabled!);
  if (link.href !== 'https://example.com') throw new Error('Disabled affiliate should fall back to official');
  console.log('✓ CTA uses official URL when affiliate disabled');

  const withAffiliateEnabled = await ToolRepository.updateTool(TEST_SLUG, {
    affiliateEnabled: true,
    affiliateProgram: 'QA Network',
  });
  link = getToolOutboundLink(withAffiliateEnabled!);
  if (link.href !== 'https://example.com/?ref=qa-test') {
    throw new Error('Expected affiliate URL in CTA when enabled');
  }
  if (!link.isAffiliate) throw new Error('Should be affiliate when enabled');
  if (link.rel !== 'sponsored nofollow noopener noreferrer') {
    throw new Error('Expected sponsored rel for affiliate link');
  }
  if (link.label === 'Visit Official Website') {
    throw new Error('Affiliate CTA must not say Visit Official Website');
  }
  console.log('✓ CTA uses affiliate URL when enabled');

  const official = getToolOfficialWebsiteUrl(withAffiliateEnabled!);
  if (official !== 'https://example.com') {
    throw new Error('Monitoring reference must use official websiteUrl');
  }
  console.log('✓ Official URL preserved for monitoring reference');

  const invalidErrors = validateToolInput({
    ...withAffiliateEnabled!,
    affiliateUrl: '',
    affiliateEnabled: true,
  });
  if (!invalidErrors.some((e) => e.field === 'affiliateUrl')) {
    throw new Error('Expected validation error when affiliate enabled without URL');
  }
  console.log('✓ Validation blocks affiliate enabled without URL');

  const disabledAgain = await ToolRepository.updateTool(TEST_SLUG, {
    affiliateEnabled: false,
  });
  link = getToolOutboundLink(disabledAgain!);
  if (link.href !== 'https://example.com') throw new Error('Expected official URL after disable');
  console.log('✓ CTA returns to official URL when affiliate disabled');

  if (chatgptBefore) {
    const chatgptAfter = await ToolRepository.getToolBySlug('chatgpt', { includeUnpublished: true });
    if (
      chatgptAfter?.websiteUrl !== chatgptBefore.websiteUrl ||
      chatgptAfter?.affiliateUrl !== chatgptBefore.affiliateUrl ||
      chatgptAfter?.affiliateEnabled !== chatgptBefore.affiliateEnabled
    ) {
      throw new Error('Existing tool data was modified unexpectedly');
    }
    console.log('✓ Existing tool data unchanged');
  }

  await ToolRepository.deleteTool(TEST_SLUG);
  console.log('✓ Test tool deleted');

  console.log('\n=== All affiliate link QA checks passed ===');
}

main().catch(async (err) => {
  console.error('\nQA FAILED:', err);
  try {
    await ToolRepository.deleteTool(TEST_SLUG);
  } catch {
    // ignore
  }
  process.exit(1);
});
