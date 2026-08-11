# Tool Research Inventory

**Last updated:** 2026-08-11  
**Entries:** 34 (13 student + 21 PM Phase 3)

Master inventory of **real AI tools** discovered through research. Demo/seed tools (chatgpt, claude, etc.) are **not** listed here — they are placeholder implementation data only.

---

## How to add an entry

1. Check duplicates in this file, `REJECTED.md`, and seed slug list (Research Bible §18)
2. Use the template below — one section per tool
3. Label every claim with evidence type (VERIFIED FACT, NOT VERIFIED, etc.)
4. Set status per workflow in Research Bible §10
5. Update `INVENTORY.md` counts
6. Log session in `CHANGELOG.md`

---

## Entry template (copy for each new tool)

```markdown
### [Tool Name]

| Field | Value |
|---|---|
| **Slug candidate** | e.g. `tool-name` |
| **Official website** | URL or NOT VERIFIED |
| **Status** | DISCOVERED / RESEARCHED / VERIFIED / PROPOSED / APPROVED / IMPLEMENTED / REJECTED |
| **What it does** | Brief description |
| **Evidence type** | VERIFIED FACT / OBSERVATION / … |
| **Pricing** | NOT VERIFIED or cited summary + source |
| **Affiliate** | NOT VERIFIED or status + source |
| **Category candidate** | Slug or NOT VERIFIED |
| **Persona candidate(s)** | Slug(s) or NOT VERIFIED |
| **Alternatives** | Related tools or NOT VERIFIED |
| **Comparison opportunities** | e.g. `tool-a-vs-tool-b` or none |
| **AI Finder destination** | e.g. `/tools/[slug]`, category, persona, NO USEFUL DESTINATION |
| **Confidence** | HIGH / MEDIUM / LOW / NOT VERIFIED |
| **Date researched** | YYYY-MM-DD |
| **Researcher** | AI/human identifier |

**Sources:**
- Source: … | Type: … | Accessed: YYYY-MM-DD

**Notes:**
- …
```

---

## Tools

TOOL: NotebookLM | https://notebooklm.google.com | Category: NEW — pending category decision, see CATEGORIES.md | Persona: students | Status: RESEARCHED | Evidence: Google AI research/note-taking assistant; analyzes uploaded docs/PDFs/URLs; generates study guides, flashcards, quizzes, Audio Overviews with grounded citations. Active: upgraded June 2026 w/ Gemini 3.5. Source: https://notebooklm.google.com (official site, Gemini live verification 2026-08-11) | Date: 2026-08-11
Notes: Pricing: Free (capped 50 sources/notebook); advanced features via Google AI subscriptions | Limitation: answers restricted to uploaded sources only, no general web generation unless enabled | Evidence type: VERIFIED FACT (official site) | Confidence: HIGH

TOOL: Otter.ai | https://otter.ai | Category: NEW — pending category decision, see CATEGORIES.md | Persona: students, project-managers | Status: RESEARCHED | Evidence: Meeting/lecture transcription; real-time audio-to-text, speaker ID, slide capture, AI summaries, chat against transcripts. **PM Phase 3 (2026-08-11):** VERIFIED for `meeting-notes` — primary fit; official pricing + integrations on otter.ai/pricing. Source: https://otter.ai , https://otter.ai/pricing | Date: 2026-08-11
Notes: Pricing: Free (300 min/mo, 30 min max/session, 3 lifetime uploads); Pro $16.99/mo ($8.33 annual); Business $30/mo ($19.99 annual) | Limitation: 30-min free session cap forces splitting/upgrading | Evidence type: VERIFIED FACT (official site + pricing page) | Confidence: HIGH

TOOL: RemNote | https://remnote.com | Category: NEW — pending category decision, see CATEGORIES.md | Persona: students | Status: RESEARCHED | Evidence: All-in-one workspace — hierarchical notes, PDF annotation, flashcard generation, spaced-repetition scheduling. Active: ongoing feature releases. Source: https://remnote.com (official site, Gemini live verification 2026-08-11) | Date: 2026-08-11
Notes: Pricing: Free (3 annotated PDFs, 5 image occlusion cards, 100 AI credits/mo, 8MB upload cap); Pro $8/mo annual; Pro+AI $18/mo annual; Lifetime $399 | Limitation: steep learning curve, AI features consume credits | Evidence type: VERIFIED FACT (official site + pricing page) | Confidence: HIGH

