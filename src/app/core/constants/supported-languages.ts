import type { LanguageDefinition } from '../models/language.model';
import type { Language } from '../types/language.type';

export const DEFAULT_LANGUAGE: Language = 'en';
export const STORAGE_KEY = 'docututor.language';

export const SUPPORTED_LANGUAGES: readonly LanguageDefinition[] = [
  {
    code: 'en',
    label: 'English',
    nativeLabel: 'English',
    direction: 'ltr',
    flag: '🇺🇸',
  },
  {
    code: 'ar',
    label: 'Arabic',
    nativeLabel: 'العربية',
    direction: 'rtl',
    flag: '🇸🇦',
  },
] as const;