// src/components/board/BoardList.tsx
import React, { useMemo, useCallback } from 'react';
import { AgGridReact } from "ag-grid-react";
import { AllCommunityModule, ModuleRegistry, type ColDef } from "ag-grid-community";
import Button from '@mui/material/Button';
import type { Board } from '../../model/board.model';

ModuleRegistry.registerModules([AllCommunityModule]);

interface BoardListProps {
    boards: Board[];
    onDetailClick: (boardId: number) => void;
    onSelectionChange: (event: any) => void; // 누락된 prop 추가
}

export const BoardList: React.FC<BoardListProps> = ({
                                                        boards,
                                                        onDetailClick,
                                                        onSelectionChange // 추가된 prop
                                                    }) => {
    const ActionCell = useCallback((props: any) => (
        <Button
            onClick={() => onDetailClick(props.data.boardId)}
            variant="outlined"
            size="small"
            color="info"
        >
            상세 조회
        </Button>
    ), [onDetailClick]);

    const colDefs: ColDef[] = useMemo(() => [
        {
            field: "boardId",
            headerName: "ID",
            width: 80,
            checkboxSelection: true,
            headerCheckboxSelection: true
        },
        { field: "title", headerName: "제목", flex: 1, minWidth: 150 },
        { field: "content", headerName: "내용", flex: 2, minWidth: 200 },
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
        sortable: true,
        filter: true,
        resizable: true,
    }), []);

    return (
        <div style={{ width: '100%', height: '500px' }}>
            <AgGridReact
                rowData={boards}
                columnDefs={colDefs}
                defaultColDef={defaultColDef}
                pagination={true}
                paginationPageSize={20}
                rowSelection="multiple"
                onSelectionChanged={onSelectionChange} // 이벤트 핸들러 연결
                animateRows={true}
                suppressRowClickSelection={true}
                domLayout="normal"
            />
        </div>
    );
};
