# Research Quick-Entry Templates

**Purpose:** Copy-paste compact blocks for fast additions. Each line maps to the full field structure in `TOOLS.md`, `KEYWORDS.md`, `PERSONAS.md`, `COMPARISONS.md`, and `REJECTED.md` — expand into the full template before saving.

**Rules:** Do not invent numbers. Mark unverified metrics as `NOT VERIFIED`. Cite evidence type and date.

---

## Tool

```
TOOL: [name] | [official website URL] | Category: [slug or candidate] | Persona: [slug(s)] | Status: RESEARCHED | Evidence: [1-3 lines + source URL] | Date: YYYY-MM-DD
```

**Maps to:** `TOOLS.md` — Name, Official website, Category candidate, Persona candidate(s), Status, Sources, Date researched

---

## Keyword

```
KEYWORD: [exact phrase] | Demand: [Trends YoY % or OBSERVATION summary; raw volume = NOT VERIFIED] | Competition: [1 line, HARD/MODERATE/WEAK] | Destination: [tool page / category / persona / comparison / finder / none / NO USEFUL DESTINATION] | Status: RESEARCHED | Date: YYYY-MM-DD
```

**Maps to:** `KEYWORDS.md` — Keyword, Observed evidence, Proposed destination, Status, Date researched

---

## Persona

```
PERSONA: [title] | Slug: [slug-candidate] | Seed overlap: [NEW / overlaps `seed-slug` / none] | Evidence: [keyword links or audience evidence, 1-3 lines] | Status: RESEARCHED | Date: YYYY-MM-DD
```

**Maps to:** `PERSONAS.md` — Persona title, Slug candidate, Seed slug overlap, Why this persona, Status, Date researched

---

## Comparison

```
COMPARISON: [tool A] vs [tool B] | Slug: [tool-a-vs-tool-b] | Seed: [NEW / OVERLAPS EXISTING `slug`] | Demand: [1 line] | Competition: [HARD/MODERATE/WEAK + 1 line] | Status: RESEARCHED | Date: YYYY-MM-DD
```

**Maps to:** `COMPARISONS.md` — Comparison title, Tool A/B, Slug candidate, Relationship to seed, Why this comparison, Status, Date researched

---

## Rejection

```
REJECTED: [item title] | Type: [Tool/Keyword/Persona/Comparison/Opportunity] | Reason: [1-2 lines] | Reopen: [condition or "owner only"] | Date: YYYY-MM-DD
```

**Maps to:** `REJECTED.md` — Rejected item title, Type, Reason, Reopen condition, Rejected date

---

## Deprioritized (not hard rejected)

```
DEPRIORITIZED: [item title] | Type: Keyword | Reason: [data-quality / insufficient history — 1-2 lines] | Revisit when: [specific condition] | Date: YYYY-MM-DD
```

**Maps to:** `REJECTED.md` deprioritized section — same fields; do **not** mark as fully REJECTED until evidence confirms a dead end

---

## Scaling beyond markdown

As the tool inventory grows toward **~100+ entries**, markdown blocks in `TOOLS.md` become harder to scan, sort, filter, and batch-edit. Markdown works well for the first research phase (roughly **up to ~40–50 tool entries**) where each tool needs narrative notes, evidence citations, and status commentary alongside structured fields.

**Recommended transition (documented only — not implemented):**

| Phase | Format | Why |
|---|---|---|
| Now → ~40–50 tools | `TOOLS.md` markdown | Human-readable, git-diff friendly, low setup |
| Beyond ~40–50 tools | **CSV or spreadsheet** (one row per tool) | Sortable columns (status, category, persona, date), bulk filter, easier QA passes |
| Implementation | Script CSV → Prisma bulk insert | Avoid one-by-one Admin CMS entry for large batches; map CSV columns to Admin CMS / Prisma schema fields (slug, name, websiteUrl, category, targetUsers, pricing, status, etc.) |

**Suggested CSV columns (align with `TOOLS.md` template):** slug, name, official_website, status, category_slug, persona_slugs, pricing_summary, affiliate_status, evidence_summary, date_researched, notes

**Keep in markdown regardless of scale:** `KEYWORDS.md`, `COMPARISONS.md`, `PERSONAS.md`, `REJECTED.md`, `CHANGELOG.md` — these files stay narrative and cross-linked. Only `TOOLS.md` working data is the primary candidate for CSV migration.

**Do not migrate without owner approval.** This section is a planning note only.
