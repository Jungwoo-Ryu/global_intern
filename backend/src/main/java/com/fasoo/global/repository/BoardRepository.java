package com.fasoo.global.repository;

import com.fasoo.global.domain.Board;
import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

// BoardRepository.java
@Repository
public interface BoardRepository extends JpaRepository<Board, Long> {
    @Query("SELECT b FROM Board b " +
            "JOIN FETCH b.createdBy " +
            "WHERE b.boardId = :boardId")
    Board findByIdWithAuthor(@Param("boardId") Long boardId);
}
