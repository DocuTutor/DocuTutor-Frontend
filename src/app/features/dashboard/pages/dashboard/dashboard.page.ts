import { ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { DocumentService } from '../../../documents/services/document.service';
import { DocumentUploadResponse } from '../../../documents/interfaces/document-upload-response.interface';
import { DocumentCardModel } from '../../../documents/interfaces/document-card.interface';
import { DashboardPageMockService } from '../../services/dashboard.mock.service';

function normalizeStatus(status: string | null | undefined): DocumentCardModel['status'] {
  switch ((status ?? '').trim().toLowerCase()) {
    case 'processing':
      return 'processing';
    case 'ready':
    case 'completed':
      return 'completed';
    case 'failed':
    case 'error':
      return 'failed';
    default:
      return 'processing';
  }
}

function toRecentDocument(document: DocumentUploadResponse): DocumentCardModel {
  const status = normalizeStatus(document.status);
  const createdAt = new Date(document.createdAt);
  const extension = document.fileName.split('.').pop()?.toUpperCase() || 'FILE';

  return {
    id: document.documentId,
    userId: document.userId,
    title: document.fileName.replace(/\.[^.]+$/, ''),
    type: extension,
    createdAt: document.createdAt,
    updatedAtRaw: createdAt.toLocaleDateString(undefined, {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }),
    status,
    progress: status === 'completed' ? 100 : status === 'processing' ? 48 : 12,
    emoji: status === 'completed' ? '✅' : status === 'processing' ? '⏳' : '⚠️',
    color:
      status === 'completed'
        ? 'from-emerald-500 to-cyan-500'
        : status === 'processing'
          ? 'from-amber-500 to-orange-500'
          : 'from-rose-500 to-red-500',
    aiSummary: status === 'completed' ? 'ready' : status === 'processing' ? 'generating' : 'pending',
    quiz: status === 'completed' ? 'ready' : 'pending',
    flashcards: status === 'completed' ? 'ready' : 'pending',
  };
}

@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  imports: [RouterLink, TranslatePipe],
  templateUrl: './dashboard.page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardPage implements OnInit {
  private readonly documentService = inject(DocumentService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly mock = inject(DashboardPageMockService);

  readonly loadingRecentDocuments = signal(true);
  readonly recentDocuments = signal<DocumentCardModel[]>([]);

  readonly stats = this.mock.stats;
  readonly quickActions = this.mock.quickActions;
  readonly bars = this.mock.bars;
  readonly days = this.mock.days;
  readonly tip = this.mock.tip;

  ngOnInit(): void {
    this.documentService.getUserDocuments().pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (documents) => {
        this.recentDocuments.set(documents.slice(0, 3).map(toRecentDocument));
        this.loadingRecentDocuments.set(false);
      },
      error: () => {
        this.recentDocuments.set([]);
        this.loadingRecentDocuments.set(false);
      },
    });
  }
}