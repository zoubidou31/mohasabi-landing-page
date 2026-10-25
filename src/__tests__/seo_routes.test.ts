import { describe, expect, it } from 'vitest';
import fs from 'fs';
import path from 'path';

describe('SEO, Robots, Sitemap and Directives', () => {
  const rootDir = path.resolve(__dirname, '../../');
  const publicDir = path.join(rootDir, 'public');

  it('provides a strict robots.txt protecting admin and api while indexing public pages', () => {
    const robotsPath = path.join(publicDir, 'robots.txt');
    expect(fs.existsSync(robotsPath)).toBe(true);
    const content = fs.readFileSync(robotsPath, 'utf8');

    expect(content).toContain('User-agent: *');
    expect(content).toContain('Allow: /');
    expect(content).toContain('Disallow: /admin');
    expect(content).toContain('Disallow: /api/');
    expect(content).toContain('Sitemap: https://mohasabi.pages.dev/sitemap.xml');
  });

  it('provides an accurate sitemap.xml with all official pages and three-language hreflang tags', () => {
    const sitemapPath = path.join(publicDir, 'sitemap.xml');
    expect(fs.existsSync(sitemapPath)).toBe(true);
    const content = fs.readFileSync(sitemapPath, 'utf8');

    const expectedPaths = [
      'https://mohasabi.pages.dev/',
      'https://mohasabi.pages.dev/pricing',
      'https://mohasabi.pages.dev/installation',
      'https://mohasabi.pages.dev/reviews',
      'https://mohasabi.pages.dev/updates',
      'https://mohasabi.pages.dev/support',
      'https://mohasabi.pages.dev/privacy',
      'https://mohasabi.pages.dev/terms',
    ];

    for (const url of expectedPaths) {
      expect(content).toContain(`<loc>${url}</loc>`);
    }

    // Must not include private routes
    expect(content).not.toContain('/admin');
    expect(content).not.toContain('/api');

    // Alternate language links
    expect(content).toContain('hreflang="ar"');
    expect(content).toContain('hreflang="fr"');
    expect(content).toContain('hreflang="en"');
    expect(content).toContain('hreflang="x-default"');
  });

  it('configures security headers in _headers with CSP, HSTS and anti-sniffing', () => {
    const headersPath = path.join(publicDir, '_headers');
    expect(fs.existsSync(headersPath)).toBe(true);
    const content = fs.readFileSync(headersPath, 'utf8');

    expect(content).toContain('Content-Security-Policy');
    expect(content).toContain('X-Content-Type-Options: nosniff');
    expect(content).toContain('X-Frame-Options: DENY');
    expect(content).toContain('Strict-Transport-Security');
    expect(content).toContain('Referrer-Policy: strict-origin-when-cross-origin');
  });

  it('provides permanent 301 redirects for legacy routes in _redirects', () => {
    const redirectsPath = path.join(publicDir, '_redirects');
    expect(fs.existsSync(redirectsPath)).toBe(true);
    const content = fs.readFileSync(redirectsPath, 'utf8');

    expect(content).toContain('/guide /installation 301');
    expect(content).toContain('/whats-new /updates 301');
    expect(content).toContain('/features /#features 301');
    expect(content).toContain('/* /index.html 200');
  });
});
