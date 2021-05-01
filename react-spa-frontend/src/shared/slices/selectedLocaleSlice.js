import { createSlice } from '@reduxjs/toolkit';
import localStorageKeys from '../constants/localStorageKeys';
import locales from "../locales/locales";

const initialState = {
    value: localStorage.getItem(localStorageKeys.LOCALE) || locales.EN,
};

export const selectedLocaleSlice = createSlice({
    name: 'selectedLocale',
    initialState,
    reducers: {
      setLocale: (state, action) => {
        localStorage.setItem(localStorageKeys.LOCALE, action.payload)
        state.value = action.payload;
      },
    },
});

export const { setLocale } = selectedLocaleSlice.actions;

export const selectLocale = (state) => state.selectedLocale.value;

export default selectedLocaleSlice.reducer;