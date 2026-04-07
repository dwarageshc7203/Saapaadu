package com.saapaadu.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import org.hibernate.annotations.CreationTimestamp;

@Entity
public class Hotspot {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long hid;

  @Column(nullable = false)
  private Long vid;

  @ManyToOne
  @JoinColumn(name = "vid", insertable = false, updatable = false)
  @JsonIgnoreProperties({"hotspots", "orders", "user"})
  private Vendor vendor;

  @Column
  private String shopName;

  @Column
  private String shopAddress;

  @Column
  private String area;

  @Column
  private String city;

  @Column
  private String state;

  @Column(precision = 10, scale = 6)
  private BigDecimal latitude;

  @Column(precision = 10, scale = 6)
  private BigDecimal longitude;

  @Column
  private String shopImage;

  @Enumerated(EnumType.STRING)
  @Column(name = "veg_nonveg")
  @JsonProperty("veg_nonveg")
  private DietType vegNonveg;

  @Column
  private String mealName;

  @Column
  private Integer mealCount;

  @Column(precision = 10, scale = 2)
  private BigDecimal price;

  @Column
  private Integer duration;

  @CreationTimestamp
  @Column(updatable = false)
  private LocalDateTime createdAt;

  public Long getHid() {
    return hid;
  }

  public void setHid(Long hid) {
    this.hid = hid;
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

  public String getShopName() {
    return shopName;
  }

  public void setShopName(String shopName) {
    this.shopName = shopName;
  }

  public String getShopAddress() {
    return shopAddress;
  }

  public void setShopAddress(String shopAddress) {
    this.shopAddress = shopAddress;
  }

  public String getArea() {
    return area;
  }

  public void setArea(String area) {
    this.area = area;
  }

  public String getCity() {
    return city;
  }

  public void setCity(String city) {
    this.city = city;
  }

  public String getState() {
    return state;
  }

  public void setState(String state) {
    this.state = state;
  }

  public BigDecimal getLatitude() {
    return latitude;
  }

  public void setLatitude(BigDecimal latitude) {
    this.latitude = latitude;
  }

  public BigDecimal getLongitude() {
    return longitude;
  }

  public void setLongitude(BigDecimal longitude) {
    this.longitude = longitude;
  }

  public String getShopImage() {
    return shopImage;
  }

  public void setShopImage(String shopImage) {
    this.shopImage = shopImage;
  }

  public DietType getVegNonveg() {
    return vegNonveg;
  }

  public void setVegNonveg(DietType vegNonveg) {
    this.vegNonveg = vegNonveg;
  }

  public String getMealName() {
    return mealName;
  }

  public void setMealName(String mealName) {
    this.mealName = mealName;
  }

  public Integer getMealCount() {
    return mealCount;
  }

  public void setMealCount(Integer mealCount) {
    this.mealCount = mealCount;
  }

  public BigDecimal getPrice() {
    return price;
  }

  public void setPrice(BigDecimal price) {
    this.price = price;
  }

  public Integer getDuration() {
    return duration;
  }

  public void setDuration(Integer duration) {
    this.duration = duration;
  }

  public LocalDateTime getCreatedAt() {
    return createdAt;
  }

  public void setCreatedAt(LocalDateTime createdAt) {
    this.createdAt = createdAt;
  }
}
