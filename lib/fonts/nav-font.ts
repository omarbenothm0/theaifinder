import { Geist } from 'next/font/google';

/** Geist — navbar UI only (links, search, CTA). Logo uses Stack Sans Notch separately. */
export const geistNav = Geist({
  subsets: ['latin'],
  weight: ['500'],
  variable: '--font-nav',
  display: 'swap',
});
