package com.financas.project.apolo.service;

import com.financas.project.apolo.entity.PessoaisFinancas;
import com.financas.project.apolo.repository.PessoaisFinancasRepository;
import com.financas.project.apolo.repository.RendaFixaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDate;
import java.util.List;
import java.util.Objects;

@Service
public class PessoaisFinancasService {

    @Autowired
    private PessoaisFinancasRepository repository;

    @Autowired
    private RendaFixaRepository rendaRepository;

    public PessoaisFinancas intitialize(PessoaisFinancas entity) {
        getValorParcelado(entity);
        calcularFinalParcelas(entity);
        return repository.save(entity);
    }

    public PessoaisFinancas getValorParcelado(PessoaisFinancas entity) {
        if(entity.getIsParcelado()) {
            entity.setParcelas(entity.getValor()
                    .divide(BigDecimal.valueOf(entity.getValorParcelas()), 2, RoundingMode.HALF_UP));
        }

        return entity;
    }

    public PessoaisFinancas calcularFinalParcelas(PessoaisFinancas entity) {

        if(Objects.isNull(entity.getDataInicio())) {
            entity.setDataInicio(LocalDate.now());
        }

        if(entity.getIsParcelado()) {

            LocalDate dataInicio = entity.getDataInicio();
            Integer parcelas = entity.getValorParcelas();
            entity.setDataFim(dataInicio.plusMonths(parcelas));
        }

        return entity;
    }
}
