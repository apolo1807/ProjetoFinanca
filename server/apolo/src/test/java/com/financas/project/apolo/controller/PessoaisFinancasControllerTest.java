package com.financas.project.apolo.controller;

import com.financas.project.apolo.entity.PessoaisFinancas;
import com.financas.project.apolo.service.PessoaisFinancasService;
import com.financas.project.apolo.utils.Fixtures;
import com.financas.project.apolo.utils.Json;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.ArgumentMatchers;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.MockitoJUnitRunner;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.util.ArrayList;
import java.util.List;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.hamcrest.core.Is.is;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(MockitoJUnitRunner.class)
@AutoConfigureMockMvc
public class PessoaisFinancasControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Mock
    private PessoaisFinancasController controller;

    @Mock
    private PessoaisFinancasService service;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        this.mockMvc = MockMvcBuilders.standaloneSetup(controller).build();
    }

    @Test
    public void verifyFindAll() throws Exception {

        List<PessoaisFinancas> entitys = new ArrayList<>();
        entitys.add(Fixtures.createPessoaisFinancas(1L));
        entitys.add(Fixtures.createPessoaisFinancas(2L));

        when(controller.getFinancas()).thenReturn(entitys);

        mockMvc.perform(get("/api/financas/pessoais"))
                .andExpect(status().isOk());
    }

    @Test
    public void verifyFindById() throws Exception {
        PessoaisFinancas entity = Fixtures.createPessoaisFinancas(1L);

        when(controller.findById(ArgumentMatchers.any(Long.class))).thenReturn(entity);

        mockMvc.perform(get("/api/financas/pessoais/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id", is(1)));
    }

    @Test
    public void verifyDelete() throws Exception {
        PessoaisFinancas entity = Fixtures.createPessoaisFinancas(1L);

        when(controller.findById(ArgumentMatchers.any(Long.class))).thenReturn(entity);
        doNothing().when(controller).deletar(entity);

        mockMvc.perform(
                delete("/api/financas/pessoais/1"))
                .andExpect(status().isOk());
    }

    @Test
    public void verifySave() throws Exception {
        PessoaisFinancas entity = Fixtures.createPessoaisFinancas(null);

        when(service.intitialize(Mockito.any(PessoaisFinancas.class))).thenReturn(entity);

        MvcResult result = mockMvc.perform(MockMvcRequestBuilders.post("/api/financas/pessoais/new")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(Json.asJsonString(entity))
                        .accept(MediaType.APPLICATION_JSON)).andExpect(MockMvcResultMatchers.status().isOk())
                        .andReturn();

        assertThat(result).isNotNull();
        String userJson = result.getResponse().getContentAsString();
        assertThat(userJson).isNotEmpty();
        assertThat(userJson).isEqualToIgnoringCase(Json.asJsonString(entity));
    }

}
