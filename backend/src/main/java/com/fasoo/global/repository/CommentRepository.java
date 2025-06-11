package com.fasoo.global.repository;

import com.fasoo.global.domain.Comment;
import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

// CommentRepository.java
@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {
    @Query("SELECT c FROM Comment c JOIN FETCH c.createdBy WHERE c.board.boardId = :boardId ORDER BY c.createdAt DESC")
    List<Comment> findByBoardIdWithCreatedByOrderByCreatedAtDesc(@Param("boardId") Long boardId);

    List<Comment> findByBoardBoardIdOrderByCreatedAtDesc(Long boardId);
}
