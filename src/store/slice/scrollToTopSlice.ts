import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type ScrollToTop = {
    scrollType: 'toTop' | 'reviews';
};

const initialState: ScrollToTop = {
    scrollType: 'toTop',
};

const scollToTop = createSlice({
    name: 'scrollToTop',
    initialState,
    reducers: {
        setScrollTo: (state, action: PayloadAction<ScrollToTop['scrollType']>) => {
            state.scrollType = action.payload;
        },
        resetScrollTo: (state) => {
            state.scrollType = 'toTop';
        },
    },
});

export const { setScrollTo, resetScrollTo } = scollToTop.actions;

export default scollToTop;
