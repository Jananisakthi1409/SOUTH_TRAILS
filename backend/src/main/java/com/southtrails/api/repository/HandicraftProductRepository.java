package com.southtrails.api.repository;

import com.southtrails.api.entity.HandicraftProduct;
import org.springframework.data.jpa.repository.JpaRepository;

public interface HandicraftProductRepository extends JpaRepository<HandicraftProduct, String> {
}
