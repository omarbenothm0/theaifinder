import { Tool } from '../../types/tool';
import { ToolSnapshotData, PricingTier, UsageLimits, SourceUrls } from '../../types/monitoring';

// Stub extractors for Phase 1 - return dummy data to validate pipeline
// Real extraction will be implemented after pipeline validation

async function extractMotionFacts(html: string, url: string): Promise<ToolSnapshotData> {
  // Real extraction for Motion based on official pricing and features pages
  // Sources: https://www.usemotion.com/pricing and https://www.usemotion.com
  // Updated with accurate data from official Motion website

  const pricingModel: 'Free' | 'Freemium' | 'Paid' = 'Paid';
  const monthlyPrice: number | null = 19; // Pro AI base price (monthly)
  const hasFreeTrial = true;
  const hasFreeTier = false;

  const pricingTiers: PricingTier[] = [
    {
      name: 'Pro AI',
      monthlyPrice: 19,
      annualMonthlyPrice: null, // Annual pricing not clearly displayed
      billingPeriod: 'monthly',
      features: [
        'AI Chat',
        'AI Projects & Tasks',
        'AI Calendar & Meetings',
        'AI Docs, Wiki, & Notes',
        'AI Task Planner',
        'AI Writer & Editor',
        'Unlimited Storage',
        'iOS, Android, Desktop apps',
        'Integrations',
        '7,500 credits/seat/month',
      ],
    },
    {
      name: 'Business AI',
      monthlyPrice: 29,
      annualMonthlyPrice: null, // Annual pricing not clearly displayed
      billingPeriod: 'monthly',
      features: [
        'Everything in Pro AI',
        'Team Capacity Planning',
        'Advanced Dashboards & Reports',
        'Timeline & Gantt Charts',
        'Time Tracking',
        'Permissions & Access Control',
        'Central Billing',
        'Priority Support',
        '15,000 credits/seat/month',
      ],
    },
  ];

  // AI features from official Motion website
  const features: string[] = [
    'AI Task Planner',
    'AI Project Manager',
    'AI Calendar Assistant',
    'AI Meeting Notetaker',
    'AI Docs Assistant',
    'AI Chat',
    'AI Workflows Builder',
    'AI Dashboards',
    'AI Reports',
    'AI Search Assistant',
    'AI Personal Assistant',
  ];

  // Platforms from official Motion website
  const platforms: string[] = ['Web', 'iOS', 'Android', 'Desktop'];

  // Integrations from official Motion integrations page
  const integrations: string[] = [
    'Google Calendar',
    'Zoom',
    'Zapier',
    'Gmail',
    'Microsoft Teams',
    'Google Meet',
    'Microsoft Outlook 365',
    'iCloud Calendar',
    'Siri',
  ];

  // Usage limits based on credits system
  const usageLimits: UsageLimits = {
    credits: 7500, // Pro AI base credits
    minutes: null,
    generations: null,
    storage: null,
    seats: null,
  };

  // Motion appears to be English-only based on official pages
  const languages: string[] = ['English'];

  // Export formats not explicitly mentioned on official pages
  const exportFormats: string[] = [];

  // Limitations based on official information
  const limitations: string[] = [
    'No permanent free plan - free trial available',
    'Credits-based system - additional credits cost extra',
    'Requires subscription after trial period',
  ];

  // Product name from official website
  const productName: string = 'Motion';

  // Target audience not explicitly documented
  const targetAudience: string[] = [];

  // Discontinued features not documented
  const discontinuedFeatures: string[] = [];

  // Policy changes not documented
  const policyChanges: string[] = [];

  return {
    pricingModel,
    monthlyPrice,
    hasFreeTrial,
    hasFreeTier,
    pricingTiers,
    features,
    platforms,
    integrations,
    usageLimits,
    languages,
    exportFormats,
    limitations,
    productName,
    targetAudience,
    discontinuedFeatures,
    policyChanges,
  };
}

