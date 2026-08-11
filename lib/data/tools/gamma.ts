import { Tool } from '../../../types/tool';

export const gammaTool: Tool = {
  id: 'tool-gamma',
  name: 'Gamma App',
  slug: 'gamma',
  logo: 'https://images.unsplash.com/photo-1542744094-3a317272018a?auto=format&fit=crop&w=120&h=120&q=80',
  tagline: 'AI presentation generator for slide decks, web pages, and visual docs in minutes.',
  description: 'Gamma transforms text prompts, documents, or outlines into beautifully formatted presentation slide decks and interactive web documents with automated layout styling.',
  categoryId: 'cat-presentations',
  categoryName: 'Presentations & Decks',
  tags: ['Slide Decks', 'Presentations', 'Document Generator'],
  pricingModel: 'Freemium',
  monthlyPrice: 16,
  hasFreeTrial: true,
  companyName: 'Gamma',
  lastVerifiedDate: '2026-08-07',
  verifiedBy: 'AI Find Editorial Team',
  sources: [
    {
      type: 'pricing',
      url: 'https://gamma.app/pricing',
      verifiedAt: '2026-08-07',
      notes: 'Verified Free and Plus pricing tiers from Gamma official pricing page.'
    },
    {
      type: 'features',
      url: 'https://gamma.app',
      verifiedAt: '2026-08-07',
      notes: 'Confirmed AI deck creation and export features on Gamma landing page.'
    },
    {
      type: 'company',
      url: 'https://gamma.app',
      verifiedAt: '2026-08-07',
      notes: 'Verified company branding and platform ownership.'
    }
  ],
  pricingSource: 'https://gamma.app/pricing',
  featureSource: 'https://gamma.app',
  platforms: ['Web', 'iOS', 'Android'],
  pricingTiers: [
    {
      name: 'Free',
      price: 0,
      billingPeriod: 'monthly',
      features: ['Limited AI presentations', 'Basic templates', 'Public sharing']
    },
    {
      name: 'Plus',
      price: 16,
      billingPeriod: 'monthly',
      features: ['Unlimited decks', 'Advanced collaboration', 'Export tools']
    }
  ],
  websiteUrl: 'https://gamma.app',
  features: ['1-click prompt to slide deck', 'Interactive web embed cards', 'AI visual card restyling', 'Export to PDF & PowerPoint', 'Analytics viewer tracking'],
  pros: ['Saves hours on deck design', 'Responsive web layouts look great on mobile'],
  cons: ['Custom typography styling requires paid tier'],
  rating: 4.7,
  reviewCount: 1120,
  screenshots: ['https://images.unsplash.com/photo-1542744094-3a317272018a?auto=format&fit=crop&w=800&q=500'],
  alternatives: ['chatgpt', 'claude'],
  targetUsers: ['entrepreneurs', 'teachers', 'marketers', 'real-estate-agents', 'project-managers'],
  verified: true,
  featured: false,
  trending: true,
  hasApi: false,
  hasMobileApp: false,
  hasExtension: false,
  createdAt: '2024-04-01T00:00:00.000Z',
  updatedAt: '2026-07-28T00:00:00.000Z'
};