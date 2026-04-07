package com.saapaadu.config;

import com.saapaadu.entity.User;
import com.saapaadu.entity.UserRole;
import com.saapaadu.service.CustomerService;
import com.saapaadu.service.UserService;
import com.saapaadu.service.VendorService;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

@Component
public class OAuthSuccessHandler implements AuthenticationSuccessHandler {
  private final UserService userService;
  private final CustomerService customerService;
  private final VendorService vendorService;
  private final String frontendUrl;

  public OAuthSuccessHandler(
      UserService userService,
      CustomerService customerService,
      VendorService vendorService,
      @Value("${app.frontend-url}") String frontendUrl
  ) {
    this.userService = userService;
    this.customerService = customerService;
    this.vendorService = vendorService;
    this.frontendUrl = frontendUrl;
  }

  @Override
  public void onAuthenticationSuccess(
      HttpServletRequest request,
      HttpServletResponse response,
      Authentication authentication
  ) throws IOException, ServletException {
    if (!(authentication.getPrincipal() instanceof OAuth2User oauth)) {
      response.sendRedirect(frontendUrl + "/login?error=oauth");
      return;
    }

    String email = oauth.getAttribute("email");
    String name = oauth.getAttribute("name");
    String desiredRoleRaw = (String) request.getSession().getAttribute("desiredRole");
    UserRole desiredRole = userService.parseRole(desiredRoleRaw);

    if (email == null || email.isBlank()) {
      response.sendRedirect(frontendUrl + "/login?error=missing_email");
      return;
    }

    User user = userService.ensureOauthUser(email, name, desiredRole);
    if (user.getRole() == UserRole.vendor) {
      vendorService.ensureExists(user);
    } else if (user.getRole() == UserRole.customer) {
      customerService.ensureExists(user);
    }

    request.getSession().removeAttribute("desiredRole");
    response.sendRedirect(frontendUrl + "/dashboard");
  }
}
