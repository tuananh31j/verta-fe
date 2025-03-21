import { IUser } from '~/interfaces/user';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const userStoraged = localStorage.getItem('user');
const initialState = {
    authenticate: !!userStoraged,
    user: userStoraged ? (JSON.parse(userStoraged) as IUser | null) : null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action: PayloadAction<IUser>) => {
            state.authenticate = true;
            state.user = action.payload;
            localStorage.setItem('user', JSON.stringify(action.payload));
        },
        logout: (state) => {
            state.authenticate = false;
            state.user = null;
            localStorage.removeItem('user');
            localStorage.removeItem('accessToken');
        },
    },
});

const authReducer = authSlice.reducer;
export const { login, logout } = authSlice.actions;
export default authReducer;
