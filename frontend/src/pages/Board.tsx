// src/pages/Board.tsx
import React, {useEffect, useMemo, useState, useCallback} from "react";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import boardService from "../services/boardService";
import BoardDetailModal from "../components/board/BoardDetailModal.tsx";
import {Board} from "../model/board.model.ts";
import Button from '@mui/material/Button';
import { Box } from '@mui/material';
import {toast} from "react-toastify";
ModuleRegistry.registerModules([AllCommunityModule]);

const BoardPage: React.FC = () => {
    const [rowData, setRowData] = useState<Board[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // 모달 상태 관리
    const [selectedBoardId, setSelectedBoardId] = useState<number | null>(null);
    const [modalOpen, setModalOpen] = useState(false);

    // 셀렉트박스 상태 - 배열로 변경
    const [selectedValues, setSelectedValues] = useState<number[]>([]);

    const callback = useCallback(() => {
        setModalOpen(false);
        fetchBoards();
    }, []);

    // 상세 조회 버튼 클릭 핸들러
    const handleDetailClick = useCallback((boardId: number) => {
        setSelectedBoardId(boardId);
        setModalOpen(true);
    }, []);

    // 게시글 등록 버튼 클릭 핸들러
    const handleCreateClick = useCallback(() => {
        setSelectedBoardId(null);
        setModalOpen(true);
    }, []);
    
    // AG Grid 행 선택 이벤트 리스너
    const onSelectionChanged = useCallback(async (event: any) => {
        const selectedRows = event.api.getSelectedRows();

        const selectedBoardIds = selectedRows.map(row => row.boardId);
        // selectedValues 상태 업데이트
        setSelectedValues(selectedBoardIds);
    }, []);

    useEffect(() => {
        console.log('선택된 게시글 (상태 업데이트 후):', selectedValues);
    }, [selectedValues]);

    // 간단한 버튼 컴포넌트 (ag-grid 내부용)
    const ActionCell = useCallback((props: any) => (
        <Button
            onClick={() => handleDetailClick(props.data.boardId)}
            variant="outlined"
            size="small"
            color="info"
        >
            상세 조회
        </Button>
    ), [handleDetailClick]);

    const colDefs = useMemo(() => [
        {
            field: "boardId",
            headerName: "ID",
            width: 80,
            checkboxSelection: true,
            headerCheckboxSelection: true
        },
        { field: "title", headerName: "제목", width: 200 },
        { field: "content", headerName: "내용" },
        { field: "createdBy.name", headerName: "작성자", width: 120 },
        { field: "createdAt", headerName: "작성일", width: 150 },
        {
            field: "actions",
            headerName: "작업",
            width: 120,
            cellRenderer: ActionCell,
            sortable: false,
            filter: false
        }
    ], [ActionCell]);

    const defaultColDef = useMemo(() => ({
        flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
    }), []);

    const fetchBoards = async () => {
        try {
            setLoading(true);
            const boards = await boardService.list();
            setRowData(boards);
            setError(null);
        } catch (err) {
            console.error('게시글 데이터 로드 실패:', err);
            setError('게시글 데이터를 불러오는데 실패했습니다.');
        } finally {
            setLoading(false);
        }
    };
    const deleteAll: () => Promise<void> = async () => {
        await boardService.deleteAll(selectedValues)
        toast.success("선택된 게시글이 삭제되었습니다.")
        fetchBoards();
    }
    useEffect(() => {
        fetchBoards();
    }, []);

    if (loading) {
        return <div>로딩 중...</div>;
    }

    if (error) {
        return <div>오류: {error}</div>;
    }

    return (
        <div style={{ width: "100%", height: "90%" }}>
            {/* AG Grid */}
            <AgGridReact
                rowData={rowData}
                columnDefs={colDefs}
                defaultColDef={defaultColDef}
                pagination={true}
                paginationPageSize={20}
                rowSelection="multiple"
                onSelectionChanged={onSelectionChanged}
                animateRows={true}
                suppressRowClickSelection={true}
            />

            {/* 모달 */}
            {modalOpen && (
                <BoardDetailModal
                    boardId={selectedBoardId}
                    callback={callback}
                    label={selectedBoardId ? '상세 조회' : '게시글 등록'}
                    open={modalOpen}
                    onClose={() => setModalOpen(false)}
                />
            )}

            {/* 셀렉트박스와 선택된 값 표시 */}
            <Box display="flex" gap={2} mb={2} alignItems="center" flexWrap="wrap">

                {/* 선택된 boardId 개수 표시 */}
                {selectedValues.length > 0 && (
                    <Box mb={1}>
                    <span style={{ fontSize: '14px', color: '#666' }}>
                        총 {selectedValues.length}개의 게시글이 선택되었습니다.
                    </span>
                    </Box>
                )}
                <Box ml="auto">
                    <button
                        onClick={deleteAll}
                        className="btn btn-danger me-1 mt-1"
                        disabled={!selectedValues.length}
                    >
                        선택 삭제
                    </button>
                    <button
                        onClick={handleCreateClick}
                        className="btn btn-primary me-1 mt-1"
                    >
                        게시글 등록
                    </button>
                </Box>
            </Box>


        </div>

    );
};

export default BoardPage;
