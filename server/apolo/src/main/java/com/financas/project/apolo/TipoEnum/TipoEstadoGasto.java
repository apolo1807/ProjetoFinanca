package com.financas.project.apolo.TipoEnum;

import lombok.Getter;

@Getter
public enum TipoEstadoGasto {

    PAGO("PA", "Pago"),
    PENDENTE("PE", "Pendente");

    private String codigo;
    private String descricao;

    TipoEstadoGasto(String codigo, String descricao) {
        this.codigo = codigo;
        this.descricao = descricao;
    }

}
