package com.basetis.protectoretis.controller;

import com.basetis.protectoretis.dto.UserCreateDto;
import com.basetis.protectoretis.dto.UserResponseDto;
import com.basetis.protectoretis.service.UserService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping
    public ResponseEntity<UserResponseDto> createUser(@Valid @RequestBody UserCreateDto dto) {
        UserResponseDto response = userService.createUser(dto);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }
}