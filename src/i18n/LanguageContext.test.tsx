import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { LanguageProvider, useLanguage } from './LanguageContext';
import { getTranslation } from './translations';
import { localizedUrl, useSeo } from './useSeo';

const LocaleProbe: React.FC = () => {
  const { locale, setLocale, t, isRTL } = useLanguage();
  return (
    <div>
      <span data-testid="locale">{locale}</span>
      <span data-testid="rtl">{String(isRTL)}</span>
      <span data-testid="home">{t('nav.home')}</span>
      <button type="button" onClick={() => setLocale('fr')}>
        switch-fr
      </button>
      <button type="button" onClick={() => setLocale('en')}>
        switch-en
      </button>
    </div>
  );
};

const SeoProbe: React.FC = () => {
  useSeo('seo.page.pricing', 'seo.desc.pricing');
  const { setLocale } = useLanguage();
  return (
    <button type="button" onClick={() => setLocale('fr')}>
      switch-fr
    </button>
  );
};

const renderProbe = (entry = '/') =>
  render(
    <MemoryRouter initialEntries={[entry]}>
      <LanguageProvider>
        <LocaleProbe />
      </LanguageProvider>
    </MemoryRouter>,
  );

const headValue = (selector: string, attribute: string): string | null =>
  document.head.querySelector(selector)?.getAttribute(attribute) ?? null;

const stubBrowserLanguage = (value: string) => {
  Object.defineProperty(navigator, 'language', { value, configurable: true });
};

afterEach(() => {
  window.history.replaceState({}, '', '/');
  delete (navigator as { language?: string }).language;
});

describe('LanguageProvider', () => {
  it('defaults to Arabic with RTL and lang="ar"', () => {
    stubBrowserLanguage('ar-DZ');
    renderProbe();
    expect(screen.getByTestId('locale')).toHaveTextContent('ar');
    expect(screen.getByTestId('rtl')).toHaveTextContent('true');
    expect(document.documentElement.lang).toBe('ar');
    expect(document.documentElement.dir).toBe('rtl');
  });

  it('restores the stored language when the URL has no language', () => {
    localStorage.setItem('mohasabi-locale', 'en');
    renderProbe();
    expect(screen.getByTestId('locale')).toHaveTextContent('en');
    expect(screen.getByTestId('home')).toHaveTextContent(getTranslation('en', 'nav.home'));
    expect(document.documentElement.dir).toBe('ltr');
  });

  it('lets an explicit ?lang= link win over the stored language', () => {
    localStorage.setItem('mohasabi-locale', 'en');
    window.history.replaceState({}, '', '/?lang=fr');
    renderProbe();
    expect(screen.getByTestId('locale')).toHaveTextContent('fr');
    expect(screen.getByTestId('home')).toHaveTextContent(getTranslation('fr', 'nav.home'));
  });

  it('ignores an unsupported language in the URL', () => {
    stubBrowserLanguage('ar-DZ');
    window.history.replaceState({}, '', '/?lang=de');
    renderProbe();
    expect(screen.getByTestId('locale')).toHaveTextContent('ar');
  });

  it('falls back to Arabic when the browser language is not supported', () => {
    stubBrowserLanguage('de-DE');
    renderProbe();
    expect(screen.getByTestId('locale')).toHaveTextContent('ar');
  });

  it('uses the browser language when nothing is stored', () => {
    const descriptor = Object.getOwnPropertyDescriptor(navigator, 'language');
    Object.defineProperty(navigator, 'language', { value: 'fr-FR', configurable: true });
    try {
      renderProbe();
      expect(screen.getByTestId('locale')).toHaveTextContent('fr');
    } finally {
      if (descriptor) Object.defineProperty(navigator, 'language', descriptor);
      else delete (navigator as { language?: string }).language;
    }
  });

  it('persists a language change in storage, the document and the URL', () => {
    renderProbe();
    fireEvent.click(screen.getByRole('button', { name: 'switch-fr' }));

    expect(screen.getByTestId('locale')).toHaveTextContent('fr');
    expect(localStorage.getItem('mohasabi-locale')).toBe('fr');
    expect(document.documentElement.lang).toBe('fr');
    expect(document.documentElement.dir).toBe('ltr');
    expect(window.location.search).toBe('?lang=fr');
    expect(screen.getByTestId('home')).toHaveTextContent(getTranslation('fr', 'nav.home'));
  });

  it('refuses to be used outside its provider', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {});
    expect(() => render(<LocaleProbe />)).toThrow(/within a LanguageProvider/);
    spy.mockRestore();
  });
});

