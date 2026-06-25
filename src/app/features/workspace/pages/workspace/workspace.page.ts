import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';

import { WorkspaceHeaderComponent } from '../../components/workspace-header/workspace-header.component';
import { WorkspaceTabsComponent } from '../../components/workspace-tabs/workspace-tabs.component';
import { ChatPanelComponent } from '../../components/chat-panel/chat-panel.component';
import { QuizPanelComponent } from '../../components/quiz-panel/quiz-panel.component';
import { SummaryPanelComponent } from '../../components/summary-panel/summary-panel.component';

import { WorkspaceTab } from '../../models/workspace.models';
import { documents, summary, quiz, workspaceTabs } from '../../models/workspace.mock';

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

  private readonly params = toSignal(this.route.paramMap, {
    initialValue: this.route.snapshot.paramMap,
  });

  readonly doc = computed(
    () => documents.find((d) => d.id === this.params().get('id')) ?? documents[0]
  );

  readonly activeTab = signal<WorkspaceTab>('chat');
  readonly tabs = workspaceTabs;

  readonly quiz = quiz;
  readonly summary = summary;

  setTab(tab: WorkspaceTab): void {
    this.activeTab.set(tab);
  }
}