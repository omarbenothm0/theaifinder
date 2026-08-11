# AI Finder — Research Bible

**Permanent instruction manual for any AI or human conducting research for AI Finder.**

Read this document **before** doing any research work on this project.

---

## AI HANDOFF RULE (research)

Before making ANY research output or recommendation, read this Research Bible, read `docs/OWNER_GUIDE.md`, read all relevant files in `research/`, and inspect the current website implementation where needed. Do not reinvent research that already exists. Do not treat placeholder seed content as validated market research.

---

## 1. What this document is (and is not)

| Document | Purpose |
|---|---|
| **`docs/OWNER_GUIDE.md`** | Technical/operator truth about the **live website** — architecture, Admin CMS, SEO, reviews, affiliate, monitoring, deployment |
| **`docs/AI_FINDER_RESEARCH_BIBLE.md`** (this file) | Research methodology, evidence rules, anti-duplication protocol, status workflow, AI handoff rules |
| **`research/*.md`** | Accumulated **research knowledge and state** — tools, keywords, categories, personas, comparisons, opportunities, rejections |

**Do not duplicate the Owner Guide here.** If something describes how the application works today, refer to the Owner Guide. If something describes how research must be conducted, it belongs here.

---

## 2. Project research objective

AI Finder (public brand: **TheRadarHub**) is an AI tools discovery platform. The research program exists to build a **useful, evidence-based directory** — not a random list of AI tools.

### What research is trying to accomplish

- Discover **real AI tools** worth listing
- Discover **real search demand** and user intent (with evidence)
- Identify **underserved opportunities** where AI Finder can add value
- Build a high-quality inventory targeting **~100+ tools** over time
- Connect every meaningful finding to an **actual AI Finder destination** (tool page, category, persona, comparison, finder, or a clearly justified new page opportunity)
- Inform **taxonomy decisions** (categories, personas, comparisons) from evidence — not from placeholder seed data

### What research is NOT trying to accomplish

- Pad a spreadsheet to hit exactly 100 names
- Copy competitor directories without verification
- Treat demo/seed content as validated research
- Invent metrics to make reports look complete
- Automatically change the production website without explicit approval

---

## 3. CRITICAL: Placeholder seed data is NOT research

The current seeded/demo content in `lib/data/` and PostgreSQL (from initial bootstrap) exists **only to demonstrate application structure**.

**Do NOT treat as validated research:**

- The 14 demo tool listings (e.g. chatgpt, claude, cursor)
- The 8 demo categories (writing, coding, image, etc.)
- The 8 demo personas (content-creators, developers, etc.)
- The 3 demo comparisons (chatgpt-vs-claude, etc.)
- Any editorial ratings, tags, or copy in seed files

**You MAY use seed data to understand:**

- Data shape and required fields
- What pages exist and how entities connect
- What Admin CMS can store
- What SEO/indexability requires

**Real research for the eventual 100+ tool inventory starts from scratch using real evidence.**

---

## 4. Current AI Finder architecture (research-relevant summary)

*For full technical detail, see `docs/OWNER_GUIDE.md`.*

### Public destinations research can map to

| Destination type | URL pattern | Notes |
|---|---|---|
| **Tool page** | `/tools/[slug]` | Primary listing; requires Admin CMS entry + publish |
| **Category hub** | `/category/[slug]` | Groups tools; **no Admin CRUD** — seed/DB/developer only today |
| **Persona / workflow** | `/for/[slug]` | Tools linked via `Tool.targetUsers[]`; persona records seed-only |
| **Comparison** | `/compare/[slug]` | Curated head-to-head; **no Admin UI** — seed/DB only |
| **Tool catalog** | `/ai-tools` | Filterable directory |
| **Best / free / apps hubs** | `/best-ai-tools`, `/free-ai-tools`, `/ai-apps` | Curated listing pages |
| **Interactive finder** | `/ai-tool-finder` | 3-step wizard; client-side scoring from published tools |
| **Directory index** | `/ai-tools-directory` | Category + comparison index |
| **Homepage** | `/` | Featured/trending/sections |

### Not implemented (do not assume these exist)

