import { useEffect, useState } from 'react';
import { siteConfig, type PricingPlan } from '../config/siteConfig';
import { api } from '../services/api';

/**
 * Starts from the approved local table and only replaces prices when the server
 * answers with a fully valid payload. A failed or unavailable request must keep
 * the static table rather than showing blanks or unapproved numbers.
 */
export const usePricingPlans = (): readonly PricingPlan[] => {
  const [plans, setPlans] = useState<readonly PricingPlan[]>(siteConfig.pricing.plans);

  useEffect(() => {
    let active = true;

    void api.pricing().then((result) => {
      if (!active || result.kind !== 'ok') return;
      const remote = new Map(result.data.plans.map((row) => [row.id, row]));
      setPlans(
        siteConfig.pricing.plans.map((plan) => {
          const row = remote.get(plan.id);
          if (!row) return plan;
          return {
            ...plan,
            prices: {
              month: row.month,
              quarter: row.quarter,
              halfYear: row.halfYear,
              year: row.year,
            },
          };
        }),
      );
    });

    return () => {
      active = false;
    };
  }, []);

  return plans;
};
