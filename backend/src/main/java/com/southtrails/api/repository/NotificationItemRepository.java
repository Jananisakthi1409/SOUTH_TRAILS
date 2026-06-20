package com.southtrails.api.repository;

import com.southtrails.api.entity.NotificationItem;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NotificationItemRepository extends JpaRepository<NotificationItem, String> {
    List<NotificationItem> findByCustomerIdOrderByCreatedAtDesc(String customerId);
}
