package com.financas.project.apolo.service;

import com.financas.project.apolo.entity.GastosFixos;
import com.financas.project.apolo.repository.GastosFixosRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class GastosFixosService {

    @Autowired
    private GastosFixosRepository repository;

    @Autowired
    private GastoCalculoService calculoService;

    public GastosFixos initialize(GastosFixos entity) {

        if(entity.getValores().getIsParcelado()) {
            gerarParcelas(entity);
        }

        calcularParcelas(entity);
        return repository.save(entity);
    }

    private GastosFixos calcularParcelas(GastosFixos entity) {
        return calculoService.calcularFinalParcelas(entity);
    }

    public GastosFixos gerarParcelas(GastosFixos entity) {
        return entity.gerarParcelas(entity);
    }

}
