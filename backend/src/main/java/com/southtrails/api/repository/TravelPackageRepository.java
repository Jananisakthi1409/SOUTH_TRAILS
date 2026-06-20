package com.southtrails.api.repository;

import com.southtrails.api.entity.TravelPackage;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TravelPackageRepository extends JpaRepository<TravelPackage, String> {
    List<TravelPackage> findByStateIgnoreCase(String state);
}
