# Project Managers Cluster — Research Hub

**Last updated:** 2026-08-11  
**Status:** Phase 3 **COMPLETE** — ready for owner APPROVED → implementation  
**Priority:** #1 persona for current build

Single session hub for PM cluster decisions, SERP snapshots, verified tool pool, and implementation handoff. Cross-links: `USE_CASES.md`, `PERSONA_USE_CASES.md`, `TOOL_USE_CASES.md`, `KEYWORDS.md`, `TOOLS.md`, `INVENTORY.md`.

---

## Final approval package (implementation handoff)

### Executive summary

PM cluster research is **complete** for MVP implementation. Four dedicated use-case pages plus one persona hub are justified. All four pages meet the **≥3 strong+ verified tools** bar using **official primary sources only** (`TOOL_USE_CASES.md`).

| Decision | Outcome |
|---|---|
| Persona priority | **#1 — Project Managers** |
| MVP use-case pages | **3 URLs** + persona hub (planning merged into task-management) |
| meeting-notes | **PASS** — 8 strong+ |
| project-reporting | **PASS** — 3 strong+, 3 partial |
| task-management | **PASS** — 7 strong+ (includes merged planning coverage) |
| project-planning | **MERGED** into task-management (71% verified overlap; gate ≥70%) |
| documentation | **DEFER** standalone page — persona-hub section only |
| risk-management | **DEFER** — no MVP research |
| project-scheduling | **DEFER** standalone page — calendar/scheduling covered under merged task-management + hub mention |
| project-assistant | **DEFER** standalone page — PM-native tools already mapped to other use cases |

**Nothing is APPROVED for production until owner signs this package.** All entities remain **RESEARCHED** in inventory files per Research Bible §10.

---

### MVP URL map (implement these)

| # | URL | B keyword (class) | Status |
|---|---|---|---|
| 1 | `/for/project-managers` | ai tools for project managers (A) | Persona hub |
| 2 | `/for/project-managers/meeting-notes` | ai meeting notes (B) | **Ship** |
| 3 | `/for/project-managers/task-management` | ai task management (B) | **Ship** — includes **Project Planning H2** |
| 4 | `/for/project-managers/project-reporting` | ai project reporting (B) | **Ship** |

**Do not ship at MVP:**
- `/for/project-managers/project-planning` — merged into task-management (301 or omit)
- `/for/project-managers/documentation` — defer until B keyword reframed
- `/for/project-managers/project-scheduling` — defer (subset of task-management)
- `/for/project-managers/project-assistant` — defer (cross-cutting; hub FAQ only)
- `/for/project-managers/risk-management` — defer

**Merged page editorial structure for task-management:**
1. H1: AI task management (execution, prioritization, assignment)
2. H2: AI project planning (plans, milestones, WBS, Gantt) — tools: Asana AI template, Motion AI Project Manager, Monday Sprint Planner, ClickUp Brain² Projects, Microsoft Planner + Copilot
3. Optional H2: AI scheduling & calendar — Motion AI Calendar, Reclaim.ai (hub cross-link; no standalone scheduling page)

---

### Tool tiers explained

| Tier | Meaning | Implementation |
|---|---|---|
| **VERIFIED** | Official-source evidence in `TOOL_USE_CASES.md` with URL + date | Eligible for use-case page |
| **Strong+** | Fit = `primary` or `strong` | Counts toward ≥3 page bar; **recommended** for prominent listing |
| **Partial** | Fit = `partial` | List on page with limitation callout; does not count toward bar alone |
| **RESEARCHED** | In `TOOLS.md` discovery inventory | Do not publish until VERIFIED mapping exists |
| **Exclude / Rejected** | Failed verification or dropped | Do not list on PM pages |

**Recommended tools** = verified **strong+** tools for that page's job. Not a ranking — all strong+ tools on a PASS page are recommended unless excluded below.

---

### Recommended tools by MVP page

#### meeting-notes — 8 recommended (all strong+)

| Tool | Fit | Why recommended (official) |
|---|---|---|
| Otter.ai | primary | Transcription, summaries, action items — otter.ai |
| Fireflies.ai | primary | Auto-join, 100+ languages, action items — fireflies.ai |
| Fathom | primary | Unlimited free tier recordings, action items — fathom.video |
| tl;dv | primary | Customizable AI minutes, CRM sync — tldv.io |
| Sembly AI | primary | 48-language transcription, task detection — sembly.ai |
| Zoom AI My Notes | strong | Bot-free capture, summaries — zoom.com AI note-taking |
| Google Gemini in Google Meet | strong | Automates Meet notes, Docs integration — workspace.google.com/products/meet |
| Microsoft 365 Copilot (Teams) | strong | Meeting recap, transcript Q&A — learn.microsoft.com Copilot overview |

#### project-reporting — 3 recommended strong+ · 3 partial (list all 6 verified)

**Recommended (strong+):**

