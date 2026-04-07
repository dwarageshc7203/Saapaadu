package com.saapaadu.repository;

import com.saapaadu.entity.Vendor;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VendorRepository extends JpaRepository<Vendor, Long> {
  Optional<Vendor> findByUid(Long uid);
}
