# Referral Portal: MVP-1 checklist

Target: public HTTPS demo on 2026-10-09 at zero cost. The product spec is `CLAUDE.md`; its [Decided] rules are unchanged here. Last updated 2026-10-08.

Tick items as they finish and write the git tag beside them, so every step can be undone (see section 10).

## 1. Goal and ship gate

Goal: the core loop works end to end. A seeker signs in, builds a profile, requests a meeting and chats. A referrer scans the seeker's badge and chooses Refer, Save or Pass. The seeker sees the referral status.

Ship gate, all must be true:

- [ ] Public HTTPS URL is live and GitHub sign-in works on it
- [ ] One full flow passes on a phone at 390 px, including camera scan
- [ ] One rollback has been rehearsed (redeploy the previous tag)
- [ ] This file and `docs/DEPLOY.md` are up to date

## 2. Scope

In scope for MVP-1:

- Sign-in: GitHub OAuth for MVP-1, with a consent line (DPDP).
- Profile: looking-for chips, skills chips, experience level, pitch (200 characters), GitHub and LinkedIn links, resume PDF (5 MB max), hide-from-my-company switch, sign out.
- Referrer mode: work-email OTP (10 minutes, 5 attempts, free-mail blocked), company created from the email domain, open to meet, slots (3), referral limit (10), mode toggle.
- Seeker side: companies list, wishlist (5 max, not own company), meet requests (3 max, 200-character note), chats list, 20-message chat with atomic cap, report and block.
- Referrer side: badge scan and search, candidate card (Refer, Save, Pass, private note, Invite to chat), Candidates (Interested, Saved), Requests (Accept, Decline).
- Referrals: received list, and made list with status update and Copy referral packet.
- Cross-cutting: hide-from-my-company rule, authorization on every route, rate limits (OTP, scan, requests, messages), security headers, PWA manifest, demo seed data, `.env.example`.
- Notifications: a row is stored for every event; email is sent only for the OTP and "you were referred".

Deferred to MVP-2 (do not build tomorrow):

- Google and LinkedIn sign-in
- Admin panel (users, companies and sponsors, report queue, live stats, bulk badge/QR CSV) with an `ADMIN_EMAILS` bootstrap
- In-app notification UI and the remaining emails
- Message retention job (needed well before 13 December; acceptance check 9 is an exception until then)
- Offline scan queue, Playwright suite, load test of about 1,000 users
- Delete-on-request (DPDP) and S3-compatible resume storage
- Paid always-on hosting, custom domain, SPF/DKIM sender domain
- All V1.5 items in `CLAUDE.md` section 4

## 3. Stack and zero-cost hosting

Stack: Java 21 with Spring Boot 4.1.x (Maven), React with Vite, TypeScript and Tailwind, MySQL 8.x, Flyway migrations. One Docker image: Spring Boot serves the React build on the same origin.

| Piece | Choice | Limits to know |
|---|---|---|
| App | Render free web service (Docker) | No card needed. HTTPS URL included. 0.1 CPU and 512 MB RAM. Sleeps after 15 minutes idle (about 1 minute to wake, longer for a JVM). Disk is wiped on restart. Blocks SMTP ports 25, 465 and 587. 750 free hours a month. |
| Database | Aiven free MySQL | No card. 1 CPU, 1 GB RAM, 1 GB storage, single node, daily backups. Powers off after inactivity and must be switched on again. |
| OTP email | Brevo free SMTP on port 2525 | Works around Render's SMTP block. Daily cap not verified. A free-mail sender address may land in spam. |
| Sign-in | GitHub OAuth | Free. Use separate local and Render OAuth Apps with exact callback URLs. |
| Code and CI | GitHub private repo and Actions | Free. |

Notes (checked against vendor docs on 2026-10-08; re-check before relying):

