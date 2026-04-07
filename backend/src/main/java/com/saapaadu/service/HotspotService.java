package com.saapaadu.service;

import com.saapaadu.dto.CreateHotspotDto;
import com.saapaadu.dto.UpdateHotspotDto;
import com.saapaadu.entity.Customer;
import com.saapaadu.entity.DietType;
import com.saapaadu.entity.Hotspot;
import com.saapaadu.entity.Vendor;
import com.saapaadu.repository.CustomerRepository;
import com.saapaadu.repository.HotspotRepository;
import com.saapaadu.repository.VendorRepository;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
public class HotspotService {
  private static final Logger logger = LoggerFactory.getLogger(HotspotService.class);

  private final HotspotRepository hotspotRepository;
  private final VendorRepository vendorRepository;
  private final CustomerRepository customerRepository;
  private final MailerService mailerService;

  public HotspotService(
      HotspotRepository hotspotRepository,
      VendorRepository vendorRepository,
      CustomerRepository customerRepository,
      MailerService mailerService
  ) {
    this.hotspotRepository = hotspotRepository;
    this.vendorRepository = vendorRepository;
    this.customerRepository = customerRepository;
    this.mailerService = mailerService;
  }

  public List<Hotspot> findAll() {
    return hotspotRepository.findAll();
  }

  public List<Hotspot> findByVendor(Long uid) {
    return hotspotRepository.findByVendor_Uid(uid);
  }

  public Hotspot findOne(Long id) {
    return hotspotRepository.findById(id)
        .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Hotspot not found"));
  }

  public Hotspot createFromVendor(Long vendorUid, CreateHotspotDto dto) {
    Vendor vendor = vendorRepository.findByUid(vendorUid)
        .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Vendor not found"));

    List<String> missing = new ArrayList<>();
    if (isBlank(vendor.getShopName())) missing.add("shopName");
    if (isBlank(vendor.getShopAddress())) missing.add("shopAddress");
    if (isBlank(vendor.getArea())) missing.add("area");
    if (isBlank(vendor.getCity())) missing.add("city");
    if (isBlank(vendor.getState())) missing.add("state");

    if (!missing.isEmpty()) {
      throw new ResponseStatusException(
          HttpStatus.BAD_REQUEST,
          "Complete vendor profile before creating hotspots: missing " + String.join(", ", missing)
      );
    }

    DietType vegNonVeg = dto.getVegNonveg() != null ? dto.getVegNonveg() : vendor.getVegNonveg();
    if (vegNonVeg == null) {
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "veg_nonveg must be provided");
    }

    Integer normalizedDuration = dto.getDuration();
    if (normalizedDuration != null && normalizedDuration <= 24) {
      normalizedDuration = normalizedDuration * 60;
    }

    Hotspot hotspot = new Hotspot();
    hotspot.setVendor(vendor);
    hotspot.setVid(vendor.getVid());

    hotspot.setMealName(dto.getMealName());
    hotspot.setMealCount(dto.getMealCount());
    hotspot.setPrice(dto.getPrice() != null ? BigDecimal.valueOf(dto.getPrice()) : null);
    hotspot.setDuration(normalizedDuration);
    hotspot.setVegNonveg(vegNonVeg);

    hotspot.setShopName(vendor.getShopName());
    hotspot.setShopAddress(vendor.getShopAddress());
    hotspot.setArea(vendor.getArea());
    hotspot.setCity(vendor.getCity());
    hotspot.setState(vendor.getState());
    hotspot.setLatitude(vendor.getLatitude());
    hotspot.setLongitude(vendor.getLongitude());
    hotspot.setShopImage(vendor.getShopImage());

    Hotspot saved = hotspotRepository.save(hotspot);
    notifyCustomersIfNearby(saved);
    return saved;
  }

  public Hotspot updateForVendor(Long vendorUid, Long hotspotId, UpdateHotspotDto dto) {
    Hotspot hotspot = hotspotRepository.findById(hotspotId)
        .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Hotspot not found"));

    if (hotspot.getVendor() == null || !vendorUid.equals(hotspot.getVendor().getUid())) {
      throw new ResponseStatusException(HttpStatus.FORBIDDEN, "You cannot update another vendor's hotspot");
    }

    if (dto.getShopName() != null) hotspot.setShopName(dto.getShopName());
    if (dto.getShopAddress() != null) hotspot.setShopAddress(dto.getShopAddress());
    if (dto.getArea() != null) hotspot.setArea(dto.getArea());
    if (dto.getCity() != null) hotspot.setCity(dto.getCity());
    if (dto.getState() != null) hotspot.setState(dto.getState());
    if (dto.getLatitude() != null) hotspot.setLatitude(BigDecimal.valueOf(dto.getLatitude()));
    if (dto.getLongitude() != null) hotspot.setLongitude(BigDecimal.valueOf(dto.getLongitude()));
    if (dto.getShopImage() != null) hotspot.setShopImage(dto.getShopImage());
    if (dto.getVegNonveg() != null) hotspot.setVegNonveg(dto.getVegNonveg());
    if (dto.getMealName() != null) hotspot.setMealName(dto.getMealName());
    if (dto.getMealCount() != null) hotspot.setMealCount(dto.getMealCount());
    if (dto.getPrice() != null) hotspot.setPrice(BigDecimal.valueOf(dto.getPrice()));
    if (dto.getDuration() != null) hotspot.setDuration(dto.getDuration());

    return hotspotRepository.save(hotspot);
  }

  public void removeForVendor(Long vendorUid, Long hotspotId) {
    Hotspot hotspot = hotspotRepository.findById(hotspotId)
        .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Hotspot not found"));

    if (hotspot.getVendor() == null || !vendorUid.equals(hotspot.getVendor().getUid())) {
      throw new ResponseStatusException(HttpStatus.FORBIDDEN, "You cannot delete another vendor's hotspot");
    }

    hotspotRepository.delete(hotspot);
  }

  public void notifyCustomersIfNearby(Hotspot hotspot) {
    List<Customer> customers = customerRepository.findByArea(hotspot.getArea());
    logger.info("Found {} customers in area {}", customers.size(), hotspot.getArea());

    for (Customer customer : customers) {
      if (customer.getUser() != null && customer.getUser().getEmail() != null) {
        try {
          mailerService.sendMail(
              customer.getUser().getEmail(),
              "New " + hotspot.getVegNonveg() + " meal available near you!",
              "Hi " + (customer.getUsername() != null ? customer.getUsername() : customer.getUser().getEmail()) + ",\n" +
                  "A new meal hotspot is available!\n\n" +
                  "Shop: " + hotspot.getShopName() + "\n" +
                  "Address: " + hotspot.getShopAddress() + "\n" +
                  "Meal: " + hotspot.getMealName() + "\n" +
                  "Price: INR " + hotspot.getPrice() + "\n\n" +
                  "Hurry before it is gone!"
          );
        } catch (Exception ex) {
          logger.warn("Failed to send to {}: {}", customer.getUser().getEmail(), ex.getMessage());
        }
      }
    }
  }

  private boolean isBlank(String value) {
    return value == null || value.trim().isEmpty();
  }
}
