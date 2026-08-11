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
