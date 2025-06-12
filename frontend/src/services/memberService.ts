// src/services/memberService.ts
import axios, {type AxiosResponse} from "axios";
import {Member} from "../model/member.model.ts";

const API_URL = "/api/member"; // Vite 프록시 사용 시

// Member Service 객체
const memberService = {
    // 회원 목록 조회 (페이징)
    list: async (): Promise<Member[]> => {
        const response: AxiosResponse<any, Member[]> = await axios.get<Member>(`${API_URL}/list`);

        return response.data;
    },

    // 전체 회원 목록 조회 (페이징 없음)
    listAll: async (): Promise<Member[]> => {
        const response = await axios.get<Member[]>(`${API_URL}/all`);
        return response.data;
    },

    // 회원 상세 조회
    get: async (id: number): Promise<Member> => {
        const response = await axios.get<Member>(`${API_URL}/${id}`);
        return response.data;
    },

    // 회원 생성
    create: async (memberData: Member): Promise<Member> => {
        const response = await axios.post<Member>(API_URL, memberData);
        return response.data;
    },

    // 회원 정보 수정
    update: async (id: number, memberData: Member): Promise<Member> => {
        const response = await axios.put<Member>(`${API_URL}/${id}`, memberData);
        return response.data;
    },

    // 회원 삭제
    delete: async (id: number): Promise<void> => {
        await axios.delete(`${API_URL}/${id}`);
    },

};

// 기본 export
export default memberService;

// 개별 함수들도 export (필요시)
export const {
    list,
    listAll,
    get,
    create,
    update
} = memberService;
