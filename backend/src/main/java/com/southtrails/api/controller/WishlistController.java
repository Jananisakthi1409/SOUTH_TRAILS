package com.southtrails.api.controller;

import com.southtrails.api.entity.TravelPackage;
import com.southtrails.api.entity.WishlistItem;
import com.southtrails.api.repository.TravelPackageRepository;
import com.southtrails.api.repository.WishlistRepository;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import java.util.List;
import java.util.Map;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/wishlist")
public class WishlistController {

    private final WishlistRepository wishlist;
    private final TravelPackageRepository packages;

    public WishlistController(WishlistRepository wishlist, TravelPackageRepository packages) {
        this.wishlist = wishlist;
        this.packages = packages;
    }

    @GetMapping("/{customerId}")
    List<TravelPackage> byCustomer(@PathVariable String customerId) {
        return wishlist.findByCustomerIdOrderByCreatedAtDesc(customerId).stream()
                .map(WishlistItem::getPackageId)
                .map(packages::findById)
                .flatMap(Optional -> Optional.stream())
                .toList();
    }

    @PostMapping
    ResponseEntity<?> save(@Valid @RequestBody WishlistItem payload) {
        if (wishlist.existsByCustomerIdAndPackageId(payload.getCustomerId(), payload.getPackageId())) {
            return ResponseEntity.ok(Map.of("saved", true));
        }
        return ResponseEntity.ok(wishlist.save(payload));
    }

    @DeleteMapping("/{customerId}/{packageId}")
    @Transactional
    ResponseEntity<Void> delete(@PathVariable String customerId, @PathVariable String packageId) {
        wishlist.deleteByCustomerIdAndPackageId(customerId, packageId);
        return ResponseEntity.noContent().build();
    }
}
