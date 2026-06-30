import { createFeatureSelector, createSelector } from '@ngrx/store';
import { languageFeatureKey, LanguageState } from './language.state';

export const selectLanguageState =
  createFeatureSelector<LanguageState>(languageFeatureKey);

export const selectCurrentLanguage = createSelector(
  selectLanguageState,
  (state) => state.current,
);

export const selectDirection = createSelector(
  selectLanguageState,
  (state) => state.direction,
);

export const selectIsRtl = createSelector(
  selectDirection,
  (direction) => direction === 'rtl',
);

export const selectLanguageInitialized = createSelector(
  selectLanguageState,
  (state) => state.initialized,
);