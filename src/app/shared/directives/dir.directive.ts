import { Directive, ElementRef, effect, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectDirection } from '../../core/store/language/language.selectors';

@Directive({
  selector: '[appDir]',
  standalone: true,
})
export class DirDirective {
  private readonly host = inject(ElementRef<HTMLElement>);
  private readonly store = inject(Store);
  private readonly direction = this.store.selectSignal(selectDirection);

  constructor() {
    effect(() => {
      this.host.nativeElement.setAttribute('dir', this.direction());
    });
  }
}