- Never add a payment method on Render; without one it suspends services instead of billing.
- Rejected for the no-bill rule: Railway (free plan is a $1 credit a month with 0.5 GB RAM, Hobby is $5 a month), Render's free database (Postgres only, expires after 30 days), Hugging Face Docker Spaces (paid plan).
- Fallbacks if the JVM cannot run in 512 MB: an Oracle Always Free VM (needs a card for identity check, capacity not guaranteed) or the laptop behind a tunnel.
- Render has a monthly build-minute quota (amount not verified): deploy manually per tag, not on every commit.
- Demo grade only. Before real traffic on 13 December, move to paid always-on hosting. The Docker image and Flyway migrations make that a config change.

## 4. Your action items

Secrets go in `.env` and the Render dashboard, never in chat or git.

- [ ] U1 GitHub: create an empty private repo and give me the URL.
- [ ] U2 Aiven: sign up (no card), create a free MySQL 8.0.17 or newer in the region nearest Render, and use it right away so it does not power off.
- [ ] U3 Render: sign up with GitHub. After my first push, create the web service (Docker, auto-deploy off). Do not add a payment method. Tell me the URL.
- [ ] U4 GitHub: local OAuth App created with callback `http://localhost:8080/login/oauth2/code/github`. Create a separate production OAuth App after Render is live, using callback `https://<render-service>.onrender.com/login/oauth2/code/github`. Keep both client secrets private.
- [ ] U5 Brevo: sign up, verify a sender email, create an SMTP key. Use port 2525.
- [ ] U6 Local tools: JDK 21 or newer, Node 22 LTS, Git, Docker Desktop (or MySQL 8.4 Community). I check what is missing first.
- [ ] U7 Approve or replace the default privacy and consent text.
- [ ] U8 Prepare testers: one Gmail account (seeker), one non-free-mail address such as college, work or own domain (referrer), and a phone for the final test.
- [ ] U9 After release: set a free uptime pinger (every 5 minutes on `/actuator/health`) and power on Aiven before each demo.

## 5. Agent action items

Phase 1: foundations and early deploy

- [ ] A1 Check tools, `git init`, ignore rules, first commit. Tag `m0-init`.
- [ ] A2 Copy `CLAUDE.md` into the repo and add a section 14 addendum (stack override, scope cut, hosting, schema additions, gap decisions). Create `docs/SCREENS.md`, `docs/DECISIONS.md`, `docs/ROLLBACK.md`, `docs/DEPLOY.md` and `README.md`.
- [ ] A3 Create the AI setup files (section 9).
- [ ] A4 Backend skeleton from start.spring.io (Boot 4.1.x, Java 21, Maven) with environment-driven config.
- [ ] A5 Frontend skeleton with the 390 px shell: header, mode toggle, bottom tabs, blue seeker and green referrer styling.
- [ ] A6 Database: docker-compose MySQL 8.4; Flyway `V1__init.sql` from the DDL without CREATE DATABASE and USE, plus `conversations.initiated_by`, `users.consent_at`, `email_otps` and `resume_files`; idempotent demo seeder behind a flag.
- [ ] A7 Auth skeleton: GitHub login, session, CSRF, `GET /api/me`, logout, QR token created at first login, dev/test-only login shortcut (absent in production, proven by a test).
- [ ] A8 Multi-stage Dockerfile (JVM flags for 512 MB) and GitHub Actions (backend tests, frontend build). I confirm with you before the first push.
- [ ] A9 Deploy the skeleton and check Aiven over TLS, Flyway, GitHub login on the HTTPS URL, health and memory. Tag `m1-skeleton-deployed`. Gate G1: if memory or startup fails, switch to a fallback now.

Phase 2: contract first

- [ ] B1 Write `docs/api/openapi.yaml` from `CLAUDE.md` section 8 plus the extra endpoints the screens need (`GET /api/me`, logout, search, candidate by id, referral packet, resume download, accept or decline of referrer invites). Generate TypeScript types. Tag `m2-contract`.

Phase 3: vertical slices. Backend and frontend subagents run in parallel; each slice ends with passing tests, no compile errors, a commit and a tag.

