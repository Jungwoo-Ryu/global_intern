// src/components/board/BoardManagement.tsx
import React from 'react';
import { BoardList } from './BoardList';
import { BoardActions } from './BoardActions';
import BoardDetailModal from './BoardDetailModal';
import { useBoardManagement } from '../../hooks/board/useBoardManagement.ts'; // 올바른 경로

export const BoardManagement: React.FC = () => {
    const {
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
        handleModalClose
    } = useBoardManagement();

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ height: '200px' }}>
                <div>로딩 중...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="alert alert-danger" role="alert">
                오류: {error}
            </div>
        );
    }

    return (
        <div className="content " style={{ width: "200%", height: "90%" }}>
            <div className="row w-100">
                <BoardList
                    boards={boards}
                    onDetailClick={handleDetailClick}
                    onSelectionChange={handleSelectionChange}
                />
                <BoardActions
                    selectedCount={selectedIds.length}
                    onDeleteSelected={deleteSelectedBoards}
                    onCreateNew={handleCreateClick}
                />
            </div>
            {/* BoardActions - 고정 높이 */}


            {modalOpen && (
                <BoardDetailModal
                    boardId={selectedBoardId}
                    open={modalOpen}
                    onClose={handleModalClose}
                    callback={handleModalClose}
                    label={selectedBoardId ? '게시글 상세 조회' : '게시글 등록'}
                />
            )}
        </div>
    );
};
