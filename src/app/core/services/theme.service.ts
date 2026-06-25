import {Injectable,computed,inject,signal} from '@angular/core';

import { DOCUMENT } from '@angular/common';

import { STORAGE_KEYS } from '../constants/storage-keys';
import { Theme } from '../types/theme.type';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {

  private readonly document = inject(DOCUMENT);

  private readonly _theme = signal<Theme>('light');

  readonly theme = this._theme.asReadonly();
  readonly isDark = computed(() => this._theme() === 'dark');

  constructor() {
    this.initializeTheme();
  }

  toggle(): void {
    this.setTheme(this.isDark() ? 'light' : 'dark');
  }

  setTheme(theme: Theme): void {
    this._theme.set(theme);
    this.document.documentElement.classList.toggle('dark', theme === 'dark');

    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEYS.theme, theme);
    }
  }

  private initializeTheme(): void {
    if (typeof window === 'undefined') {
      return;
    }

    const storedTheme = localStorage.getItem(STORAGE_KEYS.theme);

    const theme: Theme =
      storedTheme === 'light' || storedTheme === 'dark'
        ? storedTheme
        : window.matchMedia('(prefers-color-scheme: dark)').matches
          ? 'dark'
          : 'light';

    this.setTheme(theme);
  }

}