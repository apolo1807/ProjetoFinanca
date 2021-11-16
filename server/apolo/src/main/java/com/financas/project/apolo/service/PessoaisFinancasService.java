package com.financas.project.apolo.service;

import com.financas.project.apolo.entity.PessoaisFinancas;
import com.financas.project.apolo.repository.PessoaisFinancasRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;

@Service
public class PessoaisFinancasService {

    @Autowired
    private PessoaisFinancasRepository repository;

    public PessoaisFinancas intitialize(PessoaisFinancas entity) {
        getValorParcelado(entity);
        return repository.save(entity);
    }

    public PessoaisFinancas getValorParcelado(PessoaisFinancas entity) {
        if(entity.getIsParcelado()) {
            entity.setParcelas(entity.getValor()
                    .divide(BigDecimal.valueOf(entity.getValorParcelas()), 0, RoundingMode.HALF_UP));
        }

        return entity;
    }
}
