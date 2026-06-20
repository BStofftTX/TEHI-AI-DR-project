package com.tehi.backend.config;

import com.tehi.backend.repository.AppUserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

@Configuration
@RequiredArgsConstructor
public class UserDetailsConfig {

    private final AppUserRepository appUserRepository;

    @Bean
    public UserDetailsService userDetailsService() {
        return username -> appUserRepository.findByUsername(username)
            .map(appUser -> {
                String roleName = "ROLE_" + appUser.getRole().name();
                return (UserDetails) User.builder()
                    .username(appUser.getUsername())
                    .password(appUser.getPassword())
                    .authorities(new SimpleGrantedAuthority(roleName))
                    .build();
            })
            .orElseThrow(() -> new UsernameNotFoundException("User not found: " + username));
    }
}