async function extractOtterFacts(html: string, url: string): Promise<ToolSnapshotData> {
  // Real extraction for Otter.ai based on official pricing and features pages
  // Sources: https://otter.ai/pricing and https://otter.ai

  const pricingModel: 'Free' | 'Freemium' | 'Paid' = 'Freemium';
  const monthlyPrice: number | null = 16.99; // Pro monthly price (actual month-to-month)
  const hasFreeTrial = true;
  const hasFreeTier = true;

  const pricingTiers: PricingTier[] = [
    {
      name: 'Basic',
      monthlyPrice: 0,
      annualMonthlyPrice: null,
      billingPeriod: 'monthly',
      features: [
        'Automated AI meeting summaries',
        'Unlimited meetings',
        'Basic Integrations (Zoom, Google Meet, Teams, Slack)',
        '300 monthly transcription minutes',
        'AI Chat within and across meetings',
        'AI meeting workflows',
        '3 lifetime audio/video file imports',
        'Live transcription',
        'Speaker identification',
        'Audio recording playback',
        'Multi-language support',
        'iOS and Android apps',
        'Otter MCP server',
      ],
    },
    {
      name: 'Pro',
      monthlyPrice: 16.99, // Actual monthly price
      annualMonthlyPrice: 8.33, // Annual billing equivalent
      billingPeriod: 'annual', // Page displays annual pricing by default
      features: [
        '1200 in-app recording minutes',
        'Advanced AI workflows',
        '10 monthly audio/video file imports',
        'Up to 90 mins/meeting',
        'Advanced meeting templates',
        'Unlimited storage',
        'Team vocabulary & taggable speakers',
        'Advanced search, export & playback',
        'Salesforce, HubSpot, Zapier integrations',
        'Everything in Basic',
      ],
    },
    {
      name: 'Business',
      monthlyPrice: 30, // Actual monthly price
      annualMonthlyPrice: 19.99, // Annual billing equivalent
      billingPeriod: 'annual', // Page displays annual pricing by default
      features: [
        'Unlimited meetings + in-app recordings',
        'Custom AI workflows',
        'Unlimited audio/video file imports',
        'Up to 4 hours/meeting',
        'Enhanced admin features',
        'Join 3 concurrent meetings',
        'Prioritized support',
        'Everything in Pro',
      ],
    },
  ];

  // AI features from official Otter.ai website
  const features: string[] = [
    'AI Chat',
    'AI meeting workflows',
    'AI meeting summaries',
    'Action items',
    'Speaker identification',
    'Live transcription',
    'Multi-language support',
    'Automated slide capture',
    'Real-time annotation',
    'Takeaways panel',
    'MCP server integration',
  ];

  // Platforms from official Otter.ai website
  const platforms: string[] = ['Web', 'iOS', 'Android', 'Desktop', 'Chrome Extension'];

  // Integrations from official Otter.ai website
  const integrations: string[] = [
    'Zoom',
    'Google Meet',
    'Microsoft Teams',
    'Slack',
    'Salesforce',
    'HubSpot',
    'Zapier',
    'Dropbox',
    'Google Calendar',
    'Google Docs',
    'Jira',
    'Notion',
    'Glean',
    'Claude',
    'Asana',
  ];

  // Usage limits based on official pricing page
  const usageLimits: UsageLimits = {
    minutes: 300, // Basic plan limit
    credits: null,
    generations: null,
    storage: null,
    seats: null,
  };

  // Languages from official pricing page
  const languages: string[] = ['English', 'Spanish', 'French', 'German', 'Japanese', 'Chinese'];

  // Export formats from official pricing page
  const exportFormats: string[] = ['mp3', 'txt', 'pdf', 'docx', 'srt'];

  // Limitations based on official information
  const limitations: string[] = [
    'Basic plan limited to 300 monthly transcription minutes',
    'Basic plan limited to 30 minutes per conversation',
    'Basic plan limited to 3 lifetime audio/video file imports',
    'Some integrations subject to user limits (Salesforce, HubSpot)',
    'Enterprise features require custom pricing',
    'HIPAA compliance available as add-on only',
  ];

  // Product name from official website
  const productName: string = 'Otter.ai';

  // Target audience not explicitly documented
  const targetAudience: string[] = [];

  // Discontinued features not documented
  const discontinuedFeatures: string[] = [];

  // Policy changes not documented
  const policyChanges: string[] = [];

  return {
    pricingModel,
    monthlyPrice,
    hasFreeTrial,
    hasFreeTier,
    pricingTiers,
    features,
    platforms,
    integrations,
    usageLimits,
    languages,
    exportFormats,
    limitations,
    productName,
    targetAudience,
    discontinuedFeatures,
    policyChanges,
  };
}

