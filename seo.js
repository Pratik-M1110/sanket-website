import { site } from './site.js';
import { services } from './services.js';
import { routePath } from './routes.js';

const homeMeta = {
  mr: {
    title: 'ॲड. संकेत पालनीकर | Advocate in Aurangabad & Chhatrapati Sambhajinagar',
    description: 'ॲड. संकेत पालनीकर — Chhatrapati Sambhajinagar (Aurangabad) येथील वकील. उच्च न्यायालयीन रिट, दिवाणी, मालमत्ता, कौटुंबिक, फौजदारी, कामगार व सेवा प्रकरणांसाठी कायदेशीर सल्ला व प्रतिनिधित्व.',
  },
  en: {
    title: 'Adv. Sanket Palnitkar | Advocate in Aurangabad & Chhatrapati Sambhajinagar',
    description: 'Adv. Sanket Palnitkar is an advocate in Chhatrapati Sambhajinagar (Aurangabad), Maharashtra, handling High Court writs, civil and property disputes, family, criminal, labour, service and consumer matters.',
  },
};

const crumbs = {
  mr: { home: 'मुख्यपृष्ठ', services: 'कार्य क्षेत्र' },
  en: { home: 'Home', services: 'Practice Areas' },
};

const escapeAttribute = (value) => String(value).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
const escapeText = (value) => String(value).replace(/&/g, '&amp;').replace(/</g, '&lt;');

function pageMeta({ language, slug }) {
  if (!slug) return homeMeta[language];
  const copy = services.find((service) => service.slug === slug)[language];
  return { title: copy.metaTitle, description: copy.metaDescription };
}

function pageFaqs({ language, slug }, homeFaqs) {
  if (slug) return services.find((service) => service.slug === slug)[language].faqs;
  return homeFaqs.map((faq) => (language === 'mr' ? [faq.question, faq.answer] : [faq.enQuestion, faq.enAnswer]));
}

function structuredData({ siteUrl, route, homeFaqs }) {
  const { language, slug } = route;
  const pageUrl = `${siteUrl}${routePath(language, slug)}`;

  const graph = [
    {
      '@type': 'Attorney',
      '@id': `${siteUrl}/#attorney`,
      name: site.name,
      url: `${siteUrl}/`,
      telephone: site.telephone,
      image: site.image,
      description: homeMeta.en.description,
      areaServed: [
        { '@type': 'City', name: 'Chhatrapati Sambhajinagar', alternateName: 'Aurangabad' },
        { '@type': 'State', name: 'Maharashtra' },
      ],
      knowsAbout: services.map((service) => service.en.name),
    },
    {
      '@type': 'FAQPage',
      '@id': `${pageUrl}#faq`,
      mainEntity: pageFaqs(route, homeFaqs).map(([question, answer]) => ({
        '@type': 'Question',
        name: question,
        acceptedAnswer: { '@type': 'Answer', text: answer },
      })),
    },
  ];

  if (slug) {
    const serviceName = services.find((service) => service.slug === slug)[language].name;
    graph.push({
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: crumbs[language].home, item: `${siteUrl}${routePath(language)}` },
        { '@type': 'ListItem', position: 2, name: crumbs[language].services, item: `${siteUrl}${routePath(language)}#practice` },
        { '@type': 'ListItem', position: 3, name: serviceName, item: pageUrl },
      ],
    });
  }

  return JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }).replace(/</g, '\\u003c');
}

export function buildHead({ siteUrl, route, homeFaqs }) {
  const { language, slug } = route;
  const { title, description } = pageMeta(route);
  const url = `${siteUrl}${routePath(language, slug)}`;
  const locale = language === 'en' ? 'en_IN' : 'mr_IN';
  const otherLocale = language === 'en' ? 'mr_IN' : 'en_IN';

  return [
    `<title>${escapeText(title)}</title>`,
    `<meta name="description" content="${escapeAttribute(description)}" />`,
    '<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />',
    `<link rel="canonical" href="${url}" />`,
    `<link rel="alternate" hreflang="mr-IN" href="${siteUrl}${routePath('mr', slug)}" />`,
    `<link rel="alternate" hreflang="en-IN" href="${siteUrl}${routePath('en', slug)}" />`,
    `<link rel="alternate" hreflang="x-default" href="${siteUrl}${routePath('mr', slug)}" />`,
    '<meta property="og:type" content="website" />',
    `<meta property="og:site_name" content="${escapeAttribute(site.name)}" />`,
    `<meta property="og:title" content="${escapeAttribute(title)}" />`,
    `<meta property="og:description" content="${escapeAttribute(description)}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:locale" content="${locale}" />`,
    `<meta property="og:locale:alternate" content="${otherLocale}" />`,
    `<meta property="og:image" content="${escapeAttribute(site.image)}" />`,
    '<meta property="og:image:alt" content="Legal books and scales of justice" />',
    '<meta name="twitter:card" content="summary_large_image" />',
    `<meta name="twitter:title" content="${escapeAttribute(title)}" />`,
    `<meta name="twitter:description" content="${escapeAttribute(description)}" />`,
    `<meta name="twitter:image" content="${escapeAttribute(site.image)}" />`,
    `<script type="application/ld+json">${structuredData({ siteUrl, route, homeFaqs })}</script>`,
  ].join('\n    ');
}

export function buildSitemap({ siteUrl, routes, lastModified }) {
  const entries = routes.map(({ language, slug }) => {
    const priority = slug ? '0.8' : language === 'mr' ? '1.0' : '0.9';
    return [
      '  <url>',
      `    <loc>${siteUrl}${routePath(language, slug)}</loc>`,
      `    <lastmod>${lastModified}</lastmod>`,
      `    <xhtml:link rel="alternate" hreflang="mr-IN" href="${siteUrl}${routePath('mr', slug)}" />`,
      `    <xhtml:link rel="alternate" hreflang="en-IN" href="${siteUrl}${routePath('en', slug)}" />`,
      `    <xhtml:link rel="alternate" hreflang="x-default" href="${siteUrl}${routePath('mr', slug)}" />`,
      `    <priority>${priority}</priority>`,
      '  </url>',
    ].join('\n');
  });

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${entries.join('\n')}\n</urlset>\n`;
}

export function buildRobots({ siteUrl }) {
  return `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`;
}
