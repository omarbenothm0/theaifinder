import { Tool, PricingModel } from '../../types/tool';
import { isValidHttpUrl, isValidSlug } from '../seo/indexability';

export type ValidationError = { field: string; message: string };

const PRICING_MODELS: PricingModel[] = ['Free', 'Freemium', 'Paid'];

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

  return errors;
}

export function formatValidationErrors(errors: ValidationError[]): string {
  return errors.map((e) => `${e.field}: ${e.message}`).join('; ');
}
