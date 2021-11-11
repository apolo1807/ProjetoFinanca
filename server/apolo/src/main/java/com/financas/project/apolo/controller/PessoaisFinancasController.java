package com.financas.project.apolo.controller;

import com.financas.project.apolo.entity.PessoaisFinancas;
import com.financas.project.apolo.repository.PessoaisFinancasRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import javax.validation.Valid;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.List;

@RestController
@RequestMapping("/api/financas/pessoais")
public class PessoaisFinancasController {

    @Autowired
    private PessoaisFinancasRepository repository;

    @PostMapping("/new")
    public PessoaisFinancas save(@RequestBody @Valid PessoaisFinancas entity) {

        if(entity.getIsParcelado()) {
            entity.setParcelas(entity.getValor()
                    .divide(BigDecimal.valueOf(entity.getValorParcelas()),
                            2, RoundingMode.HALF_EVEN));
        }

        return repository.save(entity);
    }

    @GetMapping
    public List<PessoaisFinancas> getFinancas() {
        return repository.findAll();
    }

    @GetMapping("{id}")
    public PessoaisFinancas findById(@PathVariable Long id) {
        return repository.findById(id)
                .orElseThrow(() ->
                        new ResponseStatusException(HttpStatus.NOT_FOUND, "Finança não encontrada"));
    }

    @DeleteMapping("{id}")
    public void deletar(PessoaisFinancas entity) {
        repository.deleteById(entity.getId());
    }
}
