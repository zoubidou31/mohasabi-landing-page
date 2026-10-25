import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useLanguage } from './LanguageContext';
import { siteConfig } from '../config/siteConfig';
import type { TranslationKey } from './translations';

export const usePageTitle = (titleKey: TranslationKey): void => {
  const { t } = useLanguage();
  const { pathname } = useLocation();

  useEffect(() => {
    const title = t(titleKey);
    document.title = title;

    const normalizedPath = pathname === '/' ? '' : pathname;
    const url = `${siteConfig.site.url}${normalizedPath}`;

    const canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (canonical) canonical.href = url || `${siteConfig.site.url}/`;

    const ogUrl = document.querySelector<HTMLMetaElement>('meta[property="og:url"]');
    if (ogUrl) ogUrl.content = url || `${siteConfig.site.url}/`;

    const ogTitle = document.querySelector<HTMLMetaElement>('meta[property="og:title"]');
    if (ogTitle) ogTitle.content = title;

    const twitterTitle = document.querySelector<HTMLMetaElement>('meta[name="twitter:title"]');
    if (twitterTitle) twitterTitle.content = title;
  }, [t, titleKey, pathname]);
};
