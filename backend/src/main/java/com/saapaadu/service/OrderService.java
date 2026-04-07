package com.saapaadu.service;

import com.saapaadu.dto.CreateOrderDto;
import com.saapaadu.dto.OrderView;
import com.saapaadu.dto.UpdateOrderDto;
import com.saapaadu.entity.Customer;
import com.saapaadu.entity.Hotspot;
import com.saapaadu.entity.Order;
import com.saapaadu.entity.OrderStatus;
import com.saapaadu.entity.User;
import com.saapaadu.entity.Vendor;
import com.saapaadu.repository.CustomerRepository;
import com.saapaadu.repository.HotspotRepository;
import com.saapaadu.repository.OrderRepository;
import com.saapaadu.repository.UserRepository;
import com.saapaadu.repository.VendorRepository;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
public class OrderService {
  private static final Logger logger = LoggerFactory.getLogger(OrderService.class);

  private final OrderRepository orderRepository;
  private final HotspotRepository hotspotRepository;
  private final CustomerRepository customerRepository;
  private final UserRepository userRepository;
  private final VendorRepository vendorRepository;
  private final MailerService mailerService;

  public OrderService(
      OrderRepository orderRepository,
      HotspotRepository hotspotRepository,
      CustomerRepository customerRepository,
      UserRepository userRepository,
      VendorRepository vendorRepository,
      MailerService mailerService
  ) {
    this.orderRepository = orderRepository;
    this.hotspotRepository = hotspotRepository;
    this.customerRepository = customerRepository;
    this.userRepository = userRepository;
    this.vendorRepository = vendorRepository;
    this.mailerService = mailerService;
  }

