const configuredSiteUrl = process.env.APP_URL || process.env.NEXT_PUBLIC_APP_URL || 'https://aifind.io';

export const SITE_URL = configuredSiteUrl.replace(/\/$/, '');

export function siteUrl(path = ''): string {
  return `${SITE_URL}${path.startsWith('/') || path === '' ? path : `/${path}`}`;
}
