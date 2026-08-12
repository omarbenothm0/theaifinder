# AI Finder — Owner & Developer Handoff Guide

**AI HANDOFF RULE:** Before making ANY change, read this guide and inspect the existing implementation. The existing website is already functional. Do not rebuild, replace, or redesign working systems just because you would architect them differently.

This document describes **how the site works today**, based on the actual codebase. It is written for:

- **You (owner/operator)** — day-to-day operations through Admin
- **Future AI agents and developers** — architecture, safety rules, and what not to break

**Last reviewed against codebase:** August 2026  
**Public site brand (in code):** `TheRadarHub` (`lib/brand.ts`)  
**Admin URL:** `/admin` (login at `/admin/login`)

---

## 1. Project identity

| Item | Value |
|---|---|
| **Project name** | AI Finder (AI tools discovery platform) |
| **GitHub repository** | https://github.com/omarbenothm0/theaifinder |
| **Current development branch** | `production-readiness-fixes` (as of last review) |
| **Stack** | Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS |
| **Database** | PostgreSQL via Prisma |
| **Runtime data source** | PostgreSQL only — **not** `lib/data/` files |

**Naming note:** The public-facing site name rendered in the UI is **`TheRadarHub`** (defined in `lib/brand.ts`). The repository and this guide use “AI Finder” as the project name. Do not confuse repo/project naming with the live brand string in code.

**Typical workflow:** Feature work happens on a branch (e.g. `production-readiness-fixes`), is tested locally, committed, pushed, then deployed by the host pulling the new commit and rebuilding.

---

## 2. Architecture overview

```
┌─────────────────────────────────────────────────────────────────┐
│  Public website (Next.js pages in app/, components/)           │
│  Homepage, tool pages, categories, personas, comparisons, etc.   │
└────────────────────────────┬────────────────────────────────────┘
                             │ reads via lib/services → lib/dbRepository
┌────────────────────────────▼────────────────────────────────────┐
│  Admin CMS (/admin)                                              │
│  Tool CRUD, review moderation, manual monitoring checks          │
└────────────────────────────┬────────────────────────────────────┘
                             │ writes via app/api/* (auth required)
┌────────────────────────────▼────────────────────────────────────┐
│  PostgreSQL (DATABASE_URL)                                        │
│  Tools, reviews, categories, personas, monitoring checks, etc.    │
└───────────────────────────────────────────────────────────────────┘

lib/data/seedData.ts + lib/data/tools/*.ts  →  bootstrap ONLY (npm run db:seed)
lib/seo/*                                   →  metadata, sitemap, JSON-LD, indexability
lib/monitoring/*                            →  manual website health checks
lib/utils/toolOutboundLink.ts               →  official vs affiliate outbound routing
```

### Key architectural facts

| Fact | Detail |
|---|---|
| **Database is runtime source of truth** | Public pages and Admin read/write PostgreSQL through `lib/dbRepository.ts`. |
| **`lib/data/` is seed/bootstrap only** | TypeScript files under `lib/data/` are loaded by `prisma/seed.ts` when you run `npm run db:seed`. They are **not** read on each page request after seeding. |
| **Admin CMS** | Full Tool CRUD, review moderation, manual monitoring — no redeploy needed for data changes. |
| **Public website** | Server-rendered Next.js pages with ISR caching (`revalidate = 3600` on many routes = up to 1 hour cache). |
| **Authentication** | Cookie-based admin session (`lib/auth/`), gated by `middleware.ts`. Session lasts **1 hour**. |

### Request flow (simplified)

```
Browser → Next.js page or API route → Service (optional) → dbRepository → Prisma → PostgreSQL
```

Admin write routes (`POST/PUT/DELETE` on `/api/tools`, `/api/admin/*`, etc.) require an authenticated admin session. Public review submission (`POST /api/reviews`) and finder (`POST /api/finder`) are explicitly allowed without admin auth.

---

## 3. How you operate the website

### Quick reference

| Task | Where |
|---|---|
| Add/edit/delete AI tools | `/admin` → Add New AI Tool / pencil / trash |
| Configure affiliate links | `/admin` → edit tool → **Monetization & Links** |
| Moderate visitor reviews | `/admin` → **Review Moderation** |
| Run website health check | `/admin` → edit tool → **Website Monitoring** → Run Website Check |
| Change homepage layout/copy | **VS Code** — `app/page.tsx`, `components/home/` |
| Add categories/personas/comparisons | **VS Code + seed/DB** — not in Admin |
| Deploy code changes | Git push + host rebuild |
| Change live tool data | **Admin** — no redeploy needed |

