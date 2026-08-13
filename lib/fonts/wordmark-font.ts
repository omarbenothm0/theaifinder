import { Comfortaa } from 'next/font/google';

/** Comfortaa — navbar wordmark only (not body text). */
export const comfortaaWordmark = Comfortaa({
  subsets: ['latin'],
  weight: ['600'],
  variable: '--font-wordmark',
  display: 'swap',
});