TOOL: NoteGPT | https://notegpt.io | Category: NEW — pending category decision, see CATEGORIES.md | Persona: students | Status: RESEARCHED | Evidence: Summarizes web content, YouTube videos, PDFs, audio into notes/mind maps. Active: ongoing pricing/feature updates. Source: https://notegpt.io (official site, Gemini live verification 2026-08-11) | Date: 2026-08-11
Notes: Pricing: Free (15 quotas/mo, 1 video at a time max 120min); Pro $9.99/mo ($9 annual); Unlimited $29/mo ($14.50 annual) | Limitation: Pro plan premium credits (100/mo) exhaust quickly on voice/audio | Evidence type: VERIFIED FACT (official site + pricing page) | Confidence: HIGH

TOOL: Quizlet | https://quizlet.com | Category: NEW — pending category decision, see CATEGORIES.md | Persona: students | Status: RESEARCHED | Evidence: Flashcards, practice tests, gamified study sets, Magic Notes (notes→flashcards), Q-Chat AI tutor. Active: actively updated app/web. Source: https://quizlet.com (official site, Gemini live verification 2026-08-11) | Date: 2026-08-11
Notes: Pricing: Free (daily usage caps, ads); Plus $7.99/mo or $35.99/yr | Limitation: advanced AI + unlimited study modes paywalled | Evidence type: VERIFIED FACT (official site + pricing page) | Confidence: HIGH

TOOL: Anki | https://apps.ankiweb.net | Category: NEW — pending category decision, see CATEGORIES.md | Persona: students | Status: RESEARCHED | Evidence: Open-source flashcard app; SM-2/FSRS spaced-repetition algorithm. Active: supports current OS versions (macOS 13+, Windows 11 ARM). Source: https://apps.ankiweb.net (official site, Gemini live verification 2026-08-11) | Date: 2026-08-11
Notes: Pricing: Free/open-source (Desktop, AnkiDroid, Web); iOS AnkiMobile $24.99 one-time | Limitation: no native generative AI, requires community plugins | Evidence type: VERIFIED FACT (official site) | Confidence: HIGH

TOOL: Wolfram Alpha | https://wolframalpha.com | Category: NEW — pending category decision, see CATEGORIES.md | Persona: students | Status: RESEARCHED | Evidence: Computational knowledge engine — exact math answers, equation solving, data analysis, plotting. Active: dedicated Student Pro + Notebook Edition packages live. Source: https://wolframalpha.com (official site, Gemini live verification 2026-08-11) | Date: 2026-08-11
Notes: Pricing: Free (basic); Student Pro $6.99/mo or $57/yr; Student Pro Premium $12/mo or $95.88/yr | Limitation: deterministic system, not conversational, needs logical/computational query format | Evidence type: VERIFIED FACT (official site + pricing page) | Confidence: HIGH

TOOL: Grammarly | https://grammarly.com | Category: writing | Persona: students | Status: RESEARCHED | Evidence: Real-time grammar/spelling/clarity/tone AI writing assistant. Active: updated pricing, active browser/desktop extensions. Source: https://grammarly.com (official site, Gemini live verification 2026-08-11) | Date: 2026-08-11
Notes: Pricing: Free (100 AI prompts/mo, no full rewrites/plagiarism check); Pro $12/mo annual ($144/yr) or $30/mo month-to-month | Limitation: academic institutions often regulate AI usage; over-reliance flagged by AI detectors | Evidence type: VERIFIED FACT (official site + pricing page) | Confidence: HIGH | Seed category fit: `writing`

TOOL: Consensus | https://consensus.app | Category: NEW — pending category decision, see CATEGORIES.md | Persona: students | Status: RESEARCHED | Evidence: Academic AI search engine, 200M+ peer-reviewed papers, citation-backed answers, Consensus Meter (agree/disagree classifier). Active: documented current subscription plans. Source: https://consensus.app (official site, Gemini live verification 2026-08-11) | Date: 2026-08-11
Notes: Pricing: Free (unlimited basic search, 15 Pro msgs/mo, 3 Deep reviews/mo, 10 Snapshots/mo); Pro $20/mo ($12/mo annual); Deep $65/mo ($45/mo annual) | Limitation: focused on scientific/academic lit only, not general homework | Evidence type: VERIFIED FACT (official site + pricing page) | Confidence: HIGH

