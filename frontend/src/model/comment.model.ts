// src/models/comment.model.ts
export interface IComment {
    id?: number | null;
    boardId: number;
    content: string;
    createdAt: string;
    createdBy: number;
    authorName?: string;
}

export class Comment implements IComment {
    id?: number | null;
    boardId: number;
    content: string;
    createdAt: string;
    createdBy: number;
    authorName?: string;

    constructor(
        id: number | null = null,
        boardId: number = 0,
        content: string = '',
        createdAt: string = '',
        createdBy: number = 0,
        authorName: string = ''
    ) {
        this.id = id;
        this.boardId = boardId;
        this.content = content;
        this.createdAt = createdAt;
        this.createdBy = createdBy;
        this.authorName = authorName;
    }

    // 정적 팩토리 메서드
    static createEmpty(): Comment {
        return new Comment();
    }

    static fromData(data: Partial<IComment>): Comment {
        return new Comment(
            data.id || null,
            data.boardId || 0,
            data.content || '',
            data.createdAt || '',
            data.createdBy || 0,
            data.authorName || ''
        );
    }
}
