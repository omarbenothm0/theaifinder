import './globals.css';
import React from 'react';
import type { Metadata } from 'next';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || process.env.APP_URL || 'https://aifind.io';

export const metadata: Metadata = {
  title: 'AIFind - Discover, Compare & Choose the Best AI Tools (2026)',
  description: 'Find the right AI tool for any task. Search, compare, and filter 100+ top-rated AI software for writing, coding, video, images, and productivity.',
  metadataBase: new URL(BASE_URL),
  alternates: {
    canonical: BASE_URL,
  },
  openGraph: {
    title: 'AIFind - Discover, Compare & Choose the Best AI Tools',
    description: 'Find the right AI tool for any task. Search, compare, and filter 100+ top-rated AI software for writing, coding, video, images, and productivity.',
    url: BASE_URL,
    siteName: 'AIFind Discovery Platform',
    images: [
      {
        url: `${BASE_URL}/api/og?title=Discover,%20Compare%20%26%20Choose%20the%20Best%20AI%20Tools&type=default`,
        width: 1200,
        height: 630,
        alt: 'AIFind - Discover, Compare & Choose the Best AI Tools',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AIFind - Discover, Compare & Choose the Best AI Tools',
    description: 'Find the right AI tool for any task. Search, compare, and filter 100+ top-rated AI software.',
    images: [`${BASE_URL}/api/og?title=Discover,%20Compare%20%26%20Choose%20the%20Best%20AI%20Tools&type=default`],
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