  public Order create(Long uid, CreateOrderDto dto) {
    Customer customer = customerRepository.findByUid(uid).orElse(null);
    if (customer == null) {
      User user = userRepository.findById(uid)
          .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));
      customer = new Customer();
      customer.setUid(uid);
      customer.setUser(user);
      customer.setUsername(user.getUsername() != null ? user.getUsername() : user.getEmail());
      customer = customerRepository.save(customer);
    }

    Hotspot hotspot = hotspotRepository.findById(dto.getHid())
        .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Hotspot not found"));

    Integer durationMinutes = hotspot.getDuration();
    LocalDateTime createdAt = hotspot.getCreatedAt();
    if (durationMinutes != null && durationMinutes > 0 && createdAt != null) {
      LocalDateTime expiresAt = createdAt.plusMinutes(durationMinutes);
      if (LocalDateTime.now().isAfter(expiresAt)) {
        throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Hotspot has expired");
      }
    }

    BigDecimal price = hotspot.getPrice() != null ? hotspot.getPrice() : BigDecimal.ZERO;
    BigDecimal totalPrice = price.multiply(BigDecimal.valueOf(dto.getQuantity()));

    Order order = new Order();
    order.setCid(customer.getCid());
    order.setHid(hotspot.getHid());
    order.setVid(hotspot.getVid());
    order.setQuantity(dto.getQuantity());
    order.setTotalPrice(totalPrice);

    Order saved = orderRepository.save(order);

    if (hotspot.getMealCount() != null) {
      int remaining = Math.max(0, hotspot.getMealCount() - dto.getQuantity());
      hotspot.setMealCount(remaining);
      hotspotRepository.save(hotspot);
    }

    List<Customer> customersInArea = customerRepository.findByArea(hotspot.getArea());
    try {
      mailerService.notifyCustomersForHotspot(
          customersInArea,
          hotspot.getShopName(),
          hotspot.getMealName(),
          price.doubleValue(),
          hotspot.getArea()
      );
    } catch (Exception ex) {
      logger.warn("Mail error: {}", ex.getMessage());
    }

    return saved;
  }

  public List<OrderView> findByCustomer(Long uid) {
    Customer customer = customerRepository.findByUid(uid).orElse(null);
    if (customer == null) return List.of();

    List<Order> orders = orderRepository.findByCidOrderByCreatedAtDesc(customer.getCid());
    List<OrderView> response = new ArrayList<>();

    for (Order order : orders) {
      OrderView view = new OrderView();
      view.setOid(order.getOid());
      view.setStatus(order.getStatus() != null ? order.getStatus().name() : null);
      view.setQuantity(order.getQuantity());
      view.setTotalPrice(order.getTotalPrice());
      view.setCreatedAt(order.getCreatedAt());

      Hotspot hotspot = order.getHotspot();
      if (hotspot != null) {
        view.setMealName(hotspot.getMealName());
        view.setMealCount(hotspot.getMealCount());
        view.setPrice(hotspot.getPrice());
        view.setShopName(hotspot.getShopName());
        view.setShopAddress(hotspot.getShopAddress());
      }

      Vendor vendor = order.getVendor();
      if (vendor != null) {
        String vendorName = vendor.getShopName() != null ? vendor.getShopName() : vendor.getUsername();
        view.setVendorName(vendorName);
      }

      response.add(view);
    }

    return response;
  }

  public List<OrderView> findByVendor(Long uid) {
    Vendor vendor = vendorRepository.findByUid(uid).orElse(null);
    if (vendor == null) return List.of();

    List<Order> orders = orderRepository.findByVidOrderByCreatedAtDesc(vendor.getVid());
    List<OrderView> response = new ArrayList<>();

    for (Order order : orders) {
      OrderView view = new OrderView();
      view.setOid(order.getOid());
      view.setStatus(order.getStatus() != null ? order.getStatus().name() : null);
      view.setQuantity(order.getQuantity());
      view.setTotalPrice(order.getTotalPrice());
      view.setCreatedAt(order.getCreatedAt());

      Hotspot hotspot = order.getHotspot();
      if (hotspot != null) {
        view.setMealName(hotspot.getMealName());
        view.setMealCount(hotspot.getMealCount());
        view.setPrice(hotspot.getPrice());
        view.setShopName(hotspot.getShopName());
        view.setShopAddress(hotspot.getShopAddress());
      }

      Customer customer = order.getCustomer();
      if (customer != null) {
        String customerName = customer.getUsername() != null
            ? customer.getUsername()
            : "Customer #" + customer.getCid();
        view.setCustomerName(customerName);
      }

      response.add(view);
    }

    return response;
  }

  public Order update(Long oid, UpdateOrderDto updateData) {
    if (updateData == null || isEmpty(updateData)) {
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Update data cannot be empty");
    }

    Order order = orderRepository.findById(oid)
        .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Order with ID " + oid + " not found"));

    if (updateData.getStatus() != null) order.setStatus(updateData.getStatus());
    if (updateData.getQuantity() != null) order.setQuantity(updateData.getQuantity());
    if (updateData.getTotalPrice() != null) order.setTotalPrice(BigDecimal.valueOf(updateData.getTotalPrice()));
    if (updateData.getHid() != null) order.setHid(updateData.getHid());

    return orderRepository.save(order);
  }

  public Order findOne(Long oid) {
    return orderRepository.findById(oid)
        .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Order with ID " + oid + " not found"));
  }

  public List<Order> findAll() {
    return orderRepository.findAll();
  }

  public void remove(Long oid) {
    Order order = findOne(oid);
    orderRepository.delete(order);
  }

  public Order updateStatus(Long oid, OrderStatus status) {
    Order order = findOne(oid);
    order.setStatus(status);
    return orderRepository.save(order);
  }

  public List<Order> getMyOrders(Long customerId) {
    return orderRepository.findByCidOrderByCreatedAtDesc(customerId);
  }

  private boolean isEmpty(UpdateOrderDto updateData) {
    return updateData.getStatus() == null
        && updateData.getQuantity() == null
        && updateData.getTotalPrice() == null
        && updateData.getHid() == null;
  }
}
