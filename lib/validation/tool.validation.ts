import { Tool, PricingModel, ToolSource, PricingTier } from '../../types/tool';
import { isValidHttpUrl, isValidSlug, isToolIndexable } from '../seo/indexability';

export type ValidationError = { field: string; message: string };

const PRICING_MODELS: PricingModel[] = ['Free', 'Freemium', 'Paid'];
const BILLING_PERIODS = new Set(['monthly', 'yearly', 'custom']);
const SOURCE_TYPES = new Set([
  'pricing',
  'features',
  'company',
  'website',
  'documentation',
  'changelog',
  'review',
  'general',
]);

function splitCsv(value: string): string[] {
  return value
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
}

export function parseCsvField(value: string): string[] {
  return splitCsv(value);
}

export function validateSources(sources: ToolSource[] | undefined): ValidationError[] {
  const errors: ValidationError[] = [];
  if (!sources) return errors;

  sources.forEach((source, index) => {
    const prefix = `sources[${index}]`;
    if (!source.type || !SOURCE_TYPES.has(source.type)) {
      errors.push({ field: prefix, message: 'Invalid or missing source type' });
    }
    if (!source.url?.trim() || !isValidHttpUrl(source.url.trim())) {
      errors.push({ field: prefix, message: 'Source URL must be a valid http(s) URL' });
    }
    if (!source.verifiedAt || Number.isNaN(Date.parse(source.verifiedAt))) {
      errors.push({ field: prefix, message: 'verifiedAt must be a valid date' });
    }
  });

  return errors;
}

export function validatePricingTiers(tiers: PricingTier[] | undefined): ValidationError[] {
  const errors: ValidationError[] = [];
  if (!tiers) return errors;

  tiers.forEach((tier, index) => {
    const prefix = `pricingTiers[${index}]`;
    if (!tier.name?.trim()) {
      errors.push({ field: prefix, message: 'Tier name is required' });
    }
    if (!tier.billingPeriod || !BILLING_PERIODS.has(tier.billingPeriod)) {
      errors.push({
        field: prefix,
        message: 'billingPeriod must be monthly, yearly, or custom',
      });
    }
    if (tier.price !== null && tier.price !== undefined) {
      const price = Number(tier.price);
      if (Number.isNaN(price) || price < 0) {
        errors.push({ field: prefix, message: 'Tier price must be a non-negative number' });
      }
    }
  });

  return errors;
}

