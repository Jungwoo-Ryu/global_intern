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
    async login(username: string, password: string) {
        try {
            const response = await axios.post(`${API_URL}/login`, {
                username,
                password
            });

            // 서버에서 Member 객체를 반환한다고 가정
            return {
                success: true,
                data: response.data // Member 객체가 포함된 응답
            };
        } catch (error) {
            return {
                success: false,
                data: null
            };
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
