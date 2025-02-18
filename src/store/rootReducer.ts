import { combineReducers } from '@reduxjs/toolkit';
import theme from '~/store/slice/themeSlice';
import authReducer from './slice/authSlice';
import filterSlice from '~/store/slice/filterSlice';
import cartSlice from './slice/cartSlice';
import checkoutSlice from './slice/checkoutSlice';

const rootReducer = combineReducers({
    theme,
    auth: authReducer,
    cart: cartSlice.reducer,
    filter: filterSlice,
    checkOut: checkoutSlice.reducer,
});

export default rootReducer;
