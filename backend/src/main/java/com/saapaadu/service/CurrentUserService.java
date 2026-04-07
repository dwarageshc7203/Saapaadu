package com.saapaadu.service;

import com.saapaadu.entity.User;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
public class CurrentUserService {
  private final UserService userService;

  public CurrentUserService(UserService userService) {
    this.userService = userService;
  }

  public User requireUser(Authentication authentication) {
    if (authentication == null || !authentication.isAuthenticated()) {
      throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Unauthorized");
    }

    Object principal = authentication.getPrincipal();
    if (principal instanceof OAuth2User oauth) {
      String email = oauth.getAttribute("email");
      if (email == null || email.isBlank()) {
        throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Email not available");
      }
      return userService.requireByEmail(email);
    }

    throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Unauthorized");
  }
}
