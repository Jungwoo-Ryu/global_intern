package com.fasoo.global.resource;

import com.fasoo.global.domain.Comment;
import com.fasoo.global.service.CommentService;
import com.fasoo.global.dto.CommentDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
@Slf4j
public class CommentResource {
    private final CommentService commentService;

    /**
     * comment 등록
     * @param commentDto
     * */
    @PostMapping("/comment")
    public ResponseEntity<?> addComment(@RequestBody CommentDto commentDto){
        Long id = commentService.add(commentDto);
        if (id == null) {
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok().build();
    }

    /**
     * comment 수정
     * @param id
     * @param comment
     * */
    @PutMapping("/comment/{id}")
    public ResponseEntity<?> updateComment(@PathVariable Long id, @RequestBody Comment comment){
        commentService.update(comment);
        return ResponseEntity.ok().build();
    }

    /**
     * Comment 삭제
     * @param id
     * */
    @DeleteMapping("/comment/{id}")
    public ResponseEntity<?> deleteComment(@PathVariable Long id){
        commentService.delete(id);
        return ResponseEntity.ok().build();
    }
}
