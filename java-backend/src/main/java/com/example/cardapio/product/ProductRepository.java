package com.example.cardapio.product;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {
    List<ProductResponseDTO> findAllById(Long id);
}
