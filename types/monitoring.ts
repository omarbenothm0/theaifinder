export type MonitoringCheckStatus = 'success' | 'failed' | 'timeout' | 'invalid_url';

export type VerificationFreshnessLevel =
  | 'recent'
  | 'approaching_stale'
  | 'stale'
  | 'never_verified';

export type MonitoringSignal =
  | 'healthy'
  | 'approaching_stale'
  | 'stale'
  | 'website_failed'
  | 'needs_attention'
  | 'unchecked';

export interface ToolMonitoringCheck {
  id: string;
  toolId: string;
  checkedAt: string;
  status: MonitoringCheckStatus;
  httpStatus?: number | null;
  finalUrl?: string | null;
  responseTimeMs?: number | null;
  isHttps?: boolean | null;
  redirectCount?: number | null;
  errorCode?: string | null;
  errorMessage?: string | null;
  requestedUrl: string;
  createdAt: string;
}

export interface WebsiteHealthResult {
  status: MonitoringCheckStatus;
  httpStatus?: number | null;
  finalUrl?: string | null;
  responseTimeMs: number;
  isHttps?: boolean | null;
  redirectCount: number;
  errorCode?: string | null;
  errorMessage?: string | null;
  requestedUrl: string;
}

export interface ToolMonitoringSummary {
  toolId: string;
  toolSlug: string;
  signal: MonitoringSignal;
  freshness: VerificationFreshnessLevel;
  daysSinceVerification: number | null;
  lastCheckedAt: string | null;
  lastSuccessfulCheckAt: string | null;
  latestCheck: ToolMonitoringCheck | null;
}

// Change monitoring types
export type ChangeCategory =
  | 'pricing'
  | 'free_tier'
  | 'plans'
  | 'ai_features'
  | 'product_name'
  | 'features'
  | 'integrations'
  | 'usage_limits'
  | 'languages'
  | 'platforms'
  | 'export_formats'
  | 'target_audience'
  | 'limitations'
  | 'discontinued_features'
  | 'official_urls'
  | 'policy_changes';

export type ChangeSeverity = 'critical' | 'warning' | 'info';
export type ChangeStatus = 'needs_review' | 'reviewed' | 'resolved';

export interface ToolSnapshot {
  id: string;
  toolId: string;
  snapshotAt: string;
  pricingModel: string;
  monthlyPrice: number | null;
  hasFreeTrial: boolean;
  hasFreeTier: boolean;
  pricingTiers: PricingTier[];
  features: string[];
  platforms: string[];
  integrations: string[];
  usageLimits: UsageLimits | null;
  languages: string[];
  exportFormats: string[];
  limitations: string[];
  productName: string;
  targetAudience: string[];
  discontinuedFeatures: string[];
  policyChanges: string[];
  sourceUrls: SourceUrls;
}

export interface ToolChangeRecord {
  id: string;
  toolId: string;
  snapshotId: string;
  category: ChangeCategory;
  fieldName: string;
  previousValue: string | null;
  currentValue: string | null;
  sourceUrl: string | null;
  severity: ChangeSeverity;
  status: ChangeStatus;
  detectedAt: string;
}

export interface SourceUrls {
  pricing?: string;
  features?: string;
  product?: string;
}

export interface UsageLimits {
  minutes?: number;
  credits?: number;
  generations?: number;
  storage?: string;
  seats?: number;
}

export interface PricingTier {
  name: string;
  monthlyPrice: number | null; // Actual month-to-month price
  annualMonthlyPrice: number | null; // Monthly equivalent when billed annually
  billingPeriod: 'monthly' | 'annual' | 'custom';
  features: string[];
}

export interface ToolSnapshotData {
  pricingModel: 'Free' | 'Freemium' | 'Paid';
  monthlyPrice: number | null;
  hasFreeTrial: boolean;
  hasFreeTier: boolean;
  pricingTiers: PricingTier[];
  features: string[];
  platforms: string[];
  integrations: string[];
  usageLimits: UsageLimits | null;
  languages: string[];
  exportFormats: string[];
  limitations: string[];
  productName: string;
  targetAudience: string[];
  discontinuedFeatures: string[];
  policyChanges: string[];
}

export interface DetectedChange {
  category: ChangeCategory;
  fieldName: string;
  previousValue: string | null;
  currentValue: string | null;
  severity: ChangeSeverity;
}
