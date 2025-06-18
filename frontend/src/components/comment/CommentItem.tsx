// src/components/comment/CommentItem.tsx
import React from 'react';
import type { Comment } from "../../model/comment.model.ts";
import commentService from '../../services/commentService.ts';
import {toast} from "react-toastify";

interface CommentItemProps {
    comment: Comment;
    onCommentDeleted?: () => void; // 콜백 함수 추가
}

const CommentItem: React.FC<CommentItemProps> = ({ comment, onCommentDeleted }) => {
    const formatDate = (dateString: string) => {
        try {
            return new Date(dateString).toLocaleString('ko-KR', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit'
            });
        } catch {
            return dateString;
        }
    };

    const deleteComment = async (event) => {
        try {
            event.preventDefault();

            await commentService.delete(comment.id);
            toast.success("해당 댓글이 삭제되었습니다.");

            // 삭제 후 콜백 함수 호출
            if (onCommentDeleted) {
                onCommentDeleted();
            }
        } catch (error) {
            console.error('댓글 삭제 실패:', error);
            toast.error("댓글 삭제에 실패했습니다.");
        }
    };

    return (
        <div style={{
            padding: '12px',
            marginBottom: '8px',
            backgroundColor: 'white',
            borderRadius: '6px',
            border: '1px solid #e9ecef',
            boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
        }}>
            {/* 댓글 헤더 */}
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '8px',
                fontSize: '12px',
                color: '#6c757d'
            }}>
                <div>
                    <strong style={{ color: '#495057' }}>
                        {comment.createdBy?.name || comment.authorName || '익명'}
                    </strong>
                </div>
                <div>
                    {formatDate(comment.createdAt)}
                </div>
            </div>

            {/* 댓글 내용 */}
            <div style={{
                fontSize: '14px',
                lineHeight: '1.5',
                color: '#212529'
            }}>
                {comment.content}
            </div>
            <div className="d-flex justify-content-end">
                <button
                    className="btn btn-danger"
                    style={{width: 'fit-content'}}
                    onClick={deleteComment}
                >
                    삭제
                </button>
            </div>
        </div>
    );
};

export default CommentItem;
