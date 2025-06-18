// src/components/board/BoardActions.tsx
import React from 'react';
import { Box } from '@mui/material';

interface BoardActionsProps {
    selectedCount: number;
    onDeleteSelected: () => void;
    onCreateNew: () => void;
}

export const BoardActions: React.FC<BoardActionsProps> = ({
                                                              selectedCount,
                                                              onDeleteSelected,
                                                              onCreateNew
                                                          }) => {
    return (
        <Box display="flex" gap={2} mb={2} alignItems="center" flexWrap="wrap" >
            {selectedCount > 0 && (
                <Box mb={1}>
                    <span style={{ fontSize: '14px', color: '#666' }}>
                        총 {selectedCount}개의 게시글이 선택되었습니다.
                    </span>
                </Box>
            )}

            <Box ml="auto">
                <button
                    onClick={onDeleteSelected}
                    className="btn btn-danger me-1 mt-1"
                    disabled={!selectedCount}
                >
                    선택 삭제
                </button>
                <button
                    onClick={onCreateNew}
                    className="btn btn-primary me-1 mt-1"
                >
                    게시글 등록
                </button>
            </Box>
        </Box>
    );
};
