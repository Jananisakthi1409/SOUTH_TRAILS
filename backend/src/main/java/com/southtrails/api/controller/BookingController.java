package com.southtrails.api.controller;

import com.southtrails.api.entity.Booking;
import com.southtrails.api.repository.BookingRepository;
import jakarta.validation.Valid;
import java.util.Comparator;
import java.util.List;
import java.util.Map;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/bookings")
public class BookingController {

    private final BookingRepository bookings;

    public BookingController(BookingRepository bookings) {
        this.bookings = bookings;
    }

    @GetMapping
    List<Booking> all() {
        return bookings.findAll().stream()
                .sorted(Comparator.comparing(Booking::getCreatedAt, Comparator.nullsLast(Comparator.reverseOrder())))
                .toList();
    }

    @GetMapping("/{id}")
    ResponseEntity<Booking> byId(@PathVariable String id) {
        return bookings.findById(id).map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/customer/{customerId}")
    List<Booking> byCustomer(@PathVariable String customerId) {
        return bookings.findByCustomerIdOrderByCreatedAtDesc(customerId);
    }

    @PostMapping
    Booking create(@Valid @RequestBody Booking payload) {
        return bookings.save(payload);
    }

    @PatchMapping("/{id}/status")
    ResponseEntity<Booking> updateStatus(@PathVariable String id, @RequestBody Map<String, String> payload) {
        return bookings.findById(id)
                .map(existing -> {
                    existing.setStatus(payload.getOrDefault("status", existing.getStatus()));
                    return ResponseEntity.ok(bookings.save(existing));
                })
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    ResponseEntity<Void> delete(@PathVariable String id) {
        if (!bookings.existsById(id)) return ResponseEntity.notFound().build();
        bookings.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
