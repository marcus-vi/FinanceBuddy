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

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;

import com.financebuddy.util.JwtUtils;

import lombok.Getter;
import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true") // Permitir credenciais
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
    public ResponseEntity<Map<String, String>> loginUser(@RequestBody UserRequest userRequest, HttpServletResponse responseCookie) {
        UserModel user = userRepository.findByEmail(userRequest.getEmail());
        if (user == null) {
            return new ResponseEntity<>(Map.of("message", "Email or password is incorrect!"), HttpStatus.NOT_FOUND);
        }

        if (!PasswordUtils.verifyPassword(userRequest.getPassword(), user.getPassword())) {
            return new ResponseEntity<>(Map.of("message", "Email or password is incorrect!"), HttpStatus.NOT_FOUND);
        }

        String token = JwtUtils.generateToken(user.getId(), "access");
        Cookie cookie = new Cookie("refreshToken", JwtUtils.generateToken(user.getId(), "refresh"));
        cookie.setMaxAge(2592000); // 30 dias
        cookie.setHttpOnly(true);
        cookie.setPath("/");
        cookie.setSecure(true); // Garantir que o cookie seja seguro
        cookie.setAttribute("SameSite", "None");
        responseCookie.addCookie(cookie);

        Map<String, String> response = new HashMap<>();
        response.put("message", "Login successful!");
        response.put("token", token);
        response.put("refreshToken", cookie.getValue());

        System.out.println(cookie.getValue());

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/refresh")
    public ResponseEntity<Map<String, String>> refreshToken(@CookieValue(value = "refreshToken", required = false) String refreshToken) {

        if (refreshToken == null) {
            return new ResponseEntity<>(Map.of("message", "Refresh token not provided"), HttpStatus.BAD_REQUEST);
        }

        String userId = JwtUtils.validateToken(refreshToken, "refresh");
        if (userId.equals("Invalid token")) {
            return new ResponseEntity<>(Map.of("message", "Invalid token!"), HttpStatus.UNAUTHORIZED);
        }

        String token = JwtUtils.generateToken(userId, "access");
        Map<String, String> response = new HashMap<>();
        response.put("message", "Token refreshed!");
        response.put("token", token);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

}