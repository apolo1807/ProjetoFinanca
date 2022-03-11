package com.financas.project.apolo.embeddables;

import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.math.BigDecimal;

@Embeddable
@Data
public class BaseValores implements Serializable {

    @NotNull(message = "{campo.valor.obrigatorio}")
    @Column
    private BigDecimal valor;

    @Column(name = "is_parcelado")
    private Boolean isParcelado = false;

    @Column(name = "valor_parcelas", length = 12)
    private Integer valorParcelas;

    @Column
    private BigDecimal parcelas;

}
