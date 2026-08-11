# Persona Research Inventory

**Last updated:** 2026-08-11  
**Entries:** 1

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

PERSONA: Students | Slug: `students` | Seed overlap: none — no seed Students persona exists (closest seed: `teachers`, different audience) | Evidence: Five independently tested, related-but-distinct keywords show real seasonal/cyclical demand tied to verifiable academic calendar events (school terms, exam periods, submission deadlines). Competition varies by sub-intent: general/study-tools/homework/flashcards show WEAK–MODERATE competition (real opportunity); academic-writing/citation-generator show HARD competition (entrenched academic tool brands). | Status: RESEARCHED | Date: 2026-08-11
Notes: Target: K–12, undergraduate, and graduate students seeking AI tools for study, homework, flashcards, and general academic workflows | Evidence type: OBSERVATION | Tools: NotebookLM, Otter.ai, RemNote, NoteGPT — NOT VERIFIED as exhaustive list | Destination: `/for/students` | Keywords: ai tools for students (+200% YoY, WEAK-MODERATE), ai study tools (MODERATE, seasonal), ai homework helper (+30% YoY, WEAK-MODERATE), ai flashcard maker (+40% YoY, MODERATE), ai tools for academic writing (HARD, cyclical), best ai citation generator (>5000% YoY marker, HARD) | This is the **only persona cluster** in Round 1–6 research with multi-query evidence. Do not create additional persona proposals from this dataset. | Status is RESEARCHED, not PROPOSED — owner sign-off required per Research Bible §10 before promotion. | Persona page may be a strong opportunity, but internal content should **not** target academic-writing or citation-generator angles as primary differentiators — link out to established tools (Scribbr, QuillBot, etc.) rather than trying to out-rank them.