package com.financas.project.apolo.repository;

import com.financas.project.apolo.entity.PessoaisFinancas;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.math.BigDecimal;

public interface PessoaisFinancasRepository extends JpaRepository<PessoaisFinancas, Long> {
}
