// src/pages/Board.tsx
import React, {useEffect, useMemo, useState} from "react";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import boardService from "../services/boardService";
import BoardDetailModal from "../components/board/BoardDetailModal.tsx";
import {Board} from "../model/board.model.ts";
import Button from '@mui/material/Button';

ModuleRegistry.registerModules([AllCommunityModule]);

const BoardPage: React.FC = () => {
    const [rowData, setRowData] = useState<Board[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // 모달 상태 관리
    const [selectedBoardId, setSelectedBoardId] = useState<number | null>(null);
    const [modalOpen, setModalOpen] = useState(false);

    const callback = () => {
        setModalOpen(false); // 모달 닫기
        fetchBoards();
    };

    // 상세 조회 버튼 클릭 핸들러
    const handleDetailClick = (boardId: number) => {
        setSelectedBoardId(boardId);
        setModalOpen(true);
    };

    // 게시글 등록 버튼 클릭 핸들러
    const handleCreateClick = () => {
        setSelectedBoardId(null);
        setModalOpen(true);
    };

    // 간단한 버튼 컴포넌트 (ag-grid 내부용)
    const ActionCell = (props: any) => (
        <Button
            onClick={() => handleDetailClick(props.data.boardId)}
            variant="outlined"
            size="small"
            color="info"
        >
            상세 조회
        </Button>
    );

    const colDefs = useMemo(() => [
        { field: "boardId", headerName: "ID", width: 80 },
        { field: "title", headerName: "제목", width: 200 },
        { field: "content", headerName: "내용" },
        { field: "createdBy.name", headerName: "작성자", width: 120 },
        { field: "createdAt", headerName: "작성일", width: 150 },
        {
            field: "actions",
            headerName: "작업",
            width: 120,
            cellRenderer: ActionCell, // 간단한 버튼만 렌더링
            sortable: false,
            filter: false
        }
    ], []);

    const defaultColDef = {
        flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
    };

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
            <AgGridReact
                rowData={rowData}
                columnDefs={colDefs}
                defaultColDef={defaultColDef}
                pagination={true}
                paginationPageSize={20}
            />

            <div className="d-flex justify-content-end p-2 mt-2">
                <Button
                    onClick={handleCreateClick}
                    variant="contained"
                    color="primary"
                >
                    게시글 등록
                </Button>
            </div>

            {/* 단일 모달 - 필요할 때만 렌더링 */}
            {modalOpen && (
                <BoardDetailModal
                    boardId={selectedBoardId}
                    callback={callback}
                    label={selectedBoardId ? '상세 조회' : '게시글 등록'}
                    open={modalOpen}
                    onClose={() => setModalOpen(false)}
                />
            )}
        </div>
    );
};

export default BoardPage;
