// src/reducers/authReducer.ts
import { LOGIN_SUCCESS, LOGOUT, type AuthActionTypes, type AuthState } from '../types/auth';

// 초기 상태 - Redux 상태만 사용
const initialState: AuthState = {
    userId: null,
    isAuthenticated: false
};

const authReducer = (state = initialState, action: AuthActionTypes): AuthState => {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return {
                userId: action.payload,
                isAuthenticated: true
            };
        case LOGOUT:
            return {
                userId: null,
                isAuthenticated: false
            };
        default:
            return state;
    }
};

export default authReducer;
