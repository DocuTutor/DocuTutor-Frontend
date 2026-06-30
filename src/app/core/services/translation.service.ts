import { Injectable, inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class TranslationService {
  private readonly translate = inject(TranslateService);

  instant(key: string, params?: Record<string, unknown>): string {
    return this.translate.instant(key, params);
  }

  stream(key: string, params?: Record<string, unknown>) {
    return this.translate.stream(key, params);
  }
}