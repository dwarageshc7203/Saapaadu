package com.saapaadu.repository;

import com.saapaadu.entity.Order;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderRepository extends JpaRepository<Order, Long> {
  List<Order> findByCidOrderByCreatedAtDesc(Long cid);
  List<Order> findByVidOrderByCreatedAtDesc(Long vid);
}
