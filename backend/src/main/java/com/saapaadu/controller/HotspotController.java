package com.saapaadu.controller;

import com.saapaadu.dto.CreateHotspotDto;
import com.saapaadu.dto.UpdateHotspotDto;
import com.saapaadu.entity.Hotspot;
import com.saapaadu.entity.User;
import com.saapaadu.service.CurrentUserService;
import com.saapaadu.service.HotspotService;
import jakarta.validation.Valid;
import java.util.List;
import java.util.Map;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/hotspots")
public class HotspotController {
  private final HotspotService hotspotService;
  private final CurrentUserService currentUserService;

  public HotspotController(HotspotService hotspotService, CurrentUserService currentUserService) {
    this.hotspotService = hotspotService;
    this.currentUserService = currentUserService;
  }

  @GetMapping
  public List<Hotspot> findAll() {
    return hotspotService.findAll();
  }

  @GetMapping("/my")
  public List<Hotspot> findMine(Authentication authentication) {
    User user = currentUserService.requireUser(authentication);
    return hotspotService.findByVendor(user.getId());
  }

  @PostMapping
  public Hotspot create(Authentication authentication, @Valid @RequestBody CreateHotspotDto dto) {
    User user = currentUserService.requireUser(authentication);
    return hotspotService.createFromVendor(user.getId(), dto);
  }

  @GetMapping("/{id}")
  public Hotspot findOne(@PathVariable("id") Long id) {
    return hotspotService.findOne(id);
  }

  @PatchMapping("/{id}")
  public Hotspot update(Authentication authentication, @PathVariable("id") Long id, @RequestBody UpdateHotspotDto dto) {
    User user = currentUserService.requireUser(authentication);
    return hotspotService.updateForVendor(user.getId(), id, dto);
  }

  @DeleteMapping("/{id}")
  public Map<String, Object> remove(Authentication authentication, @PathVariable("id") Long id) {
    User user = currentUserService.requireUser(authentication);
    hotspotService.removeForVendor(user.getId(), id);
    return Map.of("message", "Hotspot deleted successfully");
  }
}
