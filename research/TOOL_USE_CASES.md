# Tool ↔ Use Case Fit Evidence

**Last updated:** 2026-08-11  
**Entries:** 28 VERIFIED + 2 exclude (Phase 3 complete)  
**Verification date:** 2026-08-11 (official primary sources only)

Records **evidence-backed** fit between tools and canonical use cases. No tool is listed on a use-case page until a VERIFIED entry exists here with official primary sources. Nothing auto-promoted to PROPOSED/APPROVED.

---

## Rules

- Fit tiers: `primary` / `strong` / `partial` / `listed` / `exclude`
- **Strong+** = `primary` or `strong` (used for ≥3 page bar)
- Every claim cites official URL + access date
- Status: VERIFIED only in this file after Phase 3 official-source pass
- Reuse from `TOOLS.md` requires new PM/use-case verification before entry here

---

## Entry template

```
TOOL_USE_CASE: [tool] × [use-case slug] | Fit: [tier] | Capabilities: [verified list] | Pricing: [official summary] | Integrations: [official list or NOT VERIFIED subset] | Limitation: [1 line] | Sources: [urls] | Evidence quality: HIGH/MEDIUM/LOW | Status: VERIFIED | Verified: YYYY-MM-DD
```

---

## Verified mappings — meeting-notes (`meeting-notes`)

TOOL_USE_CASE: Otter.ai × meeting-notes | Fit: **primary** | Capabilities: Auto-join Zoom/Meet/Teams; live + post-meeting transcription; AI summaries with decisions/action items; automated action-item capture; bot-free desktop recording; multilingual transcription (EN, FR, ES, DE, JA, ZH); meeting search + AI Chat across meetings | Pricing: Basic **free** (300 min/mo transcription, 30 min/meeting cap); Pro **$8.33/user/mo** annual ($16.99 monthly); Business **$19.99/user/mo** | Integrations (official): Zoom, Google Meet, Microsoft Teams, Slack, Salesforce, HubSpot, Jira, Notion, Asana, Google Calendar/Docs, Dropbox, Claude (MCP) | Limitation: Advanced CRM/workflow integrations largely on paid tiers; minute caps on free tier | Sources: https://otter.ai/ , https://otter.ai/pricing | Evidence quality: **HIGH** | Status: **VERIFIED** | Verified: 2026-08-11

TOOL_USE_CASE: Fireflies.ai × meeting-notes | Fit: **primary** | Capabilities: Calendar auto-join bot; transcription (95% accuracy claimed); AI summaries (overview, bullets, action items, custom notes); 100+ languages; speaker ID; meeting search + AskFred; Chrome extension for Meet; mobile/desktop capture; live assist | Pricing: **Free** (400 min storage/team); Pro **$10/seat/mo** annual ($18 monthly); Business **$19/seat/mo** annual; Enterprise **$39/seat/mo** annual | Integrations (official): CRM (Salesforce, HubSpot, etc.), project management (Asana + category), Slack, ATS, 50+ native + Zapier; MCP for Claude/ChatGPT | Limitation: Storage caps on lower tiers; advanced conversation intelligence on Business+ | Sources: https://fireflies.ai/ , https://fireflies.ai/pricing | Evidence quality: **HIGH** | Status: **VERIFIED** | Verified: 2026-08-11

TOOL_USE_CASE: Fathom × meeting-notes | Fit: **primary** | Capabilities: Bot or bot-free capture; transcripts + instant AI summaries; AI action items; Ask Fathom Q&A across calls; keyword alerts; CRM/workflow sync | Pricing: Individual **Free** (unlimited recordings/transcripts); Premium **$16/mo** annual ($20 monthly); Team **$15/user/mo** annual min 2 users; Business **$25/user/mo** annual | Integrations (official): Slack, Salesforce, HubSpot, Notion, Asana, Zapier/Make, Claude/ChatGPT, public API/MCP | Limitation: Team features require 2+ seats; some CRM sync limits on lower tiers | Sources: https://www.fathom.video/ , https://www.fathom.video/pricing | Evidence quality: **HIGH** | Status: **VERIFIED** | Verified: 2026-08-11

