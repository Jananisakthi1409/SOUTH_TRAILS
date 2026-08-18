package com.southtrails.api.controller;

import com.southtrails.api.entity.Customer;
import com.southtrails.api.repository.CustomerRepository;
import jakarta.validation.Valid;
import java.util.Comparator;
import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/customers")
public class CustomerController {

    private final CustomerRepository customers;
    private final PasswordEncoder passwordEncoder;

    public CustomerController(CustomerRepository customers, PasswordEncoder passwordEncoder) {
        this.customers = customers;
        this.passwordEncoder = passwordEncoder;
    }

    @GetMapping
    List<Customer> all() {
        return customers.findAll().stream()
                .sorted(Comparator.comparing(Customer::getCreatedAt, Comparator.nullsLast(Comparator.reverseOrder())))
                .toList();
    }

    @GetMapping("/{id}")
    ResponseEntity<Customer> byId(@PathVariable String id) {
        return customers.findById(id).map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    Customer create(@Valid @RequestBody Customer payload) {
        return customers.save(payload);
    }

    @PutMapping("/{id}")
    ResponseEntity<Customer> update(@PathVariable String id, @RequestBody Customer payload) {
        return customers.findById(id)
                .map(existing -> {
                    existing.setName(payload.getName());
                    existing.setEmail(payload.getEmail());
                    existing.setPhone(payload.getPhone());
                    if (payload.getPassword() != null && !payload.getPassword().isBlank()) {
                        existing.setPassword(passwordEncoder.encode(payload.getPassword()));
                    }
                    return ResponseEntity.ok(customers.save(existing));
                })
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    ResponseEntity<Void> delete(@PathVariable String id) {
        if (!customers.existsById(id)) return ResponseEntity.notFound().build();
        customers.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
