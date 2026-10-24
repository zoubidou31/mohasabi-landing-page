import { describe, expect, it } from 'vitest';
import {
  getTranslation,
  isRTL,
  localeNames,
  locales,
  translations,
  type Locale,
  type TranslationKey,
} from './translations';
import { publicSeoPages } from '../seo/pages';

const keys = Object.keys(translations.ar) as TranslationKey[];

const placeholders = (value: string): string[] =>
  (value.match(/\{[a-zA-Z]+\}/g) ?? []).sort();

describe('translation tables', () => {
  it('defines the same keys in Arabic, French and English', () => {
    for (const locale of locales) {
      expect(Object.keys(translations[locale]).sort()).toEqual([...keys].sort());
    }
  });

  it('never ships an empty value or a raw key', () => {
    for (const locale of locales) {
      for (const key of keys) {
        const value = translations[locale][key];
        expect(value.trim().length, `${locale}:${key}`).toBeGreaterThan(0);
        expect(value, `${locale}:${key}`).not.toBe(key);
      }
    }
  });

  it('keeps placeholders identical across locales', () => {
    for (const key of keys) {
      const reference = placeholders(translations.ar[key]);
      if (reference.length === 0) continue;
      for (const locale of ['fr', 'en'] as const) {
        expect(placeholders(translations[locale][key]), `${locale}:${key}`).toEqual(reference);
      }
    }
  });

  it('exposes the three locales with their native names and RTL rules', () => {
    expect(locales).toEqual(['ar', 'fr', 'en']);
    expect(localeNames).toEqual({ ar: 'العربية', fr: 'Français', en: 'English' });
    expect(locales.map(isRTL)).toEqual([true, false, false]);
  });

  it('falls back to the key only for an unknown key', () => {
    expect(getTranslation('fr', 'nav.home')).toBe(translations.fr['nav.home']);
    expect(getTranslation('fr', 'missing.key' as TranslationKey)).toBe('missing.key');
  });
});

describe('SEO page table', () => {
  it('maps every public page to translated title and description keys', () => {
    const paths = publicSeoPages.map((page) => page.path);
    expect(new Set(paths).size).toBe(paths.length);

    for (const page of publicSeoPages) {
      expect(page.path.startsWith('/')).toBe(true);
      for (const locale of locales as Locale[]) {
        expect(getTranslation(locale, page.titleKey)).not.toBe(page.titleKey);
        expect(getTranslation(locale, page.descriptionKey)).not.toBe(page.descriptionKey);
      }
    }
  });

  it('never lists the admin panel or API routes as indexable pages', () => {
    const paths = publicSeoPages.map((page) => page.path);
    expect(paths.some((path) => path.startsWith('/admin'))).toBe(false);
    expect(paths.some((path) => path.startsWith('/api'))).toBe(false);
  });
});