TOOL_USE_CASE: tl;dv × meeting-notes | Fit: **primary** | Capabilities: Record/transcribe/summarize Zoom, Google Meet, Teams; bot optional; customizable AI meeting minutes templates; topic clustering; action-item assignment; multi-meeting weekly summaries; CRM/workflow sync | Pricing: **Free forever** (official); Pro **€18/seat/mo** annual (€29 monthly); Business **€29/seat/mo** annual (€39 monthly) — EUR on pricing page | Integrations (official): HubSpot, Slack, Notion, Zoom, Meet, Teams; 5000+ apps via automation (official claim) | Limitation: Pricing displayed in EUR; native mobile app not yet available (official FAQ) | Sources: https://tldv.io/ , https://tldv.io/features/ai-meeting-minutes , https://tldv.io/app/pricing | Evidence quality: **HIGH** | Status: **VERIFIED** | Verified: 2026-08-11

TOOL_USE_CASE: Sembly AI × meeting-notes | Fit: **primary** | Capabilities: Native Zoom, Teams, Google Meet, Webex; transcription (48 languages); AI meeting notes/summaries; automatic task detection; action items with owners/deadlines; meeting upload (MP3/MP4/WAV); in-person mic recording; Semblian AI chat | Pricing: Basic **$10/mo** annual ($17 monthly); Pro **$20/user/mo** annual ($29 monthly); Max **$30/user/mo** annual ($39 monthly) | Integrations (official): Salesforce, Notion, Slack, HubSpot, 50+ tools; Zapier/webhooks; MCP on Pro+ | Limitation: AI-generated documents capped per plan (5/user Pro, 40/user Max); video HD on Max | Sources: https://www.sembly.ai/ , https://www.sembly.ai/pricing | Evidence quality: **HIGH** | Status: **VERIFIED** | Verified: 2026-08-11

TOOL_USE_CASE: Zoom AI My Notes × meeting-notes | Fit: **strong** | Capabilities: AI note-taking across Zoom + third-party platforms (Teams, Meet) bot-free; real-time transcription; post-meeting summaries with takeaways/action items; workflows for recap emails/tasks; in-person + mobile capture | Pricing: My Notes Basic **free** (3 AI note uses/mo); My Notes add-on **$8.33/user/mo** annual on Workplace Basic (unlimited AI note-taking per plan page); bundled in Zoom Workplace / ZoomMate paid plans (from **$14.16/user/mo** cited on comparison page) | Integrations (official): Zoom Hub, Zoom Canvas, Slack (summary send on eligible plans), calendar | Limitation: **Platform feature** — requires Zoom client 6.7.5+; full value tied to Zoom Workplace ecosystem; not a standalone cross-stack notetaker SKU | Sources: https://www.zoom.com/en/products/ai-assistant/features/ai-note-taking/ | Evidence quality: **HIGH** | Status: **VERIFIED** | Verified: 2026-08-11

TOOL_USE_CASE: Google Gemini in Google Meet × meeting-notes | Fit: **strong** | Capabilities: Gemini automates meeting notes in Meet; transcribe/s summarize calls; extract insights and action items; meeting recordings + transcripts; Docs integration for meeting minutes (Workspace) | Pricing: **NOT VERIFIED** as standalone SKU — requires Google Workspace plan with Gemini in Meet (Workspace pricing varies by edition; see workspace.google.com/pricing — not verified this session) | Integrations (official): Google Meet, Google Docs, Google Workspace apps | Limitation: **Ecosystem feature** — not standalone notetaker; requires Google Workspace; pricing/plan gating not fully verified this session | Sources: https://workspace.google.com/products/meet/ , https://workspace.google.com/solutions/ai/ | Evidence quality: **HIGH** (features) / pricing **NOT VERIFIED** | Status: **VERIFIED** | Verified: 2026-08-11

TOOL_USE_CASE: Microsoft 365 Copilot (Teams meetings) × meeting-notes | Fit: **strong** | Capabilities: Invoke Copilot in Teams meetings/calls; uses real-time transcript to answer questions; captures key points, task owners, next steps (Calls feature); meeting recap/summary in Teams (Copilot in Teams) | Pricing: Copilot Business add-on **~$18/user/mo** annual promo price shown (from $21) on microsoft.com pricing page — **requires eligible M365 subscription**; Business Standard with Copilot **$23.50/user/mo** annual bundle cited | Integrations (official): Microsoft Teams, Microsoft 365 Graph (Word, Outlook, Planner, etc.) | Limitation: **Not a dedicated notetaker product** — requires M365 Copilot license + Teams; cross-platform meeting capture unlike Otter/Fireflies; Teams license required | Sources: https://learn.microsoft.com/en-us/microsoft-365-copilot/microsoft-365-copilot-overview , https://www.microsoft.com/en-us/microsoft-365/copilot/pricing | Evidence quality: **HIGH** | Status: **VERIFIED** | Verified: 2026-08-11

