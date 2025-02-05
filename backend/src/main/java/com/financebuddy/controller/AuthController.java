package com.financebuddy.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

import com.financebuddy.sql.models.UserModel;
import com.financebuddy.sql.repositories.UserRepository;
import com.financebuddy.util.PasswordUtils;
import com.financebuddy.util.JwtUtils;

import lombok.Getter;
import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @Getter
    @AllArgsConstructor
    static class UserRequest {
        private String email;
        private String password;
        private String name;
    }

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@RequestBody UserRequest userRequest) {
        UserModel user = new UserModel();
        user.setPassword(PasswordUtils.hashPassword(userRequest.getPassword()));
        user.setEmail(userRequest.getEmail());
        user.setName(userRequest.getName());

        if (userRepository.findByEmail(user.getEmail()) != null) {
            return new ResponseEntity<>("User already exists!", HttpStatus.CONFLICT);
        }

        userRepository.save(user);
        return new ResponseEntity<>("User registered successfully!", HttpStatus.OK);
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> loginUser(@RequestBody UserRequest userRequest) {
        UserModel user = userRepository.findByEmail(userRequest.getEmail());
        if (user == null) {
            return new ResponseEntity<>(Map.of("message", "Email or password is incorrect!"), HttpStatus.NOT_FOUND);
        }

        if (!PasswordUtils.verifyPassword(userRequest.getPassword(), user.getPassword())) {
            return new ResponseEntity<>(Map.of("message", "Email or password is incorrect!"), HttpStatus.NOT_FOUND);
        }

        String token = JwtUtils.generateToken(user.getId());

        Map<String, String> response = new HashMap<>();
        response.put("message", "Login successful!");
        response.put("token", token);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    // @PostMapping("/forgot-password")
    // public ResponseEntity<String> forgotPassword(@RequestBody UserRequest userRequest) {
    //     UserModel user = userRepository.findByEmail(userRequest.getEmail());
    //     if (user == null) {
    //         return new ResponseEntity<>("User not found!", HttpStatus.NOT_FOUND);
    //     }

    //     String token = JwtUtils.generateToken(user.getId());
    //     // Send token to user's email
    //     return new ResponseEntity<>("Token sent to user's email!", HttpStatus.OK);
    // }
}