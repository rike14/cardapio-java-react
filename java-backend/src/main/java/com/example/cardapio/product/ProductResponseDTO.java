package com.example.cardapio.product;

public record ProductResponseDTO(Long id, String title, String image, Double price) {
    public ProductResponseDTO(Product product) {
        this(product.getId(), product.getTitle(), product.getImage(), product.getPrice());
    }
}
