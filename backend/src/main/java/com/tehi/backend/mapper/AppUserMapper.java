package com.tehi.backend.mapper;

import com.tehi.backend.domain.AppUser;
import com.tehi.backend.dto.AppUserDto;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface AppUserMapper {

    AppUserDto toDto(AppUser appUser);
}
