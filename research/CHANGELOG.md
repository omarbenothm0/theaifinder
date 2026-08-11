# Research Changelog

Meaningful research decisions, session summaries, and inventory changes.

---

## Entry format

```markdown
## YYYY-MM-DD — [Session title / AI identifier]

**Scope:** What was researched this session

**Discovered:**
- …

**Verified:**
- …

**Not verified:**
- …

**Proposed / Approved:** (only if owner directed)
- …

**Rejected:**
- …

**Files updated:**
- research/TOOLS.md — …
- …

**Website/code changed:** Yes / **No** (research sessions should be **No**)

**Next steps:**
- …
```

---

## Changelog

### 2026-08-11 — PM cluster research COMPLETE (approval package)

**Scope:** Finalize Phase 3; conditional use-case triage; merge planning into task-management; produce implementation handoff in PM_CLUSTER.md. Research markdown only.

**Final MVP scope:**
- **Ship:** persona hub + meeting-notes + task-management (merged planning) + project-reporting
- **Defer:** documentation, project-scheduling, project-assistant, risk-management
- **Merge:** project-planning → task-management (71% overlap gate)

**Conditional use cases:**
- project-scheduling: Reclaim.ai verified strong; Clockwise excluded (shutdown); **no standalone page**
- project-assistant: tools redundant with other pages; **hub FAQ only**

**Files updated:**
- `research/PM_CLUSTER.md` — full approval package
- `research/USE_CASES.md`, `PERSONA_USE_CASES.md`, `TOOL_USE_CASES.md`
- `research/TOOLS.md` (Reclaim, Clockwise), `REJECTED.md`, `INVENTORY.md`, `CHANGELOG.md`

**Website/code changed:** **No**

**Next step:** Owner APPROVE checklist in PM_CLUSTER.md → implementation

---

### 2026-08-11 — PM cluster Phase 3 batch 2 (reporting pool + task/planning + merge gate)

**Scope:** Formalize project-reporting active pool (Sembly, Onplana in; Tome out); Phase 3 verification for task-management and project-planning; 70% merge gate. Research markdown only.

**Discovered:**
- project-reporting: **3 strong+** in active pool (Copilot/PPT, Sembly, Onplana)
- task-management: 7/7 verified, **7 strong+**
- project-planning: 6/7 verified, **5 strong+** (ProjectManager.com excluded)
- Merge gate **TRIGGERED**: 71% verified overlap (5/7 shared tools)

**Verified (official primary sources):**
- task-management: ClickUp Brain², Asana AI, Monday.com AI, Motion, Todoist Assist, Notion AI, Wrike AI
- project-planning: ClickUp, Monday, Asana, Notion (partial), Motion, Microsoft Planner + Copilot

**Not verified:**
- ProjectManager.com AI (no official AI pages)
- Tome (404)
- Some exact plan prices (Asana Starter, Notion Business, Todoist Pro)

**Files updated:**
- `research/TOOL_USE_CASES.md` — 26 verified mappings + merge gate table
- `research/TOOLS.md` — 7 PM tools added; Tome marked rejected from active pool
- `research/USE_CASES.md`, `research/PERSONA_USE_CASES.md`, `research/PM_CLUSTER.md`
- `research/INVENTORY.md`, `research/REJECTED.md`, `research/CHANGELOG.md`

**Website/code changed:** **No**

**Next steps:**
- Owner: merge task-management + project-planning pages or keep dual URLs
- documentation standalone: still deferred

---

### 2026-08-11 — PM cluster Phase 3 (meeting-notes + project-reporting verification)

**Scope:** Official-source verification for 8 meeting-notes candidates and 5 project-reporting candidates. Research markdown only.

**Verified (TOOL_USE_CASES.md):**
- meeting-notes: 8/8 candidates — **8 strong+** (meets ≥3 bar)
- project-reporting (original pool): 1 strong+, 3 partial, 1 not verified (Tome 404)
- Supplemental: Sembly AI + Onplana Status Report Writer — primary for project-reporting (not in original pool)

**Not verified / excluded:**
- Tome — tome.app 404 during verification; excluded from VERIFIED mappings
- Google Workspace Gemini / Meet — feature pricing NOT VERIFIED this session
- Affiliate availability — NOT VERIFIED for all PM tools

**Proposed / Approved:** N/A — nothing promoted beyond VERIFIED tool-use-case mappings

**Files updated:**
- `research/TOOL_USE_CASES.md` — 14 verified mappings + bar checks
- `research/TOOLS.md` — 8 PM tools added; Otter/Gamma PM notes
- `research/USE_CASES.md` — Phase 3 status on meeting-notes + project-reporting
- `research/PERSONA_USE_CASES.md` — verified counts
- `research/PM_CLUSTER.md` — phase tracker
- `research/INVENTORY.md` — counts
- `research/CHANGELOG.md` — this entry

