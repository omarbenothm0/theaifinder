import './globals.css';
import React from 'react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { stackSansNotch } from '../lib/fonts/wordmark-font';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { getBaseUrl } from '../lib/seo/base-url';
import { SITE_NAME, SITE_OG_NAME, siteRootTitle, SITE_HERO_TITLE } from '../lib/brand';
import { SITE_DESCRIPTION, SITE_DESCRIPTION_SHORT } from '../lib/seo/site-copy';

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-inter',
});

const BASE_URL = getBaseUrl();

export const metadata: Metadata = {
  title: siteRootTitle(),
  description: SITE_DESCRIPTION,
  metadataBase: new URL(BASE_URL),
  openGraph: {
    title: `${SITE_NAME} - ${SITE_HERO_TITLE}`,
    description: SITE_DESCRIPTION,
    url: BASE_URL,
    siteName: SITE_OG_NAME,
    images: [
      {
        url: `${BASE_URL}/api/og?title=${encodeURIComponent(SITE_HERO_TITLE)}&type=default`,
        width: 1200,
        height: 630,
        alt: siteRootTitle(false),
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE_NAME} - ${SITE_HERO_TITLE}`,
    description: SITE_DESCRIPTION_SHORT,
    images: [`${BASE_URL}/api/og?title=${encodeURIComponent(SITE_HERO_TITLE)}&type=default`],
  },
  robots: {
    index: true,
    follow: true,
    'max-image-preview': 'large',
    'max-snippet': -1,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${stackSansNotch.variable} font-sans bg-background text-foreground min-h-screen flex flex-col antialiased`}>
        <Header />
        <main className="flex-1 w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
