import type { Direction, Language } from '../../types/language.type';

export const languageFeatureKey = 'language';

export interface LanguageState {
  current: Language;
  direction: Direction;
  initialized: boolean;
}

export const initialLanguageState: LanguageState = {
  current: 'en',
  direction: 'ltr',
  initialized: false,
};