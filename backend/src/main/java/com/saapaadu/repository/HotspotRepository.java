package com.saapaadu.repository;

import com.saapaadu.entity.Hotspot;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface HotspotRepository extends JpaRepository<Hotspot, Long> {
  List<Hotspot> findByVendor_Uid(Long uid);
  List<Hotspot> findByAreaIgnoreCase(String area);
}
