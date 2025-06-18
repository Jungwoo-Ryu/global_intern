package com.fasoo.global.service;

import com.fasoo.global.domain.Member;
import com.fasoo.global.repository.MemberRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class MemberService {
    private final MemberRepository memberRepository;

    public List<Member> list(){
        return memberRepository.findAll(Sort.by(Sort.Direction.DESC, "updatedAt"));
}
    public Optional<Member> get(Long id) {
        return memberRepository.findById(id);
    }

    @Transactional
    public Long add(Member member) {
        Member savedMember = memberRepository.save(member);

        if (savedMember.getId() != null && savedMember.getId() > 0) {
            return savedMember.getId(); // 성공 시 ID 반환
        } else {
            throw new RuntimeException("회원 등록에 실패했습니다");
        }
    }

    @Transactional
    public void update(Member member) {
        member.setUpdatedAt(LocalDateTime.now());
        memberRepository.save(member);
    }

    @Transactional
    public void delete(Long id) {
        memberRepository.deleteById(id);
    }
}
