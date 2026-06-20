package com.southtrails.api.repository;

import com.southtrails.api.entity.WishlistItem;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WishlistRepository extends JpaRepository<WishlistItem, String> {
    List<WishlistItem> findByCustomerIdOrderByCreatedAtDesc(String customerId);
    Optional<WishlistItem> findByCustomerIdAndPackageId(String customerId, String packageId);
    boolean existsByCustomerIdAndPackageId(String customerId, String packageId);
    void deleteByCustomerIdAndPackageId(String customerId, String packageId);
}
