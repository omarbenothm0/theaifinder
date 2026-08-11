# Category Research Inventory

**Last updated:** 2026-08-12
**Entries:** 2

Track **proposed, verified, and approved** categories for AI Finder. Categories must emerge from research — not from assuming seed data is correct.

---

## Rules

- **Compare against existing seed categories before proposing a new one**
- Check semantic duplicates (“AI Video Tools” vs “Video AI Tools”)
- A category is not valid merely because the wording sounds good — require evidence of useful grouping and discoverability
- Seed categories below are **placeholders**, not approved research outcomes

---

## Seed placeholder categories (NOT validated research)

| Slug | Name (seed) | Treat as |
|---|---|---|
| `coding` | Coding & IDEs | Implementation placeholder |
| `image` | Image Generation | Implementation placeholder |
| `video` | Video & VFX | Implementation placeholder |
| `voice` | Voice & Speech | Implementation placeholder |
| `seo` | SEO & Research | Implementation placeholder |
| `presentations` | Presentations & Decks | Implementation placeholder |
| `productivity` | Productivity | Implementation placeholder |

Public URL pattern: `/category/[slug]`

**Admin note:** Categories cannot be created/edited in Admin CMS today — implementation requires seed/DB/developer work (Owner Guide).

---

## Entry template

```markdown
### [Category name]

| Field | Value |
|---|---|
| **Slug candidate** | e.g. `category-slug` |
| **Relationship to seed** | NEW / RENAME OF / MERGE OF / KEEP AS-IS / REPLACE |
| **Seed slug overlap** | e.g. overlaps `writing` or none |
| **Evidence type** | … |
| **Why this category** | User intent, tool cluster, search evidence — cite sources |
| **Example tools** | List or NOT VERIFIED |
| **AI Finder destination** | `/category/[slug]` |
| **Status** | DISCOVERED / RESEARCHED / VERIFIED / PROPOSED / APPROVED / IMPLEMENTED / REJECTED |
| **Date researched** | YYYY-MM-DD |

**Sources:**
- …

**Notes:**
- …
```

---

## Category proposals

CATEGORY: Study & Research Tools | Slug: `study-research` (candidate) | Seed overlap: NEW — no existing seed category fits 11/13 student-tool cluster | Evidence: Category gap from first real tool research batch (2026-08-11): 11 of 13 student-persona tools do not map to any seed category (`writing`, `coding`, `image`, `video`, `voice`, `seo`, `presentations`, `productivity`). Only Grammarly → `writing` and Gamma App → `presentations` fit. Remaining cluster spans note-taking, flashcards, lecture transcription, academic paper search, computational math, and exam prep — unified by student study/research intent rather than output modality. | Status: RESEARCHED | Date: 2026-08-11
Notes: Example tools supporting new category: NotebookLM, Otter.ai, RemNote, NoteGPT, Quizlet, Anki, Wolfram Alpha, Consensus, Elicit, Scite.ai, Monic.ai | Tools with seed fit (excluded from gap count): Grammarly (`writing`), Gamma App (`presentations`) | Evidence type: OBSERVATION (taxonomy mapping from verified tool research) | Alternative names considered: "Note-Taking & Flashcards" — rejected as too narrow (excludes transcription, paper search, computational engines) | Status is RESEARCHED, not PROPOSED — owner sign-off required per Research Bible §10 before category implementation

CATEGORY: Writing & Copywriting | Slug: `writing` | Seed overlap: REPLACE — enriched seed placeholder `cat-writing` via `lib/data/writing-category.ts` | Evidence: Keyword `best ai writing tools` → `/category/writing` in KEYWORDS.md (MODERATE competition, +250% YoY Trends growth; raw volume NOT VERIFIED). Writers (`/for/writers`) and Marketers (`/for/marketers`) hubs define author/editor vs marketing tool boundaries without new persona. | Status: IMPLEMENTED | Date: 2026-08-12
Notes: Curated sections use existing Writers workflow mappings (ChatGPT, Claude, Grammarly, Perplexity, Notion AI) and Marketers copy tools (Jasper, Copy.ai) kept separate. Category page adds FAQ + CollectionPage schema; does not duplicate persona hub workflow depth.
