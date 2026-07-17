import { PlanTier } from "./subscription.models";

export interface Plan { 
    name: PlanTier|string; 
    price: string; 
    blurb: string; 
    cta: string; 
    features: string[];
    highlight?: boolean;
 }
 export type PricingMatrix = string[][];