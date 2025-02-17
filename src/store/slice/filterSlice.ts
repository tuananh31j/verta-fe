import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Params } from '~/types/Api';

const initialState: { query: Params; grid: string } = { query: {}, grid: '' };
const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setQuery: (state, action: PayloadAction<Params>) => {
            state.query = action.payload;
        },
        updateGrid: (state, action: PayloadAction<string>) => {
            state.grid = action.payload;
        },
    },
});

export const { setQuery, updateGrid } = filterSlice.actions;
export default filterSlice;