### meeting-notes — Phase 3 bar check

| Metric | Result |
|---|---|
| Candidates in pool | 8 |
| Verified (any fit) | 8 |
| **Strong+ (`primary`/`strong`)** | **8** |
| Meets ≥3 strong+ bar? | **YES** |

---

## Verified mappings — project-reporting (`project-reporting`)

TOOL_USE_CASE: Microsoft PowerPoint + Copilot × project-reporting | Fit: **primary** | Capabilities: Copilot in PowerPoint generates presentations from prompts; **official example prompt: "Generate a project status update deck with timelines, risks, and next steps"**; add slides, summaries, speaker notes; export/share standard PPT workflow | Pricing: Requires **Microsoft 365 Copilot** license (add-on ~$18/user/mo annual on pricing page) + PowerPoint in M365; **not included in free PowerPoint** | Integrations (official): Native PowerPoint/M365; Word file import for deck generation; Microsoft 365 tenant | Limitation: Deck-oriented — not auto-RAG status report from live PM tool data without manual prompt/context; Copilot license required | Sources: https://www.microsoft.com/en-us/microsoft-365/powerpoint/ai-powerpoint-generator , https://www.microsoft.com/en-us/microsoft-365/copilot/pricing | Evidence quality: **HIGH** | Status: **VERIFIED** | Verified: 2026-08-11

TOOL_USE_CASE: Gamma × project-reporting | Fit: **partial** | Capabilities: AI-generated presentations, docs, websites from prompts; export PDF, PPTX, PNG, Google Slides; team workspace templates (Team/Business plans) | Pricing: **Free** (10 slides/prompt); Plus/Pro/Ultra paid tiers (per-user); Team **$240/seat/yr** (2 min); Business **$480/seat/yr** (10 min) — help.gamma.app | Integrations (official): PPTX/PDF/Google Slides export; API on Pro+; no native Jira/Asana status sync verified on official pages | Limitation: **General AI presentation builder** — no official PM status-report/RAG/milestone schema on gamma.app; stakeholder **deck** use case only | Sources: https://gamma.app/pricing , https://help.gamma.app/ | Evidence quality: **HIGH** | Status: **VERIFIED** | Verified: 2026-08-11

TOOL_USE_CASE: Beautiful.ai × project-reporting | Fit: **partial** | Capabilities: AI presentation workflow; "Reports & Reviews" template category; Smart Slides; data-linked charts; export PDF/PPTX | Pricing: Pro **$12/mo** annual; Team **$40/user/mo** annual ($50 monthly); Enterprise custom — beautiful.ai/pricing | Integrations (official): PowerPoint import/export; team workspace libraries | Limitation: **Presentation design tool** — no official structured project status report (RAG, blockers, milestone tables) generator | Sources: https://www.beautiful.ai/ , https://www.beautiful.ai/pricing | Evidence quality: **HIGH** | Status: **VERIFIED** | Verified: 2026-08-11

TOOL_USE_CASE: Notion AI × project-reporting | Fit: **partial** | Capabilities: Research Mode — official help: use to "creating a report on a project"; product page: "Automate weekly reporting"; Custom Agents; generates reports from workspace + connected apps (Slack, Drive, Jira, Asana, GitHub via connectors) | Pricing: Notion AI on **Business/Enterprise** plans (Business plan pricing on notion.com/product — **NOT VERIFIED** exact $/seat this session); Custom Agents credits add-on | Integrations (official): Slack, Google Drive, GitHub, Jira, Asana, Zendesk (connectors); exports to Notion pages | Limitation: **General workspace reporting** — no official PM RAG status-report template; requires Notion Business+ for full AI; not a dedicated status-report SKU | Sources: https://www.notion.com/product/ai , https://www.notion.com/help/research-mode | Evidence quality: **HIGH** | Status: **VERIFIED** | Verified: 2026-08-11

