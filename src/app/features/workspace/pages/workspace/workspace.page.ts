import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';

import { WorkspaceHeaderComponent } from '../../components/workspace-header/workspace-header.component';
import { WorkspaceTabsComponent } from '../../components/workspace-tabs/workspace-tabs.component';
import { ChatPanelComponent } from '../../components/chat-panel/chat-panel.component';
import { QuizPanelComponent } from '../../components/quiz-panel/quiz-panel.component';
import { SummaryPanelComponent } from '../../components/summary-panel/summary-panel.component';

import { WorkspaceDocument, WorkspaceTab } from '../../models/workspace.models';
import { summary, quiz, workspaceTabs } from '../../models/workspace.mock';
import { DocumentService } from '../../../documents/services/document.service';
import { DocumentUploadResponse } from '../../../documents/interfaces/document-upload-response.interface';

const EMPTY_DOCUMENT: WorkspaceDocument = {
  id: '',
  title: 'No document yet',
  type: 'FILE',
  pages: 0,
  size: '',
  updatedAt: '',
  progress: 0,
  emoji: '📄',
  color: 'from-brand-deep to-brand',
};

function toWorkspaceDocument(doc: DocumentUploadResponse): WorkspaceDocument {
  const status = (doc.status ?? '').trim().toLowerCase();
  const isReady = status === 'ready' || status === 'completed';
  const extension = doc.fileName.split('.').pop()?.toUpperCase() || 'FILE';

  return {
    id: doc.documentId,
    title: doc.fileName.replace(/\.[^.]+$/, ''),
    type: extension,
    pages: 0,
    size: '',
    updatedAt: new Date(doc.createdAt).toLocaleDateString(undefined, {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }),
    progress: isReady ? 100 : 48,
    emoji: isReady ? '📄' : '⏳',
    color: isReady ? 'from-brand-deep to-brand' : 'from-amber-500 to-orange-500',
  };
}

@Component({
  selector: 'app-workspace-page',
  standalone: true,
  imports: [WorkspaceHeaderComponent,WorkspaceTabsComponent,ChatPanelComponent,QuizPanelComponent,SummaryPanelComponent,
  ],
  templateUrl: './workspace.page.html',
  styleUrl: './workspace.page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WorkspacePage {
  private readonly route = inject(ActivatedRoute);
  private readonly documentService = inject(DocumentService);

  private readonly params = toSignal(this.route.paramMap, {
    initialValue: this.route.snapshot.paramMap,
  });

  // Sorted newest-first so the latest upload is the fallback when the route id has no match.
  private readonly userDocuments = toSignal(
    this.documentService.getUserDocuments().pipe(
      map((docs) =>
        [...docs].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      )
    ),
    { initialValue: [] as DocumentUploadResponse[] }
  );

  readonly doc = computed<WorkspaceDocument>(() => {
    const docs = this.userDocuments();
    if (docs.length === 0) return EMPTY_DOCUMENT;

    const id = this.params().get('id');
    const match = docs.find((d) => d.documentId === id);
    return toWorkspaceDocument(match ?? docs[0]);
  });

  readonly activeTab = signal<WorkspaceTab>('chat');
  readonly tabs = workspaceTabs;

  readonly quiz = quiz;
  readonly summary = summary;

  setTab(tab: WorkspaceTab): void {
    this.activeTab.set(tab);
  }
}