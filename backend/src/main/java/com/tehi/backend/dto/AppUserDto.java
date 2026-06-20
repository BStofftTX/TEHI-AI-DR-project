package com.tehi.backend.dto;

import com.tehi.backend.domain.UserRole;

public record AppUserDto(
    Long id,
    String username,
    String email,
    UserRole role
) {}
