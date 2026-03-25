package com.smartcart.service;

import com.smartcart.dto.LoginRequest;
import com.smartcart.dto.LoginResponse;
import com.smartcart.dto.RegisterRequest;
import com.smartcart.exception.ResourceNotFoundException;
import com.smartcart.model.Role;
import com.smartcart.model.User;
import com.smartcart.repository.UserRepository;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // Simple login
    public LoginResponse login(LoginRequest request) {
        User user = userRepository.findByUsername(request.getUsername())
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        if (!user.getPassword().equals(request.getPassword())) {
            throw new RuntimeException("Invalid password");
        }

        return new LoginResponse(user.getId(), user.getUsername(), user.getRole());
    }
    
 // Register new customer
    public LoginResponse register(RegisterRequest request) {
        // Check if username already exists
        if (userRepository.findByUsername(request.getUsername()).isPresent()) {
            throw new RuntimeException("Username already exists");
        }

        // Create new user with CUSTOMER role
        User newUser = new User(
            request.getUsername(),
            request.getPassword(),
            Role.CUSTOMER
        );

        User savedUser = userRepository.save(newUser);
        return new LoginResponse(savedUser.getId(), savedUser.getUsername(), savedUser.getRole());
    }
    
 // Get all users - Admin
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
    
}
