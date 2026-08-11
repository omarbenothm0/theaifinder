/**
 * Single source of truth for the public site origin.
 * Configure production via NEXT_PUBLIC_APP_URL (or APP_URL).
 */
export function getBaseUrl(): string {
  const url =
    process.env.NEXT_PUBLIC_APP_URL ||
    process.env.APP_URL ||
    (process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : '');

  if (!url) {
    console.warn(
      '[SEO] NEXT_PUBLIC_APP_URL is not set. Set it to your production domain before deploying.'
    );
    return 'http://localhost:3000';
  }

  return url.replace(/\/+$/, '');
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
  try {
    return new URL(getBaseUrl()).hostname;
  } catch {
    return 'localhost';
  }
}
