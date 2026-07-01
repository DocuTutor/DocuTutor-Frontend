export type PlanTier = 'Free' | 'Pro' | 'StudentPlus';

export interface PlanDto {
  tier: PlanTier;
  name: string;
  price: number;
  interval: string;
  highlight: boolean;
  features: string[];
}

export type SubscriptionStatusValue =
  | 'Active'
  | 'PastDue'
  | 'Canceled'
  | 'Incomplete'
  | 'Trialing'
  | 'Unpaid';

export interface SubscriptionDto {
  plan: PlanTier;
  status: SubscriptionStatusValue;
  currentPeriodEnd: string | null;
  cancelAtPeriodEnd: boolean;
}

export interface CheckoutSessionResponse {
  checkoutUrl: string;
}

export interface PortalSessionResponse {
  portalUrl: string;
}
