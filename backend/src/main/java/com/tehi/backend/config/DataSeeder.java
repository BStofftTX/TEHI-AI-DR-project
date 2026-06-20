package com.tehi.backend.config;

import com.tehi.backend.domain.AppUser;
import com.tehi.backend.domain.UserRole;
import com.tehi.backend.repository.AppUserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
@RequiredArgsConstructor
public class DataSeeder {

    private final AppUserRepository appUserRepository;
    private final PasswordEncoder passwordEncoder;

    @Bean
    CommandLineRunner seedDefaultAdmin() {
        return args -> appUserRepository.findByUsername("admin").orElseGet(() ->
            appUserRepository.save(AppUser.builder()
                .username("admin")
                .email("admin@tehi.local")
                .password(passwordEncoder.encode("admin123"))
                .role(UserRole.ADMIN)
                .build())
        );
    }
}
