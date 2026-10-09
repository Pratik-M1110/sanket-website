import { services } from './services.js';

export function routePath(language, slug) {
  const prefix = language === 'en' ? '/en' : '';
  return slug ? `${prefix}/services/${slug}/` : `${prefix}/`;
}

export function resolveRoute(pathname) {
  const match = pathname.replace(/index\.html$/, '').match(/^(\/en)?(?:\/services\/([a-z0-9-]+))?\/?$/);
  const language = match && match[1] ? 'en' : 'mr';
  const slug = match && match[2] && services.some((service) => service.slug === match[2]) ? match[2] : null;
  return { language, slug };
}

export function allRoutes() {
  const routes = [];
  for (const language of ['mr', 'en']) {
    routes.push({ language, slug: null });
    for (const service of services) {
      routes.push({ language, slug: service.slug });
    }
  }
  return routes;
}
