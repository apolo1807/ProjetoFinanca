package com.financas.project.apolo.controller;

import com.financas.project.apolo.entity.RendaFixa;
import com.financas.project.apolo.repository.RendaFixaRepository;
import com.financas.project.apolo.service.RendaFixaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/renda")
public class RendaFixaController {

    @Autowired
    private RendaFixaRepository repository;

    @Autowired
    private RendaFixaService service;

    @PostMapping("/new")
    public RendaFixa salvar(@RequestBody @Valid RendaFixa rendaFixa){
        return service.initialize(rendaFixa);
    }

    @GetMapping
    public List<RendaFixa> findAll() {
        return repository.findAll();
    }

    @GetMapping("{id}")
    public RendaFixa findById(@PathVariable("id") Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Renda Fixa não encontrada"));
    }

    @DeleteMapping("{id}")
    public void deletar(RendaFixa entity){
        repository.deleteById(entity.getId());
    }

}
