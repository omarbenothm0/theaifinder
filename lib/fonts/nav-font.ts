import { Geist_Mono } from 'next/font/google';

/** Geist Mono — headings, UI/display text, h1, h2, h3, section headers, card titles, and navbar CTA. */
export const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
  display: 'swap',
});

/** Legacy alias for navbar CTA only — kept for backward compatibility. */
export const geistMonoNav = geistMono;
