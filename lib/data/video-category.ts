import { Category } from '../../types/tool';

export const CAT_VIDEO = 'cat-video';

export const VIDEO_SECTIONS = [
  {
    slug: 'ai-video-generation',
    title: 'AI Video Generation',
    description:
      'Text-to-video and image-to-video generation with motion controls — Runway Gen-3 for new clips, b-roll, and visual effects. Runway creates footage from prompts; it is not a transcript-based podcast editor or long-form timeline suite.',
    toolSlugs: ['runway'],
  },
  {
    slug: 'ai-video-editing-podcast',
    title: 'AI Video Editing & Podcast Workflows',
    description:
      'Transcript-driven video and audio editing, studio-sound cleanup, and filler-word removal — Descript for polishing recorded episodes and screen captures. Descript edits existing media; it is not a standalone text-to-video generator like Runway.',
    toolSlugs: ['descript'],
  },
] as const;

export const VIDEO_CATEGORY: Category = {
  id: CAT_VIDEO,
  name: 'Video & Motion',
  slug: 'video',
  iconName: 'Video',
  description:
    'Two curated tools split by intent — generative video (Runway) and transcript-based editing (Descript) — with clear boundaries vs Voice & Audio and Image categories.',
  longDescription:
    'This category covers two different video jobs: Runway Gen-3 for generating new video clips from text or image prompts, and Descript for editing recorded video and podcasts via transcripts with AI audio cleanup. Voice synthesis (ElevenLabs) and music generation (Suno) live under Voice & Audio; static visuals under Image & Design.',
  toolCount: 0,
  faqs: [
    {
      question: 'What is the difference between Runway and Descript?',
      answer:
        'Runway (runwayml.com) generates new video from text or image prompts — useful for b-roll, motion clips, and creative visual effects per official Gen-3 product pages. Descript (descript.com) edits existing video and audio through a transcript timeline, with studio-sound enhancement, filler-word removal, and eye-contact tools. Most creators use Runway when they need generated footage and Descript when they need to polish a recorded episode or screen capture.',
    },
    {
      question: 'Is Runway a video editor like Descript?',
      answer:
        'Not in the same sense. Runway is primarily a generative video platform for creating clips from prompts with motion and camera controls — not a full podcast or long-form editing timeline built around transcript editing. Descript is built for editing captured media. They complement each other: generate clips in Runway, assemble and refine in Descript.',
    },
    {
      question: 'When does Descript make more sense than Runway?',
      answer:
        'Choose Descript when you already have recorded video or audio — interviews, podcasts, webinars, or screen recordings — and need transcript-based cuts, studio sound, or filler-word cleanup. Choose Runway when the job is creating new motion footage from a prompt rather than editing an existing recording.',
    },
    {
      question: 'Which of these tools offer free access?',
      answer:
        'Per our verified catalog data: Runway offers a free tier with trial credits and limited exports (runwayml.com/pricing). Descript has a free plan with basic editing and transcription limits (descript.com/pricing). Paid tiers unlock higher export quality, credits, and commercial features per each vendor site — confirm current limits before production use.',
    },
    {
      question: 'Where should I look for related voice, image, and marketing workflows?',
      answer:
        'Voiceovers and music: /category/voice (ElevenLabs for speech, Suno for songs). Static visuals and social design: /category/image. Marketing campaigns that pair with video assets: /for/marketers and /category/marketing. Many teams generate voice in ElevenLabs, visuals in Image tools, clips in Runway, and final edits in Descript.',
    },
  ],
  seoTitle: 'AI Video & Motion Tools (2026)',
  seoDescription:
    'Curated Runway for AI video generation and Descript for transcript-based editing — with clear intent boundaries vs Voice & Audio and Image categories.',
};
