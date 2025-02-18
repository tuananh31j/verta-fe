import { combineReducers } from '@reduxjs/toolkit';
import theme from '~/store/slice/themeSlice';
import authReducer from './slice/authSlice';
import cartSlice from './slice/cartSlice';

const rootReducer = combineReducers({
    theme,
    auth: authReducer,
    cart: cartSlice.reducer,
});

export default rootReducer;
