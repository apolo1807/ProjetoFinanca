package com.financas.project.apolo.entity;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class PessoasFinancasCalculo {

    private BigDecimal totalMensal;
    private BigDecimal totalPago;
    private BigDecimal total;
    private BigDecimal resto;
    private BigDecimal renda;
    private BigDecimal gasto;

}
