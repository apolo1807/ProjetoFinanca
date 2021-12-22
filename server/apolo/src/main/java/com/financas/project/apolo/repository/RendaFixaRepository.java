package com.financas.project.apolo.repository;

import com.financas.project.apolo.entity.RendaFixa;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.math.BigDecimal;
import java.util.List;

public interface RendaFixaRepository extends JpaRepository<RendaFixa, Long> {

    @Query(value = "SELECT SUM(valor) FROM renda_fixa rf", nativeQuery = true)
    BigDecimal getTotal();
}
