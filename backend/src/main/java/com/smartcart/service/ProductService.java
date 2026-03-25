package com.smartcart.service;

import com.smartcart.exception.ResourceNotFoundException;
import com.smartcart.exception.RoleAccessDeniedException;
import com.smartcart.model.Product;
import com.smartcart.model.Role;
import com.smartcart.model.User;
import com.smartcart.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {

    private final ProductRepository productRepository;

    @Autowired
    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    // Create product - only Admin or Staff
    public Product createProduct(Product product, User currentUser) {
        if (currentUser.getRole() != Role.ADMIN && currentUser.getRole() != Role.STAFF) {
            throw new RoleAccessDeniedException("Only Admin or Staff can create products");
        }
        return productRepository.save(product);
    }

 // Create multiple products - only Admin or Staff
    public List<Product> createProducts(List<Product> products, User currentUser) {

        if (currentUser == null ||
            (currentUser.getRole() != Role.ADMIN && currentUser.getRole() != Role.STAFF)) {
            throw new RoleAccessDeniedException("Only Admin or Staff can create products");
        }

        return productRepository.saveAll(products);
    }
    // Update product - only Admin or Staff
    public Product updateProduct(Long id, Product productDetails, User currentUser) {
        if (currentUser.getRole() != Role.ADMIN && currentUser.getRole() != Role.STAFF) {
            throw new RoleAccessDeniedException("Only Admin or Staff can update products");
        }

        Product existingProduct = getProductById(id); // throws exception if not found
        existingProduct.setName(productDetails.getName());
        existingProduct.setPrice(productDetails.getPrice());
        existingProduct.setQuantity(productDetails.getQuantity());
        existingProduct.setImage(productDetails.getImage());
        existingProduct.setDescription(productDetails.getDescription());

        return productRepository.save(existingProduct);
    }

    // Delete product - only Admin
    public void deleteProductById(Long id, User currentUser) {
        if (currentUser.getRole() != Role.ADMIN) {
            throw new RoleAccessDeniedException("Only Admin can delete products");
        }
        Product product = getProductById(id); // throws exception if not found
        productRepository.delete(product);
    }

    // Get all products - anyone
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    // Get product by id - anyone
    public Product getProductById(Long id) {
        return productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found with id: " + id));
    }
}
