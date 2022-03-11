package com.financas.project.apolo.repository;

import com.financas.project.apolo.entity.RendaFixa;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.math.BigDecimal;

public interface RendaFixaRepository extends JpaRepository<RendaFixa, Long> {

    @Query("SELECT SUM(r.valor) FROM RendaFixa r")
    BigDecimal calcularValorTotalRenda();

}
