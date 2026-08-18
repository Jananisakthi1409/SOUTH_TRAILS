package com.southtrails.api.repository;

import com.southtrails.api.entity.AdminAccount;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AdminAccountRepository extends JpaRepository<AdminAccount, String> {
    Optional<AdminAccount> findByEmailIgnoreCase(String email);
}
