// src/hooks/useMemberManagement.ts
import { useState, useCallback, useEffect } from 'react';
import { toast } from 'react-toastify';
import memberService from '../../services/memberService.ts';
import type { Member } from '../../model/member.model.ts';

export const useMemberManagement = () => {
    // 목록 상태만 관리
    const [members, setMembers] = useState<Member[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // 모달 상태 (ID만 관리)
    const [selectedMemberId, setSelectedMemberId] = useState<number | null>(null);
    const [modalOpen, setModalOpen] = useState(false);

    // 목록 데이터 페칭
    const fetchMembers = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const memberData = await memberService.list();
            setMembers(memberData);
        } catch (err) {
            console.error('회원 데이터 로드 실패:', err);
            setError('회원 데이터를 불러오는데 실패했습니다.');
            toast.error('회원 데이터를 불러오는데 실패했습니다.');
        } finally {
            setLoading(false);
        }
    }, []);

    // 상세 조회 (ID만 설정)
    const handleDetailClick = useCallback((memberId: number) => {
        setSelectedMemberId(memberId);
        setModalOpen(true);
    }, []);

    // 회원 등록
    const handleCreateClick = useCallback(() => {
        setSelectedMemberId(null);
        setModalOpen(true);
    }, []);

    // 모달 닫기
    const handleModalClose = useCallback(() => {
        setModalOpen(false);
        setSelectedMemberId(null);
    }, []);

    // 목록 새로고침 (detail에서 호출)
    const refreshList = useCallback(() => {
        fetchMembers();
    }, [fetchMembers]);

    // 초기 데이터 로드
    useEffect(() => {
        fetchMembers();
    }, [fetchMembers]);

    return {
        // 목록 상태
        members,
        loading,
        error,

        // 모달 상태
        selectedMemberId,
        modalOpen,

        // 액션
        handleDetailClick,
        handleCreateClick,
        handleModalClose,
        refreshList,
        refetch: fetchMembers
    };
};
