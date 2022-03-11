package com.financas.project.apolo.repository;

import com.financas.project.apolo.entity.PessoaisFinancas;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.math.BigDecimal;
import java.util.List;

public interface PessoaisFinancasRepository extends JpaRepository<PessoaisFinancas, Long> {

    @Query("SELECT SUM(p.valores.valor) FROM PessoaisFinancas p")
    BigDecimal calcularTotalFinancas();

}
