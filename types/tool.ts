export type PricingModel = 'Free' | 'Freemium' | 'Paid';

export interface PricingTier {
  name: string;
  price: number | null;
  billingPeriod: 'monthly' | 'yearly' | 'custom';
  features: string[];
}

export interface UsageLimits {
  minutes?: number;
  credits?: number;
  generations?: number;
  storage?: string;
  seats?: number;
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
  hasFreeTier?: boolean;
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
  /** Optional monetized outbound URL; used only when affiliateEnabled is true */
  affiliateUrl?: string;
  affiliateEnabled?: boolean;
  /** Optional label for the affiliate program or network (e.g. Impact, PartnerStack) */
  affiliateProgram?: string;
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
  // Monitoring configuration
  monitoringEnabled?: boolean;
  pricingSourceUrl?: string;
  featuresSourceUrl?: string;
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
  createdAt?: string;
  updatedAt?: string;
}

export type UseCaseFitTier = 'primary' | 'strong' | 'partial' | 'listed' | 'exclude';

export interface UseCase {
  id: string;
  title: string;
  slug: string;
  description: string;
  primaryKeyword: string;
  seoTitle: string;
  seoDescription: string;
  publishStatus?: PublishStatus;
}

export interface PersonaUseCaseLink {
  order: number;
  isPrimary: boolean;
  pageEnabled: boolean;
  hubNote?: string;
  useCase: UseCase;
}

export interface ToolUseCaseFit {
  fitTier: UseCaseFitTier;
  capabilities: string;
  limitation?: string;
  evidenceUrl: string;
  verifiedAt: string;
  displayOrder: number;
  section: string;
}

export interface ToolWithUseCaseFit extends Tool {
  useCaseFit: ToolUseCaseFit;
}

export interface PersonaUseCasePage {
  persona: Persona;
  useCase: UseCase;
  link: Omit<PersonaUseCaseLink, 'useCase'>;
  tools: ToolWithUseCaseFit[];
  strongPlusCount: number;
}

export interface ToolUseCaseLink {
  personaSlug: string;
  personaTitle: string;
  useCaseSlug: string;
  useCaseTitle: string;
  fitTier: UseCaseFitTier;
  section: string;
  pageEnabled: boolean;
}

export interface PersonaHubSection {
  useCase: UseCase;
  link: Omit<PersonaUseCaseLink, 'useCase'>;
  tools: ToolWithUseCaseFit[];
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

export type ReviewStatus = 'pending' | 'approved' | 'rejected' | 'flagged';

export interface Review {
  id: string;
  toolSlug: string;
  toolName?: string;
  authorName: string;
  authorRole: string;
  rating: number;
  comment: string;
  date: string;
  verifiedUser: boolean;
  status: ReviewStatus;
  /** Admin-only; never expose on public API responses */
  email?: string;
  moderatedAt?: string;
  moderatedBy?: string;
  moderationNotes?: string;
  createdAt?: string;
  updatedAt?: string;
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
