package com.financas.project.apolo.utils;

import com.financas.project.apolo.entity.PessoaisFinancas;

import java.math.BigDecimal;
import java.time.LocalDate;

public class Fixtures {

    public static PessoaisFinancas createPessoaisFinancas(Long id) {
        PessoaisFinancas entity = new PessoaisFinancas();
        entity.setId(id);
        entity.getValores().setIsParcelado(Boolean.TRUE);
        entity.getValores().setParcelas(BigDecimal.valueOf(1200L));
        entity.getValores().setValorParcelas(2);
        entity.setDataInicio(LocalDate.of(2018, 01, 31));
        entity.setGasto("Teste");

        return entity;
    }


}
