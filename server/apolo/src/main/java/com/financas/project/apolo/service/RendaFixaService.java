package com.financas.project.apolo.service;

import com.financas.project.apolo.entity.RendaFixa;
import com.financas.project.apolo.repository.RendaFixaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;

@Service
public class RendaFixaService {

    @Autowired
    private RendaFixaRepository repository;

    public RendaFixa initialize(RendaFixa renda) {
       return repository.save(renda);
    }
}
