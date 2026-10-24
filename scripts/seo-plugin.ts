import type { Plugin } from 'vite';
import { getTranslation } from '../src/i18n/translations';
import { siteConfig } from '../src/config/siteConfig';
import { publicSeoPages } from '../src/seo/pages';
import { releases } from '../src/content/releases';

const SITE = siteConfig.site.url.replace(/\/$/, '');

const localized = (path: string, locale: 'ar' | 'fr' | 'en'): string =>
  `${SITE}${path === '/' ? '/' : path}?lang=${locale}`;

const bare = (path: string): string => `${SITE}${path === '/' ? '/' : path}`;

const escapeHtml = (value: string): string =>
  value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const escapeXml = (value: string): string => escapeHtml(value).replace(/'/g, '&apos;');

const jsonLd = (): string => {
  const graph = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${SITE}/#organization`,
        name: 'Mohasabi',
        url: `${SITE}/`,
        logo: `${SITE}/assets/logo.png`,
      },
      {
        '@type': 'WebSite',
        '@id': `${SITE}/#website`,
        url: `${SITE}/`,
        name: 'Mohasabi',
        inLanguage: ['ar', 'fr', 'en'],
        publisher: { '@id': `${SITE}/#organization` },
      },
      {
        '@type': 'SoftwareApplication',
        '@id': `${SITE}/#software`,
        name: 'Mohasabi',
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'Windows 10, Windows 11',
        softwareVersion: siteConfig.release.version,
        url: `${SITE}/`,
        publisher: { '@id': `${SITE}/#organization` },
      },
    ],
  };
  return `<script type="application/ld+json">${JSON.stringify(graph)}</script>`;
};

const languageLinks = (path: string): string =>
  ['ar', 'fr', 'en']
    .map(
      (locale) =>
        `    <link rel="alternate" hreflang="${locale}" href="${localized(path, locale as 'ar' | 'fr' | 'en')}" />`,
    )
    .concat(`    <link rel="alternate" hreflang="x-default" href="${bare(path)}" />`)
    .join('\n');

const replaceOrThrow = (html: string, pattern: RegExp, replacement: string, label: string): string => {
  if (!pattern.test(html)) throw new Error(`SEO prerender: missing ${label} in index.html`);
  return html.replace(pattern, replacement);
};

interface HeadOptions {
  path: string;
  title: string;
  description: string;
  noindex?: boolean;
}

const renderHead = (template: string, options: HeadOptions): string => {
  const { path, title, description, noindex = false } = options;
  const canonical = localized(path, 'ar');
  let html = template;

  html = replaceOrThrow(html, /<title>[\s\S]*?<\/title>/, `<title>${escapeHtml(title)}</title>`, 'title');
  html = replaceOrThrow(
    html,
    /<meta name="description" content="[^"]*" \/>/,
    `<meta name="description" content="${escapeHtml(description)}" />`,
    'description',
  );
  html = replaceOrThrow(
    html,
    /<meta property="og:title" content="[^"]*" \/>/,
    `<meta property="og:title" content="${escapeHtml(title)}" />`,
    'og:title',
  );
  html = replaceOrThrow(
    html,
    /<meta property="og:description" content="[^"]*" \/>/,
    `<meta property="og:description" content="${escapeHtml(description)}" />`,
    'og:description',
  );
  html = replaceOrThrow(
    html,
    /<meta property="og:url" content="[^"]*" \/>/,
    `<meta property="og:url" content="${canonical}" />`,
    'og:url',
  );
  html = replaceOrThrow(
    html,
    /<meta name="twitter:title" content="[^"]*" \/>/,
    `<meta name="twitter:title" content="${escapeHtml(title)}" />`,
    'twitter:title',
  );
  html = replaceOrThrow(
    html,
    /<meta name="twitter:description" content="[^"]*" \/>/,
    `<meta name="twitter:description" content="${escapeHtml(description)}" />`,
    'twitter:description',
  );

  const localeTags = [
    '    <meta property="og:locale" content="ar_DZ" />',
    '    <meta property="og:locale:alternate" content="fr_DZ" />',
    '    <meta property="og:locale:alternate" content="en_GB" />',
  ].join('\n');
  html = html.replace(
    /(<meta property="og:url" content="[^"]*" \/>)/,
    `$1\n${localeTags}`,
  );

  if (noindex) {
    html = html.replace(
      /<link rel="canonical" href="[^"]*" \/>/,
      '<meta name="robots" content="noindex, nofollow" />',
    );
    // Error and private shells must not advertise structured data.
    return html;
  }

  html = replaceOrThrow(
    html,
    /<link rel="canonical" href="[^"]*" \/>/,
    `<link rel="canonical" href="${canonical}" />\n${languageLinks(path)}`,
    'canonical',
  );

  return html.replace('</head>', `    ${jsonLd()}\n  </head>`);
};

