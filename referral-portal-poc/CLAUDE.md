# Referral Portal: build brief for the coding agent

Read this whole file before writing code. Items marked **[Decided]** come from the product owner and must not change without asking. Items marked **[Default]** are recommendations: follow them unless the owner says otherwise. Do not invent features outside this brief; ask instead.

## 1. Product in one paragraph
A mobile-first web app (installable PWA, no native app) for **DevFest on 13 December 2026**, with 1,000+ attendees and employees of many companies. It converts face-to-face conversations at a one-day event into tracked job referrals. It is **not a job board**. Attendees build a short profile and request meetings with employees; employees scan attendee QR badges and choose **Refer, Save or Pass**; candidates later see who referred them and the status. Organizers get stats and sponsor reports.

Visual reference (14 screens plus a navigation flow map): https://claude.ai/artifact/AVK1LSw16VyCTSvn7AQ3hn
Plain-language overview and animated data map: https://claude.ai/artifact/WpuyHb9oc7Td8z6RPtpe4g
Wireframes use placeholders like [Company A]. They show structure, not final styling.

## 2. Roles
- **One account per person** (`users`). Roles are switches, not user types **[Decided]**:
  - **Seeker**: `profiles.is_seeker`. Looks for opportunities.
  - **Referrer**: `referrer_profiles.is_referrer`, only after work-email verification.
  - A person can be both: referrer at company A, seeker toward company B.
- **Admin** (organizers): `users.is_admin`.
- **No manual company onboarding** **[Decided]**. A company row is created from the verified work-email domain. Admins can mark sponsors and set a booth label.
- **No special "Referrer" badge or sticker** **[Decided]**. The badge is only name + QR.

