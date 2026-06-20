package com.southtrails.api.repository;

import com.southtrails.api.entity.EcoScore;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EcoScoreRepository extends JpaRepository<EcoScore, String> {
    Optional<EcoScore> findByPackageId(String packageId);
}
