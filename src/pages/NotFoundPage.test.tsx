import { render, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { NotFoundPage } from './NotFoundPage';
import { LanguageProvider } from '../i18n/LanguageContext';
import { getTranslation } from '../i18n/translations';

const clearHeadMetadata = () => {
  document.head
    .querySelectorAll('meta[name="robots"], link[rel="canonical"], link[rel="alternate"]')
    .forEach((element) => element.remove());
};

beforeEach(() => {
  localStorage.setItem('mohasabi-locale', 'en');
  clearHeadMetadata();
});

afterEach(clearHeadMetadata);

describe('NotFoundPage metadata', () => {
  it('keeps a 404 non-indexable and drops canonical/hreflang from the previous page', async () => {
    const canonical = document.createElement('link');
    canonical.rel = 'canonical';
    canonical.href = 'https://mohasabi.pages.dev/pricing?lang=en';
    document.head.appendChild(canonical);

    const alternate = document.createElement('link');
    alternate.rel = 'alternate';
    alternate.hreflang = 'fr';
    alternate.href = 'https://mohasabi.pages.dev/pricing?lang=fr';
    document.head.appendChild(alternate);

    const existingRobots = document.createElement('meta');
    existingRobots.name = 'robots';
    existingRobots.content = 'noindex, follow';
    document.head.appendChild(existingRobots);

    render(
      <MemoryRouter initialEntries={['/missing']}>
        <LanguageProvider>
          <NotFoundPage />
        </LanguageProvider>
      </MemoryRouter>,
    );

    await waitFor(() =>
      expect(document.title).toBe(getTranslation('en', 'notFound.title')),
    );

    const robots = document.head.querySelectorAll('meta[name="robots"]');
    expect(robots).toHaveLength(1);
    expect(robots[0].getAttribute('content')).toBe('noindex, nofollow');
    expect(document.head.querySelector('link[rel="canonical"]')).toBeNull();
    expect(document.head.querySelectorAll('link[rel="alternate"][hreflang]')).toHaveLength(0);
    expect(document.head.querySelector('meta[name="description"]')?.getAttribute('content')).toBe(
      getTranslation('en', 'notFound.body'),
    );
  });
});