TOOL_USE_CASE: Sembly AI × project-reporting | Fit: **primary** | Capabilities: Official **Project Status Report** type — milestone updates, task assignments, resource constraints, flagged risks; PDF/DOCX/HTML/Markdown export; grounded in meeting transcripts | Pricing: Same as meeting-notes (Pro $20/user/mo annual) — AI docs capped 5/user/mo on Pro | Integrations: Same as meeting-notes | Limitation: Report sourced from **meeting content**, not live Jira/Asana unless discussed in meetings; doc caps on lower tiers | Sources: https://www.sembly.ai/ai-report-generator/ , https://www.sembly.ai/pricing | Evidence quality: **HIGH** | Status: **VERIFIED** | Verified: 2026-08-11

TOOL_USE_CASE: Onplana Status Report Writer × project-reporting | Fit: **primary** | Capabilities: Free AI tool: paste Slack/meeting/ticket updates → executive status report with **RAG status**, accomplishments, blockers (severity + owner), decisions needed, next-week plan; markdown/PDF output | Pricing: **Free** (20 reports/hour/IP; 500/day global budget per FAQ); full Onplana product separate | Integrations: Copy to Slack/Confluence/Notion/Docs (manual); paid Onplana cites Jira/Asana-style data — **NOT VERIFIED** for free tool | Limitation: **Free paste-only tool** v1 — no CSV/Jira import on free tier; full PM platform is separate paid product | Sources: https://onplana.com/tools/status-report-writer | Evidence quality: **HIGH** | Status: **VERIFIED** | Verified: 2026-08-11

### project-reporting — Phase 3 bar check

| Metric | Result |
|---|---|
| Active candidate pool | 6 (Tome **dropped**) |
| Verified (any fit) | 6 |
| **Strong+ (`primary`/`strong`)** | **3** (Copilot/PPT, Sembly, Onplana) |
| Partial | 3 (Gamma, Beautiful.ai, Notion AI) |
| Meets ≥3 strong+ bar? | **YES** |

---

---

## Verified mappings — task-management (`task-management`)

TOOL_USE_CASE: ClickUp Brain² × task-management | Fit: **primary** | Capabilities: Official Brain² page: **AI Tasks** (structured work units with state/owners); **AI Assign & Prioritize** (Everything AI plan); ambient task suggestions; Deep Search across tasks/docs; Project Manager persona "Plans and rebalances the week"; multi-model AI chat with workspace context | Pricing: Brain AI **$9/user/mo**; Everything AI **$28/user/mo** (annual pricing on clickup.com/pricing); base workspace from **$7/user/mo** Unlimited | Integrations (official): Google Drive, GitHub, Salesforce, Slack, HubSpot, MCP, 50+ native | Limitation: Full agentic task AI on paid Brain/Everything add-ons; fair-use caps on Super Credits | Sources: https://clickup.com/brain , https://clickup.com/pricing | Evidence quality: **HIGH** | Status: **VERIFIED** | Verified: 2026-08-11

TOOL_USE_CASE: Asana AI × task-management | Fit: **primary** | Capabilities: **Asana Dash** — surfaces daily priorities from meetings, emails, tasks; **AI Studio** automates intake/routing/updates; **AI Teammates** (30 prebuilt) handle coordination; MCP/AI Connectors create/update tasks from ChatGPT/Claude/Gemini | Pricing: Asana AI on **paid tiers** (Starter+); AI Studio Basic included on Starter/Advanced/Enterprise with credit limits; exact Starter $ — **NOT VERIFIED** this session | Integrations (official): Slack, Jira, Salesforce, ServiceNow, Zapier, 300+ apps | Limitation: AI Studio credits rate-limited on lower tiers; full AI on paid plans only | Sources: https://asana.com/product/ai , https://asana.com/pricing | Evidence quality: **HIGH** | Status: **VERIFIED** | Verified: 2026-08-11

TOOL_USE_CASE: Monday.com AI × task-management | Fit: **primary** | Capabilities: **Sidekick AI assistant**; **AI columns**; **AI agent workforce** (task agents); AI workflow builder (Pro+); automations with AI credits; board/task automation | Pricing: AI from **Basic $9/seat/mo** annual (1,000 AI credits); Standard **$12/seat/mo** (2,000 credits); Pro **$19/seat/mo** (3,000 credits) — monday.com/pricing | Integrations (official): Slack, Teams, Gmail, Outlook, 200+ integrations; API | Limitation: AI features credit-metered; advanced agents on Standard+ | Sources: https://monday.com/w/ai , https://monday.com/pricing | Evidence quality: **HIGH** | Status: **VERIFIED** | Verified: 2026-08-11

