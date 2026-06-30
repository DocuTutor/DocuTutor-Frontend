import { Injectable } from '@angular/core';
import {DashboardDocumentCard,DashboardQuickAction,DashboardStatCard,DashboardTipCard,} from '../models/dashboard.models';

@Injectable({
  providedIn: 'root',
})
export class DashboardPageMockService {
  readonly stats: DashboardStatCard[] = [
    {
      keyLabel: 'dashboard.stats.documents.label',
      value: '12',
      keyDescription: 'dashboard.stats.documents.desc',
      tone: 'bg-brand-deep text-white',
    },
    {
      keyLabel: 'dashboard.stats.studyMinutes.label',
      value: '284',
      keyDescription: 'dashboard.stats.studyMinutes.desc',
      tone: 'bg-card text-foreground border border-border',
    },
    {
      keyLabel: 'dashboard.stats.quizAccuracy.label',
      value: '87%',
      keyDescription: 'dashboard.stats.quizAccuracy.desc',
      tone: 'bg-card text-foreground border border-border',
    },
    {
      keyLabel: 'dashboard.stats.streak.label',
      value: '9 days',
      keyDescription: 'dashboard.stats.streak.desc',
      tone: 'bg-warning text-warning-foreground',
    },
  ];

  readonly quickActions: DashboardQuickAction[] = [
    { icon: '💬', keyLabel: 'dashboard.quickActionItems.continueChat' },
    { icon: '🧪', keyLabel: 'dashboard.quickActionItems.takeQuiz' },
    { icon: '📝', keyLabel: 'dashboard.quickActionItems.resummarize' },
  ];

  readonly documents: DashboardDocumentCard[] = [
    {
      id: 'neural-networks',
      title: 'Neural Networks Fundamentals',
      type: 'PDF',
      pages: 42,
      size: '2.4 MB',
      updatedAtKey: 'dashboard.documentDates.twoHoursAgo',
      progress: 68,
      emoji: '🧠',
      color: 'from-brand-deep to-brand',
    },
    {
      id: 'biology-notes',
      title: 'Biology Midterm Notes',
      type: 'PDF',
      pages: 28,
      size: '1.8 MB',
      updatedAtKey: 'dashboard.documentDates.yesterday',
      progress: 42,
      emoji: '🧪',
      color: 'from-brand to-brand-soft',
    },
    {
      id: 'history-outline',
      title: 'History Essay Outline',
      type: 'DOCX',
      pages: 16,
      size: '680 KB',
      updatedAtKey: 'dashboard.documentDates.threeDaysAgo',
      progress: 85,
      emoji: '📈',
      color: 'from-brand-soft to-brand-deep',
    },
  ];

  readonly bars = [35, 60, 45, 80, 55, 72, 64];

  readonly days = [
    'dashboard.days.mon',
    'dashboard.days.tue',
    'dashboard.days.wed',
    'dashboard.days.thu',
    'dashboard.days.fri',
    'dashboard.days.sat',
    'dashboard.days.sun',
  ];

  readonly tip: DashboardTipCard = {
    keyEyebrow: 'dashboard.tip.eyebrow',
    keyTitle: 'dashboard.tip.title',
    keyButton: 'dashboard.tip.button',
  };
}