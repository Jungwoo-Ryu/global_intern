// src/services/authService.ts
import axios from 'axios';

// 타입 정의
export interface LoginRequest {
    username: string;
    password: string;
}

export interface LoginResponse {
    user: {
        id: number;
        username: string;
        name: string;
        email: string;
    };
}

export interface AuthUser {
    id: number;
    username: string;
    name: string;
    email: string;
}

const API_URL = '/api/auth';

// 사용자 정보 관리
const userManager = {
    setUser: (user: AuthUser) => {
        localStorage.setItem('user', JSON.stringify(user));
    },

    getUser: (): AuthUser | null => {
        const user = localStorage.getItem('user');
        return user ? JSON.parse(user) : null;
    },

    removeUser: () => {
        localStorage.removeItem('user');
    }
};

// 인증 서비스
const authService = {
    // 로그인
    login: async (username: string, password: string) => {
        const requestBody = {
            username: username,
            password: password,
        }
        const response = await axios.post(`${API_URL}/login`, requestBody);
        const { status } = response;
        if (status === 200){
            debugger
            localStorage.setItem('session', response.data)
            return true;
        } else {
            return false;
        }
    },

    // 로그아웃
    logout: (): void => {
        userManager.removeUser();
    },

    // 로그인 상태 확인
    isAuthenticated: (): boolean => {
        const user = userManager.getUser();
        return !!user;
    },

    // 현재 사용자 정보 가져오기
    getUser: (): AuthUser | null => {
        return userManager.getUser();
    }
};

export default authService;