TOOL: Elicit | https://elicit.com | Category: NEW — pending category decision, see CATEGORIES.md | Persona: students | Status: RESEARCHED | Evidence: AI research assistant; automates literature review, semantic search across 138M+ papers, extracts data into comparison tables. Active: live pricing tiers, ongoing product updates. Source: https://elicit.com (official site, Gemini live verification 2026-08-11) | Date: 2026-08-11
Notes: Pricing: Free (4 full-text paper summaries, 20 PDFs/mo extraction cap); Plus ~$12/mo (~$120/yr); Pro $49/mo annual ($588/yr) | Limitation: Pro tier $49/mo cost-prohibitive for casual undergrads | Evidence type: VERIFIED FACT (official site + pricing page) | Confidence: HIGH

TOOL: Scite.ai | https://scite.ai | Category: NEW — pending category decision, see CATEGORIES.md | Persona: students | Status: RESEARCHED | Evidence: Smart Citations — shows whether papers support/contrast a cited claim, citation credibility analysis. Active: verified 2026 pricing, Clemson University institutional adoption case study. Source: https://scite.ai (official site, Gemini live verification 2026-08-11) | Date: 2026-08-11
Notes: Pricing: No permanent free tier — 7-day trial only; Basic $20/mo ($144/yr annual); Pro $50/mo ($480/yr annual) | Limitation: no free tier, requires paid subscription after trial | Evidence type: VERIFIED FACT (official site + pricing page) | Confidence: HIGH

TOOL: Monic.ai | https://monic.ai | Category: NEW — pending category decision, see CATEGORIES.md | Persona: students | Status: RESEARCHED | Evidence: Converts course materials (PDFs, YouTube, slides) into flashcards, quizzes, AI tutor sessions, exam simulation. Active: directory listings and platform updates. Source: https://monic.ai (official site, Gemini live verification 2026-08-11) | Date: 2026-08-11
Notes: Pricing: Free (2,500 one-time AI tokens, 20 daily AI chats, 500MB storage); paid tiers from $4.99/mo | Limitation: token-based free tier restricts high-volume use | Evidence type: VERIFIED FACT (official site) + OBSERVATION (directory listings) | Confidence: LOW — weaker evidence than other entries in this batch; flag for re-verification before VERIFIED promotion

TOOL: Gamma App | https://gamma.app | Category: presentations | Persona: students, project-managers | Status: RESEARCHED | Evidence: AI presentation/document builder — generates slide decks from prompts or imported files. **PM Phase 3 (2026-08-11):** VERIFIED for `project-reporting` — **partial** fit (decks/docs, not PM status-report schema). Source: https://gamma.app/pricing , https://help.gamma.app/ | Date: 2026-08-11

TOOL: Fireflies.ai | https://fireflies.ai | Category: NEW — pending category decision | Persona: project-managers | Status: RESEARCHED | Evidence: AI meeting assistant — transcription, summaries, action items, 100+ languages, CRM/PM integrations, MCP. **PM Phase 3:** VERIFIED `meeting-notes` primary. Pricing: free tier; Pro $10/seat/mo annual. Source: https://fireflies.ai , https://fireflies.ai/pricing | Date: 2026-08-11

TOOL: Fathom | https://www.fathom.video | Category: NEW — pending category decision | Persona: project-managers | Status: RESEARCHED | Evidence: AI notetaker — unlimited free tier recordings; summaries, action items, Ask Fathom, CRM sync. **PM Phase 3:** VERIFIED `meeting-notes` primary. Source: https://www.fathom.video , https://www.fathom.video/pricing | Date: 2026-08-11

TOOL: tl;dv | https://tldv.io | Category: NEW — pending category decision | Persona: project-managers | Status: RESEARCHED | Evidence: AI meeting notetaker for Zoom/Meet/Teams; customizable AI minutes; CRM sync. **PM Phase 3:** VERIFIED `meeting-notes` primary. Free forever tier; Pro €18/seat/mo annual. Source: https://tldv.io , https://tldv.io/app/pricing | Date: 2026-08-11