- Article/blog pages (Article model exists; no public routes)
- Admin CRUD for categories, personas, comparisons
- Bulk tool import
- Scheduled monitoring
- Click tracking on affiliate links

### Tool fields research should eventually support (Admin CMS)

Identity, content, category, pricing, tags, features, pros/cons, platforms, screenshots, personas (`targetUsers`), alternatives, affiliate fields, editorial rating/review count, verification metadata, publish status. See Owner Guide §4 for full list.

### Brand naming

- **Project/research name:** AI Finder
- **Public site brand in code/UI:** TheRadarHub (`lib/brand.ts`)
- **Repository:** https://github.com/omarbenothm0/theaifinder

---

## 5. Real-data-only policy (STRICT)

**“Real data only” means: use traceable evidence — not guesses, memory, or invented numbers.**

It does **not** mean every fact must come from a primary source. Valid research may rely on **primary sources**, **reputable third-party data sources**, or **direct observations** (defined in §5.1), as long as each claim is cited and classified correctly.

Future AIs must **NEVER invent** supposedly factual information, including:

- Search volume, traffic, CPC, rankings (unless quoted from a cited reputable source or direct observation — never fabricated)
- Competitor statistics or market size
- Tool pricing (unless verified from an acceptable source)
- Tool features or capabilities (unless verified)
- Affiliate program availability or commission rates
- User counts, revenue, funding
- Demand levels or “high intent” claims without evidence
- SERP observations not actually performed
- Review counts, ratings (except from cited sources)

### When data cannot be verified

Write exactly:

**`NOT VERIFIED`**

Never substitute a guess, estimate, rounded figure, or “typical industry” number. If you do not have a cited source or direct observation, the field stays **NOT VERIFIED**.

### 5.1 Three acceptable evidence source types

Every factual claim must trace back to one or more of these source types:

| Source type | What it is | Examples |
|---|---|---|
| **Primary source** | The authoritative origin of the information | Official tool website, pricing page, product documentation, company blog/changelog, affiliate program page, app store listing published by the vendor |
| **Reputable third-party data source** | An established external provider of research or market data — cite the provider, tool, date, and exact figures or export | SEO/keyword tools (e.g. exports from tools the project uses), industry reports with clear methodology, well-known analytics platforms — **only when actually accessed and recorded** |
| **Direct observation** | Something the researcher directly witnessed at a stated point in time | SERP layout/results for a specific query (describe what was seen), page content viewed on a given date, screenshot-derived notes — include query, locale/device if relevant, and access date |

**Rules for all three types:**

- Cite the source (URL, tool name, or observation context) and access date
- Label the claim with an evidence classification (§6) — e.g. VERIFIED FACT or OBSERVATION
- Do not upgrade a third-party figure into a precise claim without recording exactly what the source reported
- Do not treat placeholder seed content in this repository as any of the above

### 5.2 Keyword and search-demand research

For keyword/search-intent work, **reputable SEO and search-data sources are allowed** where appropriate — for example, when comparing relative opportunity or recording exported metrics from a tool the project actually uses.

**Required when citing search/SEO data:**

- Name the **source/tool** (e.g. which keyword platform or method)
- Record **access date** and relevant **parameters** (keyword, market/locale, device if applicable)
- Quote or export **exact figures** as reported — do not round, extrapolate, or merge numbers from memory
- Classify as **VERIFIED FACT** (from cited third-party export) or **OBSERVATION** (from direct SERP check), as appropriate

**Still forbidden:**

- Inventing search volume, CPC, difficulty, or traffic estimates
- Writing “high volume” or “low competition” without a cited source or direct observation
- Presenting training-data keyword stats as if freshly verified

If no acceptable source or observation exists for a metric, mark it **NOT VERIFIED**.

### DEMAND + SERP RULE (permanent)

A keyword must **never** be considered a strong opportunity based on search volume alone. Evaluate both:

1. **SEARCH DEMAND** — verified search volume and/or trend data when available.
2. **SERP REALITY** — the actual current search results, including ranking domains, content quality, authority, relevance, freshness, and whether the searcher's intent is already well served.

High search demand with strong, highly relevant competition may be a **poor** opportunity. Lower search demand with weak, outdated, thin, or poorly matched results may still be a **valuable** opportunity.

