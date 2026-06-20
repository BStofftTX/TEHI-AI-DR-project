package com.tehi.backend.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenApiConfig {

    @Bean
    public OpenAPI tehiOpenApi() {
        return new OpenAPI().info(new Info()
            .title("TEHI Backend API")
            .version("v1")
            .description("Backend services for TEHI mobile and dashboard applications")
            .license(new License().name("Internal")));
    }
}
