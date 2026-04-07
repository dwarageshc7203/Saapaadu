package com.saapaadu.service;

import com.saapaadu.dto.UpdateVendorDto;
import com.saapaadu.entity.User;
import com.saapaadu.entity.Vendor;
import com.saapaadu.repository.UserRepository;
import com.saapaadu.repository.VendorRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
public class VendorService {
  private final VendorRepository vendorRepository;
  private final UserRepository userRepository;

  public VendorService(VendorRepository vendorRepository, UserRepository userRepository) {
    this.vendorRepository = vendorRepository;
    this.userRepository = userRepository;
  }

  public Vendor findByUid(Long uid) {
    return vendorRepository.findByUid(uid).orElse(null);
  }

  public Vendor getOrCreate(Long uid) {
    Vendor vendor = vendorRepository.findByUid(uid).orElse(null);
    if (vendor != null) return vendor;

    User user = userRepository.findById(uid)
        .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found for vendor"));

    Vendor created = new Vendor();
    created.setUid(user.getId());
    created.setUser(user);
    created.setUsername(user.getUsername() != null ? user.getUsername() : user.getEmail());
    created.setVerification(false);
    return vendorRepository.save(created);
  }

  public Vendor update(Long uid, UpdateVendorDto dto) {
    Vendor vendor = getOrCreate(uid);

    if (dto.getPhoneNumber() != null) vendor.setPhoneNumber(dto.getPhoneNumber());
    if (dto.getVegNonveg() != null) vendor.setVegNonveg(dto.getVegNonveg());
    if (dto.getShopName() != null) vendor.setShopName(dto.getShopName());
    if (dto.getShopAddress() != null) vendor.setShopAddress(dto.getShopAddress());
    if (dto.getArea() != null) vendor.setArea(dto.getArea());
    if (dto.getCity() != null) vendor.setCity(dto.getCity());
    if (dto.getState() != null) vendor.setState(dto.getState());
    if (dto.getLatitude() != null) vendor.setLatitude(dto.getLatitude());
    if (dto.getLongitude() != null) vendor.setLongitude(dto.getLongitude());
    if (dto.getShopImage() != null) vendor.setShopImage(dto.getShopImage());
    if (dto.getVerification() != null) vendor.setVerification(dto.getVerification());

    return vendorRepository.save(vendor);
  }

  public Vendor ensureExists(User user) {
    return vendorRepository.findByUid(user.getId()).orElseGet(() -> {
      Vendor vendor = new Vendor();
      vendor.setUid(user.getId());
      vendor.setUser(user);
      vendor.setUsername(user.getUsername() != null ? user.getUsername() : user.getEmail());
      vendor.setVerification(false);
      return vendorRepository.save(vendor);
    });
  }
}
