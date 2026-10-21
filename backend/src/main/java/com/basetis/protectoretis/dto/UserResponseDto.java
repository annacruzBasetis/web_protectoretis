package com.basetis.protectoretis.dto;

import java.time.LocalDateTime;

public record UserResponseDto (

    Long id,
    String name,
    String email,
    LocalDateTime createdAt
) {}
