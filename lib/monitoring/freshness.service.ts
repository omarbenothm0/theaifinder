import { Tool } from '../../types/tool';
import {
  MonitoringSignal,
  ToolMonitoringCheck,
  VerificationFreshnessLevel,
} from '../../types/monitoring';
import { getVerificationFreshnessConfig } from './config';
import { parseDate, daysSince } from '../utils/reviewHelper';

export function getVerificationFreshness(tool: Tool): {
  freshness: VerificationFreshnessLevel;
  daysSinceVerification: number | null;
} {
  const thresholds = getVerificationFreshnessConfig();
  const lastVerified = parseDate(tool.lastVerifiedDate);

  if (!lastVerified) {
    return { freshness: 'never_verified', daysSinceVerification: null };
  }

  const elapsed = daysSince(lastVerified);

  if (elapsed >= thresholds.staleDays) {
    return { freshness: 'stale', daysSinceVerification: elapsed };
  }

  if (elapsed >= thresholds.warningDays) {
    return { freshness: 'approaching_stale', daysSinceVerification: elapsed };
  }

  return { freshness: 'recent', daysSinceVerification: elapsed };
}

export function deriveMonitoringSignal(
  freshness: VerificationFreshnessLevel,
  latestCheck: ToolMonitoringCheck | null,
  lastSuccessfulCheckAt: string | null
): MonitoringSignal {
  if (!latestCheck) {
    if (freshness === 'never_verified' || freshness === 'stale') {
      return 'needs_attention';
    }
    if (freshness === 'approaching_stale') {
      return 'approaching_stale';
    }
    return 'unchecked';
  }

  if (latestCheck.status !== 'success') {
    return 'website_failed';
  }

  if (freshness === 'stale') {
    return 'stale';
  }

  if (freshness === 'approaching_stale' || freshness === 'never_verified') {
    return freshness === 'never_verified' ? 'needs_attention' : 'approaching_stale';
  }

  if (lastSuccessfulCheckAt) {
    return 'healthy';
  }

  return 'needs_attention';
}

export function getMonitoringSignalLabel(signal: MonitoringSignal): string {
  switch (signal) {
    case 'healthy':
      return 'Healthy';
    case 'approaching_stale':
      return 'Stale / needs verification';
    case 'stale':
      return 'Stale / needs verification';
    case 'website_failed':
      return 'Website check failed';
    case 'needs_attention':
      return 'Verification needs attention';
    case 'unchecked':
    default:
      return 'Not checked yet';
  }
}

export function getMonitoringSignalEmoji(signal: MonitoringSignal): string {
  switch (signal) {
    case 'healthy':
      return '🟢';
    case 'approaching_stale':
    case 'stale':
      return '🟡';
    case 'website_failed':
      return '🔴';
    case 'needs_attention':
      return '⚠️';
    case 'unchecked':
    default:
      return '⚪';
  }
}
