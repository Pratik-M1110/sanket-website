# Advocate Sanket Palnitkar website

A bilingual (Marathi / English) React + Vite website. The build pre-renders every page to static HTML, so it can be hosted on any static host and search engines can read it without running JavaScript.

## Pages

| URL | Content |
| --- | --- |
| `/` and `/en/` | Home (Marathi default, English) |
| `/services/<slug>/` and `/en/services/<slug>/` | Six practice-area pages with typical matters, documents to bring and FAQs |

Service slugs: `high-court-writ-petitions`, `civil-property-disputes`, `family-divorce-matters`, `criminal-bail-cases`, `service-labour-mat-matters`, `consumer-legal-notice`.

Each page gets its own title, description, canonical URL, `hreflang` links and JSON-LD (Attorney, FAQPage and, on service pages, BreadcrumbList). `sitemap.xml` and `robots.txt` are generated into `dist/` by the build.

## Run locally

```sh
npm install
npm run dev          # development
npm run build        # writes the static site to dist/
npm run preview      # serves dist/ locally
```

## Where to edit things

| What | File |
| --- | --- |
| Home page text (both languages), phone, WhatsApp, form | `App.jsx` |
| Service pages (both languages) | `services.js` |
| Domain, address, image for SEO output | `site.js` |
| Meta tags, JSON-LD, sitemap, robots | `seo.js` |

## Before going live

1. **Set the real domain.** Build with `SITE_URL` set, for example `SITE_URL=https://advsanketpalnitkar.in npm run build` (PowerShell: `$env:SITE_URL='https://...'; npm run build`). This one setting drives canonical URLs, `hreflang`, structured data, `sitemap.xml` and `robots.txt`. The default in `site.js` is a placeholder Netlify address that does not match the advocate's name. Use a custom domain, because the site links to `/en/` and `/services/...` from the site root.
2. **Receive leads reliably.** By default the enquiry form opens WhatsApp with the details filled in. To also capture leads without relying on the visitor pressing send, set `VITE_LEAD_ENDPOINT` at build time to a form service URL that accepts a JSON `POST` (for example a Formspree form). The form then posts `name, phone, matter, urgency, note, language, page, source, submittedAt` and shows a confirmation. If the request fails, the visitor is told to call or use WhatsApp.
3. **Measure what works.** The site pushes `click_call`, `click_whatsapp` and `generate_lead` events to `window.dataLayer`. Add Google Tag Manager or GA4 to read them. The `source` field records `utm_source` / `utm_medium` / `utm_campaign` when present, otherwise the referring site.
4. **Replace the stock photograph** with an approved portrait of the advocate and a photo of the chamber (`site.image` in `site.js`, and the image in `App.jsx`).
5. **Verify every fact** with the advocate: qualifications, phone, and the service-page text. Add an office address only after it is confirmed and approved for publication. Add enrolment year and Bar Council details once confirmed. The Marathi text should be read by a native speaker before launch.
6. Submit `https://<your-domain>/sitemap.xml` in Google Search Console, then create and verify a Google Business Profile that uses the same name, address and phone number as this site.

## Professional-conduct notes (Bar Council of India)

- Advocates may not advertise or solicit work. The site is written as factual information, carries a disclaimer in the footer, and avoids "best", "guaranteed" and "free consultation" wording. Keep it that way when adding content.
- Client testimonials on the home page may count as advertising under Bar Council rules. Confirm with the advocate (or the State Bar Council) before keeping or adding them.
- Do not add outcome claims, win rates or case counts.
- **Paying a share of fees to a website operator needs legal advice first.** Advocates are generally barred from sharing fees with non-advocates and from using agents or intermediaries to obtain work. A fixed fee for website, hosting and marketing services is the usual safer structure than a percentage of client fees.

## Data protection

The form collects a name, phone number and message, with an explicit consent checkbox and a short privacy note. The advocate is responsible for how this data is stored and used under the Digital Personal Data Protection Act, 2023; if a lead endpoint is used, check that provider's terms.

Local SEO helps search engines understand the site but cannot guarantee rankings.
