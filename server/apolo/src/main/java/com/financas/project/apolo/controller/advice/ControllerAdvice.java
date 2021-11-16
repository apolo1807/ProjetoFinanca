package com.financas.project.apolo.controller.advice;

import com.financas.project.apolo.exceptions.ErrorsHandler;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.stream.Collectors;

@RestControllerAdvice
public class ControllerAdvice {

    @ExceptionHandler(MethodArgumentNotValidException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public Object handleValidationErros(MethodArgumentNotValidException ex) {
        BindingResult bind = ex.getBindingResult();
        List<String> messages = bind.getAllErrors()
                .stream()
                .map(objectError -> objectError.getDefaultMessage())
                .collect(Collectors.toList());

        return new ErrorsHandler(messages);
    }

    @ExceptionHandler(ResponseStatusException.class)
    public ResponseEntity handleValidationErrosNotFound(ResponseStatusException ex) {
        String message = ex.getMessage();
        HttpStatus status = ex.getStatus();
        ErrorsHandler handler = new ErrorsHandler(message);
        return new ResponseEntity(handler, status);
    }


}
