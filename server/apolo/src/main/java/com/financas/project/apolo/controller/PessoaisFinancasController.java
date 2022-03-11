package com.financas.project.apolo.controller;

import com.financas.project.apolo.entity.PessoaisFinancas;
import com.financas.project.apolo.entity.PessoasFinancasCalculo;
import com.financas.project.apolo.repository.PessoaisFinancasRepository;
import com.financas.project.apolo.repository.RendaFixaRepository;
import com.financas.project.apolo.service.PessoaisCalculosService;
import com.financas.project.apolo.service.PessoaisFinancasService;
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
@RequestMapping("/api/financas-pessoais")
public class PessoaisFinancasController {

    @Autowired
    private PessoaisFinancasRepository repository;

    @Autowired
    private PessoaisFinancasService service;

    @PostMapping("new")
    @CacheEvict(value = "calculos", allEntries = true)
    public PessoaisFinancas save(@RequestBody @Valid PessoaisFinancas entity) {
        return service.intitialize(entity);
    }

    @GetMapping
    public Page<PessoaisFinancas> getFinancas(
            @PageableDefault(direction = Sort.Direction.ASC, page = 0, size = 5) Pageable pageable) {
        return repository.findAll(pageable);
    }

    @PostMapping("/declararPago")
    @CacheEvict(value = "calculos", allEntries = true)
    public PessoaisFinancas declararPago(@RequestBody PessoaisFinancas entity) throws Exception {
        return service.declararPago(entity);
    }

    @GetMapping("{id}")
    public PessoaisFinancas findById(@PathVariable("id") long id) {
        return repository.findById(id)
                .orElseThrow(() ->
                        new ResponseStatusException(HttpStatus.NOT_FOUND, "Finança não encontrada"));
    }

    @DeleteMapping("{id}")
    @CacheEvict(value = "calculos", allEntries = true)
    public void deletar(PessoaisFinancas entity) {
        repository.deleteById(entity.getId());
    }
}
