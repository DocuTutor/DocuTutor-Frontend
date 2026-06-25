import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

interface StatCard {
  k: string;
  v: string;
  d: string;
  tone: string;
}

interface DocumentCard {
  id: string;
  title: string;
  type: string;
  pages: number;
  size: string;
  updatedAt: string;
  progress: number;
  emoji: string;
  color: string;
}

@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './dashboard.page.html',
  styleUrl: './dashboard.page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardPage {
  readonly stats: StatCard[] = [
    { k: 'Documents', v: '12', d: '+3 this week', tone: 'bg-brand-deep text-white' },
    { k: 'Study minutes', v: '284', d: '+42 vs last week', tone: 'bg-card text-foreground border border-border' },
    { k: 'Quiz accuracy', v: '87%', d: 'Personal best 🎉', tone: 'bg-card text-foreground border border-border' },
    { k: 'Streak', v: '9 days', d: 'Keep it going!', tone: 'bg-warning text-warning-foreground' },
  ];

  readonly quick: [string, string][] = [
    ['💬', 'Continue last chat'],
    ['🧪', 'Take a 5-question quiz'],
    ['📝', 'Re-summarize neural-nets.pdf'],
  ];

  readonly docs: DocumentCard[] = [
    {
      id: 'neural-networks',
      title: 'Neural Networks Fundamentals',
      type: 'PDF',
      pages: 42,
      size: '2.4 MB',
      updatedAt: '2h ago',
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
      updatedAt: 'Yesterday',
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
      updatedAt: '3d ago',
      progress: 85,
      emoji: '📈',
      color: 'from-brand-soft to-brand-deep',
    },
  ];

  readonly bars = [35, 60, 45, 80, 55, 72, 64];
  readonly days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
}