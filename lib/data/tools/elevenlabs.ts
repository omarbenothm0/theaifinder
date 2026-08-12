import { Tool } from '../../../types/tool';

export const elevenlabsTool: Tool = {
  id: 'tool-elevenlabs',
  name: 'ElevenLabs',
  slug: 'elevenlabs',
  logo: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=120&h=120&q=80',
  tagline: 'Human-like voice synthesis, instant voice cloning, and AI audio dubbing in 32 languages.',
  description: 'ElevenLabs delivers ultra-realistic speech synthesis with natural emotion, cadence, and inflection. Ideal for video creators, audiobook publishers, game developers, and localization teams.',
  categoryId: 'cat-voice',
  categoryName: 'Voice & Audio',
  tags: ['Voice Synthesis', 'Text to Speech', 'Voice Cloning'],
  pricingModel: 'Freemium',
  monthlyPrice: 5,
  hasFreeTrial: true,
  companyName: 'ElevenLabs',
  lastVerifiedDate: '2026-08-07',
  verifiedBy: 'AI Find Editorial Team',
  sources: [
    {
      type: 'pricing',
      url: 'https://elevenlabs.io/pricing',
      verifiedAt: '2026-08-07',
      notes: 'Verified ElevenLabs Free/Creator/Pro pricing plans from official pricing page.'
    },
    {
      type: 'features',
      url: 'https://elevenlabs.io',
      verifiedAt: '2026-08-07',
      notes: 'Confirmed voice cloning, dubbing, and commercial use capabilities on main site.'
    },
    {
      type: 'company',
      url: 'https://elevenlabs.io',
      verifiedAt: '2026-08-07',
      notes: 'Verified company ownership and platform details.'
    }
  ],
  pricingSource: 'https://elevenlabs.io/pricing',
  featureSource: 'https://elevenlabs.io',
  platforms: ['Web', 'iOS', 'Android', 'Windows', 'macOS'],
  pricingTiers: [
    {
      name: 'Free',
      price: 0,
      billingPeriod: 'monthly',
      features: ['3,000 characters/month', 'Basic voice generation', 'Community voices']
    },
    {
      name: 'Creator',
      price: 5,
      billingPeriod: 'monthly',
      features: ['300k characters/month', 'Voice cloning', 'Projects and API access']
    },
    {
      name: 'Pro',
      price: 22,
      billingPeriod: 'monthly',
      features: ['2M characters/month', 'Commercial voice usage', 'Advanced voice settings']
    }
  ],
  websiteUrl: 'https://elevenlabs.io',
  features: ['Instant & professional voice cloning', '32 language automatic dubbing', 'Voice design slider customization', 'Sound effects generation', 'Conversational AI voice agent API'],
  pros: ['Text-to-speech, voice cloning, and dubbing per official product pages', 'Preserves speaker voice identity across translations'],
  cons: ['Character limit tier quotas', 'Requires clear audio samples for quality voice clones'],
  rating: 0,
  reviewCount: 0,
  screenshots: ['https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=800&q=500'],
  alternatives: ['descript', 'suno-ai'],
  targetUsers: ['youtubers', 'content-creators', 'teachers'],
  verified: true,
  featured: true,
  trending: true,
  hasApi: true,
  hasMobileApp: true,
  hasExtension: false,
  createdAt: '2024-01-10T00:00:00.000Z',
  updatedAt: '2026-08-02T00:00:00.000Z'
};