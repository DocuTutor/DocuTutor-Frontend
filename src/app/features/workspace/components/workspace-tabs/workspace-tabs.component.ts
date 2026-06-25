import { Component, input, OnInit, output } from '@angular/core';
import { WorkspaceTabOption, WorkspaceTab } from '../../models/workspace.models';

@Component({
  selector: 'app-workspace-tabs',
  templateUrl: './workspace-tabs.component.html',
  styleUrls: ['./workspace-tabs.component.css']
})
export class WorkspaceTabsComponent  {

  readonly tabs = input.required<WorkspaceTabOption[]>();
  readonly activeTab = input.required<WorkspaceTab>();

  readonly tabChange = output<WorkspaceTab>();
  }


