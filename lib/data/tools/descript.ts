import { Tool } from '../../../types/tool';
import { resolveToolLogo } from '../tool-logos';

export const descriptTool: Tool = {
  id: 'tool-descript',
  name: 'Descript',
  slug: 'descript',
  logo: resolveToolLogo('descript'),
  tagline: 'All-in-one AI video and audio editing app that works like editing a text document.',
  description: 'Descript simplifies podcasting and video production. Edit audio and video by simply deleting or rewriting transcript text. Features studio sound enhancement, filler word removal, and eye-contact correction.',
  categoryId: 'cat-video',
  categoryName: 'Video & Motion',
  tags: ['Podcast Editing', 'Transcription', 'Studio Sound', 'Video'],
  pricingModel: 'Freemium',
  monthlyPrice: 12,
  hasFreeTrial: true,
  companyName: 'Descript',
  lastVerifiedDate: '2026-08-07',
  verifiedBy: 'AI Find Editorial Team',
  sources: [
    {
      type: 'pricing',
      url: 'https://www.descript.com/pricing',
      verifiedAt: '2026-08-07',
      notes: 'Verified Descript subscription tiers and feature limits from the official pricing page.'
    },
    {
      type: 'features',
      url: 'https://www.descript.com',
      verifiedAt: '2026-08-07',
      notes: 'Confirmed video/audio editing, overdub, and transcription capabilities from product homepage.'
    },
    {
      type: 'company',
      url: 'https://www.descript.com',
      verifiedAt: '2026-08-07',
      notes: 'Verified company identity and service branding.'
    }
  ],
  pricingSource: 'https://www.descript.com/pricing',
  featureSource: 'https://www.descript.com',
  platforms: ['Web', 'Windows', 'macOS', 'iOS', 'Android'],
  pricingTiers: [
    {
      name: 'Free',
      price: 0,
      billingPeriod: 'monthly',
      features: ['Basic editing', 'Limited transcription', 'Watermark-free exports']
    },
    {
      name: 'Creator',
      price: 12,
      billingPeriod: 'monthly',
      features: ['Unlimited transcription', 'AI features', 'Advanced editing tools']
    },
    {
      name: 'Pro',
      price: 24,
      billingPeriod: 'monthly',
      features: ['More transcription minutes', 'Team collaboration', 'Advanced AI tools']
    }
  ],
  websiteUrl: 'https://descript.com',
  features: ['Text-based video & audio editing', 'Studio Sound 1-click enhancement', 'Filler word removal ("um", "uh")', 'AI voice Overdub model', 'Automatic speaker identification'],
  pros: ['Edit video and audio by editing transcript text', 'Studio Sound and filler-word removal per official features'],
  cons: ['Export processing can be resource intensive'],
  rating: 0,
  reviewCount: 0,
  screenshots: ['https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=800&q=500'],
  alternatives: ['elevenlabs', 'runway'],
  targetUsers: ['youtubers', 'content-creators', 'teachers'],
  verified: true,
  featured: true,
  trending: false,
  hasApi: true,
  hasMobileApp: false,
  hasExtension: false,
  createdAt: '2024-02-20T00:00:00.000Z',
  updatedAt: '2026-07-30T00:00:00.000Z'
};