package com.saapaadu.controller;

import com.saapaadu.entity.User;
import com.saapaadu.service.CurrentUserService;
import java.util.Map;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class AuthController {
  private final CurrentUserService currentUserService;

  public AuthController(CurrentUserService currentUserService) {
    this.currentUserService = currentUserService;
  }

  @GetMapping("/me")
  public Map<String, Object> me(Authentication authentication) {
    User user = currentUserService.requireUser(authentication);
    return Map.of(
        "id", user.getId(),
        "email", user.getEmail(),
        "role", user.getRole()
    );
  }
}
