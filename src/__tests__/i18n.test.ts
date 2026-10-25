import { describe, expect, it } from 'vitest';
import {
  getTranslation,
  isRTL,
  locales,
  localeNames,
  type Locale,
  type TranslationKey,
} from '../i18n/translations';

describe('i18n Multi-Language System', () => {
  it('supports the required three languages: Arabic, French, English', () => {
    expect(locales).toEqual(['ar', 'fr', 'en']);
  });

  it('maps correct directional orientation for RTL (Arabic) and LTR (French, English)', () => {
    expect(isRTL('ar')).toBe(true);
    expect(isRTL('fr')).toBe(false);
    expect(isRTL('en')).toBe(false);
  });

  it('defines native names for all supported locales', () => {
    expect(localeNames.ar).toBe('العربية');
    expect(localeNames.fr).toBe('Français');
    expect(localeNames.en).toBe('English');
  });

  it('has consistent translations across all locales without missing keys', () => {
    const testKeys: TranslationKey[] = [
      'nav.home',
      'nav.pricing',
      'nav.guide',
      'nav.reviews',
      'nav.whatsNew',
      'nav.support',
      'hero.title',
      'hero.tagline',
      'pricing.title',
      'pricing.badge',
      'guide.title',
      'support.title',
      'reviews.title',
      'whatsNew.title',
      'notFound.title',
      'notFound.heading',
    ];

    for (const key of testKeys) {
      for (const loc of locales) {
        const text = getTranslation(loc, key);
        expect(text, `Key ${key} in ${loc} must be non-empty string`).toBeTruthy();
        expect(typeof text).toBe('string');
        expect(text.length).toBeGreaterThan(0);
        // Ensure no raw undefined or fallback marker
        expect(text).not.toContain('undefined');
        expect(text).not.toBe(key);
      }
    }
  });

  it('falls back to Arabic if unknown locale is provided', () => {
    const fallbackText = getTranslation('es' as Locale, 'hero.title');
    const arText = getTranslation('ar', 'hero.title');
    expect(fallbackText).toBe(arText);
  });
});

