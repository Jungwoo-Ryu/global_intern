package com.fasoo.global.service;

import com.fasoo.global.domain.Member;
import com.fasoo.global.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MemberService {
    private final MemberRepository memberRepository;

    public List<Member> getMemberList(){
        return memberRepository.findAll();
    }
}
