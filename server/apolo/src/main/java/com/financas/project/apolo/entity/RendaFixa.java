package com.financas.project.apolo.entity;

import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.math.BigDecimal;

@Entity
@Data
public class RendaFixa {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotEmpty
    @Column(length = 100)
    private String descricao;

    @NotNull
    @Column(name = "tipo_renda")
    private String tipoRenda;

    @Column
    private String ativa;

    @Column
    private String passiva;

    @NotNull
    @Column
    private BigDecimal valor;
}
