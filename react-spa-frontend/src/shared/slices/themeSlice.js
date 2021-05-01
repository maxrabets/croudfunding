import { createSlice } from '@reduxjs/toolkit';
import localStorageKeys from '../constants/localStorageKeys';


const initialState = {
  theme: JSON.parse(localStorage.getItem(localStorageKeys.THEME)) || 
    {
      palette: {
        type: "light"
      }
    }
};

export const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
      setTheme: (state, action) => {
        localStorage.setItem(localStorageKeys.THEME, JSON.stringify(action.payload))
        state.theme = action.payload;
      }
    },
});

export const { setTheme } = themeSlice.actions;

export const selectTheme = (state) => state.theme.theme;

export default themeSlice.reducer;