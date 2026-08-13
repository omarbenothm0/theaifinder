import { Geist } from 'next/font/google';

/** Geist — navbar UI only (links, search, CTA). Logo uses Comfortaa separately. */
export const geistNav = Geist({
  subsets: ['latin'],
  weight: ['500'],
  variable: '--font-nav',
  display: 'swap',
});
