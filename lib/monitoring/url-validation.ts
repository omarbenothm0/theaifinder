export type UrlValidationResult =
  | { valid: true; normalizedUrl: string }
  | { valid: false; reason: string; errorCode: string };

const BLOCKED_HOSTNAMES = new Set([
  'localhost',
  'metadata.google.internal',
  'metadata.google',
  '169.254.169.254',
]);

function isPrivateIpv4(host: string): boolean {
  const match = /^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/.exec(host);
  if (!match) return false;
  const octets = match.slice(1, 5).map((part) => Number(part));
  if (octets.some((n) => Number.isNaN(n) || n > 255)) return true;

  const [a, b] = octets;
  if (a === 10) return true;
  if (a === 127) return true;
  if (a === 0) return true;
  if (a === 169 && b === 254) return true;
  if (a === 192 && b === 168) return true;
  if (a === 172 && b >= 16 && b <= 31) return true;
  return false;
}

function isBlockedHostname(hostname: string): boolean {
  const host = hostname.toLowerCase().replace(/\.$/, '');
  if (!host) return true;
  if (BLOCKED_HOSTNAMES.has(host)) return true;
  if (host.endsWith('.localhost')) return true;
  if (host.endsWith('.internal')) return true;
  if (host.includes('metadata')) return true;

  if (host.includes(':')) {
    if (host === '::1') return true;
    if (host.startsWith('fe80:')) return true;
    if (host.startsWith('fc') || host.startsWith('fd')) return true;
  }

  return isPrivateIpv4(host);
}

export function validateMonitoringUrl(rawUrl: string): UrlValidationResult {
  if (!rawUrl?.trim()) {
    return { valid: false, reason: 'URL is empty', errorCode: 'empty_url' };
  }

  if (rawUrl.length > 2048) {
    return { valid: false, reason: 'URL exceeds maximum length', errorCode: 'url_too_long' };
  }

  let parsed: URL;
  try {
    parsed = new URL(rawUrl.trim());
  } catch {
    return { valid: false, reason: 'Malformed URL', errorCode: 'malformed_url' };
  }

  if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') {
    return {
      valid: false,
      reason: 'Only HTTP and HTTPS URLs are allowed',
      errorCode: 'unsupported_protocol',
    };
  }

  if (parsed.username || parsed.password) {
    return {
      valid: false,
      reason: 'URLs with embedded credentials are not allowed',
      errorCode: 'credentials_in_url',
    };
  }

  if (isBlockedHostname(parsed.hostname)) {
    return {
      valid: false,
      reason: 'URL host is not allowed for monitoring',
      errorCode: 'blocked_host',
    };
  }

  return { valid: true, normalizedUrl: parsed.toString() };
}
