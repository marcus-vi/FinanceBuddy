package com.financebuddy.sql.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;

@Getter
@Setter
@NoArgsConstructor
@Document(collection = "users")
public class UserModel {
    
    @Id
    private String id;

    private String name;
    private String email;
    private String password;
}
