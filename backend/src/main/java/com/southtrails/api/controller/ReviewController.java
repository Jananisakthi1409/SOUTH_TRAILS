package com.southtrails.api.controller;

import com.southtrails.api.entity.Review;
import com.southtrails.api.repository.BookingRepository;
import com.southtrails.api.repository.ReviewRepository;
import jakarta.validation.Valid;
import java.util.Comparator;
import java.util.List;
import java.util.Map;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/reviews")
public class ReviewController {

    private final ReviewRepository reviews;
    private final BookingRepository bookings;

    public ReviewController(ReviewRepository reviews, BookingRepository bookings) {
        this.reviews = reviews;
        this.bookings = bookings;
    }

    @GetMapping
    List<Review> all(@RequestParam(required = false) String packageId, @RequestParam(required = false) String customerId) {
        if (packageId != null && customerId != null) {
            return reviews.findByPackageIdAndCustomerIdOrderByCreatedAtDesc(packageId, customerId);
        }
        if (packageId != null) return reviews.findByPackageIdOrderByCreatedAtDesc(packageId);
        if (customerId != null) return reviews.findByCustomerIdOrderByCreatedAtDesc(customerId);
        return reviews.findAll().stream()
                .sorted(Comparator.comparing(Review::getCreatedAt, Comparator.nullsLast(Comparator.reverseOrder())))
                .toList();
    }

    @PostMapping
    ResponseEntity<?> create(@Valid @RequestBody Review payload) {
        if (!bookings.existsByCustomerIdAndPackageId(payload.getCustomerId(), payload.getPackageId())) {
            return ResponseEntity.badRequest().body(Map.of("message", "Reviews are available after booking this package."));
        }
        return ResponseEntity.ok(reviews.save(payload));
    }
}
