package com.anouar.grabit;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.session.jdbc.config.annotation.web.http.EnableJdbcHttpSession;

@SpringBootApplication
@EnableJdbcHttpSession
public class GrabitApplication {

	public static void main(String[] args) {

		SpringApplication.run(GrabitApplication.class, args);
	}

}