TOOL: Sembly AI | https://www.sembly.ai | Category: NEW — pending category decision | Persona: project-managers | Status: RESEARCHED | Evidence: Agentic meeting intelligence — transcription, notes, action items, AI-generated documents including project status reports. **PM Phase 3:** VERIFIED `meeting-notes` primary + `project-reporting` **primary** (active pool). Source: https://www.sembly.ai , https://www.sembly.ai/pricing , https://www.sembly.ai/ai-report-generator/ | Date: 2026-08-11

TOOL: Zoom AI My Notes | https://www.zoom.com/en/products/ai-assistant/features/ai-note-taking/ | Category: NEW — platform feature, not standalone tool | Persona: project-managers | Status: RESEARCHED | Evidence: Zoom Workplace AI note-taking — transcription, summaries, action items, third-party meeting capture. **PM Phase 3:** VERIFIED `meeting-notes` strong. Source: https://www.zoom.com/en/products/ai-assistant/features/ai-note-taking/ | Date: 2026-08-11

TOOL: Google Gemini in Google Meet | https://workspace.google.com/products/meet/ | Category: NEW — platform feature (Workspace) | Persona: project-managers | Status: RESEARCHED | Evidence: Gemini automates Meet notes, summaries, action items; Docs integration for minutes. **PM Phase 3:** VERIFIED `meeting-notes` strong; Workspace plan pricing NOT VERIFIED this session. Source: https://workspace.google.com/products/meet/ | Date: 2026-08-11

TOOL: Microsoft 365 Copilot | https://www.microsoft.com/en-us/microsoft-365/copilot/ | Category: NEW — platform / suite | Persona: project-managers | Status: RESEARCHED | Evidence: Copilot in Teams meetings (transcript Q&A, recap); Copilot in PowerPoint (project status update deck prompt official). **PM Phase 3:** VERIFIED `meeting-notes` strong + `project-reporting` primary (PowerPoint). Source: learn.microsoft.com Copilot overview; microsoft.com PowerPoint AI page; copilot/pricing | Date: 2026-08-11

TOOL: Beautiful.ai | https://www.beautiful.ai | Category: presentations | Persona: project-managers | Status: RESEARCHED | Evidence: AI presentation maker; Reports & Reviews templates; export PPTX/PDF. **PM Phase 3:** VERIFIED `project-reporting` **partial**. Pro $12/mo annual. Source: https://www.beautiful.ai , https://www.beautiful.ai/pricing | Date: 2026-08-11

TOOL: Notion AI | https://www.notion.com/product/ai | Category: NEW — pending category decision | Persona: project-managers | Status: RESEARCHED | Evidence: Research Mode project reports; weekly reporting; Custom Agents route tasks; brainstorm→roadmap use case. **PM Phase 3:** VERIFIED `project-reporting` **partial** + `task-management` **strong** + `project-planning` **partial**. Source: https://www.notion.com/product/ai , https://www.notion.com/help/research-mode | Date: 2026-08-11

TOOL: Onplana | https://onplana.com | Category: NEW — pending category decision | Persona: project-managers | Status: RESEARCHED | Evidence: AI-native PM platform + free Status Report Writer (RAG status reports from pasted updates). **PM Phase 3:** VERIFIED `project-reporting` **primary** (active pool). Source: https://onplana.com/tools/status-report-writer | Date: 2026-08-11

TOOL: ClickUp Brain² | https://clickup.com/brain | Category: NEW — pending category decision | Persona: project-managers | Status: RESEARCHED | Evidence: Brain² AI — AI Tasks, Projects, Assign & Prioritize, multi-model chat, MCP. **PM Phase 3:** VERIFIED `task-management` primary + `project-planning` primary. Brain AI $9/user/mo; Everything AI $28/user/mo. Source: https://clickup.com/brain , https://clickup.com/pricing | Date: 2026-08-11

TOOL: Asana AI | https://asana.com/product/ai | Category: NEW — pending category decision | Persona: project-managers | Status: RESEARCHED | Evidence: AI Teammates, AI Studio, Asana Dash, AI project plan template. **PM Phase 3:** VERIFIED `task-management` primary + `project-planning` primary. Source: https://asana.com/product/ai , https://asana.com/templates/ai-project-plan | Date: 2026-08-11

