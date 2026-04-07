package com.saapaadu.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import java.math.BigDecimal;
import java.util.List;

@Entity
public class Vendor {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long vid;

  @Column(nullable = false)
  private Long uid;

  @OneToOne(fetch = FetchType.EAGER)
  @JoinColumn(name = "uid", insertable = false, updatable = false)
  @JsonIgnoreProperties({"customer", "vendor"})
  private User user;

  @Column(nullable = false)
  private String username;

  @Column
  private String phoneNumber;

  @Enumerated(EnumType.STRING)
  @Column(name = "veg_nonveg")
  @JsonProperty("veg_nonveg")
  private DietType vegNonveg;

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

  @Column(nullable = false)
  private boolean verification = false;

  @OneToMany(mappedBy = "vendor")
  @com.fasterxml.jackson.annotation.JsonIgnore
  private List<Hotspot> hotspots;

  @OneToMany(mappedBy = "vendor")
  @com.fasterxml.jackson.annotation.JsonIgnore
  private List<Order> orders;

  public Long getVid() {
    return vid;
  }

  public void setVid(Long vid) {
    this.vid = vid;
  }

  public Long getUid() {
    return uid;
  }

  public void setUid(Long uid) {
    this.uid = uid;
  }

  public User getUser() {
    return user;
  }

  public void setUser(User user) {
    this.user = user;
  }

  public String getUsername() {
    return username;
  }

  public void setUsername(String username) {
    this.username = username;
  }

  public String getPhoneNumber() {
    return phoneNumber;
  }

  public void setPhoneNumber(String phoneNumber) {
    this.phoneNumber = phoneNumber;
  }

  public DietType getVegNonveg() {
    return vegNonveg;
  }

  public void setVegNonveg(DietType vegNonveg) {
    this.vegNonveg = vegNonveg;
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

  public boolean isVerification() {
    return verification;
  }

  public void setVerification(boolean verification) {
    this.verification = verification;
  }

  public List<Hotspot> getHotspots() {
    return hotspots;
  }

  public void setHotspots(List<Hotspot> hotspots) {
    this.hotspots = hotspots;
  }

  public List<Order> getOrders() {
    return orders;
  }

  public void setOrders(List<Order> orders) {
    this.orders = orders;
  }
}
