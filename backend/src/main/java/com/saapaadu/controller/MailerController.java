package com.saapaadu.controller;

import com.saapaadu.service.MailerService;
import java.util.Map;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/mailer")
public class MailerController {
  private final MailerService mailerService;

  public MailerController(MailerService mailerService) {
    this.mailerService = mailerService;
  }

  @GetMapping("/test")
  public Map<String, Object> sendTestMail() {
    mailerService.sendMail(
        "cnls2official@gmail.com",
        "Test Email from Saapaadu",
        "If you see this, mailing works!"
    );
    return Map.of("status", "ok");
  }
}
