package com.saapaadu.config;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.env.EnvironmentPostProcessor;
import org.springframework.core.Ordered;
import org.springframework.core.env.ConfigurableEnvironment;
import org.springframework.core.env.MapPropertySource;

public class DotenvEnvironmentPostProcessor implements EnvironmentPostProcessor, Ordered {
  private static final String PROPERTY_SOURCE_NAME = "dotenv";

  @Override
  public void postProcessEnvironment(ConfigurableEnvironment environment, SpringApplication application) {
    Map<String, Object> values = new HashMap<>();
    loadFromFile(Paths.get("backend", ".env"), values);
    loadFromFile(Paths.get(".env"), values);

    if (!values.isEmpty() && environment.getPropertySources().get(PROPERTY_SOURCE_NAME) == null) {
      environment.getPropertySources().addLast(new MapPropertySource(PROPERTY_SOURCE_NAME, values));
    }
  }

  @Override
  public int getOrder() {
    return Ordered.LOWEST_PRECEDENCE;
  }

  private void loadFromFile(Path path, Map<String, Object> values) {
    if (!Files.exists(path)) {
      return;
    }
    try {
      List<String> lines = Files.readAllLines(path, StandardCharsets.UTF_8);
      for (String line : lines) {
        String trimmed = line.trim();
        if (trimmed.isEmpty() || trimmed.startsWith("#")) {
          continue;
        }
        int idx = trimmed.indexOf('=');
        if (idx <= 0) {
          continue;
        }
        String key = trimmed.substring(0, idx).trim();
        String value = trimmed.substring(idx + 1).trim();
        value = stripQuotes(value);
        if (!key.isEmpty()) {
          values.putIfAbsent(key, value);
        }
      }
    } catch (IOException ignored) {
      // Ignore dotenv read failures; environment variables take precedence.
    }
  }

  private String stripQuotes(String value) {
    if (value.length() >= 2) {
      char first = value.charAt(0);
      char last = value.charAt(value.length() - 1);
      if ((first == '"' && last == '"') || (first == '\'' && last == '\'')) {
        return value.substring(1, value.length() - 1);
      }
    }
    return value;
  }
}
