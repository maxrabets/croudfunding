import { configureStore } from '@reduxjs/toolkit';
import selectedLocaleReducer from '../shared/slices/selectedLocaleSlice';
import themeReducer from '../shared/slices/themeSlice';

export const store = configureStore({
  reducer: {
    selectedLocale: selectedLocaleReducer,
    theme: themeReducer,
  },
});