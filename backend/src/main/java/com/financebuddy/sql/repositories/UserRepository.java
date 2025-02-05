package com.financebuddy.sql.repositories;

import com.financebuddy.sql.models.UserModel;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends MongoRepository<UserModel, String> {
    UserModel findByName(String name);
    UserModel findByEmail(String email);
}
