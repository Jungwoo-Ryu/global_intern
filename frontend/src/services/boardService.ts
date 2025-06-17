// src/services/boardService.ts
import axios from "axios";
import {Board} from "../model/board.model.ts";

const API_URL = "/api/board"; // Vite 프록시 사용 시

// Board Service 객체
const boardService = {
    // 게시글 목록 조회 (페이징)
    list: async (): Promise<Board[]> => {
        const response = await axios.get<Board[]>(`${API_URL}/list`);
        return response.data;
    },

    // 전체 게시글 목록 조회 (페이징 없음)
    listAll: async (): Promise<Board[]> => {
        const response = await axios.get<Board[]>(`${API_URL}/all`);
        return response.data;
    },

    // 게시글 상세 조회
    get: async (boardId: number): Promise<Board> => {
        const response = await axios.get<Board>(`${API_URL}/${boardId}`);
        return response.data;
    },

    // 게시글 생성
    create: async (boardData: Board): Promise<Board> => {
        const response = await axios.post<Board>(API_URL, boardData);
        return response.data;
    },

    // 게시글 정보 수정
    update: async (boardId: number, boardData: Board): Promise<Board> => {
        const response = await axios.put<Board>(`${API_URL}/${boardId}`, boardData);
        return response.data;
    },

    // 게시글 삭제
    delete: async (boardId: number): Promise<void> => {
        await axios.delete(`${API_URL}/${boardId}`);
    },
    deleteAll: async (selectedIds: number[]) : Promise<void> => {
        await axios.delete(`${API_URL}/batch`, {
            data: selectedIds
        });

    }
};

// 기본 export
export default boardService;

// 개별 함수들도 export (필요시)
export const {
    list,
    listAll,
    get,
    create,
    update
} = boardService;
