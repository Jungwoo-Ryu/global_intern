// src/components/board/BoardDetailModal.tsx
import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Form from 'react-bootstrap/Form';
import boardService from '../../services/boardService.ts';
import { useEffect, useState } from "react";
import type {Board} from "../../model/board.model.ts";
import {Member} from "../../model/member.model.ts"
import { toast } from 'react-toastify';
import CommentList from "./CommentList.tsx";
import memberService from "../../services/memberService.ts";
import commentService from "../../services/commentService.ts";
import {Comment} from "../../model/comment.model.ts"
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

interface BoardDetailModalProps {
    boardId?: number | null;
    callback: () => void;
    label: string;
    open: boolean;        // 외부에서 제어
    onClose: () => void;  // 외부에서 제어
}

export default function BoardDetailModal({
                                             boardId,
                                             callback,
                                             label,
                                             open,
                                             onClose
                                         }: BoardDetailModalProps) {
    const [loading, setLoading] = useState(false);
    const [board, setBoard] = useState<Board>({
        boardId: null,
        title: '',
        content: '',
        createdAt: '',
        createdBy: new Member(),
        authorName: '',
        comments: [],
    });

    // 모달이 열릴 때 데이터 로드
    useEffect(() => {
        if (open) {
            loadBoardData();
            getUserData();
        }
    }, [open, boardId]);

    const loadBoardData = async () => {
        if (boardId) {
            // 기존 게시글 조회
            try {
                const boardData = await boardService.get(boardId);
                setBoard(boardData);
            } catch (error) {
                console.error('게시글 데이터 로드 실패:', error);
            }
        } else {
            // 새 게시글 작성 모드
            try {
                    setBoard({
                        boardId: null,
                        title: '',
                        content: '',
                        createdAt: '',
                        createdBy: user,
                        authorName: user.name,
                        comments: []
                    });

            } catch (error) {
                console.error('사용자 정보 로드 실패:', error);
            }
        }
    };

    const handleInputChange = (field: keyof Board, value: string | number) => {
        setBoard(prev => ({
            ...prev,
            [field]: value
        }));
    };
    const currentUser = memberService
    const handleSave = async () => {
        try {
            setLoading(true);

            // API 요청용 데이터 정리 (순환 참조 방지)

            if (boardId) {
                await boardService.update(boardId, board);
                toast.success('게시글 수정에 성공하였습니다.');
            } else {
                await boardService.create(board);
                toast.info('게시글 등록에 성공하였습니다.');
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
    const [comment, setComment] = useState('');
    const [user, setUser] = useState(new Member());
    const addComment = async () => {
        try {
            const postComment = new Comment(null,           // id
                boardId,        // boardId TODO. 데이터 파싱
                comment,        // content
                null,
                user.id,        // createdBy
                user.name
            );
            await commentService.create(postComment)
        } catch {
            toast.error("댓글 등록 중 오류가 발생했습니다.")
        }

    }

    const getUserData: void = async () => {
        const sessionData = localStorage.getItem('session');
        const userId: number = JSON.parse(sessionData);
        const data = await memberService.get(userId);
        setUser(data);
    }

    const handleDelete = async () => {
        try {
            setLoading(true);
            await boardService.delete(boardId);
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
            aria-labelledby="board-modal-title"
            aria-describedby="board-modal-description"
        >
            <Box sx={{
                ...style,
                width: 800,
                display: 'flex',
                flexDirection: 'column',
                maxHeight: '90vh'
            }}>
                <Box sx={{
                    flex: 1,
                    overflowY: 'auto',
                    pr: 1
                }}>
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
                                value={board.createdBy?.name || ''}
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
                        {boardId && board.comments && (
                            <CommentList
                                comments={board.comments}
                                title="댓글"
                            >
                                <div style={{ marginTop: '10px', padding: '10px', backgroundColor: '#fff' }}>
                                    <h6>댓글 작성</h6>
                                    <textarea
                                        placeholder="댓글을 입력하세요..."
                                        value={comment}
                                        onChange={(e) => setComment(e.target.value)} // ✅ 올바른 핸들러 사용
                                        style={{ width: '100%', minHeight: '60px' }}
                                    />
                                    <button className="btn btn-primary btn-sm mt-2"
                                            onClick={addComment}>
                                        댓글 등록
                                    </button>
                                </div>
                            </CommentList>
                        )}
                    </Form>
                </Box>

                <Box sx={{
                    pt: 2,
                    borderTop: '1px solid #dee2e6',
                    display: 'flex',
                    justifyContent: 'flex-end',
                    gap: 1
                }}>
                    {boardId && (
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
                </Box>
            </Box>
        </Modal>
    );
}
