package edu.asp.uptimearmor.identityservice.service;


import edu.asp.uptimearmor.identityservice.dto.CustomUserDetails;
import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import java.nio.file.attribute.UserPrincipal;
import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;


@Component
public class JwtService {


    public static final String SECRET = "5367566B59703373367639792F423F4528482B4D6251655468576D5A71347437";
    public static final long TOKEN_VALIDITY = 30 * 60 * 1000;

    public boolean validateToken(final String token) {
        try {
            Jwts.parserBuilder().setSigningKey(getSignKey()).build().parseClaimsJws(token);
            return true; // Token is valid
        } catch (JwtException e) {
            return false; // Token is invalid
        }
    }

    public String generateToken(Authentication authentication) {
        CustomUserDetails customUserDetails = (CustomUserDetails)authentication.getPrincipal();
        System.out.println(customUserDetails.getUsername());
        Map<String, Object> claims = new HashMap<>();
        claims.put("role", customUserDetails.getRole());
        return createToken(claims, customUserDetails.getUsername());
    }

    private String createToken(Map<String, Object> claims, String employeeId) {
        Date issuedAt = new Date();
        Date expiration = new Date(issuedAt.getTime() + TOKEN_VALIDITY);
        return Jwts.builder()
                .setClaims(claims)
                .setSubject(employeeId)
                .setIssuer("UptimeArmor")
                .setIssuedAt(issuedAt)
                .setExpiration(expiration)
                .signWith(getSignKey(), SignatureAlgorithm.HS256).compact();
    }


    private Claims extractClaims(String token) {
        Jws<Claims> claimsJws = Jwts.parserBuilder().setSigningKey(getSignKey()).build().parseClaimsJws(token);
        return claimsJws.getBody();
    }

    public String renewToken(String token) {
        Claims claims = extractClaims(token);
        Date issuedAt = new Date();
        Date expiration = new Date(issuedAt.getTime() + TOKEN_VALIDITY);
        return Jwts.builder()
                .setClaims(claims)
                .setIssuedAt(issuedAt)
                .setExpiration(expiration)
                .signWith(getSignKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    private Key getSignKey() {
        byte[] keyBytes = Decoders.BASE64.decode(SECRET);
        return Keys.hmacShaKeyFor(keyBytes);
    }
}
