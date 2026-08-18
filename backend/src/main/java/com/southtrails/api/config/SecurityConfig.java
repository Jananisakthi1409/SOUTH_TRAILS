package com.southtrails.api.config;

import com.southtrails.api.security.JwtAuthenticationFilter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
public class SecurityConfig {

    @Bean
    SecurityFilterChain securityFilterChain(HttpSecurity http, JwtAuthenticationFilter jwtFilter) throws Exception {
        http
                .csrf((csrf) -> csrf.disable())
                .cors(Customizer.withDefaults())
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()
                        .requestMatchers("/api/auth/**", "/api/health", "/api-docs/**", "/swaggerui.html", "/swagger-ui/**", "/h2-console/**").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/packages/**", "/api/reviews/**", "/api/ecosystem/**", "/uploads/**").permitAll()
                        .requestMatchers(HttpMethod.POST, "/api/ai/itinerary", "/api/ai/oracle/chat").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/ai/recommendations", "/api/ai/sentiment/reviews").permitAll()
                        .requestMatchers(HttpMethod.POST, "/api/contact-requests").permitAll()
                        .requestMatchers(HttpMethod.POST, "/api/bookings").hasAnyRole("CUSTOMER", "ADMIN")
                        .requestMatchers("/api/bookings/customer/**", "/api/wishlist/**", "/api/ai/notifications/**").hasAnyRole("CUSTOMER", "ADMIN")
                        .requestMatchers(HttpMethod.GET, "/api/bookings/**").hasAnyRole("CUSTOMER", "ADMIN")
                        .requestMatchers(HttpMethod.POST, "/api/reviews").hasAnyRole("CUSTOMER", "ADMIN")
                        .requestMatchers(HttpMethod.GET, "/api/customers/*").hasAnyRole("CUSTOMER", "ADMIN")
                        .requestMatchers(HttpMethod.PUT, "/api/customers/*").hasAnyRole("CUSTOMER", "ADMIN")
                        .requestMatchers("/api/admin/**", "/api/packages/**", "/api/uploads/**", "/api/customers/**", "/api/analytics/**", "/api/bookings/**").hasRole("ADMIN")
                        .anyRequest().authenticated()
                )
                .headers(headers -> headers.frameOptions(frame -> frame.sameOrigin()))
                .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
