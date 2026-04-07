package com.saapaadu.controller;

import com.saapaadu.dto.UpdateCustomerDto;
import com.saapaadu.entity.Customer;
import com.saapaadu.entity.User;
import com.saapaadu.service.CurrentUserService;
import com.saapaadu.service.CustomerService;
import jakarta.validation.Valid;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/customer")
public class CustomerController {
  private final CustomerService customerService;
  private final CurrentUserService currentUserService;

  public CustomerController(CustomerService customerService, CurrentUserService currentUserService) {
    this.customerService = customerService;
    this.currentUserService = currentUserService;
  }

  @GetMapping("/profile")
  public Customer getProfile(Authentication authentication) {
    User user = currentUserService.requireUser(authentication);
    return customerService.findByUid(user.getId());
  }

  @PutMapping("/profile")
  public Customer updateProfile(Authentication authentication, @Valid @RequestBody UpdateCustomerDto dto) {
    User user = currentUserService.requireUser(authentication);
    return customerService.update(user.getId(), dto);
  }
}
