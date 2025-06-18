// src/components/member/MemberList.tsx
import React, { useMemo, useCallback } from 'react';
import { AgGridReact } from "ag-grid-react";
import { AllCommunityModule, ModuleRegistry, type ColDef } from "ag-grid-community";
import Button from '@mui/material/Button';
import type { Member } from '../../model/member.model.ts';

ModuleRegistry.registerModules([AllCommunityModule]);

interface MemberListProps {
    members: Member[];
    onDetailClick: (memberId: number) => void; // 누락된 prop 추가
}

export const MemberList: React.FC<MemberListProps> = ({
                                                          members,
                                                          onDetailClick // props에서 받아오기
                                                      }) => {
    // AG Grid 액션 셀 컴포넌트
    const ActionCell = useCallback((props: any) => (
        <Button
            onClick={() => onDetailClick(props.data.id)}
            variant="outlined"
            size="small"
            color="info"
        >
            상세 조회
        </Button>
    ), [onDetailClick]);

    // 나머지 코드는 동일...
    const colDefs: ColDef[]  = useMemo(() => [
        { field: "id", headerName: "ID", width: 80 },
        { field: "name", headerName: "이름", width: 120 },
        { field: "email", headerName: "이메일", width: 200 },
        { field: "phone", headerName: "전화번호", width: 150 },
        { field: "birthDate", headerName: "생년월일", width: 120 },
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

    return (
        <div style={{ width: '100%', height: '500px' }}> {/* 컨테이너 크기 설정 */}
            <AgGridReact
            rowData={members}
            columnDefs={colDefs}
            defaultColDef={defaultColDef}
            pagination={true}
            paginationPageSize={20}
            />
        </div>
    );
};
