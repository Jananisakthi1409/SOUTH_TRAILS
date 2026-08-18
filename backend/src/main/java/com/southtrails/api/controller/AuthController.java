package com.southtrails.api.controller;

import com.southtrails.api.entity.AdminAccount;
import com.southtrails.api.entity.Customer;
import com.southtrails.api.repository.AdminAccountRepository;
import com.southtrails.api.repository.CustomerRepository;
import com.southtrails.api.security.JwtService;
import java.util.Map;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final CustomerRepository customers;
    private final AdminAccountRepository admins;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public AuthController(
            CustomerRepository customers,
            AdminAccountRepository admins,
            PasswordEncoder passwordEncoder,
            JwtService jwtService
    ) {
        this.customers = customers;
        this.admins = admins;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }

    @PostMapping("/customer/signup")
    ResponseEntity<?> signup(@RequestBody Map<String, String> payload) {
        String email = payload.getOrDefault("email", "").trim();
        String password = payload.getOrDefault("password", "");
        if (email.isBlank()) return badRequest("Email is required.");
        if (password.isBlank()) return badRequest("Password is required.");
        if (customers.findByEmailIgnoreCase(email).isPresent()) return badRequest("Email already registered.");

        Customer customer = new Customer();
        customer.setName(payload.getOrDefault("name", payload.getOrDefault("fullName", "")));
        customer.setEmail(email);
        customer.setPhone(payload.getOrDefault("phone", ""));
        customer.setPassword(passwordEncoder.encode(password));
        Customer saved = customers.save(customer);
        return ResponseEntity.ok(Map.of(
                "user", saved,
                "profile", saved,
                "role", "CUSTOMER",
                "token", jwtService.issueToken(saved.getId(), saved.getEmail(), "CUSTOMER")
        ));
    }

    @PostMapping("/customer/signin")
    ResponseEntity<?> customerSignin(@RequestBody Map<String, String> payload) {
        String password = payload.getOrDefault("password", "");
        return customers.findByEmailIgnoreCase(payload.getOrDefault("email", ""))
                .filter(customer -> passwordMatches(customer, password))
                .<ResponseEntity<?>>map(customer -> ResponseEntity.ok(Map.of(
                        "user", customer,
                        "role", "CUSTOMER",
                        "token", jwtService.issueToken(customer.getId(), customer.getEmail(), "CUSTOMER")
                )))
                .orElseGet(() -> ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("message", "Invalid email or password.")));
    }

    @PostMapping("/admin/signin")
    ResponseEntity<?> adminSignin(@RequestBody Map<String, String> payload) {
        String email = payload.getOrDefault("email", "");
        String password = payload.getOrDefault("password", "");
        return admins.findByEmailIgnoreCase(email)
                .filter(AdminAccount::isActive)
                .filter(admin -> passwordEncoder.matches(password, admin.getPasswordHash()))
                .<ResponseEntity<?>>map(admin -> ResponseEntity.ok(Map.of(
                        "user", Map.of("id", admin.getId(), "email", admin.getEmail(), "name", admin.getName(), "role", admin.getRole()),
                        "role", "ADMIN",
                        "token", jwtService.issueToken(admin.getId(), admin.getEmail(), "ADMIN")
                )))
                .orElseGet(() -> ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("message", "Invalid admin credentials.")));
    }

    @PostMapping("/signout")
    Map<String, Boolean> signout() {
        return Map.of("success", true);
    }

    private ResponseEntity<Map<String, String>> badRequest(String message) {
        return ResponseEntity.badRequest().body(Map.of("message", message));
    }

    private boolean passwordMatches(Customer customer, String rawPassword) {
        String stored = customer.getPassword();
        if (stored == null || stored.isBlank()) return false;
        if (stored.startsWith("$2a$") || stored.startsWith("$2b$") || stored.startsWith("$2y$")) {
            return passwordEncoder.matches(rawPassword, stored);
        }
        boolean matchesLegacyPassword = stored.equals(rawPassword);
        if (matchesLegacyPassword) {
            customer.setPassword(passwordEncoder.encode(rawPassword));
            customers.save(customer);
        }
        return matchesLegacyPassword;
    }
}
