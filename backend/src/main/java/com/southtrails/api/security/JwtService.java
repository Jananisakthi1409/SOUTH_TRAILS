package com.southtrails.api.security;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.nio.charset.StandardCharsets;
import java.time.Instant;
import java.util.Base64;
import java.util.LinkedHashMap;
import java.util.Map;
import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class JwtService {

    private static final String HMAC_ALGORITHM = "HmacSHA256";
    private final ObjectMapper mapper;
    private final byte[] secret;
    private final long expirationSeconds;

    public JwtService(
            ObjectMapper mapper,
            @Value("${app.jwt.secret:change-this-south-trails-development-secret}") String secret,
            @Value("${app.jwt.expiration-seconds:86400}") long expirationSeconds
    ) {
        this.mapper = mapper;
        this.secret = secret.getBytes(StandardCharsets.UTF_8);
        this.expirationSeconds = expirationSeconds;
    }

    public String issueToken(String subject, String email, String role) {
        try {
            Map<String, Object> header = Map.of("alg", "HS256", "typ", "JWT");
            Map<String, Object> payload = new LinkedHashMap<>();
            payload.put("sub", subject);
            payload.put("email", email);
            payload.put("role", role);
            payload.put("iat", Instant.now().getEpochSecond());
            payload.put("exp", Instant.now().plusSeconds(expirationSeconds).getEpochSecond());

            String encodedHeader = encode(mapper.writeValueAsBytes(header));
            String encodedPayload = encode(mapper.writeValueAsBytes(payload));
            String signingInput = encodedHeader + "." + encodedPayload;
            return signingInput + "." + sign(signingInput);
        } catch (Exception exception) {
            throw new IllegalStateException("Unable to issue JWT.", exception);
        }
    }

    public JwtPrincipal parse(String token) {
        try {
            String[] parts = token == null ? new String[0] : token.split("\\.");
            if (parts.length != 3) return null;
            String signingInput = parts[0] + "." + parts[1];
            if (!constantTimeEquals(sign(signingInput), parts[2])) return null;

            Map<String, Object> payload = mapper.readValue(Base64.getUrlDecoder().decode(parts[1]), new TypeReference<>() {});
            long exp = ((Number) payload.getOrDefault("exp", 0)).longValue();
            if (exp < Instant.now().getEpochSecond()) return null;

            return new JwtPrincipal(
                    String.valueOf(payload.getOrDefault("sub", "")),
                    String.valueOf(payload.getOrDefault("email", "")),
                    String.valueOf(payload.getOrDefault("role", "CUSTOMER"))
            );
        } catch (Exception ignored) {
            return null;
        }
    }

    private String sign(String input) throws Exception {
        Mac mac = Mac.getInstance(HMAC_ALGORITHM);
        mac.init(new SecretKeySpec(secret, HMAC_ALGORITHM));
        return encode(mac.doFinal(input.getBytes(StandardCharsets.UTF_8)));
    }

    private String encode(byte[] bytes) {
        return Base64.getUrlEncoder().withoutPadding().encodeToString(bytes);
    }

    private boolean constantTimeEquals(String left, String right) {
        if (left == null || right == null || left.length() != right.length()) return false;
        int result = 0;
        for (int i = 0; i < left.length(); i++) {
            result |= left.charAt(i) ^ right.charAt(i);
        }
        return result == 0;
    }

    public record JwtPrincipal(String subject, String email, String role) {}
}
