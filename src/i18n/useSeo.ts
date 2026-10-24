import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useLanguage } from './LanguageContext';
import { siteConfig } from '../config/siteConfig';
import { isRTL, type Locale, type TranslationKey } from './translations';

const OG_LOCALES: Record<Locale, string> = {
  ar: 'ar_DZ',
  fr: 'fr_DZ',
  en: 'en_GB',
};

/** One URL per language; the bare path is kept as `x-default`. */
export const localizedUrl = (path: string, locale: Locale): string =>
  `${siteConfig.site.url.replace(/\/$/, '')}${path === '/' ? '/' : path}?lang=${locale}`;

const setMeta = (selector: string, attribute: 'name' | 'property', key: string, content: string) => {
  let element = document.head.querySelector<HTMLMetaElement>(selector);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }
  element.setAttribute('content', content);
};

const setLink = (rel: string, href: string, hreflang?: string) => {
  const selector = hreflang
    ? `link[rel="${rel}"][hreflang="${hreflang}"]`
    : `link[rel="${rel}"]:not([hreflang])`;
  let element = document.head.querySelector<HTMLLinkElement>(selector);
  if (!element) {
    element = document.createElement('link');
    element.rel = rel;
    if (hreflang) element.hreflang = hreflang;
    document.head.appendChild(element);
  }
  element.href = href;
};

/**
 * Keeps title, description, canonical, hreflang and social metadata in sync
 * with the active route and interface language. The static HTML generated at
 * build time covers crawlers that do not execute JavaScript.
 */
export const useSeo = (
  titleKey: TranslationKey,
  descriptionKey: TranslationKey,
  titleOverride?: string,
): void => {
  const { t, locale } = useLanguage();
  const { pathname } = useLocation();

  useEffect(() => {
    const title = titleOverride ?? t(titleKey);
    const description = t(descriptionKey);
    const canonical = localizedUrl(pathname, locale);
    const defaultUrl = `${siteConfig.site.url.replace(/\/$/, '')}${pathname === '/' ? '/' : pathname}`;

    document.title = title;
    document.documentElement.lang = locale;
    document.documentElement.dir = isRTL(locale) ? 'rtl' : 'ltr';

    setMeta('meta[name="description"]', 'name', 'description', description);
    setMeta('meta[property="og:title"]', 'property', 'og:title', title);
    setMeta('meta[property="og:description"]', 'property', 'og:description', description);
    setMeta('meta[property="og:url"]', 'property', 'og:url', canonical);
    setMeta('meta[property="og:locale"]', 'property', 'og:locale', OG_LOCALES[locale]);
    setMeta('meta[name="twitter:title"]', 'name', 'twitter:title', title);
    setMeta('meta[name="twitter:description"]', 'name', 'twitter:description', description);

    setLink('canonical', canonical);
    setLink('alternate', localizedUrl(pathname, 'ar'), 'ar');
    setLink('alternate', localizedUrl(pathname, 'fr'), 'fr');
    setLink('alternate', localizedUrl(pathname, 'en'), 'en');
    setLink('alternate', defaultUrl, 'x-default');
  }, [t, locale, pathname, titleKey, descriptionKey, titleOverride]);
};
