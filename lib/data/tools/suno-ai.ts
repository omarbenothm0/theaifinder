import { Tool } from '../../../types/tool';

export const sunoAiTool: Tool = {
  id: 'tool-suno-ai',
  name: 'Suno AI',
  slug: 'suno-ai',
  logo: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=120&h=120&q=80',
  tagline: 'Generative AI music engine creating full songs with vocals and instrumentation from text.',
  description: 'Suno AI allows anyone to generate full-length songs in any genre complete with realistic vocals, instruments, and lyrics based on simple prompts or custom lyrical inputs.',
  categoryId: 'cat-voice',
  categoryName: 'Voice & Speech',
  tags: ['Music Generation', 'Songs', 'Vocals', 'Audio'],
  pricingModel: 'Freemium',
  monthlyPrice: 10,
  hasFreeTrial: true,
  companyName: 'Suno AI',
  lastVerifiedDate: '2026-08-07',
  verifiedBy: 'AI Find Editorial Team',
  sources: [
    {
      type: 'pricing',
      url: 'https://suno.com/pricing',
      verifiedAt: '2026-08-07',
      notes: 'Verified Suno AI Free and Pro pricing structure from official pricing page.'
    },
    {
      type: 'features',
      url: 'https://suno.com',
      verifiedAt: '2026-08-07',
      notes: 'Confirmed text-to-song generation and export capabilities on official site.'
    },
    {
      type: 'company',
      url: 'https://suno.com',
      verifiedAt: '2026-08-07',
      notes: 'Verified Suno company and product branding.'
    }
  ],
  pricingSource: 'https://suno.com/pricing',
  featureSource: 'https://suno.com',
  platforms: ['Web', 'iOS', 'Android'],
  pricingTiers: [
    {
      name: 'Free',
      price: 0,
      billingPeriod: 'monthly',
      features: ['Song generation limits', 'Basic audio exports', 'Standard quality']
    },
    {
      name: 'Pro',
      price: 10,
      billingPeriod: 'monthly',
      features: ['Higher generation limits', 'Commercial use', 'Extended audio tools']
    }
  ],
  websiteUrl: 'https://suno.com',
  features: ['Text-to-song generation', 'Custom lyric input support', 'Genre & instrument blending', 'Stems export (Pro)', 'Audio extension tool'],
  pros: ['Surprisingly catch commercial-grade songs', 'Generates full instrumental and vocal harmony'],
  cons: ['Commercial licensing requires active paid plan'],
  rating: 0,
  reviewCount: 0,
  screenshots: ['https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=500'],
  alternatives: ['elevenlabs'],
  targetUsers: ['content-creators', 'youtubers', 'marketers'],
  verified: true,
  featured: false,
  trending: true,
  hasApi: false,
  hasMobileApp: true,
  hasExtension: false,
  createdAt: '2024-03-10T00:00:00.000Z',
  updatedAt: '2026-08-01T00:00:00.000Z'
};