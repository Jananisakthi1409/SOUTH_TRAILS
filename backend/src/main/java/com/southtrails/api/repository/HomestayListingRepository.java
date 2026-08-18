package com.southtrails.api.repository;

import com.southtrails.api.entity.HomestayListing;
import org.springframework.data.jpa.repository.JpaRepository;

public interface HomestayListingRepository extends JpaRepository<HomestayListing, String> {
}
