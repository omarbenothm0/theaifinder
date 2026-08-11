# AI Find — Owner / Operator Guide

This guide describes **how the site works today**, based on the actual codebase. It is written for you as the **owner/operator**, not as a developer handoff doc.

**Last reviewed against codebase:** August 2026  
**Admin URL:** `/admin` (login at `/admin/login`)

---

## Quick orientation

| What you do day-to-day | Where |
|---|---|
| Add/edit/delete AI tools | Admin → **Add New AI Tool** / edit pencil / trash icon |
| Moderate visitor reviews | Admin → **Review Moderation** section |
| Run a website health check | Admin → edit a tool → **Run Website Check** |
| Change homepage layout/copy | Code (`app/page.tsx`, `components/home/`) — **not in Admin** |
| Add categories/personas/comparisons | Code + database seed — **not in Admin** |
| Deploy code changes | Git push + host rebuild (see [Deployment](#7-deployment)) |
| Change live tool data | Admin — **no redeploy needed** |

---

## Owner workflows (step-by-step)

### How I add an AI tool

1. Go to **`/admin/login`** and sign in
2. Click **Add New AI Tool**
3. Fill in **Basic Information** (name, slug, logo URL, website)
4. Write **Content** (tagline ≥ 10 chars, description ≥ 50 chars)
5. Pick **Category** and **Pricing**
6. Add **Tags, Features, Pros/Cons** for search and tool page
7. Check **Target Personas** and **Alternative Tools** if applicable
8. Set **Badges** (Featured, Verified, etc.) and **Editorial Rating** if desired
9. Add **Verification** info and **Source JSON** when you have verified pricing/features
10. Click **Save as Draft** — fix any validation errors shown
11. When complete, click **Save & Publish** (or set Published + Save)
12. Optionally: edit tool → **Run Website Check**
13. Open **Preview public page** link to verify `/tools/[slug]`

### How I edit an AI tool

1. `/admin` → find tool in table (use search)
2. Click **pencil icon**
3. Change any section
4. **Save as Draft**, **Save Tool**, or **Save & Publish**
5. Public site updates from database (may cache up to ~1 hour)

### How I publish an AI tool

1. Ensure logo URL, tagline (≥10 chars), description (≥50 chars), website, category are filled
2. Watch the **indexability preview** in the Publish section — it should say “Ready for public indexing”
3. Click **Save & Publish** (recommended) or set Publish Status to Published and click Save
4. If validation fails, field-level errors appear in red under the relevant inputs

### How I manage reviews

1. `/admin` → **Review Moderation** (above tools table)
2. Default view shows **Pending** reviews
3. Click a review → **View details**
4. Read comment; check **Email (admin only)** if provided
5. Add optional **Moderation notes**
6. Click **Approve**, **Reject**, **Flag**, or **Delete**
7. Approved reviews appear in the tool page **User Reviews** section (not the hero rating)

### What I can do entirely from Admin

- Add, edit, delete AI tools (all Tool fields except schema-level relations below)
- Assign category, personas (target users), alternatives
- Manage pricing, features, pros/cons, tags, platforms, screenshots
- Manage sources, verification metadata, editorial review state
- Set draft / published / archived
- Set featured, verified, trending, API/mobile/extension flags
- Set editorial rating & review count (separate from visitor reviews)
- Moderate visitor reviews (approve/reject/flag/delete)
- Run manual website monitoring checks
- View monitoring signals in tools table

### What requires VS Code / Cursor

See [Appendix A](#appendix-a--what-still-requires-vs-code--developer-work).

---

## 1. What is managed from Admin?

### How to access Admin

1. Go to **`/admin/login`**
2. Sign in with **`ADMIN_USERNAME`** and **`ADMIN_PASSWORD`** from your environment (`.env.local` locally, host env vars in production)
3. Session lasts **1 hour**, then you must sign in again
4. Sign out via **Sign Out** in the top bar

All write actions (save tool, delete tool, moderate review, run monitoring check) require this session. If it expires, you are redirected back to login.

---

### Admin dashboard layout

After login, `/admin` shows:

1. **Header** — signed-in user, session expiry, Sign Out, **Add New AI Tool**
2. **Stats cards** — read-only counts (tools, categories, personas, comparisons, reviews, verified, featured, pending reviews)
3. **Review Moderation** — approve/reject/flag/delete visitor reviews
4. **Manage Tool Listings** — searchable/filterable table of all tools with edit/delete

**NOT CURRENTLY IMPLEMENTED in Admin UI:**

- Category create/edit/delete (select existing category only)
- Persona create/edit/delete (link tools to existing personas only)
- Comparison create/edit/delete
- Article/blog management
- Bulk CSV import of tools
- Scheduled/automatic monitoring runs
- PersonaTopTool ordered picks (separate from target-user links; seed-only today)

**Fully manageable from Admin for each Tool:**

- All core fields: name, slug, logo, website, tagline, description, company
- Category assignment, pricing model, monthly price, pricing tiers (JSON)
- Tags, features, pros, cons, platforms, screenshots
- Target personas (`targetUsers`), alternative tool links
- Badges: verified, featured, trending, has API/mobile/extension
- Editorial listing rating & review count (separate from visitor reviews)
- Verification: sources JSON, pricing/feature source URLs, review state, dates, notes
- Publish status: draft / published / archived
- Manual website monitoring check (edit mode)

---

### A. AI tools (add / edit / delete)

#### Where to find it

- **Add:** top-right **Add New AI Tool**
- **Edit:** table row → pencil icon → modal **Edit Tool**
- **Delete:** table row → trash icon → browser confirm dialog

#### What you can edit (Admin Tool form sections)

| Section | Fields |
|---|---|
| **Basic Information** | Tool Name*, URL Slug*, Logo URL, Official Website URL*, Company Name |
| **Content** | Tagline* (min 10 chars to publish), Full Description* (min 50 chars to publish) |
| **Category & Pricing** | Category*, Pricing Model*, Monthly Cost, Pricing Tiers (JSON) |
| **Lists & Details** | Tags, Features, Pros, Cons, Platforms (comma-separated), Screenshot URLs (one per line) |
| **Personas & Alternatives** | Target Personas (checkboxes), Alternative Tools (checkboxes) |
| **Badges & Listing Flags** | Verified, Featured, Trending, Has API/Mobile/Extension, Editorial Rating, Editorial Review Count |
| **Verification & Sources** | Pricing/Feature Source URLs, Verified By, Reviewed Date, Review State, Review Requested/Assigned, Review Notes, Source Metadata (JSON) |
| **Website Monitoring** (edit only) | Run Website Check + results |
| **Publish** | Publish Status + indexability preview |

\* Required to save. Publishing additionally requires logo URL, valid tagline/description lengths, and other indexability rules (shown in form when status = Published).

**Save buttons:**

| Button | What it does |
|---|---|
| **Save as Draft** | Forces `draft` status — skips publish validation |
| **Save Tool** | Saves with current Publish Status dropdown value |
| **Save & Publish** | Sets `published` and validates all publish requirements |

**Preview:** When editing, click **Preview public page** to open `/tools/[slug]` in a new tab.

**Publish Status meanings:**

| Value | Public listings | Tool page | SEO indexing |
|---|---|---|---|
| `draft` | Hidden | 404 for visitors | Not indexable |
| `published` | Visible (if other fields OK) | Live at `/tools/[slug]` | Eligible if indexability rules pass |
| `archived` | Hidden | 404 for visitors | Not indexable |

#### What happens after you save

1. Browser sends `POST /api/tools` (new) or `PUT /api/tools/[slug]` (edit)
2. Request goes through **middleware** — must be logged in as admin
3. **`lib/dbRepository.ts`** writes to **PostgreSQL** via Prisma
4. Admin table updates immediately in your browser
5. **Public site** reads from the same database — **no redeploy needed**

**Cache note:** Tool pages and homepage use Next.js caching (`revalidate = 3600` = up to **1 hour**). Admin changes can take up to an hour to appear on some public pages unless the cache is refreshed by a new deployment or time passing.

#### Database?

**Yes** — tool records live in PostgreSQL `Tool` table (and related tables when seeded).

#### Redeploy needed?

**No** for normal Admin saves.

#### SEO impact?

- **Yes, indirectly:** title/description/tagline/slug/publish status affect metadata and sitemap eligibility
- **Draft/archived** → `noindex`, excluded from public catalog logic
- **Published** → included in sitemap **only if** indexability rules pass (see section 2)

#### Public pages immediately?

- **Admin:** yes, immediately
- **Public site:** live data from DB, but cached pages may lag up to ~1 hour

---

#### Adding a new AI tool (step-by-step)

1. `/admin` → **Add New AI Tool**
2. Enter **name** (slug auto-fills)
3. Fill **tagline**, **description**, **category**, **pricing**, **website URL**
4. Leave **Publish Status = draft** while drafting
5. Click **Save Tool to Database**
6. When ready, edit tool → set **Publish Status = published** → save

**New tools default to `draft`** in the Admin form.

---

#### Editing an existing tool

Same modal, opened via pencil icon. Slug is editable but changing it changes the public URL — old URL will 404 unless you add redirects in code.

---

#### Deleting a tool

Trash icon → confirm. Sends `DELETE /api/tools/[slug]`.

- Removed from PostgreSQL
- **Also deletes** related reviews, monitoring checks, sources, pricing tiers (database cascade)
- **No redeploy** needed
- Public URL returns 404 after cache clears

---

#### Verification (editorial)

Verification in Admin is **manual editorial tracking**, not automatic proof.

| Field | Purpose |
|---|---|
| **Review State** | Your internal QA state (`unverified` → `verified`) |
| **Reviewed Date** | When you last verified content; feeds monitoring “stale” signals |
| **Verified By** | Who verified |
| **Review Notes** | Internal notes |
| **Verified badge** (table column) | **Verified** checkbox in Admin form |

Monitoring does **not** auto-verify tools. You update verification fields yourself after human review.

---

#### Sources

The **Source Metadata (JSON)** field saves to PostgreSQL `ToolSource` table on every save. Example:

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

Leave empty to clear all sources. Invalid JSON is rejected before save.

#### Pricing / features

| What | Admin | Database |
|---|---|---|
| Pricing model + monthly price | Yes | `Tool` |
| Pricing tiers (multi-plan) | Yes — JSON field | `PricingTier` table |
| Feature bullet list | Yes — comma-separated | `Tool.features[]` |
| Pros / cons | Yes — comma-separated | `Tool.pros[]`, `Tool.cons[]` |
| Pricing/feature source URLs | Yes | `Tool.pricingSource`, `Tool.featureSource` |

---

#### Categories

- Admin shows a **dropdown** of existing categories when editing tools
- Stats card shows category **count only**
- **NOT CURRENTLY IMPLEMENTED:** create/edit/delete categories in Admin
- Categories live in PostgreSQL, initially loaded from `lib/data/seedData.ts` via `npm run db:seed`

---

#### Personas

- Admin form: **Target Personas** checkboxes link a tool to persona pages via `Tool.targetUsers`
- Persona records themselves are **not** created/edited in Admin (seed/code only)
- **PersonaTopTool** (ordered featured tools on persona hub) is still seed-only — separate from target-user links

---

#### Reviews (moderation)

See [Section 3](#3-reviews--where-do-i-find-them).

---

#### Website monitoring

See [Section 4](#4-monitoring--where-do-i-see-problems).

---

### B. Review moderation

**Where:** `/admin` → **Review Moderation** section (above the tools table)

**Filter dropdown:** Pending (default), Approved, Rejected, Flagged, All

**Actions per review (expand row → View details):**

| Button | Effect |
|---|---|
| **Approve** | Status → `approved`; appears in public User Reviews section |
| **Reject** | Status → `rejected`; hidden from public |
| **Flag** | Status → `flagged`; hidden from public; for follow-up |
| **Delete** | Permanently removes row from database |

**Moderation notes:** optional internal text; stored in DB; **never shown to visitors**

**Email:** shown only in Admin expanded view when visitor provided one

---

### C. Stats cards (read-only)

| Card | Source |
|---|---|
| Total Tools | All tools in DB |
| Categories | Category count |
| Personas | Persona count |
| Comparisons | Comparison count |
| Approved Reviews | Reviews with status `approved` |
| Pending Reviews | Reviews with status `pending` |
| Verified Tools | Tools where `verified = true` |
| Featured Tools | Tools where `featured = true` |

You cannot click these to edit — they are informational.

---

## 2. How do I add my 100 real AI tools?

### The normal workflow (today)

**Primary path: Admin UI**

```
/admin → Add New AI Tool → fill form → Save → set Published when ready
```

Each tool is one manual Admin entry. There is **no bulk CSV import** and **no copy-from-template** feature.

### Do I add through Admin, database, code, or JSON files?

| Method | When to use | Runtime effect |
|---|---|---|
| **Admin UI** | Day-to-day additions | Writes directly to PostgreSQL |
| **PostgreSQL direct edit** | Avoid unless emergency | Works but bypasses validation — not recommended |
| **`lib/data/tools/*.ts` + seed** | Initial bootstrap / developer bulk load | Only runs when you execute `npm run db:seed`; **not** read at runtime |
| **Code changes** | Layout, SEO logic, new features | Requires redeploy |

**Runtime source of truth for public pages:** PostgreSQL only (via `lib/dbRepository.ts` → services).

The files in `lib/data/` are **seed templates**. The site does **not** read them on each request after seeding.

---

### Required vs optional fields (validation)

**Required to save through Admin (draft OK):**

- Name, slug, website URL, category

**Required to publish** (enforced by **Save & Publish** and when Publish Status = Published):

- Valid logo URL (`http://` or `https://`)
- Tagline ≥ 10 characters
- Description ≥ 50 characters
- Valid website URL
- Category assigned

The form shows an **indexability preview** when Publish Status is Published.

**All other fields are optional** but recommended for a complete listing: tags, features, pros/cons, pricing tiers, personas, alternatives, editorial rating, sources, badges.

---

### What happens when you publish/save?

1. Row inserted/updated in PostgreSQL `Tool`
2. Public API and pages query DB on next request
3. If `publishStatus = published`:
   - Appears in directory/search/category queries
   - Tool page live at `/tools/[slug]`
4. Sitemap includes tool **only if** `isToolIndexable()` passes (published + valid slug + tagline ≥ 10 chars + description ≥ 50 chars + valid website + valid logo URL + category)

---

### Slug / URL

- **Auto-generated** from tool name when creating (lowercase, non-alphanumeric → hyphens)
- **Editable** before first save
- Public URL: **`/tools/[slug]`**
- Slugs must be unique (save fails if duplicate)

---

### Does it automatically appear everywhere?

| Place | Automatic? | Condition |
|---|---|---|
| **Category page** (`/category/[slug]`) | Yes | `published` + matching `categoryId` |
| **Site search** (name/tagline/description/tags) | Yes | `published` + matches query |
| **AI Tool Finder** (`/ai-tool-finder`) | Yes | `published`; scored by category/tags/targetUsers |
| **Homepage featured/trending sections** | No | Needs `featured=true` or `trending=true` — **not settable in Admin UI today** |
| **Persona pages** (`/for/[slug]`) | No | Needs `targetUsers` containing persona slug or seed `PersonaTopTool` link |
| **Sitemap / Google indexing** | Conditional | Must pass indexability rules including **valid logo URL** |
| **Alternatives section** | Partial | Uses seed `ToolAlternative` links; else falls back to same-category tools |

---

### Fields you MUST NOT forget (practical checklist)

For each real tool you add via Admin:

- [ ] **Name + slug**
- [ ] **Logo URL** (required to publish / sitemap)
- [ ] **Tagline** (≥ 10 chars)
- [ ] **Description** (≥ 50 chars)
- [ ] **Category**
- [ ] **Website URL**
- [ ] **Tags + features** (search and finder)
- [ ] **Target personas** (if tool fits persona pages)
- [ ] **Alternative tools** (related tools section)
- [ ] **Pricing tiers JSON** (if multi-tier pricing on tool page)
- [ ] **Reviewed Date + sources** (verification audit trail)
- [ ] **Save as Draft** while building → **Save & Publish** when ready

---

### Recommended workflow for 100 tools

1. **Prepare a spreadsheet** with: name, slug, tagline, description, category, pricing, website, logo URL, tags, features, pros, cons
2. **Add via Admin** one at a time (or developer bulk seed/API)
3. Keep **`draft`** until copy is complete
4. Set **`published`** when verified
5. **Run Website Check** after publish
6. Spot-check public page: `/tools/[slug]`
7. Moderate any visitor reviews separately

---

## 3. Reviews — where do I find them?

### End-to-end flow

```
Visitor on /tools/[slug]
  → fills Review form (ReviewForm component)
  → POST /api/reviews (public, rate-limited)
  → PostgreSQL Review row, status = pending
  → Admin / Review Moderation (default filter: Pending)
  → You Approve / Reject / Flag / Delete
  → If approved: appears in "User Reviews" on tool page
```

### Visitor submission rules

- Tool must be **published**
- Rating: integer 1–5
- Comment: 10–2000 characters
- Email: optional (stored privately)
- Duplicate guard: same email + same tool cannot submit again within **24 hours** if prior submission is pending or approved
- Rate limit: **5 submissions per 15 minutes** per client

Visitors **cannot** set status or `verifiedUser` flag.

---

### Where you see each status

| Status | Where in Admin | Public site |
|---|---|---|
| **Pending** | Review Moderation → filter **Pending** (default) | Not visible |
| **Approved** | Filter **Approved** | Visible in **User Reviews** on `/tools/[slug]` |
| **Rejected** | Filter **Rejected** | Not visible |
| **Flagged** | Filter **Flagged** | Not visible |
| **All** | Filter **All** | — |

Pending count also shown in stats card and Review Moderation header.

---

### Where email appears

- **Admin only:** expand review → **Email (admin only)** field
- **Never** on public tool pages or public API

---

### Where moderation notes appear

- Enter in **Moderation notes (optional)** when expanding a review
- Stored in `Review.moderationNotes`
- **Admin only** — not shown to visitors
- Saved on Approve / Reject / Flag actions

Also stored: `moderatedBy` (your admin username) and `moderatedAt` timestamp.

---

### What each action does

| Action | Database change | Public effect |
|---|---|---|
| **Approve** | `status = approved`, moderation metadata saved | Review appears under **User Reviews**; included in that section’s average rating display |
| **Reject** | `status = rejected` | Stays hidden |
| **Flag** | `status = flagged` | Stays hidden; use for suspicious/spam follow-up |
| **Delete** | Row removed permanently | Gone everywhere; cannot undo |

**Important — two different “ratings” on tool pages:**

| Metric | Where shown | Updated by moderation? |
|---|---|---|
| **Hero rating** (`Tool.rating`, `Tool.reviewCount`) | Top of tool page, tool cards, finder | **No** — editorial/seed values |
| **User Reviews average** | “User Reviews” section only | **Yes** — computed from approved `Review` rows |

Approving reviews does **not** change the hero star rating or card listing numbers.

---

## 4. Monitoring — where do I see problems?

### Where results appear

1. **Tools table → Monitor column** — emoji + label per tool (loaded on Admin page load)
2. **Edit tool modal → Website Monitoring** — latest check details + **Run Website Check** button

**NOT CURRENTLY IMPLEMENTED:** automatic scheduled checks (no cron job in codebase). All checks are **manual**.

---

### Signal meanings

Signals are computed in `lib/monitoring/freshness.service.ts` from:

- Latest website check result (`ToolMonitoringCheck`)
- `lastVerifiedDate` on the tool (editorial verification age)

| Label in Admin | Meaning |
|---|---|
| **Healthy** 🟢 | Latest check succeeded AND verification date is recent |
| **Stale / needs verification** 🟡 | Verification date is old (default: ≥ 60 days warning, ≥ 90 days stale) OR approaching stale |
| **Website check failed** 🔴 | Latest HTTP check failed, timed out, or invalid URL |
| **Verification needs attention** ⚠️ | Never verified or other attention state without a successful check pattern |
| **Not checked yet** ⚪ | No monitoring check has been run for this tool |

Thresholds configurable via env vars: `VERIFICATION_WARNING_DAYS`, `VERIFICATION_STALE_DAYS`, `VERIFICATION_HIGH_PRIORITY_DAYS`.

---

### How to manually run a check

1. `/admin` → edit tool (pencil)
2. Scroll to **Website Monitoring**
3. Click **Run Website Check**

Or via API (admin session required): `POST /api/admin/monitoring/check` with `{ "toolId": "..." }`.

The check:

- Uses **`websiteUrl` from the tool record** (never arbitrary URLs)
- Stores result in `ToolMonitoringCheck` table
- Does **not** change tool content, publish status, or verification fields

---

### What monitoring does NOT do automatically

- Does not update pricing, features, or descriptions
- Does not change `reviewState` or `verified` flag
- Does not unpublish broken tools
- Does not email you alerts
- Does not run on a schedule

Admin modal explicitly states: *“Monitoring reports website reachability only. Editorial verification, pricing, and features must be updated manually after human review.”*

---

### What you should do when a tool fails

1. Open the tool in Admin → check monitoring details (HTTP status, error message)
2. Visit the **Official Website URL** yourself — typo? domain dead? redirect loop?
3. Fix **`websiteUrl`** in Admin if wrong → save
4. **Run Website Check** again
5. If site is fine but content is outdated, update editorial fields and set a new **Reviewed Date**
6. Decide editorially if tool should stay published

---

## 5. Database — what actually lives where?

### Request flow

```
Admin UI (browser)
  ↓ fetch POST/PUT/DELETE/PATCH
API routes (app/api/...)
  ↓
Services (lib/services/*.service.ts) — optional layer
  ↓
Repository (lib/dbRepository.ts)
  ↓
Prisma Client (@prisma/client)
  ↓
PostgreSQL
  ↓
Public pages read same stack on GET
```

---

### What lives in PostgreSQL (runtime data)

| Data | Table(s) | Managed via Admin? |
|---|---|---|
| **Tools** | `Tool` | Yes (partial fields) |
| **Tool sources** | `ToolSource` | Seed only today — Admin JSON not saved |
| **Pricing tiers** | `PricingTier` | Seed only |
| **Tool FAQs** | `ToolFAQ` | Seed only |
| **Tool alternatives** | `ToolAlternative` | Seed only |
| **Categories** | `Category`, `CategoryFAQ` | Seed / code only |
| **Personas** | `Persona`, `PersonaFAQ`, `PersonaTopTool` | Seed / code only |
| **Comparisons** | `Comparison`, `ComparisonFeature` | Seed / code only |
| **Articles** | `Article` | Seed / code only |
| **Visitor reviews** | `Review` | Submit public / moderate Admin |
| **Monitoring checks** | `ToolMonitoringCheck` | Created by manual checks |

---

### What lives in code / data files (not runtime)

| Data | Location | Purpose |
|---|---|---|
| Initial seed content | `lib/data/seedData.ts`, `lib/data/tools/*.ts` | `npm run db:seed` bootstrap |
| SEO logic | `lib/seo/*` | Metadata, sitemap, indexability, JSON-LD |
| Monitoring logic | `lib/monitoring/*` | Health checks, signal labels |
| Page layouts & design | `app/**`, `components/**` | UI |
| Auth logic | `lib/auth/*`, `middleware.ts` | Admin sessions |
| Validation rules | `lib/validation/*` | Input checks |

**After seeding, editing `lib/data/` files does nothing to production until you re-run seed (which skips existing slugs) or change code.**

---

## 6. Code vs Admin

| Thing | Change in Admin? | Change in VS Code? | Redeploy needed? |
|---|---|---|---|
| Add AI tool (basic fields) | Yes | Optional (seed/API) | No (Admin) / Yes (code) |
| Edit tool description | Yes | — | No |
| Change tool pricing model/price | Yes | — | No |
| Set tool logo URL | Yes | — | No |
| Edit tags/features/pros/cons | Yes | — | No |
| Set featured/trending badges | Yes | — | No |
| Edit pricing tiers | Yes (JSON field) | Seed (bootstrap only) | No |
| Edit sources | Yes (JSON field) | Seed (bootstrap only) | No |
| Link personas / alternatives | Yes | — | No |
| Approve review | Yes | — | No |
| Change SEO template/metadata logic | No | Yes (`lib/seo/`) | Yes |
| Change page design/homepage | No | Yes (`app/`, `components/`) | Yes |
| Add new database field | No | Yes (Prisma schema + migration) | Yes + migrate |
| Change monitoring behavior | No | Yes (`lib/monitoring/`) | Yes |
| Change validation rules | No | Yes (`lib/validation/`) | Yes |
| Add a new feature | No | Yes | Yes |
| Change navigation | No | Yes | Yes |
| Add category/persona/comparison | No | Yes (seed/data) | Seed: no; code: yes |
| Change admin password | No | Env vars on host | Restart/redeploy host |
| Run website monitoring check | Yes | — | No |

---

## 7. Deployment

**This section documents workflow only — nothing is executed automatically by this guide.**

### Admin data change (tools, reviews, moderation)

| Step | Needed? |
|---|---|
| Redeploy | **No** |
| Database migration | **No** |
| Restart server | **No** (live DB read) |
| Wait for cache | Possibly up to **1 hour** on some pages |

---

### Code change

Typical local workflow:

```bash
npm install          # if dependencies changed
npm run lint         # TypeScript check
npm run build        # prisma generate + next build
npm run start        # production server locally on port 3000
```

**What `npm run build` does:** `prisma generate` then `next build`

**Git workflow (when you choose to deploy):**

1. Make changes in Cursor/VS Code
2. Test locally (`npm run dev` or `npm run build && npm run start`)
3. **Commit** when ready (you control when)
4. **Push** to remote (you control when)
5. Production host pulls/builds — depends on your hosting (README references AI Studio / Cloud Run; no `vercel.json` in repo)

Production receives code changes only after your host rebuilds from the new commit.

---

### Database schema change (migrations)

When a developer changes `prisma/schema.prisma`:

**Development:**

```bash
npx prisma migrate dev --name describe_change
```

**Production:**

```bash
npx prisma migrate deploy
```

Then rebuild/restart the app so `prisma generate` runs.

**Warning:** Never edit applied migration SQL files manually unless you know exactly why.

---

### Environment variables on deploy

Ensure production host has all required vars (see Section 8). Changing env vars typically requires **host restart**, not necessarily full rebuild.

---

## 8. Environment variables / secrets

**Never commit real secrets.** Configure in `.env.local` (local) or your host’s secret manager (production).

| Variable | Used for | Required dev | Required production | Where to set |
|---|---|---|---|---|
| `DATABASE_URL` | PostgreSQL connection for Prisma | Yes | Yes | `.env.local` / host secrets |
| `NEXT_PUBLIC_APP_URL` | Canonical site URL, sitemap, OG links | Recommended | **Yes** | `.env.local` / host |
| `APP_URL` | Fallback for site URL | Optional | Optional fallback | `.env.local` / host |
| `ADMIN_AUTH_SECRET` | Signs admin session cookies (≥ 32 chars prod) | Recommended | **Yes** | `.env.local` / host |
| `ADMIN_USERNAME` | Admin login username | Optional (default `admin`) | **Yes** | `.env.local` / host |
| `ADMIN_PASSWORD` | Admin login password (or `sha256:...` hash) | Optional (fallback dev password) | **Yes** | `.env.local` / host |
| `GEMINI_API_KEY` | Listed in `.env.example` | — | — | **NOT CURRENTLY USED in application code** |
| `MONITORING_REQUEST_TIMEOUT_MS` | HTTP check timeout (default 10000) | No | Optional | Host env |
| `MONITORING_MAX_REDIRECTS` | Max redirects (default 5) | No | Optional | Host env |
| `MONITORING_MAX_BATCH_SIZE` | Batch check limit (default 25) | No | Optional | Host env |
| `VERIFICATION_STALE_DAYS` | Days until verification “stale” (default 90) | No | Optional | Host env |
| `VERIFICATION_WARNING_DAYS` | Days until “approaching stale” (default 60) | No | Optional | Host env |
| `VERIFICATION_HIGH_PRIORITY_DAYS` | High priority threshold (default 180) | No | Optional | Host env |
| `MONITORING_USER_AGENT` | User-Agent string for checks | No | Optional | Host env (not in `.env.example`) |
| `NEXTAUTH_SECRET` | Fallback if `ADMIN_AUTH_SECRET` unset | No | Not recommended | Avoid — set `ADMIN_AUTH_SECRET` |

---

## 9. “Do not touch this” list

Unless you know exactly what you are doing, avoid manually editing:

| Item | Why |
|---|---|
| `prisma/migrations/**` | Applied migration history — breaking changes corrupt DB |
| `node_modules/@prisma/client` | Generated — run `prisma generate` instead |
| `.next/**` | Build output — safe to delete for clean rebuild, don’t edit |
| Production `DATABASE_URL` credentials | Lockout / data loss risk |
| Raw PostgreSQL tool/review rows | Bypasses validation; use Admin |
| `middleware.ts` / `lib/auth/*` | Breaks admin login if wrong |
| `lib/seo/*` | Breaks indexing/metadata sitewide |
| `lib/monitoring/*` | Breaks health check behavior |
| `.env.local` / production secrets in git | Security exposure |
| `lib/dbRepository.ts` | Central data layer — one bug affects entire site |
| Committing `.env` files | Secrets leak |

**Safer clean rebuild (when dev server acts strange):**

```bash
# Stop the running Node/Next process first, then:
rm -rf .next
npm run build
```

On Windows PowerShell: `Remove-Item -Recurse -Force .next`

---

## 10. Emergency / common problems

### Admin login doesn’t work

1. Confirm URL: `/admin/login`
2. Check `ADMIN_USERNAME` / `ADMIN_PASSWORD` in environment (not the `.env.example` defaults unless you copied them)
3. Production requires `ADMIN_AUTH_SECRET` (≥ 32 chars) and `ADMIN_PASSWORD` set — app throws on startup if missing
4. Clear browser cookies for the site and retry
5. Session expires after **1 hour**

---

### Website won’t build

1. Read the error in terminal
2. Run `npm run lint` for TypeScript errors
3. Ensure `DATABASE_URL` is set (build may need Prisma)
4. Delete `.next` and rebuild
5. On Windows: if `prisma generate` fails with **EPERM**, stop all Node processes and retry

---

### Prisma generate fails

- Stop dev/production Node processes locking DLL files (common on Windows)
- Run: `npx prisma generate`
- Verify `DATABASE_URL` format: `postgresql://...`

---

### Database connection fails

1. Verify `DATABASE_URL` in `.env.local` / host
2. Confirm Postgres/Neon instance is running and IP allowlist includes your host
3. Test with: `npx prisma db pull` (developer diagnostic)

**Dangerous (data loss risk):** `npx prisma migrate reset` — wipes database. **Do not run on production.**

---

### A tool disappeared

- Check Admin with search — filter may hide it
- May be **draft/archived** (`publishStatus`)
- May have been **deleted** from Admin
- Wrong slug in URL — check Admin table slug column

---

### A review doesn’t appear publicly

- Must be **approved** in Admin
- Tool must be **published**
- Page cache may delay up to 1 hour
- Rejected/flagged/pending never show publicly

---

### A review is stuck pending

- Go Admin → Review Moderation → Pending → Approve/Reject/Flag/Delete
- If not listed, check **All** filter
- Visitor submit may have failed validation (rate limit, duplicate email guard)

---

### Tool website fails monitoring

- Fix `websiteUrl` if wrong
- Run check again manually
- Monitoring failure does **not** auto-unpublish

---

### Production shows stale data

- Next.js `revalidate = 3600` on key pages — wait or redeploy to bust cache
- Confirm you edited **production database**, not local dev DB
- Hard refresh browser (Ctrl+Shift+R)

---

### Migration is pending

Production needs:

```bash
npx prisma migrate deploy
```

Then restart app. Check `prisma/migrations/` for unapplied folders.

---

### Next.js `.next` cache corrupted

Symptoms: random 500s, stale routes, build weirdness.

**Fix (stop server first):**

```bash
Remove-Item -Recurse -Force .next   # PowerShell
npm run build
```

---

## 11. Current architecture map

### Frontend (public pages)

- **Folder:** `app/` (Next.js App Router pages), `components/`
- **Examples:** `app/page.tsx` (home), `app/tools/[slug]/page.tsx`, `app/category/[slug]/page.tsx`
- Reads data via `lib/services/*.service.ts`

### API

- **Folder:** `app/api/`
- Public reads: `GET /api/tools`, `GET /api/reviews?toolSlug=...`
- Public writes: `POST /api/reviews`, `POST /api/finder`
- Admin: `app/api/admin/*`, tool mutations `POST/PUT/DELETE /api/tools`

### Admin

- **Pages:** `app/admin/page.tsx`, `app/admin/login/page.tsx`
- **UI:** `components/admin/AdminDashboard.tsx`, `components/admin/AdminReviewModeration.tsx`

### Database

- **PostgreSQL** (connection string `DATABASE_URL`)
- Hosted e.g. Neon locally/production — whatever you configured

### Prisma

- **Schema:** `prisma/schema.prisma`
- **Migrations:** `prisma/migrations/`
- **Seed script:** `prisma/seed.ts` → `npm run db:seed`

### SEO

- **Folder:** `lib/seo/`
- **Key files:** `metadata.ts`, `jsonld.ts`, `indexability.ts`, `sitemap-builder.ts`, `app/sitemap.ts`
- Controls titles, canonical URLs, robots, sitemap entries, structured data

### Reviews

- **Public UI:** `components/review/*`, `ToolReviewsSection` on tool page
- **API:** `app/api/reviews/route.ts`, `app/api/admin/reviews/*`
- **Validation:** `lib/validation/review.validation.ts`

### Monitoring

- **Folder:** `lib/monitoring/`
- **API:** `app/api/admin/monitoring/route.ts`, `app/api/admin/monitoring/check/route.ts`
- **Test script:** `scripts/test-monitoring.ts` (developer QA)

### Authentication

- **Folder:** `lib/auth/adminSession.ts`, `lib/auth/edgeSession.ts`
- **Gate:** `middleware.ts` protects `/admin`, `/api/admin`, and all API write methods except public review/finder submit

### Data access layer

- **Primary:** `lib/dbRepository.ts`
- **Thin repos:** `lib/repositories/*.repository.ts`
- **Services:** `lib/services/*.service.ts`

---

## 12. “If I want to do X” cheat sheet

| If I want to… | What to do |
|---|---|
| **Add an AI tool** | `/admin` → **Add New AI Tool** → fill all sections → **Save as Draft** → review → **Save & Publish** |
| **Edit an AI tool** | `/admin` → pencil icon → edit sections → **Save Tool** or **Save & Publish** |
| **Verify an AI tool (editorial)** | Edit tool → set Review State, Reviewed Date, Verified By, sources, **Verified** checkbox → save |
| **Delete an AI tool** | `/admin` → trash icon → confirm |
| **Approve a review** | `/admin` → Review Moderation → expand → **Approve** |
| **Reject a review** | Same → **Reject** |
| **Flag suspicious review** | Same → **Flag** |
| **Remove review permanently** | Same → **Delete** |
| **Check broken websites** | Edit tool → **Run Website Check**; read Monitor column in table |
| **Change homepage** | Edit code: `app/page.tsx`, `components/home/HomePageClient.tsx` → commit → deploy |
| **Change SEO behavior** | Edit `lib/seo/*` → deploy (not Admin) |
| **Add a feature** | Code change → test → commit → deploy |
| **Change database structure** | Developer: edit `prisma/schema.prisma` → migrate → deploy |
| **Deploy a code change** | Test locally → commit → push → host rebuilds |
| **Deploy a database migration** | `npx prisma migrate deploy` on production → restart app |
| **Bulk load initial tools** | Developer: `lib/data/tools/*.ts` + `npm run db:seed` (skips existing slugs) |
| **Add a category/persona** | **NOT in Admin** — edit `lib/data/seedData.ts` + seed, or developer DB work |
| **Change admin password** | Update `ADMIN_PASSWORD` in host env → restart |
| **Sign out of Admin** | **Sign Out** button |

---

## Appendix A — What still requires VS Code / developer work

| Item | Why not in Admin |
|---|---|
| Create/edit **categories** | No category CRUD UI — only selection of existing categories |
| Create/edit **personas** | No persona CRUD UI — only link tools via Target Personas checkboxes |
| Create/edit **comparisons** | Comparison model has no Admin UI |
| Create/edit **articles** | Article model has no Admin UI |
| **PersonaTopTool** ordering | Seed-only join table for ordered persona featured picks |
| **Bulk import** (100 tools CSV) | No bulk import feature — one tool per Admin form |
| Homepage layout/design | React components in `app/` and `components/` |
| SEO engine logic | `lib/seo/*` code |
| Monitoring thresholds/behavior | `lib/monitoring/*` + env vars |
| Database schema changes | Prisma migrations |
| Scheduled monitoring | Not implemented |

Everything in the **Tool form sections** table (Section 1) is manageable entirely from Admin without VS Code.

---

## Appendix B — Useful URLs

| URL | Purpose |
|---|---|
| `/admin` | Dashboard |
| `/admin/login` | Sign in |
| `/tools/[slug]` | Public tool page |
| `/category/[slug]` | Category listing |
| `/ai-tools` | Main directory |
| `/sitemap.xml` | SEO sitemap index |
| `/api/tools` | JSON tool list (GET) |

---

*End of Owner Guide*
