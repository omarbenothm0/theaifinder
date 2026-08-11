# Tool Research Inventory

**Last updated:** 2026-08-11  
**Entries:** 13

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

TOOL: Otter.ai | https://otter.ai | Category: NEW — pending category decision, see CATEGORIES.md | Persona: students | Status: RESEARCHED | Evidence: Meeting/lecture transcription; real-time audio-to-text, speaker ID, slide capture, AI summaries, chat against transcripts. Active: 2026 pricing verified, LTI/meeting integrations. Source: https://otter.ai (official site, Gemini live verification 2026-08-11) | Date: 2026-08-11
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

TOOL: Gamma App | https://gamma.app | Category: presentations | Persona: students | Status: RESEARCHED | Evidence: AI presentation/document builder — generates slide decks from prompts or imported files. Active: verified official pricing page. Source: https://gamma.app (official site, Gemini live verification 2026-08-11) | Date: 2026-08-11
Notes: Pricing: Free (400 signup credits, max 10 slides/prompt, Gamma branding on exports); Plus $10/mo ($9 annual); Pro $20/mo ($18 annual) | Limitation: free credits don't replenish once spent | Evidence type: VERIFIED FACT (official site + pricing page) | Confidence: HIGH | Seed category fit: `presentations`

---

## Duplicate check reference (seed placeholders — NOT inventory)

`chatgpt`, `claude`, `cursor`, `v0`, `midjourney`, `dall-e-3`, `runway`, `elevenlabs`, `perplexity`, `gamma`, `jasper`, `descript`, `suno-ai`, `notion-ai`

Before adding a tool, confirm whether it is the same entity as a placeholder under a different name.
