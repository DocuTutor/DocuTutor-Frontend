import { Component, input, OnInit } from '@angular/core';
import { SummaryData } from '../../models/workspace.models';

@Component({
  selector: 'app-summary-panel',
  templateUrl: './summary-panel.component.html',
  styleUrls: ['./summary-panel.component.css']
})
export class SummaryPanelComponent {

  readonly summary = input.required<SummaryData>();

}
