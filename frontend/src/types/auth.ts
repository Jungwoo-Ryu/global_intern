// src/types/auth.ts
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGOUT = 'LOGOUT';

// 간단한 인증 상태 - ID만 저장
export interface AuthState {
    userId: number | null;
    isAuthenticated: boolean;
}

interface LoginSuccessAction {
    type: typeof LOGIN_SUCCESS;
    payload: number; // member.id만 저장
}

interface LogoutAction {
    type: typeof LOGOUT;
}

// 누락된 부분 - AuthActionTypes 추가
export type AuthActionTypes = LoginSuccessAction | LogoutAction;
