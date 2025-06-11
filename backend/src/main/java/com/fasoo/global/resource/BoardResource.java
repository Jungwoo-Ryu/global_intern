package com.fasoo.global.resource;

import com.fasoo.global.domain.Board;
import com.fasoo.global.service.BoardService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
@Slf4j
public class BoardResource {
    private final BoardService boardSerivce;
    /**
     * Member 목록 조회
     * */
    @GetMapping("/board/list")
    public ResponseEntity<List<Board>> getMemberList(){
        try {
            List<Board> memberList = boardSerivce.list();

            if (memberList.isEmpty()) {
                return ResponseEntity.noContent().build(); // 204 No Content
            }

            return ResponseEntity.ok(memberList); // 200 OK

        } catch (Exception e) {
            // 로깅 추가
            log.error("회원 목록 조회 중 오류 발생", e);
            return ResponseEntity.internalServerError().build(); // 500 Internal
        }
    }

    /**
     * Member 상세 조회
     * @param id: String
     */
    @GetMapping("/board/{id}")
    public ResponseEntity<Board> getMember(@PathVariable Long id) {
        try {
            Optional<Board> BoardOptional  = boardSerivce.get(id);

            return BoardOptional
                    .map(board -> ResponseEntity.ok(board))
                    .orElse(ResponseEntity.notFound().build());

        } catch (IllegalArgumentException e) {
            log.warn("잘못된 회원 ID: {}", id, e);
            return ResponseEntity.badRequest().build(); // 400 Bad Request

        } catch (Exception e) {
            log.error("회원 상세 조회 중 오류 발생, ID: {}", id, e);
            return ResponseEntity.internalServerError().build(); // 500 Internal Server Error
        }
    }

    /**
     * board 등록
     * @param board
     * */
    @PostMapping("/board")
    public ResponseEntity<?> addMember(@RequestBody Board board){
        Long id = boardSerivce.add(board);
        if  (id == null) {
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok().build();
    }

    /**
     * board 수정
     * @param id
     * @param board
     * */
    @PutMapping("/board/{id}")
    public ResponseEntity<?> updateBoard(@PathVariable String id, @RequestBody Board board){

        boardSerivce.update(board);
        return ResponseEntity.ok().build();
    }

    /**
     * Member 삭제
     * @param id
     * */
    @DeleteMapping("/board/{id}")
    public ResponseEntity<?> deleteBoard(@PathVariable Long id){
        boardSerivce.delete(id);
        return ResponseEntity.ok().build();
    }
}
