import { Pipe, PipeTransform, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectCurrentLanguage } from '../../core/store/language/language.selectors';

@Pipe({
  name: 'localizedDate',
  standalone: true,
  pure: false,
})
export class LocalizedDatePipe implements PipeTransform {
  private readonly store = inject(Store);
  private readonly currentLanguage = this.store.selectSignal(selectCurrentLanguage);

  transform(
    value: Date | string | number,
    options: Intl.DateTimeFormatOptions = { dateStyle: 'medium' }
  ): string {
    if (!value) {
      return '';
    }

    const locale = this.currentLanguage() === 'ar' ? 'ar-EG' : 'en-US';

    return new Intl.DateTimeFormat(locale, options).format(new Date(value));
  }
}