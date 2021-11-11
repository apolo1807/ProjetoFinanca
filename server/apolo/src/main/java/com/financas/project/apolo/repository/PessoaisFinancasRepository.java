package com.financas.project.apolo.repository;

import com.financas.project.apolo.entity.PessoaisFinancas;
import org.springframework.data.jpa.repository.JpaRepository;

import java.math.BigDecimal;
import java.util.List;

public interface PessoaisFinancasRepository extends JpaRepository<PessoaisFinancas, Long> {
}
