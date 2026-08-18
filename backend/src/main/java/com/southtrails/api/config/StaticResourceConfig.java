package com.southtrails.api.config;

import java.nio.file.Path;
import java.nio.file.Paths;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class StaticResourceConfig implements WebMvcConfigurer {

    @Override
    public void addResourceHandlers(@org.springframework.lang.NonNull ResourceHandlerRegistry registry) {
        Path uploadRoot = Paths.get("uploads").toAbsolutePath().normalize();
        registry.addResourceHandler("/uploads/**")
                .addResourceLocations(uploadRoot.toUri().toString());
    }
}
