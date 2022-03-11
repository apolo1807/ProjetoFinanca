package com.financas.project.apolo.controller;

import com.financas.project.apolo.entity.GastosFixos;
import com.financas.project.apolo.repository.GastosFixosRepository;
import com.financas.project.apolo.service.GastosFixosService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/gastos")
public class GastosFixosController {

    @Autowired
    private GastosFixosRepository repository;

    @Autowired
    private GastosFixosService service;

    @GetMapping
    public Page<GastosFixos> findAll(
            @PageableDefault(direction = Sort.Direction.ASC, page = 0, size = 10) Pageable pageable) {

        return repository.findAll(pageable);
    }

    @PostMapping(value = "/new")
    @CacheEvict(value = "calculos", allEntries = true)
    public GastosFixos save(@RequestBody @Valid GastosFixos entity) {
        return service.initialize(entity);
    }

    @GetMapping("{id}")
    public GastosFixos findById(@PathVariable("id") Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Gastos não encontrado"));
    }

    @DeleteMapping("{id}")
    @CacheEvict(value = "calculos", allEntries = true)
    public void delete(GastosFixos entity) {
        repository.deleteById(entity.getId());
    }
}