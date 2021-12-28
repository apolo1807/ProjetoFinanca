package com.financas.project.apolo.controller;

import com.financas.project.apolo.entity.Notifications;
import com.financas.project.apolo.entity.PessoaisFinancas;
import com.financas.project.apolo.repository.NotificationsRepository;
import com.financas.project.apolo.repository.PessoaisFinancasRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/notifications")
public class NotificationsController {

    @Autowired
    private NotificationsRepository repository;

    @PostMapping
    public Notifications save(@RequestBody @Valid Notifications notifications) {
        return repository.save(notifications);
    }

    @GetMapping("{id}")
    public Notifications findById(@PathVariable("id") long id) {
        return repository.findById(id)
                .orElseThrow(() ->
                        new ResponseStatusException(HttpStatus.NOT_FOUND));
    }

    @GetMapping
    public List<Notifications> getNotifications() {
        return repository.findAll();
    }
}
