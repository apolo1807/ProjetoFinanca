package com.financas.project.apolo.service;

import com.financas.project.apolo.TipoEnum.TipoEstadoGasto;
import com.financas.project.apolo.entity.GastosFixos;
import com.financas.project.apolo.entity.PessoaisFinancas;
import com.financas.project.apolo.entity.PessoasFinancasCalculo;
import com.financas.project.apolo.repository.GastosFixosRepository;
import com.financas.project.apolo.repository.PessoaisFinancasRepository;
import com.financas.project.apolo.repository.RendaFixaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Service
public class PessoaisCalculosService {

    @Autowired
    private PessoaisFinancasRepository repository;

    @Autowired
    private RendaFixaRepository rendaRepository;

    @Autowired
    private GastosFixosRepository gastosFixosRepository;

    public PessoasFinancasCalculo calculoValores() {

        PessoasFinancasCalculo calculo = new PessoasFinancasCalculo();
        List<PessoaisFinancas> pessoaisFinancas = repository.findAll();
        BigDecimal pago = BigDecimal.ZERO;
        BigDecimal pendente = BigDecimal.ZERO;
        BigDecimal totalRenda = rendaRepository.calcularValorTotalRenda();
        BigDecimal totalFinancas = repository.calcularTotalFinancas();
        BigDecimal totalGasto = gastosFixosRepository.calcularTotalGastos();

        for(PessoaisFinancas financas : pessoaisFinancas) {

            if(financas.getTipoEstadoGasto().equals(TipoEstadoGasto.PAGO)) {
                    pago = pago.add(financas.getValores().getValor());
            }

            if(financas.getTipoEstadoGasto().equals(TipoEstadoGasto.PENDENTE)) {
                if (financas.getValores().getIsParcelado()) {
                    pendente = pendente.add(financas.getValores().getParcelas());
                } else {
                    pendente = pendente.add(financas.getValores().getValor());
                }
            }
        }

        calculo.setTotal(totalFinancas);
        calculo.setResto(totalRenda.subtract(pendente));
        calculo.setTotalPago(pago);
        calculo.setTotalMensal(pendente);
        calculo.setRenda(totalRenda);
        calculo.setGasto(totalGasto);

        return calculo;
    }

    public PessoaisFinancas calcularFinalParcelas(PessoaisFinancas entity) {

        if (Objects.isNull(entity.getDataInicio())) {
            entity.setDataInicio(LocalDate.now());
        }

        if (!entity.getValores().getIsParcelado()) {
            entity.setDataFim(entity.getDataInicio());
        }

        if (entity.getValores().getIsParcelado()) {

            LocalDate dataInicio = entity.getDataInicio();
            Integer parcelas = entity.getValores().getValorParcelas();
            entity.setDataFim(dataInicio.plusMonths(parcelas));
        }

        return entity;
    }
}
