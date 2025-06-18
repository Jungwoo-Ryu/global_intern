// src/hooks/useBoardManagement.ts
import { useState, useEffect, useCallback } from 'react';
import { toast } from 'react-toastify';
import boardService from '../../services/boardService.ts';
import type { Board } from '../../model/board.model.ts';

export const useBoardManagement = () => {
    // 데이터 상태
    const [boards, setBoards] = useState<Board[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // 선택 상태
    const [selectedIds, setSelectedIds] = useState<number[]>([]);

    // 모달 상태
    const [selectedBoardId, setSelectedBoardId] = useState<number | null>(null);
    const [modalOpen, setModalOpen] = useState(false);

    // 데이터 페칭
    const fetchBoards = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const boardData = await boardService.list();
            setBoards(boardData);
        } catch (err) {
            console.error('게시글 데이터 로드 실패:', err);
            setError('게시글 데이터를 불러오는데 실패했습니다.');
            toast.error('게시글 데이터를 불러오는데 실패했습니다.');
        } finally {
            setLoading(false);
        }
    }, []);

    // 상세 조회
    const handleDetailClick = useCallback((boardId: number) => {
        setSelectedBoardId(boardId);
        setModalOpen(true);
    }, []);

    // 게시글 생성
    const handleCreateClick = useCallback(() => {
        setSelectedBoardId(null);
        setModalOpen(true);
    }, []);

    // 선택 변경
    const handleSelectionChange = useCallback((event: any) => {
        const selectedRows = event.api.getSelectedRows();
        const selectedBoardIds = selectedRows.map((row:Board) => row.boardId);
        setSelectedIds(selectedBoardIds);
    }, []);

    // 선택 삭제
    const deleteSelectedBoards = useCallback(async () => {
        if (selectedIds.length === 0) return;

        try {
            await boardService.deleteAll(selectedIds);
            toast.success("선택된 게시글이 삭제되었습니다.");
            setSelectedIds([]);
            // debugger
            await fetchBoards();
        } catch (error) {
            console.error('일괄 삭제 실패:', error);
            toast.error("삭제 중 오류가 발생했습니다.");
        }
    }, [selectedIds, fetchBoards]);

    // 모달 닫기 및 데이터 새로고침
    const handleModalClose = useCallback(async () => {
        setModalOpen(false);
        setSelectedBoardId(null);
        await fetchBoards();
    }, [fetchBoards]);

    // 초기 데이터 로드
    useEffect(() => {
        fetchBoards();
    }, [fetchBoards]);

    return {
        // 상태
        boards,
        loading,
        error,
        selectedIds,
        selectedBoardId,
        modalOpen,

        // 액션
        handleDetailClick,
        handleCreateClick,
        handleSelectionChange,
        deleteSelectedBoards,
        handleModalClose,
        refetch: fetchBoards
    };
};