| Tool | Fit | Why recommended (official) |
|---|---|---|
| Microsoft PowerPoint + Copilot | primary | Official prompt: project status update deck — microsoft.com PowerPoint AI |
| Sembly AI | primary | Project Status Report type, RAG/milestones/risks — sembly.ai/ai-report-generator |
| Onplana Status Report Writer | primary | Free RAG status report from pasted updates — onplana.com/tools/status-report-writer |

**Verified partial (list with limitations):**

| Tool | Fit | Limitation |
|---|---|---|
| Gamma | partial | General deck builder — no PM status schema |
| Beautiful.ai | partial | Presentation design — no structured status report |
| Notion AI | partial | Weekly reporting automation — workspace generalist |

#### task-management (+ merged planning) — 7 recommended task · 5 planning strong+

**Task execution (strong+ — all recommended):**

| Tool | Fit | Official source |
|---|---|---|
| ClickUp Brain² | primary | AI Tasks, Assign & Prioritize — clickup.com/brain |
| Asana AI | primary | Dash, AI Studio, Teammates — asana.com/product/ai |
| Monday.com AI | primary | Sidekick, AI columns, agents — monday.com/w/ai |
| Motion | primary | AI Task Planner — usemotion.com |
| Todoist Assist | strong | Task Assist, Ramble, Email Assist — todoist.com/todoist-assist |
| Notion AI | strong | Custom Agents route tasks — notion.com/product/ai |
| Wrike AI | primary | Board AI task creation, agents — wrike.com/ai |

**Planning (merged H2 — strong+ recommended):**

| Tool | Fit | Official source |
|---|---|---|
| Asana AI | primary | AI project plan template — asana.com/templates/ai-project-plan |
| Motion | primary | AI Project Manager — usemotion.com |
| ClickUp Brain² | primary | AI Projects, Gantt, Goals — clickup.com/brain |
| Monday.com AI | primary | Sprint Planner, Gantt — monday.com/w/ai |
| Microsoft Planner + Copilot | strong | Planner Agent plan creation — learn.microsoft.com/planner/turn-off-planner-agent |

**Planning partial (H2 mention):**

| Tool | Fit | Limitation |
|---|---|---|
| Notion AI | partial | Brainstorm→roadmap — no official WBS generator |

**Scheduling cross-link (hub / H2 optional — not standalone page):**

| Tool | Fit | Official source |
|---|---|---|
| Reclaim.ai | strong | AI calendar, AI Tasks, AI Planner — reclaim.ai |
| Motion | primary | AI Calendar Assistant — already on page |

---

### Verified but NOT recommended for MVP pages

| Tool | Reason |
|---|---|
| Tome | Dropped — tome.app 404; REJECTED.md |
| ProjectManager.com | No official AI features — homepage + /ai 404 |
| Clockwise | Product discontinued — getclockwise.com shutdown page |

---

### RESEARCHED inventory not on PM MVP pages

Student-cluster tools in `TOOLS.md` (13) are unrelated to PM MVP. PM tools without a verified use-case mapping should not appear on PM pages.

---

### Conditional use cases — Phase 3 outcome

#### project-scheduling — **DEFER** (no standalone page)

| Candidate | Result | Notes |
|---|---|---|
| Motion | Already verified task-management | AI Calendar Assistant on usemotion.com |
| Reclaim.ai | **Verified strong** (official) | AI Tasks, AI Planner, AI Smart Meetings — reclaim.ai; **hub cross-link only** |
| Clockwise | **Exclude** | Site shows product shutdown |
| ClickUp, Monday.com | Already verified task-management | Scheduling features subsumed |

**Conclusion:** High overlap with merged task-management. Reclaim added to `TOOLS.md` for hub/scheduling cross-link. No `/project-scheduling` URL at MVP.

#### project-assistant — **DEFER** (no standalone page)

| Candidate | Result | Notes |
|---|---|---|
| ClickUp Brain² | Already on task-management | PM Coworker persona — clickup.com/brain |
| Microsoft 365 Copilot | Already on meeting-notes + reporting + planning | M365 suite assistant |
| Notion AI | Already on task-management + reporting | Custom Agents |
| ChatGPT | **Partial** (official) | openai.com/academy/managers — manager/team planning use cases; **generic LLM — hub FAQ only** |
| Claude | **Partial** (official) | anthropic.com/news/projects — team workspaces; **not PM-specific SKU — hub FAQ only** |

**Conclusion:** ≥3 PM-native tools exist but are **already mapped** to other use-case pages. Standalone assistant page would duplicate inventory. Cover as persona-hub FAQ ("general AI assistants for PMs").

---

### Merge gate record (final)

| Metric | Value |
|---|---|
| Task-management verified pool | 7 |
| Project-planning verified pool | 6 |
| Shared verified | ClickUp, Asana, Monday, Notion, Motion (5) |
| Overlap vs task pool | **71.4%** |
| Strong+ overlap vs planning | **80%** (4/5) |
| Threshold | ≥70% |
| **Decision** | **MERGED** — planning content lives under task-management |

