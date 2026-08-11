/**
 * Central public brand identity for TheRadarHub.
 * Import from here for all user-facing site name references.
 */
export const SITE_NAME = 'TheRadarHub';

/** Used in Open Graph metadata (og:site_name). */
export const SITE_OG_NAME = 'TheRadarHub';

/** Default badge label on dynamically generated OG images. */
export const SITE_OG_BADGE_DEFAULT = 'TheRadarHub';

/** Suffix appended to page titles, e.g. "Page Title | TheRadarHub". */
export const SITE_TITLE_SUFFIX = SITE_NAME;

/** Short homepage / marketing headline prefix. */
export const SITE_HERO_TITLE =
  'Discover, Compare & Choose the Best AI Tools';

export function sitePageTitle(pageTitle: string, includeYear = false): string {
  const year = includeYear ? ' (2026)' : '';
  return `${pageTitle}${year} | ${SITE_TITLE_SUFFIX}`;
}

export function siteRootTitle(includeYear = true): string {
  const year = includeYear ? ' (2026)' : '';
  return `${SITE_NAME} - ${SITE_HERO_TITLE}${year}`;
}