export function validateToolInput(
  input: Partial<Tool>,
  options: { isCreate?: boolean } = {}
): ValidationError[] {
  const errors: ValidationError[] = [];
  const { isCreate = false } = options;

  if (isCreate || input.name !== undefined) {
    if (!input.name?.trim()) {
      errors.push({ field: 'name', message: 'Name is required' });
    }
  }

  if (isCreate || input.slug !== undefined) {
    const slug = input.slug?.trim().toLowerCase() ?? '';
    if (!slug) {
      errors.push({ field: 'slug', message: 'Slug is required' });
    } else if (!isValidSlug(slug)) {
      errors.push({
        field: 'slug',
        message: 'Slug must be lowercase alphanumeric with hyphens only',
      });
    }
  }

  if (input.websiteUrl !== undefined && input.websiteUrl.trim()) {
    if (!isValidHttpUrl(input.websiteUrl.trim())) {
      errors.push({ field: 'websiteUrl', message: 'Website URL must be a valid http(s) URL' });
    }
  } else if (isCreate) {
    errors.push({ field: 'websiteUrl', message: 'Website URL is required' });
  }

  if (input.logo !== undefined && input.logo.trim()) {
    if (!isValidHttpUrl(input.logo.trim())) {
      errors.push({ field: 'logo', message: 'Logo must be a valid http(s) URL' });
    }
  }

  if (input.pricingModel !== undefined && !PRICING_MODELS.includes(input.pricingModel)) {
    errors.push({ field: 'pricingModel', message: 'Invalid pricing model' });
  }

  if (input.monthlyPrice !== undefined && input.monthlyPrice !== null) {
    const price = Number(input.monthlyPrice);
    if (Number.isNaN(price) || price < 0) {
      errors.push({ field: 'monthlyPrice', message: 'Monthly price must be a non-negative number' });
    }
  }

  if (input.rating !== undefined) {
    const rating = Number(input.rating);
    if (Number.isNaN(rating) || rating < 0 || rating > 5) {
      errors.push({ field: 'rating', message: 'Rating must be between 0 and 5' });
    }
  }

  if (input.reviewCount !== undefined) {
    const count = Number(input.reviewCount);
    if (!Number.isInteger(count) || count < 0) {
      errors.push({ field: 'reviewCount', message: 'Review count must be a non-negative integer' });
    }
  }

  if (input.categoryId !== undefined && !input.categoryId?.trim()) {
    errors.push({ field: 'categoryId', message: 'Category is required' });
  }

  if (input.tagline !== undefined && input.tagline.trim() && input.tagline.trim().length < 10) {
    errors.push({ field: 'tagline', message: 'Tagline must be at least 10 characters' });
  }

  if (
    input.description !== undefined &&
    input.description.trim() &&
    input.description.trim().length < 50
  ) {
    errors.push({ field: 'description', message: 'Description must be at least 50 characters' });
  }

  if (input.pricingSource?.trim() && !isValidHttpUrl(input.pricingSource.trim())) {
    errors.push({ field: 'pricingSource', message: 'Pricing source must be a valid http(s) URL' });
  }

  if (input.featureSource?.trim() && !isValidHttpUrl(input.featureSource.trim())) {
    errors.push({ field: 'featureSource', message: 'Feature source must be a valid http(s) URL' });
  }

  if (input.affiliateUrl !== undefined && input.affiliateUrl.trim()) {
    if (!isValidHttpUrl(input.affiliateUrl.trim())) {
      errors.push({
        field: 'affiliateUrl',
        message: 'Affiliate URL must be a valid http(s) URL',
      });
    }
  }

  if (input.affiliateEnabled) {
    if (!input.affiliateUrl?.trim()) {
      errors.push({
        field: 'affiliateUrl',
        message: 'Affiliate URL is required when affiliate links are enabled',
      });
    } else if (!isValidHttpUrl(input.affiliateUrl.trim())) {
      errors.push({
        field: 'affiliateUrl',
        message: 'Affiliate URL must be a valid http(s) URL when affiliate links are enabled',
      });
    }
  }

  errors.push(...validateSources(input.sources));
  errors.push(...validatePricingTiers(input.pricingTiers));

  if (input.alternatives?.length) {
    input.alternatives.forEach((alt, index) => {
      if (!isValidSlug(alt)) {
        errors.push({
          field: `alternatives[${index}]`,
          message: `Invalid alternative slug "${alt}"`,
        });
      }
    });
  }

  if (input.screenshots?.length) {
    input.screenshots.forEach((url, index) => {
      if (url.trim() && !isValidHttpUrl(url.trim())) {
        errors.push({
          field: `screenshots[${index}]`,
          message: 'Screenshot URL must be a valid http(s) URL',
        });
      }
    });
  }

  return errors;
}

/** Validates requirements for publishing (uses existing indexability rules). */
export function validateToolForPublish(input: Partial<Tool>): ValidationError[] {
  if (input.publishStatus !== 'published') return [];

  const errors: ValidationError[] = [];

  if (!input.logo?.trim()) {
    errors.push({ field: 'logo', message: 'Logo URL is required to publish' });
  }

  if (!input.tagline?.trim()) {
    errors.push({ field: 'tagline', message: 'Tagline is required to publish' });
  } else if (input.tagline.trim().length < 10) {
    errors.push({
      field: 'tagline',
      message: 'Tagline must be at least 10 characters to publish',
    });
  }

  if (!input.description?.trim()) {
    errors.push({ field: 'description', message: 'Description is required to publish' });
  } else if (input.description.trim().length < 50) {
    errors.push({
      field: 'description',
      message: 'Description must be at least 50 characters to publish',
    });
  }

  if (!input.websiteUrl?.trim()) {
    errors.push({ field: 'websiteUrl', message: 'Website URL is required to publish' });
  }

  if (!input.categoryId?.trim()) {
    errors.push({ field: 'categoryId', message: 'Category is required to publish' });
  }

  const indexResult = isToolIndexable(input as Tool);
  if (!indexResult.indexable && indexResult.reason) {
    const knownFields = new Set(errors.map((e) => e.field));
    if (!knownFields.has('publishStatus')) {
      errors.push({ field: 'publishStatus', message: indexResult.reason });
    }
  }

  return errors;
}

export function formatValidationErrors(errors: ValidationError[]): string {
  return errors.map((e) => `${e.field}: ${e.message}`).join('; ');
}

export function groupValidationErrors(errors: ValidationError[]): Record<string, string> {
  const grouped: Record<string, string> = {};
  for (const err of errors) {
    grouped[err.field] = grouped[err.field]
      ? `${grouped[err.field]}; ${err.message}`
      : err.message;
  }
  return grouped;
}
