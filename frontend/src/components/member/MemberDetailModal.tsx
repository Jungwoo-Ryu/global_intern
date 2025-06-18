// src/components/member/MemberDetailModal.tsx
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Form from 'react-bootstrap/Form';
import { useMemberDetail } from '../../hooks/member/useMemberDetail';

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
    open: boolean;
    onClose: () => void;
    onSuccess: () => void;
    label: string;
}

export default function MemberDetailModal({
                                              memberId,
                                              open,
                                              onClose,
                                              onSuccess,
                                              label
                                          }: MemberDetailModalProps) {
    const {
        member,
        loading,
        updateMemberField,
        saveMember,
        deleteMember
    } = useMemberDetail({
        memberId,
        open,
        onSuccess,
        onClose
    });

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
                            value={member.name || ''}
                            onChange={(e) => updateMemberField('name', e.target.value)}
                            placeholder="이름을 입력하세요"
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>이메일</Form.Label>
                        <Form.Control
                            type="email"
                            value={member.email || ''}
                            onChange={(e) => updateMemberField('email', e.target.value)}
                            placeholder="이메일을 입력하세요"
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>전화번호</Form.Label>
                        <Form.Control
                            type="text"
                            value={member.phone || ''}
                            onChange={(e) => updateMemberField('phone', e.target.value)}
                            placeholder="전화번호를 입력하세요"
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>생년월일</Form.Label>
                        <Form.Control
                            type="date"
                            value={member.birthDate || ''}
                            onChange={(e) => updateMemberField('birthDate', e.target.value)}
                        />
                    </Form.Group>

                    <div className="d-flex justify-content-end gap-2">
                        {memberId && (
                            <Button
                                variant="contained"
                                onClick={deleteMember}
                                disabled={loading}
                                color="error"
                            >
                                삭제
                            </Button>
                        )}

                        <Button
                            variant="contained"
                            onClick={saveMember}
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