TOOL: Monday.com AI | https://monday.com/w/ai | Category: NEW — pending category decision | Persona: project-managers | Status: RESEARCHED | Evidence: AI agents (Sprint Planner, Status Reporter, Sidekick); AI credits on Basic+ ($9/seat/mo annual). **PM Phase 3:** VERIFIED `task-management` primary + `project-planning` primary. Source: https://monday.com/w/ai , https://monday.com/pricing | Date: 2026-08-11

TOOL: Motion | https://www.usemotion.com | Category: NEW — pending category decision | Persona: project-managers | Status: RESEARCHED | Evidence: AI Task Planner + AI Project Manager; Pro AI $19/seat/mo; Business AI $29/seat/mo. **PM Phase 3:** VERIFIED `task-management` primary + `project-planning` primary. Source: https://www.usemotion.com/ , https://www.usemotion.com/pricing | Date: 2026-08-11

TOOL: Todoist Assist | https://www.todoist.com/todoist-assist | Category: NEW — pending category decision | Persona: project-managers, entrepreneurs | Status: RESEARCHED | Evidence: Task Assist, Filter Assist, Email Assist, Ramble. **PM Phase 3:** VERIFIED `task-management` **strong**. Pro/Business for advanced Assist. Source: https://www.todoist.com/todoist-assist , https://todoist.com/pricing | Date: 2026-08-11

TOOL: Wrike AI | https://www.wrike.com/ai | Category: NEW — pending category decision | Persona: project-managers | Status: RESEARCHED | Evidence: Wrike AI agents, Copilot, Board AI task creation; AI Essentials on Business $25/user/mo. **PM Phase 3:** VERIFIED `task-management` primary. Source: https://www.wrike.com/ai , https://www.wrike.com/price/ | Date: 2026-08-11

TOOL: Microsoft Planner + Copilot | https://www.microsoft.com/en-us/microsoft-365/planner/microsoft-planner | Category: NEW — platform feature | Persona: project-managers | Status: RESEARCHED | Evidence: Planner Agent automates plan creation; premium Gantt/dependencies; requires M365 Copilot license. **PM Phase 3:** VERIFIED `project-planning` **strong**. Source: https://learn.microsoft.com/en-us/planner/turn-off-planner-agent | Date: 2026-08-11

TOOL: ProjectManager.com | https://www.projectmanager.com | Category: NEW — pending category decision | Persona: project-managers | Status: RESEARCHED | Evidence: Traditional PM (Gantt, portfolios, reports). **No official AI features verified** — /ai 404. **Excluded** from project-planning active pool. Source: https://www.projectmanager.com/ | Date: 2026-08-11

TOOL: Tome | https://tome.app | Category: presentations (candidate) | Persona: project-managers | Status: **REJECTED** (active pool) | Evidence: **Dropped from project-reporting pool** — tome.app returned 404 (2026-08-11). See REJECTED.md. Prior partial pricing notes may be stale. | Date: 2026-08-11
Notes: Revisit only if official site restores verifiable product pages.

TOOL: Reclaim.ai | https://www.reclaim.ai | Category: NEW — pending category decision | Persona: project-managers | Status: RESEARCHED | Evidence: AI calendar — AI Tasks, AI Planner, AI Smart Meetings, AI Focus Time. **PM Phase 3:** VERIFIED `project-scheduling` **strong** (page deferred — hub cross-link). Lite free; Starter $10–12/user/mo. Source: https://www.reclaim.ai/ , https://www.reclaim.ai/pricing | Date: 2026-08-11

TOOL: Clockwise | https://www.getclockwise.com | Category: NEW — pending | Persona: project-managers | Status: **REJECTED** | Evidence: Official site shows product shutdown (2026-08-11). Excluded from project-scheduling. See REJECTED.md. | Date: 2026-08-11

---

## Duplicate check reference (seed placeholders — NOT inventory)

`chatgpt`, `claude`, `cursor`, `v0`, `midjourney`, `dall-e-3`, `runway`, `elevenlabs`, `perplexity`, `gamma`, `jasper`, `descript`, `suno-ai`, `notion-ai`

Before adding a tool, confirm whether it is the same entity as a placeholder under a different name.