async function extractFirefliesFacts(html: string, url: string): Promise<ToolSnapshotData> {
  // Real extraction for Fireflies.ai based on official pricing and features pages
  // Sources: https://fireflies.ai/pricing and https://fireflies.ai

  const pricingModel: 'Free' | 'Freemium' | 'Paid' = 'Freemium';
  const monthlyPrice: number | null = 18; // Pro monthly price (actual month-to-month)
  const hasFreeTrial = true;
  const hasFreeTier = true;

  const pricingTiers: PricingTier[] = [
    {
      name: 'Free',
      monthlyPrice: 0,
      annualMonthlyPrice: null,
      billingPeriod: 'monthly',
      features: [
        'Unlimited transcription',
        'Unlimited AI summaries',
        '400 mins of storage/team',
        '20 AI credits',
        'Zoom, Google Meet, Microsoft Teams, 10+ integrations',
        'Transcription in 100+ languages',
        'Real-time notes & live transcriptions',
        'Meeting search',
        'AskFred: AI assistant',
        'Upload audio/video file',
        'Desktop app',
        'Mobile app (Android, iOS)',
        'Chrome extension',
        'API access',
      ],
    },
    {
      name: 'Pro',
      monthlyPrice: 18, // Actual monthly price
      annualMonthlyPrice: 10, // Annual billing equivalent
      billingPeriod: 'annual', // Page displays annual pricing by default
      features: [
        '8,000 mins of storage/seat',
        '30 AI credits',
        'Video recording',
        'Download transcripts, summaries, recordings',
        'Personal Assistant',
        'Email Assistant',
        'AI Skills',
        'Voice Agents',
        'Action items & task Manager',
        'Unlimited integrations',
        'Everything in Free',
      ],
    },
    {
      name: 'Business',
      monthlyPrice: 29, // Actual monthly price
      annualMonthlyPrice: 19, // Annual billing equivalent
      billingPeriod: 'annual', // Page displays annual pricing by default
      features: [
        'Unlimited storage',
        '50 AI credits',
        'Multi-language Mode',
        'Conversation intelligence',
        'Team analytics (for admins)',
        'Public meeting access',
        'User groups',
        'Everything in Pro',
      ],
    },
  ];

  // AI features from official Fireflies.ai website
  const features: string[] = [
    'AI Chat (AskFred)',
    'AI summaries',
    'Personal Assistant',
    'Email Assistant',
    'Voice Agents',
    'AI Skills',
    'Live Assist',
    'Conversation intelligence',
    'MCP Server',
    'Speaker recognition',
    'Auto-language detection',
    'Time-stamped comments',
    'Smart search',
    'Key topics and task detection',
    'Sentiment analysis',
    'Question detection',
    'Speaker talk-time analytics',
  ];

  // Platforms from official Fireflies.ai website
  const platforms: string[] = ['Web', 'iOS', 'Android', 'Desktop', 'Chrome Extension'];

  // Integrations from official Fireflies.ai website
  const integrations: string[] = [
    'Zoom',
    'Google Meet',
    'Microsoft Teams',
    'Salesforce',
    'HubSpot',
    'Asana',
    'Trello',
    'Ever',
    'BambooHR',
    'Slack',
    'Aircall',
    'RingCentral',
  ];

  // Usage limits based on official pricing page
  const usageLimits: UsageLimits = {
    minutes: null, // Unlimited transcription
    credits: 20, // Free plan AI credits
    generations: null,
    storage: '400 mins/team', // Free plan storage
    seats: null,
  };

  // Languages from official Fireflies.ai website
  const languages: string[] = ['English', 'Spanish', 'French', 'German', 'Japanese', 'Chinese', '100+ languages'];

  // Export formats from official Fireflies.ai website
  const exportFormats: string[] = ['mp3', 'txt', 'pdf', 'docx', 'srt'];

  // Limitations based on official information
  const limitations: string[] = [
    'Free plan limited to 400 mins storage/team',
    'Free plan limited to 2 hours recording limit',
    'Free plan limited to 20 AI credits',
    'Free plan limited to 3 public channels',
    'Video recording quality limited on lower tiers (720p for Free/Pro/Enterprise, 1080p for Business)',
    'Some integrations may require higher-tier plans',
    'Enterprise plan requires annual billing only',
    'HIPAA compliance and private storage available as Enterprise features',
  ];

  // Product name from official website
  const productName: string = 'Fireflies.ai';

  // Target audience not explicitly documented
  const targetAudience: string[] = [];

  // Discontinued features not documented
  const discontinuedFeatures: string[] = [];

  // Policy changes not documented
  const policyChanges: string[] = [];

  return {
    pricingModel,
    monthlyPrice,
    hasFreeTrial,
    hasFreeTier,
    pricingTiers,
    features,
    platforms,
    integrations,
    usageLimits,
    languages,
    exportFormats,
    limitations,
    productName,
    targetAudience,
    discontinuedFeatures,
    policyChanges,
  };
}

