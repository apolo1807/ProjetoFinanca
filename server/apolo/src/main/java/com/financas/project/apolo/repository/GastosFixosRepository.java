package com.financas.project.apolo.repository;

import com.financas.project.apolo.entity.GastosFixos;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.math.BigDecimal;

public interface GastosFixosRepository extends JpaRepository<GastosFixos, Long> {

    @Query("SELECT SUM(g.valores.valor) FROM GastosFixos g")
    BigDecimal calcularTotalGastos();
}
