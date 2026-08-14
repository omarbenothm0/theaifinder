import { Geist_Mono } from 'next/font/google';

/** Geist Mono — navbar CTA only. Nav links use Inter via --font-inter; logo uses Comfortaa separately. */
export const geistMonoNav = Geist_Mono({
  subsets: ['latin'],
  weight: ['500'],
  variable: '--font-nav-mono',
  display: 'swap',
});
