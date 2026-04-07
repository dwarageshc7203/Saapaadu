package com.saapaadu.service;

import com.saapaadu.dto.UpdateCustomerDto;
import com.saapaadu.entity.Customer;
import com.saapaadu.entity.User;
import com.saapaadu.repository.CustomerRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
public class CustomerService {
  private final CustomerRepository customerRepository;

  public CustomerService(CustomerRepository customerRepository) {
    this.customerRepository = customerRepository;
  }

  public Customer findByUid(Long uid) {
    return customerRepository.findByUid(uid).orElse(null);
  }

  public Customer update(Long uid, UpdateCustomerDto dto) {
    Customer customer = customerRepository.findByUid(uid)
        .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Customer not found"));

    if (dto.getPhoneNumber() != null) customer.setPhoneNumber(dto.getPhoneNumber());
    if (dto.getVegNonveg() != null) customer.setVegNonveg(dto.getVegNonveg());
    if (dto.getAddress() != null) customer.setAddress(dto.getAddress());
    if (dto.getArea() != null) customer.setArea(dto.getArea());
    if (dto.getCity() != null) customer.setCity(dto.getCity());
    if (dto.getState() != null) customer.setState(dto.getState());

    return customerRepository.save(customer);
  }

  public Customer ensureExists(User user) {
    return customerRepository.findByUid(user.getId()).orElseGet(() -> {
      Customer customer = new Customer();
      customer.setUid(user.getId());
      customer.setUser(user);
      customer.setUsername(user.getUsername() != null ? user.getUsername() : user.getEmail());
      return customerRepository.save(customer);
    });
  }
}
