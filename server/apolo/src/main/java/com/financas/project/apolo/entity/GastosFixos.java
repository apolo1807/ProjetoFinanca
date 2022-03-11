package com.financas.project.apolo.entity;

import com.financas.project.apolo.embeddables.BaseValores;
import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDate;
import java.util.Objects;

@Entity
@Data
public class GastosFixos {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    @NotEmpty
    private String descricao;

    @Column(name = "tipo_gasto")
    @NotEmpty
    private String tipoGasto;

    @Column
    private Boolean fidelidade;

    @Embedded
    private BaseValores valores;

    @Column(name = "data_inicio")
    private LocalDate dataInicio;

    @Column(name = "data_fim")
    private LocalDate dataFim;

    @Column(name = "tempo_fidelidade")
    private LocalDate tempoFidelidade;

    public GastosFixos gerarParcelas(GastosFixos entity) {

        if(Objects.isNull(entity.getValores().getParcelas())) {
            entity.getValores().setParcelas(entity.valores.getValor()
                    .divide(BigDecimal.valueOf(entity.valores.getValorParcelas()), 2, RoundingMode.HALF_UP));
        }

        return entity;
    }
}
