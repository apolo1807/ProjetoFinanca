package com.financas.project.apolo.service;

import com.financas.project.apolo.TipoEnum.TipoEstadoGasto;
import com.financas.project.apolo.entity.PessoaisFinancas;
import com.financas.project.apolo.repository.PessoaisFinancasRepository;
import com.financas.project.apolo.repository.RendaFixaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.ReactiveTransaction;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDate;
import java.util.Objects;

@Service
public class PessoaisFinancasService {

    @Autowired
    private PessoaisFinancasRepository repository;

    @Autowired
    private RendaFixaRepository rendaRepository;

    public PessoaisFinancas intitialize(PessoaisFinancas entity) {

        if(entity.getIsParcelado()) {
            getValorParcelado(entity);
        }

        calcularFinalParcelas(entity);
        setEstadoGasto(entity);

        return repository.save(entity);
    }

    public PessoaisFinancas getValorParcelado(PessoaisFinancas entity) {

        entity.setParcelas(entity.getValor()
                .divide(BigDecimal.valueOf(entity.getValorParcelas()), 2, RoundingMode.HALF_UP));

        return entity;
    }

    public PessoaisFinancas setEstadoGasto(PessoaisFinancas entity) {

        if(Objects.isNull(entity.getId())) {
            if (entity.getDataFim().isBefore(LocalDate.now())) {
                entity.setTipoEstadoGasto(TipoEstadoGasto.PAGO);
            } else {
                entity.setTipoEstadoGasto(TipoEstadoGasto.PENDENTE);
            }
        }

        return entity;
    }

    public PessoaisFinancas calcularFinalParcelas(PessoaisFinancas entity) {

        if(Objects.isNull(entity.getDataInicio())) {
            entity.setDataInicio(LocalDate.now());
        }

        if(!entity.getIsParcelado()) {
            entity.setDataFim(entity.getDataInicio());
        }

        if(entity.getIsParcelado()) {

            LocalDate dataInicio = entity.getDataInicio();
            Integer parcelas = entity.getValorParcelas();
            entity.setDataFim(dataInicio.plusMonths(parcelas));
        }

        return entity;
    }
}
