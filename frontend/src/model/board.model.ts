// src/models/board.model.ts
export interface IBoard {
    boardId?: number | null;
    title: string;
    content: string;
    createdAt: string;
    createdBy: number;
    authorName?: string;
}

export class Board implements IBoard {
    boardId?: number | null;
    title: string;
    content: string;
    createdAt: string;
    createdBy: number;
    authorName?: string;

    constructor(
        boardId: number | null = null,
        title: string = '',
        content: string = '',
        createdAt: string = '',
        createdBy: number = 0,
        authorName: string = ''
    ) {
        this.boardId = boardId; // null이 아닌 매개변수 값 할당
        this.title = title;
        this.content = content;
        this.createdAt = createdAt;
        this.createdBy = createdBy;
        this.authorName = authorName;
    }

    // 정적 팩토리 메서드
    static createEmpty(): Board {
        return new Board();
    }

    static fromData(data: Partial<IBoard>): Board {
        return new Board(
            data.boardId || null,
            data.title || '',
            data.content || '',
            data.createdAt || '',
            data.createdBy || 0,
            data.authorName || ''
        );
    }
}
