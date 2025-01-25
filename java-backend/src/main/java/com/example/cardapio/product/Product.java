package com.example.cardapio.product;

import jakarta.persistence.*;
import lombok.*;

@Table(name = "product")
@Entity(name = "product")
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
}
