package com.saapaadu.controller;

import com.saapaadu.dto.CreateOrderDto;
import com.saapaadu.dto.OrderView;
import com.saapaadu.dto.UpdateOrderDto;
import com.saapaadu.entity.Order;
import com.saapaadu.entity.User;
import com.saapaadu.service.CurrentUserService;
import com.saapaadu.service.OrderService;
import jakarta.validation.Valid;
import java.util.List;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/orders")
public class OrderController {
  private final OrderService orderService;
  private final CurrentUserService currentUserService;

  public OrderController(OrderService orderService, CurrentUserService currentUserService) {
    this.orderService = orderService;
    this.currentUserService = currentUserService;
  }

  @PostMapping
  public Order create(Authentication authentication, @Valid @RequestBody CreateOrderDto dto) {
    User user = currentUserService.requireUser(authentication);
    return orderService.create(user.getId(), dto);
  }

  @GetMapping("/my")
  public List<OrderView> getMyOrders(Authentication authentication) {
    User user = currentUserService.requireUser(authentication);
    return orderService.findByCustomer(user.getId());
  }

  @GetMapping("/vendor/my")
  public List<OrderView> getVendorOrders(Authentication authentication) {
    User user = currentUserService.requireUser(authentication);
    return orderService.findByVendor(user.getId());
  }

  @PatchMapping("/{oid}")
  public Order updateOrder(@PathVariable("oid") Long oid, @RequestBody UpdateOrderDto dto) {
    return orderService.update(oid, dto);
  }
}
