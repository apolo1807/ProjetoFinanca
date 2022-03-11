package com.financas.project.apolo.service;

import com.financas.project.apolo.entity.PessoaisFinancas;
import com.financas.project.apolo.entity.RendaFixa;
import com.financas.project.apolo.repository.RendaFixaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Service;

@Service
public class RendaFixaService {

    @Autowired
    private RendaFixaRepository repository;

    @Autowired
    private PessoaisFinancasService service;

    public RendaFixa initialize(RendaFixa renda) {
        return repository.save(renda);
    }
}
