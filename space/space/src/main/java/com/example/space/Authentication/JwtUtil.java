package com.example.space.Authentication;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;

@Component
public class JwtUtil {

    @Value("${jwt.secret}")
    private String jwtSecret;

    @Value("${jwt.expiration}")
    private long expirationMs;

    public String generateTokan(OAuth2User user){
        byte[] keyBytes = Decoders.BASE64.decode(jwtSecret);
        Key key = Keys.hmacShaKeyFor(keyBytes);
        String email = (String) user.getAttribute("email");
        String name = (String) user.getAttribute("name");
        return Jwts.builder()
                .setSubject(email)
                .claim("email",email)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis()+expirationMs))
                .signWith(key,SignatureAlgorithm.HS512)
                .compact();
    }
    public String generateTokenManually(String email,String password){
        byte[] keyBytes = Decoders.BASE64.decode(jwtSecret);
        Key key = Keys.hmacShaKeyFor(keyBytes);
        return Jwts.builder()
                .setSubject(email)
                .claim("email",email)
                .claim("password",password)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + expirationMs))
                .signWith(key,SignatureAlgorithm.HS512)
                .compact();
    }
    public Claims parseToken(String token) {
        byte[] keyBytes = Decoders.BASE64.decode(jwtSecret); // correctly decode your secret
        Key key = Keys.hmacShaKeyFor(keyBytes);

        return Jwts
                .parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

}
