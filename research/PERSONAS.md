# Persona Research Inventory

**Last updated:** 2026-08-11  
**Entries:** 2

Track **proposed, verified, and approved** personas (workflow/role hubs) for AI Finder.

---

## Rules

- Compare against existing seed personas before proposing
- Check semantic duplicates (“AI for Marketers” vs “Marketing AI Tools” persona vs category)
- Personas on site link tools via `Tool.targetUsers[]` (Admin checkbox) — persona **records** are seed/DB only today
- Seed personas below are **placeholders**, not validated research

---

## Seed placeholder personas (NOT validated research)

| Slug | Title (seed) | Treat as |
|---|---|---|
| `content-creators` | AI for Content Creators | Implementation placeholder |
| `youtubers` | AI for YouTubers | Implementation placeholder |
| `writers` | AI for Writers | Implementation placeholder |
| `developers` | AI for Developers | Implementation placeholder |
| `marketers` | AI for Marketers | Implementation placeholder |
| `teachers` | AI for Teachers | Implementation placeholder |
| `real-estate-agents` | AI for Real Estate Agents | Implementation placeholder |
| `entrepreneurs` | AI for Entrepreneurs | Implementation placeholder |

Public URL pattern: `/for/[slug]`

**Admin note:** Persona records cannot be created/edited in Admin CMS — tools link via **Target Personas** checkboxes only (Owner Guide).

---

## Entry template

```markdown
### [Persona title]

| Field | Value |
|---|---|
| **Slug candidate** | e.g. `persona-slug` |
| **Relationship to seed** | NEW / RENAME OF / MERGE OF / KEEP AS-IS / REPLACE |
| **Seed slug overlap** | e.g. overlaps `developers` or none |
| **Target role / audience** | Description |
| **Evidence type** | … |
| **Why this persona** | Audience evidence, use cases — cite sources |
| **Example tools** | List or NOT VERIFIED |
| **AI Finder destination** | `/for/[slug]` |
| **Status** | DISCOVERED / RESEARCHED / VERIFIED / PROPOSED / APPROVED / IMPLEMENTED / REJECTED |
| **Date researched** | YYYY-MM-DD |

**Sources:**
- …

**Notes:**
- …
```

---

## Persona proposals

PERSONA: Project Managers | Slug: `project-managers` | Seed overlap: **NEW** — no seed PM persona (closest: `entrepreneurs`, different audience) | Evidence: Owner-reported keyword ai tools for project managers (880 US vol, +7% trend, $5.19 CPC — source NOT independently verified 2026-08-11); Phase 1 SERP observation (2026-08-11) shows mix of official product pages (Google Workspace/Gemini, Enji, CoMng.AI) and niche PM listicles (ProjectSkillsMentor, ProjectManagementFormula) — competition read MODERATE | Status: RESEARCHED | Date: 2026-08-11
Notes: **PRIORITY #1** for current build | Destination: `/for/project-managers` | Architecture: Persona → Use Case → Tool (8 use cases in USE_CASES.md; MVP primary = 5) | Use cases: see PERSONA_USE_CASES.md | Cluster hub: PM_CLUSTER.md | Tool candidates: DISCOVERY only in TOOL_USE_CASES.md | Do not promote to PROPOSED/APPROVED without owner sign-off | Students persona remains separate track (different cluster)

PERSONA: Students | Slug: `students` | Seed overlap: none — no seed Students persona exists (closest seed: `teachers`, different audience) | Evidence: Five independently tested, related-but-distinct keywords show real seasonal/cyclical demand tied to verifiable academic calendar events (school terms, exam periods, submission deadlines). Competition varies by sub-intent: general/study-tools/homework/flashcards show WEAK–MODERATE competition (real opportunity); academic-writing/citation-generator show HARD competition (entrenched academic tool brands). | Status: RESEARCHED | Date: 2026-08-11
Notes: Target: K–12, undergraduate, and graduate students seeking AI tools for study, homework, flashcards, and general academic workflows | Evidence type: OBSERVATION | Tools: NotebookLM, Otter.ai, RemNote, NoteGPT — NOT VERIFIED as exhaustive list | Destination: `/for/students` | Keywords: ai tools for students (+200% YoY, WEAK-MODERATE), ai study tools (MODERATE, seasonal), ai homework helper (+30% YoY, WEAK-MODERATE), ai flashcard maker (+40% YoY, MODERATE), ai tools for academic writing (HARD, cyclical), best ai citation generator (>5000% YoY marker, HARD) | Separate track from PM cluster — not current build priority | Status is RESEARCHED, not PROPOSED — owner sign-off required per Research Bible §10 before promotion.

---

## Persona expansion pool (owner-reported 2026-08-11 — NOT current build)

Metrics owner-reported — NOT VERIFIED via third-party export unless noted. See `KEYWORDS.md` persona expansion sections.

| Priority | Persona | Slug candidate | Primary keyword | Owner metrics | Decision |
|---|---|---|---|---|---|
| **#1 BUILD** | Project Managers | `project-managers` | ai tools for project managers | 880 / +7% / $5.19 | Active cluster — see PM_CLUSTER.md |
| Strong | Marketers | `marketers` | ai tools for marketers | 4400 / -35% / $10.83 | Keep; fold Social Media Managers |
| Strong | Small Business | `small-business` | ai tools for small business | 880 / +167% / $6.14 | Keep (NEW slug) |
| Keep | Teachers | `teachers` | ai tools for teachers | 1600 / -47% / $2.11 | Merge Educators |
| Keep | Researchers | `researchers` | ai tools for researchers | 880 / -11% / $2.84 | NEW slug |
| Keep | Accountants | `accountants` | ai tools for accountants | 590 / +8% / $9.80 | NEW slug |
| Keep | Real Estate Agents | `real-estate-agents` | ai tools for real estate agents | 260 / +12% / $5.80 | Seed overlap |
| Keep | Lawyers | `lawyers` | ai tools for lawyers | 260 / +29% / $13.73 | NEW slug |
| Keep | Consultants | `consultants` | ai tools for consultants | 90 / +67% / $5.33 | NEW slug |
| Keep/Test | Customer Service | `customer-service` | ai tools for customer service | 170 / +31% / $20.97 | NEW slug |
| Fold | Social Media Managers | — | ai tools for social media managers | 70 / +126% / $9.46 | → Marketers |
| Merge | Educators | — | ai tools for educators | ~2900 / -86% / $3.00 | → Teachers (unreliable vol) |

**Taxonomy decisions:** Educators → Teachers; Social Media Managers → Marketers. Students remains separate research persona (not in this pool table).