Do not invent keyword-difficulty scores. If a difficulty metric is not directly verified from a reputable data source, mark it **NOT VERIFIED** and rely on documented SERP observations instead.

**Never label a keyword an opportunity from search volume alone.**

---

## 6. Evidence classification (never mix categories)

Every research claim must be labeled with one of these **claim types** (separate from the **source types** in §5.1):

| Label | Meaning |
|---|---|
| **VERIFIED FACT** | Directly supported by a cited primary source, reputable third-party data source, or direct observation |
| **OBSERVATION** | A direct observation recorded with date and context (subset of evidence — use when describing what was seen, e.g. SERP layout) |
| **CALCULATION** | Derived from verified inputs — show the calculation |
| **INFERENCE** | Logical conclusion from verified facts — state what it was inferred from |
| **HYPOTHESIS** | Untested idea worth investigating — not a recommendation yet |
| **RECOMMENDATION** | Suggested action based on evidence — not yet approved |
| **APPROVED DECISION** | Explicitly approved by the project owner |
| **IMPLEMENTED** | Exists in production website/database |

**Never present HYPOTHESIS or INFERENCE as VERIFIED FACT.**

A **VERIFIED FACT** may rest on a primary source *or* a properly cited reputable third-party source *or* a documented direct observation — not on uncited memory or invention.

---

## 7. Evidence requirements

### What counts as evidence (maps to §5.1 source types)

**Primary sources**

- Official tool website — pricing, product, documentation (cite URL + access date)
- Official company/blog/changelog — for feature claims
- Affiliate network or vendor program pages — when checking monetization availability

**Reputable third-party data sources**

- SEO/keyword/search analytics tools — when the tool name, export, date, and parameters are recorded; use exact reported figures (see §5.2)
- Established industry or market reports — cite publisher, report, date; note methodology if relevant

**Direct observations**

- Search engine results — only if actually observed; describe what was seen, when, for which query/locale/device
- On-page inspection of a live site at a stated access date

**Internal/project sources**

- Owner Guide / codebase — for application behavior claims only (not market demand)

### What does NOT count as evidence

- “Everyone knows…”
- “This tool is popular”
- “High search volume” without a cited source or direct observation
- Memory from training data without re-verification
- Another directory’s claims without checking an acceptable source
- Placeholder seed content in this repository
- Rounded, extrapolated, or invented numbers — even when a real source “probably exists”

### Source citation format (recommended)

```
Source: [URL, tool name, or observation context]
Source type: PRIMARY | THIRD-PARTY | DIRECT OBSERVATION
Claim type: VERIFIED FACT | OBSERVATION | ...
Accessed: YYYY-MM-DD
Parameters: (keyword, locale, export settings — if applicable)
Notes: ...
```

---

## 8. Anti-duplication system (MANDATORY)

A future AI **must NOT** begin research by generating a fresh list from memory.

### Before any new research session

1. Read **`docs/AI_FINDER_RESEARCH_BIBLE.md`** (this file)
2. Read **`docs/OWNER_GUIDE.md`**
3. Read **`research/INVENTORY.md`** and all relevant inventory files
4. Read **`research/REJECTED.md`**
5. Inspect current website taxonomy (seed + DB if accessible) — categories, personas, tools, comparisons
6. Check whether the entity already exists under a different name
7. Check for **semantic duplicates** (see below)
8. State what you plan to research **before** doing it

### Semantic duplicate examples (same entity, different wording)

| Do not treat as separate | Reason |
|---|---|
| “AI Video Tools” vs “Video AI Tools” | Same category concept |
| “AI Writing Tools” vs “AI Tools for Writing” | Same intent |
| “ChatGPT” vs “OpenAI ChatGPT” | Same product |
| “Midjourney” vs “Midjourney AI” | Same tool |

Compare **meaning**, not only exact string match.

### Where to record findings

| Finding type | File |
|---|---|
| Tool | `research/TOOLS.md` |
| Keyword / search opportunity | `research/KEYWORDS.md` |
| Category proposal | `research/CATEGORIES.md` |
| Persona proposal | `research/PERSONAS.md` |
| Comparison proposal | `research/COMPARISONS.md` |
| Page/feature idea with evidence | `research/OPPORTUNITIES.md` |
| Deliberately rejected idea | `research/REJECTED.md` |
| Session summary / decisions | `research/CHANGELOG.md` |
| Master counts / overview | `research/INVENTORY.md` |

