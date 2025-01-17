package com.yermolenko.minecraftserver.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.Http403ForbiddenEntryPoint;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.csrf().disable() // Disable CSRF for stateless API
                .authorizeRequests()
                .requestMatchers("/api/minecraft-login", "/api/other-public-endpoints/**").permitAll()
                .anyRequest().authenticated() // Require authentication for other API endpoints
                .and()
                .httpBasic() // Basic authentication, can be replaced by JWT or other methods later
                .and()
                .exceptionHandling().defaultAuthenticationEntryPointFor(new Http403ForbiddenEntryPoint(), new AntPathRequestMatcher("/**")); // Deny access to localhost:8080

        return http.build();
    }
}
