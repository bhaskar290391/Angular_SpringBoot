package com.practise.ecommerce.config;

import com.okta.spring.boot.oauth.Okta;
import org.springframework.boot.autoconfigure.web.servlet.WebMvcProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.accept.ContentNegotiationStrategy;
import org.springframework.web.accept.HeaderContentNegotiationStrategy;

@Configuration
public class SpringConfiguration {

    @Bean
    SecurityFilterChain filterchain(HttpSecurity security) throws Exception {

        security.authorizeHttpRequests( configurer -> configurer.
                requestMatchers("/api/orders/**").
                authenticated().anyRequest().permitAll()).oauth2ResourceServer( resource ->
                resource.jwt(Customizer.withDefaults()));

        security.cors(Customizer.withDefaults());

        security.setSharedObject(ContentNegotiationStrategy.class, new HeaderContentNegotiationStrategy());

        // + non-empty response body for 401 (more friendly)
        Okta.configureResourceServer401ResponseBody(security);

        // we are not using Cookies for session tracking >> disable CSRF
        security.csrf(AbstractHttpConfigurer::disable);

        return security.build();
    }
}