---

## 9. AI Finder destination rule

Every meaningful keyword or opportunity must be evaluated against **actual** AI Finder architecture.

### Possible destination outcomes

| Outcome | When to use |
|---|---|
| **Existing tool page** | Keyword maps to a specific tool already listed or researched |
| **Existing category page** | Keyword maps to a category hub (`/category/[slug]`) |
| **Existing persona page** | Keyword maps to a workflow/role hub (`/for/[slug]`) |
| **Existing comparison page** | Keyword maps to head-to-head (`/compare/[slug]`) |
| **Finder / catalog** | General discovery intent served by `/ai-tool-finder` or `/ai-tools` |
| **NEW page opportunity** | Evidence supports a page type AI Finder does not yet have — record in `OPPORTUNITIES.md` |
| **NO USEFUL DESTINATION** | Keyword exists but does not fit the product — reject or defer |

**Do not create page proposals merely because a keyword exists.** Ask:

> “Where would this opportunity live inside AI Finder, and would it genuinely help a user?”

---

## 10. Research status workflow

Use these statuses consistently. **Do not skip steps or silently promote status.**

```
DISCOVERED → RESEARCHED → VERIFIED → PROPOSED → APPROVED → IMPLEMENTED
                                    ↘ REJECTED (can happen at any stage after RESEARCHED)
```

| Status | Meaning |
|---|---|
| **DISCOVERED** | Name/idea encountered; not yet investigated |
| **RESEARCHED** | Initial investigation done; notes and sources recorded; may contain NOT VERIFIED fields |
| **VERIFIED** | Core claims checked against acceptable sources (§5.1); citations present; no invented numbers |
| **PROPOSED** | Recommended for inclusion in AI Finder; awaiting owner approval |
| **APPROVED** | Owner explicitly approved; ready for implementation planning |
| **IMPLEMENTED** | Live in production database/website |
| **REJECTED** | Deliberately declined — must be recorded in `research/REJECTED.md` with reason |

### Promotion rules

- An AI **must not** move something to **APPROVED** or **IMPLEMENTED** without explicit owner instruction
- An AI **must not** move something to **VERIFIED** unless evidence requirements are met
- Implementation of tools happens via **Admin CMS** (or approved developer workflow) — not by editing seed files without approval

---

## 11. Research vs website implementation

**Research does NOT automatically change the website.**

| Research state | Website state |
|---|---|
| Tool VERIFIED in `research/TOOLS.md` | Tool may **not** exist on site |
| Category PROPOSED | Category may **not** exist in DB |
| Comparison APPROVED | Comparison may **not** be live |

Only explicit **APPROVED → IMPLEMENTED** steps (owner-directed) move research into production.

### Implementation paths (when approved)

| Entity | Typical implementation path today |
|---|---|
| **Tool** | Admin CMS → Add/Edit Tool → Save → Publish |
| **Category** | Developer: seed/DB/Prisma — **no Admin UI** |
| **Persona** | Developer: seed/DB — link tools via Admin `targetUsers` |
| **Comparison** | Developer: seed/DB — **no Admin UI** |
| **Code/SEO changes** | Developer workflow — see Owner Guide |

---

## 12. Taxonomy must emerge from research

**Do not force final categories, personas, or comparisons based on current seed data.**

Seed taxonomy (8 categories, 8 personas, 3 comparisons) is an **implementation template**, not validated market research.

Research should help determine:

- Which categories actually make sense (and whether seed categories should be kept, renamed, merged, or replaced)
- Which personas reflect real audience segments with evidence
- Which comparisons are useful and searchable
- Which page structures serve real intent

Compare all category/persona proposals against:

1. Existing seed/DB slugs
2. `research/CATEGORIES.md` / `research/PERSONAS.md`
3. `research/REJECTED.md`

---

## 13. The ~100 tool objective

**Target:** build a strong inventory of approximately **100+ real AI tools**.

