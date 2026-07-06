import { Injectable, signal } from '@angular/core';
import { Plan, PricingMatrix } from '../models/pricing.models';

@Injectable({
  providedIn: 'root',
})
export class PricingMockService {

  readonly plans = signal<Plan[]>([
    {
      name: 'pricing.plans.free.name',
      price: '$0',
      blurb: 'pricing.plans.free.blurb',
      cta: 'pricing.plans.free.cta',
      features: [
        'pricing.plans.free.features.documents',
        'pricing.plans.free.features.pages',
        'pricing.plans.free.features.chat',
        'pricing.plans.free.features.quiz',
        'pricing.plans.free.features.support',
      ],
    },
    {
      name: 'pricing.plans.pro.name',
      price: '$9',
      blurb: 'pricing.plans.pro.blurb',
      cta: 'pricing.plans.pro.cta',
      highlight: true,
      features: [
        'pricing.plans.pro.features.documents',
        'pricing.plans.pro.features.pages',
        'pricing.plans.pro.features.chat',
        'pricing.plans.pro.features.priority',
        'pricing.plans.pro.features.export',
        'pricing.plans.pro.features.support',
      ],
    },
    {
      name: 'pricing.plans.student.name',
      price: '$5',
      blurb: 'pricing.plans.student.blurb',
      cta: 'pricing.plans.student.cta',
      features: [
        'pricing.plans.student.features.pro',
        'pricing.plans.student.features.badge',
        'pricing.plans.student.features.groups',
        'pricing.plans.student.features.collections',
      ],
    },
  ]);

  readonly matrix = signal<PricingMatrix>([
    [
      'pricing.compare.documents',
      'pricing.compare.values.free.documents',
      'pricing.compare.values.pro.documents',
      'pricing.compare.values.student.documents',
    ],
    [
      'pricing.compare.pages',
      'pricing.compare.values.free.pages',
      'pricing.compare.values.pro.pages',
      'pricing.compare.values.student.pages',
    ],
    [
      'pricing.compare.chat',
      'pricing.common.yes',
      'pricing.common.yes',
      'pricing.common.yes',
    ],
    [
      'pricing.compare.summary',
      'pricing.common.yes',
      'pricing.common.yes',
      'pricing.common.yes',
    ],
    [
      'pricing.compare.quiz',
      'pricing.compare.values.free.quiz',
      'pricing.compare.values.pro.quiz',
      'pricing.compare.values.student.quiz',
    ],
    [
      'pricing.compare.citations',
      'pricing.common.yes',
      'pricing.common.yes',
      'pricing.common.yes',
    ],
    [
      'pricing.compare.export',
      'pricing.common.no',
      'pricing.common.yes',
      'pricing.common.yes',
    ],
    [
      'pricing.compare.priority',
      'pricing.common.no',
      'pricing.common.yes',
      'pricing.common.yes',
    ],
    [
      'pricing.compare.badgeFeature',
      'pricing.common.no',
      'pricing.common.no',
      'pricing.common.yes',
    ],
  ]);

}