// src/pages/Member.tsx
import React, {useEffect, useMemo, useState} from "react";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import memberService from "../services/memberService";
import MemberDetailModal from "../components/member/MemberDetailModal.tsx";
import { toast } from 'react-toastify';


ModuleRegistry.registerModules([AllCommunityModule]);

interface Member {
    id: number;
    name: string;
    email: string;
    phone: string;
    birthDate: string;
    status: string;
}

const Member: React.FC = () => {
    const [rowData, setRowData] = useState<Member[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const callback = () => {
        alert('저장되었습니다.'); // 알림 표시
        fetchMembers(); // 데이터 재조회
    };
    // 회원 데이터를 위한 컬럼 정의
    const colDefs = useMemo(() => [
        { field: "id", headerName: "ID", width: 80 },
        { field: "name", headerName: "이름", width: 120 },
        { field: "email", headerName: "이메일", width: 200 },
        { field: "phone", headerName: "전화번호", width: 150 },
        { field: "birthDate", headerName: "생년월일", width: 120 },
        {
            field: "actions",
            headerName: "작업",
            width: 120,
            cellRenderer: MemberDetailModal,
            cellRendererParams: (params: any) => ({
                memberId: params.data.id,
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

    const fetchMembers = async () => {
        try {
            setLoading(true);
            const members = await memberService.list();
            setRowData(members);
            setError(null);
        } catch (err) {
            console.error('회원 데이터 로드 실패:', err);
            setError('회원 데이터를 불러오는데 실패했습니다.');
        } finally {
            setLoading(false);
        }
    };
    // 컴포넌트 마운트 시 회원 데이터 로드
    useEffect(() => {
        fetchMembers();
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

export default Member;
