import localFont from 'next/font/local';

/** Stack Sans Notch — wordmark only (not body text). Variable weight 200–700. */
export const stackSansNotch = localFont({
  src: '../../assets/fonts/stack-sans-notch-latin-wght-normal.woff2',
  variable: '--font-wordmark',
  weight: '200 700',
  display: 'swap',
  adjustFontFallback: false,
});
