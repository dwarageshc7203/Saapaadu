package com.saapaadu.controller;

import com.saapaadu.dto.UpdateVendorDto;
import com.saapaadu.entity.User;
import com.saapaadu.entity.Vendor;
import com.saapaadu.service.CurrentUserService;
import com.saapaadu.service.VendorService;
import jakarta.validation.Valid;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/vendor")
public class VendorController {
  private final VendorService vendorService;
  private final CurrentUserService currentUserService;

  public VendorController(VendorService vendorService, CurrentUserService currentUserService) {
    this.vendorService = vendorService;
    this.currentUserService = currentUserService;
  }

  @GetMapping("/profile")
  public Vendor getProfile(Authentication authentication) {
    User user = currentUserService.requireUser(authentication);
    return vendorService.findByUid(user.getId());
  }

  @PutMapping("/profile")
  public Vendor updateProfile(Authentication authentication, @Valid @RequestBody UpdateVendorDto dto) {
    User user = currentUserService.requireUser(authentication);
    return vendorService.update(user.getId(), dto);
  }
}
