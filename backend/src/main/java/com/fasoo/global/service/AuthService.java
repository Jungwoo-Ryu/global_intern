package com.fasoo.global.service;

import com.fasoo.global.domain.Member;
import com.fasoo.global.repository.MemberRepository;
import com.fasoo.global.vo.LoginRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class AuthService {
    private final MemberRepository memberRepository;

    public Member login(LoginRequest loginInfo) {
        Member member = memberRepository.findByUsername(loginInfo.getUsername());
        if (member != null && member.getPassword().equals(loginInfo.getPassword())){
            return member;
        }
        else {
            return null;
        }
    }
}