---

### How to add a tool

1. Go to **`/admin/login`** and sign in.
2. Click **Add New AI Tool**.
3. Fill **Basic Information** (name, slug, logo URL, company).
4. Fill **Monetization & Links** — official website URL (required); affiliate fields if applicable.
5. Write **Content** (tagline ≥ 10 chars, description ≥ 50 chars for publishing).
6. Pick **Category & Pricing**.
7. Add **Lists & Details** (tags, features, pros/cons, platforms, screenshots).
8. Set **Personas & Alternatives** if applicable.
9. Set **Badges & Listing Flags** (featured, trending, editorial rating, etc.).
10. Add **Verification & Sources** when you have verified pricing/features metadata.
11. Click **Save as Draft** while building.
12. When ready, click **Save & Publish** (or set Published + Save).
13. Optionally run **Run Website Check** and open **Preview public page**.

New tools default to **`draft`** in the Admin form.

---

### How to edit a tool

1. `/admin` → search/find tool → **pencil icon**.
2. Edit any section.
3. **Save as Draft**, **Save Tool**, or **Save & Publish**.
4. Public site reads from DB immediately; cached pages may lag up to ~1 hour.

Changing the slug changes the public URL (`/tools/[slug]`). The old URL will 404 unless redirects are added in code.

---

### How to publish / unpublish

| Publish Status | Public listings | Tool page | SEO indexing |
|---|---|---|---|
| `draft` | Hidden | 404 for visitors | Not indexable |
| `published` | Visible (if fields OK) | Live at `/tools/[slug]` | Eligible if indexability rules pass |
| `archived` | Hidden | 404 for visitors | Not indexable |

**Save buttons:**

| Button | Behavior |
|---|---|
| **Save as Draft** | Forces `draft` — skips publish validation |
| **Save Tool** | Saves with current Publish Status dropdown |
| **Save & Publish** | Sets `published` and validates all publish requirements |

The form shows an **indexability preview** when Publish Status is `published`.

---

### Categories, personas, comparisons

| Entity | Admin today | How to change |
|---|---|---|
| **Categories** | Dropdown selection only when editing tools | Seed (`lib/data/seedData.ts`) + `npm run db:seed`, or direct DB/developer work |
| **Personas** | Link tools via **Target Personas** checkboxes (`Tool.targetUsers`) | Persona records: seed/code only. `PersonaTopTool` (ordered featured picks on persona hubs) is seed-only |
| **Comparisons** | Not in Admin | Seed/code only |
| **Articles** | Not in Admin | Seed/code only |

---

### Where visitor reviews appear

- **Submission:** `/tools/[slug]` → **User Reviews** section → review form
- **Public display (User Reviews section):** Only **approved** reviews appear in the list; `ToolReviewsSection.tsx` computes its own average star display from those approved rows
- **Hero rating / tool cards / JSON-LD:** Public tool reads run through `enrichToolsWithPublicReviewSignals()` in `lib/dbRepository.ts`, which calls `applyPublicReviewSignals()` in `lib/seo/public-review-signals.ts`. That **replaces** `Tool.rating` and `Tool.reviewCount` with aggregates from **approved** `Review` rows. If a tool has zero approved reviews, public hero/cards show no star count (rating 0, reviewCount 0) and JSON-LD omits `aggregateRating`
- **Admin / unpublished reads:** Show raw DB columns `Tool.rating` and `Tool.reviewCount` (editorial fields, typically 0 unless manually set in Admin)

---

### How review moderation works

1. Visitor submits review → stored as `pending` in PostgreSQL `Review` table.
2. Admin → **Review Moderation** (default filter: Pending).
3. Expand review → **Approve**, **Reject**, **Flag**, or **Delete**.
4. Approved reviews appear publicly in the User Reviews section.

