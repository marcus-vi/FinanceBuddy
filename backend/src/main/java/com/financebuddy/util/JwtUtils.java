package com.financebuddy.util;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.JWTVerifier;

public class JwtUtils {
    private static final String SECRET = "faroeste_de_cabroco";

    public static String generateToken(String id) {
        Algorithm algorithm = Algorithm.HMAC256(SECRET);
        return JWT.create()
                .withIssuer("auth0")
                .withSubject(id)
                .sign(algorithm);
    }

    public static String validateToken(String token) {
        try {
            Algorithm algorithm = Algorithm.HMAC256(SECRET);
            JWTVerifier verifier = JWT.require(algorithm)
                    .withIssuer("auth0")
                    .build();
            verifier.verify(token);  // Verifica a assinatura do token
            return "Token is valid";
        } catch (Exception exception) {
            // Invalid signature/claims
            return "Invalid token";
        }
    }
}
