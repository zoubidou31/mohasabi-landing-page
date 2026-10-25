import { describe, expect, it } from 'vitest';
import { releases, formatBytes } from '../content/releases';
import { siteConfig } from '../config/siteConfig';

describe('Software Releases & Integrity', () => {
  it('lists verified published releases: v1.0.3 and v1.0.2', () => {
    const versions = releases.map((r) => r.version);
    expect(versions).toEqual(['1.0.3', '1.0.2']);
  });

  it('verifies v1.0.3 matches official release specifications', () => {
    const latest = releases[0];
    expect(latest.version).toBe('1.0.3');
    expect(latest.tag).toBe('v1.0.3');
    expect(latest.publishedAt).toBe('2026-10-19');
    expect(latest.assetName).toBe('Mohasabi_Setup_v1.0.3.exe');
    expect(latest.assetSizeBytes).toBe(314248129);
    expect(latest.sha256).toBe(
      '37EF66E129173094D522761876DD94E4535EB776134E64D6A394AEB1AE3BCE05'
    );
    expect(latest.downloadUrl).toContain('Mohasabi_Setup_v1.0.3.exe');
  });

  it('matches siteConfig release with latest published release', () => {
    expect(siteConfig.release.version).toBe('v1.0.3');
    expect(siteConfig.release.setupAssetName).toBe('Mohasabi_Setup_v1.0.3.exe');
    expect(siteConfig.release.publishedAt).toBe('2026-10-19');
    expect(siteConfig.release.setupUrl).toContain('Mohasabi_Setup_v1.0.3.exe');
  });

  it('has valid 64-character SHA-256 fingerprints for all releases', () => {
    for (const release of releases) {
      expect(release.sha256).toMatch(/^[A-F0-9]{64}$/);
    }
  });

  it('provides complete release notes in all 3 languages without blanks', () => {
    for (const release of releases) {
      for (const loc of ['ar', 'fr', 'en'] as const) {
        const notes = release.notes[loc];
        expect(notes.headline).toBeTruthy();
        expect(notes.summary).toBeTruthy();
        expect(Array.isArray(notes.added)).toBe(true);
        expect(Array.isArray(notes.improved)).toBe(true);
        expect(Array.isArray(notes.fixed)).toBe(true);
      }
    }
  });

  it('formats byte sizes into readable units', () => {
    expect(formatBytes(314248129, 'en')).toContain('MiB');
    expect(formatBytes(314248129, 'fr')).toContain('MiB');
    expect(formatBytes(314248129, 'ar')).toContain('MiB');
  });
});