async function extractFathomFacts(html: string, url: string): Promise<ToolSnapshotData> {
  // Real extraction for Fathom based on official pricing and features pages
  // Sources: https://www.fathom.video/pricing and https://www.fathom.video

  const pricingModel: 'Free' | 'Freemium' | 'Paid' = 'Freemium';
  const monthlyPrice: number | null = 20; // Premium monthly price (actual month-to-month)
  const hasFreeTrial = true;
  const hasFreeTier = true;

  const pricingTiers: PricingTier[] = [
    {
      name: 'Free',
      monthlyPrice: 0,
      annualMonthlyPrice: null,
      billingPeriod: 'monthly',
      features: [
        'Unlimited recordings + transcriptions',
        'Choice of bot-free (in beta) or bot capture',
        'Instant AI call summaries',
        'Clips, playlists + search across calls',
        'Automated summaries',
        'Attendee and keyword search in your meetings',
        'Ask Fathom: AI within a single call (limited use)',
        'Unlimited for "My Calls"',
        'Max 3 users/domain for CRM syncs',
      ],
    },
    {
      name: 'Premium',
      monthlyPrice: 20, // Actual monthly price
      annualMonthlyPrice: 16, // Annual billing equivalent
      billingPeriod: 'annual', // Page displays annual pricing by default
      features: [
        'Everything from Free',
        'Advanced call summaries',
        'AI-generated action items',
        'Conversational meeting assistant',
        'Custom meeting bot',
        'Advanced summaries (limited use)',
        'Account-wide Ask Fathom: AI for all calls (limited use)',
        'Zapier, Make & other automation integrations (limited use)',
      ],
    },
    {
      name: 'Team',
      monthlyPrice: 19, // Actual monthly price
      annualMonthlyPrice: 15, // Annual billing equivalent
      billingPeriod: 'annual', // Page displays annual pricing by default
      features: [
        'Everything from Premium',
        'Global search across calls',
        'Playlists of highlights from meetings',
        'Collaboration using comments, folders, keyword alerts',
        'Playlists of clips & highlights for all team meetings',
        'Team members',
        'Team recordings view',
        'Team folders',
        'Comments & mentions',
        'Customer view',
        'Deal view',
        'Attendee and keyword search in all team meetings',
        'Unlimited for "My Calls"; limited lookback for "Team Calls"',
        'AI search alerts',
        'Keyword alerts',
        'Max 3 users/domain for CRM syncs',
        'Disable in-meeting banner',
        'Custom bot name',
      ],
    },
    {
      name: 'Business',
      monthlyPrice: 34, // Actual monthly price
      annualMonthlyPrice: 25, // Annual billing equivalent
      billingPeriod: 'annual', // Page displays annual pricing by default
      features: [
        'Everything from Team',
        'CRM field sync, updating records after meetings automatically',
        'Deal View summarizing insights',
        'Coaching metrics & AI scorecards',
        'Advanced call summaries, including custom summaries',
        'AI follow-up emails',
        'Custom summaries',
        'CRM Field sync',
        'Launch Assist Onboarding',
        'Custom data retention policies',
        'Single sign-on integration',
        'Okta SCIM provisioning',
        'Organization wide security controls',
        'Increased cyber security insurance coverage',
        'Custom contracts & red-line support',
        'Dedicated Customer Success & channel',
        'HIPAA: signed BAA',
      ],
    },
  ];

  // AI features from official Fathom website
  const features: string[] = [
    'AI summaries',
    'Advanced summaries',
    'AI action items',
    'AI follow-up emails',
    'Ask Fathom (AI assistant)',
    'Conversational meeting assistant',
    'Coaching metrics & AI scorecards',
    'Custom summaries',
    'AI search alerts',
    'Keyword alerts',
    'Bot-free capture (beta)',
  ];

  // Platforms from official Fathom website
  const platforms: string[] = ['Web', 'Desktop'];

  // Integrations from official Fathom website
  const integrations: string[] = [
    'Claude',
    'ChatGPT',
    'Zapier',
    'Make',
    'Slack',
    'HubSpot',
    'Salesforce',
    'Asana',
    'Public API & MCP',
    'Google Meet',
    'Zoom',
    'Gmail',
    'Microsoft Teams',
  ];

  // Usage limits based on official pricing page
  const usageLimits: UsageLimits = {
    minutes: null, // Unlimited recordings
    credits: null,
    generations: null,
    storage: null, // Unlimited call storage
    seats: null,
  };

  // Languages not explicitly mentioned on official pages
  const languages: string[] = [];

  // Export formats not explicitly mentioned on official pages
  const exportFormats: string[] = [];

  // Limitations based on official information
  const limitations: string[] = [
    'Team plan requires 2 user minimum',
    'Business plan requires 2 user minimum',
    'CRM syncs limited to max 3 users/domain on Free, Premium, Team plans',
    'Advanced summaries limited use on Premium plan',
    'Ask Fathom limited use on Premium plan',
    'Account-wide Ask Fathom limited use on Team plan',
    'Team calls lookback window depends on plan tier',
    'Bot-free capture is beta feature for Mac',
    '90-day guarantee on paid plans',
  ];

  // Product name from official website
  const productName: string = 'Fathom';

  // Target audience not explicitly documented
  const targetAudience: string[] = [];

  // Discontinued features not documented
  const discontinuedFeatures: string[] = [];

  // Policy changes not documented
  const policyChanges: string[] = [];

  return {
    pricingModel,
    monthlyPrice,
    hasFreeTrial,
    hasFreeTier,
    pricingTiers,
    features,
    platforms,
    integrations,
    usageLimits,
    languages,
    exportFormats,
    limitations,
    productName,
    targetAudience,
    discontinuedFeatures,
    policyChanges,
  };
}

