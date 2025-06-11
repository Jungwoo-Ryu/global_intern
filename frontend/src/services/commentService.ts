// src/services/commentService.ts
import axios from "axios";
import {Comment} from "../model/comment.model.ts";

const API_URL = "/api/comment"; // Vite 프록시 사용 시

// Comment Service 객체
const commentService = {
    // 댓글 목록 조회 (페이징)
    list: async (page: number = 0, size: number = 10): Promise<Comment[]> => {
        const response = await axios.get<Comment[]>(`${API_URL}/list`, {
            params: { page, size }
        });
        return response.data;
    },

    // 특정 게시글의 댓글 목록 조회
    listByBoardId: async (boardId: number): Promise<Comment[]> => {
        const response = await axios.get<Comment[]>(`${API_URL}/board/${boardId}`);
        return response.data;
    },

    // 댓글 상세 조회
    get: async (id: number): Promise<Comment> => {
        const response = await axios.get<Comment>(`${API_URL}/${id}`);
        return response.data;
    },

    // 댓글 생성
    create: async (commentData: Comment): Promise<Comment> => {
        const response = await axios.post<Comment>(API_URL, commentData);
        return response.data;
    },

    // 댓글 정보 수정
    update: async (id: number, commentData: Comment): Promise<Comment> => {
        const response = await axios.put<Comment>(`${API_URL}/${id}`, commentData);
        return response.data;
    },

    // 댓글 삭제
    delete: async (id: number): Promise<void> => {
        await axios.delete(`${API_URL}/${id}`);
    },
};

// 기본 export
export default commentService;

// 개별 함수들도 export (필요시)
export const {
    list,
    listByBoardId,
    get,
    create,
    update
} = commentService;
