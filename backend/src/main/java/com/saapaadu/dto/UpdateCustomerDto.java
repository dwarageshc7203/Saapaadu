package com.saapaadu.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.saapaadu.entity.DietType;
import jakarta.validation.constraints.Size;

public class UpdateCustomerDto {
  @Size(max = 50)
  private String phoneNumber;

  @JsonProperty("veg_nonveg")
  private DietType vegNonveg;

  @Size(max = 255)
  private String address;

  @Size(max = 100)
  private String area;

  @Size(max = 100)
  private String city;

  @Size(max = 100)
  private String state;

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
}