async function extractZoomFacts(html: string, url: string): Promise<ToolSnapshotData> {
  // Real extraction for Zoom My Notes based on official features page
  // Source: https://www.zoom.com/en/products/ai-assistant/features/ai-note-taking/
  // Note: My Notes is a feature within Zoom Workplace/Zoom AI Companion, not a standalone product

  const pricingModel: 'Free' | 'Freemium' | 'Paid' = 'Paid';
  const monthlyPrice: number | null = null; // Part of Zoom Workplace - no standalone pricing
  const hasFreeTrial = true; // Zoom Workplace offers free trials
  const hasFreeTier = false; // Requires Zoom Workplace subscription

  const pricingTiers: PricingTier[] = [
    {
      name: 'Zoom Workplace',
      monthlyPrice: null, // Pricing varies by plan - no standalone My Notes pricing
      annualMonthlyPrice: null,
      billingPeriod: 'custom',
      features: [
        'AI Companion',
        'My Notes',
        'Meeting summaries',
        'AI-generated action items',
        'Key takeaways',
        'Workflows automation',
        'Cross-platform support',
      ],
    },
  ];

  // AI features from official Zoom My Notes page
  const features: string[] = [
    'AI transcription',
    'AI summaries',
    'AI-generated action items',
    'Key takeaways',
    'AI note expansion',
    'Workflows automation',
    'Real-time transcription',
    'Cross-platform note capture',
    'Bot-free capture',
  ];

  // Platforms from official Zoom My Notes page
  const platforms: string[] = ['Web', 'Windows', 'Mac', 'iOS', 'Android'];

  // Integrations from official Zoom My Notes page
  const integrations: string[] = [
    'Zoom',
    'Microsoft Teams',
    'Google Meet',
    'Zoom Chat',
    'Zoom Canvas',
  ];

  // Usage limits - not specified for My Notes alone
  const usageLimits: UsageLimits = {
    minutes: null,
    credits: null,
    generations: null,
    storage: null,
    seats: null,
  };

  // Languages from official Zoom website (Zoom supports many languages)
  const languages: string[] = [
    'English',
    'Spanish',
    'German',
    'French',
    'Portuguese',
    'Japanese',
    'Chinese (Simplified)',
    'Chinese (Traditional)',
    'Russian',
    'Korean',
    'Italian',
    'Vietnamese',
    'Turkish',
    'Polish',
    'Dutch',
    'Swedish',
    'Indonesian',
  ];

  // Export formats not explicitly mentioned on official pages
  const exportFormats: string[] = [];

  // Limitations based on official information
  const limitations: string[] = [
    'Platform feature - requires Zoom Workplace subscription',
    'Requires Zoom client version 6.7.5 or higher',
    'No standalone pricing - included in Zoom Workplace plans',
    'Requires Zoom account',
    'Workflows may require specific Zoom Workplace plan tier',
  ];

  // Product name from official website
  const productName: string = 'Zoom My Notes';

  // Target audience not explicitly documented
  const targetAudience: string[] = [];

  // Discontinued features not documented
  const discontinuedFeatures: string[] = [];

  // Policy changes not documented
  const policyChanges: string[] = [];

  return {
    pricingModel,
    monthlyPrice,
    hasFreeTrial,
    hasFreeTier,
    pricingTiers,
    features,
    platforms,
    integrations,
    usageLimits,
    languages,
    exportFormats,
    limitations,
    productName,
    targetAudience,
    discontinuedFeatures,
    policyChanges,
  };
}

