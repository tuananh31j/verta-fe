import { combineReducers } from '@reduxjs/toolkit';
import theme from '~/store/slice/themeSlice';
import authReducer from './slice/authSlice';
import cartSlice from './slice/cartSlice';
import filetSlice from './slice/filterSlice';

const rootReducer = combineReducers({
    theme,
    auth: authReducer,
    cart: cartSlice.reducer,
    filter: filetSlice,
});

export default rootReducer;
