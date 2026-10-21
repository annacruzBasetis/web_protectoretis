package com.example.protectoretis.service;

import com.example.protectoretis.dto.UserCreateDto;
import com.example.protectoretis.dto.UserResponseDto;
import com.example.protectoretis.entity.User;
import com.example.protectoretis.mapper.UserMapper;
import com.example.protectoretis.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UserService {

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
}