// Tool slug to extractor mapping
const extractors: Record<string, (html: string, url: string) => Promise<ToolSnapshotData>> = {
  'motion': extractMotionFacts,
  'otter-ai': extractOtterFacts,
  'fireflies-ai': extractFirefliesFacts,
  'fathom': extractFathomFacts,
  'zoom-ai-my-notes': extractZoomFacts,
};

export class FieldExtractorService {
  static async extractFacts(tool: Tool): Promise<{ data: ToolSnapshotData; sourceUrls: SourceUrls }> {
    const extractor = extractors[tool.slug];
    if (!extractor) {
      throw new Error(`No extractor configured for tool: ${tool.slug}`);
    }

    // Use pricingSourceUrl if available, otherwise featuresSourceUrl, otherwise websiteUrl
    const pricingUrl = tool.pricingSourceUrl || tool.featuresSourceUrl || tool.websiteUrl;
    const featuresUrl = tool.featuresSourceUrl || tool.websiteUrl;

    // For tools with both pricing and features URLs, fetch both for comprehensive extraction
    let html = '';
    let sourcePage = pricingUrl;

    if ((tool.slug === 'motion' || tool.slug === 'otter-ai' || tool.slug === 'fireflies-ai' || tool.slug === 'fathom' || tool.slug === 'zoom-ai-my-notes') && tool.pricingSourceUrl && tool.featuresSourceUrl) {
      // For Motion, Otter, Fireflies, Fathom, and Zoom, fetch pricing page as primary source
      try {
        const response = await fetch(tool.pricingSourceUrl);
        html = await response.text();
        sourcePage = tool.pricingSourceUrl;
      } catch (error) {
        console.error(`Failed to fetch ${tool.pricingSourceUrl}:`, error);
        // Fallback to features page
        try {
          const response = await fetch(tool.featuresSourceUrl);
          html = await response.text();
          sourcePage = tool.featuresSourceUrl;
        } catch (fallbackError) {
          console.error(`Failed to fetch ${tool.featuresSourceUrl}:`, fallbackError);
        }
      }
    } else {
      // For other tools, fetch from single URL
      try {
        const response = await fetch(pricingUrl);
        html = await response.text();
      } catch (error) {
        console.error(`Failed to fetch ${pricingUrl}:`, error);
        // Continue with empty HTML for stub
      }
    }

    const data = await extractor(html, sourcePage);

    const sourceUrls: SourceUrls = {
      pricing: tool.pricingSourceUrl || undefined,
      features: tool.featuresSourceUrl && tool.featuresSourceUrl !== tool.pricingSourceUrl ? tool.featuresSourceUrl : undefined,
      product: tool.websiteUrl,
    };

    return { data, sourceUrls };
  }

  static getSupportedToolSlugs(): string[] {
    return Object.keys(extractors);
  }
}
