// src/actions/authActions.ts
import { LOGIN_SUCCESS, LOGOUT } from '../types/auth';

export const loginSuccess = (userId: number) => ({
    type: LOGIN_SUCCESS,
    payload: userId
});

export const logout = () => ({
    type: LOGOUT
});
