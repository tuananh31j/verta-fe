import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type CartReduxType = {
    isOpen: boolean;
    quantityInCart: number;
};

const initialState: CartReduxType = {
    isOpen: false,
    quantityInCart: 0,
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        openCart: (state) => {
            state.isOpen = true;
        },
        closeCart: (state) => {
            state.isOpen = false;
        },
        setQuantityInCart: (state, action: PayloadAction<number>) => {
            state.quantityInCart = action.payload;
        },
    },
});

export const { closeCart, openCart, setQuantityInCart } = cartSlice.actions;

export default cartSlice;
