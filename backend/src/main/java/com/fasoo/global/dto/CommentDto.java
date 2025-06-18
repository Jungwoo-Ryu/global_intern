package com.fasoo.global.dto;


import com.fasoo.global.domain.Board;
import com.fasoo.global.domain.Comment;
import com.fasoo.global.domain.Member;
import lombok.Data;

import java.time.LocalDateTime;

// CommentDto.java
@Data
public class CommentDto {
    private Long id;
    private Long boardId;
    private String content;
    private LocalDateTime createdAt;
    private Long createdBy;
    private String authorName;

    public Comment toEntity(Board board, Member member) {
        return Comment.builder()
                .board(board)
                .content(this.content)
                .createdBy(member)
                .createdAt(LocalDateTime.now())
                .build();
    }

}
