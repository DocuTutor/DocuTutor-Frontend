export interface Plan { 
    name: string; 
    price: string; 
    blurb: string; 
    cta: string; 
    features: string[];
    highlight?: boolean;
 }
 export type PricingMatrix = string[][];