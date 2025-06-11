import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Form from 'react-bootstrap/Form';
import boardService from '../../services/boardService.ts';
import { useEffect, useState } from "react";
import type {Board} from "../../model/board.model.ts";
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

interface cellRendererParams {
    boardId: number;
    callback: () => void;
}

export default function BoardDetailModal({ boardId, callback }: cellRendererParams) {
    console.log(boardId)

    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    // Vue의 ref와 같은 역할을 하는 상태
    const [board, setBoard] = useState<Board>({
        boardId: null,
        title: '',
        content: '',
        createdAt: '',
        createdBy: 0,
        authorName: ''
    });

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    // 입력값 변경 핸들러 (Vue의 v-model과 같은 역할)
    const handleInputChange = (field: keyof Board, value: string | number) => {
        setBoard(prev => ({
            ...prev,
            [field]: value
        }));
    };

    // 저장 핸들러
    const handleSave = async () => {
        try {
            setLoading(true);
            await boardService.update(boardId, board);
            // 성공 시에만 실행
            handleClose(); // 모달 닫기
            callback(); // 데이터 재조회 + 알림

        } catch (error) {
            console.error('저장 실패:', error);
            toast.error('저장에 실패했습니다.');
            // 실패 시에는 모달을 닫지 않음 (사용자가 수정할 수 있도록)
        } finally {
            setLoading(false);
        }
    };

    // 삭제 핸들러
    const handleDelete = async () => {
        try {
            setLoading(true);

            await boardService.delete(boardId);
            console.log('게시글이 삭제되었습니다.');

            handleClose(); // 모달 닫기

            // 콜백 함수 호출 (데이터 재조회 + 알림)
            if (callback) {
                callback();
            }
        } catch (error) {
            console.error('삭제 실패:', error);
            toast.error('삭제에 실패했습니다.');
        } finally {
            setLoading(false);
        }
    };

    // 컴포넌트 마운트 시 게시글 데이터 로드
    useEffect(() => {
        const fetchBoard = async () => {
            try {
                const boardData = await boardService.get(boardId);
                setBoard(boardData);
            } catch (error) {
                console.error('게시글 데이터 로드 실패:', error);
            }
        };

        if (boardId) {
            fetchBoard();
        }
    }, [boardId, open]);

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
                            <Form.Label>제목</Form.Label>
                            <Form.Control
                                type="text"
                                value={board.title}
                                onChange={(e) => handleInputChange('title', e.target.value)}
                                placeholder="제목을 입력하세요"
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>내용</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={5}
                                value={board.content}
                                onChange={(e) => handleInputChange('content', e.target.value)}
                                placeholder="내용을 입력하세요"
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>작성자</Form.Label>
                            <Form.Control
                                type="text"
                                value={board.authorName || ''}
                                readOnly
                                placeholder="작성자"
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>작성일</Form.Label>
                            <Form.Control
                                type="text"
                                value={board.createdAt}
                                readOnly
                                placeholder="작성일"
                            />
                        </Form.Group>

                        <div className="d-flex justify-content-end gap-2">
                            <Button
                                variant="primary"
                                onClick={handleDelete}
                                disabled={loading}
                                className="btn btn-danger"
                            >
                                삭제
                            </Button>

                            <Button
                                variant="primary"
                                onClick={handleSave}
                                disabled={loading}
                                className="btn btn-primary"
                            >
                                저장
                            </Button>
                            <Button
                                variant="secondary"
                                onClick={handleClose}
                                className="btn btn-secondary"
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
