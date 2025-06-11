import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Form from 'react-bootstrap/Form';
import memberService from '../../services/memberService.ts';
import { useEffect, useState } from "react";

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

interface Member {
    id: number;
    name: string;
    email: string;
    phone: string;
    birthDate: string;
    status: string;
}

interface cellRendererParams {
    memberId: number;
}

export default function MemberDetailModal({ memberId }: cellRendererParams) {
    console.log(memberId)

    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    // Vue의 ref와 같은 역할을 하는 상태
    const [member, setMember] = useState<Member>({
        id: 0,
        name: '',
        email: '',
        phone: '',
        birthDate: '',
        status: ''
    });

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    // 입력값 변경 핸들러 (Vue의 v-model과 같은 역할)
    const handleInputChange = (field: keyof Member, value: string | number) => {
        setMember(prev => ({
            ...prev,
            [field]: value
        }));
    };

    // 저장 핸들러
    const handleSave = async () => {
        try {
            setLoading(true);
            await memberService.updateMember(member);
            console.log('회원 정보가 저장되었습니다.');
            handleClose();
        } catch (error) {
            console.error('저장 실패:', error);
        } finally {
            setLoading(false);
        }
    };

    // 컴포넌트 마운트 시 회원 데이터 로드
    useEffect(() => {
        const fetchMember = async () => {
            try {
                const memberData = await memberService.getMemberById(memberId);
                setMember(memberData);
            } catch (error) {
                console.error('회원 데이터 로드 실패:', error);
            }
        };

        if (memberId) {
            fetchMember();
        }
    }, [memberId]);

    return (
        <div>
            <Button onClick={handleOpen} className="btn btn-info">상세 조회</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
            >
                <Box sx={{ ...style, width: 800 }}>
                    <Form>
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

                        <Form.Group className="mb-3">
                            <Form.Label>상태</Form.Label>
                            <Form.Select
                                value={member.status}
                                onChange={(e) => handleInputChange('status', e.target.value)}
                            >
                                <option value="">상태 선택</option>
                                <option value="active">활성</option>
                                <option value="inactive">비활성</option>
                                <option value="pending">대기</option>
                            </Form.Select>
                        </Form.Group>

                        <div className="d-flex justify-content-end gap-2">
                            <Button
                                variant="primary"
                                onClick={handleSave}
                                disabled={loading}
                            >
                                {loading ? '저장 중...' : '저장'}
                            </Button>
                            <Button
                                variant="secondary"
                                onClick={handleClose}
                            >
                                닫기
                            </Button>
                        </div>
                    </Form>
                </Box>
            </Modal>
        </div>
    );
}
