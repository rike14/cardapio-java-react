package com.example.cardapio.controller;

import com.example.cardapio.product.Product;
import com.example.cardapio.product.ProductRepository;
import com.example.cardapio.product.ProductRequestDTO;
import com.example.cardapio.product.ProductResponseDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("product")
public class ProductController {

    @Autowired
    private ProductRepository repository;

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @PostMapping
    public void saveProduct(@RequestBody ProductRequestDTO data){
        Product productData = new Product(data);
        repository.save(productData);
        return;
    }

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @GetMapping
    public List<ProductResponseDTO> getAll(){
        return repository.findAll().stream().map(ProductResponseDTO::new).toList();
    }
}
