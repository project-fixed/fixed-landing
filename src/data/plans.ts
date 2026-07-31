export type PlanId = 'starter' | 'pro' | 'elite';

export interface Plan {
  id: PlanId;
  monthlyPrice: number;
  annualPrice: number | null;
  currency: string;
  isPopular: boolean;
}

export const plans: Plan[] = [
  {
    id: 'starter',
    monthlyPrice: 0,
    annualPrice: null,
    currency: 'USD',
    isPopular: false,
  },
  {
    id: 'pro',
    monthlyPrice: 24.99,
    annualPrice: 16.99,
    currency: 'USD',
    isPopular: true,
  },
  {
    id: 'elite',
    monthlyPrice: 59.99,
    annualPrice: 39.99,
    currency: 'USD',
    isPopular: false,
  },
];
