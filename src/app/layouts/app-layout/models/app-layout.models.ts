export interface Feature {
  tagKey: string;
  titleKey: string;
  descKey: string;
  img: string;
  bulletKeys: string[];
}

import { PlanTier } from '../../../features/subscription/models/subscription.models';

export interface PricingMini {
  tier: PlanTier;
  tierKey: string;
  price: string;
  descKey: string;
  itemKeys: string[];
  highlight?: boolean;
}

export interface StepItem {
  n: string;
  titleKey: string;
  descKey: string;
  i: string;
}


export interface StatItem {
  k: string;
  labelKey: string;
  descKey: string;
}

export interface TestimonialItem {
  nameKey: string;
  roleKey: string;
  img: string;
  quoteKey: string;
}

export interface FaqItem {
  qKey: string;
  aKey: string;
}

export interface DrawerLink { 
  key: string; 
  href: string; 
}
export interface NavLink {
  labelKey: string;
  fragment: string;
}