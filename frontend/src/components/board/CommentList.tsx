// src/components/comment/CommentList.tsx
import React from 'react';
import type { Comment } from "../../model/comment.model.ts";
import CommentItem from "./CommentItem.tsx";

interface CommentListProps {
    comments: Comment[];
    title?: string;
}

const CommentList: React.FC<CommentListProps> = ({ comments, title = "댓글" }) => {
    return (
        <div className="mb-3">
            <label className="form-label">
                {title} ({comments.length}개)
            </label>
            <div style={{
                border: '1px solid #dee2e6',
                borderRadius: '4px',
                padding: '10px',
                maxHeight: '300px',
                overflowY: 'auto',
                backgroundColor: '#f8f9fa'
            }}>
                {comments.length > 0 ? (
                    comments.map((comment, index) => (
                        <CommentItem
                            key={comment.id || index}
                            comment={comment}
                        />
                    ))
                ) : (
                    <div style={{
                        textAlign: 'center',
                        color: '#6c757d',
                        padding: '20px'
                    }}>
                        댓글이 없습니다.
                    </div>
                )}
            </div>
        </div>
    );
};

export default CommentList;
