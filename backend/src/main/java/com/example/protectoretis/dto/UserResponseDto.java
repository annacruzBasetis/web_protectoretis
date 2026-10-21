package com.example.protectoretis.dto;

import java.time.LocalDateTime;

public record UserResponseDto {

    private Long id;
    private String name;
    private String email;
    private String role;
    private LocalDateTime createdAt;

}