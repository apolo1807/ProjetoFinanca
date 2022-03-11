package com.financas.project.apolo.entity;

import com.financas.project.apolo.TipoEnum.TipoEstadoGasto;
import com.financas.project.apolo.embeddables.BaseValores;
import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDate;
import java.util.Objects;

@Entity
@Data
public class PessoaisFinancas {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotEmpty(message = "{campo.gasto.obrigatorio}")
    @Column(length = 10)
    private String gasto;

    @Column
    private String descricao;

    @Embedded
    private BaseValores valores;

    @Column(name = "data_inicio")
    private LocalDate dataInicio;

    @Column(name = "data_fim")
    private LocalDate dataFim;

    @Column(name = "tipo_estado_gasto")
    private TipoEstadoGasto tipoEstadoGasto = TipoEstadoGasto.PENDENTE;

    public PessoaisFinancas declararPago(PessoaisFinancas entity) throws Exception {

        if(entity.getTipoEstadoGasto().equals(TipoEstadoGasto.PENDENTE)) {
            entity.setTipoEstadoGasto(TipoEstadoGasto.PAGO);
        } else {
            throw new Exception("Não foi possivel declarar como pago, pois " + entity.getGasto() + " Já está pago");
        }

        return entity;
    }

    public PessoaisFinancas setEstadoGasto(PessoaisFinancas entity) {
        if (Objects.isNull(entity.getId())) {
            if (entity.getDataFim().isBefore(LocalDate.now())) {
                entity.setTipoEstadoGasto(TipoEstadoGasto.PAGO);
            } else {
                entity.setTipoEstadoGasto(TipoEstadoGasto.PENDENTE);
            }
        }
        return entity;
    }

    public PessoaisFinancas setValorParcelado(PessoaisFinancas entity) {
        if (Objects.isNull(entity.valores.getParcelas())) {
            entity.valores.setParcelas(entity.valores.getValor()
                    .divide(BigDecimal.valueOf(entity.valores.getValorParcelas()), 2, RoundingMode.HALF_UP));
        }

        return entity;
    }
}
