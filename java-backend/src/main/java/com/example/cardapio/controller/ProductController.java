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

    @PostMapping
    public void saveProduct(@RequestBody ProductRequestDTO data){
        Product productData = new Product(data);
        repository.save(productData);
        return;
    }

    @GetMapping
    public List<ProductResponseDTO> getAll(){
        return repository.findAll().stream().map(ProductResponseDTO::new).toList();
    }

    @DeleteMapping
    public void deleteProduct(@RequestBody ProductRequestDTO data){
        if(data.id() == null) return;
        repository.deleteById(data.id());
    }
}
