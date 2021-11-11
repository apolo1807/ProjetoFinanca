package com.financas.project.apolo.service;

import com.financas.project.apolo.controller.PessoaisFinancasController;
import com.financas.project.apolo.entity.PessoaisFinancas;
import com.financas.project.apolo.repository.PessoaisFinancasRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

@Service
public class PessoaisFinancasService {

    @Autowired
    private PessoaisFinancasRepository repository;
    private PessoaisFinancas entity;
    private PessoaisFinancasController dao;

    @GetMapping
    private void salvar(){
        dao.save(entity);
    }


}
