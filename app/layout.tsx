import './globals.css';
import React from 'react';
import type { Metadata } from 'next';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { getBaseUrl } from '../lib/seo/base-url';
import { SITE_NAME, SITE_OG_NAME, siteRootTitle, SITE_HERO_TITLE } from '../lib/brand';

const BASE_URL = getBaseUrl();

export const metadata: Metadata = {
  title: siteRootTitle(),
  description:
    'Find the right AI tool for any task. Search, compare, and filter 100+ top-rated AI software for writing, coding, video, images, and productivity.',
  metadataBase: new URL(BASE_URL),
  openGraph: {
    title: `${SITE_NAME} - ${SITE_HERO_TITLE}`,
    description:
      'Find the right AI tool for any task. Search, compare, and filter 100+ top-rated AI software for writing, coding, video, images, and productivity.',
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
    description:
      'Find the right AI tool for any task. Search, compare, and filter 100+ top-rated AI software.',
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
      <body className="bg-slate-50 text-slate-900 min-h-screen flex flex-col antialiased">
        <Header />
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
