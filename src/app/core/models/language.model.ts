import type { Direction, Language } from '../types/language.type';

export interface LanguageDefinition {
  code: Language;
  label: string;
  nativeLabel: string;
  direction: Direction;
  flag: string;
}
