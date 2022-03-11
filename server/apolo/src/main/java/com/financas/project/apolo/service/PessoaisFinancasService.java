package com.financas.project.apolo.service;

import com.financas.project.apolo.TipoEnum.TipoEstadoGasto;
import com.financas.project.apolo.entity.PessoaisFinancas;
import com.financas.project.apolo.repository.PessoaisFinancasRepository;
import com.financas.project.apolo.repository.RendaFixaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDate;
import java.util.Objects;

@Service
public class PessoaisFinancasService {

    @Autowired
    private PessoaisFinancasRepository repository;

    @Autowired
    private RendaFixaRepository rendaRepository;

    @Autowired
    private PessoaisCalculosService calculosService;

    public PessoaisFinancas intitialize(PessoaisFinancas entity) {

        if (entity.getValores().getIsParcelado()) {
            setValorParcelado(entity);
        }

        calculosService.calcularFinalParcelas(entity);
        setEstadoGasto(entity);

        return repository.save(entity);
    }

    public PessoaisFinancas setValorParcelado(PessoaisFinancas entity) {
        return entity.setValorParcelado(entity);
    }

    public PessoaisFinancas setEstadoGasto(PessoaisFinancas entity) {
        return entity.setEstadoGasto(entity);
    }

    public PessoaisFinancas declararPago(PessoaisFinancas entity) throws Exception {
        entity.declararPago(entity);
        calculosService.calculoValores();
        return repository.save(entity);
    }

}
