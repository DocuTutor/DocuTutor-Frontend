import { Injectable } from '@angular/core';
import { Feature, PricingMini } from './models/app-layout.models';

@Injectable({
  providedIn: 'root'
})
export class AppLayoutMockService {
  readonly avatars = ['avatar-1.png', 'avatar-2.png', 'avatar-3.png'];
  readonly unis = ['STANFORD', 'MIT', 'OXFORD', 'ETH ZÜRICH', 'NUS', 'UC BERKELEY'];

  readonly steps = [
    { n: '01', titleKey: 'landing.steps.upload.title', descKey: 'landing.steps.upload.desc', i: '📎' },
    { n: '02', titleKey: 'landing.steps.process.title', descKey: 'landing.steps.process.desc', i: '✨' },
    { n: '03', titleKey: 'landing.steps.study.title', descKey: 'landing.steps.study.desc', i: '🎓' },
    { n: '04', titleKey: 'landing.steps.master.title', descKey: 'landing.steps.master.desc', i: '🏆' },
  ];

  readonly features: Feature[] = [
    {
      tagKey: 'landing.featureCards.chat.tag',
      titleKey: 'landing.featureCards.chat.title',
      descKey: 'landing.featureCards.chat.desc',
      img: 'feature-chat.png',
      bulletKeys: [
        'landing.featureCards.chat.bullets.0',
        'landing.featureCards.chat.bullets.1',
        'landing.featureCards.chat.bullets.2',
      ],
    },
    {
      tagKey: 'landing.featureCards.quiz.tag',
      titleKey: 'landing.featureCards.quiz.title',
      descKey: 'landing.featureCards.quiz.desc',
      img: 'feature-quiz.png',
      bulletKeys: [
        'landing.featureCards.quiz.bullets.0',
        'landing.featureCards.quiz.bullets.1',
        'landing.featureCards.quiz.bullets.2',
      ],
    },
    {
      tagKey: 'landing.featureCards.summary.tag',
      titleKey: 'landing.featureCards.summary.title',
      descKey: 'landing.featureCards.summary.desc',
      img: 'feature-summary.png',
      bulletKeys: [
        'landing.featureCards.summary.bullets.0',
        'landing.featureCards.summary.bullets.1',
        'landing.featureCards.summary.bullets.2',
      ],
    },
  ];

  readonly stats = [
    { k: '3.2×', labelKey: 'landing.stats.0.label', descKey: 'landing.stats.0.desc' },
    { k: '84%', labelKey: 'landing.stats.1.label', descKey: 'landing.stats.1.desc' },
    { k: '12k+', labelKey: 'landing.stats.2.label', descKey: 'landing.stats.2.desc' },
    { k: '4.9★', labelKey: 'landing.stats.3.label', descKey: 'landing.stats.3.desc' },
  ];

  readonly testimonials = [
    {
      nameKey: 'landing.testimonials.0.name',
      roleKey: 'landing.testimonials.0.role',
      img: 'avatar-1.png',
      quoteKey: 'landing.testimonials.0.quote',
    },
    {
      nameKey: 'landing.testimonials.1.name',
      roleKey: 'landing.testimonials.1.role',
      img: 'avatar-2.png',
      quoteKey: 'landing.testimonials.1.quote',
    },
    {
      nameKey: 'landing.testimonials.2.name',
      roleKey: 'landing.testimonials.2.role',
      img: 'avatar-3.png',
      quoteKey: 'landing.testimonials.2.quote',
    },
  ];

  readonly miniPricing: PricingMini[] = [
    {
      tierKey: 'landing.pricing.free.tier',
      price: '\$0',
      descKey: 'landing.pricing.free.desc',
      itemKeys: [
        'landing.pricing.free.items.0',
        'landing.pricing.free.items.1',
        'landing.pricing.free.items.2',
      ],
    },
    {
      tierKey: 'landing.pricing.pro.tier',
      price: '\$9',
      highlight: true,
      descKey: 'landing.pricing.pro.desc',
      itemKeys: [
        'landing.pricing.pro.items.0',
        'landing.pricing.pro.items.1',
        'landing.pricing.pro.items.2',
        'landing.pricing.pro.items.3',
      ],
    },
    {
      tierKey: 'landing.pricing.student.tier',
      price: '\$5',
      descKey: 'landing.pricing.student.desc',
      itemKeys: [
        'landing.pricing.student.items.0',
        'landing.pricing.student.items.1',
        'landing.pricing.student.items.2',
      ],
    },
  ];

  readonly faqKeys = [
    { qKey: 'landing.faq.0.q', aKey: 'landing.faq.0.a' },
    { qKey: 'landing.faq.1.q', aKey: 'landing.faq.1.a' },
    { qKey: 'landing.faq.2.q', aKey: 'landing.faq.2.a' },
    { qKey: 'landing.faq.3.q', aKey: 'landing.faq.3.a' },
    { qKey: 'landing.faq.4.q', aKey: 'landing.faq.4.a' },
  ];
}