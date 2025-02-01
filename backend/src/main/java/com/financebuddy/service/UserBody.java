package com.financebuddy.service;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class UserBody {
    private String name;
    private String email;
    private String password;
}