- [ ] S1 Profile and resume. Tag `s1-profile`
- [ ] S2 Work-email verification. Tag `s2-verify`
- [ ] S3 Companies and wishlist. Tag `s3-companies`
- [ ] S4 Requests, chats, accept and decline, block and report. Tag `s4-chat`
- [ ] S5 Badge, scan, candidate card, Candidates list. Tag `s5-scan`
- [ ] S6 Referrals received and made. Tag `s6-referrals`
- [ ] S7 Hardening: rate limits, headers, validation, PWA manifest, no OTPs or message bodies in logs. Tag `s7-hardening`

Order: S1, S2 and S3 in parallel; then S4 and S5 in parallel (Invite to chat waits for S4); then S6; then S7.

Phase 4: verify

- [ ] V1 Rule tests (JUnit 5 with Testcontainers MySQL) for acceptance checks 2 to 8.
- [ ] V2 Seeded full flow and smoke test.
- [ ] V3 Run the acceptance list (section 8). Tag `mvp-1-rc`.
- [ ] V4 (you) Phone test at 390 px including camera scan over HTTPS.

Phase 5: release

- [ ] R1 Tag `v0.1.0-demo` and deploy manually on Render.
- [ ] R2 Take a `mysqldump` snapshot before any deploy that has a migration, and rehearse one rollback.
- [ ] R3 Move the MVP-2 list into a backlog in this file and update the docs.

## 6. Screens to slices

| # | Screen | Delivered by |
|---|---|---|
| 1 | Sign in | A7, S1 |
| 2 | Build and edit profile | S1 |
| 3 | Verify work email | S2 |
| 4 | Companies (tab) | S3 |
| 5 | Request meet | S4 |
| 6 | Chats (tab) | S4 |
| 7 | Chat | S4 |
| 8 | Badge (tab) | S5 |
| 9 | Referrals (tab) | S6 |
| 10 | Scan (tab) | S5 |
| 11 | Candidate card | S5 (Invite to chat after S4) |
| 12 | Candidates (tab) | S5 |
| 13 | Requests (tab) | S4 |
| 14 | Referrals made (tab) | S6 |

## 7. Decisions and gap defaults

Stack and storage:

- Java and React replace the Next.js default in `CLAUDE.md` section 7 (it was a [Default]). MySQL and every [Decided] rule are unchanged.
- Resumes are stored in a `resume_files` table behind an authenticated download, because Render's free disk is wiped on restart. Swap to S3-compatible storage later.
- The app name is "Referral Portal", as in `CLAUDE.md` and the folder name.

Gaps in `CLAUDE.md` filled with these defaults:

1. Experience level (Student, Fresher, 1-3, 3-6, 6+) is added to the profile screen, because the schema requires it and candidate cards show it.
2. Schema additions: `conversations.initiated_by` (rule 8), `users.consent_at` (rule 14), `email_otps` with hashed code, expiry and attempts (rule 2), and `resume_files`. Flyway runs the DDL without `CREATE DATABASE` and `USE`.
3. Open roles come from seed data. They become admin-managed later; referrers cannot edit roles in the MVP.
4. In-app notifications have no UI in the wireframes: rows are stored now, email is sent for the OTP and "you were referred", and the UI comes later.
5. A referrer's Invite to chat appears in the seeker's Chats tab with Accept and Decline.
6. Requests left = 3 + SUM(credit delta) minus the seeker-initiated conversations. Slots used = accepted conversations (accepted or completed). A declined request does not refund the budget.
7. The Badge screen shows the Seeker and Referrer chips as in the wireframe; a printed badge stays name and QR only.
8. Interested = seekers who wishlisted my company, are not hidden from me, and were not already reviewed or referred by me. Saved = my Save reviews.
9. A dev/test-only sign-in shortcut exists for local testing and is absent from production.
10. Company = email domain as in `CLAUDE.md`, reduced to the registrable domain (so `eng.acme.com` becomes `acme.com`). The company name is derived from the domain; an admin can rename it later.

## 8. Acceptance checks

From `CLAUDE.md` section 11.