**100 is a target, not a reason to lower standards.**

- If only 63 tools meet evidence and quality criteria, the inventory stops at 63
- Do not invent, pad, or include tools without verification
- Goal: **100 genuinely useful, researched tools** — NOT **100 names in a spreadsheet**

Track progress in `research/INVENTORY.md` (update counts only from actual entries in inventory files).

---

## 14. Session protocol for future AIs

### At the START of every research session

1. Read this Research Bible
2. Read `docs/OWNER_GUIDE.md`
3. Read `research/INVENTORY.md` and relevant inventory files
4. Summarize current research state (counts, gaps, open questions)
5. Identify what has already been researched
6. Identify what remains unresolved
7. State planned research scope **before** executing it
8. Check duplicates and `REJECTED.md`

### At the END of every research session

Report:

- What was discovered
- What was verified (with sources)
- What remains NOT VERIFIED
- What was rejected (and why)
- What was proposed or approved (if owner directed)
- Which research files were updated
- What remains to be researched next
- **Confirmation whether any website code, database, or seed files were changed** (should be **none** for research-only sessions)

Update `research/CHANGELOG.md` with a dated session entry.

---

## 15. Research integrity

- Never hide uncertainty — use **NOT VERIFIED** or **LOW CONFIDENCE**
- If multiple interpretations exist, document each
- Never produce impressive numbers to fill tables
- Quality and traceability beat quantity
- Prefer updating existing inventory entries over creating duplicate rows
- When correcting prior research, note the correction in CHANGELOG and update the original entry

---

## 16. Confidence levels (optional but recommended)

When evidence is partial, add a confidence tag:

| Level | When to use |
|---|---|
| **HIGH** | Multiple acceptable sources agree, or one primary source with clear evidence |
| **MEDIUM** | One reputable third-party source or single direct observation |
| **LOW** | Weak/indirect evidence — treat recommendations cautiously |
| **NOT VERIFIED** | No acceptable evidence yet |

---

## 17. Relationship to website change requests

If research reveals a **product or code change** is needed (new page type, Admin feature, schema change):

1. Document the need in `research/OPPORTUNITIES.md` with evidence
2. Do **not** implement it during a research session unless explicitly instructed
3. Separate research commits from implementation commits

Technical change rules live in `docs/OWNER_GUIDE.md` §14 (RULES FOR FUTURE AI DEVELOPERS).

---

## 18. Current placeholder inventory (for deduplication only)

*These exist in seed/bootstrap — **not validated research**.*

### Demo tool slugs (14)
`chatgpt`, `claude`, `cursor`, `v0`, `midjourney`, `dall-e-3`, `runway`, `elevenlabs`, `perplexity`, `gamma`, `jasper`, `descript`, `suno-ai`, `notion-ai`

### Demo category slugs (8)
`writing`, `coding`, `image`, `video`, `voice`, `seo`, `presentations`, `productivity`

### Demo persona slugs (8)
`content-creators`, `youtubers`, `writers`, `developers`, `marketers`, `teachers`, `real-estate-agents`, `entrepreneurs`

### Demo comparison slugs (3)
`chatgpt-vs-claude`, `cursor-vs-chatgpt`, `midjourney-vs-dall-e-3`

When researching real tools/taxonomy, treat these as **existing implementation placeholders to compare against**, not as approved final decisions.

---

## 19. File index

| File | Role |
|---|---|
| `docs/AI_FINDER_RESEARCH_BIBLE.md` | This file — methodology and rules |
| `docs/OWNER_GUIDE.md` | Website/operator technical truth |
| `research/INVENTORY.md` | Master research state overview |
| `research/TOOLS.md` | Tool research inventory |
| `research/KEYWORDS.md` | Keyword/opportunity inventory |
| `research/CATEGORIES.md` | Category research/proposals |
| `research/PERSONAS.md` | Persona research/proposals |
| `research/COMPARISONS.md` | Comparison research/proposals |
| `research/OPPORTUNITIES.md` | Future page/feature opportunities |
| `research/REJECTED.md` | Rejected ideas (anti-rediscovery) |
| `research/CHANGELOG.md` | Research session log |

---

*End of Research Bible — last scaffolded August 2026*
