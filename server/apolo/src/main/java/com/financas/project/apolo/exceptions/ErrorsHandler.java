package com.financas.project.apolo.exceptions;

import lombok.Getter;

import java.util.Arrays;
import java.util.List;

public class ErrorsHandler {

    @Getter
    private List<String> erros;

    public ErrorsHandler(List<String> errors) {
        this.erros = errors;
    }

    public ErrorsHandler(String message) {
        this.erros = Arrays.asList(message);
    }

}
