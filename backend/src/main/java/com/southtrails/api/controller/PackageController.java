package com.southtrails.api.controller;

import com.southtrails.api.entity.TravelPackage;
import com.southtrails.api.repository.TravelPackageRepository;
import jakarta.validation.Valid;
import java.util.Comparator;
import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/packages")
public class PackageController {

    private final TravelPackageRepository packages;

    public PackageController(TravelPackageRepository packages) {
        this.packages = packages;
    }

    @GetMapping
    List<TravelPackage> all(
            @RequestParam(required = false) String state,
            @RequestParam(required = false) String category,
            @RequestParam(required = false) String search,
            @RequestParam(required = false) Integer minPrice,
            @RequestParam(required = false) Integer maxPrice,
            @RequestParam(required = false) Integer minDays,
            @RequestParam(required = false) Integer maxDays,
            @RequestParam(required = false) Double minRating
    ) {
        String q = search == null ? "" : search.toLowerCase();
        return packages.findAll().stream()
                .filter(pkg -> "Tamil Nadu".equalsIgnoreCase(pkg.getState()))
                .filter(pkg -> category == null || category.isBlank() || category.equalsIgnoreCase(pkg.getCategory()))
                .filter(pkg -> minPrice == null || (pkg.getPrice() != null && pkg.getPrice().intValue() >= minPrice))
                .filter(pkg -> maxPrice == null || (pkg.getPrice() != null && pkg.getPrice().intValue() <= maxPrice))
                .filter(pkg -> minDays == null || (pkg.getDays() != null && pkg.getDays() >= minDays))
                .filter(pkg -> maxDays == null || (pkg.getDays() != null && pkg.getDays() <= maxDays))
                .filter(pkg -> minRating == null || (pkg.getRating() != null && pkg.getRating() >= minRating))
                .filter(pkg -> q.isBlank()
                        || contains(pkg.getTitle(), q)
                        || contains(pkg.getDestination(), q)
                        || contains(pkg.getCategory(), q)
                        || contains(pkg.getState(), q)
                        || contains(pkg.getDescription(), q))
                .sorted(Comparator.comparing(TravelPackage::getCreatedAt, Comparator.nullsLast(Comparator.reverseOrder())))
                .toList();
    }

    @GetMapping("/{id}")
    ResponseEntity<TravelPackage> byId(@PathVariable String id) {
        return packages.findById(id)
                .filter(pkg -> "Tamil Nadu".equalsIgnoreCase(pkg.getState()))
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    TravelPackage create(@Valid @RequestBody TravelPackage payload) {
        payload.setState("Tamil Nadu");
        return packages.save(payload);
    }

    @PutMapping("/{id}")
    ResponseEntity<TravelPackage> update(@PathVariable String id, @Valid @RequestBody TravelPackage payload) {
        return packages.findById(id)
                .map(existing -> {
                    payload.setId(existing.getId());
                    payload.setCreatedAt(existing.getCreatedAt());
                    payload.setState("Tamil Nadu");
                    return ResponseEntity.ok(packages.save(payload));
                })
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    ResponseEntity<Void> delete(@PathVariable String id) {
        if (!packages.existsById(id)) return ResponseEntity.notFound().build();
        packages.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    private boolean contains(String value, String query) {
        return value != null && value.toLowerCase().contains(query);
    }
}
