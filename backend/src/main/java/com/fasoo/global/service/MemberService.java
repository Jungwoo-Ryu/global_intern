package com.fasoo.global.service;

import com.fasoo.global.domain.Member;
import com.fasoo.global.repository.MemberRepository;
import jakarta.persistence.EntityManager;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class MemberService {
    private final MemberRepository memberRepository;

    public List<Member> getMemberList(){
        return memberRepository.findAll();
    }

    public Optional<Member> getMember(Long id) {
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
        Member existingMember = memberRepository.findById(member.getId())
                .orElseThrow(() -> new EntityNotFoundException("회원을 찾을 수 없습니다"));
        existingMember.setBirthDate(member.getBirthDate());
        existingMember.setPassword(member.getPassword());
        existingMember.setPhone(member.getPhone());
    }

    public void delete(Long id) {
        memberRepository.deleteById(id);
    }
}
