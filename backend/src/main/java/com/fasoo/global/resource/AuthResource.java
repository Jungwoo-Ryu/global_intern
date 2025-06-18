package com.fasoo.global.resource;

import com.fasoo.global.domain.Member;
import com.fasoo.global.service.AuthService;
import com.fasoo.global.dto.LoginRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("/api")
@RestController
@RequiredArgsConstructor
public class AuthResource {
    private final AuthService authService;

    @PostMapping("/auth/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        Member member = authService.login(loginRequest);
        return member != null ? ResponseEntity.ok(member) : ResponseEntity.badRequest().build();
    }


}
