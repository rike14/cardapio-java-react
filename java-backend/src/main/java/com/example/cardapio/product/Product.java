package com.example.cardapio.product;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Table(name = "products")
@Entity(name = "products")
@Getter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = "id")
public class Product {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    private String image;

    private Double price;

    public Product(ProductRequestDTO data){
        this.title = data.title();
        this.image = data.image();
        this.price = data.price();
    }

    public void updateFromDTO(ProductRequestDTO data){
        this.title = data.title();
        this.image = data.image();
        this.price = data.price();
    }
}
