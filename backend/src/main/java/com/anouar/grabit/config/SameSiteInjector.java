package com.anouar.grabit.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.session.web.http.CookieSerializer;
import org.springframework.session.web.http.DefaultCookieSerializer;

@Configuration
public class SameSiteInjector  {

    @Bean
        public CookieSerializer cookieSerializer() {
            DefaultCookieSerializer cookieSerializer = new DefaultCookieSerializer();
            cookieSerializer.setSameSite("None");
            cookieSerializer.setUseSecureCookie(true);
            return cookieSerializer;
        }

}