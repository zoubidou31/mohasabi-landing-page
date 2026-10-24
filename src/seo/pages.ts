import type { TranslationKey } from '../i18n/translations';

export interface PageSeo {
  path: string;
  titleKey: TranslationKey;
  descriptionKey: TranslationKey;
}

/**
 * Indexable, language-aware pages. `/admin` is deliberately absent: it must
 * never appear in the sitemap or in generated Open Graph metadata.
 */
export const publicSeoPages: readonly PageSeo[] = [
  { path: '/', titleKey: 'seo.page.home', descriptionKey: 'seo.desc.home' },
  { path: '/features', titleKey: 'seo.page.features', descriptionKey: 'seo.desc.features' },
  { path: '/guide', titleKey: 'seo.page.guide', descriptionKey: 'seo.desc.guide' },
  { path: '/pricing', titleKey: 'seo.page.pricing', descriptionKey: 'seo.desc.pricing' },
  { path: '/support', titleKey: 'seo.page.support', descriptionKey: 'seo.desc.support' },
  { path: '/reviews', titleKey: 'seo.page.reviews', descriptionKey: 'seo.desc.reviews' },
  { path: '/whats-new', titleKey: 'seo.page.whatsNew', descriptionKey: 'seo.desc.whatsNew' },
  { path: '/privacy', titleKey: 'seo.page.privacy', descriptionKey: 'seo.desc.privacy' },
  { path: '/terms', titleKey: 'seo.page.terms', descriptionKey: 'seo.desc.terms' },
];

/** Static `.html` files emitted next to index.html and served by `_redirects`. */
export const seoHtmlFiles: readonly { path: string; file: string }[] = publicSeoPages
  .filter((page) => page.path !== '/')
  .map((page) => ({ path: page.path, file: `${page.path.slice(1)}.html` }));
