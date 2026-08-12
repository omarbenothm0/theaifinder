import { Category } from '../../types/tool';

export const CAT_VOICE = 'cat-voice';

export const VOICE_SECTIONS = [
  {
    slug: 'voice-speech-synthesis',
    title: 'Voice & Speech Synthesis',
    description:
      'Text-to-speech, voice cloning, and dubbing for narrations, explainers, and localization. ElevenLabs generates spoken audio from text or cloned voices — it is not a full song composer with instrumentation.',
    toolSlugs: ['elevenlabs'],
  },
  {
    slug: 'ai-music-generation',
    title: 'AI Music Generation',
    description:
      'Prompt-driven song creation with vocals, lyrics, and instrumentation. Suno AI produces complete music tracks from text — a different workflow from narrated speech or dubbing in ElevenLabs.',
    toolSlugs: ['suno-ai'],
  },
] as const;

export const VOICE_CATEGORY: Category = {
  id: CAT_VOICE,
  name: 'Voice & Audio',
  slug: 'voice',
  iconName: 'Mic',
  description:
    'Two curated tools split by intent — spoken voice synthesis (ElevenLabs) and AI music generation (Suno) — with clear boundaries vs Video & Motion editing workflows.',
  longDescription:
    'This category separates two audio jobs: ElevenLabs for text-to-speech, voice cloning, and dubbing, and Suno AI for generating full songs with vocals and instruments from prompts. Podcast and video editing with transcript-based audio cleanup lives under Video & Motion (Descript), not here.',
  toolCount: 0,
  faqs: [
    {
      question: 'What is the difference between ElevenLabs and Suno AI?',
      answer:
        'ElevenLabs (elevenlabs.io) focuses on spoken audio — text-to-speech, voice cloning, dubbing, and narration workflows with character-based pricing per official plans. Suno AI (suno.com) generates complete songs with vocals, lyrics, and instrumentation from text prompts. Use ElevenLabs when you need a voiceover or dubbed speech; use Suno when the deliverable is a music track or jingle.',
    },
    {
      question: 'Is Suno a text-to-speech or voice-cloning tool?',
      answer:
        'No. Suno is primarily a music-generation platform that can include AI vocals inside songs — not a dedicated TTS engine, dubbing suite, or professional voice-clone workflow like ElevenLabs. If your project needs narrated speech, start with ElevenLabs on this page; if you need background music or a full song, start with Suno.',
    },
    {
      question: 'When should I use ElevenLabs instead of Descript?',
      answer:
        'ElevenLabs fits standalone voice generation — narrations, cloned voices, multilingual dubbing, and API-driven speech output. Descript (on /category/video) is a video and podcast editor where you refine audio inside transcript-based timelines with studio-sound cleanup and filler-word removal. Many creators generate voiceovers in ElevenLabs and edit final video or podcast episodes in Descript.',
    },
    {
      question: 'Which of these tools offer free tiers?',
      answer:
        'Per our verified catalog data: ElevenLabs has a free tier with monthly character limits (elevenlabs.io/pricing). Suno offers a free plan with generation limits and paid Pro features (suno.com/pricing). Commercial usage terms differ by vendor and tier — confirm current licensing on each site before publishing client work.',
    },
    {
      question: 'Where should creators look for related audio and video workflows?',
      answer:
        'Video editing, podcast production, and transcript-based audio cleanup: /category/video (Runway, Descript). Marketing copy and social campaigns that pair with voiceovers: /for/marketers. This category lists the core voice and music generators — combine them with video tools when the final deliverable is an edited episode or clip.',
    },
  ],
  seoTitle: 'AI Voice & Audio Tools (2026)',
  seoDescription:
    'Curated ElevenLabs for voice synthesis and Suno for AI music generation — with clear intent boundaries vs Video & Motion editing workflows.',
};
