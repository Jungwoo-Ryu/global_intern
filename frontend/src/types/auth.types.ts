// src/types/auth.types.ts
export interface LoginRequest {
    username: string;
    password: string;
}

export interface LoginResponse {
    accessToken: string;
    refreshToken?: string;
    user: {
        id: number;
        username: string;
        name: string;
        email: string;
        role: 'MEMBER' | 'ADMIN' | 'ROOT_ADMIN';
    };
}

export interface AuthUser {
    id: number;
    username: string;
    name: string;
    email: string;
    role: 'MEMBER' | 'ADMIN' | 'ROOT_ADMIN';
}
