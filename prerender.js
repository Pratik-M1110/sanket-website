import { createElement } from 'react';
import { renderToString } from 'react-dom/server';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { createServer } from 'vite';
import react from '@vitejs/plugin-react';
import { DEFAULT_SITE_URL } from './site.js';
import { allRoutes, routePath } from './routes.js';
import { buildHead, buildRobots, buildSitemap } from './seo.js';

const seoTagPatterns = [
  /<title>[\s\S]*?<\/title>\s*/,
  /<meta (?:name="(?:description|robots|twitter:[^"]+)"|property="og:[^"]+") [^>]*\/>\s*/g,
  /<link rel="(?:canonical|alternate)"[^>]*\/>\s*/g,
  /<script type="application\/ld\+json">[\s\S]*?<\/script>\s*/,
];

// Builds one static HTML file per route (Marathi and English home plus each service page),
// then writes sitemap.xml and robots.txt for the configured domain.
export function prerenderPages() {
  return {
    name: 'prerender-pages',
    apply: 'build',
    async closeBundle() {
      const siteUrl = (process.env.SITE_URL || DEFAULT_SITE_URL).replace(/\/+$/, '');
      const server = await createServer({
        configFile: false,
        root: process.cwd(),
        plugins: [react()],
        optimizeDeps: { noDiscovery: true, include: [] },
        server: { middlewareMode: true },
        appType: 'custom',
      });

      try {
        const { default: App, faqs } = await server.ssrLoadModule('/App.jsx');
        const template = await readFile(resolve('dist/index.html'), 'utf8');
        const appRoot = '<div id="root"></div>';

        if (!template.includes(appRoot)) {
          throw new Error('Could not find the React root in the generated index.html.');
        }

        const baseDocument = seoTagPatterns.reduce((html, pattern) => html.replace(pattern, ''), template);
        const routes = allRoutes();

        for (const route of routes) {
          const depth = (route.language === 'en' ? 1 : 0) + (route.slug ? 2 : 0);
          const assetPrefix = depth ? '../'.repeat(depth) : './';
          const markup = renderToString(createElement(App, { route }));
          const head = buildHead({ siteUrl, route, homeFaqs: faqs });

          const html = baseDocument
            .replace(/<html lang="[^"]*"/, `<html lang="${route.language === 'en' ? 'en-IN' : 'mr-IN'}"`)
            .replace('</head>', () => `    ${head}\n  </head>`)
            .replace(appRoot, () => `<div id="root">${markup}</div>`)
            .replaceAll('./assets/', `${assetPrefix}assets/`);

          const outputPath = resolve('dist', `.${routePath(route.language, route.slug)}`, 'index.html');
          await mkdir(dirname(outputPath), { recursive: true });
          await writeFile(outputPath, html);
        }

        const lastModified = new Date().toISOString().slice(0, 10);
        await writeFile(resolve('dist/sitemap.xml'), buildSitemap({ siteUrl, routes, lastModified }));
        await writeFile(resolve('dist/robots.txt'), buildRobots({ siteUrl }));
      } finally {
        await server.close();
      }
    },
  };
}
