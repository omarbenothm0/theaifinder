# Comparison Research Inventory

**Last updated:** 2026-08-12
**Entries:** 2

Track head-to-head **comparison opportunities** for AI Finder.

---

## Rules

Before proposing a comparison, verify:

1. Does this comparison **already exist** on site (seed or DB)?
2. Does an **equivalent** comparison exist under different wording?
3. Is the comparison **genuinely useful** (real user decision, evidence of intent)?
4. Are both tools **verified** enough to compare fairly?

Comparisons are **not editable in Admin CMS** today — implementation is seed/DB/developer only.

Public URL pattern: `/compare/[slug]`

---

## Seed placeholder comparisons (NOT validated research)

| Slug | Tools (seed) | Treat as |
|---|---|---|
| `chatgpt-vs-claude` | ChatGPT vs Claude | Implementation placeholder |
| `cursor-vs-chatgpt` | Cursor vs ChatGPT | Implementation placeholder |
| `midjourney-vs-dall-e-3` | Midjourney vs DALL·E 3 | Implementation placeholder |

---

## Entry template

```markdown
### [Comparison title]

| Field | Value |
|---|---|
| **Slug candidate** | e.g. `tool-a-vs-tool-b` |
| **Tool A** | Name + slug |
| **Tool B** | Name + slug |
| **Relationship to seed** | NEW / OVERLAPS EXISTING / REPLACE |
| **Evidence type** | … |
| **Why this comparison** | User intent evidence — cite sources |
| **Keyword / intent link** | See KEYWORDS.md entry or NOT VERIFIED |
| **AI Finder destination** | `/compare/[slug]` |
| **Status** | DISCOVERED / RESEARCHED / VERIFIED / PROPOSED / APPROVED / IMPLEMENTED / REJECTED |
| **Date researched** | YYYY-MM-DD |

**Sources:**
- …

**Notes:**
- …
```

---

## Comparison proposals

COMPARISON: Claude Code vs Cursor | Slug: `claude-code-vs-cursor` | Seed: NEW (no seed comparison for this pair; seed has `cursor-vs-chatgpt`, different matchup) | Demand: Very high Trends spike + sustained baseline (R3); real comparison intent (R6 SERP) | Competition: MODERATE — freshness-driven dev blogs, not legacy media | Status: IMPLEMENTED | Date: 2026-08-12
Notes: Evidence type: OBSERVATION + VERIFIED FACT (tool/comparison content from official Anthropic/Cursor sources, 2026-08-12) | Tool A: Claude Code — slug `claude-code` (`lib/data/tools/claude-code.ts`) | Tool B: Cursor — slug `cursor` refreshed from official pricing | Keyword link: KEYWORDS.md — `claude code vs cursor` | Destination: `/compare/claude-code-vs-cursor` | Comparison addresses Claude Code running inside Cursor via official extension — not CLI-vs-IDE framing. | Raw search volume and CPC: NOT VERIFIED.

COMPARISON: ChatGPT vs Claude | Slug: `chatgpt-vs-claude` | Seed: OVERLAPS EXISTING PLACEHOLDER — seed slug `chatgpt-vs-claude` exists; now has real evidence attached | Demand: Major spike + sustained baseline (R3); overlaps seed chatgpt-vs-claude | Competition: HARD — Tom's Guide, Zapier, Zendesk dominate (R6 SERP) | Status: RESEARCHED | Date: 2026-08-11
Notes: Evidence type: OBSERVATION | Tool A: ChatGPT — overlaps demo seed `/tools/chatgpt` | Tool B: Claude — overlaps demo seed `/tools/claude` | Keyword link: KEYWORDS.md — `chatgpt vs claude` | Destination: `/compare/chatgpt-vs-claude` | Researched with both demand and competition evidence, but **not a validated opportunity** like Claude Code vs Cursor — competition is HARD. | Seed placeholder can be enriched with this research when owner approves implementation.
