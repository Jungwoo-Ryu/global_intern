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
    public Optional<Board> get(Long id) {
        return boardRepository.findById(id);
    }

    @Transactional
    public Long add(Board board) {
        Board savedboard = boardRepository.save(board);

        if (savedboard.getBoardId() != null && savedboard.getBoardId() > 0) {
            return savedboard.getBoardId(); // 성공 시 ID 반환
        } else {
            throw new RuntimeException("게시글 등록에 실패했습니다");
        }
    }

    @Transactional
    public void update(Board board) {
        board.setCreatedAt(LocalDateTime.now());
        boardRepository.save(board);
    }

    @Transactional
    public void delete(Long id) {
        boardRepository.deleteById(id);
    }
}
