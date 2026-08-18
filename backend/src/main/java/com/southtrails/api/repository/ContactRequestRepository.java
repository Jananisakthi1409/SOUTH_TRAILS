package com.southtrails.api.repository;

import com.southtrails.api.entity.ContactRequest;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ContactRequestRepository extends JpaRepository<ContactRequest, String> {
}
