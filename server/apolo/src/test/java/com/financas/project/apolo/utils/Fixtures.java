package com.financas.project.apolo.utils;

import com.financas.project.apolo.entity.PessoaisFinancas;

import java.math.BigDecimal;

public class Fixtures {

    public static PessoaisFinancas createPessoaisFinancas(Long id) {
        PessoaisFinancas entity = new PessoaisFinancas();
        entity.setId(id);
        entity.setIsParcelado(Boolean.TRUE);
        entity.setValor(BigDecimal.valueOf(1200L));
        entity.setValorParcelas(2);
        entity.setGasto("Teste");

        return entity;
    }


}
