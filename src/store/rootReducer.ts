import { combineReducers } from '@reduxjs/toolkit';
import theme from '~/store/slice/themeSlice';
import authReducer from './slice/authSlice';
import filterSlice from '~/store/slice/filterSlice';

const rootReducer = combineReducers({
    theme,
    auth: authReducer,
    filter: filterSlice.reducer,
});

export default rootReducer;
