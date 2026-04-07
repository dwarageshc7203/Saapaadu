package com.saapaadu.repository;

import com.saapaadu.entity.Customer;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CustomerRepository extends JpaRepository<Customer, Long> {
  Optional<Customer> findByUid(Long uid);
  List<Customer> findByArea(String area);
}
