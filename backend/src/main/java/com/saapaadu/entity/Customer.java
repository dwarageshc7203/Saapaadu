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
import java.util.List;

@Entity
public class Customer {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long cid;

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
  private String address;

  @Column
  private String area;

  @Column
  private String city;

  @Column
  private String state;

  @OneToMany(mappedBy = "customer")
  @com.fasterxml.jackson.annotation.JsonIgnore
  private List<Order> orders;

  public Long getCid() {
    return cid;
  }

  public void setCid(Long cid) {
    this.cid = cid;
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

  public String getAddress() {
    return address;
  }

  public void setAddress(String address) {
    this.address = address;
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

  public List<Order> getOrders() {
    return orders;
  }

  public void setOrders(List<Order> orders) {
    this.orders = orders;
  }
}
