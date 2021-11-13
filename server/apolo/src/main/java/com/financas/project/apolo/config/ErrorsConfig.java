package com.financas.project.apolo.config;

import org.springframework.context.MessageSource;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.support.ReloadableResourceBundleMessageSource;
import org.springframework.validation.beanvalidation.LocalValidatorFactoryBean;

import java.util.Locale;

@Configuration
public class ErrorsConfig {

    @Bean
    public MessageSource message() {

        ReloadableResourceBundleMessageSource source = new ReloadableResourceBundleMessageSource();
        source.setBasename("classpath:messages");
        source.setDefaultEncoding("ISO-8859-1");
        source.setDefaultLocale(Locale.getDefault());

        return source;
    }

    @Bean
    public LocalValidatorFactoryBean factoryBean() {
        LocalValidatorFactoryBean bean = new LocalValidatorFactoryBean();
        bean.setValidationMessageSource(message());
        return bean;
    }
}