const sitemap = (): string => {
  const lastmod = new Date().toISOString().slice(0, 10);
  const paths = [
    ...publicSeoPages.map((page) => page.path),
    ...releases.map((release) => `/whats-new/${release.version}`),
  ];
  const entries = paths
    .map((path) => {
      const alternates = [
        ...['ar', 'fr', 'en'].map(
          (locale) =>
            `    <xhtml:link rel="alternate" hreflang="${locale}" href="${escapeXml(localized(path, locale as 'ar' | 'fr' | 'en'))}" />`,
        ),
        `    <xhtml:link rel="alternate" hreflang="x-default" href="${escapeXml(bare(path))}" />`,
      ].join('\n');
      return `  <url>\n    <loc>${escapeXml(localized(path, 'ar'))}</loc>\n    <lastmod>${lastmod}</lastmod>\n${alternates}\n  </url>`;
    })
    .join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${entries}\n</urlset>\n`;
};

/**
 * Emits one HTML shell per indexable route with route-specific head tags, plus
 * sitemap.xml and a 404 shell. Cloudflare Pages serves these files directly,
 * so social crawlers and search engines see correct metadata without JS.
 */
export const seoPrerender = (): Plugin => ({
  name: 'mohasabi-seo-prerender',
  apply: 'build',
  enforce: 'post',
  generateBundle: {
    order: 'post',
    handler(_options, bundle) {
    const index = bundle['index.html'];
    if (!index || index.type !== 'asset') throw new Error('SEO prerender: index.html missing from bundle');
    const template = String(index.source);

    for (const page of publicSeoPages) {
      const title = getTranslation('ar', page.titleKey);
      const description = getTranslation('ar', page.descriptionKey);
      const html = renderHead(template, { path: page.path, title, description });
      if (page.path === '/') {
        index.source = html;
      } else {
        this.emitFile({ type: 'asset', fileName: `${page.path.slice(1)}.html`, source: html });
      }
    }

    for (const release of releases) {
      const title = `Mohasabi ${release.version} — ${getTranslation('ar', 'seo.page.whatsNew')}`;
      const description = getTranslation('ar', 'seo.desc.whatsNew');
      this.emitFile({
        type: 'asset',
        fileName: `whats-new/${release.version}.html`,
        source: renderHead(template, { path: `/whats-new/${release.version}`, title, description }),
      });
    }

    this.emitFile({
      type: 'asset',
      fileName: '404.html',
      source: renderHead(template, {
        path: '/404',
        title: getTranslation('ar', 'notFound.title'),
        description: getTranslation('ar', 'notFound.body'),
        noindex: true,
      }),
    });
    this.emitFile({
      type: 'asset',
      fileName: 'admin.html',
      source: renderHead(template, {
        path: '/admin',
        title: getTranslation('ar', 'admin.title'),
        description: getTranslation('ar', 'admin.loginBody'),
        noindex: true,
      }),
    });
    this.emitFile({ type: 'asset', fileName: 'sitemap.xml', source: sitemap() });
    },
  },
});