TOOL_USE_CASE: Motion × task-management | Fit: **primary** | Capabilities: Official **AI Task Planner** — auto-detects/prioritizes urgent tasks; optimizes plan hundreds of times/day; proactive at-risk warnings; gathers tasks from Gmail/Outlook/Slack/meetings/Siri; Do Date vs Due Date matching | Pricing: Pro AI **$19/seat/mo**; Business AI **$29/seat/mo** (annual on usemotion.com/pricing); 7,500–15,000 AI credits/seat/mo | Integrations (official): Gmail, Outlook, Slack, Teams, Zoom, Meet, Siri, Zapier, HubSpot, Salesforce, API | Limitation: Credit-based AI usage; team features on Business AI | Sources: https://www.usemotion.com/ , https://www.usemotion.com/pricing | Evidence quality: **HIGH** | Status: **VERIFIED** | Verified: 2026-08-11

TOOL_USE_CASE: Todoist Assist × task-management | Fit: **strong** | Capabilities: **Task Assist** — sub-task suggestions, break down complex work, rewrite tasks; **Filter Assist** (NL filters); **Email Assist** (email→tasks); **Ramble** (voice→structured tasks) | Pricing: Filter Assist all plans; Task Assist + Email Assist on **Pro/Business** (exact Pro $ — **NOT VERIFIED** this session; see todoist.com/pricing) | Integrations (official): 90+ integrations; Task Assist browser extension | Limitation: **Individual/small-team task app** — not full PM platform (no Gantt/portfolio on official pages); lighter scope than ClickUp/Asana | Sources: https://www.todoist.com/todoist-assist , https://www.todoist.com/help/articles/introduction-to-todoist-assist-KgPP22q5O , https://todoist.com/pricing | Evidence quality: **HIGH** | Status: **VERIFIED** | Verified: 2026-08-11

TOOL_USE_CASE: Notion AI × task-management | Fit: **strong** | Capabilities: **Custom Agents** route tasks and share project updates; **Notion Agent** creates/edits pages and databases; task databases with subtasks, dependencies, custom properties (official Free plan feature list); Enterprise Search across connected apps | Pricing: Full Notion AI on **Business/Enterprise**; Custom Agents free trial through May 3, 2026 then Notion credits; exact Business $ — **NOT VERIFIED** this session | Integrations (official): Slack, GitHub, Google Drive, Jira, Asana, Zendesk connectors | Limitation: General workspace AI — not a dedicated task-manager SKU; Business+ for full Agent | Sources: https://www.notion.com/product/ai | Evidence quality: **HIGH** | Status: **VERIFIED** | Verified: 2026-08-11

TOOL_USE_CASE: Wrike AI × task-management | Fit: **primary** | Capabilities: **Board AI** — action plan, summary, **task creation**, translation, grouping; AI in work items (content, editing, summaries); **AI agents** for triage/intake/auto-assignment; **Wrike Copilot** Q&A on project tasks; AI mobile inbox prioritization | Pricing: **AI Essentials** on Business plan **$25/user/mo** annual (wrike.com/price); Team **$10/user/mo** — AI tier availability per price page | Integrations (official): Microsoft 365, Salesforce, Slack, 400+ integrations; MCP server | Limitation: Advanced AI on Business+ with AI Essentials/Elite add-ons | Sources: https://www.wrike.com/ai/ , https://www.wrike.com/ai/features/ , https://www.wrike.com/price/ | Evidence quality: **HIGH** | Status: **VERIFIED** | Verified: 2026-08-11

### task-management — Phase 3 bar check

| Metric | Result |
|---|---|
| Candidates in active pool | 7 |
| Verified (any fit) | 7 |
| **Strong+ (`primary`/`strong`)** | **7** |
| Meets ≥3 strong+ bar? | **YES** |

---

## Verified mappings — project-planning (`project-planning`)

TOOL_USE_CASE: ClickUp Brain² × project-planning | Fit: **primary** | Capabilities: Gantt charts, Goals & Portfolio Management (Unlimited+); Brain² **AI Projects** cross-list orchestration; presentation generation for sprint reviews; resource/goals context in Brain² | Pricing: Unlimited **$7/user/mo** + Brain AI **$9/user/mo** or Everything AI **$28/user/mo** | Integrations: Same as task-management entry | Limitation: AI plan generation less explicitly named than Motion/Asana template — planning via Gantt + Brain project orchestration | Sources: https://clickup.com/brain , https://clickup.com/pricing | Evidence quality: **HIGH** | Status: **VERIFIED** | Verified: 2026-08-11

