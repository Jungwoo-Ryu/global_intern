package com.fasoo.global.resource;

import com.fasoo.global.domain.Board;
import com.fasoo.global.service.BoardService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
@Slf4j
public class BoardResource {
    private final BoardService boardService;
    /**
     * Member 목록 조회
     * */
    @GetMapping("/boards")
    public ResponseEntity<List<Board>> getBoards(){
        List<Board> memberList = boardService.list();
        return new ResponseEntity<>(memberList,HttpStatus.OK); // 200 OK
    }

    /**
     * Member 상세 조회
     * @param id: String
     */
    @GetMapping("/boards/{id}")
    public ResponseEntity<Board> getBoard(@PathVariable Long id) {
        Board board = boardService.get(id);
        if (board == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(board, HttpStatus.OK);
    }

    /**
     * board 등록
     * @param board
     * */
    @PostMapping("/boards")
    public ResponseEntity<?> addBoard(@RequestBody Board board){
        Board createdBoard = boardService.add(board);
        if (createdBoard == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(createdBoard, HttpStatus.CREATED);
    }

    /**
     * board 수정
     * @param id
     * @param board
     * */
    @PutMapping("/boards/{id}")
    public ResponseEntity<?> updateBoard(@PathVariable String id, @RequestBody Board board){

        Board updatedBoard = boardService.update(board);
        return new ResponseEntity<>(updatedBoard, HttpStatus.OK);
    }

    /**
     * Member 삭제
     * @param id
     * */
    @DeleteMapping("/boards/{id}")
    public ResponseEntity<?> deleteBoard(@PathVariable Long id){
        int result = boardService.delete(id);
        if (result == 0) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return new ResponseEntity<>(HttpStatus.OK);
    }
    /**
     * Member 삭제
     * @param ids
     * */
    @DeleteMapping("/boards/batch")
    public ResponseEntity<?> deleteBoardsBatch(@RequestBody List<Long> ids){
        int result = boardService.deleteAllByIdInBatch(ids);
        if (result == 0) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
