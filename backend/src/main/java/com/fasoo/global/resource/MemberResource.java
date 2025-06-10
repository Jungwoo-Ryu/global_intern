package com.fasoo.global.resource;

import com.fasoo.global.domain.Member;
import com.fasoo.global.service.MemberService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
@Slf4j
public class MemberResource {
    private final MemberService memberService;

    @GetMapping("/member/list")
    public List<Member> getMemberList(){
        log.info("getMemberList");
        return memberService.getMemberList();
    }
}
