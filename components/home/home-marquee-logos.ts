import { HOME_MARQUEE_LOGOS, type HomeMarqueeLogo } from '../../lib/data/tool-logos';

/** Curated, deduplicated logos for the homepage trusted strip. */
function buildMarqueeLogos(): HomeMarqueeLogo[] {
  const seen = new Set<string>();
  return HOME_MARQUEE_LOGOS.filter((item) => {
    if (seen.has(item.slug)) return false;
    seen.add(item.slug);
    return true;
  });
}

export { buildMarqueeLogos, HOME_MARQUEE_LOGOS };
export type { HomeMarqueeLogo };
