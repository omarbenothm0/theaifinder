export type PricingModel = 'Free' | 'Freemium' | 'Paid';

export interface PricingTier {
  name: string;
  price: number | null;
  billingPeriod: 'monthly' | 'yearly' | 'custom';
  features: string[];
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface FeatureItem {
  title: string;
  description: string;
}

export type ToolSourceType =
  | 'pricing'
  | 'features'
  | 'company'
  | 'website'
  | 'documentation'
  | 'changelog'
  | 'review'
  | 'general';

export interface ToolSource {
  type: ToolSourceType;
  url: string;
  verifiedAt: string;
  notes?: string;
}

export type ReviewState = 'unverified' | 'verified' | 'needsReview' | 'inReview';

export type PublishStatus = 'draft' | 'published' | 'archived';

export interface Tool {
  id: string;
  name: string;
  slug: string;
  logo: string;
  tagline: string;
  description: string;
  categoryId: string;
  categorySlug?: string;
  categoryName: string;
  tags: string[];
  pricingModel: PricingModel;
  monthlyPrice?: number | null;
  hasFreeTrial: boolean;
  companyName?: string;
  lastVerifiedDate?: string;
  verifiedBy?: string;
  sources?: ToolSource[];
  pricingSource?: string;
  featureSource?: string;
  reviewState?: ReviewState;
  reviewRequestedAt?: string;
  reviewAssignedTo?: string;
  reviewNotes?: string;
  pricingTiers?: PricingTier[];
  platforms?: string[];
  websiteUrl: string;
  features: string[];
  pros: string[];
  cons: string[];
  rating: number;
  reviewCount: number;
  screenshots: string[];
  alternatives: string[];
  targetUsers: string[];
  verified: boolean;
  featured: boolean;
  trending: boolean;
  hasApi: boolean;
  hasMobileApp: boolean;
  hasExtension: boolean;
  publishStatus?: PublishStatus;
  createdAt?: string;
  updatedAt?: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  iconName: string;
  description: string;
  longDescription: string;
  toolCount: number;
  faqs: FAQItem[];
  seoTitle: string;
  seoDescription: string;
  publishStatus?: PublishStatus;
}

export interface Persona {
  id: string;
  title: string;
  slug: string;
  iconName: string;
  subtitle: string;
  description: string;
  targetRole: string;
  keyBenefits: string[];
  topToolSlugs: string[];
  faqs: FAQItem[];
  publishStatus?: PublishStatus;
}

export interface ComparisonFeatureRow {
  feature: string;
  tool1Value: string;
  tool2Value: string;
  winnerSlug: string | 'tie';
}

export interface Comparison {
  id: string;
  slug: string;
  tool1Slug: string;
  tool2Slug: string;
  title: string;
  overview: string;
  bestFor1: string;
  bestFor2: string;
  verdict: string;
  winnerSlug: string | 'tie';
  featureBreakdown: ComparisonFeatureRow[];
  /** True when stored in DB; false for runtime-generated fallback pages */
  isCurated?: boolean;
  publishStatus?: PublishStatus;
}

export interface Review {
  id: string;
  toolSlug: string;
  authorName: string;
  authorRole: string;
  rating: number;
  comment: string;
  date: string;
  verifiedUser: boolean;
}

export interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  readTime: string;
  publishedAt: string;
  relatedCategorySlug?: string;
  relatedToolSlugs?: string[];
  publishStatus?: PublishStatus;
}

export interface ToolFilterOptions {
  search?: string;
  category?: string;
  pricing?: PricingModel | 'all';
  persona?: string;
  hasApi?: boolean;
  hasMobileApp?: boolean;
  hasExtension?: boolean;
  hasFreeOption?: boolean;
  minRating?: number;
  sortBy?: 'popular' | 'rating' | 'newest' | 'price-asc' | 'price-desc';
  page?: number;
  limit?: number;
  /** Admin-only: include draft/archived records */
  includeUnpublished?: boolean;
}

export interface FinderAnswer {
  useCase: string;
  role: string;
  budgetPreference: string;
  keyFeatures: string[];
  experienceLevel: string;
}
