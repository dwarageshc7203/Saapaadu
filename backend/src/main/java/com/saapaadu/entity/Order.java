package com.saapaadu.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import org.hibernate.annotations.CreationTimestamp;

@Entity
@Table(name = "orders")
public class Order {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long oid;

  @Column(nullable = false)
  private Long cid;

  @ManyToOne
  @JoinColumn(name = "cid", insertable = false, updatable = false)
  @JsonIgnoreProperties({"orders", "user"})
  private Customer customer;

  @Column(nullable = false)
  private Long vid;

  @ManyToOne
  @JoinColumn(name = "vid", insertable = false, updatable = false)
  @JsonIgnoreProperties({"orders", "hotspots", "user"})
  private Vendor vendor;

  @Column
  private Long hid;

  @ManyToOne
  @JoinColumn(name = "hid", insertable = false, updatable = false)
  @JsonIgnoreProperties({"vendor"})
  private Hotspot hotspot;

  @Column(nullable = false)
  private Integer quantity;

  @Column(precision = 10, scale = 2, nullable = false)
  private BigDecimal totalPrice;

  @Enumerated(EnumType.STRING)
  @Column(nullable = false)
  private OrderStatus status = OrderStatus.pending;

  @CreationTimestamp
  private LocalDateTime createdAt;

  public Long getOid() {
    return oid;
  }

  public void setOid(Long oid) {
    this.oid = oid;
  }

  public Long getCid() {
    return cid;
  }

  public void setCid(Long cid) {
    this.cid = cid;
  }

  public Customer getCustomer() {
    return customer;
  }

  public void setCustomer(Customer customer) {
    this.customer = customer;
  }

  public Long getVid() {
    return vid;
  }

  public void setVid(Long vid) {
    this.vid = vid;
  }

  public Vendor getVendor() {
    return vendor;
  }

  public void setVendor(Vendor vendor) {
    this.vendor = vendor;
  }

  public Long getHid() {
    return hid;
  }

  public void setHid(Long hid) {
    this.hid = hid;
  }

  public Hotspot getHotspot() {
    return hotspot;
  }

  public void setHotspot(Hotspot hotspot) {
    this.hotspot = hotspot;
  }

  public Integer getQuantity() {
    return quantity;
  }

  public void setQuantity(Integer quantity) {
    this.quantity = quantity;
  }

  public BigDecimal getTotalPrice() {
    return totalPrice;
  }

  public void setTotalPrice(BigDecimal totalPrice) {
    this.totalPrice = totalPrice;
  }

  public OrderStatus getStatus() {
    return status;
  }

  public void setStatus(OrderStatus status) {
    this.status = status;
  }

  public LocalDateTime getCreatedAt() {
    return createdAt;
  }

  public void setCreatedAt(LocalDateTime createdAt) {
    this.createdAt = createdAt;
  }
}
