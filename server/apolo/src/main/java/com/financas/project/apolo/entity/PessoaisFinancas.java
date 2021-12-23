package com.financas.project.apolo.entity;

import com.financas.project.apolo.repository.RendaFixaRepository;
import com.financas.project.apolo.service.PessoaisFinancasService;
import com.financas.project.apolo.service.RendaFixaService;
import lombok.Data;
import org.hibernate.annotations.Formula;
import org.springframework.beans.factory.annotation.Autowired;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.math.BigDecimal;
import java.time.LocalDate;

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

    @Column(name = "valor_parcelas" ,length = 12)
    private Integer valorParcelas;

    @Column(name = "is_parcelado")
    private Boolean isParcelado = false;

    @NotNull(message = "{campo.valor.obrigatorio}")
    @Column
    private BigDecimal valor;

    @Column(name = "data_inicio")
    private LocalDate dataInicio;

    @Column(name = "data_fim")
    private LocalDate dataFim;

    @Formula(value = "(select sum(rf.valor) from renda_fixa rf)")
    private BigDecimal totalRenda = BigDecimal.ZERO;

    @Column(name = "estado_renda")
    private Boolean estadoRenda;

    @Formula(value = "(select sum(pf.valor) from pessoais_financas pf)")
    private BigDecimal total;
}