| # | Check | How verified | MVP-1 |
|---|---|---|---|
| 1 | New user signs in with GitHub, completes a profile with a resume, lands on Companies | Manual on the deployed URL (V4) | In |
| 2 | Free-mail address cannot become a referrer; a company address can and the company appears from its domain | Rule test (S2) | In |
| 3 | No 6th wishlist, no 4th request, no own company | Rule tests (S3, S4) | In |
| 4 | Seeker is invisible to a colleague by default | Rule test (S5) | In |
| 5 | No chat before accept; the 21st message is rejected with two simultaneous senders | Rule test (S4) | In |
| 6 | Scan under 2 seconds on a phone; unknown token gives a friendly error; non-referrer cannot scan | API tests and timing on the deployed demo (S5) | In |
| 7 | Refer creates one referral, notifies the candidate, duplicate is rejected | Rule test (S6) | In |
| 8 | Blocked user cannot start or continue a conversation | Rule test (S4) | In |
| 9 | Messages are purged by the retention job | Retention job | Deferred to MVP-2 |
| 10 | All 14 screens match the navigation on a 390 px phone | Manual pass against `docs/SCREENS.md` (V3, V4) | In |

Extra security checks: unauthenticated API call returns 401; another user's conversation returns 403 or 404; CSRF is enforced; logs contain no OTPs or message bodies.

## 9. AI setup (created in A3)

| Type | File | Purpose |
|---|---|---|
| Always-on instructions | `.github/copilot-instructions.md` | Short: stack, commands, autonomy and undo rules, pointer to `CLAUDE.md` and this file |
| File instructions | `.github/instructions/backend-java.instructions.md` (for `backend/**`), `.github/instructions/frontend-react.instructions.md` (for `frontend/**`) | Stack rules loaded only for those folders |
| Agents | `.github/agents/backend-dev.agent.md`, `frontend-dev.agent.md`, `qa-reviewer.agent.md` | Parallel subagents; QA is read-only plus test runs |
| Prompts | `.github/prompts/slice.prompt.md`, `verify-dod.prompt.md`, `rollback.prompt.md` | `/slice S4`, `/verify-dod`, `/rollback` |
| Hook | `.github/hooks/safety.json` plus a small Node guard | Ask or block force-push, hard reset, `rm -rf`, DROP DATABASE, deleting compose volumes, editing applied migrations, staging `.env` |
| API contract | `docs/api/openapi.yaml` | Backend and frontend build against one contract with generated TypeScript types |

Working habits: small tasks, one slice per chat turn, commit and tag each green slice, tests first for the rules in `CLAUDE.md` section 3, and record verified commands and gotchas in repo memory.

## 10. Undo and safety

- Uncommitted edit: VS Code chat checkpoint or Timeline, or `git restore <file>`.
- One bad commit: `git revert <sha>`; do not use `reset --hard`.
- Back to a milestone: create a branch from the tag and redeploy that tag.
- Production: redeploy the previous tag on Render and restore the `mysqldump` snapshot if a migration ran. Applied Flyway migrations are never edited; each has a manual undo script in `db/rollback/`.
- No confirmation needed: local edits, installs, builds, tests, commits and tags.
- Confirm once first: pushing to GitHub, creating or changing cloud resources, deleting data, force operations.
- Never commit secrets; `.env` stays out of git.

## 11. Risks and gates

- Gate G1 (after A9): if the app cannot run stably in 512 MB, or cold start is too slow, switch to a fallback before building slices.
- Free tiers are demo grade: cold starts, memory limit, Aiven power-off. Mitigation: uptime pinger and the early skeleton deploy.
- OTP deliverability from a free-mail sender may be poor on corporate inboxes. A custom domain with SPF and DKIM is the fix.
- Spring Boot 4 is a major version and generated code may use older APIs. Compile at every slice and check docs.spring.io.
- Seeded demo referrers are not real accounts and never answer requests. Real referrers need a verified non-free-mail address (U8).

## 12. Log

- 2026-10-08: created from the approved plan. Nothing implemented yet; waiting on U1 to U6.
