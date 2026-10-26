package com.basetis.protectoretis.service;

import com.basetis.protectoretis.dto.UserCreateDto;
import com.basetis.protectoretis.dto.UserResponseDto;
import com.basetis.protectoretis.entity.User;
import com.basetis.protectoretis.mapper.UserMapper;
import com.basetis.protectoretis.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;



@Service
public class UserService {
    private static final String ADMIN_EMAIL = "protectoretis@gmail.com";
    private final UserRepository userRepository;
    private final UserMapper userMapper;

    public UserService(UserRepository userRepository, UserMapper userMapper) {
        this.userRepository = userRepository;
        this.userMapper = userMapper;
    }

    @Transactional
    public UserResponseDto createUser(UserCreateDto dto) {
        if (userRepository.existsByEmail(dto.email())) {
            throw new IllegalArgumentException("Email is already registered");
        }

        User user = userMapper.toEntity(dto);
        User savedUser = userRepository.save(user);

        return userMapper.toResponseDto(savedUser);
    }

    public List<UserResponseDto> getAllUsers() {
    return userRepository.findByEmailNotIgnoreCase(ADMIN_EMAIL).stream()
            .map(user -> new UserResponseDto(user.getId(), user.getName(), user.getEmail(), user.getCreatedAt()))
            .toList();
    }
}