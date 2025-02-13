import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const savedDarkMode = localStorage.getItem('dark');
const initialState = savedDarkMode ? JSON.parse(savedDarkMode) : false;
const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        darkMode: (state, action: PayloadAction<boolean>) => {
            state = action.payload;
        },
    },
});

export const themeActions = themeSlice.actions;
export default themeSlice.reducer;
