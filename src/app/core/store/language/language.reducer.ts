import { createReducer, on } from '@ngrx/store';
import { LanguageActions } from './language.actions';
import { initialLanguageState } from './language.state';

export const languageReducer = createReducer(
  initialLanguageState,

  on(LanguageActions.initSuccess, (state, { language, direction }) => ({
    ...state,
    current: language,
    direction,
    initialized: true,
  })),

  on(LanguageActions.setLanguageSuccess, (state, { language, direction }) => ({
    ...state,
    current: language,
    direction,
    initialized: true,
  })),
);