TOOL_USE_CASE: Monday.com AI × project-planning | Fit: **primary** | Capabilities: Official **Sprint Planner** agent; **Timeline & Gantt views** (Standard+); **Project Monitor** / **Status Reporter** PMO agents; portfolio management (Enterprise); AI workflow builder | Pricing: Gantt from Standard **$12/seat/mo** annual; AI credits per tier (see task-management entry) | Integrations: Same as task-management entry | Limitation: Premium PMO agents need higher tiers + credits | Sources: https://monday.com/w/ai , https://monday.com/pricing | Evidence quality: **HIGH** | Status: **VERIFIED** | Verified: 2026-08-11

TOOL_USE_CASE: Asana AI × project-planning | Fit: **primary** | Capabilities: Official **AI project plan template** — prompt → tasks, milestones, owners, timelines, dependencies; export CSV/PDF; AI Teammates for status/blockers; Timeline/Gantt views; AI calendar scheduling | Pricing: Paid tiers (Starter+); template free to try with Asana account | Integrations: Same as task-management entry | Limitation: Template requires Asana paid plan for full AI Studio workflow | Sources: https://asana.com/templates/ai-project-plan , https://asana.com/product/ai | Evidence quality: **HIGH** | Status: **VERIFIED** | Verified: 2026-08-11

TOOL_USE_CASE: Notion AI × project-planning | Fit: **partial** | Capabilities: Official use case **"Go from brainstorm to roadmap"**; Agent builds pages/databases; databases support dependencies/subtasks — but **no official AI WBS/milestone generator** equivalent to Asana template | Pricing: Business/Enterprise for full AI | Integrations: Same as task-management entry | Limitation: **General workspace planning** — roadmap use case linked but not dedicated plan-generation SKU | Sources: https://www.notion.com/product/ai | Evidence quality: **HIGH** | Status: **VERIFIED** | Verified: 2026-08-11

TOOL_USE_CASE: Motion × project-planning | Fit: **primary** | Capabilities: Official **AI Project Manager** — describe project → generates tasks, subtasks, milestones, assignees, stages; auto-updates statuses; Gantt/timeline on Business AI; capacity planning; project ETA prediction | Pricing: Pro AI **$19/seat/mo**; Business AI **$29/seat/mo** (Gantt/timeline on Business) | Integrations: Same as task-management entry | Limitation: Best planning features (Gantt, capacity) on Business AI tier | Sources: https://www.usemotion.com/ , https://www.usemotion.com/pricing | Evidence quality: **HIGH** | Status: **VERIFIED** | Verified: 2026-08-11

TOOL_USE_CASE: ProjectManager.com × project-planning | Fit: **exclude** | Capabilities: **No official AI planning features verified** — homepage describes Gantt, portfolios, resource management, reports; `/ai` returns **404** (2026-08-11) | Pricing: Free 30-day trial cited on homepage — paid tiers **NOT VERIFIED** | Integrations: Microsoft Project import, Jira, Slack, Zapier, API | Limitation: **Dropped from active pool** — traditional PM software without verified AI on official sources | Sources: https://www.projectmanager.com/ , https://www.projectmanager.com/ai (404) | Evidence quality: **LOW** (absence of AI) | Status: **RESEARCHED** (not VERIFIED for this use case) | Verified: —

TOOL_USE_CASE: Microsoft Planner + Copilot × project-planning | Fit: **strong** | Capabilities: Official **Planner Agent** automates **plan creation** and task execution; **Planner Agent chat** (premium plans, formerly "Copilot in Planner") — NL updates, summaries, insights; Timeline/Gantt, dependencies, sprints on premium plans; footnote: AI in Planner requires **M365 Copilot license** | Pricing: Planner in M365 **free** (basic); Planner Plan 1 **$10/user/mo**; Planner + Project Plan 3 **$30/user/mo**; **M365 Copilot add-on ~$18/user/mo** (microsoft.com) required for Planner Agent per learn.microsoft.com | Integrations: Teams, Loop, Outlook, M365 Graph | Limitation: **Ecosystem feature** — premium plan + Copilot license; rollout gated; not standalone AI planner | Sources: https://www.microsoft.com/en-us/microsoft-365/planner/microsoft-planner , https://learn.microsoft.com/en-us/planner/turn-off-planner-agent | Evidence quality: **HIGH** | Status: **VERIFIED** | Verified: 2026-08-11

