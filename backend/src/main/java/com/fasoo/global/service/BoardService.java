package com.fasoo.global.service;

import com.fasoo.global.domain.Board;
import com.fasoo.global.repository.BoardRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class BoardService {
    private final BoardRepository boardRepository;

    public List<Board> list(){
        return boardRepository.findAll(Sort.by(Sort.Direction.DESC, "createdAt"));
    }
    public Board get(Long id) {
        return boardRepository.findByIdWithAuthor(id);
    }

    @Transactional
    public Board add(Board board) {
        board.setCreatedAt(LocalDateTime.now());
        return boardRepository.save(board);
    }

    @Transactional
    public Board update(Board board) {
        board.setCreatedAt(LocalDateTime.now());
        return boardRepository.save(board);
    }

    @Transactional
    public int delete(Long id) {
        try {
            boardRepository.deleteById(id);
        } catch (Exception e) {
            return 0;
        }
        return 1;
    }

    @Transactional
    public int deleteAllByIdInBatch(List<Long> ids) {
        try {
            boardRepository.deleteAllByIdInBatch(ids);
        } catch (Exception e) {
            return 0;
        }
        return 1;
    }
}
