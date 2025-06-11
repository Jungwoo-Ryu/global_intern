// src/pages/Board.tsx
import React, {useEffect, useMemo, useState} from "react";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import boardService from "../services/boardService";
import BoardDetailModal from "../components/board/BoardDetailModal.tsx";
import {Board} from "../model/board.model.ts";

ModuleRegistry.registerModules([AllCommunityModule]);

const BoardPage: React.FC = () => {
    const [rowData, setRowData] = useState<Board[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const callback = () => {
        alert('저장되었습니다.'); // 알림 표시
        fetchBoards(); // 데이터 재조회
    };

    // 게시글 데이터를 위한 컬럼 정의
    const colDefs = useMemo(() => [
        { field: "boardId", headerName: "ID", width: 80 },
        { field: "title", headerName: "제목", width: 200 },
        { field: "content", headerName: "내용", width: 300 },
        { field: "authorName", headerName: "작성자", width: 120 },
        { field: "createdAt", headerName: "작성일", width: 150 },
        {
            field: "actions",
            headerName: "작업",
            width: 120,
            cellRenderer: BoardDetailModal,
            cellRendererParams: (params: any) => ({
                boardId: params.data.boardId,
                callback: callback
            }),
            sortable: false,
            filter: false
        }
    ], [callback]);

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

    // 컴포넌트 마운트 시 게시글 데이터 로드
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
        <div style={{ width: "100%", height: "100%" }}>
            <AgGridReact
                rowData={rowData}
                columnDefs={colDefs}
                defaultColDef={defaultColDef}
                pagination={true}
                paginationPageSize={20}
            />
        </div>
    );
};

export default BoardPage;