### project-planning — Phase 3 bar check

| Metric | Result |
|---|---|
| Candidates in active pool | 7 (ProjectManager.com excluded) |
| Verified (any fit) | 6 |
| **Strong+ (`primary`/`strong`)** | **5** |
| Partial | 1 (Notion AI) |
| Meets ≥3 strong+ bar? | **YES** |

### task-management ↔ project-planning — 70% merge gate

| Metric | Value |
|---|---|
| Task-management verified pool | 7 tools |
| Project-planning verified pool | 6 tools |
| **Shared verified tools** | ClickUp, Asana, Monday.com, Notion AI, Motion (**5**) |
| Overlap vs task pool (5/7) | **71.4%** |
| **Gate (≥70%)** | **TRIGGERED → MERGED** |
| **Implementation** | Single URL `/for/project-managers/task-management` with planning H2 |

---

## Verified mappings — project-scheduling (`project-scheduling`) — DEFER PAGE

*Recorded for hub cross-link; not a standalone MVP page.*

TOOL_USE_CASE: Reclaim.ai × project-scheduling | Fit: **strong** | Capabilities: Official **AI calendar** — AI Tasks (sync/schedule by priority), AI Planner (daily plan), AI Smart Meetings, AI Focus Time, AI Buffer Time, AI Assistant chat for schedule optimization; Google Calendar + Outlook | Pricing: **Lite free forever**; Starter **$10–12/user/mo**; Business **$22/user/mo** (annual/monthly on reclaim.ai/pricing) | Integrations (official): Google Calendar, Outlook, Slack status sync, task list sync, MCP | Limitation: **Calendar-first** — not full PM platform; overlaps Motion/ClickUp scheduling on task-management page | Sources: https://www.reclaim.ai/ , https://www.reclaim.ai/pricing | Evidence quality: **HIGH** | Status: **VERIFIED** | Verified: 2026-08-11

TOOL_USE_CASE: Clockwise × project-scheduling | Fit: **exclude** | Capabilities: **NOT VERIFIED** — getclockwise.com shows product shutdown / thank-you page (2026-08-11); no active AI scheduling product on official site | Pricing: NOT VERIFIED | Integrations: NOT VERIFIED | Limitation: **Excluded** — discontinued product | Sources: https://www.getclockwise.com/ (shutdown page, 2026-08-11) | Evidence quality: **LOW** | Status: **RESEARCHED** (not VERIFIED) | Verified: —

### project-scheduling — Phase 3 conclusion

| Metric | Result |
|---|---|
| Standalone page justified? | **NO** — high overlap with merged task-management |
| Hub cross-link candidate | Reclaim.ai (verified strong) |
| MVP action | **DEFER** URL |

---

## Conditional — project-assistant (`project-assistant`) — DEFER PAGE

*No new TOOL_USE_CASE entries — PM-native tools already verified on other use cases.*

| Candidate | Disposition | Official source |
|---|---|---|
| ClickUp Brain² | On task-management page | clickup.com/brain |
| Microsoft 365 Copilot | On meeting-notes + reporting + planning | microsoft.com / learn.microsoft.com |
| Notion AI | On task-management + reporting | notion.com/product/ai |
| ChatGPT | Hub FAQ only — **partial** | openai.com/academy/managers (manager/team planning) |
| Claude | Hub FAQ only — **partial** | anthropic.com/news/projects (team workspaces) |

**Conclusion:** Redundant standalone page at MVP. Persona-hub FAQ covers generic assistants.

---

## Candidate index (DISCOVERY — remaining)

| Use case | Status |
|---|---|
| documentation | Deferred — no Phase 3 standalone verification |
| risk-management | Deferred |
| project-scheduling | Verified (Reclaim only) — page deferred |
| project-assistant | Deferred — no new mappings |

**Dropped from active pools:** Tome (project-reporting); ProjectManager.com (project-planning); Clockwise (project-scheduling)

**Reuse from `TOOLS.md`:** Otter.ai (meeting-notes ✅), Gamma (project-reporting partial ✅), Grammarly (documentation — pending)
