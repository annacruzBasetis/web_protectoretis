package com.basetis.protectoretis.mapper;

import com.basetis.protectoretis.dto.UserCreateDto;
import com.basetis.protectoretis.dto.UserResponseDto;
import com.basetis.protectoretis.entity.User;
import org.springframework.stereotype.Component;

@Component
public class UserMapper {

    public User toEntity(UserCreateDto dto) {
        User user = new User();
        user.setName(dto.name());
        user.setEmail(dto.email());
     //   user.setPassword(dto.password()); // ENCRYPTTTTTT TODO
        return user;
    }

    public UserResponseDto toResponseDto(User entity) {
        return new UserResponseDto(
            entity.getId(),
            entity.getName(),
            entity.getEmail(),
            entity.getCreatedAt()
        );
    }
}