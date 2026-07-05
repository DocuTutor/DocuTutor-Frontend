import { ChangeDetectionStrategy, Component, EventEmitter, HostListener, input, OnInit, Output, signal } from '@angular/core';
import { DocAction, DocStatus } from '../../types/document.type';
import { DocumentCardModel } from '../../interfaces/document-card.interface';
import { TranslatePipe } from '@ngx-translate/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-document-card',
  templateUrl: './document-card.component.html',
  imports: [TranslatePipe,RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocumentCardComponent {

  readonly doc = input.required<DocumentCardModel>();
  @Output() action = new EventEmitter<{ id: string; action: DocAction }>();

  readonly menuOpen = signal(false);
  readonly actions: DocAction[] = ["open", "preview", "rename", "download", "delete"];

  toggleMenu(e: Event) {
    e.stopPropagation();
    this.menuOpen.update((v) => !v);
  }

  pick(a: DocAction, e: Event) {
    e.stopPropagation();
    this.menuOpen.set(false);
    this.action.emit({ id: this.doc().id, action: a });
  }

  @HostListener("document:click")
  onDocClick() {
    if (this.menuOpen()) this.menuOpen.set(false);
  }

  statusClass(s: DocStatus) {
    switch (s) {
      case "completed": return "bg-brand-soft text-brand-deep";
      case "processing": return "bg-warning/25 text-warning-foreground";
      case "failed": return "bg-destructive/15 text-destructive";
    }
  }

  dot(s: "ready" | "generating" | "pending") {
    switch (s) {
      case "ready": return "bg-brand";
      case "generating": return "bg-warning";
      case "pending": return "bg-muted-foreground/40";
    }
  }

}
