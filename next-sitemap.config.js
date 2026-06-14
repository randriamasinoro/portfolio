/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://sinoro.fr',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  changefreq: 'weekly',
  priority: 0.7,
  autoLastmod: true,
  // Routes d'images générées (next/og) — pas des pages à indexer
  exclude: ['/opengraph-image', '/twitter-image', '/icon', '/apple-icon', '/manifest.webmanifest'],
  // Priorités par page : home et projets en tête
  transform: async (config, path) => {
    let priority = 0.7;
    let changefreq = 'weekly';

    if (path === '/') {
      priority = 1.0;
    } else if (path === '/projects') {
      priority = 0.9;
    } else if (path.startsWith('/projects/')) {
      priority = 0.8;
    } else if (path === '/about') {
      priority = 0.8;
    }

    return {
      loc: path,
      changefreq,
      priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
    };
  },
  robotsTxtOptions: {
    policies: [
      { userAgent: '*', allow: '/' },
    ],
    additionalSitemaps: [
      'https://sinoro.fr/sitemap.xml',
    ],
  },
}
