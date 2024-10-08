package com.skillstorm.project1.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addViewControllers(ViewControllerRegistry registry) {
        // Only forward non-API paths to the frontend
        registry.addViewController("/{path:[^\\.]+}")
                .setViewName("forward:/");
    }
}


