/**
 * Single source of truth for the public site origin.
 * Configure via NEXT_PUBLIC_APP_URL (preferred) or APP_URL.
 */
const DEV_FALLBACK = 'http://localhost:3000';

function readConfiguredUrl(): string | undefined {
  const raw = process.env.NEXT_PUBLIC_APP_URL || process.env.APP_URL;
  const trimmed = raw?.trim();
  return trimmed || undefined;
}

function isLocalhostHostname(hostname: string): boolean {
  return hostname === 'localhost' || hostname === '127.0.0.1' || hostname === '[::1]';
}

/** Normalize to origin only — no path, query, hash, or trailing slash. */
export function normalizeSiteOrigin(url: string): string {
  let parsed: URL;
  try {
    parsed = new URL(url);
  } catch {
    throw new Error(`[SEO] Invalid site URL: "${url}". Use a full origin such as https://www.example.com`);
  }

  if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') {
    throw new Error(`[SEO] Invalid site URL protocol "${parsed.protocol}". Use http: or https:.`);
  }

  if (!parsed.hostname) {
    throw new Error(`[SEO] Invalid site URL: missing hostname in "${url}".`);
  }

  return parsed.origin;
}

export function getBaseUrl(): string {
  const configured = readConfiguredUrl();

  if (configured) {
    const origin = normalizeSiteOrigin(configured);
    if (process.env.NODE_ENV === 'production' && isLocalhostHostname(new URL(origin).hostname)) {
      throw new Error(
        '[SEO] NEXT_PUBLIC_APP_URL must not point to localhost in production. Set your public site origin.'
      );
    }
    return origin;
  }

  if (process.env.NODE_ENV === 'development' || !process.env.NODE_ENV) {
    return DEV_FALLBACK;
  }

  throw new Error(
    '[SEO] NEXT_PUBLIC_APP_URL (or APP_URL) is required in production. Example: https://www.example.com'
  );
}

export function absoluteUrl(path: string): string {
  const base = getBaseUrl();
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }
  return `${base}${path.startsWith('/') ? path : `/${path}`}`;
}

/** Hostname for display in OG images and footers (no protocol). */
export function getDisplayDomain(): string {
  return new URL(getBaseUrl()).hostname;
}