describe('useSeo', () => {
  beforeEach(() => {
    document.head
      .querySelectorAll(
        'meta[name="description"], meta[property^="og:"], meta[name^="twitter:"], link[rel="canonical"], link[rel="alternate"]',
      )
      .forEach((element) => element.remove());
  });

  it('builds one URL per language and keeps the bare path as x-default', () => {
    expect(localizedUrl('/pricing', 'ar')).toBe('https://mohasabi.pages.dev/pricing?lang=ar');
    expect(localizedUrl('/', 'en')).toBe('https://mohasabi.pages.dev/?lang=en');
  });

  it('writes title, description, canonical and reciprocal hreflang for Arabic', () => {
    stubBrowserLanguage('ar-DZ');
    render(
      <MemoryRouter initialEntries={['/pricing']}>
        <LanguageProvider>
          <SeoProbe />
        </LanguageProvider>
      </MemoryRouter>,
    );

    expect(document.title).toBe(getTranslation('ar', 'seo.page.pricing'));
    expect(headValue('meta[name="description"]', 'content')).toBe(
      getTranslation('ar', 'seo.desc.pricing'),
    );
    expect(headValue('meta[property="og:title"]', 'content')).toBe(document.title);
    expect(headValue('meta[property="og:url"]', 'content')).toBe(
      'https://mohasabi.pages.dev/pricing?lang=ar',
    );
    expect(headValue('meta[property="og:locale"]', 'content')).toBe('ar_DZ');
    expect(headValue('meta[name="twitter:title"]', 'content')).toBe(document.title);
    expect(headValue('link[rel="canonical"]', 'href')).toBe(
      'https://mohasabi.pages.dev/pricing?lang=ar',
    );

    expect(headValue('link[rel="alternate"][hreflang="ar"]', 'href')).toBe(
      'https://mohasabi.pages.dev/pricing?lang=ar',
    );
    expect(headValue('link[rel="alternate"][hreflang="fr"]', 'href')).toBe(
      'https://mohasabi.pages.dev/pricing?lang=fr',
    );
    expect(headValue('link[rel="alternate"][hreflang="en"]', 'href')).toBe(
      'https://mohasabi.pages.dev/pricing?lang=en',
    );
    expect(headValue('link[rel="alternate"][hreflang="x-default"]', 'href')).toBe(
      'https://mohasabi.pages.dev/pricing',
    );

    expect(document.documentElement.lang).toBe('ar');
    expect(document.documentElement.dir).toBe('rtl');
  });

  it('updates the document when the visitor switches to French', () => {
    stubBrowserLanguage('ar-DZ');
    render(
      <MemoryRouter initialEntries={['/pricing']}>
        <LanguageProvider>
          <SeoProbe />
        </LanguageProvider>
      </MemoryRouter>,
    );

    fireEvent.click(screen.getByRole('button', { name: 'switch-fr' }));

    expect(document.title).toBe(getTranslation('fr', 'seo.page.pricing'));
    expect(headValue('meta[name="description"]', 'content')).toBe(
      getTranslation('fr', 'seo.desc.pricing'),
    );
    expect(headValue('link[rel="canonical"]', 'href')).toBe(
      'https://mohasabi.pages.dev/pricing?lang=fr',
    );
    expect(headValue('meta[property="og:locale"]', 'content')).toBe('fr_DZ');
    expect(document.documentElement.lang).toBe('fr');
    expect(document.documentElement.dir).toBe('ltr');
  });
});
