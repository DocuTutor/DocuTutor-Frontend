import { Component, input, OnInit } from '@angular/core';
import { DocStat } from '../../interfaces/document-statistics.interface';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-document-statistics',
  imports: [TranslatePipe],
  templateUrl: './document-statistics.component.html',
})
export class DocumentStatisticsComponent  {

  readonly stats = input.required<DocStat[]>();

}
