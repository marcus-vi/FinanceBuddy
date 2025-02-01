package com.financebuddy.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import com.fasterxml.jackson.annotation.JsonProperty;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class Auth {
    private static final User userTeste = new User("teste", "teste12345");

    static class User {
        @JsonProperty("name")
        private String name;
        
        @JsonProperty("password")
        private String password;

        public User(String name, String password) {
            this.name = name;
            this.password = password;
        }

        public String getName() {
            return name;
        }

        public String getPassword() {
            return password;
        }
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody User user) {
        if (user.getName().equals(userTeste.getName()) && user.getPassword().equals(userTeste.getPassword())) {
            System.out.println("Usuário autenticado com sucesso!");
            System.out.println("Token gerado: fake-jwt-token");
            return ResponseEntity.status(HttpStatus.OK).body("{\"token\": \"fake-jwt-token\"}");
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("{\"error\": \"Usuário não encontrado!\"}");
    }
}
