package com.example.space.Config;

import com.example.space.Authentication.CustomOAuth2UserService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {
    //    @Bean
//    public SecurityFilterChain filterChain(HttpSecurity http,CustomOAuth2UserService customOAuth2UserService) throws Exception{
//        http
//                .cors(Customizer.withDefaults())
//                .csrf(csrf->csrf.disable())
//                .authorizeHttpRequests(auth->auth
//                        .requestMatchers("/","/login/**","/oauth2/**","/user/**","/urlChecker/**","/userDetails/**","/lastData/**","/fileScanning/**","/fetch-nasa-data").permitAll()
//                        .requestMatchers("/api/token-validation").permitAll()
//                        .anyRequest().authenticated()
//                )
//                .oauth2Login(oauth2->oauth2
//                        .userInfoEndpoint(userInfo->userInfo
//                                .userService(customOAuth2UserService))
//                        .defaultSuccessUrl("/redirect",true));
//        return http.build();
//    }
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable())
                .authorizeHttpRequests(auth -> auth.anyRequest().permitAll());
        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }
}
