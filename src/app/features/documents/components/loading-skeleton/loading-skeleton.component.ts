import { Component, input, OnInit } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-loading-skeleton',
  templateUrl: './loading-skeleton.component.html',
})
export class LoadingSkeletonComponent {

   readonly count = input<number>(8);
  range() { return Array.from({ length: this.count() }, (_, i) => i); }

}
