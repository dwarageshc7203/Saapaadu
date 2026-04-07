package com.saapaadu.service;

import com.saapaadu.entity.Customer;
import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class MailerService {
  private static final Logger logger = LoggerFactory.getLogger(MailerService.class);

  private final JavaMailSender mailSender;
  private final String mailUser;

  public MailerService(JavaMailSender mailSender,
                       @Value("${spring.mail.username:}") String mailUser) {
    this.mailSender = mailSender;
    this.mailUser = mailUser;
  }

  public void sendMail(String to, String subject, String text) {
    SimpleMailMessage message = new SimpleMailMessage();
    if (mailUser != null && !mailUser.isBlank()) {
      message.setFrom("Saapaadu <" + mailUser + ">");
    } else {
      message.setFrom("Saapaadu");
    }
    message.setTo(to);
    message.setSubject(subject);
    message.setText(text);

    mailSender.send(message);
    logger.info("Mail sent to {}", to);
  }

  public void notifyCustomersForHotspot(
      List<Customer> customers,
      String shopName,
      String mealName,
      double price,
      String area
  ) {
    logger.info("Preparing to notify {} customers in {}", customers.size(), area);

    for (Customer customer : customers) {
      if (customer.getUser() == null || customer.getUser().getEmail() == null) {
        continue;
      }
      String email = customer.getUser().getEmail();
        String body = "Hi " + (customer.getUser().getUsername() != null
          ? customer.getUser().getUsername()
          : "Customer") + ",\n\n" +
          "A new meal hotspot is available near you!\n\n" +
          "Shop: " + shopName + "\n" +
          "Meal: " + mealName + "\n" +
          "Price: INR " + price + "\n" +
          "Area: " + area + "\n\n" +
          "Hurry before it is gone!";

      sendMail(email, "New meal available near you in " + area + "!", body);
    }
  }
}
