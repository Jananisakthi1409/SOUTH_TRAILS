package com.southtrails.api.repository;

import com.southtrails.api.entity.Booking;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BookingRepository extends JpaRepository<Booking, String> {
    List<Booking> findByCustomerIdOrderByCreatedAtDesc(String customerId);
    boolean existsByCustomerIdAndPackageId(String customerId, String packageId);
}
