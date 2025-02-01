package com.financebuddy.sql.models;

public class UserModel {
    private String name;
    private String password;

    public UserModel(String name, String password) {
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
