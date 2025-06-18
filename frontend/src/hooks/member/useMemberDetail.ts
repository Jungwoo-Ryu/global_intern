// src/hooks/useMemberDetail.ts
import { useState, useCallback, useEffect } from 'react';
import { toast } from 'react-toastify';
import memberService from '../../services/memberService.ts';
import { Member } from '../../model/member.model.ts';

interface UseMemberDetailProps {
    memberId?: number | null;
    open: boolean;
    onSuccess: () => void;
    onClose: () => void;
}

export const useMemberDetail = ({
                                    memberId,
                                    open,
                                    onSuccess,
                                    onClose
                                }: UseMemberDetailProps) => {
    // 상세 데이터 상태
    const [member, setMember] = useState<Member>(new Member());
    const [loading, setLoading] = useState(false);

    // 회원 데이터 로딩
    const loadMember = useCallback(async (id: number) => {
        try {
            setLoading(true);
            const memberData = await memberService.get(id);
            setMember(memberData);
        } catch (error) {
            console.error('회원 데이터 로드 실패:', error);
            toast.error('회원 데이터를 불러오는데 실패했습니다.');
        } finally {
            setLoading(false);
        }
    }, []);

    // 회원 정보 초기화
    const resetMember = useCallback(() => {
        setMember(new Member());
    }, []);

    // 필드 업데이트
    const updateMemberField = useCallback((field: keyof Member, value: string | number) => {
        setMember(prev => ({
            ...prev,
            [field]: value
        }));
    }, []);

    // 저장 (생성/수정)
    const saveMember = useCallback(async () => {
        try {
            setLoading(true);

            if (memberId) {
                // 수정
                await memberService.update(memberId, member);
                toast.success('회원 정보가 수정되었습니다.');
            } else {
                // 생성
                await memberService.create(member);
                toast.success('회원이 등록되었습니다.');
            }

            onSuccess(); // 목록 새로고침
            onClose(); // 모달 닫기

        } catch (error) {
            console.error('저장 실패:', error);
            toast.error('저장에 실패했습니다.');
        } finally {
            setLoading(false);
        }
    }, [memberId, member, onSuccess, onClose]);

    // 삭제
    const deleteMember = useCallback(async () => {
        if (!memberId) return;

        try {
            setLoading(true);
            await memberService.delete(memberId);
            toast.success('회원이 삭제되었습니다.');

            onSuccess(); // 목록 새로고침
            onClose(); // 모달 닫기

        } catch (error) {
            console.error('삭제 실패:', error);
            toast.error('삭제에 실패했습니다.');
        } finally {
            setLoading(false);
        }
    }, [memberId, onSuccess, onClose]);

    // 모달이 열릴 때 데이터 로드
    useEffect(() => {
        if (open) {
            if (memberId) {
                loadMember(memberId);
            } else {
                resetMember();
            }
        }
    }, [open, memberId, loadMember, resetMember]);

    return {
        member,
        loading,
        updateMemberField,
        saveMember,
        deleteMember
    };
};
