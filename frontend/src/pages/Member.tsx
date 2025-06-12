// src/pages/Member.tsx
import React, {useEffect, useMemo, useState} from "react";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import memberService from "../services/memberService";
import MemberDetailModal from "../components/member/MemberDetailModal.tsx";
import { toast } from 'react-toastify';
import Button from '@mui/material/Button';

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

    // 모달 상태 관리
    const [selectedMemberId, setSelectedMemberId] = useState<number | null>(null);
    const [modalOpen, setModalOpen] = useState(false);

    const callback = () => {
        toast.success('저장되었습니다.');
        fetchMembers();
        setModalOpen(false); // 모달 닫기
    };

    // 상세 조회 버튼 클릭 핸들러
    const handleDetailClick = (memberId: number) => {
        setSelectedMemberId(memberId);
        setModalOpen(true);
    };

    // 회원 등록 버튼 클릭 핸들러
    const handleCreateClick = () => {
        setSelectedMemberId(null);
        setModalOpen(true);
    };

    // 간단한 버튼 컴포넌트 (ag-grid 내부용)
    const ActionCell = (props: any) => (
        <Button
            onClick={() => handleDetailClick(props.data.id)}
            variant="outlined"
            size="small"
            color="info"
        >
            상세 조회
        </Button>
    );

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
                    회원 등록
                </Button>
            </div>

            {/* 단일 모달 - 필요할 때만 렌더링 */}
            {modalOpen && (
                <MemberDetailModal
                    memberId={selectedMemberId}
                    callback={callback}
                    label={selectedMemberId ? '상세 조회' : '회원 등록'}
                    open={modalOpen}
                    onClose={() => setModalOpen(false)}
                />
            )}
        </div>
    );
};

export default Member;
