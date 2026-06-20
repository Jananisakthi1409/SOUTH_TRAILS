package com.southtrails.api.repository;

import com.southtrails.api.entity.ItineraryPlan;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ItineraryPlanRepository extends JpaRepository<ItineraryPlan, String> {
    List<ItineraryPlan> findByCustomerIdOrderByCreatedAtDesc(String customerId);
}
