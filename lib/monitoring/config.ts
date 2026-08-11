/**
 * Configurable monitoring & verification freshness thresholds.
 * Override via environment variables in production.
 */
export interface MonitoringConfig {
  requestTimeoutMs: number;
  maxRedirects: number;
  maxBatchSize: number;
  verificationStaleDays: number;
  verificationWarningDays: number;
  verificationHighPriorityDays: number;
  userAgent: string;
}

function readInt(name: string, fallback: number, min = 1): number {
  const raw = process.env[name];
  if (!raw) return fallback;
  const parsed = Number.parseInt(raw, 10);
  if (Number.isNaN(parsed) || parsed < min) return fallback;
  return parsed;
}

export function getMonitoringConfig(): MonitoringConfig {
  return {
    requestTimeoutMs: readInt('MONITORING_REQUEST_TIMEOUT_MS', 10_000, 1000),
    maxRedirects: readInt('MONITORING_MAX_REDIRECTS', 5, 0),
    maxBatchSize: readInt('MONITORING_MAX_BATCH_SIZE', 25, 1),
    verificationStaleDays: readInt('VERIFICATION_STALE_DAYS', 90, 1),
    verificationWarningDays: readInt('VERIFICATION_WARNING_DAYS', 60, 1),
    verificationHighPriorityDays: readInt('VERIFICATION_HIGH_PRIORITY_DAYS', 180, 1),
    userAgent:
      process.env.MONITORING_USER_AGENT?.trim() ||
      'TheRadarHub-Monitor/1.0 (+https://theradarhub.com; tool-verification)',
  };
}

export function getVerificationFreshnessConfig() {
  const config = getMonitoringConfig();
  return {
    staleDays: config.verificationStaleDays,
    warningDays: config.verificationWarningDays,
    highPriorityDays: config.verificationHighPriorityDays,
  };
}
