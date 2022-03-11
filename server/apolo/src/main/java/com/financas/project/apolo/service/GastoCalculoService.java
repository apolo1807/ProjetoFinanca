package com.financas.project.apolo.service;

import com.financas.project.apolo.entity.GastosFixos;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.Objects;

@Service
public class GastoCalculoService {

    public GastosFixos calcularFinalParcelas(GastosFixos entity) {

        if(Objects.isNull(entity.getDataInicio())) {
            entity.setDataInicio(LocalDate.now());
        }

        if(!entity.getValores().getIsParcelado()) {
            entity.setDataFim(entity.getDataInicio());
        }

        if(entity.getValores().getIsParcelado()) {

            LocalDate dataInicio = entity.getDataInicio();
            Integer parcelas = entity.getValores().getValorParcelas();
            entity.setDataFim(dataInicio.plusMonths(parcelas));
        }

        return entity;
    }

}
