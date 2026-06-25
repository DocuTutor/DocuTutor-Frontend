import { Component, input, OnInit } from '@angular/core';
import { WorkspaceDocument } from '../../models/workspace.models';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-workspace-header',
  imports: [RouterLink],
  templateUrl: './workspace-header.component.html',
  styleUrls: ['./workspace-header.component.css']
})
export class WorkspaceHeaderComponent {

 readonly doc = input.required<WorkspaceDocument>();

}
