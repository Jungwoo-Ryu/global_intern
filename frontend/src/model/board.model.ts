// src/models/board.model.ts
import type {Member} from "./member.model.ts";
import type {Comment} from "./comment.model.ts";

export interface IBoard {
    boardId?: number | null;
    title: string;
    content: string;
    createdAt: string;
    createdBy: Member;
    comments?: any[]; // 필요시 Comment 배열
}

export class Board implements IBoard {
    boardId?: number | null;
    title: string;
    content: string;
    createdAt: string;
    createdBy: Member;
    comments?: Comment[];

    constructor(
        boardId: number | null = null,
        title: string = '',
        content: string = '',
        createdAt: string = '',
        createdBy: Member = new Member(),
        comments: Comment[] = []
    ) {
        this.boardId = boardId;
        this.title = title;
        this.content = content;
        this.createdAt = createdAt;
        this.createdBy = createdBy;
        this.comments = comments;
    }

    // 편의 메서드 - 작성자명만 필요한 경우
    get authorName(): string {
        return this.createdBy.name;
    }
}
