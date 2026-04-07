package com.saapaadu.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.saapaadu.entity.DietType;
import jakarta.validation.constraints.Size;
import java.math.BigDecimal;

public class UpdateVendorDto {
  @Size(max = 50)
  private String phoneNumber;

  @JsonProperty("veg_nonveg")
  private DietType vegNonveg;

  @Size(max = 200)
  private String shopName;

  @Size(max = 255)
  private String shopAddress;

  @Size(max = 100)
  private String area;

  @Size(max = 100)
  private String city;

  @Size(max = 100)
  private String state;

  private BigDecimal latitude;
  private BigDecimal longitude;

  private String shopImage;
  private Boolean verification;

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

  public Boolean getVerification() {
    return verification;
  }

  public void setVerification(Boolean verification) {
    this.verification = verification;
  }
}
