import { combineReducers } from '@reduxjs/toolkit';
import theme from '~/store/slice/themeSlice';
import authReducer from './slice/authSlice';

const rootReducer = combineReducers({
    theme,
    auth: authReducer,
});

export default rootReducer;