**Website/code changed:** **No**

**Next steps:**
- Owner review before task-management / project-planning Phase 3
- Owner decision: expand project-reporting candidate pool or defer page

---

### 2026-08-11 — PM cluster Phase 2 (MVP use-case SERP)

**Scope:** Live SERP observation for 5 MVP primary B keywords. Research markdown only — no production code.

**Discovered:**
- 4/5 use cases justified for dedicated pages (meeting-notes, task-management, project-planning, project-reporting)
- `documentation` standalone page **not justified** on current B keyword — fragmented SERP (code docs + PRD tools)
- task-management ↔ project-planning **MERGE WATCH** (~60% tool overlap in SERP; merge gate ≥70% after Phase 3)
- Recommended MVP page count: **4 use-case pages + persona hub** (not 5)

**Verified:**
- SERP observations recorded for all 5 B keywords (OBSERVATION 2026-08-11)

**Not verified:**
- Keyword search volumes for B keywords — still NOT VERIFIED
- Merge threshold confirmation — pending Phase 3 verified tool lists

**Proposed / Approved:**
- N/A — recommendations only; owner sign-off required

**Rejected:**
- N/A — documentation deferred, not rejected as use case

**Files updated:**
- `research/PM_CLUSTER.md` — Phase 2 SERP sections + conclusions + phase tracker
- `research/USE_CASES.md` — SERP status per use case; documentation page deferred
- `research/KEYWORDS.md` — competition reads for 5 B keywords
- `research/PERSONA_USE_CASES.md` — Phase 2 flags on mappings
- `research/INVENTORY.md` — phase checklist updated
- `research/CHANGELOG.md` — this entry

**Website/code changed:** **No**

**Next steps:**
- Owner: approve 4-page MVP vs reframe documentation keyword
- Phase 3: verify tools for project-reporting → meeting-notes → task-management → project-planning
- After Phase 3: run overlap check before APPROVED on planning vs task pages

---

### 2026-08-11 — PM cluster Phase 0 + Phase 1 (scaffolds + persona/keywords)

**Scope:** Phase 0 research scaffolds for Persona → Use Case → Tool architecture; Phase 1 PM persona entry, keyword cluster, and primary SERP observation. Research markdown only — no production code.

**Discovered:**
- 8 PM use cases defined (5 MVP primary, 2 conditional, 1 deferred)
- 8 persona ↔ use case mappings for Project Managers
- PM tool candidate index (DISCOVERY only — not verified)
- Persona expansion pool recorded (12 personas from owner-reported metrics)
- Taxonomy decisions: Educators → Teachers; Social Media Managers → Marketers

**Verified:**
- Phase 1 SERP observation for `ai tools for project managers` (2026-08-11) — competition read MODERATE

**Not verified:**
- Owner-reported keyword volumes/CPC for PM cluster and persona expansion pool — NOT independently verified via third-party export
- PM tool candidates — DISCOVERY only; no official-source verification yet
- Use-case-level SERP (B keywords) — Phase 2 pending

**Proposed / Approved:**
- N/A — all entries remain RESEARCHED pending owner review

**Rejected:**
- N/A

**Files updated:**
- `research/TEMPLATES.md` — USE_CASE, PERSONA_USE_CASE, TOOL_USE_CASE compact formats
- `research/USE_CASES.md` — **NEW** — 8 PM use cases
- `research/PERSONA_USE_CASES.md` — **NEW** — 8 PM mappings
- `research/TOOL_USE_CASES.md` — **NEW** — candidate index only (0 verified)
- `research/PM_CLUSTER.md` — **NEW** — cluster hub + Phase 1 SERP
- `research/PERSONAS.md` — Project Managers entry + persona expansion pool
- `research/KEYWORDS.md` — PM cluster keywords + persona expansion pool (44 → 72 entries)
- `research/INVENTORY.md` — counts and quick links updated
- `research/CHANGELOG.md` — this entry

**Website/code changed:** **No**

**Next steps:**
- Phase 2 — live SERP observation for each B keyword (5 MVP primary use cases minimum)
- Phase 3 — official-source tool verification → TOOLS.md + TOOL_USE_CASES.md
- Owner review before promoting PM persona/use cases to PROPOSED

---

### 2026-08-11 — First student tool research batch (13 tools)

**Scope:** Record 13 student-persona tool candidates from Gemini live web verification against official sites (2026-08-11). Category gap analysis for seed taxonomy.

**Discovered:**
- 13 real AI/study tools researched for Students persona cluster
- Category gap: 11/13 tools do not fit any existing seed category
- New category candidate: Study & Research Tools (`study-research` slug candidate)

