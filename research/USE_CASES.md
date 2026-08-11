# Use Case Research Inventory

**Last updated:** 2026-08-11  
**Entries:** 8

Canonical **job-to-be-done** entities shared across personas. Persona-scoped pages use `/for/[persona-slug]/[use-case-slug]`. One UseCase record per distinct job — not duplicated per persona.

---

## Rules

- Use cases are **persona-neutral** in this file; persona linkage lives in `PERSONA_USE_CASES.md`
- A use case page requires **≥ 3 VERIFIED tools** with use-case evidence (`TOOL_USE_CASES.md`) before APPROVED for publish
- Keyword class **B** required for dedicated page; see `KEYWORDS.md` PM cluster section
- Tool candidates are **not verified** until recorded in `TOOL_USE_CASES.md` with official sources
- Status follows Research Bible §10 — RESEARCHED only until owner promotes

---

## Entry template

```markdown
USE_CASE: [title] | Slug: [slug] | Primary keyword: [phrase] | Intent: … | Page: yes/conditional/defer | Personas: … | Status: RESEARCHED | Date: YYYY-MM-DD
Notes: Distinct job-to-be-done | Keyword variants (class C) | Required evidence | Candidate tools (DISCOVERY only) | SERP status | Minimum tools bar
```

---

## Project Managers cluster — use cases

USE_CASE: AI Meeting Notes | Slug: `meeting-notes` | Primary keyword: ai meeting notes | Intent: Commercial / informational — find tools to capture, transcribe, summarize meetings and extract action items | Page: **yes** (MVP primary) | Personas: `project-managers` (primary), `consultants`, `customer-service` (future) | Status: RESEARCHED | Date: 2026-08-11
Notes: Distinct job: ephemeral meeting → searchable notes, summaries, action items | Variants (C): ai meeting assistant, ai note taker for meetings | Required evidence: transcription/recording, AI summary, action items, meeting platform integrations, pricing | Candidates (DISCOVERY ONLY — owner pool 2026-08-11): Otter.ai, Fireflies.ai, Fathom, tl;dv, Sembly AI, Zoom AI Companion, Microsoft Copilot, Google Gemini / Gemini in Google Meet | Reuse: Otter.ai in TOOLS.md — re-verify for PM | SERP: Phase 2 complete (2026-08-11) — MODERATE | **Phase 3 (2026-08-11): 8/8 candidates VERIFIED; 8 strong+** — **meets ≥3 bar** | Min bar: ≥3 VERIFIED tools

USE_CASE: AI Task Management | Slug: `task-management` | Primary keyword: ai task management | Intent: Commercial — AI-enhanced task creation, prioritization, assignment, tracking **and merged project planning** | Page: **yes** (MVP primary) | Personas: `project-managers`, `entrepreneurs`, `consultants` | Status: RESEARCHED | Date: 2026-08-11
Notes: **Merged page** — includes project-planning H2 (71% overlap gate). Distinct job: execution + upfront planning in one PM workflow page | Variants (C): ai project task management, ai project planning (secondary section) | Active pool: ClickUp Brain², Asana AI, Monday.com AI, Motion, Todoist Assist, Notion AI, Wrike AI + planning: Microsoft Planner + Copilot | **Phase 3: PASS** — 7 task strong+; planning tools verified under merge | Min bar: ≥3 VERIFIED tools

USE_CASE: AI Project Planning | Slug: `project-planning` | Primary keyword: ai project planning | Intent: Commercial — plans, milestones, timelines, WBS | Page: **merged into task-management** | Personas: `project-managers`, `consultants`, `entrepreneurs` | Status: RESEARCHED | Date: 2026-08-11
Notes: **No standalone MVP URL.** Canonical slug retained for taxonomy; content ships as H2 on `/for/project-managers/task-management`. Phase 3 verified 5 strong+ (ClickUp, Asana, Monday, Motion, Planner+Copilot) + Notion partial | ProjectManager.com excluded | Min bar: met via merge

USE_CASE: AI Project Scheduling | Slug: `project-scheduling` | Primary keyword: ai project scheduling | Intent: Commercial — auto-schedule tasks, resources, timelines | Page: **defer (Phase 3)** — hub cross-link / task-management H2 only | Personas: `project-managers`, `consultants` | Status: RESEARCHED | Date: 2026-08-11
Notes: **Phase 3:** Reclaim.ai verified strong (official); Clockwise excluded (shutdown); Motion/ClickUp/Monday overlap task-management — **no standalone page at MVP** | Min bar: N/A (deferred)

USE_CASE: AI Project Reporting | Slug: `project-reporting` | Primary keyword: ai project reporting | Intent: Commercial — status reports, stakeholder updates, decks | Page: **yes** (MVP primary) | Personas: `project-managers`, `consultants`, `marketers` (deck overlap) | Status: RESEARCHED | Date: 2026-08-11
Notes: **Phase 3: PASS** — 6/6 active pool verified; 3 strong+ (Copilot/PPT, Sembly, Onplana), 3 partial | Tome dropped (REJECTED.md) | Min bar: ≥3 VERIFIED tools

USE_CASE: AI Project Assistant | Slug: `project-assistant` | Primary keyword: ai project assistant | Intent: Commercial — cross-cutting PM workflow assistant | Page: **defer (Phase 3)** — persona-hub FAQ only | Personas: `project-managers` | Status: RESEARCHED | Date: 2026-08-11
Notes: **Phase 3:** ClickUp/Copilot/Notion already on other pages; ChatGPT partial (openai.com/academy/managers); Claude partial (anthropic.com/news/projects) — **redundant standalone page** | Min bar: N/A (deferred)

USE_CASE: AI Project Documentation | Slug: `documentation` | Primary keyword: ai project documentation | Intent: Commercial — specs, wikis, PRDs, project knowledge | Page: **defer standalone (Phase 2)** — persona-hub section until B keyword reframed | Personas: `project-managers`, `developers`, `consultants` | Status: RESEARCHED | Date: 2026-08-11
Notes: Distinct job: durable written artifacts (not meeting capture) | Variants (C): ai wiki for projects, ai spec writer | Required evidence: doc generation/editing, workspace/wiki, collaboration, integrations | Candidates (DISCOVERY ONLY): Notion AI, Confluence AI / Atlassian Intelligence, Slite AI, GitBook AI, Grammarly, Coda AI | Reuse: Grammarly in TOOLS.md — partial, re-verify | SERP: **Phase 2 complete (2026-08-11)** — **FRAGMENTED intent** (code docs + PRD tools); Notion/Confluence absent from top results for exact B keyword; **standalone page NOT justified** on current keyword | Follow-up: test `ai project wiki` / `ai team wiki` OR keep hub-only | Min bar: ≥3 VERIFIED tools (when page approved)

USE_CASE: AI Project Risk Management | Slug: `risk-management` | Primary keyword: ai project risk management | Intent: Commercial / informational — risk identification, registers, mitigation | Page: **defer** | Personas: `project-managers`, `consultants` | Status: RESEARCHED | Date: 2026-08-11
Notes: MVP: **no research effort** unless ≥3 genuinely qualifying tools found unexpectedly | Candidates: none assigned | Min bar: ≥3 VERIFIED tools with official risk-specific features — not inferred from generic AI
