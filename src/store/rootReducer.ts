import { combineReducers } from '@reduxjs/toolkit';
import theme from '~/store/slice/themeSlice';

const rootReducer = combineReducers({
    theme,
});

export default rootReducer;
