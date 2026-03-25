package com.smartcart.repository;

import com.smartcart.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    // No need to write any method for basic CRUD.
    // Spring Data JPA provides: save, findById, findAll, deleteById, etc.
}
