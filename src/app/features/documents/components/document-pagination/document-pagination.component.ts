import { Component, computed, EventEmitter, input, OnInit, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-document-pagination',
  imports: [TranslatePipe],
  templateUrl: './document-pagination.component.html',

})
export class DocumentPaginationComponent {

  readonly page = input.required<number>();
  readonly pageSize = input<number>(8);
  readonly total = input.required<number>();
  @Output() pageChange = new EventEmitter<number>();

  readonly totalPages = computed(() => Math.max(1, Math.ceil(this.total() / this.pageSize())));
  readonly from = computed(() => (this.total() === 0 ? 0 : (this.page() - 1) * this.pageSize() + 1));
  readonly to = computed(() => Math.min(this.page() * this.pageSize(), this.total()));
  readonly pages = computed(() => Array.from({ length: this.totalPages() }, (_, i) => i + 1));

  go(p: number) {
    if (p < 1 || p > this.totalPages() || p === this.page()) return;
    this.pageChange.emit(p);
  }

}
