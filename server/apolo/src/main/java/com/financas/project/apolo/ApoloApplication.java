package com.financas.project.apolo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;

@SpringBootApplication
@EnableCaching
public class ApoloApplication {

    public static void main(String[] args) {
        SpringApplication.run(ApoloApplication.class, args);
    }

}
