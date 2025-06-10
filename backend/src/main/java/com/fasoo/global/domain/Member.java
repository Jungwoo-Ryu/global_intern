package com.fasoo.global.domain;
import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "member")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Member {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; // 회원 고유번호

    @Column(nullable = false, unique = true, length = 50)
    private String username; // 아이디(로그인용)

    @Column(nullable = false, length = 255)
    private String password; // 비밀번호

    @Column(nullable = false, length = 100)
    private String name; // 이름

    @Column(nullable = false, unique = true, length = 100)
    private String email; // 이메일

    @Column(length = 20)
    private String phone; // 전화번호

    @Column(length = 1)
    private String gender; // 성별(M/F)

    private LocalDate birthDate; // 생년월일

    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt; // 가입일시

    private LocalDateTime updatedAt; // 정보수정일시

    @PrePersist
    public void prePersist() {
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    public void preUpdate() {
        this.updatedAt = LocalDateTime.now();
    }
}
