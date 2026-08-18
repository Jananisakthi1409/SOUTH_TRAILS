package com.southtrails.api.repository;

import com.southtrails.api.entity.Review;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReviewRepository extends JpaRepository<Review, String> {
    List<Review> findByPackageIdOrderByCreatedAtDesc(String packageId);
    List<Review> findByCustomerIdOrderByCreatedAtDesc(String customerId);
    List<Review> findByPackageIdAndCustomerIdOrderByCreatedAtDesc(String packageId, String customerId);
}
