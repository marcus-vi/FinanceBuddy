package com.financebuddy.util;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.JWTVerifier;
import java.util.Date;

public class JwtUtils {
    private static final String SECRET = "faroeste_de_cabroco";

    public static String generateToken(String id, String type) {
        Date time;

        if (type == "access") {
            time = new Date(System.currentTimeMillis() + 43200000); // 12 horas
        } else {
            time = new Date(System.currentTimeMillis() + 2592000000l); // 30 dias
        }

        Algorithm algorithm = Algorithm.HMAC256(SECRET);
        return JWT.create()
                .withIssuer("auth0")
                .withSubject(id)
                .withClaim("type", type)
                .withExpiresAt(time)
                .sign(algorithm);
    }

    public static String validateToken(String token, String type) {
        try {
            Algorithm algorithm = Algorithm.HMAC256(SECRET);
            JWTVerifier verifier = JWT.require(algorithm)
                    .withIssuer("auth0")
                    .build();
            verifier.verify(token);  // Verifica a assinatura do token
            return "Valid token";
        } catch (Exception exception) {
            // Invalid signature/claims
            return "Invalid token";
        }
    }
}