## 3. Business rules (enforce in code and, where possible, in the database)
1. **Sign-in**: GitHub OAuth for MVP-1, replacing Google or LinkedIn OAuth for this demo. No passwords.
2. **Work-email verification**: 6-digit OTP, expires in 10 minutes, max 5 attempts. Reject free-mail domains (gmail, yahoo, outlook, hotmail, icloud, proton and similar). Company = email domain.
3. **Wishlist**: a seeker may wishlist at most **5** companies **[Default]**, chosen from the companies list. A person cannot wishlist their own company.
4. **Meet requests**: a seeker has **3** requests in total **[Default]** (budget = 3 + SUM(credit_ledger.delta); credits are V1.5, treat delta as 0 for now). The request carries a note of up to 200 characters.
5. **Referrer capacity**: `slot_capacity` (default 3) = how many accepted conversations an employee takes. When full, show "fully booked" and block new requests. `referral_limit` (default 10) caps referrals made.
6. **Conversation lifecycle** **[Decided]**: `pending` → `accepted` or `declined` → `completed`. Chat is possible **only after accept**. Decline is silent (the seeker only sees no reply). Each conversation holds **20 messages in total** (both people combined). Enforce atomically: `UPDATE conversations SET message_count = message_count + 1 WHERE id = ? AND message_count < 20`, check affected rows = 1, then insert the message in the same transaction. Show "n of 20 messages used" and disable the input at 20.
7. **Free contact sharing** **[Decided]**: people may paste an Instagram, LinkedIn or phone number in chat. Do not block it. Show a one-time banner: "Share contact details only with people you are comfortable with." There is no phone-number field anywhere in the product.
8. **Referrer-initiated invite**: the "Invite to chat" button on the Candidate card creates a `pending` conversation that the seeker must accept. It does not use the seeker's request budget. The schema needs one extra column: `conversations.initiated_by ENUM('seeker','referrer') NOT NULL DEFAULT 'seeker'`. Add it.
9. **Refer / Save / Pass**: Save and Pass write `reviews` (with an optional private note, visible only to that referrer). Refer creates a `referrals` row (status `submitted`), notifies the candidate, and counts toward `referral_limit`. One referral per (referrer, candidate, company). No self-referral.
10. **Referral handoff**: the portal does **not** submit into any company hiring system. "Copy referral packet" gives the referrer text (name, pitch, skills, links, resume link, endorsement note) to paste into their company's own process. The referrer can update the status: `submitted`, `under_review`, `interview`, `closed`.
11. **Hide from own company** **[Decided]**: `profiles.hide_from_my_company` defaults to true. A seeker is invisible to any viewer whose company domain matches the seeker's verified company domain, in lists, search and scan results. Seekers can switch this off.
12. **QR badge**: each user gets `badges.qr_token`, 128-bit random (32 hex chars), created with the account. The QR encodes only a URL with this token, never a user id. Scanning is allowed only for verified referrers and returns the live profile (privacy rules still apply). Log every scan in `scans`.
13. **Block and report**: a blocked pair cannot create or continue conversations. Reports go to an admin queue.
14. **Retention**: delete `messages` 30 to 90 days after the event (scheduled job) because they may contain personal contacts. Collect consent at sign-up and support deletion on request (India's DPDP Act applies).

## 4. Features and priority
**MVP (must exist by the 22 November launch)**
Sign-in; seeker profile with resume upload; work-email verification; companies list with employees open to meet; wishlist; meet request, accept/decline, 20-message chat; QR badge; scan; candidate card with Refer/Save/Pass and private note; "My referrals" and "Referrals made"; Candidates list (interested / saved); in-app and email notifications; block and report; admin panel (users, companies and sponsors, report queue, live stats, bulk badge/QR export); mobile-first responsive PWA.

**V1.5 (if time allows before 13 December)**
Profile completeness meter; personal day plan; sponsor dashboard and booth QR (a seeker can scan a company QR to express interest, logged in `scans`); offline-tolerant scanning with a sync queue; credit ledger ("earn +1 request by helping"); status update notifications by WhatsApp or email; broadcast tool; resume parsing.

**Later**: AI role matching, recruiter view, sponsor ROI PDF, leaderboard.

## 5. Screens and navigation
**Shell.** Header: "Referral Portal" and a **Profile** link (all screens); in Refer people mode also a **Badge** link. A **mode toggle** ("Find opportunities" | "Refer people") appears only for verified referrers. A bottom **tab bar** per mode. Chat and Candidate card have a Back button and no tab bar.
- Seeker tabs: **Companies, Chats, Badge, Referrals**
- Referrer tabs: **Scan, Candidates, Requests, Referrals made**

| # | Screen | Content | Goes to |
|---|---|---|---|
| 1 | Sign in | Continue with GitHub | New user → Profile; returning → Companies |
| 2 | Build / edit profile | Looking-for chips, skills chips, pitch (200 chars), resume PDF (max 5 MB), GitHub and LinkedIn links, checkbox "Hide my profile from people at my own company" (on), "Verify work email" | Verify; Save and continue → Companies |
| 3 | Verify work email | Work email, Send code, 6-digit code, "Open to meet" checkbox, slots (3), referral limit (10) | Success unlocks the mode toggle → Scan |
| 4 | Companies (tab) | "Wishlist x of 5 · Requests left y of 3"; company cards with open-role count, wishlist toggle, verified employees open to meet | Request meet → 5 |
| 5 | Request meet | Note (200 chars), Send request, Cancel | Send → Chats; Cancel → Back |
| 6 | Chats (tab) | Conversations with status chips (Accepted, Pending) | Open chat → 7 |
| 7 | Chat | Back, Report/Block, "n of 20 messages used", contact-sharing banner, bubbles, input | Back |
| 8 | Badge (tab; header link in referrer mode) | QR, name, role chips (Seeker, Referrer at [Company]) | none |
| 9 | Referrals (tab) | Referrals received: company, referrer, role, status chip | none |
| 10 | Scan (tab) | Camera scanner; search by name or skill | Result → 11 |
| 11 | Candidate card | Profile, fit with open roles, private note, **Refer / Save / Pass**, Invite to chat, "Referrals left x of 10" | Refer → record in 14; Back |
| 12 | Candidates (tab) | Filters Interested / Saved; candidate cards | View → 11 |
| 13 | Requests (tab) | Incoming requests, "Slots left x of 3", Accept / Decline | Accept → 7 |
| 14 | Referrals made (tab) | Referrals with status; "Copy referral packet"; status update | none |

Admin panel (no wireframe): users, companies and sponsors (booth label), report queue, live counters (sign-ups, scans, referrals, meetings), bulk badge/QR export.

## 6. Data model
Database: **MySQL 8.0.17+** **[Decided]**. The full DDL is in the appendix. Summary:
- People and companies: `users`, `profiles` (seeker), `referrer_profiles`, `companies`, `open_roles`
- Interest and actions: `wishlists`, `reviews`, `referrals`
- Event day: `badges`, `scans`, `conversations`, `messages`
- Trust and alerts: `credit_ledger`, `reports_blocks`, `notifications`

Notes for the implementer:
- MySQL has no arrays: skills and roles are JSON columns (a multi-valued index exists on `profiles.skills`).
- MySQL forbids CHECK constraints on columns that have cascading foreign keys, so the self-referral and self-conversation checks sit on tables whose FKs have no `ON DELETE` action. Keep it that way.
- Add `conversations.initiated_by` (rule 8).
- `scans.synced_at` supports the V1.5 offline queue.

## 7. Recommended stack [Default]
Java 21 with Spring Boot (Maven) for the backend; React with Vite, TypeScript, and Tailwind for the frontend; MySQL 8 with Flyway migrations. Spring Boot serves the React build as a same-origin PWA. Use Spring Security OAuth2 Client for GitHub sign-in in MVP-1. Use Brevo SMTP for OTP and referral emails. Store resumes in MySQL for the zero-cost demo, then move to S3-compatible private storage with short-lived signed URLs. Generate QR codes with `qrcode`, scan with `html5-qrcode`, and poll chat every 3 to 5 seconds. Use JUnit for rule tests and Playwright for end-to-end tests when time allows.

## 8. API surface (REST, JSON, session auth)
- `GET/PUT /api/me/profile`; `POST /api/me/resume` (signed upload)
- `POST /api/referrer/verify/start`, `POST /api/referrer/verify/confirm`, `PUT /api/referrer/settings`
- `GET /api/companies`; `PUT/DELETE /api/wishlist/:companyId`
- `POST /api/conversations`; `POST /api/conversations/:id/accept|decline`; `GET /api/conversations`; `GET/POST /api/conversations/:id/messages`
- `GET /api/me/badge`; `POST /api/scan {qr_token}`; `GET /api/candidates?filter=interested|saved`
- `POST /api/reviews`; `POST /api/referrals`; `PATCH /api/referrals/:id`; `GET /api/referrals?as=candidate|referrer`
- `POST /api/reports`; `GET /api/notifications`
- Admin: `GET /api/admin/stats`, `POST /api/admin/companies`, `GET /api/admin/badges.csv`, `GET /api/admin/reports`

## 9. Security and abuse
- Authorize every route server-side (a user can only read their own conversations and referrals).
- Rate limit OTP, scan, requests and messages. Validate uploads (PDF only, 5 MB). Private resume URLs, signed and short-lived.
- Escape all message text; never render raw HTML.
- Never log message bodies or OTPs.
- Seed script with demo companies, users, and one full flow for testing. Provide `.env.example`.

## 10. Timeline (today is early October 2026)
| When | Goal |
|---|---|
| 7 to 13 Oct | Repo, DB migration, auth, app shell with navigation |
| 14 to 20 Oct | Profile and resume, work-email verification, companies list |
| 21 to 27 Oct | Wishlist, requests, accept/decline, chat with 20-message cap, notifications |
| 28 Oct to 3 Nov | Badge and QR, scan, candidate card, Refer/Save/Pass |
| 4 to 10 Nov | Referral tracking, admin panel, hide-from-company and privacy rules |
| 11 to 14 Nov | Hardening, load test (about 1,000 users), staging deploy |
| 15 to 21 Nov | Private beta, fix bugs |
| **22 Nov** | **Public launch** |
| 1 to 7 Dec | Feature freeze, V1.5 items only if stable |
| **13 Dec** | **Event** |
| From 14 Dec | Follow-up emails, sponsor report |

## 11. Definition of done (MVP acceptance checks)
1. A new user signs in with GitHub, completes a profile with a resume, and lands on Companies.
2. A user with a free-mail address cannot become a referrer; a company address can, and the company appears from its domain.
3. A seeker cannot wishlist a 6th company or send a 4th request, and cannot target their own company.
4. A seeker is invisible to a colleague from the same company by default.
5. Chat is impossible before accept, and the 21st message is rejected even with two simultaneous senders.
6. A scan of a valid token shows the profile in under 2 seconds on a phone; an unknown token shows a friendly error; a non-referrer cannot scan.
7. Refer creates one referral, notifies the candidate, and a duplicate attempt is rejected.
8. A blocked user cannot start or continue a conversation.
9. Messages are purged by the retention job.
10. All 14 screens match the navigation in section 5 on a 390 px wide phone.

## 12. Working agreement
Plan first, then build in vertical slices following section 10. Write tests for the rules in section 3. Keep commits small. If a rule here is unclear or conflicts with something you find, stop and ask the owner instead of guessing.

## 13. Open questions for the owner (do not block on these)
- Audience mix: mostly students and freshers, or experienced developers? (Affects how much weight profiles carry.)
- Do organizers hold attendee emails (registration platform) so launch messages can reach everyone?
- Can organizers print the QR on badges? Fallback: users show the QR from their phone.
- Are there volunteers to handle the report queue on the day?
- Hosting, domain and budget.
- Will sponsors commit employees early, so that the supply side is not empty at launch?

---

## Appendix: MySQL schema (`db/schema.sql`)
```sql
-- Referral Portal schema (MySQL 8.0.17+). Run: mysql -u root -p < referral_portal_schema.sql
-- MySQL has no array type, so skills / roles are JSON columns.
CREATE DATABASE IF NOT EXISTS referral_portal CHARACTER SET utf8mb4;
USE referral_portal;

-- PEOPLE AND COMPANIES
CREATE TABLE users (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(120) NOT NULL,
  email VARCHAR(190) NOT NULL UNIQUE,
  auth_provider VARCHAR(20) NOT NULL,
  is_admin BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE companies (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(150) NOT NULL,
  email_domain VARCHAR(190) NOT NULL UNIQUE,
  booth_label VARCHAR(40) NULL,
  is_sponsor BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE profiles (               -- seeker side
  user_id BIGINT UNSIGNED PRIMARY KEY,
  pitch VARCHAR(200) NULL,
  experience_level ENUM('student','fresher','1-3','3-6','6+') NOT NULL,
  skills JSON NULL,
  roles_wanted JSON NULL,
  resume_url VARCHAR(500) NULL,
  github_url VARCHAR(300) NULL,
  linkedin_url VARCHAR(300) NULL,
  is_seeker BOOLEAN NOT NULL DEFAULT TRUE,
  hide_from_my_company BOOLEAN NOT NULL DEFAULT TRUE,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  INDEX idx_skills ((CAST(skills->'$[*]' AS CHAR(40) ARRAY)))
);

CREATE TABLE referrer_profiles (      -- referrer side
  user_id BIGINT UNSIGNED PRIMARY KEY,
  company_id BIGINT UNSIGNED NOT NULL,
  work_email VARCHAR(190) NOT NULL UNIQUE,
  verified_at TIMESTAMP NULL,
  is_referrer BOOLEAN NOT NULL DEFAULT TRUE,
  open_to_meet BOOLEAN NOT NULL DEFAULT FALSE,
  slot_capacity TINYINT UNSIGNED NOT NULL DEFAULT 3,
  referral_limit TINYINT UNSIGNED NOT NULL DEFAULT 10,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (company_id) REFERENCES companies(id)
);

CREATE TABLE open_roles (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  company_id BIGINT UNSIGNED NOT NULL,
  title VARCHAR(150) NOT NULL,
  level VARCHAR(40) NULL,
  skills JSON NULL,
  link VARCHAR(500) NULL,
  FOREIGN KEY (company_id) REFERENCES companies(id) ON DELETE CASCADE
);

-- INTEREST AND ACTIONS
CREATE TABLE wishlists (              -- max 5 per seeker: enforce in app code
  seeker_id BIGINT UNSIGNED NOT NULL,
  company_id BIGINT UNSIGNED NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (seeker_id, company_id),
  FOREIGN KEY (seeker_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (company_id) REFERENCES companies(id) ON DELETE CASCADE
);

CREATE TABLE reviews (
  referrer_id BIGINT UNSIGNED NOT NULL,
  candidate_id BIGINT UNSIGNED NOT NULL,
  action ENUM('save','pass') NOT NULL,
  private_note TEXT NULL,
  PRIMARY KEY (referrer_id, candidate_id),
  FOREIGN KEY (referrer_id) REFERENCES users(id),
  FOREIGN KEY (candidate_id) REFERENCES users(id),
  CHECK (referrer_id <> candidate_id)
);

CREATE TABLE referrals (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  referrer_id BIGINT UNSIGNED NOT NULL,
  candidate_id BIGINT UNSIGNED NOT NULL,
  company_id BIGINT UNSIGNED NOT NULL,
  role_id BIGINT UNSIGNED NULL,
  endorsement_note VARCHAR(500) NULL,
  status ENUM('submitted','under_review','interview','closed') NOT NULL DEFAULT 'submitted',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE (referrer_id, candidate_id, company_id),
  FOREIGN KEY (referrer_id) REFERENCES users(id),
  FOREIGN KEY (candidate_id) REFERENCES users(id),
  FOREIGN KEY (company_id) REFERENCES companies(id),
  FOREIGN KEY (role_id) REFERENCES open_roles(id) ON DELETE SET NULL,
  CHECK (referrer_id <> candidate_id)
);

-- EVENT DAY
CREATE TABLE badges (
  user_id BIGINT UNSIGNED PRIMARY KEY,
  qr_token CHAR(32) NOT NULL UNIQUE,  -- random token, never the user id
  checked_in_at TIMESTAMP NULL,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE scans (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  scanner_id BIGINT UNSIGNED NOT NULL,
  scanned_user_id BIGINT UNSIGNED NULL,
  scanned_company_id BIGINT UNSIGNED NULL,
  type ENUM('referrer_scan','company_interest') NOT NULL,
  scanned_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  synced_at TIMESTAMP NULL,           -- set when an offline scan reaches the server
  FOREIGN KEY (scanner_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (scanned_user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (scanned_company_id) REFERENCES companies(id) ON DELETE CASCADE,
  INDEX idx_scanner (scanner_id, scanned_at)
);

CREATE TABLE conversations (          -- a meet request that becomes a chat once accepted
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  seeker_id BIGINT UNSIGNED NOT NULL,
  referrer_id BIGINT UNSIGNED NOT NULL,
  first_message VARCHAR(200) NULL,
  status ENUM('pending','accepted','declined','completed') NOT NULL DEFAULT 'pending',
  message_count TINYINT UNSIGNED NOT NULL DEFAULT 0,   -- app bumps it in the same transaction as the message insert
  happened BOOLEAN NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE (seeker_id, referrer_id),
  FOREIGN KEY (seeker_id) REFERENCES users(id),        -- no CASCADE: MySQL forbids CHECK on columns with cascading FKs
  FOREIGN KEY (referrer_id) REFERENCES users(id),
  CHECK (seeker_id <> referrer_id),
  CHECK (message_count <= 20)                          -- 20 messages in total per conversation
);

-- Messages may contain personal contacts people choose to share: delete 30-90 days after the event.
CREATE TABLE messages (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  conversation_id BIGINT UNSIGNED NOT NULL,
  sender_id BIGINT UNSIGNED NOT NULL,
  body VARCHAR(500) NOT NULL,
  sent_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (conversation_id) REFERENCES conversations(id) ON DELETE CASCADE,
  FOREIGN KEY (sender_id) REFERENCES users(id) ON DELETE CASCADE,
  INDEX idx_conv (conversation_id, sent_at)
);

-- TRUST, INCENTIVES, ALERTS
CREATE TABLE credit_ledger (          -- request budget = 3 + SUM(delta)
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  user_id BIGINT UNSIGNED NOT NULL,
  delta SMALLINT NOT NULL,
  reason VARCHAR(60) NOT NULL,
  ref_id BIGINT UNSIGNED NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE reports_blocks (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  reporter_id BIGINT UNSIGNED NOT NULL,
  target_id BIGINT UNSIGNED NOT NULL,
  type ENUM('report','block') NOT NULL,
  reason VARCHAR(255) NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (reporter_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (target_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE notifications (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  user_id BIGINT UNSIGNED NOT NULL,
  type VARCHAR(40) NOT NULL,
  payload JSON NULL,
  read_at TIMESTAMP NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  INDEX idx_user_unread (user_id, read_at)
);
```