See [Section 5 — Reviews](#5-reviews) for the complete flow and how DB editorial fields relate to public review overlays.

---

### Where monitoring is found

1. **Tools table → Monitor column** — signal emoji + label per tool.
2. **Edit tool → Website Monitoring** — latest check details + **Run Website Check**.

Monitoring is **manual only** — there is no scheduled/cron automation in the codebase.

---

### How affiliate links are configured

1. `/admin` → edit tool → **Monetization & Links**.
2. Set **Official Website URL** (always required — used for monitoring).
3. Optionally set **Affiliate URL** and enable **Use affiliate link for outbound CTAs**.
4. Optionally set **Affiliate Program / Network** (admin reference label).
5. Save.

See [Section 6 — Affiliate system](#6-affiliate-system) for full behavior.

---

## 4. Admin CMS — all editable Tool fields

Everything below is editable in **`AdminToolForm`** without VS Code.

### Form sections and fields

| Section | Fields | Required to save | Required to publish |
|---|---|---|---|
| **Basic Information** | Tool Name, URL Slug, Logo URL, Company Name | Name, slug | Logo URL (valid http/https) |
| **Monetization & Links** | Official Website URL, Affiliate URL, Affiliate enabled toggle, Affiliate Program/Network | Official Website URL | Official Website URL (valid http/https) |
| **Content** | Tagline, Full Description | — | Tagline ≥ 10 chars, Description ≥ 50 chars |
| **Category & Pricing** | Category, Pricing Model, Monthly Cost, Pricing Tiers (JSON) | Category | Category assigned |
| **Lists & Details** | Tags, Features, Pros, Cons, Platforms, Screenshot URLs | — | — |
| **Personas & Alternatives** | Target Personas (checkboxes), Alternative Tools (checkboxes) | — | — |
| **Badges & Listing Flags** | Verified, Featured, Trending, Has API/Mobile/Extension, Editorial Rating (0–5), Editorial Review Count | — | — |
| **Verification & Sources** | Pricing Source URL, Feature Source URL, Verified By, Review State, Review Requested, Review Assigned To, Review Notes, Source Metadata (JSON) | — | — |
| **Website Monitoring** (edit only) | Run Website Check + results display | — | — |
| **Publish** | Publish Status + indexability preview | — | All publish rules (see above) |

### Field persistence (what hits the database)

| Admin field | Database location |
|---|---|
| Core tool fields | `Tool` table |
| Source Metadata JSON | `ToolSource` rows (synced on save) |
| Pricing Tiers JSON | `PricingTier` rows (synced on save) |
| Alternative Tools checkboxes | `ToolAlternative` rows (synced on save) |
| Target Personas checkboxes | `Tool.targetUsers[]` array |
| Affiliate fields | `Tool.affiliateUrl`, `Tool.affiliateEnabled`, `Tool.affiliateProgram` |

### Affiliate validation (Admin)

- Affiliate URL is optional unless **affiliate enabled** is checked.
- If enabled, affiliate URL must be a valid `http://` or `https://` URL.
- Affiliate fields are **never** required to publish a tool.

### Source Metadata JSON format

```json
[
  {
    "type": "pricing",
    "url": "https://example.com/pricing",
    "verifiedAt": "2026-08-07",
    "notes": "Pricing page"
  }
]
```

Valid types: `pricing`, `features`, `company`, `website`, `documentation`, `changelog`, `review`, `general`.

Sources are **editorial audit metadata**. They are saved to the database but are **not** rendered as public outbound CTAs on tool pages.

### Pricing tiers JSON format

```json
[
  {
    "name": "Pro",
    "price": 20,
    "billingPeriod": "monthly",
    "features": ["Feature A", "Feature B"]
  }
]
```

`billingPeriod` must be `monthly`, `yearly`, or `custom`.

### Information verification (`lastVerifiedDate`)

The existing database field **`Tool.lastVerifiedDate`** tracks when tool information was last verified. It is **server-managed automatically** — there is **no manual “Reviewed Date” field** in Admin.

**When the date is set or refreshed:**

| Action | Updates `lastVerifiedDate`? |
|---|---|
| **Create tool** (Admin save) | Yes — set to current date/time |
| **Edit/save tool** (any Admin update) | Yes — refreshed to current date/time |
| **Successful website check** (Run Website Check) | Yes — refreshed to current date/time |
| **Failed or timeout website check** | No |
| **No action** (existing untouched tools) | No — existing values are preserved |

**Implementation (do not duplicate):**

- `lib/dbRepository.ts` — stamps on `createTool` and `updateTool`
- `lib/monitoring/monitoring.service.ts` — stamps on successful check via `touchToolLastVerifiedDate`
- `lib/utils/formatDate.ts` — formats the public display date

**Public display (one freshness signal only):**

On `/tools/[slug]`, when `lastVerifiedDate` is present, the hero area shows:

> **Information verified: August 11, 2026**

There is no separate “Last updated”, “Created”, or second date label. This uses the existing `lastVerifiedDate` field — not a new database column or verification system.

---

### NOT in Admin UI (requires code/seed/DB)

- Category create/edit/delete
- Persona create/edit/delete
- Comparison create/edit/delete
- Article/blog management
- Tool FAQ management (`ToolFAQ` — seed only)
- PersonaTopTool ordered featured picks (seed only)
- Bulk CSV import of tools
- Scheduled/automatic monitoring runs
- Homepage layout and marketing copy changes

---

## 5. Reviews

### Complete flow

```
Visitor on /tools/[slug]
  → ReviewForm submits POST /api/reviews
  → Validation + rate limiting
  → PostgreSQL Review row created, status = pending
  → Admin / Review Moderation (filter: Pending)
  → Approve / Reject / Flag / Delete
  → If approved: visible in "User Reviews" section on tool page
```

### Visitor submission rules

- Tool must be **published**
- Rating: integer **1–5**
- Comment: **10–2000** characters
- Email: optional (stored privately, admin-only)
- Duplicate guard: same email + same tool cannot submit again within **24 hours** if prior submission is pending or approved
- Rate limit: **5 submissions per 15 minutes** per client
- Visitors **cannot** set `status` or `verifiedUser`

### Admin moderation actions

| Action | Database | Public effect |
|---|---|---|
| **Approve** | `status = approved` + moderation metadata | Review appears in User Reviews |
| **Reject** | `status = rejected` | Hidden |
| **Flag** | `status = flagged` | Hidden; for follow-up |
| **Delete** | Row removed permanently | Gone everywhere |

**Moderation notes** (`moderationNotes`) are admin-only and never shown to visitors.

### CRITICAL — DB editorial fields vs public review signals

| Layer | Source | Where shown | Updated by visitor review moderation? |
|---|---|---|---|
| **DB editorial fields** | `Tool.rating`, `Tool.reviewCount` columns | **Admin** dashboard, tool edit form, unpublished tool reads | **NO — NEVER** auto-sync from moderation |
| **Public hero / ToolCard / finder / featured lists** | `applyPublicReviewSignals()` overlay from approved `Review` rows | Tool page hero stars, `ToolCard`, `/api/finder`, JSON-LD `aggregateRating` when count > 0 | Indirectly — approving/deleting reviews changes the aggregate at **read time**, not by writing Tool columns |
| **User Reviews section** | Individual approved `Review` rows + section-level average | Bottom of `/tools/[slug]` | Yes (approve/reject/delete controls visibility) |

**Rule for future developers:** Review moderation must **NOT** write to `Tool.rating` or `Tool.reviewCount`. Those DB fields are editorial/admin metadata (seed defaults to 0). Public listings derive star counts from approved reviews via `enrichToolsWithPublicReviewSignals()` — keep that overlay; do not remove it unless deliberately changing product behavior.

The User Reviews section (`ToolReviewsSection.tsx`) shows individual review text and its own average — separate from the hero star overlay, though both derive from approved `Review` rows.

---

## 6. Affiliate system

Implemented August 2026. Central logic: `lib/utils/toolOutboundLink.ts`. UI: `components/tool/ToolOutboundLink.tsx`.

### Fields (on `Tool` table)

| Field | Purpose |
|---|---|
| **`websiteUrl`** | Official vendor website. Used for monitoring, indexability validation, editorial reference. **Always required.** |
| **`affiliateUrl`** | Optional monetized outbound URL (e.g. `https://example.com/?ref=your-id`). |
| **`affiliateEnabled`** | Boolean toggle. When `true` AND `affiliateUrl` is valid, public CTAs use the affiliate URL. |
| **`affiliateProgram`** | Optional admin label (e.g. Impact, PartnerStack). Stored but **not shown on public pages** today. |

### Outbound CTA routing

All public outbound clicks use **`getToolOutboundLink()`** — used by tool page hero button and ToolCard external-link icon.

| Condition | Destination | Button label | `rel` attribute |
|---|---|---|---|
| `affiliateEnabled` + valid `affiliateUrl` | `affiliateUrl` | **Visit Website** | `sponsored nofollow noopener noreferrer` |
| Otherwise | `websiteUrl` | **Visit Official Website** | `noopener noreferrer` |

### Rules

- **Never** put an affiliate/tracking URL in `websiteUrl`.
- **Never** overwrite `websiteUrl` with an affiliate URL for monetization.
- **Monitoring ALWAYS checks `websiteUrl`** — never `affiliateUrl` (`lib/monitoring/monitoring.service.ts`).
- **SEO is unaffected:** canonical URLs, sitemap entries, and JSON-LD `url` point to internal `/tools/[slug]` pages — not affiliate or official external URLs.
- If no affiliate is configured, visitors go to the official website — same as before the affiliate system existed.

### Affiliate disclosure

| Location | When shown |
|---|---|
| **Site footer** | Always (all pages) — `AffiliateDisclosure` in `Footer.tsx` |
| **Tool page hero** | When that tool's outbound CTA uses an affiliate link |
| **Terms / Privacy** | Legal copy references labeled affiliate links; implementation matches via footer + tool-page disclosure |

### Admin workflow for affiliate

```
Admin → Edit Tool → Monetization & Links
  → Official Website URL: https://vendor.com
  → Affiliate URL: https://vendor.com/?ref=your-id
  → Enable "Use affiliate link for outbound CTAs"
  → Save
```

QA script: `npx tsx scripts/test-affiliate-links.ts`

---

## 7. SEO — what must NOT be changed casually

SEO logic lives in **`lib/seo/`**. Changes here affect the entire site's discoverability.

### Do not casually modify

| Area | Key files | Why |
|---|---|---|
| **Canonical URLs** | `lib/seo/metadata.ts` | Wrong canonicals cause duplicate-content issues |
| **Sitemap** | `lib/seo/sitemap-builder.ts`, `app/sitemap.ts` | Controls what Google crawls |
| **Robots** | `app/robots.ts` | Controls crawl permissions |
| **Metadata templates** | `lib/seo/metadata.ts` | Page titles, descriptions, OG tags sitewide |
| **JSON-LD structured data** | `lib/seo/jsonld.ts` | Tool schema `url` = internal `/tools/[slug]`, not external URLs |
| **Indexability rules** | `lib/seo/indexability.ts` | Determines sitemap inclusion and `noindex` |
| **Internal linking** | `components/shared/InternalLinks.tsx`, page cross-links | Site architecture for crawl paths |

### Tool indexability requirements (`isToolIndexable`)

A published tool is sitemap-eligible only when ALL pass:

- `publishStatus = published`
- Valid slug (lowercase alphanumeric + hyphens)
- Tagline ≥ 10 characters
- Description ≥ 50 characters
- Valid `websiteUrl` (http/https) — **official URL only, not affiliate**
- Valid logo URL (http/https)
- Category relationship present

Draft and archived tools get `noindex` metadata.

### Environment dependency

Set **`NEXT_PUBLIC_APP_URL`** to your production domain before deploying. Without it, canonical URLs, sitemap links, and OG URLs may be wrong. The build logs a warning if it is unset.

---

## 8. Monitoring

### What exists

| Feature | Status |
|---|---|
| Manual website health check per tool | **Implemented** — Admin → edit tool → Run Website Check |
| Monitor column in Admin tools table | **Implemented** — emoji + signal label |
| Check history in `ToolMonitoringCheck` table | **Implemented** |
| URL validation (blocks private IPs, localhost) | **Implemented** — `lib/monitoring/url-validation.ts` |
| Verification freshness signals | **Implemented** — based on `lastVerifiedDate` + latest check |
| Successful check refreshes `lastVerifiedDate` | **Implemented** — failed/timeout checks do not |
| Configurable thresholds via env vars | **Implemented** |

### What does NOT exist

| Feature | Status |
|---|---|
| Scheduled / cron automatic checks | **NOT implemented** |
| Email/Slack alerts on failure | **NOT implemented** |
| Auto-unpublish on monitoring failure | **NOT implemented** |
| Auto-update of tool content from checks | **NOT implemented** |
| Affiliate URL checking | **NOT implemented** (and must not be added without explicit request — monitoring uses official URL only) |

### Signal meanings

Computed in `lib/monitoring/freshness.service.ts`:

| Label | Meaning |
|---|---|
| **Healthy** | Latest check succeeded AND verification date is recent |
| **Stale / needs verification** | Verification date is old |
| **Website check failed** | Latest HTTP check failed, timed out, or invalid URL |
| **Verification needs attention** | Never verified or attention state |
| **Not checked yet** | No monitoring check has been run |

Threshold env vars: `VERIFICATION_WARNING_DAYS` (default 60), `VERIFICATION_STALE_DAYS` (default 90), `VERIFICATION_HIGH_PRIORITY_DAYS` (default 180).

### When a tool fails monitoring

1. Check error details in Admin → Website Monitoring.
2. Visit the **Official Website URL** yourself.
3. Fix `websiteUrl` in Admin if wrong → save → re-run check.
4. A successful re-check refreshes `lastVerifiedDate` automatically; update other editorial fields (Review State, sources, etc.) manually if content is outdated.
5. Monitoring failure does **not** auto-unpublish the tool.

QA script: `npx tsx scripts/test-monitoring.ts`

---

## 9. Database & migrations

### Schema

- **File:** `prisma/schema.prisma`
- **Client:** `@prisma/client` (generated by `prisma generate`)

### Applied migrations (as of last review)

| Migration | Purpose |
|---|---|
| `20260808040444_init` | Initial schema |
| `20260811043600_add_publish_status_and_indexes` | Publish status + indexes |
| `20260811070000_add_tool_monitoring_checks` | Monitoring check table |
| `20260811073000_add_review_moderation_fields` | Review moderation fields |
| `20260811080000_add_tool_affiliate_fields` | Affiliate URL fields on Tool |

### Development vs production

| Environment | Typical `DATABASE_URL` | Notes |
|---|---|---|
| **Local dev** | Local Postgres or Neon dev branch | `.env.local` |
| **Production** | Neon/host Postgres | Host secret manager — never commit |

**The site does not read `lib/data/` at runtime.** After initial seeding, all live tool data comes from PostgreSQL.

### Safe migration workflow

**Development (schema change):**
```bash
npx prisma migrate dev --name describe_change
```

**Production:**
```bash
npx prisma migrate deploy
```
Then rebuild/restart the app (`npm run build` includes `prisma generate`).

### NEVER run casually on production

| Command | Risk |
|---|---|
| `npx prisma migrate reset` | **Wipes entire database** |
| `npm run db:seed` | Overwrites/bootstrap behavior — only with explicit approval |
| `npx prisma db push` | Can drift schema without migration history — avoid unless you know why |
| Raw SQL DELETE/TRUNCATE | Data loss |

**Rule:** Production migrations must be deliberate, reviewed, and backed up if possible.

---

## 10. Deployment

### Admin data changes (tools, reviews, affiliate, moderation)

| Step | Needed? |
|---|---|
| Redeploy code | **No** |
| Database migration | **No** (unless schema changed) |
| Restart server | **No** |
| Wait for cache | Possibly up to **1 hour** on some public pages |

### Code changes

```bash
npm install          # if dependencies changed
npm run lint         # TypeScript check (tsc --noEmit)
npm run build        # prisma generate + next build
npm run start        # production server on port 3000
```

Local dev: `npm run dev`

**Deploy workflow:**
1. Test locally
2. Commit (when ready)
3. Push to remote
4. Production host pulls and rebuilds

README references AI Studio / Cloud Run deployment. There is no `vercel.json` in the repo — deployment depends on your configured host.

### Environment variables

Configure in `.env.local` (local) or host secrets (production). **Never commit real secrets.**

| Variable | Purpose | Required production |
|---|---|---|
| `DATABASE_URL` | PostgreSQL connection for Prisma | **Yes** |
| `NEXT_PUBLIC_APP_URL` | Canonical site URL, sitemap, OG links | **Yes** |
| `APP_URL` | Fallback for site URL | Optional |
| `ADMIN_AUTH_SECRET` | Signs admin session cookies (≥ 32 chars) | **Yes** |
| `ADMIN_USERNAME` | Admin login username | **Yes** |
| `ADMIN_PASSWORD` | Plaintext or `sha256:` hash | **Yes** |
| `GEMINI_API_KEY` | In `.env.example` | **NOT used in application code** |
| `MONITORING_REQUEST_TIMEOUT_MS` | HTTP check timeout (default 10000) | Optional |
| `MONITORING_MAX_REDIRECTS` | Max redirects (default 5) | Optional |
| `MONITORING_MAX_BATCH_SIZE` | Batch check limit (default 25) | Optional |
| `VERIFICATION_STALE_DAYS` | Stale threshold (default 90) | Optional |
| `VERIFICATION_WARNING_DAYS` | Warning threshold (default 60) | Optional |
| `VERIFICATION_HIGH_PRIORITY_DAYS` | High priority threshold (default 180) | Optional |

Changing env vars typically requires a **host restart**, not necessarily a full rebuild.

---

## 11. Known intentional limitations

These are **not bugs**. They are deliberate scope boundaries in the current codebase.

| Limitation | Detail |
|---|---|
| No bulk tool import | One tool per Admin form entry |
| No category/persona/comparison CRUD in Admin | Seed/code/DB only |
| No article management UI | Seed only |
| No Tool FAQ management in Admin | Seed only |
| No scheduled monitoring | Manual checks only |
| No click tracking on affiliate links | Direct outbound links; analytics can be added later |
| `affiliateProgram` not shown publicly | Admin reference field only |
| No partner badge UI on listings | Disclosure text exists instead |
| `pricingSource` / `featureSource` not rendered as public links | Editorial audit fields only |
| `ToolSource` URLs not used as public CTAs | Editorial metadata only |
| `GEMINI_API_KEY` unused | Listed in `.env.example` but no app code reads it |
| Public page cache up to 1 hour | `revalidate = 3600` on key routes |
| Comparison pages link to tool profiles only | No direct vendor outbound links on comparison pages |
| Seed skips existing slugs | Re-running seed does not update existing tools |

---

## 12. Emergency troubleshooting

### Tool does not appear publicly

- Check Admin: is `publishStatus = published`?
- Does it pass indexability rules (logo, tagline, description lengths, website URL)?
- Is it in the correct category?
- Wait up to 1 hour for page cache, or redeploy to bust cache.
- Confirm you edited the **production** database, not local dev.

### Review does not appear publicly

- Must be **approved** in Admin Review Moderation.
- Tool must be **published**.
- Rejected/flagged/pending never show.
- Page cache may delay up to 1 hour.

### Admin change does not appear publicly immediately

- Admin UI updates immediately from DB.
- Public cached pages may lag up to **1 hour** (`revalidate = 3600`).
- Hard refresh browser (Ctrl+Shift+R).

### Affiliate link does not work

- Confirm **Affiliate URL** is valid http/https.
- Confirm **Use affiliate link for outbound CTAs** is checked.
- Save must succeed without validation errors.
- Check public page CTA — should say **Visit Website** (not "Visit Official Website") when affiliate is active.
- `websiteUrl` should still be the real official site (for monitoring).

### Monitoring fails

- Check **Official Website URL** — monitoring never uses affiliate URL.
- Run check again after fixing URL.
- Failure does not auto-unpublish.
- See error details in Admin → Website Monitoring section.

### Build fails

1. Read terminal error.
2. Run `npm run lint`.
3. Ensure `DATABASE_URL` is set.
4. Delete `.next` folder and rebuild.
5. Windows: if `prisma generate` fails with **EPERM**, stop all Node processes and retry.

### Prisma migration pending

On production:
```bash
npx prisma migrate deploy
```
Then restart/rebuild app. Compare `prisma/migrations/` folders against `npx prisma migrate status`.

### Admin login fails

1. URL: `/admin/login`
2. Check `ADMIN_USERNAME` / `ADMIN_PASSWORD` in environment.
3. Production requires `ADMIN_AUTH_SECRET` (≥ 32 chars).
4. Clear cookies and retry. Session expires after 1 hour.

---

## 13. Architecture map (file locations)

| System | Location |
|---|---|
| Public pages | `app/`, `components/` |
| Admin UI | `app/admin/`, `components/admin/AdminDashboard.tsx`, `AdminToolForm.tsx`, `AdminReviewModeration.tsx` |
| API routes | `app/api/` |
| Data access | `lib/dbRepository.ts` |
| Services | `lib/services/*.service.ts` |
| Validation | `lib/validation/` |
| SEO | `lib/seo/` |
| Monitoring | `lib/monitoring/` |
| Affiliate routing | `lib/utils/toolOutboundLink.ts`, `components/tool/ToolOutboundLink.tsx` |
| Verified date formatting | `lib/utils/formatDate.ts` |
| Reviews (public) | `components/review/` |
| Auth | `lib/auth/`, `middleware.ts` |
| Prisma schema | `prisma/schema.prisma` |
| Migrations | `prisma/migrations/` |
| Seed (bootstrap) | `prisma/seed.ts`, `lib/data/` |
| QA scripts | `scripts/test-admin-cms.ts`, `scripts/test-affiliate-links.ts`, `scripts/test-monitoring.ts`, `scripts/test-verified-date.ts` |

---

## 14. RULES FOR FUTURE AI DEVELOPERS

**Read this section before every task.**

1. **Inspect before changing.** Read this guide, grep the codebase, and understand existing behavior before editing.
2. **Do not redesign working systems unnecessarily.** The site is functional. Fix the requested problem with the smallest correct change.
3. **Do not modify seed/content data** (`lib/data/`, `prisma/seed.ts`) unless explicitly requested.
4. **Do not change SEO architecture** (`lib/seo/`) unless explicitly requested.
5. **Do not change reviews/moderation** unless explicitly requested. Never auto-sync visitor reviews into `Tool.rating` / `Tool.reviewCount` DB columns. Public hero/cards use `applyPublicReviewSignals()` overlays instead.
6. **Do not change monitoring behavior** unless explicitly requested. Monitoring must keep using official `websiteUrl` only.
7. **Do not change affiliate behavior** unless explicitly requested. Keep centralized routing in `toolOutboundLink.ts`.
8. **Do not run destructive DB commands** — no `migrate reset`, no blind `db push`, no seed on production.
9. **Never overwrite existing production data during testing.** Use dedicated test slugs; delete test records after QA (see `scripts/test-*.ts` patterns).
10. **Never commit `.env`, `.env.local`, or secrets.**
11. **Never commit `tsconfig.tsbuildinfo`** (build artifact).
12. **Before committing:** inspect `git diff`, `git status`, and every changed file. Keep unrelated changes out of commits.
13. **If asked to fix one feature, don't silently refactor unrelated systems.**
14. **If you discover a potential architectural issue, explain it to the owner before changing architecture.**
15. **Database is runtime source of truth.** Admin changes do not require redeploy. Code changes do.
16. **Do not add tools or content** unless explicitly asked — infrastructure tasks should not mutate the tool catalog.

---

## Appendix — Useful URLs

| URL | Purpose |
|---|---|
| `/admin` | Dashboard |
| `/admin/login` | Sign in |
| `/tools/[slug]` | Public tool page |
| `/category/[slug]` | Category listing |
| `/for/[slug]` | Persona page |
| `/ai-tools` | Main directory |
| `/ai-tool-finder` | Interactive finder |
| `/sitemap.xml` | SEO sitemap index |
| `/robots.txt` | Crawl rules |
| `/terms` | Terms of Service (affiliate disclosure reference) |
| `/privacy` | Privacy Policy |

---

## Appendix — “If I want to…” cheat sheet

| If I want to… | What to do |
|---|---|
| Add an AI tool | `/admin` → Add New AI Tool → fill sections → Save as Draft → Save & Publish |
| Edit a tool | `/admin` → pencil → edit → Save |
| Set affiliate link | Edit tool → Monetization & Links → affiliate URL + enable toggle → Save |
| Approve a review | `/admin` → Review Moderation → Approve |
| Check a website | Edit tool → Run Website Check |
| Change homepage | Edit `app/page.tsx`, `components/home/` → deploy |
| Change SEO | Edit `lib/seo/*` → deploy (not Admin) |
| Add a category | Edit seed/data + developer DB work (not Admin) |
| Deploy code | Test → commit → push → host rebuild |
| Deploy migration | `npx prisma migrate deploy` on production → restart |
| Change admin password | Update `ADMIN_PASSWORD` in host env → restart |

---

*End of Owner & Developer Handoff Guide*
