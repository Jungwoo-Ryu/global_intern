// src/services/memberService.ts
import axios from "axios";

// Member 타입 정의 (백엔드 엔티티에 맞게 수정)
export interface Member {
    id: number;
    username: string;
    password?: string; // 생성/수정 시에만 사용
    name: string;
    email: string;
    phone?: string;
    gender?: string;
    birthDate?: string;
    role?: 'MEMBER' | 'ADMIN' | 'ROOT_ADMIN';
    createdAt?: string;
    updatedAt?: string;
}

// 요청/응답 타입 정의
export interface CreateMemberRequest {
    username: string;
    password: string;
    name: string;
    email: string;
    phone?: string;
    gender?: string;
    birthDate?: string;
    role?: 'MEMBER' | 'ADMIN' | 'ROOT_ADMIN';
}

export interface UpdateMemberRequest {
    name?: string;
    email?: string;
    phone?: string;
    gender?: string;
    birthDate?: string;
    role?: 'MEMBER' | 'ADMIN' | 'ROOT_ADMIN';
}

export interface MemberListResponse {
    content: Member[];
    totalElements: number;
    totalPages: number;
    size: number;
    number: number;
}

const API_URL = "/api/member"; // Vite 프록시 사용 시

// Member Service 객체
const memberService = {
    // 회원 목록 조회 (페이징)
    getMemberList: async (page: number = 0, size: number = 10): Promise<MemberListResponse> => {
        const response = await axios.get<MemberListResponse>(`${API_URL}/list`, {
            params: { page, size }
        });
        return response.data;
    },

    // 전체 회원 목록 조회 (페이징 없음)
    getAllMembers: async (): Promise<Member[]> => {
        const response = await axios.get<Member[]>(`${API_URL}/all`);
        return response.data;
    },

    // 회원 상세 조회
    getMemberById: async (id: number): Promise<Member> => {
        const response = await axios.get<Member>(`${API_URL}/${id}`);
        return response.data;
    },

    // 회원 생성
    createMember: async (memberData: CreateMemberRequest): Promise<Member> => {
        const response = await axios.post<Member>(API_URL, memberData);
        return response.data;
    },

    // 회원 정보 수정
    updateMember: async (id: number, memberData: UpdateMemberRequest): Promise<Member> => {
        const response = await axios.put<Member>(`${API_URL}/${id}`, memberData);
        return response.data;
    },

    // 회원 삭제
    deleteMember: async (id: number): Promise<void> => {
        await axios.delete(`${API_URL}/${id}`);
    },

    // 회원 다중 삭제
    deleteMembers: async (ids: number[]): Promise<void> => {
        await axios.delete(`${API_URL}/batch`, {
            data: { ids }
        });
    },

    // 회원 역할 변경 (ROOT_ADMIN 전용)
    changeMemberRole: async (id: number, role: 'MEMBER' | 'ADMIN' | 'ROOT_ADMIN'): Promise<Member> => {
        const response = await axios.patch<Member>(`${API_URL}/${id}/role`, { role });
        return response.data;
    },

    // 회원 검색
    searchMembers: async (keyword: string, page: number = 0, size: number = 10): Promise<MemberListResponse> => {
        const response = await axios.get<MemberListResponse>(`${API_URL}/search`, {
            params: { keyword, page, size }
        });
        return response.data;
    },

    // 이메일 중복 확인
    checkEmailExists: async (email: string): Promise<boolean> => {
        const response = await axios.get<{ exists: boolean }>(`${API_URL}/check-email`, {
            params: { email }
        });
        return response.data.exists;
    },

    // 사용자명 중복 확인
    checkUsernameExists: async (username: string): Promise<boolean> => {
        const response = await axios.get<{ exists: boolean }>(`${API_URL}/check-username`, {
            params: { username }
        });
        return response.data.exists;
    },

    // 회원 비밀번호 변경
    changePassword: async (id: number, oldPassword: string, newPassword: string): Promise<void> => {
        await axios.patch(`${API_URL}/${id}/password`, {
            oldPassword,
            newPassword
        });
    },

    // 회원 상태 변경 (활성/비활성)
    changeMemberStatus: async (id: number, status: 'ACTIVE' | 'INACTIVE'): Promise<Member> => {
        const response = await axios.patch<Member>(`${API_URL}/${id}/status`, { status });
        return response.data;
    }
};

// 기본 export
export default memberService;

// 개별 함수들도 export (필요시)
export const {
    getMemberList,
    getAllMembers,
    getMemberById,
    createMember,
    updateMember,
    deleteMember,
    deleteMembers,
    changeMemberRole,
    searchMembers,
    checkEmailExists,
    checkUsernameExists,
    changePassword,
    changeMemberStatus
} = memberService;
