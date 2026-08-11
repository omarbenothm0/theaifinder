import { Comparison } from '../../types/tool';

/** Curated PM cluster head-to-head comparisons (verified tool pairs from research). */
export const PM_COMPARISONS: Comparison[] = [
  {
    id: 'comp-otter-vs-fireflies',
    slug: 'otter-ai-vs-fireflies-ai',
    tool1Slug: 'otter-ai',
    tool2Slug: 'fireflies-ai',
    title: 'Otter.ai vs Fireflies.ai: Best AI Meeting Notes for Project Managers (2026)',
    overview:
      'Comparing Otter.ai and Fireflies.ai for PM meeting capture — transcription, AI summaries, action items, and integrations with project tools.',
    bestFor1: 'Teams wanting polished summaries, OtterPilot auto-join, and strong Zoom/Meet/Teams coverage.',
    bestFor2: 'Teams needing 100+ language support, CRM sync, and AskFred Q&A on meeting transcripts.',
    verdict:
      'Both are strong verified meeting notetakers. Choose Otter.ai for streamlined PM action-item workflows; choose Fireflies.ai for broader language support and CRM-heavy sales/ops stacks.',
    winnerSlug: 'tie',
    featureBreakdown: [
      { feature: 'Live Transcription', tool1Value: 'Yes — Zoom, Meet, Teams', tool2Value: 'Yes — major platforms', winnerSlug: 'tie' },
      { feature: 'AI Summaries & Action Items', tool1Value: 'Yes — official product pages', tool2Value: 'Yes — official product pages', winnerSlug: 'tie' },
      { feature: 'Language Support', tool1Value: 'English-focused', tool2Value: '100+ languages cited', winnerSlug: 'fireflies-ai' },
      { feature: 'Free Tier', tool1Value: 'Freemium with minute caps', tool2Value: 'Freemium with storage limits', winnerSlug: 'tie' },
      { feature: 'Starting Price', tool1Value: '~$8.33/mo (official pricing)', tool2Value: '~$10/mo (official pricing)', winnerSlug: 'otter-ai' },
    ],
  },
  {
    id: 'comp-clickup-vs-asana',
    slug: 'clickup-brain-vs-asana-ai',
    tool1Slug: 'clickup-brain',
    tool2Slug: 'asana-ai',
    title: 'ClickUp Brain vs Asana AI: Best AI Task & Project Planning Tools (2026)',
    overview:
      'Head-to-head for PM task management and AI project planning — Brain² vs Asana AI Teammates, Dash, and official AI project plan templates.',
    bestFor1: 'Teams wanting all-in-one workspace AI — tasks, Gantt, goals, and multi-model Brain chat.',
    bestFor2: 'Teams prioritizing AI Teammates, AI Studio automation, and official milestone/dependency plan templates.',
    verdict:
      'ClickUp Brain suits teams consolidating PM + docs + AI in one platform. Asana AI excels when your org already runs on Asana timelines and wants official AI plan generation templates.',
    winnerSlug: 'tie',
    featureBreakdown: [
      { feature: 'AI Task Prioritization', tool1Value: 'Assign & Prioritize (Brain²)', tool2Value: 'Asana Dash daily priorities', winnerSlug: 'tie' },
      { feature: 'AI Project Planning', tool1Value: 'AI Projects, Gantt, Goals', tool2Value: 'Official AI project plan template', winnerSlug: 'tie' },
      { feature: 'AI Agents / Teammates', tool1Value: 'Brain agents & orchestration', tool2Value: 'AI Teammates & AI Studio', winnerSlug: 'tie' },
      { feature: 'API Access', tool1Value: 'Yes', tool2Value: 'Yes', winnerSlug: 'tie' },
      { feature: 'Starting Price', tool1Value: '~$9/mo add-on tier cited', tool2Value: 'Paid plans with AI credits', winnerSlug: 'clickup-brain' },
    ],
  },
  {
    id: 'comp-sembly-vs-onplana',
    slug: 'sembly-ai-vs-onplana-status-report-writer',
    tool1Slug: 'sembly-ai',
    tool2Slug: 'onplana-status-report-writer',
    title: 'Sembly AI vs Onplana: AI Project Status Reporting Compared (2026)',
    overview:
      'Comparing Sembly AI project status reports generated from meetings vs Onplana’s free paste-only executive status report writer.',
    bestFor1: 'PMs who want status reports sourced from meeting transcripts and agentic meeting intelligence.',
    bestFor2: 'PMs who paste Slack/meeting/ticket updates and need RAG-formatted executive reports instantly.',
    verdict:
      'Sembly spans meeting-notes and reporting in one subscription. Onplana is the better zero-cost option when you already have updates in text and need structured RAG output fast.',
    winnerSlug: 'tie',
    featureBreakdown: [
      { feature: 'Status Report Generation', tool1Value: 'From meeting content', tool2Value: 'From pasted updates', winnerSlug: 'tie' },
      { feature: 'RAG Status Output', tool1Value: 'Project status report docs', tool2Value: 'Explicit RAG fields on free tool', winnerSlug: 'onplana-status-report-writer' },
      { feature: 'Meeting Capture', tool1Value: 'Full notetaker platform', tool2Value: 'None — paste-only', winnerSlug: 'sembly-ai' },
      { feature: 'Price', tool1Value: 'Paid plans from ~$20/mo', tool2Value: 'Free tool', winnerSlug: 'onplana-status-report-writer' },
      { feature: 'Export', tool1Value: 'Docs within Sembly', tool2Value: 'Markdown/PDF export', winnerSlug: 'tie' },
    ],
  },
];
