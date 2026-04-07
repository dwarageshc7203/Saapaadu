package com.saapaadu.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.saapaadu.entity.DietType;

public class UpdateHotspotDto {
  private String shopName;
  private String shopAddress;
  private String area;
  private String city;
  private String state;
  private Double latitude;
  private Double longitude;
  private String shopImage;

  @JsonProperty("veg_nonveg")
  private DietType vegNonveg;

  private String mealName;
  private Integer mealCount;
  private Double price;
  private Integer duration;

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

  public Double getLatitude() {
    return latitude;
  }

  public void setLatitude(Double latitude) {
    this.latitude = latitude;
  }

  public Double getLongitude() {
    return longitude;
  }

  public void setLongitude(Double longitude) {
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

  public Double getPrice() {
    return price;
  }

  public void setPrice(Double price) {
    this.price = price;
  }

  public Integer getDuration() {
    return duration;
  }

  public void setDuration(Integer duration) {
    this.duration = duration;
  }
}