**Verified:**
- Pricing and product claims for 12/13 tools from official websites (Gemini live verification, 2026-08-11)
- Seed category fit confirmed for Grammarly (`writing`) and Gamma App (`presentations`)

**Not verified:**
- Monic.ai — weaker evidence (directory listings + platform updates); flagged LOW confidence for re-verification
- Affiliate availability for all 13 tools — NOT VERIFIED

**Proposed / Approved:**
- N/A — all entries remain RESEARCHED pending owner review

**Rejected:**
- N/A

**Files updated:**
- `research/TOOLS.md` — 13 entries added
- `research/CATEGORIES.md` — Study & Research Tools gap finding added
- `research/INVENTORY.md` — counts updated
- `research/CHANGELOG.md` — this entry

**Website/code changed:** **No**

**Next steps:**
- Owner review before commit
- Owner decision on promoting Study & Research Tools category to PROPOSED
- Re-verify Monic.ai before VERIFIED promotion
- Owner decision on promoting Students persona and individual tools to PROPOSED

---

### 2026-08-11 — Round 1–6 keyword/SERP research recorded

**Scope:** Round 1–6 keyword/SERP research recorded into permanent inventory (SERP competition + Google Trends demand observations). No new research performed — data transcribed from completed sessions.

**Discovered:**
- 44 unique keywords researched across 6 rounds
- Students persona cluster supported by 6 related keywords with seasonal demand patterns
- Claude Code vs Cursor comparison as strongest comparison opportunity in dataset
- Strong keyword opportunities within Students cluster: `ai tools for students`, `ai study tools`, `ai homework helper`, `ai flashcard maker`
- Tool-navigational keywords flagged for future tool page SEO: `claude code`, `cursor ai`, `cursor price`, `replit ai`

**Verified:**
- N/A — Round 1–6 used direct observation only (live Google Search, Google Trends screenshots). No third-party keyword tool exports.

**Not verified:**
- Raw search volume and CPC for **all 44 keywords** — NOT VERIFIED (no Ahrefs/SEMrush/Keyword Planner used)
- SERP competition for 7 demand-only keywords: `free ai for code`, `best free ai tools`, `ai marketing tools for small business`, `best ai tools for content marketing`, `ai tools for email automation`, `ai tools for data analysis`, `ai tools for gaming` (partial — data analysis and gaming deprioritized for data quality)

**Proposed / Approved:**
- N/A — all entries remain RESEARCHED pending owner review

**Rejected:**
- 9 keywords hard rejected: `ai tools for youtubers`, `best ai for singers`, `best ai for small business`, `best ai for streaming`, `chatgpt atlas`, `best ai to make documentary`, `best ai to make tiktok videos`, `ai tools for podcast editing`, `ai tools for bloggers`
- 3 keywords deprioritized (not hard rejected): `best free ai chatbot with no restrictions`, `ai tools for data analysis`, `ai tools for gaming`

**Files updated:**
- `research/TEMPLATES.md` — created (quick-entry formats + scaling guidance)
- `research/KEYWORDS.md` — 44 entries added
- `research/PERSONAS.md` — Students persona candidate added
- `research/COMPARISONS.md` — 2 entries added (claude code vs cursor, chatgpt vs claude)
- `research/REJECTED.md` — 12 entries added (9 rejected + 3 deprioritized)
- `research/INVENTORY.md` — counts updated
- `research/CHANGELOG.md` — this entry

**Website/code changed:** **No**

**Next steps:**
- Owner review before commit
- SERP competition checks for demand-only marketing/email/free-code keywords
- Third-party keyword tool pass for raw volume/CPC where needed
- Owner decision on promoting Students persona and Claude Code vs Cursor comparison to PROPOSED

---

### 2026-08-11 — Research infrastructure scaffold

**Scope:** Create permanent AI Finder research & handoff documentation system (no tool research performed)

**Discovered:**
- Research workspace structure defined

**Verified:**
- N/A — no external research performed

**Not verified:**
- N/A

**Proposed / Approved:**
- Research Bible and `research/*.md` inventory scaffolds

**Rejected:**
- N/A

**Files updated:**
- `docs/AI_FINDER_RESEARCH_BIBLE.md` — created
- `research/INVENTORY.md` — created
- `research/TOOLS.md` — created (empty)
- `research/KEYWORDS.md` — created (empty)
- `research/CATEGORIES.md` — created (empty)
- `research/PERSONAS.md` — created (empty)
- `research/COMPARISONS.md` — created (empty)
- `research/OPPORTUNITIES.md` — created (empty)
- `research/REJECTED.md` — created (empty)
- `research/CHANGELOG.md` — created

**Website/code changed:** **No**

**Next steps:**
- Owner decisions on evidence bar and research priority (see INVENTORY.md open questions)
- Begin first real research batch when directed

---

*Add new entries at the top (below this header section).*
