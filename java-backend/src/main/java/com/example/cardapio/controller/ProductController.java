package com.example.cardapio.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.cardapio.product.Product;
import com.example.cardapio.product.ProductRepository;
import com.example.cardapio.product.ProductRequestDTO;
import com.example.cardapio.product.ProductResponseDTO;

@RestController
@RequestMapping("products")
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

    @DeleteMapping("/{id}")
    public void deleteProduct(@PathVariable Long id){
        if(id == null) return;
        repository.deleteById(id);
        return;
    }

    @GetMapping("/{id}")
    public Object editProduct(@PathVariable("id") Long id){
        return repository.findAllById(id);
    }

    @PutMapping("/{id}")
    public void updateProduct(@PathVariable Long id, @RequestBody ProductRequestDTO data){
        Product productData = repository.findById(id).orElseThrow(() -> new RuntimeException("Product not found"));
        productData.updateFromDTO(data);
        repository.save(productData);
        return;
    }
}
