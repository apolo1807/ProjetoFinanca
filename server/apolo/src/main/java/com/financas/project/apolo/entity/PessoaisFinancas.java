package com.financas.project.apolo.entity;

import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.math.BigDecimal;

@Entity
@Data
public class PessoaisFinancas {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotEmpty(message = "{campo.gasto.obrigatorio}")
    @Column(length = 10)
    private String gasto;

    @Column(length = 50)
    private String descricao;

    @Column
    private BigDecimal parcelas;

    @Column(length = 12)
    private Integer valorParcelas;

    @Column
    private Boolean isParcelado = false;

    @NotNull(message = "{campo.valor.obrigatorio}")
    @Column
    private BigDecimal valor;

    @NotNull
    @Column
    private BigDecimal total;
}
