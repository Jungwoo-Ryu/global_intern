package com.fasoo.global.repository;

import com.fasoo.global.domain.Board;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

// BoardRepository.java
@Repository
public interface BoardRepository extends JpaRepository<Board, Long> {
    List<Board> findAllByOrderByCreatedAtDesc();

    @Query("SELECT b FROM Board b JOIN FETCH b.createdBy ORDER BY b.createdAt DESC")
    List<Board> findAllWithCreatedBy();
}
