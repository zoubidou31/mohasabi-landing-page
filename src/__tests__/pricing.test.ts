import { describe, expect, it } from 'vitest';
import {
  siteConfig,
  formatAmount,
  buildPlanWhatsAppUrl,
  buildMailtoPlanUrl,
} from '../config/siteConfig';

describe('Pricing & Commercial Accuracy', () => {
  const { plans, durations, currency } = siteConfig.pricing;

  it('uses Algerian Dinar (DZD) as official currency', () => {
    expect(currency).toBe('DZD');
  });

  it('has exactly the 3 approved tiers: Standard, Pro, Enterprise', () => {
    const planIds = plans.map((p) => p.id);
    expect(planIds).toEqual(['standard', 'pro', 'enterprise']);
  });

  it('has exactly the 4 approved durations: 1, 3, 6, 12 months', () => {
    const durationIds = durations.map((d) => d.id);
    expect(durationIds).toEqual(['month', 'quarter', 'halfYear', 'year']);
    expect(durations.map((d) => d.months)).toEqual([1, 3, 6, 12]);
  });

  it('strictly matches approved Standard prices: 1,500 / 3,500 / 6,500 / 12,000 DZD', () => {
    const standard = plans.find((p) => p.id === 'standard')!;
    expect(standard.prices).toEqual({
      month: 1500,
      quarter: 3500,
      halfYear: 6500,
      year: 12000,
    });
    expect(standard.recommended).toBe(false);
    expect(standard.accent).toBe('#1b5e20');
  });

  it('strictly matches approved Pro prices: 3,000 / 7,500 / 13,500 / 25,000 DZD', () => {
    const pro = plans.find((p) => p.id === 'pro')!;
    expect(pro.prices).toEqual({
      month: 3000,
      quarter: 7500,
      halfYear: 13500,
      year: 25000,
    });
    expect(pro.recommended).toBe(true);
    expect(pro.accent).toBe('#1976d2');
  });

  it('strictly matches approved Enterprise prices: 5,500 / 13,000 / 24,000 / 45,000 DZD', () => {
    const ent = plans.find((p) => p.id === 'enterprise')!;
    expect(ent.prices).toEqual({
      month: 5500,
      quarter: 13000,
      halfYear: 24000,
      year: 45000,
    });
    expect(ent.recommended).toBe(false);
    expect(ent.accent).toBe('#512da8');
  });

  it('formats amounts with non-breaking spaces for professional readability', () => {
    expect(formatAmount(1500)).toBe('1\u202f500');
    expect(formatAmount(12000)).toBe('12\u202f000');
    expect(formatAmount(45000)).toBe('45\u202f000');
  });

  it('generates WhatsApp plan request URLs correctly without fake checkout', () => {
    const url = buildPlanWhatsAppUrl('Standard', '1 month', '1 500 DZD', 'Hello');
    expect(url).toContain('https://wa.me/213674947157');
    expect(url).toContain(encodeURIComponent('Standard — 1 month — 1 500 DZD'));
  });

  it('generates email plan request URLs with official recipient mohzoubid@gmail.com', () => {
    const url = buildMailtoPlanUrl('Pro', '1 year', '25 000 DZD', 'Order Pro', 'Greetings');
    expect(url).toContain('mailto:mohzoubid@gmail.com');
    expect(url).toContain(encodeURIComponent('Order Pro'));
    expect(url).toContain(encodeURIComponent('Pro — 1 year — 25 000 DZD'));
  });
});
