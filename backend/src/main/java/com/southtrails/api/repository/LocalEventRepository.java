package com.southtrails.api.repository;

import com.southtrails.api.entity.LocalEvent;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LocalEventRepository extends JpaRepository<LocalEvent, String> {
}
