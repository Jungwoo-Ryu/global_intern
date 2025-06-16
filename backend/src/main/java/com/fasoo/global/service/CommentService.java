package com.fasoo.global.service;

import com.fasoo.global.domain.Board;
import com.fasoo.global.domain.Comment;
import com.fasoo.global.domain.Member;
import com.fasoo.global.repository.BoardRepository;
import com.fasoo.global.repository.CommentRepository;
import com.fasoo.global.dto.CommentDto;
import com.fasoo.global.repository.MemberRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class CommentService {
    private final CommentRepository commentRepository;
    private final MemberRepository memberRepository;
    private final BoardRepository boardRepository;

    public List<Comment> list(){
        return commentRepository.findAll(Sort.by(Sort.Direction.DESC, "createdAt"));
    }

    @Transactional
    public Long add(CommentDto commentDto) {
        Optional<Member> member = memberRepository.findById(commentDto.getCreatedBy());
        Optional<Board> board = boardRepository.findById(commentDto.getBoardId());
        try{
            commentRepository.save(commentDto.toEntity(board.get(), member.get()));
        } catch (Exception e){
            log.error(e.getMessage());
        }
        return 1L;
    }

    @Transactional
    public void update(Comment comment) {
        comment.setCreatedAt(LocalDateTime.now());
        commentRepository.save(comment);
    }

    @Transactional
    public void delete(Long id) {
        commentRepository.deleteById(id);
    }
}