---

### Demand & SERP (unchanged from Phase 1–2)

| Keyword | Volume | SERP read | Page |
|---|---|---|---|
| ai tools for project managers | 880 (owner-reported, NOT third-party verified) | MODERATE | Persona hub |
| ai meeting notes | NOT VERIFIED | MODERATE | Yes |
| ai task management | NOT VERIFIED | MODERATE | Yes (merged planning) |
| ai project planning | NOT VERIFIED | MODERATE | **Merged** — no separate URL |
| ai project reporting | NOT VERIFIED | WEAK–MODERATE | Yes |
| ai project documentation | NOT VERIFIED | FRAGMENTED | Defer |

**Do not invent traffic, CPC, or ratings in implementation.**

---

### Phase tracker

| Phase | Status |
|---|---|
| 0 — Scaffolds | **Complete** |
| 1 — Persona + A-keyword SERP | **Complete** |
| 2 — B-keyword SERP (5 MVP) | **Complete** |
| 3 — Tool verification | **Complete** |
| 4 — QA + approval package | **Complete** (this document) |
| 5 — Implementation | **Ready** — blocked until owner APPROVED |

---

### Owner approval checklist

Sign off to unblock implementation (Prisma, routes, `lib/data/`):

- [ ] **APPROVE** PM persona (`project-managers`) for PROPOSED → APPROVED
- [ ] **APPROVE** 3 use-case pages + persona hub URL map above
- [ ] **APPROVE** project-planning merge into task-management (no separate URL)
- [ ] **APPROVE** documentation defer (hub section only)
- [ ] **APPROVE** recommended tool lists per page (from `TOOL_USE_CASES.md`)
- [ ] **APPROVE** partial tools listed with limitation copy (Gamma, Beautiful.ai, Notion on reporting; Notion on planning H2)
- [ ] **ACKNOWLEDGE** keyword volumes remain owner-reported / NOT VERIFIED unless third-party export added later

---

### Implementation notes (post-approval)

1. Create UseCase records: `meeting-notes`, `task-management`, `project-reporting` only (not `project-planning` as standalone slug, or mark merged/internal)
2. Persona hub: feature 3 primary use cases + deferred documentation section
3. Tool cards: pull from `TOOL_USE_CASES.md` verified entries only
4. Affiliate/pricing: use verified pricing from TOOL_USE_CASE entries; mark NOT VERIFIED fields as TBD
5. No seed/demo tools (chatgpt, claude placeholders) on PM pages unless separately verified and APPROVED

---

## Architecture

**Persona → Use Case → Tool.** Categories remain separate product taxonomy.

**No code/Prisma/routes/lib/data changes** until owner APPROVES checklist above.

---

## Persona keyword (class A)

| Field | Value |
|---|---|
| **Keyword** | ai tools for project managers |
| **Volume (US monthly)** | 880 |
| **Trend** | +7% |
| **CPC** | $5.19 |
| **Source** | Owner-reported (2026-08-11) — **NOT independently re-verified** |
| **SERP competition** | MODERATE (Phase 1 observation) |

---

## Phase 2 SERP summary (reference)

| Use case | B keyword | Competition | Page justified? |
|---|---|---|---|
| meeting-notes | ai meeting notes | MODERATE | Yes |
| task-management | ai task management | MODERATE | Yes |
| project-planning | ai project planning | MODERATE | Merged into task-management |
| project-reporting | ai project reporting | WEAK–MODERATE | Yes |
| documentation | ai project documentation | FRAGMENTED | Defer |

Full SERP detail preserved in git history / prior sections; see `CHANGELOG.md` Phase 2 entry.

---

## Phase 3 verification summary

| Use case | Verified | Strong+ | Bar |
|---|---|---|---|
| meeting-notes | 8/8 | 8 | PASS |
| project-reporting | 6/6 active | 3 | PASS |
| task-management | 7/7 | 7 | PASS |
| project-planning | 6/6 (merged) | 5 | PASS (content merged) |
| project-scheduling | 1 new (Reclaim) + overlap | 1+ | DEFER page |
| project-assistant | 0 new | — | DEFER page |
| documentation | — | — | Skipped |
| risk-management | — | — | Skipped |

**Total verified TOOL_USE_CASE mappings:** 28 VERIFIED + 2 exclude (ProjectManager.com, Clockwise)

---

## Dropped / rejected tools

| Tool | Use case | Reason |
|---|---|---|
| Tome | project-reporting | tome.app 404 — `REJECTED.md` |
| ProjectManager.com | project-planning | No official AI — /ai 404 |
| Clockwise | project-scheduling | Product discontinued |

---

*End of approval package. Historical Phase 1–2 SERP sections available in `CHANGELOG.md` and prior commits.*
