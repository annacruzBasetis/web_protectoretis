package com.example.protectoretis.mapper;

import com.example.protectoretis.dto.UserCreateDto;
import com.example.protectoretis.dto.UserResponseDto;
import com.example.protectoretis.entity.User;
import org.springframework.stereotype.Component;

@Component
public class UserMapper {

    public User toEntity(UserCreateDto dto) {
        User user = new User();
        user.setName(dto.name());
        user.setEmail(dto.email());
        user.setPassword(dto.password()); // ENCRYPTTTTTT
        user.setRole(dto.role());
        return user;
    }

    public UserResponseDto toResponseDto(User entity) {
        return new UserResponseDto(
            entity.getId(),
            entity.getName(),
            entity.getEmail(),
            entity.getRole(),
            entity.getCreatedAt()
        );
    }
}