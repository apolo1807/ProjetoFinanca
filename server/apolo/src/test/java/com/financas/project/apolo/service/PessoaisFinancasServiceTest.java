package com.financas.project.apolo.service;

import com.financas.project.apolo.TipoEnum.TipoEstadoGasto;
import com.financas.project.apolo.entity.PessoaisFinancas;
import com.financas.project.apolo.repository.PessoaisFinancasRepository;
import com.financas.project.apolo.utils.Fixtures;
import org.hamcrest.MatcherAssert;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.ArgumentMatchers;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnitRunner;
import org.springframework.format.datetime.standard.DateTimeContext;
import org.springframework.format.datetime.standard.DateTimeContextHolder;

import java.math.BigDecimal;
import java.time.LocalDate;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@RunWith(MockitoJUnitRunner.class)
public class PessoaisFinancasServiceTest {

    @InjectMocks
    private PessoaisFinancasService service;
    @Mock
    private PessoaisFinancasRepository repository;

    @Test
    public void getParcelasTest() {

        PessoaisFinancas valorTest = service.getValorParcelado(Fixtures
                .createPessoaisFinancas(1L));

        assertEquals(valorTest.getParcelas(), BigDecimal.valueOf(600L));
    }

    @Test
    public void calcularFinalParcelasWithoutDateTest() {

        PessoaisFinancas entityWithoutData = new PessoaisFinancas();
        entityWithoutData.setId(1L);
        entityWithoutData.setValor(BigDecimal.TEN);

        PessoaisFinancas entityWithData = service.calcularFinalParcelas(entityWithoutData);

        assertEquals(entityWithData.getDataInicio(), LocalDate.now());
        assertEquals(entityWithData.getDataFim(), entityWithData.getDataInicio());
    }

    @Test
    public void setEstadoGastoTest() {

        PessoaisFinancas entity = new PessoaisFinancas();
        entity.setDataFim(LocalDate.of(2021, 12,01));

        PessoaisFinancas entity2 = new PessoaisFinancas();
        entity2.setDataFim(LocalDate.now());

        PessoaisFinancas entity3 = new PessoaisFinancas();
        entity3.setDataFim(LocalDate.now().plusMonths(2));

        PessoaisFinancas entityPaga = service.setEstadoGasto(entity);
        PessoaisFinancas entityPendente = service.setEstadoGasto(entity2);
        PessoaisFinancas entityPendente2 = service.setEstadoGasto(entity3);

        assertEquals(entityPaga.getTipoEstadoGasto(), TipoEstadoGasto.PAGO);
        assertEquals(entityPendente.getTipoEstadoGasto(), TipoEstadoGasto.PENDENTE);
        assertEquals(entityPendente2.getTipoEstadoGasto(), TipoEstadoGasto.PENDENTE);
    }

    @Test
    public void calcularFinalParcelasWithDataTest() {

        PessoaisFinancas entity = Fixtures.createPessoaisFinancas(1L);
        service.calcularFinalParcelas(entity);

        assertEquals(entity.getDataFim(), LocalDate.of(2018, 03, 31));
    }

}
