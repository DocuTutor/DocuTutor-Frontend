import { createActionGroup, emptyProps, props } from '@ngrx/store';
import type { Direction, Language } from '../../types/language.type';

export const LanguageActions = createActionGroup({
  source: 'Language',
  events: {
    'Init': emptyProps(),
    'Init Success': props<{ language: Language; direction: Direction }>(),
    'Set Language': props<{ language: Language }>(),
    'Set Language Success': props<{ language: Language; direction: Direction }>(),
  },
});