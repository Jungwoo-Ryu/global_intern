package com.fasoo.global.resource;

import com.fasoo.global.domain.Member;
import com.fasoo.global.service.MemberService;
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
public class MemberResource {
    private final MemberService memberService;

    /**
     * Member 목록 조회
     * */
    @GetMapping("/member/list")
    public ResponseEntity<List<Member>> getMemberList(){
        try {
            List<Member> memberList = memberService.getMemberList();

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
    @GetMapping("/member/{id}")
    public ResponseEntity<Member> getMember(@PathVariable Long id) {
        try {
            Optional<Member> memberOptional  = memberService.getMember(id);

            return memberOptional
                    .map(member -> ResponseEntity.ok(member))
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
     * Member 등록
     * @param member
     * */
    @PostMapping("/member")
    public ResponseEntity<?> addMember(@RequestBody Member member){
        Long id = memberService.add(member);
        if  (id == null) {
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok().build();
    }

    /**
     * Member 수정
     * @param id
     * @param member
     * */
    @PutMapping("/member/{id}")
    public ResponseEntity<?> updateMember(@PathVariable String id, @RequestBody Member member){

        memberService.update(member);
        return ResponseEntity.ok().build();
    }

    /**
     * Member 삭제
     * @param id
     * */
    @DeleteMapping("/member/{id}")
    public ResponseEntity<?> deleteMember(@PathVariable Long id){
        memberService.delete(id);
        return ResponseEntity.ok().build();
    }
}
