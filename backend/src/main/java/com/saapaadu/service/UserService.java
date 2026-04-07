package com.saapaadu.service;

import com.saapaadu.entity.User;
import com.saapaadu.entity.UserRole;
import com.saapaadu.repository.UserRepository;
import java.util.Locale;
import java.util.Optional;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
public class UserService {
  private final UserRepository userRepository;

  public UserService(UserRepository userRepository) {
    this.userRepository = userRepository;
  }

  public Optional<User> findByEmail(String email) {
    return userRepository.findByEmail(email);
  }

  public User requireByEmail(String email) {
    return userRepository.findByEmail(email)
        .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "User not found"));
  }

  public UserRole parseRole(String raw) {
    if (raw == null || raw.trim().isEmpty()) {
      return null;
    }
    String role = raw.trim().toLowerCase(Locale.ROOT);
    if ("customer".equals(role)) return UserRole.customer;
    if ("vendor".equals(role)) return UserRole.vendor;
    if ("admin".equals(role)) return UserRole.admin;
    return null;
  }

  public User ensureOauthUser(String email, String name, UserRole desiredRole) {
    UserRole roleToUse = desiredRole != null ? desiredRole : UserRole.customer;
    return userRepository.findByEmail(email)
        .map(existing -> {
          if (existing.getRole() == null && roleToUse != null) {
            existing.setRole(roleToUse);
            return userRepository.save(existing);
          }
          return existing;
        })
        .orElseGet(() -> {
          User user = new User();
          user.setEmail(email);
          user.setUsername(pickUsername(name, email));
          user.setRole(roleToUse);
          return userRepository.save(user);
        });
  }

  private String pickUsername(String name, String email) {
    if (name != null && !name.trim().isEmpty()) {
      return name.trim();
    }
    if (email == null) return "user";
    int at = email.indexOf('@');
    if (at > 0) {
      return email.substring(0, at);
    }
    return email;
  }
}
