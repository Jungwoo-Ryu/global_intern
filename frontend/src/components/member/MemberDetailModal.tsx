// src/components/member/MemberDetailModal.tsx
import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Form from 'react-bootstrap/Form';
import memberService from '../../services/memberService.ts';
import { useEffect, useState } from "react";
import type {Member} from "../../model/member.model.ts";
import { toast } from 'react-toastify';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
};

interface MemberDetailModalProps {
    memberId?: number | null;
    callback: () => void;
    label: string;
    open: boolean;        // 외부에서 제어
    onClose: () => void;  // 외부에서 제어
}

export default function MemberDetailModal({
                                              memberId,
                                              callback,
                                              label,
                                              open,
                                              onClose
                                          }: MemberDetailModalProps) {
    const [loading, setLoading] = useState(false);
    const [member, setMember] = useState<Member>({
        id: 0,
        name: '',
        email: '',
        phone: '',
        birthDate: '',
    });

    // 모달이 열릴 때 데이터 로드
    useEffect(() => {
        if (open) {
            loadMemberData();
        }
    }, [open, memberId]);

    const loadMemberData = async () => {
        if (memberId) {
            // 기존 회원 조회
            try {
                const memberData = await memberService.get(memberId);
                setMember(memberData);
            } catch (error) {
                console.error('회원 데이터 로드 실패:', error);
                toast.error('회원 데이터를 불러오는데 실패했습니다.');
            }
        } else {
            // 새 회원 등록 모드
            setMember({
                id: 0,
                name: '',
                email: '',
                phone: '',
                birthDate: '',
            });
        }
    };

    const handleInputChange = (field: keyof Member, value: string | number) => {
        setMember(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleSave = async () => {
        try {
            setLoading(true);

            if (memberId) {
                await memberService.update(memberId, member);
                toast.success('회원 정보가 수정되었습니다.');
            } else {
                await memberService.create(member);
                toast.success('회원이 등록되었습니다.');
            }

            callback(); // 데이터 재조회
            onClose(); // 외부에서 전달받은 onClose 호출

        } catch (error) {
            console.error('저장 실패:', error);
            toast.error('저장에 실패했습니다.');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        if (!memberId) return;

        try {
            setLoading(true);
            await memberService.delete(memberId);
            toast.success('회원이 삭제되었습니다.');
            onClose();
            callback();
        } catch (error) {
            console.error('삭제 실패:', error);
            toast.error('삭제에 실패했습니다.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="member-modal-title"
            aria-describedby="member-modal-description"
        >
            <Box sx={{ ...style, width: 600 }}>
                <Form>
                    <h5 className="mb-3">{label}</h5>

                    <Form.Group className="mb-3">
                        <Form.Label>이름</Form.Label>
                        <Form.Control
                            type="text"
                            value={member.name}
                            onChange={(e) => handleInputChange('name', e.target.value)}
                            placeholder="이름을 입력하세요"
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>이메일</Form.Label>
                        <Form.Control
                            type="email"
                            value={member.email}
                            onChange={(e) => handleInputChange('email', e.target.value)}
                            placeholder="이메일을 입력하세요"
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>전화번호</Form.Label>
                        <Form.Control
                            type="text"
                            value={member.phone}
                            onChange={(e) => handleInputChange('phone', e.target.value)}
                            placeholder="전화번호를 입력하세요"
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>생년월일</Form.Label>
                        <Form.Control
                            type="date"
                            value={member.birthDate}
                            onChange={(e) => handleInputChange('birthDate', e.target.value)}
                        />
                    </Form.Group>

                    <div className="d-flex justify-content-end gap-2">
                        {memberId && (
                            <Button
                                variant="contained"
                                onClick={handleDelete}
                                disabled={loading}
                                color="error"
                            >
                                삭제
                            </Button>
                        )}

                        <Button
                            variant="contained"
                            onClick={handleSave}
                            disabled={loading}
                            color="primary"
                        >
                            저장
                        </Button>

                        <Button
                            variant="outlined"
                            onClick={onClose}
                            color="inherit"
                        >
                            닫기
                        </Button>
                    </div>
                </Form>
            </Box>
        </Modal>
    );
}
