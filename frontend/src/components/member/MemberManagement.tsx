// src/components/member/MemberManagement.tsx
import React from 'react';
import { MemberList } from './MemberList';
import MemberDetailModal from './MemberDetailModal';
import { useMemberManagement } from '../../hooks/member/useMemberManagement';

export const MemberManagement: React.FC = () => {
    const {
        members,
        loading,
        error,
        selectedMemberId,
        modalOpen,
        handleDetailClick,
        handleModalClose,
        refreshList
    } = useMemberManagement();

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ height: '200px' }}>
                <div>로딩 중...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="alert alert-danger" role="alert">
                오류: {error}
            </div>
        );
    }

    return (
        <div className="content">
            <MemberList
                members={members}
                onDetailClick={handleDetailClick}
            />

            {modalOpen && (
                <MemberDetailModal
                    memberId={selectedMemberId}
                    open={modalOpen}
                    onClose={handleModalClose}
                    onSuccess={refreshList}
                    label={selectedMemberId ? '회원 상세 조회' : '회원 등록'}
                />
            )}
        </div>
    );
};
