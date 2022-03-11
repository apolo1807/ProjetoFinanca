package com.financas.project.apolo.controller;

import com.financas.project.apolo.entity.GastosFixos;
import com.financas.project.apolo.entity.PessoasFinancasCalculo;
import com.financas.project.apolo.service.PessoaisCalculosService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/api/calculos")
public class CalculoController {

    @Autowired
    private PessoaisCalculosService calculosService;

    @Cacheable(value = "calculos")
    @GetMapping
    public PessoasFinancasCalculo calcular() {
        return calculosService.calculoValores();
    }

}
