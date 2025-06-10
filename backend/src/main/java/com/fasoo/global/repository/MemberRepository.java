package com.fasoo.global.repository;

import com.fasoo.global.domain.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MemberRepository extends JpaRepository<Member, Long> {
    Member findByUsername(String username);
    // 기본 CRUD 및 findAll() 자동 제공
}
