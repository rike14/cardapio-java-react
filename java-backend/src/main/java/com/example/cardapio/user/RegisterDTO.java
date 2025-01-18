package com.example.cardapio.user;

public record RegisterDTO(String email, String password, UserRole role) {
}
