package com.smartcart.controller;

import com.smartcart.exception.RoleAccessDeniedException;
import com.smartcart.model.Product;
import com.smartcart.model.User;
import com.smartcart.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins = "http://localhost:4200")
public class ProductController {

    private final ProductService productService;

    @Autowired
    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    // =====================================
    // Create single product (Admin or Staff)
    // =====================================
    @PostMapping
    public ResponseEntity<Product> createProduct(@RequestBody ProductRequest request) {
        try {
            Product createdProduct =
                    productService.createProduct(request.getProduct(), request.getUser());

            return new ResponseEntity<>(createdProduct, HttpStatus.CREATED);

        } catch (RoleAccessDeniedException e) {
            return new ResponseEntity<>(null, HttpStatus.FORBIDDEN);
        }
    }

    // =====================================
    // Create multiple products (Admin or Staff)
    // =====================================
    @PostMapping("/bulk")
    public ResponseEntity<List<Product>> createProducts(@RequestBody BulkProductRequest request) {
        try {
            List<Product> createdProducts =
                    productService.createProducts(request.getProducts(), request.getUser());

            return new ResponseEntity<>(createdProducts, HttpStatus.CREATED);

        } catch (RoleAccessDeniedException e) {
            return new ResponseEntity<>(null, HttpStatus.FORBIDDEN);
        }
    }

    // =====================================
    // Update product (Admin or Staff)
    // =====================================
    @PutMapping("/{id}")
    public ResponseEntity<Product> updateProduct(@PathVariable Long id,
                                                 @RequestBody ProductRequest request) {
        try {
            Product updatedProduct =
                    productService.updateProduct(id, request.getProduct(), request.getUser());

            return ResponseEntity.ok(updatedProduct);

        } catch (RoleAccessDeniedException e) {
            return new ResponseEntity<>(null, HttpStatus.FORBIDDEN);
        }
    }

    // =====================================
    // Delete product (Admin only)
    // =====================================
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable Long id,
                                              @RequestBody User currentUser) {
        try {
            productService.deleteProductById(id, currentUser);
            return ResponseEntity.noContent().build();

        } catch (RoleAccessDeniedException e) {
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        }
    }

    // =====================================
    // Get all products (Everyone)
    // =====================================
    @GetMapping
    public ResponseEntity<List<Product>> getAllProducts() {
        return ResponseEntity.ok(productService.getAllProducts());
    }

    // =====================================
    // Get product by id (Everyone)
    // =====================================
    @GetMapping("/{id}")
    public ResponseEntity<Product> getProductById(@PathVariable Long id) {
        return ResponseEntity.ok(productService.getProductById(id));
    }

    // =====================================
    // Request wrapper for single product
    // =====================================
    public static class ProductRequest {
        private Product product;
        private User user;

        public Product getProduct() { return product; }
        public void setProduct(Product product) { this.product = product; }

        public User getUser() { return user; }
        public void setUser(User user) { this.user = user; }
    }

    // =====================================
    // Request wrapper for multiple products
    // =====================================
    public static class BulkProductRequest {
        private List<Product> products;
        private User user;

        public List<Product> getProducts() { return products; }
        public void setProducts(List<Product> products) { this.products = products; }

        public User getUser() { return user; }
        public void setUser(User user) { this.user = user; }
    }
}